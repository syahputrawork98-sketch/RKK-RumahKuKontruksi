export const projectDetailContent = {
  unavailable: {
    meta: {
      title: 'Halaman proyek tidak tersedia | Rumahku Konstruksi',
      description: 'Halaman proyek yang Anda cari belum tersedia untuk ditampilkan secara publik.',
      canonicalPath: '/proyek',
      robots: 'noindex, nofollow',
    },
    ui: {
      label: '404',
      title: 'Halaman proyek tidak tersedia.',
      description: 'Proyek yang Anda cari belum tersedia untuk ditampilkan secara publik atau alamatnya tidak dapat digunakan.',
      actions: {
        backToProjects: {
          label: 'Kembali ke Daftar Proyek',
          href: '/proyek',
        },
        backToHome: {
          label: 'Kembali ke Beranda',
          href: '/',
        },
      },
    },
  },
  published: {
    labels: {
      breadcrumbHome: 'Beranda',
      breadcrumbProjects: 'Proyek',
      factsTitle: 'Ringkasan Proyek',
      overviewTitle: 'Gambaran dan Kebutuhan',
      galleryTitle: 'Galeri Dokumentasi Berizin',
      scopeTitle: 'Ruang Lingkup',
      approachTitle: 'Pendekatan dan Tahapan',
      outcomesTitle: 'Hasil yang Dapat Dibuktikan',
      relatedServicesTitle: 'Layanan Terkait',
      relatedProjectsTitle: 'Proyek Terkait',
      closingTitle: 'Lihat kembali proyek publik yang tersedia.',
      closingCtaProjects: 'Kembali ke Daftar Proyek',
      closingCtaWorkProcess: 'Pelajari Cara Kerja',
    },
  },
};

