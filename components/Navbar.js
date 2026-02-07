import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <nav className="navbar glass-panel">
      <div className="nav-content">
        <Link href="/" className="logo">
          <img
            src="/logo.png"
            alt="COLD & DARK"
            className="logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <span className="logo-text" style={{ display: 'none' }}>COLD & DARK</span>
        </Link>
        <div className="links">
          <NavLink href="/" label="HOME" active={isActive('/')} />
          <NavLink href="/about" label="ABOUT" active={isActive('/about')} />
          <NavLink href="/board" label="BOARD" active={isActive('/board')} />
          <NavLink href="/contact" label="CONTACT" active={isActive('/contact')} />
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 70px;
          z-index: 1000;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .nav-content {
          max-width: var(--max-width);
          margin: 0 auto;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
        }

        .logo {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .logo-img {
          height: 45px;
          width: auto;
          display: block;
          filter: drop-shadow(0 0 10px rgba(0, 242, 255, 0.3));
          transition: transform 0.3s ease;
        }

        .logo-img:hover {
          transform: scale(1.05);
        }

        .links {
          display: flex;
          gap: 2rem;
        }

        @media (max-width: 600px) {
          .links {
            gap: 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </nav>
  );
}

function NavLink({ href, label, active }) {
  return (
    <Link href={href} className={`nav-link ${active ? 'active' : ''}`}>
      {label}
      <style jsx>{`
        .nav-link {
          position: relative;
          color: var(--text-secondary);
          font-weight: 500;
          letter-spacing: 1px;
        }
        .nav-link:hover, .nav-link.active {
          color: var(--accent-color);
          text-shadow: var(--glow-accent);
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--accent-color);
          box-shadow: var(--glow-accent);
        }
      `}</style>
    </Link>
  );
}
