import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

export default function handler(req, res) {
    const { id } = req.query;

    if (req.method === 'POST') {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Comment text required' });
        }

        const fileData = fs.readFileSync(dataFilePath);
        const posts = JSON.parse(fileData);
        const postIndex = posts.findIndex(p => p.id.toString() === id);

        if (postIndex > -1) {
            const newComment = {
                id: Date.now(),
                text,
                date: new Date().toISOString(),
            };

            if (!posts[postIndex].comments) {
                posts[postIndex].comments = [];
            }

            posts[postIndex].comments.push(newComment);
            fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));

            res.status(201).json(newComment);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
