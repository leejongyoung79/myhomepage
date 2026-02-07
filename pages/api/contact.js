import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, message } = req.body;

        // Create a transporter using Gmail SMTP
        // Note: You must use an "App Password" for Gmail, not your regular password.
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: 'veroespressocoffee@gmail.com',
                subject: `[Contact Form] Message from ${email}`,
                text: message,
                html: `
                    <h3>New message from your website</h3>
                    <p><strong>From:</strong> ${email}</p>
                    <p><strong>Message:</strong></p>
                    <p>${message}</p>
                `,
            });

            console.log('Email sent successfully to veroespressocoffee@gmail.com');
            res.status(200).json({ status: 'Ok' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email', error: error.message });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
