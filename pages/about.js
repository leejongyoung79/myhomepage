import Layout from '@/components/Layout';

export default function About() {
    return (
        <Layout title="About | Motoz">
            <div className="glass-panel content-box">
                <h1>About Me</h1>
                <p>
                    Welcome to my digital space. This website reflects my preference for
                    minimalism, cold aesthetics, and dark themes.
                </p>
                <p>
                    I am a developer who loves building things that look and feel unique.
                </p>
            </div>

            <style jsx>{`
        .content-box {
          padding: 3rem;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          color: var(--accent-color);
          text-shadow: var(--glow-accent);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          padding-bottom: 1rem;
          margin-bottom: 2rem;
        }
        p {
          line-height: 1.8;
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }
      `}</style>
        </Layout>
    );
}
