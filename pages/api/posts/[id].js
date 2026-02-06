import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

export default function handler(req, res) {
    const { id } = req.query;

    const fileData = fs.readFileSync(dataFilePath);
    const posts = JSON.parse(fileData);

    const post = posts.find(p => p.id.toString() === id);

    if (post) {
        res.status(200).json(post);
    } else {
        res.status(404).json({ message: 'Post not found' });
    }
}
