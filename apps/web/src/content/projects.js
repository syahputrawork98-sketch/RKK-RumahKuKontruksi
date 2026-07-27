export const projectListContent = {
  meta: {
    title: 'Proyek dan Portofolio | Rumahku Konstruksi',
    description: 'Pelajari tata kelola publikasi proyek Rumahku Konstruksi. Portofolio hanya ditampilkan setelah sumber pekerjaan, izin, anonimisasi, dokumentasi, dan peninjauan kontennya terverifikasi.',
    path: '/proyek'
  },
  hero: {
    eyebrow: 'Proyek dan Portofolio RKK',
    title: 'Portofolio hanya ditampilkan setelah data, dokumentasi, izin, dan batas informasinya terverifikasi.',
    description: 'RKK sedang menyiapkan tata kelola publikasi proyek agar setiap informasi yang tampil dapat ditelusuri ke pekerjaan nyata dan persetujuan yang berlaku. Saat ini belum ada proyek yang ditampilkan sebagai portofolio publik.',
    primaryCTA: {
      label: 'Pelajari Cara Kerja',
      href: '/cara-kerja'
    },
    secondaryCTA: {
      label: 'Kembali ke Beranda',
      href: '/'
    }
  },
  publicationStatus: {
    title: 'Belum ada proyek yang dipublikasikan sebagai portofolio RKK.',
    description: 'Data proyek acuan telah tersedia untuk merancang kebutuhan sistem, tetapi bukan bukti proyek nyata. Portofolio akan ditampilkan setelah sumber operasional, izin publikasi, anonimisasi, media, dan peninjauan konten tersedia.'
  },
  publicationGates: {
    heading: 'Empat pemeriksaan sebelum proyek tampil',
    description: 'Setiap proyek harus melewati pemeriksaan sumber pekerjaan, izin publikasi, anonimisasi, serta dokumentasi dan review sebelum dapat ditampilkan.',
    items: [
      {
        id: 'source',
        title: 'Sumber Pekerjaan Nyata',
        description: 'Proyek harus dapat ditelusuri ke pekerjaan operasional dan bukti yang sah, bukan data acuan, seed, dummy, atau arsip tanpa verifikasi.'
      },
      {
        id: 'permission',
        title: 'Izin Publikasi',
        description: 'Persetujuan penggunaan informasi dan media harus tersedia, tercatat, masih berlaku, dan dapat ditinjau kembali.'
      },
      {
        id: 'anonymization',
        title: 'Anonimisasi',
        description: 'Identitas pelanggan, alamat rinci, nilai kontrak, dokumen, serta data sensitif lain harus dihilangkan atau dibatasi sesuai keputusan publikasi.'
      },
      {
        id: 'documentation',
        title: 'Dokumentasi dan Review',
        description: 'Media harus mempunyai sumber dan hak penggunaan, sedangkan copy, metadata, alt text, dan status publikasinya harus selesai ditinjau.'
      }
    ]
  },
  holdState: {
    title: 'Portofolio publik belum tersedia.',
    description: 'RKK tidak menggunakan proyek contoh atau dokumentasi tanpa izin untuk membangun kesan pengalaman. Informasi proyek akan tampil setelah seluruh gerbang publikasi terpenuhi.'
  },
  informationBoundaries: {
    heading: 'Informasi proyek yang tetap dilindungi',
    items: [
      'Identitas pelanggan dilindungi.',
      'Lokasi ditampilkan secara umum.',
      'Biaya, pembayaran, dan dokumen internal tidak dipublikasikan.',
      'Media hanya digunakan dengan sumber dan izin yang berlaku.'
    ]
  },
  closingCTA: {
    title: 'Pelajari pendekatan RKK sebelum portofolio tersedia.',
    primaryCTA: {
      label: 'Pelajari Cara Kerja',
      href: '/cara-kerja'
    },
    secondaryCTA: {
      label: 'Kembali ke Beranda',
      href: '/'
    }
  }
};

export const projectCatalog = [];

export function resolvePublishedProjects(projects) {
  if (!Array.isArray(projects)) {
    return [];
  }

  const SAFE_PUBLIC_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

  return projects.reduce((published, project) => {
    // Requirements
    if (project.publicationStatus !== 'PUBLISHED') return published;
    if (project.visibility !== 'PUBLIC') return published;
    if (!project.sourceVersion) return published;
    if (!project.effectiveDate) return published;

    // Trim and check required strings
    const publicProjectId = String(project.publicProjectId || '').trim();
    const title = String(project.title || '').trim();
    const summary = String(project.summary || '').trim();
    const category = String(project.category || '').trim();

    if (!publicProjectId || !title || !summary || !category) return published;

    // Media requirements
    const approvedMedia = Array.isArray(project.media)
      ? project.media.filter(m =>
          m.rightsStatus === 'APPROVED' &&
          String(m.src || '').trim() !== '' &&
          String(m.alt || '').trim() !== ''
        )
      : [];

    // Safety check for cover media
    const coverMedia = approvedMedia.length > 0 ? {
      src: String(approvedMedia[0].src).trim(),
      alt: String(approvedMedia[0].alt).trim(),
      type: approvedMedia[0].type
    } : null;

    if (!coverMedia) return published;

    // Slug validation
    const rawSlug = String(project.slug || '').trim();
    const isSafeSlug = SAFE_PUBLIC_SLUG.test(rawSlug);
    const detailPageReady = Boolean(project.detailPageReady) && isSafeSlug;
    const detailHref = detailPageReady ? `/proyek/${rawSlug}` : null;

    // Return mapped safe public project
    published.push({
      publicProjectId,
      title,
      summary,
      category,
      locationGeneral: String(project.locationGeneral || ''),
      publicStatus: String(project.publicStatus || ''),
      completionYear: project.completionYear,
      coverMedia,
      detailPageReady,
      detailHref,
      publishedAt: project.publishedAt || project.effectiveDate,
      reviewDueAt: project.reviewDueAt || null
    });

    return published;
  }, []);
}
