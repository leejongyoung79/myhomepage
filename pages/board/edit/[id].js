import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function EditPost() {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    useEffect(() => {
        if (id) {
            fetch(`/api/posts/${id}`)
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        title: data.title,
                        content: data.content
                    });
                    setCurrentImage(data.image);
                });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('content', formData.content);
        if (image) {
            data.append('image', image);
        }

        const res = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: data,
        });

        if (res.ok) {
            router.push(`/board/${id}`);
        } else {
            setLoading(false);
            alert('Failed to update post');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Layout title="Edit Post | Motoz">
            <div className="glass-panel form-container">
                <h1>Edit Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="field">
                        <label>Image (Optional)</label>
                        {currentImage && (
                            <div className="current-image">
                                <p>Current Image:</p>
                                <img src={currentImage} alt="Current" />
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                    </div>
                    <div className="field">
                        <label>Content</label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                            rows="10"
                        ></textarea>
                    </div>
                    <div className="actions">
                        <button type="button" onClick={() => router.back()} className="cancel-btn">Cancel</button>
                        <button type="submit" disabled={loading} className="submit-btn">
                            {loading ? 'Updating...' : 'Update'}
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
        .current-image img {
            max-width: 200px;
            margin: 10px 0;
            border-radius: 4px;
            border: 1px solid #333;
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
