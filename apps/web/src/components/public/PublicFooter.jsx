import { Link } from 'react-router-dom';
import rkkMark from '../../assets/brand/rkk-mark.png';

export default function PublicFooter() {
  return (
    <footer className="public-footer" role="contentinfo">
      <div className="public-container">
        <div className="footer-content">
          <div className="footer-brand">
            <Link to="/" className="brand-link" aria-label="Rumahku Konstruksi">
              <img src={rkkMark} alt="" aria-hidden="true" className="brand-logo" />
              <span className="brand-text">Rumahku Konstruksi</span>
            </Link>
            <p className="footer-desc">
              Pendekatan terstruktur untuk membantu kebutuhan konstruksi memiliki arah, konteks, dan dokumentasi yang lebih jelas.
            </p>
          </div>
          
          <nav className="footer-nav" aria-label="Navigasi Footer">
            <ul>
              <li>
                <Link to="/">Beranda</Link>
              </li>
              <li>
                <Link to="/tentang">Tentang RKK</Link>
              </li>
              <li>
                <Link to="/cara-kerja">Cara Kerja</Link>
              </li>
              <li>
                <Link to="/layanan">Layanan</Link>
              </li>
              <li>
                <Link to="/proyek">Proyek</Link>
              </li>
              <li>
                <Link to="/sign-in">Masuk</Link>
              </li>
            </ul>
          </nav>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rumahku Konstruksi. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
