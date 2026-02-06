import { useState } from 'react';
import Layout from '@/components/Layout';

export default function Contact() {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        const formData = {
            email: e.target.email.value,
            message: e.target.message.value,
        };

        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (res.ok) {
            setStatus('Message sent successfully.');
            e.target.reset();
        } else {
            setStatus('Failed to send message.');
        }
    };

    return (
        <Layout title="Contact | Motoz">
            <div className="glass-panel list-container">
                <h1>Contact</h1>
                <form onSubmit={handleSubmit} className="contact-form">
                    <div className="field">
                        <label>Email</label>
                        <input type="email" name="email" required placeholder="your@email.com" />
                    </div>

                    <div className="field">
                        <label>Message</label>
                        <textarea name="message" required rows="5" placeholder="Your message..."></textarea>
                    </div>

                    <button type="submit">Send Message</button>

                    {status && <p className="status">{status}</p>}
                </form>
            </div>

            <style jsx>{`
        .list-container {
          padding: 2rem;
          max-width: 600px;
          margin: 0 auto;
        }
        h1 {
          color: var(--accent-color);
          text-shadow: var(--glow-accent);
          margin-bottom: 2rem;
        }
        .field {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        input, textarea {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid #333;
          color: var(--text-primary);
          padding: 10px;
          border-radius: 4px;
          font-family: inherit;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 5px rgba(0, 242, 255, 0.2);
        }
        button {
          background: transparent;
          color: var(--accent-color);
          border: 1px solid var(--accent-color);
          padding: 10px 20px;
          cursor: pointer;
          font-weight: bold;
          text-transform: uppercase;
          transition: all 0.2s;
          border-radius: 4px;
        }
        button:hover {
          background: var(--accent-color);
          color: #000;
          box-shadow: var(--glow-accent);
        }
        .status {
          margin-top: 1rem;
          color: var(--text-secondary);
        }
      `}</style>
        </Layout>
    );
}
