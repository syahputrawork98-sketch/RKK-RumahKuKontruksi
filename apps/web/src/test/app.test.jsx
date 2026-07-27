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

    // Check Hero stages and outcomes
    const expectedStages = ['Kebutuhan', 'Pemeriksaan', 'Pengendalian', 'Dokumentasi'];
    const expectedOutcomes = ['Terencana', 'Terkendali', 'Transparan', 'Terdokumentasi'];
    expectedStages.forEach(stage => {
      expect(document.querySelector('.system-diagram')).toHaveTextContent(stage);
    });
    expectedOutcomes.forEach(outcome => {
      expect(document.querySelector('.system-diagram')).toHaveTextContent(outcome);
    });

    // Check Context has numeric markers (01, 02, 03)
    const contextMarkers = document.querySelectorAll('#konteks .card-marker');
    expect(contextMarkers.length).toBe(3);
    expect(contextMarkers[0]).toHaveTextContent('01');
    expect(contextMarkers[2]).toHaveTextContent('03');

    // Check Approach has icons instead of numeric markers
    const approachIcons = document.querySelectorAll('#pendekatan .card-icon');
    expect(approachIcons.length).toBe(4);

    // Check precise Workflow notice
    expect(screen.getByText('Tahapan ini merupakan gambaran ringkas. Detail proses akan dijelaskan pada halaman Cara Kerja setelah struktur dan ketentuannya siap dipublikasikan.')).toBeInTheDocument();
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

  it('renders AboutPage for /tentang and tests its contents', () => {
    render(
      <MemoryRouter initialEntries={['/tentang']}>
        <AppRoutes />
      </MemoryRouter>
    );
    
    // Check H1
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveTextContent('Usaha konstruksi yang dibangun melalui sistem, proses, dan tanggung jawab yang dapat ditelusuri.');

    // Check landmark and wrappers
    const mainElements = document.querySelectorAll('main');
    expect(mainElements.length).toBe(1);
    expect(mainElements[0]).toHaveAttribute('id', 'main-content');
    
    const mainContentIds = document.querySelectorAll('#main-content');
    expect(mainContentIds.length).toBe(1);

    const aboutWrapper = document.querySelector('.page-about');
    expect(aboutWrapper.tagName.toLowerCase()).not.toBe('main');

    // Check active navigation
    const nav = screen.getByLabelText('Navigasi Utama');
    const activeLink = within(nav).getByText('Tentang');
    expect(activeLink).toHaveAttribute('aria-current', 'page');

    // Check metadata
    expect(document.title).toBe('Tentang Rumahku Konstruksi | Konstruksi Berbasis Sistem');
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription).not.toBeNull();
    expect(metaDescription.content).toBe('Kenali kedudukan, positioning, visi, nilai inti, DNA, arah pertumbuhan, serta peran platform pendukung Rumahku Konstruksi.');
    
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink).not.toBeNull();
    expect(canonicalLink.href).toMatch(/\/tentang$/);

    // Check CTAs
    const caraKerjaLinks = screen.getAllByRole('link', { name: /Pelajari Cara Kerja/i });
    expect(caraKerjaLinks.length).toBeGreaterThan(0);
    caraKerjaLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/cara-kerja');
    });

    const berandaLinks = screen.getAllByRole('link', { name: /Kembali ke Beranda/i });
    expect(berandaLinks.length).toBeGreaterThan(0);
    berandaLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '/');
    });

    // Check Hero stages
    const expectedStages = ['Kebutuhan', 'Perencanaan', 'Pemeriksaan', 'Pelaksanaan', 'Dokumentasi', 'Evaluasi'];
    expectedStages.forEach(stage => {
      expect(document.querySelector('.about-hero-visual')).toHaveTextContent(stage);
    });

    // Check problems
    const problemCards = document.querySelectorAll('.problem-card');
    expect(problemCards.length).toBe(6);
    const expectedMarkers = ['01', '02', '03', '04', '05', '06'];
    const problemMarkers = Array.from(document.querySelectorAll('.problem-card .card-marker')).map(el => el.textContent);
    expect(problemMarkers).toEqual(expectedMarkers);

    // Check positioning values
    const positioningValues = document.querySelectorAll('.positioning-value');
    expect(positioningValues.length).toBe(7);

    // Check vision pillars
    const visionPillars = document.querySelectorAll('.pillar-item');
    expect(visionPillars.length).toBe(4);

    // Check mission groups and heading
    const missionHeading = screen.getByText('Ringkasan Misi');
    expect(missionHeading).toBeInTheDocument();
    const missionGroups = document.querySelectorAll('.mission-group');
    expect(missionGroups.length).toBe(4);

    // Check positioning quote
    expect(screen.getByText(/"Rumahku Konstruksi adalah usaha konstruksi berbasis sistem yang membantu pekerjaan pembangunan dan renovasi dijalankan secara lebih terencana, terkendali, transparan, dan terdokumentasi."/)).toBeInTheDocument();

    // Check vision verbatim
    expect(screen.getByText(/"Menjadi usaha konstruksi berbasis sistem yang terpercaya, terstandarisasi, dan bertumbuh secara terukur melalui tata kelola, pengendalian mutu, serta pengelolaan risiko yang disiplin."/)).toBeInTheDocument();

    // Check exactly 5 core values
    const coreValuesGrid = document.querySelector('.core-values-grid');
    const valueCards = coreValuesGrid.querySelectorAll('.value-card');
    expect(valueCards.length).toBe(5);
    expect(screen.queryByText(/Profesionalisme/i)).not.toBeInTheDocument();

    // Check exactly 7 DNA and heading
    const dnaHeading = screen.getByText('DNA Rumahku Konstruksi');
    expect(dnaHeading).toBeInTheDocument();
    const dnaList = document.querySelectorAll('.dna-item');
    expect(dnaList.length).toBe(7);

    // Check relationship diagram has 3 layers
    const relationshipLayers = document.querySelectorAll('.relationship-layer');
    expect(relationshipLayers.length).toBe(3);

    // Check Current State headings
    expect(screen.getByText('Sudah Menjadi Arah atau Prinsip')).toBeInTheDocument();
    expect(screen.getByText('Belum Ditampilkan sebagai Fakta Publik')).toBeInTheDocument();

    // Check negative requirements
    expect(screen.queryByText(/Tim Kami/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Founder & CEO/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Hubungi Kami/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Lihat Portfolio/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Lihat Portofolio/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pengawasan proyek real-time/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/ekosistem hunian terintegrasi/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/kualitas terjamin/i)).not.toBeInTheDocument();

    const links = document.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      expect(href).not.toBe('/kontak');
      expect(href).not.toBe('/proyek');
    });

    // Check no remote image
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        expect(src).not.toMatch(/^https?:/);
        expect(src).not.toMatch(/cloudinary/i);
      }
    });
  });

  it('redirects /about to /tentang', () => {
    let testLocation;
    const LocationDisplay = () => {
      const location = require('react-router-dom').useLocation();
      testLocation = location;
      return null;
    };

    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
        <LocationDisplay />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/usaha konstruksi yang dibangun melalui sistem/i);
    expect(testLocation.pathname).toBe('/tentang');
  });

  it('restores previous metadata and removes canonical when unmounted', () => {
    document.title = 'Original Title';
    let originalMeta = document.createElement('meta');
    originalMeta.name = 'description';
    originalMeta.content = 'Original description';
    document.head.appendChild(originalMeta);

    const { unmount } = render(
      <MemoryRouter initialEntries={['/tentang']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(document.title).toBe('Tentang Rumahku Konstruksi | Konstruksi Berbasis Sistem');
    expect(document.querySelector('meta[name="description"]').content).toBe('Kenali kedudukan, positioning, visi, nilai inti, DNA, arah pertumbuhan, serta peran platform pendukung Rumahku Konstruksi.');
    expect(document.querySelector('link[rel="canonical"]')).not.toBeNull();

    unmount();

    expect(document.title).toBe('Original Title');
    expect(document.querySelector('meta[name="description"]').content).toBe('Original description');
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();

    // cleanup
    if (originalMeta.parentNode) {
      originalMeta.parentNode.removeChild(originalMeta);
    }
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
