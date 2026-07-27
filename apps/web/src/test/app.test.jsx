import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter, { AppRoutes } from '../app/AppRouter';

describe('PublicAppShell', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders Beranda route correctly with correct brand and H1', () => {
    render(<AppRouter />);

    expect(screen.getByRole('banner')).toBeInTheDocument();

    // Check if hero title exists (H1 hero sesuai PLAN-001)
    expect(screen.getByText(/Pekerjaan konstruksi yang lebih terencana, terkendali, transparan, dan terdokumentasi/i)).toBeInTheDocument();

    // Check brand name displays "Rumahku Konstruksi"
    const brandElements = screen.getAllByText(/Rumahku Konstruksi/i);
    expect(brandElements.length).toBeGreaterThan(0);

    // Verify wrong spelling doesn't exist
    expect(screen.queryByText(/RumahKu\s?Kontruksi/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/RUMAHKU\s?KONTRUKSI/i)).not.toBeInTheDocument();

    // Check brand logo is local
    const logos = document.querySelectorAll('.brand-logo');
    expect(logos.length).toBeGreaterThan(0);
    logos.forEach(logo => {
      expect(logo.getAttribute('src')).not.toMatch(/^https?:/);
      expect(logo.getAttribute('src')).not.toMatch(/cloudinary/i);
    });

    // Check no remote image exists on page
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        expect(src).not.toMatch(/^https?:/);
        expect(src).not.toMatch(/cloudinary/i);
      }
    });
  });

  it('validates CTA Pelajari Cara Kerja and Hold Action behavior', () => {
    render(<AppRouter />);

    // CTA Pelajari Cara Kerja menuju /cara-kerja
    const caraKerjaBtns = screen.getAllByText('Pelajari Cara Kerja');
    const heroBtn = caraKerjaBtns[0];
    expect(heroBtn.closest('a')).toHaveAttribute('href', '/cara-kerja');

    // Hold action bukan link dan tidak memiliki target navigasi
    const holdAction = screen.getAllByText('Ajukan Kebutuhan')[0];
    expect(holdAction.tagName).toBe('BUTTON');
    expect(holdAction).toHaveAttribute('aria-disabled', 'true');
    expect(holdAction.closest('a')).toBeNull();
    expect(holdAction).not.toHaveAttribute('href');
  });

  it('validates active navigation has aria-current="page"', () => {
    render(
      <MemoryRouter initialEntries={['/cara-kerja']}>
        <AppRoutes />
      </MemoryRouter>
    );

    const nav = screen.getByLabelText('Navigasi Utama');
    const activeLink = within(nav).getByText('Cara Kerja');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('renders unavailable state for /tentang', () => {
    render(
      <MemoryRouter initialEntries={['/tentang']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Sedang disiapkan')).toBeInTheDocument();
    expect(screen.getByText('Halaman Tentang sedang disiapkan.')).toBeInTheDocument();
  });

  it('renders unavailable state for /cara-kerja', () => {
    render(
      <MemoryRouter initialEntries={['/cara-kerja']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Sedang disiapkan')).toBeInTheDocument();
    expect(screen.getByText('Halaman Cara Kerja sedang disiapkan.')).toBeInTheDocument();
  });

  it('renders unavailable state for /sign-in and no role dummy/auth', () => {
    render(
      <MemoryRouter initialEntries={['/sign-in']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('Sedang disiapkan')).toBeInTheDocument();
    expect(screen.getByText('Akses akun belum tersedia pada tahap ini.')).toBeInTheDocument();

    // role dummy dan autentikasi simulasi tidak tampil sebagai interaktif
    expect(screen.queryByRole('button', { name: /role\s?demo/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /login\s?simulasi/i })).not.toBeInTheDocument();
  });

  it('renders 404 state for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route-123']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Halaman tidak ditemukan')).toBeInTheDocument();
  });

  it('manages drawer accessibility, focus, and body scroll lock', async () => {
    render(<AppRouter />);

    const menuBtn = screen.getByLabelText('Buka menu navigasi');
    const drawer = screen.getByRole('dialog', { hidden: true });

    // Initial state: drawer tertutup tidak berada dalam tab order
    expect(drawer).toHaveAttribute('inert');
    expect(drawer).toHaveAttribute('aria-hidden', 'true');
    expect(document.body.style.overflow).not.toBe('hidden');

    // Open drawer
    fireEvent.click(menuBtn);
    expect(drawer).toHaveClass('open');

    // body scroll terkunci saat drawer terbuka
    expect(document.body.style.overflow).toBe('hidden');
    expect(drawer).not.toHaveAttribute('inert');
    expect(drawer).toHaveAttribute('aria-hidden', 'false');

    // Close using close button
    const closeBtn = screen.getByLabelText('Tutup menu', { hidden: true });
    fireEvent.click(closeBtn);

    // Wait for drawer to close
    await waitFor(() => {
      expect(drawer).not.toHaveClass('open');
    });

    // focus kembali ke tombol menu setelah drawer ditutup
    expect(document.activeElement).toBe(menuBtn);

    // body scroll kembali normal setelah drawer ditutup
    expect(document.body.style.overflow).toBe('');
    expect(drawer).toHaveAttribute('inert');
    expect(drawer).toHaveAttribute('aria-hidden', 'true');
  });

  it('closes drawer with Escape key', () => {
    render(<AppRouter />);

    const menuBtn = screen.getByLabelText('Buka menu navigasi');
    fireEvent.click(menuBtn);

    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveClass('open');

    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });

    expect(drawer).not.toHaveClass('open');
  });
});
