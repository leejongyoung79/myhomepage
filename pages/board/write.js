import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function Write() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('title', e.target.title.value);
        formData.append('content', e.target.content.value);
        if (image) {
            formData.append('image', image);
        }

        const res = await fetch('/api/posts', {
            method: 'POST',
            body: formData,
        });

        if (res.ok) {
            router.push('/board');
        } else {
            setLoading(false);
            alert('Failed to post');
        }
    };

    return (
        <Layout title="Write Post | Motoz">
            <div className="glass-panel form-container">
                <h1>Write Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Title</label>
                        <input type="text" name="title" required autoFocus />
                    </div>
                    <div className="field">
                        <label>Image (Optional)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="field">
                        <label>Content</label>
                        <textarea name="content" required rows="10"></textarea>
                    </div>
                    <div className="actions">
                        <button type="button" onClick={() => router.back()} className="cancel-btn">Cancel</button>
                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? 'Posting...' : 'Post'}
                        </button>
                    </div>
                </form>
            </div>

            <style jsx>{`
        .form-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
        }
        h1 {
          color: var(--accent-color);
          margin-bottom: 2rem;
        }
        .field {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
        }
        input, textarea {
          width: 100%;
          background: rgba(0,0,0,0.3);
          border: 1px solid #333;
          color: var(--text-primary);
          padding: 12px;
          border-radius: 4px;
          font-family: inherit;
          font-size: 1rem;
        }
        input:focus, textarea:focus {
          outline: none;
          border-color: var(--accent-color);
          box-shadow: 0 0 5px rgba(0, 242, 255, 0.2);
        }
        .actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 2rem;
        }
        button {
          padding: 10px 25px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          text-transform: uppercase;
        }
        .submit-btn {
          background: var(--accent-color);
          color: black;
          border: none;
        }
        .submit-btn:hover {
          box-shadow: var(--glow-accent);
        }
        .cancel-btn {
          background: transparent;
          color: var(--text-secondary);
          border: 1px solid #333;
        }
        .cancel-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-primary);
        }
      `}</style>
        </Layout>
    );
}
