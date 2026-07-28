import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import {
  resolvePublishedProjectDetailBySlug,
  isSafePublicMediaSrc,
} from '../content/project-detail';
import { projectCatalog } from '../content/projects';
import ProjectDetailPage from '../pages/ProjectDetailPage';

describe('Project Detail Content Layer & Resolver', () => {
  const validBaseRecord = {
    publicProjectId: 'PRJ-PUB-001',
    slug: 'fixture-proyek-publik-aman',
    title: 'Fixture Proyek Publik Aman',
    summary: 'Ringkasan deskripsi proyek publik yang aman untuk pengujian.',
    category: 'Hunian Minimalis',
    publicationStatus: 'PUBLISHED',
    visibility: 'PUBLIC',
    detailPageReady: true,
    sourceVersion: 'v1.0',
    effectiveDate: '2026-01-01',
    publicationGate: {
      sourceVerified: true,
      permissionApproved: true,
      anonymizationApproved: true,
      contentReviewApproved: true,
    },
    overview: [
      'Paragraf pertama gambaran proyek.',
      'Paragraf kedua gambaran proyek.',
    ],
    facts: [
      { label: 'Tipe Bangunan', value: 'Rumah Tinggal 2 Lantai' },
      { label: 'Luas Bangunan', value: '180 m²' },
    ],
    scope: [
      'Pekerjaan Struktur Beton',
      'Pekerjaan Arsitektur & Finishing',
      'Pekerjaan Instalasi MEP',
    ],
    coverMedia: {
      src: '/images/cover-01.jpg',
      alt: 'Foto Utama Proyek',
      type: 'IMAGE',
      rightsStatus: 'APPROVED',
      publicVisibility: 'PUBLIC',
      sourceVersion: 'v1.0',
    },
  };

  it('1. rejects non-array projects', () => {
    expect(resolvePublishedProjectDetailBySlug(null, 'test-slug')).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('2. rejects non-string slug', () => {
    expect(resolvePublishedProjectDetailBySlug([validBaseRecord], 123)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('3. rejects empty slug', () => {
    expect(resolvePublishedProjectDetailBySlug([validBaseRecord], '')).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('4. rejects whitespace slug', () => {
    expect(resolvePublishedProjectDetailBySlug([validBaseRecord], '   ')).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('5. rejects unsafe slug', () => {
    const unsafeSlugs = [
      '../sign-in',
      '/proyek-rahasia',
      'Proyek Pelanggan',
      'rumah--tinggal',
      'customer@example.com',
      'PRJ_INTERNAL_001',
      'rumah_tinggal',
      '%2e%2e',
    ];
    unsafeSlugs.forEach((slug) => {
      expect(resolvePublishedProjectDetailBySlug([validBaseRecord], slug)).toEqual({
        status: 'UNAVAILABLE',
        project: null,
      });
    });
  });

  it('6. rejects unknown slug', () => {
    expect(resolvePublishedProjectDetailBySlug([validBaseRecord], 'slug-tidak-ada')).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('7. rejects DRAFT publicationStatus', () => {
    const record = { ...validBaseRecord, publicationStatus: 'DRAFT' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('8. rejects REVIEW publicationStatus', () => {
    const record = { ...validBaseRecord, publicationStatus: 'REVIEW' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('9. rejects WITHDRAWN publicationStatus', () => {
    const record = { ...validBaseRecord, publicationStatus: 'WITHDRAWN' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('10. rejects INTERNAL visibility', () => {
    const record = { ...validBaseRecord, visibility: 'INTERNAL' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('11. rejects detailPageReady false', () => {
    const record = { ...validBaseRecord, detailPageReady: false };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('12. rejects empty sourceVersion', () => {
    const record = { ...validBaseRecord, sourceVersion: '  ' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('13. rejects empty effectiveDate', () => {
    const record = { ...validBaseRecord, effectiveDate: '' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('14. rejects invalid effectiveDate', () => {
    const record = { ...validBaseRecord, effectiveDate: 'invalid-date' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('15. rejects future effectiveDate', () => {
    const record = { ...validBaseRecord, effectiveDate: '2099-01-01' };
    expect(
      resolvePublishedProjectDetailBySlug([record], record.slug, {
        now: new Date('2026-07-28'),
      })
    ).toEqual({ status: 'UNAVAILABLE', project: null });
  });

  it('16. rejects expired reviewDueAt', () => {
    const record = { ...validBaseRecord, reviewDueAt: '2025-01-01' };
    expect(
      resolvePublishedProjectDetailBySlug([record], record.slug, {
        now: new Date('2026-07-28'),
      })
    ).toEqual({ status: 'UNAVAILABLE', project: null });
  });

  it('17. rejects sourceVerified false', () => {
    const record = {
      ...validBaseRecord,
      publicationGate: { ...validBaseRecord.publicationGate, sourceVerified: false },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('18. rejects permissionApproved false', () => {
    const record = {
      ...validBaseRecord,
      publicationGate: { ...validBaseRecord.publicationGate, permissionApproved: false },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('19. rejects anonymizationApproved false', () => {
    const record = {
      ...validBaseRecord,
      publicationGate: { ...validBaseRecord.publicationGate, anonymizationApproved: false },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('20. rejects contentReviewApproved false', () => {
    const record = {
      ...validBaseRecord,
      publicationGate: { ...validBaseRecord.publicationGate, contentReviewApproved: false },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('21. rejects empty publicProjectId', () => {
    const record = { ...validBaseRecord, publicProjectId: '  ' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('22. rejects empty title', () => {
    const record = { ...validBaseRecord, title: '  ' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('23. rejects empty summary', () => {
    const record = { ...validBaseRecord, summary: '  ' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('24. rejects empty category', () => {
    const record = { ...validBaseRecord, category: '  ' };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('25. rejects empty overview', () => {
    const record = { ...validBaseRecord, overview: [] };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('26. rejects invalid overview length (> 4 paragraphs)', () => {
    const record = {
      ...validBaseRecord,
      overview: ['P1', 'P2', 'P3', 'P4', 'P5'],
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('27. rejects empty facts', () => {
    const record = { ...validBaseRecord, facts: [] };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('28. rejects invalid facts with blank label or value', () => {
    const record = { ...validBaseRecord, facts: [{ label: '', value: 'val' }] };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('29. rejects scope with less than 3 items', () => {
    const record = { ...validBaseRecord, scope: ['Scope 1', 'Scope 2'] };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('30. rejects cover rights not APPROVED', () => {
    const record = {
      ...validBaseRecord,
      coverMedia: { ...validBaseRecord.coverMedia, rightsStatus: 'PENDING' },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('31. rejects cover visibility not PUBLIC', () => {
    const record = {
      ...validBaseRecord,
      coverMedia: { ...validBaseRecord.coverMedia, publicVisibility: 'PRIVATE' },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('32. rejects cover empty sourceVersion', () => {
    const record = {
      ...validBaseRecord,
      coverMedia: { ...validBaseRecord.coverMedia, sourceVersion: ' ' },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('33. rejects cover empty src', () => {
    const record = {
      ...validBaseRecord,
      coverMedia: { ...validBaseRecord.coverMedia, src: '' },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('34. rejects cover whitespace src', () => {
    const record = {
      ...validBaseRecord,
      coverMedia: { ...validBaseRecord.coverMedia, src: '   ' },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('35. rejects cover empty alt', () => {
    const record = {
      ...validBaseRecord,
      coverMedia: { ...validBaseRecord.coverMedia, alt: '' },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('36. rejects cover whitespace alt', () => {
    const record = {
      ...validBaseRecord,
      coverMedia: { ...validBaseRecord.coverMedia, alt: '   ' },
    };
    expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
      status: 'UNAVAILABLE',
      project: null,
    });
  });

  it('37. valid record yields PUBLISHED', () => {
    const res = resolvePublishedProjectDetailBySlug([validBaseRecord], validBaseRecord.slug);
    expect(res.status).toBe('PUBLISHED');
    expect(res.project).not.toBeNull();
    expect(res.project.title).toBe('Fixture Proyek Publik Aman');
  });

  it('38. exact slug match', () => {
    const res = resolvePublishedProjectDetailBySlug(
      [validBaseRecord],
      'fixture-proyek-publik-aman'
    );
    expect(res.status).toBe('PUBLISHED');
  });

  it('39. input not mutated', () => {
    const clone = JSON.parse(JSON.stringify(validBaseRecord));
    resolvePublishedProjectDetailBySlug([clone], clone.slug);
    expect(clone).toEqual(validBaseRecord);
  });

  it('40. output does not leak internal reason', () => {
    const resDraft = resolvePublishedProjectDetailBySlug(
      [{ ...validBaseRecord, publicationStatus: 'DRAFT' }],
      validBaseRecord.slug
    );
    expect(resDraft).toEqual({ status: 'UNAVAILABLE', project: null });
  });

  it('41. invalid gallery discarded', () => {
    const record = {
      ...validBaseRecord,
      gallery: [
        { src: '/g1.jpg', alt: 'G1', rightsStatus: 'APPROVED', publicVisibility: 'PUBLIC', sourceVersion: 'v1.0' },
        { src: '/g2.jpg', alt: 'G2', rightsStatus: 'PENDING', publicVisibility: 'PUBLIC', sourceVersion: 'v1.0' },
        { src: '', alt: 'G3', rightsStatus: 'APPROVED', publicVisibility: 'PUBLIC', sourceVersion: 'v1.0' },
      ],
    };
    const res = resolvePublishedProjectDetailBySlug([record], record.slug);
    expect(res.status).toBe('PUBLISHED');
    expect(res.project.gallery).toEqual([
      { src: '/g1.jpg', alt: 'G1', type: 'IMAGE' },
    ]);
  });

  it('42. optional arrays empty as []', () => {
    const record = {
      ...validBaseRecord,
      gallery: [],
      approach: [],
      outcomes: [],
      relatedServices: [],
      relatedProjects: [],
    };
    const res = resolvePublishedProjectDetailBySlug([record], record.slug);
    expect(res.status).toBe('PUBLISHED');
    expect(res.project.approach).toEqual([]);
    expect(res.project.outcomes).toEqual([]);
    expect(res.project.gallery).toEqual([]);
    expect(res.project.relatedServices).toEqual([]);
    expect(res.project.relatedProjects).toEqual([]);
  });

  it('43. related services always empty []', () => {
    const record = {
      ...validBaseRecord,
      relatedServices: [
        { title: 'Layanan 1', href: '/layanan' },
        { title: 'Cara Kerja', href: '/cara-kerja' },
        { title: 'Tentang', href: '/tentang' },
        { title: 'Beranda', href: '/' },
      ],
    };
    const res = resolvePublishedProjectDetailBySlug([record], record.slug);
    expect(res.project.relatedServices).toEqual([]);
  });

  it('44. related project current discarded', () => {
    const record = {
      ...validBaseRecord,
      relatedProjects: [{ slug: validBaseRecord.slug }],
    };
    const res = resolvePublishedProjectDetailBySlug([record], record.slug);
    expect(res.project.relatedProjects).toEqual([]);
  });

  it('45. related project unsafe discarded', () => {
    const record = {
      ...validBaseRecord,
      relatedProjects: [{ slug: '../unsafe-slug' }],
    };
    const res = resolvePublishedProjectDetailBySlug([record], record.slug);
    expect(res.project.relatedProjects).toEqual([]);
  });

  it('46. related project unpublished discarded', () => {
    const unpubProj = { ...validBaseRecord, slug: 'proj-2', publicationStatus: 'DRAFT' };
    const record = {
      ...validBaseRecord,
      relatedProjects: [{ slug: 'proj-2' }],
    };
    const res = resolvePublishedProjectDetailBySlug([record, unpubProj], record.slug);
    expect(res.project.relatedProjects).toEqual([]);
  });

  it('47. maximum related content applied (max 3)', () => {
    const rel1 = { ...validBaseRecord, slug: 'rel-1', title: 'Rel 1' };
    const rel2 = { ...validBaseRecord, slug: 'rel-2', title: 'Rel 2' };
    const rel3 = { ...validBaseRecord, slug: 'rel-3', title: 'Rel 3' };
    const rel4 = { ...validBaseRecord, slug: 'rel-4', title: 'Rel 4' };

    const record = {
      ...validBaseRecord,
      relatedProjects: [
        { slug: 'rel-1' },
        { slug: 'rel-2' },
        { slug: 'rel-3' },
        { slug: 'rel-4' },
      ],
    };
    const res = resolvePublishedProjectDetailBySlug([record, rel1, rel2, rel3, rel4], record.slug);
    expect(res.project.relatedProjects.length).toBe(3);
  });

  it('48. DTO contains ONLY public fields', () => {
    const res = resolvePublishedProjectDetailBySlug([validBaseRecord], validBaseRecord.slug);
    expect(res.project).toHaveProperty('publicProjectId');
    expect(res.project).toHaveProperty('slug');
    expect(res.project).toHaveProperty('title');
    expect(res.project).toHaveProperty('summary');
    expect(res.project).toHaveProperty('category');
    expect(res.project).toHaveProperty('facts');
    expect(res.project).toHaveProperty('overview');
    expect(res.project).toHaveProperty('scope');
    expect(res.project).toHaveProperty('coverMedia');
    expect(res.project).toHaveProperty('meta');
  });
});

describe('Non-recursive Related Projects & Cyclic Relation Handling', () => {
  it('handles cyclic relation (A related B, B related A) without stack overflow', () => {
    const projA = {
      publicProjectId: 'PRJ-A',
      slug: 'proyek-a',
      title: 'Proyek A',
      summary: 'Ringkasan Proyek A',
      category: 'Hunian',
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      detailPageReady: true,
      sourceVersion: 'v1.0',
      effectiveDate: '2026-01-01',
      publicationGate: {
        sourceVerified: true,
        permissionApproved: true,
        anonymizationApproved: true,
        contentReviewApproved: true,
      },
      overview: ['Overview A'],
      facts: [{ label: 'Lokasi', value: 'Jakarta' }],
      scope: ['Scope 1', 'Scope 2', 'Scope 3'],
      coverMedia: {
        src: '/images/cover-a.jpg',
        alt: 'Cover A',
        rightsStatus: 'APPROVED',
        publicVisibility: 'PUBLIC',
        sourceVersion: 'v1.0',
      },
      relatedProjects: [{ slug: 'proyek-b' }],
    };

    const projB = {
      publicProjectId: 'PRJ-B',
      slug: 'proyek-b',
      title: 'Proyek B',
      summary: 'Ringkasan Proyek B',
      category: 'Hunian',
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      detailPageReady: true,
      sourceVersion: 'v1.0',
      effectiveDate: '2026-01-01',
      publicationGate: {
        sourceVerified: true,
        permissionApproved: true,
        anonymizationApproved: true,
        contentReviewApproved: true,
      },
      overview: ['Overview B'],
      facts: [{ label: 'Lokasi', value: 'Bandung' }],
      scope: ['Scope 1', 'Scope 2', 'Scope 3'],
      coverMedia: {
        src: '/images/cover-b.jpg',
        alt: 'Cover B',
        rightsStatus: 'APPROVED',
        publicVisibility: 'PUBLIC',
        sourceVersion: 'v1.0',
      },
      relatedProjects: [{ slug: 'proyek-a' }],
    };

    const resA = resolvePublishedProjectDetailBySlug([projA, projB], 'proyek-a');
    expect(resA.status).toBe('PUBLISHED');
    expect(resA.project.relatedProjects.length).toBe(1);
    expect(resA.project.relatedProjects[0].slug).toBe('proyek-b');

    // Ensure DTO B inside relatedProjects does NOT carry relatedProjects
    expect(resA.project.relatedProjects[0]).not.toHaveProperty('relatedProjects');
  });

  it('deduplicates duplicate related project entries (A related B twice)', () => {
    const projA = {
      publicProjectId: 'PRJ-A',
      slug: 'proyek-a',
      title: 'Proyek A',
      summary: 'Ringkasan Proyek A',
      category: 'Hunian',
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      detailPageReady: true,
      sourceVersion: 'v1.0',
      effectiveDate: '2026-01-01',
      publicationGate: {
        sourceVerified: true,
        permissionApproved: true,
        anonymizationApproved: true,
        contentReviewApproved: true,
      },
      overview: ['Overview A'],
      facts: [{ label: 'Lokasi', value: 'Jakarta' }],
      scope: ['Scope 1', 'Scope 2', 'Scope 3'],
      coverMedia: {
        src: '/images/cover-a.jpg',
        alt: 'Cover A',
        rightsStatus: 'APPROVED',
        publicVisibility: 'PUBLIC',
        sourceVersion: 'v1.0',
      },
      relatedProjects: [{ slug: 'proyek-b' }, { slug: 'proyek-b' }],
    };

    const projB = {
      publicProjectId: 'PRJ-B',
      slug: 'proyek-b',
      title: 'Proyek B',
      summary: 'Ringkasan Proyek B',
      category: 'Hunian',
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      detailPageReady: true,
      sourceVersion: 'v1.0',
      effectiveDate: '2026-01-01',
      publicationGate: {
        sourceVerified: true,
        permissionApproved: true,
        anonymizationApproved: true,
        contentReviewApproved: true,
      },
      overview: ['Overview B'],
      facts: [{ label: 'Lokasi', value: 'Bandung' }],
      scope: ['Scope 1', 'Scope 2', 'Scope 3'],
      coverMedia: {
        src: '/images/cover-b.jpg',
        alt: 'Cover B',
        rightsStatus: 'APPROVED',
        publicVisibility: 'PUBLIC',
        sourceVersion: 'v1.0',
      },
    };

    const resA = resolvePublishedProjectDetailBySlug([projA, projB], 'proyek-a');
    expect(resA.status).toBe('PUBLISHED');
    expect(resA.project.relatedProjects.length).toBe(1);
    expect(resA.project.relatedProjects[0].slug).toBe('proyek-b');
  });
});

describe('Media URL Safety & isSafePublicMediaSrc', () => {
  it('validates media URLs correctly via isSafePublicMediaSrc helper', () => {
    // Rejected schemes
    expect(isSafePublicMediaSrc('data:image/svg+xml;utf8,<svg></svg>')).toBe(false);
    expect(isSafePublicMediaSrc('javascript:alert(1)')).toBe(false);
    expect(isSafePublicMediaSrc('blob:http://example.com/uuid')).toBe(false);
    expect(isSafePublicMediaSrc('ftp://example.com/image.jpg')).toBe(false);
    expect(isSafePublicMediaSrc('//example.com/image.jpg')).toBe(false);
    expect(isSafePublicMediaSrc('relative/image.jpg')).toBe(false);
    expect(isSafePublicMediaSrc('')).toBe(false);
    expect(isSafePublicMediaSrc(null)).toBe(false);
    expect(isSafePublicMediaSrc(123)).toBe(false);

    // Accepted schemes
    expect(isSafePublicMediaSrc('/images/project-cover.jpg')).toBe(true);
    expect(isSafePublicMediaSrc('https://cdn.example.com/project-cover.jpg')).toBe(true);
  });

  it('rejects coverMedia with unsafe src schemes in resolver', () => {
    const base = {
      publicProjectId: 'PRJ-01',
      slug: 'proyek-unsafe-cover',
      title: 'Proyek Unsafe Cover',
      summary: 'Summary',
      category: 'Hunian',
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      detailPageReady: true,
      sourceVersion: 'v1.0',
      effectiveDate: '2026-01-01',
      publicationGate: {
        sourceVerified: true,
        permissionApproved: true,
        anonymizationApproved: true,
        contentReviewApproved: true,
      },
      overview: ['Overview'],
      facts: [{ label: 'L', value: 'V' }],
      scope: ['S1', 'S2', 'S3'],
    };

    const unsafeSrcs = [
      'data:image/svg+xml;base64,123',
      'javascript:alert(1)',
      'blob:https://example.com/123',
      'ftp://example.com/cover.jpg',
      '//example.com/cover.jpg',
      'relative/path.jpg',
    ];

    unsafeSrcs.forEach((src) => {
      const record = {
        ...base,
        coverMedia: {
          src,
          alt: 'Cover Alt',
          rightsStatus: 'APPROVED',
          publicVisibility: 'PUBLIC',
          sourceVersion: 'v1.0',
        },
      };
      expect(resolvePublishedProjectDetailBySlug([record], record.slug)).toEqual({
        status: 'UNAVAILABLE',
        project: null,
      });
    });
  });

  it('accepts root-relative and https coverMedia src in resolver', () => {
    const base = {
      publicProjectId: 'PRJ-01',
      slug: 'proyek-safe-cover',
      title: 'Proyek Safe Cover',
      summary: 'Summary',
      category: 'Hunian',
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      detailPageReady: true,
      sourceVersion: 'v1.0',
      effectiveDate: '2026-01-01',
      publicationGate: {
        sourceVerified: true,
        permissionApproved: true,
        anonymizationApproved: true,
        contentReviewApproved: true,
      },
      overview: ['Overview'],
      facts: [{ label: 'L', value: 'V' }],
      scope: ['S1', 'S2', 'S3'],
    };

    const safeSrcs = ['/images/project-cover.jpg', 'https://cdn.example.com/project-cover.jpg'];

    safeSrcs.forEach((src) => {
      const record = {
        ...base,
        coverMedia: {
          src,
          alt: 'Cover Alt',
          rightsStatus: 'APPROVED',
          publicVisibility: 'PUBLIC',
          sourceVersion: 'v1.0',
        },
      };
      const res = resolvePublishedProjectDetailBySlug([record], record.slug);
      expect(res.status).toBe('PUBLISHED');
      expect(res.project.coverMedia.src).toBe(src);
    });
  });
});

describe('Sensitive Fields Protection', () => {
  it('strips all 36 sensitive keys', () => {
    const sensitiveKeys = [
      'internalProjectId',
      'projectCodeInternal',
      'customerId',
      'customerName',
      'customerPhone',
      'customerEmail',
      'phone',
      'email',
      'exactAddress',
      'coordinates',
      'latitude',
      'longitude',
      'contractNumber',
      'contractValue',
      'budget',
      'cost',
      'paymentStatus',
      'paymentHistory',
      'margin',
      'profit',
      'personIds',
      'personNames',
      'documentIds',
      'documentLinksInternal',
      'riskCodes',
      'internalProgress',
      'internalStatus',
      'internalNotes',
      'issueNotes',
      'legalNotes',
      'disputeStatus',
      'supplierData',
      'vendorData',
      'bankData',
      'taxData',
    ];

    const inputWithSensitive = {
      publicProjectId: 'PRJ-PUB-001',
      slug: 'proyek-test-sensitif',
      title: 'Proyek Test Sensitif',
      summary: 'Deskripsi ringkas proyek.',
      category: 'Hunian',
      publicationStatus: 'PUBLISHED',
      visibility: 'PUBLIC',
      detailPageReady: true,
      sourceVersion: 'v1.0',
      effectiveDate: '2026-01-01',
      publicationGate: {
        sourceVerified: true,
        permissionApproved: true,
        anonymizationApproved: true,
        contentReviewApproved: true,
      },
      overview: ['Paragraf 1'],
      facts: [{ label: 'Lokasi', value: 'Jakarta' }],
      scope: ['Pekerjaan 1', 'Pekerjaan 2', 'Pekerjaan 3'],
      coverMedia: {
        src: '/img.jpg',
        alt: 'Alt',
        rightsStatus: 'APPROVED',
        publicVisibility: 'PUBLIC',
        sourceVersion: 'v1.0',
      },
      internalProjectId: 'INT-001',
      projectCodeInternal: 'CODE-001',
      customerId: 'CUST-001',
      customerName: 'Budi Santoso',
      customerPhone: '081234567890',
      customerEmail: 'budi@example.com',
      phone: '081234567890',
      email: 'budi@example.com',
      exactAddress: 'Jl. Merdeka No 1',
      coordinates: '-6.200000, 106.816666',
      latitude: -6.2,
      longitude: 106.816666,
      contractNumber: 'CNT-2026-001',
      contractValue: 500000000,
      budget: 450000000,
      cost: 400000000,
      paymentStatus: 'LUNAS',
      paymentHistory: ['DP 50%', 'Pelunasan 50%'],
      margin: 100000000,
      profit: 100000000,
      personIds: ['PERS-01'],
      personNames: ['Agus'],
      documentIds: ['DOC-01'],
      documentLinksInternal: ['/docs/internal.pdf'],
      riskCodes: ['RSK-01'],
      internalProgress: 100,
      internalStatus: 'SELESAI',
      internalNotes: 'Selesai tanpa kendala',
      issueNotes: 'Tidak ada kendala',
      legalNotes: 'Izin lengkap',
      disputeStatus: 'NONE',
      supplierData: ['PT Supplier'],
      vendorData: ['PT Vendor'],
      bankData: ['BCA 123456789'],
      taxData: ['NPWP 123456789'],
    };

    const res = resolvePublishedProjectDetailBySlug([inputWithSensitive], inputWithSensitive.slug);
    expect(res.status).toBe('PUBLISHED');
    const mapped = res.project;

    sensitiveKeys.forEach((key) => {
      expect(mapped).not.toHaveProperty(key);
    });
  });
});

describe('Production Current State Component Integration', () => {
  it('confirms projectCatalog is empty array in production', () => {
    expect(projectCatalog).toEqual([]);
  });

  const testRoutes = ['/proyek/contoh', '/proyek/proyek-001', '/proyek/rumah-tinggal'];

  testRoutes.forEach((routePath) => {
    it(`renders 404 unavailable state for production route ${routePath}`, () => {
      render(
        <MemoryRouter initialEntries={[routePath]}>
          <Routes>
            <Route path="/proyek/:slug" element={<ProjectDetailPage />} />
          </Routes>
        </MemoryRouter>
      );

      expect(screen.getByText('404')).toBeInTheDocument();
      expect(
        screen.getByRole('heading', { level: 1, name: 'Halaman proyek tidak tersedia.' })
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'Proyek yang Anda cari belum tersedia untuk ditampilkan secara publik atau alamatnya tidak dapat digunakan.'
        )
      ).toBeInTheDocument();

      const btnProjects = screen.getByRole('link', { name: 'Kembali ke Daftar Proyek' });
      expect(btnProjects).toHaveAttribute('href', '/proyek');

      const btnHome = screen.getByRole('link', { name: 'Kembali ke Beranda' });
      expect(btnHome).toHaveAttribute('href', '/');

      expect(document.title).toBe('Halaman proyek tidak tersedia | Rumahku Konstruksi');

      expect(screen.queryByRole('navigation', { name: 'Breadcrumb' })).not.toBeInTheDocument();
      expect(screen.queryByText('Ringkasan Proyek')).not.toBeInTheDocument();
      expect(screen.queryByText('Galeri Dokumentasi Berizin')).not.toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });
});

describe('Published Template Integration (Fixture Test)', () => {
  const publishedFixture = {
    publicProjectId: 'PRJ-PUB-AMAN-01',
    slug: 'fixture-proyek-publik-aman',
    title: 'Fixture Proyek Publik Aman',
    summary: 'Proyek hunian impian dengan desain modern dan efisiensi tinggi.',
    category: 'Hunian Modern',
    publicStatus: 'Selesai Beroperasi',
    locationGeneral: 'Bandung, Jawa Barat',
    periodGeneral: '6 Bulan (2025)',
    completionYear: '2025',
    publicationStatus: 'PUBLISHED',
    visibility: 'PUBLIC',
    detailPageReady: true,
    sourceVersion: 'v1.0',
    effectiveDate: '2026-01-01',
    publicationGate: {
      sourceVerified: true,
      permissionApproved: true,
      anonymizationApproved: true,
      contentReviewApproved: true,
    },
    overview: [
      'Proyek hunian ini dirancang untuk memenuhi kebutuhan keluarga modern.',
      'Tahapan pengerjaan dilaksanakan dengan standar mutu tinggi.',
    ],
    facts: [
      { label: 'Luas Bangunan', value: '250 m²' },
      { label: 'Jumlah Lantai', value: '2' },
    ],
    scope: [
      'Pekerjaan Pondasi & Struktur',
      'Pekerjaan Dinding & Atap',
      'Pekerjaan Interior & Lansekap',
    ],
    approach: [
      { order: 1, title: 'Perencanaan', description: 'Desain teknis disetujui.' },
      { order: 2, title: 'Konstruksi', description: 'Pelaksanaan fisik sesuai standar.' },
    ],
    outcomes: [
      { title: 'Tepat Waktu', description: 'Proyek selesai sesuai jadwal 6 bulan.' },
    ],
    coverMedia: {
      src: '/images/fixture-cover.jpg',
      alt: 'Foto Cover Fixture Proyek',
      type: 'IMAGE',
      rightsStatus: 'APPROVED',
      publicVisibility: 'PUBLIC',
      sourceVersion: 'v1.0',
    },
    gallery: [
      {
        src: '/images/fixture-gal-1.jpg',
        alt: 'Foto Galeri 1',
        type: 'IMAGE',
        rightsStatus: 'APPROVED',
        publicVisibility: 'PUBLIC',
        sourceVersion: 'v1.0',
      },
    ],
  };

  it('renders complete published project detail template correctly', () => {
    render(
      <MemoryRouter initialEntries={['/proyek/fixture-proyek-publik-aman']}>
        <Routes>
          <Route
            path="/proyek/:slug"
            element={<ProjectDetailPage catalog={[publishedFixture]} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(document.title).toBe('Fixture Proyek Publik Aman | Proyek Rumahku Konstruksi');

    const breadcrumb = screen.getByRole('navigation', { name: 'Breadcrumb' });
    expect(breadcrumb).toBeInTheDocument();
    expect(screen.getAllByText('Fixture Proyek Publik Aman').length).toBeGreaterThanOrEqual(2);

    expect(screen.getByRole('heading', { level: 1, name: 'Fixture Proyek Publik Aman' })).toBeInTheDocument();
    expect(screen.getByText('Hunian Modern')).toBeInTheDocument();
    expect(screen.getByText('Proyek hunian impian dengan desain modern dan efisiensi tinggi.')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Ringkasan Proyek' })).toBeInTheDocument();
    expect(screen.getByText('Luas Bangunan')).toBeInTheDocument();
    expect(screen.getByText('250 m²')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Gambaran dan Kebutuhan' })).toBeInTheDocument();
    expect(screen.getByText('Proyek hunian ini dirancang untuk memenuhi kebutuhan keluarga modern.')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Galeri Dokumentasi Berizin' })).toBeInTheDocument();
    expect(screen.getByAltText('Foto Galeri 1')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Ruang Lingkup' })).toBeInTheDocument();
    expect(screen.getByText('Pekerjaan Pondasi & Struktur')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Pendekatan dan Tahapan' })).toBeInTheDocument();
    expect(screen.getByText('Perencanaan')).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: 'Hasil yang Dapat Dibuktikan' })).toBeInTheDocument();
    expect(screen.getByText('Tepat Waktu')).toBeInTheDocument();

    expect(screen.getByText('Lihat kembali proyek publik yang tersedia.')).toBeInTheDocument();
  });

  it('does not render optional sections when empty array', () => {
    const minimalFixture = {
      ...publishedFixture,
      gallery: [],
      approach: [],
      outcomes: [],
      relatedServices: [],
      relatedProjects: [],
    };

    render(
      <MemoryRouter initialEntries={['/proyek/fixture-proyek-publik-aman']}>
        <Routes>
          <Route
            path="/proyek/:slug"
            element={<ProjectDetailPage catalog={[minimalFixture]} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText('Galeri Dokumentasi Berizin')).not.toBeInTheDocument();
    expect(screen.queryByText('Pendekatan dan Tahapan')).not.toBeInTheDocument();
    expect(screen.queryByText('Hasil yang Dapat Dibuktikan')).not.toBeInTheDocument();
    expect(screen.queryByText('Layanan Terkait')).not.toBeInTheDocument();
    expect(screen.queryByText('Proyek Terkait')).not.toBeInTheDocument();
  });
});
