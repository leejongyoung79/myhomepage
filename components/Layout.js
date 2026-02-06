import Head from 'next/head';
import Navbar from './Navbar';

export default function Layout({ children, title = "My Homepage" }) {
  return (
    <div className="layout-container">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Personal Homepage" />
      </Head>

      <Navbar />

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} Motoz. Cold & Dark.
      </footer>

      <style jsx>{`
        .layout-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          position: relative;
        }
        
        .main-content {
          flex: 1;
          width: 100%;
          max-width: var(--max-width);
          margin: 0 auto;
          padding: 2rem;
          padding-top: 100px; /* Space for fixed navbar */
          animation: fadeIn 0.5s ease-out;
        }

        .footer {
          text-align: center;
          padding: 2rem;
          color: var(--text-secondary);
          font-size: 0.8rem;
          border-top: 1px solid var(--surface-border);
          margin-top: 4rem;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
