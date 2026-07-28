import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../app/AppRouter';
import { workProcessContent } from '../content/workProcess';
import { serviceCatalog, serviceListContent, resolvePublishedServices } from '../content/services';
import { projectCatalog, projectListContent, resolvePublishedProjects } from '../content/projects';
import fs from 'fs';
import path from 'path';

describe('PLAN-008D Visual Harmonization & Invariants (Fix-Forward)', () => {
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

    routes.forEach(({ path: routePath, expectedH1 }) => {
      it(`enforces exactly one H1 for route ${routePath}`, () => {
        render(
          <MemoryRouter initialEntries={[routePath]}>
            <AppRoutes />
          </MemoryRouter>
        );

        const h1Elements = screen.getAllByRole('heading', { level: 1 });
        expect(h1Elements.length).toBe(1);
        expect(h1Elements[0]).toHaveTextContent(expectedH1);
      });
    });
  });

  describe('No Remote Assets & Local Single-Source SVG Illustrations', () => {
    const routes = ['/', '/tentang', '/cara-kerja', '/layanan', '/proyek', '/proyek/invalid-slug', '/sign-in', '/404-test'];

    routes.forEach((routePath) => {
      it(`ensures all images on route ${routePath} use local assets only`, () => {
        render(
          <MemoryRouter initialEntries={[routePath]}>
            <AppRoutes />
          </MemoryRouter>
        );

        const images = document.querySelectorAll('img');
        images.forEach((img) => {
          const src = img.getAttribute('src');
          const srcset = img.getAttribute('srcset');
          if (src) {
            expect(src).not.toMatch(/^https?:/i);
            expect(src).not.toMatch(/cloudinary/i);
          }
          if (srcset) {
            expect(srcset).not.toMatch(/^https?:/i);
          }
        });
      });
    });

    it('renders data-illustration="service-publication-gate" for /layanan empty state', () => {
      render(
        <MemoryRouter initialEntries={['/layanan']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const img = document.querySelector('img[data-illustration="service-publication-gate"]');
      expect(img).not.toBeNull();
    });

    it('renders data-illustration="project-empty-state" for /proyek empty state', () => {
      render(
        <MemoryRouter initialEntries={['/proyek']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const img = document.querySelector('img[data-illustration="project-empty-state"]');
      expect(img).not.toBeNull();
    });

    it('renders data-illustration="project-empty-state" for /proyek/:slug unavailable state', () => {
      render(
        <MemoryRouter initialEntries={['/proyek/tidak-ada']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const img = document.querySelector('img[data-illustration="project-empty-state"]');
      expect(img).not.toBeNull();
    });

    it('renders data-illustration="portal-unavailable" for /sign-in unavailable state', () => {
      render(
        <MemoryRouter initialEntries={['/sign-in']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const img = document.querySelector('img[data-illustration="portal-unavailable"]');
      expect(img).not.toBeNull();
    });

    it('renders data-illustration="not-found-route" for 404 not found route', () => {
      render(
        <MemoryRouter initialEntries={['/halaman-salah-123']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const img = document.querySelector('img[data-illustration="not-found-route"]');
      expect(img).not.toBeNull();
    });
  });

  describe('About Page Scoping & Hero Cleanup', () => {
    it('verifies AboutPage has root container with .about-page class', () => {
      render(
        <MemoryRouter initialEntries={['/tentang']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const aboutRoot = document.querySelector('.about-page');
      expect(aboutRoot).not.toBeNull();
    });

    it('verifies AboutHero contains no elements with inline style attribute', () => {
      render(
        <MemoryRouter initialEntries={['/tentang']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const heroSection = document.querySelector('#about-hero');
      expect(heroSection).not.toBeNull();
      const elementsWithStyle = heroSection.querySelectorAll('[style]');
      expect(elementsWithStyle.length).toBe(0);
    });

    it('verifies hero image has fetchpriority="high" and decoding="async"', () => {
      render(
        <MemoryRouter initialEntries={['/tentang']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const heroImg = document.querySelector('.about-hero-img');
      expect(heroImg).not.toBeNull();
      expect(heroImg.getAttribute('fetchpriority')).toBe('high');
      expect(heroImg.getAttribute('decoding')).toBe('async');
    });

    it('verifies supporting image has decoding="async"', () => {
      render(
        <MemoryRouter initialEntries={['/tentang']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const supportingImg = document.querySelector('.vision-supporting-img');
      expect(supportingImg).not.toBeNull();
      expect(supportingImg.getAttribute('decoding')).toBe('async');
    });

    it('verifies About hero and vision still render illustration captions', () => {
      render(
        <MemoryRouter initialEntries={['/tentang']}>
          <AppRoutes />
        </MemoryRouter>
      );
      expect(screen.getByText('Foto ilustrasi diskusi perencanaan arsitektur dan konstruksi')).toBeInTheDocument();
      expect(screen.getByText('Foto ilustrasi peninjauan blueprint dan dokumen perencanaan')).toBeInTheDocument();
    });
  });

  describe('Cara Kerja Visual Harmonization & 9-Phase Integrity', () => {
    it('verifies WorkHero uses ActionLink and contains visual process map', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const primaryAction = screen.getAllByRole('link', { name: 'Pelajari Tentang RKK' })[0];
      expect(primaryAction).toHaveClass('btn', 'btn-primary');
      const processMap = document.querySelector('[data-visual="process-map"]');
      expect(processMap).not.toBeNull();
    });

    it('verifies WorkHero renders process map directly from content map groups', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );

      const processMap = document.querySelector('[data-visual="process-map"]');
      expect(processMap).not.toBeNull();
      expect(processMap).toHaveTextContent('Memahami dan menilai kebutuhan.');
      expect(processMap).toHaveTextContent('Menyiapkan dasar dan kesiapan.');
      expect(processMap).toHaveTextContent('Melaksanakan, menyerahkan, dan belajar.');

      expect(screen.queryByText(/Inisiasi & Perencanaan/i)).toBeNull();
      expect(screen.queryByText(/Kesepakatan & Pelaksanaan/i)).toBeNull();
      expect(screen.queryByText(/Serah Terima & Evaluasi/i)).toBeNull();
      expect(screen.queryByText(/pelaksanaan fisik\/teknis/i)).toBeNull();

      const mapNodes = document.querySelectorAll('.process-map-node');
      expect(mapNodes.length).toBe(3);

      const mapConnectors = document.querySelectorAll('.process-map-connector');
      expect(mapConnectors.length).toBe(2);

      const groupIds = Array.from(mapNodes).map(node => node.getAttribute('data-group'));
      expect(groupIds).toEqual(['memahami-kebutuhan', 'menyiapkan-dasar', 'melaksanakan-dan-menutup']);

      const iconNames = Array.from(mapNodes).map(node => node.getAttribute('data-icon'));
      expect(iconNames).toEqual(['compass', 'clipboard-list', 'hammer']);
    });

    it('renders 4 reading principles with 4 distinct icon keys', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );
      expect(document.querySelector('[data-icon="target"]')).not.toBeNull();
      expect(document.querySelector('[data-icon="search-check"]')).not.toBeNull();
      expect(document.querySelector('[data-icon="refresh-cw"]')).not.toBeNull();
      expect(document.querySelector('[data-icon="shield-check"]')).not.toBeNull();
    });

    it('verifies NinePhaseOverview renders 9 process rail nodes with number, icon, title, and connectors', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const nodes = document.querySelectorAll('.overview-list.process-rail .process-node');
      expect(nodes.length).toBe(9);

      const numbers = document.querySelectorAll('.overview-list.process-rail .node-number');
      expect(numbers.length).toBe(9);

      const icons = document.querySelectorAll('.overview-list.process-rail .node-icon');
      expect(icons.length).toBe(9);

      const titles = document.querySelectorAll('.overview-list.process-rail .node-title');
      expect(titles.length).toBe(9);

      const connectors = document.querySelectorAll('.overview-list.process-rail .node-connector');
      expect(connectors.length).toBe(8);

      const expectedTitles = [
        'Kebutuhan Masuk',
        'Kualifikasi dan Penyaringan',
        'Perumusan Kebutuhan dan Pemeriksaan Awal',
        'Perencanaan, Desain, Estimasi, dan RAB',
        'Kelayakan, Penawaran, dan Kesepakatan',
        'Aktivasi dan Kesiapan',
        'Pelaksanaan dan Pengendalian',
        'Pemeriksaan Akhir, Serah Terima, dan Penutupan',
        'Evaluasi dan Pembelajaran'
      ];

      titles.forEach((element, index) => {
        expect(element.textContent).toBe(expectedTitles[index]);
      });

      const expectedPhaseIcons = {
        '01': 'compass',
        '02': 'search-check',
        '03': 'eye',
        '04': 'pen-tool',
        '05': 'check-circle',
        '06': 'clipboard-list',
        '07': 'hammer',
        '08': 'file-check',
        '09': 'refresh-cw'
      };

      nodes.forEach(node => {
        const phaseNum = node.getAttribute('data-phase');
        const iconName = node.getAttribute('data-icon');
        expect(expectedPhaseIcons[phaseNum]).toBe(iconName);
      });
    });

    it('verifies process rail maintains single-column vertical layout on all viewports', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const rail = document.querySelector('.overview-list.process-rail');
      expect(rail).not.toBeNull();
      const nodes = rail.querySelectorAll('.process-node');
      expect(nodes.length).toBe(9);
      const connectors = rail.querySelectorAll('.node-connector');
      expect(connectors.length).toBe(8);
      const lastNode = nodes[8];
      expect(lastNode.querySelector('.node-connector')).toBeNull();
    });

    it('verifies work-process.css contains required connector selectors and no 3-column rail media query', () => {
      const cssPath = path.resolve(__dirname, '../styles/work-process.css');
      const cssContent = fs.readFileSync(cssPath, 'utf-8');
      expect(cssContent).toContain('.page-work-process .process-map-connector');
      expect(cssContent).toContain('.page-work-process .node-connector');
      expect(cssContent).not.toMatch(
        /\.overview-list\.process-rail\s*\{[^}]*grid-template-columns:\s*repeat\(3,\s*1fr\)/s
      );
    });

    it('renders decision gates and cross-phase control sections with icons', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );
      expect(screen.getAllByText(/Titik Keputusan/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/KONTROL LINTAS PROSES/i).length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.gate-card').length).toBeGreaterThan(0);
      expect(document.querySelectorAll('.control-card').length).toBeGreaterThan(0);
    });
  });

  describe('Unused Abstraction Cleanup & Publication Invariants', () => {
    it('verifies IllustratedState.jsx file does not exist', () => {
      const filePath = path.resolve(__dirname, '../components/ui/IllustratedState.jsx');
      expect(fs.existsSync(filePath)).toBe(false);
    });

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

    it('verifies Beranda route contract remains unchanged', () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      expect(h1Elements.length).toBe(1);
      expect(h1Elements[0]).toHaveTextContent(/Pekerjaan konstruksi yang lebih terencana/i);
    });
  });

  describe('Button Standardization & ActionLink Consistency', () => {
    it('standardizes WorkClosingCTA buttons with ActionLink primary and outline variants', () => {
      render(
        <MemoryRouter initialEntries={['/cara-kerja']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const closingActions = document.querySelector('.closing-actions');
      expect(closingActions).not.toBeNull();
      const actions = closingActions.querySelectorAll('a');
      expect(actions.length).toBe(2);

      const primary = actions[0];
      const secondary = actions[1];

      expect(primary).toHaveClass('btn', 'btn-primary');
      expect(secondary).toHaveClass('btn', 'btn-outline');
      expect(secondary).not.toHaveClass('btn-secondary');
      expect(primary.getAttribute('href')).toBe(workProcessContent.closing.primaryAction.href);
      expect(secondary.getAttribute('href')).toBe(workProcessContent.closing.secondaryAction.href);
    });

    it('standardizes ServiceListHero buttons with ActionLink primary and outline variants', () => {
      render(
        <MemoryRouter initialEntries={['/layanan']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const heroActions = document.querySelector('.service-hero-actions');
      expect(heroActions).not.toBeNull();
      const actions = heroActions.querySelectorAll('a');
      expect(actions.length).toBe(2);

      const primary = actions[0];
      const secondary = actions[1];

      expect(primary).toHaveClass('btn', 'btn-primary');
      expect(secondary).toHaveClass('btn', 'btn-outline');
      expect(secondary).not.toHaveClass('btn-secondary');
      expect(primary.getAttribute('href')).toBe(serviceListContent.hero.primaryAction.href);
      expect(secondary.getAttribute('href')).toBe(serviceListContent.hero.secondaryAction.href);
    });

    it('standardizes ServiceClosingCTA buttons with ActionLink primary and outline variants', () => {
      render(
        <MemoryRouter initialEntries={['/layanan']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const closingSection = document.querySelector('.service-closing-section');
      expect(closingSection).not.toBeNull();
      const actions = closingSection.querySelectorAll('.closing-actions a');
      expect(actions.length).toBe(2);

      const primary = actions[0];
      const secondary = actions[1];

      expect(primary).toHaveClass('btn', 'btn-primary');
      expect(secondary).toHaveClass('btn', 'btn-outline');
      expect(secondary).not.toHaveClass('btn-secondary');
      expect(primary.getAttribute('href')).toBe(serviceListContent.closing.primaryAction.href);
      expect(secondary.getAttribute('href')).toBe(serviceListContent.closing.secondaryAction.href);
    });

    it('standardizes ProjectsPageHero buttons with ActionLink primary and outline variants', () => {
      render(
        <MemoryRouter initialEntries={['/proyek']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const heroActions = document.querySelector('.projects-hero-actions');
      expect(heroActions).not.toBeNull();
      const actions = heroActions.querySelectorAll('a');
      expect(actions.length).toBe(2);

      const primary = actions[0];
      const secondary = actions[1];

      expect(primary).toHaveClass('btn', 'btn-primary');
      expect(secondary).toHaveClass('btn', 'btn-outline');
      expect(secondary).not.toHaveClass('btn-secondary');
      expect(primary.getAttribute('href')).toBe(projectListContent.hero.primaryCTA.href);
      expect(secondary.getAttribute('href')).toBe(projectListContent.hero.secondaryCTA.href);
    });

    it('standardizes ProjectsClosingCTA buttons with ActionLink primary and outline variants', () => {
      render(
        <MemoryRouter initialEntries={['/proyek']}>
          <AppRoutes />
        </MemoryRouter>
      );
      const ctaActions = document.querySelector('.projects-cta-actions');
      expect(ctaActions).not.toBeNull();
      const actions = ctaActions.querySelectorAll('a');
      expect(actions.length).toBe(2);

      const primary = actions[0];
      const secondary = actions[1];

      expect(primary).toHaveClass('btn', 'btn-primary');
      expect(secondary).toHaveClass('btn', 'btn-outline');
      expect(secondary).not.toHaveClass('btn-secondary');
      expect(primary.getAttribute('href')).toBe(projectListContent.closingCTA.primaryCTA.href);
      expect(secondary.getAttribute('href')).toBe(projectListContent.closingCTA.secondaryCTA.href);
    });

    it('verifies target components do not import raw Link from react-router-dom', () => {
      const targetFiles = [
        '../sections/work-process/WorkClosingCTA.jsx',
        '../sections/services/ServiceListHero.jsx',
        '../sections/services/ServiceClosingCTA.jsx',
        '../sections/projects/ProjectsPageHero.jsx',
        '../sections/projects/ProjectsClosingCTA.jsx'
      ];

      targetFiles.forEach(relPath => {
        const fullPath = path.resolve(__dirname, relPath);
        const code = fs.readFileSync(fullPath, 'utf-8');
        expect(code).not.toMatch(/import\s*\{\s*Link\s*\}\s*from\s*['"]react-router-dom['"]/);
        expect(code).toContain("import ActionLink from");
      });
    });
  });
});