export const SAFE_PUBLIC_PROJECT_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function resolvePublishedProjectDetailBySlug(projects, slug, options = {}) {
  const { now = new Date() } = options;
  const currentDate = new Date(now);

  if (isNaN(currentDate.getTime())) {
    return { status: 'UNAVAILABLE', project: null };
  }

  if (!Array.isArray(projects) || typeof slug !== 'string') {
    return { status: 'UNAVAILABLE', project: null };
  }

  const trimmedSlug = slug.trim();
  if (!trimmedSlug || !SAFE_PUBLIC_PROJECT_SLUG.test(trimmedSlug)) {
    return { status: 'UNAVAILABLE', project: null };
  }

  const record = projects.find((p) => p && p.slug === trimmedSlug);
  if (!record) {
    return { status: 'UNAVAILABLE', project: null };
  }

  // 1. Status & Visibility & Detail Ready
  if (
    record.publicationStatus !== 'PUBLISHED' ||
    record.visibility !== 'PUBLIC' ||
    record.detailPageReady !== true
  ) {
    return { status: 'UNAVAILABLE', project: null };
  }

  // 2. Slug match
  if (record.slug !== trimmedSlug || !SAFE_PUBLIC_PROJECT_SLUG.test(record.slug)) {
    return { status: 'UNAVAILABLE', project: null };
  }

  // 3. Source & Effective Date
  const sourceVersion = String(record.sourceVersion || '').trim();
  if (!sourceVersion) {
    return { status: 'UNAVAILABLE', project: null };
  }

  if (!record.effectiveDate) {
    return { status: 'UNAVAILABLE', project: null };
  }
  const effectiveDate = new Date(record.effectiveDate);
  if (isNaN(effectiveDate.getTime()) || effectiveDate > currentDate) {
    return { status: 'UNAVAILABLE', project: null };
  }

  // Review Due At check
  if (record.reviewDueAt !== undefined && record.reviewDueAt !== null) {
    const reviewDueAt = new Date(record.reviewDueAt);
    if (isNaN(reviewDueAt.getTime()) || reviewDueAt < currentDate) {
      return { status: 'UNAVAILABLE', project: null };
    }
  }

  // 4. Governance Gate
  const gate = record.publicationGate;
  if (
    !gate ||
    gate.sourceVerified !== true ||
    gate.permissionApproved !== true ||
    gate.anonymizationApproved !== true ||
    gate.contentReviewApproved !== true
  ) {
    return { status: 'UNAVAILABLE', project: null };
  }

  // 5. Required String Fields
  const publicProjectId = String(record.publicProjectId || '').trim();
  const title = String(record.title || '').trim();
  const summary = String(record.summary || '').trim();
  const category = String(record.category || '').trim();

  if (!publicProjectId || !title || !summary || !category) {
    return { status: 'UNAVAILABLE', project: null };
  }

  // 6. Overview (1-4 non-empty paragraphs)
  if (!Array.isArray(record.overview)) {
    return { status: 'UNAVAILABLE', project: null };
  }
  const overview = record.overview
    .map((p) => String(p || '').trim())
    .filter((p) => p !== '');
  if (overview.length < 1 || overview.length > 4) {
    return { status: 'UNAVAILABLE', project: null };
  }

  // 7. Facts (array non-empty)
  if (!Array.isArray(record.facts)) {
    return { status: 'UNAVAILABLE', project: null };
  }
  const facts = record.facts
    .filter((f) => f && typeof f === 'object')
    .map((f) => ({
      label: String(f.label || '').trim(),
      value: String(f.value || '').trim(),
    }))
    .filter((f) => f.label !== '' && f.value !== '');
  if (facts.length === 0) {
    return { status: 'UNAVAILABLE', project: null };
  }

  // 8. Scope (array 3-10 items)
  if (!Array.isArray(record.scope)) {
    return { status: 'UNAVAILABLE', project: null };
  }
  const scope = record.scope
    .map((s) => String(s || '').trim())
    .filter((s) => s !== '');
  if (scope.length < 3) {
    return { status: 'UNAVAILABLE', project: null };
  }
  const finalScope = scope.slice(0, 10);

  // 9. Cover Media Gate
  const rawCover = record.coverMedia || (Array.isArray(record.media) ? record.media[0] : null);
  if (
    !rawCover ||
    typeof rawCover !== 'object' ||
    rawCover.rightsStatus !== 'APPROVED' ||
    rawCover.publicVisibility !== 'PUBLIC' ||
    !String(rawCover.sourceVersion || '').trim() ||
    !String(rawCover.src || '').trim() ||
    !String(rawCover.alt || '').trim()
  ) {
    return { status: 'UNAVAILABLE', project: null };
  }

  const coverMedia = {
    src: String(rawCover.src).trim(),
    alt: String(rawCover.alt).trim(),
    type: rawCover.type || 'IMAGE',
  };

  // 10. Gallery (optional)
  let gallery = [];
  const rawGallery = Array.isArray(record.gallery)
    ? record.gallery
    : Array.isArray(record.media)
    ? record.media.slice(1)
    : [];

  if (Array.isArray(rawGallery)) {
    gallery = rawGallery
      .filter(
        (m) =>
          m &&
          typeof m === 'object' &&
          m.rightsStatus === 'APPROVED' &&
          m.publicVisibility === 'PUBLIC' &&
          String(m.sourceVersion || '').trim() !== '' &&
          String(m.src || '').trim() !== '' &&
          String(m.alt || '').trim() !== '' &&
          String(m.src).trim() !== coverMedia.src
      )
      .map((m) => ({
        src: String(m.src).trim(),
        alt: String(m.alt).trim(),
        type: m.type || 'IMAGE',
      }))
      .slice(0, 8);
  }

  // 11. Approach (optional, 2-8 items)
  let approach = null;
  if (Array.isArray(record.approach)) {
    const validApproach = record.approach
      .filter(
        (a) =>
          a &&
          typeof a === 'object' &&
          String(a.title || '').trim() !== '' &&
          typeof a.order === 'number' &&
          !isNaN(a.order)
      )
      .map((a) => ({
        order: a.order,
        title: String(a.title).trim(),
        description: String(a.description || '').trim(),
      }))
      .sort((a, b) => a.order - b.order);

    if (validApproach.length >= 2 && validApproach.length <= 8) {
      approach = validApproach;
    }
  }

  // 12. Outcomes (optional)
  let outcomes = null;
  if (Array.isArray(record.outcomes)) {
    const validOutcomes = record.outcomes
      .filter(
        (o) =>
          o &&
          typeof o === 'object' &&
          String(o.title || '').trim() !== ''
      )
      .map((o) => ({
        title: String(o.title).trim(),
        description: String(o.description || '').trim(),
      }));

    if (validOutcomes.length > 0) {
      outcomes = validOutcomes;
    }
  }

  // 13. Related Services (max 3)
  const allowedServiceRoutes = ['/layanan', '/cara-kerja', '/tentang', '/'];
  let relatedServices = [];
  if (Array.isArray(record.relatedServices)) {
    relatedServices = record.relatedServices
      .filter(
        (s) =>
          s &&
          typeof s === 'object' &&
          String(s.title || '').trim() !== '' &&
          allowedServiceRoutes.includes(s.href)
      )
      .map((s) => ({
        title: String(s.title).trim(),
        href: s.href,
      }))
      .slice(0, 3);
  }

  // 14. Related Projects (max 3)
  let relatedProjects = [];
  if (Array.isArray(record.relatedProjects)) {
    relatedProjects = record.relatedProjects
      .filter((rp) => {
        if (!rp || typeof rp !== 'object' || rp.slug === trimmedSlug) return false;
        const relRes = resolvePublishedProjectDetailBySlug(projects, rp.slug, { now });
        return relRes.status === 'PUBLISHED';
      })
      .map((rp) => {
        const relRes = resolvePublishedProjectDetailBySlug(projects, rp.slug, { now });
        return {
          slug: relRes.project.slug,
          title: relRes.project.title,
          summary: relRes.project.summary,
          category: relRes.project.category,
          href: `/proyek/${relRes.project.slug}`,
        };
      })
      .slice(0, 3);
  }

  // Construct Clean DTO (no internal fields)
  const publicProjectDetailDTO = {
    publicProjectId,
    slug: trimmedSlug,
    title,
    summary,
    category,

    publicStatus: record.publicStatus ? String(record.publicStatus).trim() : null,
    locationGeneral: record.locationGeneral ? String(record.locationGeneral).trim() : null,
    periodGeneral: record.periodGeneral ? String(record.periodGeneral).trim() : null,
    completionYear: record.completionYear ? String(record.completionYear).trim() : null,

    facts,
    overview,
    scope: finalScope,
    approach,
    outcomes,

    coverMedia,
    gallery,

    relatedServices,
    relatedProjects,

    meta: {
      title: `${title} | Proyek Rumahku Konstruksi`,
      description: summary,
      canonicalPath: `/proyek/${trimmedSlug}`,
    },
  };

  return {
    status: 'PUBLISHED',
    project: publicProjectDetailDTO,
  };
}
