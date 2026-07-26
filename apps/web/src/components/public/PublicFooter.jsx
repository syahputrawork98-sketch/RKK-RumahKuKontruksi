import { Link } from 'react-router-dom';

export default function PublicFooter() {
  return (
    <footer className="public-footer" role="contentinfo">
      <div className="public-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>RumahKuKontruksi</h2>
            <p className="footer-desc">
              Pendekatan terencana dan terkendali untuk kebutuhan konstruksi Anda.
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
            </ul>
          </nav>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} RumahKuKontruksi. Seluruh hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
