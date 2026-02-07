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
    const { id } = req.query;

    // Helper to read posts
    const getPosts = () => {
        const fileData = fs.readFileSync(dataFilePath);
        return JSON.parse(fileData);
    };

    if (req.method === 'GET') {
        const posts = getPosts();
        const post = posts.find(p => p.id.toString() === id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } else if (req.method === 'DELETE') {
        let posts = getPosts();
        const postIndex = posts.findIndex(p => p.id.toString() === id);

        if (postIndex > -1) {
            const post = posts[postIndex];
            if (post.image) {
                const imagePath = path.join(process.cwd(), 'public', post.image);
                if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
            }
            posts.splice(postIndex, 1);
            fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
            res.status(200).json({ message: 'Post deleted' });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { fields, files } = await new Promise((resolve, reject) => {
                const form = formidable({
                    uploadDir,
                    keepExtensions: true,
                    filename: (name, ext, part, form) => `${Date.now()}_${part.originalFilename.replace(/\s/g, '_')}`
                });
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    resolve({ fields, files });
                });
            });

            let posts = getPosts();
            const postIndex = posts.findIndex(p => p.id.toString() === id);

            if (postIndex === -1) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const oldPost = posts[postIndex];
            const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
            const content = Array.isArray(fields.content) ? fields.content[0] : fields.content;

            let imagePath = oldPost.image;
            if (files.image) {
                const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;
                if (imageFile) {
                    // Delete old image if verified
                    if (oldPost.image) {
                        const oldImagePath = path.join(process.cwd(), 'public', oldPost.image);
                        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
                    }
                    imagePath = `/uploads/${imageFile.newFilename}`;
                }
            }

            const updatedPost = {
                ...oldPost,
                title: title || oldPost.title,
                content: content || oldPost.content,
                image: imagePath,
                // Keep original date or update? Usually edited date is tracked separately, keeping original date for now.
            };

            posts[postIndex] = updatedPost;
            fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
            res.status(200).json(updatedPost);

        } catch (error) {
            console.error('Update error:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
