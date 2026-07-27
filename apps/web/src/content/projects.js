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
    items: [
      {
        id: 'source',
        title: 'Sumber Pekerjaan Nyata'
      },
      {
        id: 'permission',
        title: 'Izin Publikasi'
      },
      {
        id: 'anonymization',
        title: 'Anonimisasi'
      },
      {
        id: 'documentation',
        title: 'Dokumentasi dan Review'
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

  return projects.reduce((published, project) => {
    // Requirements
    if (project.publicationStatus !== 'PUBLISHED') return published;
    if (project.visibility !== 'PUBLIC') return published;
    if (!project.sourceVersion) return published;
    if (!project.effectiveDate) return published;
    if (!project.title || !project.summary || !project.category) return published;
    
    // Media requirements
    const approvedMedia = Array.isArray(project.media)
      ? project.media.filter(m => m.rightsStatus === 'APPROVED' && m.alt)
      : [];
    
    // Safety check for cover media
    const coverMedia = approvedMedia.length > 0 ? {
      url: approvedMedia[0].url,
      alt: approvedMedia[0].alt,
      type: approvedMedia[0].type
    } : null;
    
    if (!coverMedia) return published;

    // Return mapped safe public project
    published.push({
      publicProjectId: String(project.publicProjectId || '').trim(), // Ensure public ID, not internal
      title: String(project.title),
      summary: String(project.summary),
      category: String(project.category),
      locationGeneral: String(project.locationGeneral || ''),
      publicStatus: String(project.publicStatus || ''),
      completionYear: project.completionYear,
      coverMedia,
      detailPageReady: Boolean(project.detailPageReady),
      detailHref: project.detailPageReady ? `/proyek/${project.slug || project.publicProjectId}` : null,
      publishedAt: project.publishedAt || project.effectiveDate,
      reviewDueAt: project.reviewDueAt || null
    });

    return published;
  }, []);
}
