import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../app/AppRouter';
import { resolvePublishedServices } from '../content/services';

describe('ServiceListPage', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('renders ServiceListPage for /layanan and tests its contents', () => {
    render(
      <MemoryRouter initialEntries={['/layanan']}>
        <AppRoutes />
      </MemoryRouter>
    );

    // Check one main
    const mainElements = document.querySelectorAll('main');
    expect(mainElements.length).toBe(1);
    expect(mainElements[0]).toHaveAttribute('id', 'main-content');

    // .page-services is not main
    const pageServicesWrapper = document.querySelector('.page-services');
    expect(pageServicesWrapper.tagName.toLowerCase()).not.toBe('main');

    // One H1
    const h1Elements = screen.getAllByRole('heading', { level: 1 });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveTextContent(/Daftar layanan yang telah melewati pemeriksaan kesiapan dan persetujuan publikasi./i);

    // Metadata and canonical
    expect(document.title).toBe('Layanan Rumahku Konstruksi | Status Publikasi Layanan');
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    expect(canonicalLink).not.toBeNull();
    expect(canonicalLink.href).toMatch(/\/layanan$/);
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription.content).toBe('Lihat status publikasi layanan Rumahku Konstruksi, gerbang kesiapan, batas informasi, dan jalur yang dapat dipelajari saat belum ada layanan aktif.');

    // Enam publication flow item dalam urutan benar
    const flowItems = document.querySelectorAll('.flow-item span:first-child');
    expect(flowItems.length).toBe(6);
    expect(flowItems[0]).toHaveTextContent('1. Sumber Bisnis');
    expect(flowItems[1]).toHaveTextContent('2. Definisi');
    expect(flowItems[2]).toHaveTextContent('3. Kesiapan');
    expect(flowItems[3]).toHaveTextContent('4. Review');
    expect(flowItems[4]).toHaveTextContent('5. Persetujuan Publikasi');
    expect(flowItems[5]).toHaveTextContent('6. Kartu Aktif');

    // Empat publication gate
    const gateCards = document.querySelectorAll('.gate-card');
    expect(gateCards.length).toBe(4);
    expect(gateCards[0].querySelector('.gate-title')).toHaveTextContent('Definisi');
    expect(gateCards[1].querySelector('.gate-title')).toHaveTextContent('Kesiapan');
    expect(gateCards[2].querySelector('.gate-title')).toHaveTextContent('Dokumen');
    expect(gateCards[3].querySelector('.gate-title')).toHaveTextContent('Publikasi');

    // Empat concept difference
    const conceptCards = document.querySelectorAll('.concept-card');
    expect(conceptCards.length).toBe(4);
    expect(conceptCards[0].querySelector('.concept-title')).toHaveTextContent('Layanan');
    expect(conceptCards[1].querySelector('.concept-title')).toHaveTextContent('Komponen Terintegrasi');
    expect(conceptCards[2].querySelector('.concept-title')).toHaveTextContent('Proses Bisnis');
    expect(conceptCards[3].querySelector('.concept-title')).toHaveTextContent('Fitur Sistem');

    // Current empty state
    expect(screen.getByText('CURRENT STATE')).toBeInTheDocument();
    expect(screen.getByText('Belum ada layanan siap publik.')).toBeInTheDocument();

    // Nol service card
    expect(document.querySelectorAll('.published-service-card').length).toBe(0);

    // Nol detail link
    expect(screen.queryByText('Lihat Detail')).not.toBeInTheDocument();

    // Tidak ada form atau input
    expect(document.querySelectorAll('form').length).toBe(0);
    expect(document.querySelectorAll('input').length).toBe(0);
    expect(document.querySelectorAll('select').length).toBe(0);
    expect(document.querySelectorAll('textarea').length).toBe(0);

    // CTA Cara Kerja dan Beranda
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

    // Pembangunan Rumah Baru dan Renovasi Rumah hanya muncul sebagai teks status
    expect(screen.getByText(/Pembangunan Rumah Baru dan Renovasi Rumah telah ditetapkan sebagai layanan utama awal/i)).toBeInTheDocument();
    
    // Forbidden content
    const forbiddenClaims = [
      'Solusi Rumah Terintegrasi',
      'Konsultasi Konsep',
      'Desain Arsitektur',
      'Gambar Kerja/DED',
      'Bangun Rumah Baru',
      'Estimasi Biaya/RAB',
      'Manajemen dan Pengawasan',
      'jaminan presisi',
      'kualitas tinggi',
      'transparansi biaya',
      'progres real-time',
      'dashboard real-time',
      'transparansi total',
      'hasil terbaik',
      'tanpa stres',
      'harga mulai',
      'paket populer',
      'bestseller',
      'SLA',
      'Pesan Sekarang',
      'Pilih Layanan',
      'Konsultasi Sekarang'
    ];
    forbiddenClaims.forEach(claim => {
      expect(screen.queryByText(new RegExp(claim, 'i'))).not.toBeInTheDocument();
    });

    // Test structural for rating
    expect(
      document.querySelectorAll(
        '.rating, .rating-badge, [data-rating], [aria-label*="rating" i]'
      )
    ).toHaveLength(0);

    // Tidak ada gambar remote
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src) {
        expect(src).not.toMatch(/^https?:/);
        expect(src).not.toMatch(/cloudinary/i);
      }
    });

    // Check navigation menus have "Layanan" with href="/layanan"
    const nav = screen.getByLabelText('Navigasi Utama');
    const layananLink = within(nav).getByText('Layanan');
    expect(layananLink).toBeInTheDocument();
    expect(layananLink).toHaveAttribute('href', '/layanan');
  });

  it('validates resolvePublishedServices', () => {
    // Input bukan array menghasilkan []
    expect(resolvePublishedServices(null)).toEqual([]);
    expect(resolvePublishedServices(undefined)).toEqual([]);
    expect(resolvePublishedServices('string')).toEqual([]);

    const fixtures = [
      { id: 1, publicationStatus: 'HOLD', isVisible: true, detailRoute: '/layanan/1', sourceVersion: 'v1', effectiveDate: '2026' },
      { id: 2, publicationStatus: 'PAUSED', isVisible: true, detailRoute: '/layanan/2', sourceVersion: 'v1', effectiveDate: '2026' },
      { id: 3, publicationStatus: 'PUBLISHED', isVisible: false, detailRoute: '/layanan/3', sourceVersion: 'v1', effectiveDate: '2026' },
      { id: 4, publicationStatus: 'PUBLISHED', isVisible: true, detailRoute: 'not-layanan', sourceVersion: 'v1', effectiveDate: '2026' },
      { id: 5, publicationStatus: 'PUBLISHED', isVisible: true, detailRoute: '/layanan/5', sourceVersion: null, effectiveDate: '2026' },
      { id: 6, publicationStatus: 'PUBLISHED', isVisible: true, detailRoute: '/layanan/6', sourceVersion: 'v1', effectiveDate: null },
      { id: 7, publicationStatus: 'PUBLISHED', isVisible: true, detailRoute: '/layanan/7', sourceVersion: 'v1', effectiveDate: '2026' }, // Valid
      { id: 8, publicationStatus: 'PUBLISHED', isVisible: true, detailRoute: '/layanan/8', sourceVersion: 'v2', effectiveDate: '2027' } // Valid
    ];

    const inputCopy = [...fixtures];
    const results = resolvePublishedServices(fixtures);

    // Hanya item valid yang lolos (id 7 dan 8)
    expect(results.length).toBe(2);
    expect(results[0].id).toBe(7);
    expect(results[1].id).toBe(8);

    // Urutan dipertahankan
    expect(results[0].id).toBe(7);
    expect(results[1].id).toBe(8);

    // Function tidak memutasi input
    expect(fixtures).toEqual(inputCopy);
  });
});
