import { useState, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import MobileDrawer from './MobileDrawer';
import rkkMark from '../../assets/brand/rkk-mark.png';

export default function PublicHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const menuBtnRef = useRef(null);

  const openDrawer = () => setDrawerOpen(true);
  
  const closeDrawer = () => {
    setDrawerOpen(false);
    // Return focus to menu button after drawer closes
    menuBtnRef.current?.focus();
  };

  return (
    <header className="public-header" role="banner">
      <div className="public-container">
        <div className="header-content">
          <Link to="/" className="brand-link" aria-label="Rumahku Konstruksi">
            <img src={rkkMark} alt="" aria-hidden="true" className="brand-logo" />
            <span className="brand-text">Rumahku Konstruksi</span>
          </Link>

          <nav className="desktop-nav" aria-label="Navigasi Utama">
            <ul>
              <li>
                <NavLink to="/">Beranda</NavLink>
              </li>
              <li>
                <NavLink to="/tentang">Tentang</NavLink>
              </li>
              <li>
                <NavLink to="/cara-kerja">Cara Kerja</NavLink>
              </li>
              <li>
                <NavLink to="/layanan">Layanan</NavLink>
              </li>
              <li>
                <NavLink to="/proyek">Proyek</NavLink>
              </li>
              <li>
                <NavLink to="/sign-in">Masuk</NavLink>
              </li>
            </ul>
          </nav>

          <button 
            ref={menuBtnRef}
            className="mobile-menu-btn" 
            onClick={openDrawer}
            aria-expanded={drawerOpen}
            aria-label="Buka menu navigasi"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <MobileDrawer isOpen={drawerOpen} onClose={closeDrawer} />
    </header>
  );
}
