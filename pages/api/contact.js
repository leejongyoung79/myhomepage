export default function handler(req, res) {
    if (req.method === 'POST') {
        // In a real app, send email here using SendGrid/Nodemailer
        console.log('Contact Form Submission:', req.body);
        res.status(200).json({ status: 'Ok' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
