import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProjectListPage from '../pages/ProjectListPage';
import NotFoundPage from '../pages/NotFoundPage';
import { projectListContent, resolvePublishedProjects } from '../content/projects';

describe('ProjectListPage', () => {
  afterEach(cleanup);

  it('renders ProjectListPage for /proyek and 404 for details', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/proyek']}>
        <Routes>
          <Route path="/proyek" element={<ProjectListPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );

    // Test page components
    expect(document.title).toBe(projectListContent.meta.title);
    
    // Only 1 H1
    const h1Elements = container.querySelectorAll('h1');
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveTextContent(projectListContent.hero.title);

    // Hero visual test
    expect(container.querySelector('.projects-hero-visual')).toBeInTheDocument();
    
    // Status notice test
    expect(screen.getByText(projectListContent.publicationStatus.title)).toBeInTheDocument();
    
    // Four gates test
    const gates = container.querySelectorAll('.gate-card');
    expect(gates).toHaveLength(4);
    
    // Hold state test
    expect(screen.getByText(projectListContent.holdState.title)).toBeInTheDocument();
    
    // Four boundaries test
    const boundaries = container.querySelectorAll('.boundary-item');
    expect(boundaries).toHaveLength(4);
    
    // CTAs test
    const caraKerjaLinks = container.querySelectorAll('a[href="/cara-kerja"]');
    const homeLinks = container.querySelectorAll('a[href="/"]');
    expect(caraKerjaLinks.length).toBeGreaterThan(0);
    expect(homeLinks.length).toBeGreaterThan(0);
  });

  it('renders 404 for unknown detail routes', () => {
    const routesToTest = ['/proyek/contoh', '/proyek/proyek-001'];
    
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

  it('does not contain prohibited elements', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/proyek']}>
        <ProjectListPage />
      </MemoryRouter>
    );

    // Check for prohibited elements by class/tags
    expect(container.querySelectorAll('.project-card, [data-testid="project-card"]')).toHaveLength(0);
    expect(container.querySelectorAll('img')).toHaveLength(0); // no image tags (no remote images)
    expect(container.querySelectorAll('input[type="search"], .search, .filter, .sort, .pagination')).toHaveLength(0);
    
    // Check for prohibited text
    const textContent = container.textContent.toLowerCase();
    const forbiddenPhrases = [
      'coming soon',
      'segera hadir',
      '0 proyek',
      'lihat detail proyek',
      'ajukan proyek',
      'pesan sekarang',
      'minta penawaran'
    ];
    
    forbiddenPhrases.forEach(phrase => {
      expect(textContent).not.toContain(phrase);
    });
  });
});

describe('resolvePublishedProjects', () => {
  it('returns [] for non-array input', () => {
    expect(resolvePublishedProjects(null)).toEqual([]);
    expect(resolvePublishedProjects(undefined)).toEqual([]);
    expect(resolvePublishedProjects({})).toEqual([]);
  });

  it('rejects unpublished projects (DRAFT, REVIEW, INTERNAL, WITHDRAWN)', () => {
    const fixtures = [
      { publicationStatus: 'DRAFT' },
      { publicationStatus: 'REVIEW' },
      { publicationStatus: 'INTERNAL' },
      { publicationStatus: 'WITHDRAWN' }
    ];
    expect(resolvePublishedProjects(fixtures)).toEqual([]);
  });

  it('rejects records without required fields (sourceVersion, effectiveDate, title, summary, category)', () => {
    const base = { publicationStatus: 'PUBLISHED', visibility: 'PUBLIC' };
    
    expect(resolvePublishedProjects([{ ...base, effectiveDate: '2026-07-28', title: 'A', summary: 'B', category: 'C' }])).toEqual([]); // missing sourceVersion
    expect(resolvePublishedProjects([{ ...base, sourceVersion: '1', title: 'A', summary: 'B', category: 'C' }])).toEqual([]); // missing effectiveDate
    expect(resolvePublishedProjects([{ ...base, sourceVersion: '1', effectiveDate: '2026-07-28', summary: 'B', category: 'C' }])).toEqual([]); // missing title
  });

  it('rejects media without APPROVED rights or without alt text', () => {
    const base = {
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      sourceVersion: '1',
      effectiveDate: '2026-07-28',
      title: 'A',
      summary: 'B',
      category: 'C'
    };

    expect(resolvePublishedProjects([{ ...base, media: [{ rightsStatus: 'PENDING', alt: 'Test' }] }])).toEqual([]); // not APPROVED
    expect(resolvePublishedProjects([{ ...base, media: [{ rightsStatus: 'APPROVED' }] }])).toEqual([]); // no alt
  });

  it('maps valid record correctly and does not output sensitive fields or mutate input', () => {
    const input = [{
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      sourceVersion: '1',
      effectiveDate: '2026-07-28',
      title: 'Valid Project',
      summary: 'Summary',
      category: 'Residential',
      publicProjectId: ' PRJ-123 ',
      locationGeneral: 'Jakarta',
      publicStatus: 'Completed',
      completionYear: 2026,
      detailPageReady: true,
      slug: 'valid-project',
      media: [{ rightsStatus: 'APPROVED', alt: 'Cover', url: '/img.jpg', type: 'IMAGE' }],
      // sensitive fields
      internalProjectId: 'INT-999',
      customerId: 'CUST-001',
      customerName: 'John Doe',
      phone: '12345',
      email: 'john@example.com',
      exactAddress: '123 Secret St',
      coordinates: '0,0',
      contractNumber: 'CNT-001',
      contractValue: 1000000,
      cost: 500000,
      paymentStatus: 'PAID',
      margin: 10,
      personIds: ['P1'],
      documentIds: ['D1'],
      riskCodes: ['R1'],
      internalProgress: 100,
      internalStatus: 'DONE',
      internalNotes: 'Top secret'
    }];
    
    // clone to test mutation
    const inputClone = JSON.parse(JSON.stringify(input));

    const result = resolvePublishedProjects(input);
    
    expect(result).toHaveLength(1);
    
    // Check mutation
    expect(input).toEqual(inputClone);
    
    // Check valid mapping
    const mapped = result[0];
    expect(mapped.title).toBe('Valid Project');
    expect(mapped.publicProjectId).toBe('PRJ-123'); // trimmed
    expect(mapped.detailHref).toBe('/proyek/valid-project'); // safe route
    
    // Check no sensitive fields
    expect(mapped.internalProjectId).toBeUndefined();
    expect(mapped.customerId).toBeUndefined();
    expect(mapped.customerName).toBeUndefined();
    expect(mapped.contractValue).toBeUndefined();
    expect(mapped.exactAddress).toBeUndefined();
    expect(mapped.internalNotes).toBeUndefined();
  });
});
