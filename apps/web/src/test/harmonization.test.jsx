import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../app/AppRouter';
import { serviceCatalog, resolvePublishedServices } from '../content/services';
import { projectCatalog, resolvePublishedProjects } from '../content/projects';

describe('PLAN-008D Visual Harmonization & Invariants', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('Route Scope & Single H1 Enforcement', () => {
    const routes = [
      { path: '/', expectedH1: /Pekerjaan konstruksi yang lebih terencana/i },
      { path: '/tentang', expectedH1: /Usaha konstruksi yang dibangun melalui sistem/i },
      { path: '/cara-kerja', expectedH1: /Sembilan fase untuk membantu pekerjaan berjalan/i },
      { path: '/layanan', expectedH1: /Daftar Layanan/i },
      { path: '/proyek', expectedH1: /Portofolio hanya ditampilkan/i },
      { path: '/proyek/tidak-ada', expectedH1: /Halaman proyek tidak tersedia/i },
      { path: '/sign-in', expectedH1: /Akses akun belum tersedia/i },
      { path: '/route-404-bebas', expectedH1: /Halaman tidak ditemukan/i }
    ];

    routes.forEach(({ path, expectedH1 }) => {
      it(`enforces exactly one H1 for route ${path}`, () => {
        render(
          <MemoryRouter initialEntries={[path]}>
            <AppRoutes />
          </MemoryRouter>
        );

        const h1Elements = screen.getAllByRole('heading', { level: 1 });
        expect(h1Elements.length).toBe(1);
        expect(h1Elements[0]).toHaveTextContent(expectedH1);
      });
    });
  });

  describe('No Remote Assets & Local SVG Illustrations', () => {
    const routes = ['/', '/tentang', '/cara-kerja', '/layanan', '/proyek', '/proyek/invalid-slug', '/sign-in', '/404-test'];

    routes.forEach((path) => {
      it(`ensures all images on route ${path} use local assets only`, () => {
        render(
          <MemoryRouter initialEntries={[path]}>
            <AppRoutes />
          </MemoryRouter>
        );

        const images = document.querySelectorAll('img');
        images.forEach((img) => {
          const src = img.getAttribute('src');
          if (src) {
            expect(src).not.toMatch(/^https?:/i);
            expect(src).not.toMatch(/cloudinary/i);
          }
        });
      });
    });

    it('renders local SVG illustration for /layanan empty state', () => {
      render(
        <MemoryRouter initialEntries={['/layanan']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const svgs = document.querySelectorAll('svg[viewBox="0 0 240 180"]');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('renders local SVG illustration for /proyek empty state', () => {
      render(
        <MemoryRouter initialEntries={['/proyek']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const svgs = document.querySelectorAll('svg[viewBox="0 0 240 180"]');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('renders local SVG illustration for /proyek/:slug unavailable state', () => {
      render(
        <MemoryRouter initialEntries={['/proyek/tidak-ada']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const svgs = document.querySelectorAll('svg[viewBox="0 0 240 180"]');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('renders local SVG illustration for /sign-in unavailable state', () => {
      render(
        <MemoryRouter initialEntries={['/sign-in']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const svgs = document.querySelectorAll('svg[viewBox="0 0 240 180"]');
      expect(svgs.length).toBeGreaterThan(0);
    });

    it('renders local SVG illustration for 404 not found route', () => {
      render(
        <MemoryRouter initialEntries={['/halaman-salah-123']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const svgs = document.querySelectorAll('svg[viewBox="0 0 240 180"]');
      expect(svgs.length).toBeGreaterThan(0);
    });
  });

  describe('Publication & Commercial Invariants', () => {
    it('verifies published services count is exactly zero', () => {
      const published = resolvePublishedServices(serviceCatalog);
      expect(published.length).toBe(0);
    });

    it('verifies published projects count is exactly zero and catalog is empty', () => {
      expect(projectCatalog).toEqual([]);
      const published = resolvePublishedProjects(projectCatalog);
      expect(published.length).toBe(0);
    });

    it('verifies no transaction CTA or forms exist on public pages', () => {
      render(
        <MemoryRouter initialEntries={['/layanan']}>
          <AppRoutes />
        </MemoryRouter>
      );

      expect(document.querySelector('form')).toBeNull();
      expect(screen.queryByText(/Beli/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Bayar/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Checkout/i)).not.toBeInTheDocument();
    });

    it('verifies no forbidden word "segera" in service list content', () => {
      render(
        <MemoryRouter initialEntries={['/layanan']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const pageText = document.body.textContent || '';
      expect(pageText.toLowerCase()).not.toContain('segera');
    });
  });

  describe('Tentang Page Visual & Content Contract', () => {
    it('renders About Hero with responsive WebP image and caption', () => {
      render(
        <MemoryRouter initialEntries={['/tentang']}>
          <AppRoutes />
        </MemoryRouter>
      );

      const heroImg = document.querySelector('.about-hero-img');
      expect(heroImg).not.toBeNull();
      expect(heroImg.getAttribute('srcset')).toContain('about-hero-planning-640.webp');
      expect(heroImg.getAttribute('srcset')).toContain('about-hero-planning-960.webp');
      expect(heroImg.getAttribute('srcset')).toContain('about-hero-planning-1440.webp');
      expect(screen.getByText('Foto ilustrasi diskusi perencanaan arsitektur dan konstruksi')).toBeInTheDocument();
    });

    it('renders About Vision with supporting WebP image and caption', () => {
      render(
        <MemoryRouter initialEntries={['/tentang']}>
          <AppRoutes />
        </MemoryRouter>
      );

      const supportingImg = document.querySelector('.vision-supporting-img');
      expect(supportingImg).not.toBeNull();
      expect(supportingImg.getAttribute('srcset')).toContain('about-supporting-planning-640.webp');
      expect(supportingImg.getAttribute('srcset')).toContain('about-supporting-planning-960.webp');
      expect(screen.getByText('Foto ilustrasi pengawasan dan koordinasi teknis pekerjaan konstruksi')).toBeInTheDocument();
    });

    it('does not contain prohibited legal, history, team capacity, or client claims', () => {
      render(
        <MemoryRouter initialEntries={['/tentang']}>
          <AppRoutes />
        </MemoryRouter>
      );

      const pageText = document.body.textContent || '';
      expect(pageText).not.toContain('Sejak tahun 1990');
      expect(pageText).not.toContain('Ribuan Klien');
      expect(pageText).not.toContain('Garansi 100%');
    });
  });

  describe('Cara Kerja Page 9-Phase Integrity', () => {
    it('renders all 9 phases in correct sequential order', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );

      for (let i = 1; i <= 9; i++) {
        const numStr = i < 10 ? `0${i}` : `${i}`;
        expect(screen.getAllByText(new RegExp(`Fase ${numStr}`, 'i')).length).toBeGreaterThan(0);
      }
    });

    it('renders decision gates and cross-phase control sections', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );

      expect(screen.getAllByText(/Titik Keputusan/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/KONTROL LINTAS PROSES/i).length).toBeGreaterThan(0);
    });
  });

  describe('Sign-in & 404 Recovery Navigation', () => {
    it('renders sign-in unavailable page without active login form', () => {
      render(
        <MemoryRouter initialEntries={['/sign-in']}>
          <AppRoutes />
        </MemoryRouter>
      );

      expect(document.querySelector('form')).toBeNull();
      expect(document.querySelector('input[type="password"]')).toBeNull();
      expect(screen.getByText('Kembali ke Beranda')).toBeInTheDocument();
    });

    it('renders 404 page with clear recovery navigation to Beranda', () => {
      render(
        <MemoryRouter initialEntries={['/non-existent-route']}>
          <AppRoutes />
        </MemoryRouter>
      );

      expect(screen.getByText('404')).toBeInTheDocument();
      const backLink = screen.getByText('Kembali ke Beranda');
      expect(backLink.closest('a')).toHaveAttribute('href', '/');
    });
  });
});
