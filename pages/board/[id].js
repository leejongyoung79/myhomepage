import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function PostDetail() {
    const router = useRouter();
    const { id } = router.query;
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/posts/${id}`)
                .then(res => res.json())
                .then(data => setPost(data));
        }
    }, [id]);

    if (!post) return <Layout><div className="loading">Loading...</div></Layout>;

    return (
        <Layout title={`${post.title} | Motoz`}>
            <div className="post-container">
                <Link href="/board" className="back-link">← Back to Board</Link>

                <article className="glass-panel post-content">
                    <header className="post-header">
                        <h1>{post.title}</h1>
                        <time>{new Date(post.date).toLocaleDateString()}</time>
                    </header>
                    <div className="post-body">
                        {post.content.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                </article>
            </div>

            <style jsx>{`
        .post-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .back-link {
          display: inline-block;
          margin-bottom: 2rem;
          color: var(--text-secondary);
        }
        .back-link:hover {
          color: var(--accent-color);
        }
        .post-content {
          padding: 3rem;
        }
        .post-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 1rem;
        }
        h1 {
          margin: 0 0 1rem 0;
          color: var(--text-primary);
          font-size: 2rem;
        }
        time {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }
        .post-body {
          line-height: 1.8;
          color: var(--text-primary);
          font-size: 1.1rem;
          white-space: pre-wrap;
        }
      `}</style>
        </Layout>
    );
}
