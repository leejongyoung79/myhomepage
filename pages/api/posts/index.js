import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

export default function handler(req, res) {
    if (req.method === 'GET') {
        const fileData = fs.readFileSync(dataFilePath);
        const posts = JSON.parse(fileData);
        // Return newest first
        res.status(200).json(posts.reverse());
    } else if (req.method === 'POST') {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content required' });
        }

        const fileData = fs.readFileSync(dataFilePath);
        const posts = JSON.parse(fileData);

        const newPost = {
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString(),
        };

        posts.push(newPost);
        fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));

        res.status(201).json(newPost);
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
