import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import rkkMark from '../../assets/brand/rkk-mark.png';

export default function MobileDrawer({ isOpen, onClose }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the close button when drawer opens
      closeBtnRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Body scroll lock and background inert
  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    const footer = document.querySelector('.public-footer');

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (mainContent) {
        mainContent.setAttribute('inert', '');
        mainContent.setAttribute('aria-hidden', 'true');
      }
      if (footer) {
        footer.setAttribute('inert', '');
        footer.setAttribute('aria-hidden', 'true');
      }
    } else {
      document.body.style.overflow = '';
      if (mainContent) {
        mainContent.removeAttribute('inert');
        mainContent.removeAttribute('aria-hidden');
      }
      if (footer) {
        footer.removeAttribute('inert');
        footer.removeAttribute('aria-hidden');
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (mainContent) {
        mainContent.removeAttribute('inert');
        mainContent.removeAttribute('aria-hidden');
      }
      if (footer) {
        footer.removeAttribute('inert');
        footer.removeAttribute('aria-hidden');
      }
    };
  }, [isOpen]);


  // Trap focus (simplified version for baseline)
  useEffect(() => {
    const handleTab = (e) => {
      if (!isOpen) return;

      const focusableElements = document.querySelectorAll(
        '.drawer-content a[href], .drawer-content button:not([disabled])'
      );

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  return (
    <>
      <div
        className={`drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`drawer-content ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi utama"
        inert={isOpen ? undefined : true}
        aria-hidden={isOpen ? "false" : "true"}
      >
        <div className="drawer-header">
          <span className="brand-link">
            <img src={rkkMark} alt="" aria-hidden="true" className="brand-logo" />
            <span className="brand-text">Rumahku Konstruksi</span>
          </span>
          <button
            ref={closeBtnRef}
            className="drawer-close"
            onClick={onClose}
            aria-label="Tutup menu"
          >
            &times;
          </button>
        </div>

        <nav className="drawer-nav">
          <ul>
            <li>
              <NavLink to="/" onClick={onClose}>Beranda</NavLink>
            </li>
            <li>
              <NavLink to="/tentang" onClick={onClose}>Tentang</NavLink>
            </li>
            <li>
              <NavLink to="/cara-kerja" onClick={onClose}>Cara Kerja</NavLink>
            </li>
            <li>
              <NavLink to="/sign-in" onClick={onClose}>Masuk</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
