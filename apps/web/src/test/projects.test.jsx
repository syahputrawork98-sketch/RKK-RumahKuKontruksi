import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProjectListPage from '../pages/ProjectListPage';
import NotFoundPage from '../pages/NotFoundPage';
import { projectListContent, projectCatalog, resolvePublishedProjects } from '../content/projects';

describe('ProjectListPage', () => {
  afterEach(cleanup);

  it('renders ProjectListPage for /proyek and 404 for details', () => {
    render(
      <MemoryRouter initialEntries={['/proyek']}>
        <Routes>
          <Route path="/proyek" element={<ProjectListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Ensure catalog is empty for now
    expect(projectCatalog).toEqual([]);

    // Check texts
    expect(screen.getByText(projectListContent.publicationGates.description)).toBeInTheDocument();

    projectListContent.publicationGates.items.forEach(gate => {
      expect(screen.getByText(gate.title)).toBeInTheDocument();
      expect(screen.getByText(gate.description)).toBeInTheDocument();
    });

    const caraKerjaLinks = screen.getAllByText('Pelajari Cara Kerja');
    const homeLinks = screen.getAllByText('Kembali ke Beranda');
    expect(caraKerjaLinks.length).toBeGreaterThan(0);
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('does not contain prohibited elements', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/proyek']}>
        <ProjectListPage />
      </MemoryRouter>
    );

    expect(container.querySelectorAll('.project-card, [data-testid="project-card"]')).toHaveLength(0);
    expect(container.querySelectorAll('img')).toHaveLength(0);
    expect(container.querySelectorAll('input[type="search"], .search, .filter, .sort, .pagination')).toHaveLength(0);
    expect(container.querySelectorAll('.projects-toolbar')).toHaveLength(0);
    expect(container.querySelectorAll('a[href^="/proyek/"]')).toHaveLength(0); // detail link
  });

  it('renders 404 for unknown detail routes', () => {
    const routesToTest = ['/proyek/contoh', '/proyek/proyek-001', '/proyek/rumah-tinggal'];

    routesToTest.forEach(route => {
      render(
        <MemoryRouter initialEntries={[route]}>
          <Routes>
            <Route path="/proyek" element={<ProjectListPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByText('Halaman tidak ditemukan')).toBeInTheDocument();
      cleanup();
    });
  });
});

describe('resolvePublishedProjects', () => {
  const validBase = {
    publicationStatus: 'PUBLISHED',
    visibility: 'PUBLIC',
    sourceVersion: '1',
    effectiveDate: '2026-07-28',
    publicProjectId: 'PRJ-123',
    title: 'Valid Project',
    summary: 'Summary',
    category: 'Residential',
    media: [{ rightsStatus: 'APPROVED', src: '/img.jpg', alt: 'Cover', type: 'IMAGE' }]
  };

  it('1. rejects DRAFT publicationStatus', () => {
    expect(resolvePublishedProjects([{ ...validBase, publicationStatus: 'DRAFT' }])).toEqual([]);
  });

  it('2. rejects REVIEW publicationStatus', () => {
    expect(resolvePublishedProjects([{ ...validBase, publicationStatus: 'REVIEW' }])).toEqual([]);
  });

  it('3. rejects WITHDRAWN publicationStatus', () => {
    expect(resolvePublishedProjects([{ ...validBase, publicationStatus: 'WITHDRAWN' }])).toEqual([]);
  });

  it('4. rejects INTERNAL visibility', () => {
    expect(resolvePublishedProjects([{ ...validBase, visibility: 'INTERNAL' }])).toEqual([]);
  });

  it('5. rejects missing sourceVersion', () => {
    const { sourceVersion: _sourceVersion, ...rest } = validBase;
    expect(resolvePublishedProjects([rest])).toEqual([]);
  });

  it('6. rejects missing effectiveDate', () => {
    const { effectiveDate: _effectiveDate, ...rest } = validBase;
    expect(resolvePublishedProjects([rest])).toEqual([]);
  });

  it('7. rejects missing publicProjectId', () => {
    const { publicProjectId: _publicProjectId, ...rest } = validBase;
    expect(resolvePublishedProjects([rest])).toEqual([]);
  });

  it('8. rejects missing title', () => {
    const { title: _title, ...rest } = validBase;
    expect(resolvePublishedProjects([rest])).toEqual([]);
  });

  it('9. rejects missing summary', () => {
    const { summary: _summary, ...rest } = validBase;
    expect(resolvePublishedProjects([rest])).toEqual([]);
  });

  it('10. rejects missing category', () => {
    const { category: _category, ...rest } = validBase;
    expect(resolvePublishedProjects([rest])).toEqual([]);
  });

  it('11. rejects media rights not APPROVED', () => {
    const invalidMedia = [{ rightsStatus: 'PENDING', src: '/img.jpg', alt: 'Cover', type: 'IMAGE' }];
    expect(resolvePublishedProjects([{ ...validBase, media: invalidMedia }])).toEqual([]);
  });

  it('12. rejects media without src or whitespace src', () => {
    expect(resolvePublishedProjects([{ ...validBase, media: [{ rightsStatus: 'APPROVED', url: '/img.jpg', alt: 'Cover', type: 'IMAGE' }] }])).toEqual([]);
    expect(resolvePublishedProjects([{ ...validBase, media: [{ rightsStatus: 'APPROVED', src: '', alt: 'Cover', type: 'IMAGE' }] }])).toEqual([]);
    expect(resolvePublishedProjects([{ ...validBase, media: [{ rightsStatus: 'APPROVED', src: '   ', alt: 'Cover', type: 'IMAGE' }] }])).toEqual([]);
  });

  it('13. rejects media without alt', () => {
    const invalidMedia = [{ rightsStatus: 'APPROVED', src: '/img.jpg', type: 'IMAGE' }];
    expect(resolvePublishedProjects([{ ...validBase, media: invalidMedia }])).toEqual([]);
  });

  it('14. safe slug -> detailHref', () => {
    const safeResult = resolvePublishedProjects([{ ...validBase, slug: 'rumah-tinggal', detailPageReady: true }]);
    expect(safeResult[0].detailPageReady).toBe(true);
    expect(safeResult[0].detailHref).toBe('/proyek/rumah-tinggal');
  });

  it('15. unsafe slug -> detailPageReady: false and detailHref: null', () => {
    const unsafeSlugs = ['../sign-in', '/proyek-rahasia', 'Proyek Pelanggan', 'rumah--tinggal', 'customer@example.com', 'PRJ_INTERNAL_001'];
    unsafeSlugs.forEach(slug => {
      const unsafeResult = resolvePublishedProjects([{ ...validBase, slug, detailPageReady: true }]);
      expect(unsafeResult[0].detailPageReady).toBe(false);
      expect(unsafeResult[0].detailHref).toBe(null);
    });
  });

  it('16. input is not mutated', () => {
    const input = [JSON.parse(JSON.stringify(validBase))];
    const clone = JSON.parse(JSON.stringify(validBase));
    resolvePublishedProjects(input);
    expect(input[0]).toEqual(clone);
  });

  it('17. no sensitive fields', () => {
    const sensitiveKeys = [
      'internalProjectId',
      'customerId',
      'customerName',
      'phone',
      'email',
      'exactAddress',
      'coordinates',
      'contractNumber',
      'contractValue',
      'cost',
      'paymentStatus',
      'margin',
      'personIds',
      'documentIds',
      'riskCodes',
      'internalProgress',
      'internalStatus',
      'internalNotes',
    ];

    const result = resolvePublishedProjects([{
      ...validBase,
      internalProjectId: 'INT-999',
      customerId: 'CUST-001',
      customerName: 'John Doe',
      phone: '123456789',
      email: 'john@example.com',
      exactAddress: '123 Secret St',
      coordinates: '0,0',
      contractNumber: 'CNT-001',
      contractValue: 1000000,
      cost: 500000,
      paymentStatus: 'PAID',
      margin: 500000,
      personIds: ['P1', 'P2'],
      documentIds: ['D1', 'D2'],
      riskCodes: ['R1', 'R2'],
      internalProgress: 50,
      internalStatus: 'ON_TRACK',
      internalNotes: 'Looks good'
    }]);
    const mapped = result[0];

    sensitiveKeys.forEach(key => {
      expect(mapped).not.toHaveProperty(key);
    });
  });
});
