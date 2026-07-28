import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../app/AppRouter';
import { DemoContextProvider } from '../context/DemoContext';
import { createDemoContext, clearDemoContext, readDemoContext, DEMO_STORAGE_KEY } from '../utils/demoContext';

function renderWithRouter(initialEntry = '/') {
  return render(
    <DemoContextProvider>
      <MemoryRouter initialEntries={[initialEntry]}>
        <AppRoutes />
      </MemoryRouter>
    </DemoContextProvider>
  );
}

describe('PLAN-009 Access Pages, Sign-in, Routing & Boundary Tests', () => {
  beforeEach(() => {
    clearDemoContext();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    clearDemoContext();
    window.sessionStorage.clear();
  });

  describe('/demo Access Gateway Page', () => {
    it('renders DemoAccessPage with MODE DEMO badge, title, description, and notes', () => {
      renderWithRouter('/demo');

      expect(screen.getByText('MODE DEMO')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: /Lihat Pengalaman Portal Konsumen RKK/i })).toBeInTheDocument();
      expect(screen.getByText(/Jelajahi contoh alur Portal Konsumen menggunakan data sintetis/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Masuk ke Demo Portal Konsumen/i })).toBeInTheDocument();
      expect(screen.getAllByRole('link', { name: /Kembali ke Website/i }).length).toBeGreaterThan(0);
    });

    it('creates Demo Context and navigates to /portal when clicking main button', () => {
      renderWithRouter('/demo');

      const enterBtn = screen.getByRole('button', { name: /Masuk ke Demo Portal Konsumen/i });
      fireEvent.click(enterBtn);

      const activeCtx = readDemoContext();
      expect(activeCtx).not.toBeNull();
      expect(activeCtx.persona).toBe('customer');

      expect(screen.getByText(/Customer Portal RKK \(Akses Boundary\)/i)).toBeInTheDocument();
    });
  });

  describe('/sign-in Official Sign-in Page', () => {
    it('renders SignInPage with identifier, password input, show/hide toggle, and disabled Google button', () => {
      renderWithRouter('/sign-in');

      expect(screen.getByRole('heading', { level: 1, name: /Masuk ke Akun RKK/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/Email atau nomor telepon/i)).toBeInTheDocument();
      expect(screen.getByLabelText('Password', { selector: 'input' })).toBeInTheDocument();

      const togglePwdBtn = screen.getByRole('button', { name: /Tampilkan password/i });
      expect(togglePwdBtn).toBeInTheDocument();

      const googleBtn = screen.getByRole('button', { name: /Lanjutkan dengan Google/i });
      expect(googleBtn).toBeDisabled();
      expect(googleBtn).toHaveAttribute('aria-disabled', 'true');
    });

    it('toggles password visibility when clicking Tampilkan/Sembunyikan button', () => {
      renderWithRouter('/sign-in');

      const passwordInput = screen.getByLabelText('Password', { selector: 'input' });
      expect(passwordInput).toHaveAttribute('type', 'password');

      const toggleBtn = screen.getByRole('button', { name: /Tampilkan password/i });
      fireEvent.click(toggleBtn);

      expect(passwordInput).toHaveAttribute('type', 'text');
      expect(screen.getByRole('button', { name: /Sembunyikan password/i })).toBeInTheDocument();
    });

    it('validates required fields on submit without creating session', () => {
      renderWithRouter('/sign-in');

      const submitBtn = screen.getByRole('button', { name: /^Masuk$/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Email atau nomor telepon wajib diisi/i)).toBeInTheDocument();
      expect(screen.getByText(/Password wajib diisi/i)).toBeInTheDocument();
      expect(readDemoContext()).toBeNull();
    });

    it('displays honest notice when valid inputs are submitted', () => {
      renderWithRouter('/sign-in');

      const identifierInput = screen.getByLabelText(/Email atau nomor telepon/i);
      const passwordInput = screen.getByLabelText('Password', { selector: 'input' });

      fireEvent.change(identifierInput, { target: { value: '  user@example.com  ' } });
      fireEvent.change(passwordInput, { target: { value: 'secret123' } });

      const submitBtn = screen.getByRole('button', { name: /^Masuk$/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Layanan masuk resmi RKK belum diaktifkan pada tahap presentasi ini/i)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Buka Halaman Demo/i })).toBeInTheDocument();
      expect(readDemoContext()).toBeNull(); // No auth session created
    });
  });

  describe('PortalAccessBoundary & /portal Placeholder', () => {
    it('redirects /portal to /demo when no Demo Context exists', () => {
      renderWithRouter('/portal');

      expect(screen.getByText('MODE DEMO')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: /Lihat Pengalaman Portal Konsumen RKK/i })).toBeInTheDocument();
    });

    it('allows access to /portal when valid Demo Context exists', () => {
      createDemoContext();
      renderWithRouter('/portal');

      expect(screen.getByText(/Customer Portal RKK \(Akses Boundary\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Pelanggan Demo RKK/i)).toBeInTheDocument();
      expect(screen.getByText(/DEMO-CUSTOMER-001/i)).toBeInTheDocument();
    });

    it('clears context and redirects /portal to /demo when context is expired', () => {
      const expiredCtx = {
        schemaVersion: 1,
        mode: 'demo',
        persona: 'customer',
        sessionId: 'demo-sys-exp-test',
        displayName: 'Expired Demo',
        customerReference: 'DEMO-CUSTOMER-001',
        projectReferences: ['DEMO-PROJECT-001'],
        createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
        expiresAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
      };
      window.sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(expiredCtx));

      renderWithRouter('/portal');

      expect(screen.getByText('MODE DEMO')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1, name: /Lihat Pengalaman Portal Konsumen RKK/i })).toBeInTheDocument();
      expect(readDemoContext()).toBeNull();
    });
  });

  describe('AuthPageShell & Public Route Invariants', () => {
    it('renders AuthPageShell header and branding on /demo and /sign-in without public nav/footer noise', () => {
      renderWithRouter('/demo');

      const brands = screen.getAllByLabelText(/Rumahku Konstruksi - Beranda/i);
      expect(brands.length).toBeGreaterThan(0);
      expect(screen.queryByRole('navigation', { name: /Utama/i })).not.toBeInTheDocument();
    });

    it('maintains all public routes stability', () => {
      const publicRoutes = ['/', '/tentang', '/cara-kerja', '/layanan', '/proyek'];

      publicRoutes.forEach((route) => {
        const { unmount } = renderWithRouter(route);
        const h1 = screen.getByRole('heading', { level: 1 });
        expect(h1).toBeInTheDocument();
        unmount();
      });
    });

    it('redirects /about to /tentang', () => {
      renderWithRouter('/about');
      expect(screen.getByRole('heading', { level: 1, name: /Usaha konstruksi/i })).toBeInTheDocument();
    });

    it('renders 404 page for unknown routes', () => {
      renderWithRouter('/unknown-route-test');
      expect(screen.getByRole('heading', { level: 1, name: /Halaman Tidak Ditemukan/i })).toBeInTheDocument();
    });
  });
});
