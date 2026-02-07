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
  }, [id]); // 이 부분의 중괄호 짝을 맞췄습니다.

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        router.push('/board');
      } else {
        alert('Failed to delete post');
      }
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.comment.value;
    if (!text) return;

    const res = await fetch(`/api/posts/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      e.target.reset();
      // Refresh post data
      fetch(`/api/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data));
    } else {
      alert('Failed to add comment');
    }
  };

  if (!post) return <Layout><div className="loading">Loading...</div></Layout>;

  return (
    <Layout title={`${post.title} | Motoz`}>
      <div className="post-container">
        <div className="post-nav">
          <Link href="/board" className="back-link">← Back to Board</Link>
          <div className="actions">
            <Link href={`/board/edit/${id}`} className="edit-btn">Edit</Link>
            <button onClick={handleDelete} className="delete-btn">Delete</button>
          </div>
        </div>

        <article className="glass-panel post-content">
          <header className="post-header">
            <h1>{post.title}</h1>
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </header>
          {post.image && (
            <div className="post-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}
          <div className="post-body">
            {post.content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </article>

        <div className="comments-section glass-panel">
          <h3>Comments</h3>
          <ul className="comment-list">
            {post.comments && post.comments.map(comment => (
              <li key={comment.id} className="comment-item">
                <p className="comment-text">{comment.text}</p>
                <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
              </li>
            ))}
            {(!post.comments || post.comments.length === 0) && (
              <li className="no-comments">No comments yet.</li>
            )}
          </ul>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea name="comment" placeholder="Write a comment..." required></textarea>
            <button type="submit">Add Comment</button>
          </form>
        </div>
      </div>

      <style jsx>{`
        .post-container {
          max-width: 800px;
          margin: 0 auto;
        }
        .post-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        .back-link {
          color: var(--text-secondary);
        }
        .back-link:hover {
          color: var(--accent-color);
        }
        .actions {
            display: flex;
            gap: 10px;
        }
        .edit-btn {
          background: rgba(0, 242, 255, 0.1);
          color: var(--accent-color);
          border: 1px solid var(--accent-color);
          padding: 5px 15px;
          border-radius: 4px;
          text-decoration: none;
          font-size: 0.9rem;
        }
        .edit-btn:hover {
            background: rgba(0, 242, 255, 0.2);
            box-shadow: 0 0 10px rgba(0, 242, 255, 0.3);
        }
        .delete-btn {
          background: rgba(255, 0, 0, 0.2);
          color: #ff4444;
          border: 1px solid #ff4444;
          padding: 5px 15px;
          border-radius: 4px;
          cursor: pointer;
        }
        .delete-btn:hover {
          background: rgba(255, 0, 0, 0.4);
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
        .post-image {
          margin-bottom: 2rem;
        }
        .post-image img {
          max-width: 100%;
          border-radius: 8px;
          border: 1px solid #333;
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
        .comments-section {
            margin-top: 2rem;
            padding: 2rem;
        }
        .comments-section h3 {
            margin-top: 0;
            margin-bottom: 1.5rem;
            color: var(--accent-color);
        }
        .comment-list {
            list-style: none;
            padding: 0;
            margin-bottom: 2rem;
        }
        .comment-item {
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 1rem 0;
        }
        .comment-text {
            margin: 0 0 0.5rem 0;
        }
        .comment-date {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        .comment-form textarea {
            width: 100%;
            background: rgba(0,0,0,0.3);
            border: 1px solid #333;
            color: var(--text-primary);
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 1rem;
            min-height: 80px;
        }
        .comment-form button {
            background: var(--accent-color);
            color: black;
            border: none;
            padding: 8px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: bold;
        }
      `}</style>
    </Layout>
  );
}
