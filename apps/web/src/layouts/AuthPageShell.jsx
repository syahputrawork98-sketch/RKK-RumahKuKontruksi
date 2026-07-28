import { Outlet } from 'react-router-dom';
import ActionLink from '../components/ui/ActionLink';
import rkkMark from '../assets/brand/rkk-mark.png';

export default function AuthPageShell() {
  return (
    <div className="access-page">
      <a href="#main-content" className="skip-link">
        Langsung ke konten utama
      </a>
      <header className="access-page__header">
        <div className="access-page__header-inner">
          <ActionLink href="/" className="access-page__brand" aria-label="Rumahku Konstruksi - Beranda">
            <img src={rkkMark} alt="" className="access-page__brand-mark" width="36" height="36" />
            <span className="access-page__brand-text">Rumahku Konstruksi</span>
          </ActionLink>
          <ActionLink href="/" variant="outline" className="btn-sm">
            Kembali ke Website
          </ActionLink>
        </div>
      </header>

      <main id="main-content" className="access-page__main" tabIndex="-1">
        <Outlet />
      </main>

      <footer className="access-page__footer">
        <p className="access-page__footer-text">
          &copy; {new Date().getFullYear()} Rumahku Konstruksi (RKK). Seluruh hak cipta dilindungi.
        </p>
      </footer>
    </div>
  );
}
