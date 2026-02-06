import Layout from '@/components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="hero">
        <h1 className="title">
          <span className="fade-in d-1">COLD</span>
          <span className="divider fade-in d-2">/</span>
          <span className="fade-in d-3">DARK</span>
        </h1>
        <p className="subtitle fade-in d-4">
          Personal Archive & Creative Space
        </p>
      </div>

      <style jsx>{`
        .hero {
          min-height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .title {
          font-size: 5rem;
          font-weight: 800;
          letter-spacing: 0.5rem;
          margin: 0;
          line-height: 1;
        }

        .divider {
          color: var(--accent-color);
          margin: 0 1rem;
          text-shadow: var(--glow-accent);
        }

        .subtitle {
          margin-top: 2rem;
          font-size: 1.2rem;
          color: var(--text-secondary);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .fade-in {
          opacity: 0;
          animation: fadeAppear 1s forwards;
        }
        .d-1 { animation-delay: 0.2s; }
        .d-2 { animation-delay: 0.4s; }
        .d-3 { animation-delay: 0.6s; }
        .d-4 { animation-delay: 1s; }

        @keyframes fadeAppear {
          to { opacity: 1; }
        }

        @media (max-width: 600px) {
          .title { font-size: 3rem; }
        }
      `}</style>
    </Layout>
  );
}
