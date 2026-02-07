import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Board() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const limit = 10;

  useEffect(() => {
    fetch(`/api/posts?page=${page}&limit=${limit}&search=${searchQuery}`)
      .then(res => res.json())
      .then(data => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      });
  }, [page, searchQuery]);

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

        <div className="pagination">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="page-btn"
          >
            Previous
          </button>
          <span className="page-info">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="page-btn"
          >
            Next
          </button>
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
          flex-wrap: wrap;
          gap: 1rem;
        }
        h1 {
          color: var(--text-primary);
          margin: 0;
        }
        .controls {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        .search-form {
            display: flex;
            gap: 5px;
        }
        .search-form input {
            background: rgba(0,0,0,0.3);
            border: 1px solid #333;
            color: white;
            padding: 8px;
            border-radius: 4px;
        }
        .search-form button {
            background: transparent;
            border: 1px solid #333;
            color: var(--text-secondary);
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
        }
        .search-form button:hover {
            border-color: var(--accent-color);
            color: var(--accent-color);
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
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }
        .page-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text-primary);
          padding: 5px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        .page-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .page-btn:not(:disabled):hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .page-info {
          color: var(--text-secondary);
        }
      `}</style>
    </Layout>
  );
}
