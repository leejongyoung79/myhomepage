import fs from 'fs';
import path from 'path';
import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');
const uploadDir = path.join(process.cwd(), 'public', 'uploads');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const fileData = fs.readFileSync(dataFilePath);
        const posts = JSON.parse(fileData);
        // Return newest first
        res.status(200).json(posts.reverse());
    } else if (req.method === 'POST') {
        try {
            const { fields, files } = await new Promise((resolve, reject) => {
                const form = formidable({
                    uploadDir,
                    keepExtensions: true,
                    filename: (name, ext, part, form) => {
                        return `${Date.now()}_${part.originalFilename.replace(/\s/g, '_')}`;
                    }
                });

                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    resolve({ fields, files });
                });
            });

            // Formidable v3 returns arrays for fields
            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
            const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

            if (!title || !content) {
                return res.status(400).json({ message: 'Title and content required' });
            }

            let imagePath = null;
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                if (imageFile) {
                    imagePath = `/uploads/${imageFile.newFilename}`;
                }
            }

            const fileData = fs.readFileSync(dataFilePath);
            const posts = JSON.parse(fileData);

            const newPost = {
                id: Date.now(),
                title,
                content,
                image: imagePath,
                date: new Date().toISOString(),
            };

            posts.push(newPost);
            fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));

            res.status(201).json(newPost);
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
