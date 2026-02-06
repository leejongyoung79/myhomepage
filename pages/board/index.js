import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Board() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <Layout title="Board | Motoz">
            <div className="board-container">
                <div className="header">
                    <h1>Bulletin Board</h1>
                    <Link href="/board/write" className="write-btn">
                        WRITE
                    </Link>
                </div>

                <div className="post-list">
                    {posts.map(post => (
                        <Link href={`/board/${post.id}`} key={post.id} className="post-item glass-panel">
                            <h2 className="post-title">{post.title}</h2>
                            <span className="post-date">{new Date(post.date).toLocaleDateString()}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <style jsx>{`
        .board-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        h1 {
          color: var(--text-primary);
          margin: 0;
        }
        .write-btn {
          border: 1px solid var(--accent-color);
          color: var(--accent-color);
          padding: 8px 20px;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: bold;
        }
        .write-btn:hover {
          background: var(--accent-color);
          color: black;
          box-shadow: var(--glow-accent);
        }
        .post-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .post-item {
          display: block;
          padding: 1.5rem;
          text-decoration: none;
          transition: transform 0.2s, border-color 0.2s;
        }
        .post-item:hover {
          transform: translateX(5px);
          border-color: var(--accent-color);
        }
        .post-title {
          margin: 0 0 0.5rem 0;
          font-size: 1.2rem;
        }
        .post-date {
          font-size: 0.8rem;
          color: var(--text-secondary);
        }
      `}</style>
        </Layout>
    );
}
