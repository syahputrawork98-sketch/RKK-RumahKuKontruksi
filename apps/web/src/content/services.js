export const serviceListContent = {
  meta: {
    title: 'Layanan Rumahku Konstruksi | Status Publikasi Layanan',
    description: 'Lihat status publikasi layanan Rumahku Konstruksi, gerbang kesiapan, batas informasi, dan jalur yang dapat dipelajari saat belum ada layanan aktif.'
  },
  pageState: {
    key: 'current-empty',
    publicationStatus: 'HOLD',
    hasPublishedServices: false
  },
  hero: {
    eyebrow: 'Layanan Rumahku Konstruksi',
    title: 'Daftar layanan yang telah melewati pemeriksaan kesiapan dan persetujuan publikasi.',
    description: 'RKK hanya menampilkan layanan yang mempunyai ruang lingkup, keluaran, batas, pemilik proses, kapasitas, risiko, dan sumber yang jelas. Saat ini, informasi layanan masih dalam tahap penyelarasan dan belum ditampilkan sebagai penawaran aktif.',
    primaryAction: {
      label: 'Pelajari Cara Kerja',
      href: '/cara-kerja'
    },
    secondaryAction: {
      label: 'Kembali ke Beranda',
      href: '/'
    }
  },
  publicationFlow: {
    ariaLabel: 'Tahapan layanan dari sumber bisnis hingga kartu aktif',
    steps: [
      'Sumber Bisnis',
      'Definisi',
      'Kesiapan',
      'Review',
      'Persetujuan Publikasi',
      'Kartu Aktif'
    ],
    notice: 'Kartu aktif hanya tersedia setelah seluruh tahapan yang berlaku telah diperiksa.'
  },
  currentStatus: {
    eyebrow: 'STATUS PUBLIKASI SAAT INI',
    statusLabel: 'Belum ada layanan siap publik',
    title: 'Belum ada layanan yang dipublikasikan sebagai penawaran aktif.',
    description: 'Pembangunan Rumah Baru dan Renovasi Rumah telah ditetapkan sebagai layanan utama awal untuk penggunaan internal, tetapi informasi publiknya masih menunggu kelengkapan ruang lingkup, SOP, template, harga, kapasitas, legalitas, penanggung jawab, dan persetujuan publikasi.',
    notice: 'Status internal tidak sama dengan persetujuan untuk menampilkan layanan sebagai kartu, penawaran, atau jalur transaksi.'
  },
  publicationGate: {
    eyebrow: 'GERBANG PUBLIKASI LAYANAN',
    title: 'Apa yang harus siap sebelum layanan ditampilkan?',
    description: 'RKK menggunakan empat kelompok pemeriksaan agar informasi layanan yang dipublikasikan mempunyai dasar yang dapat dipahami dan ditelusuri.',
    groups: [
      {
        key: 'definition',
        title: 'Definisi',
        description: 'Pelanggan dan masalah yang dituju, ruang lingkup, keluaran, prasyarat, batas tanggung jawab, dan hal yang tidak termasuk harus dijelaskan.'
      },
      {
        key: 'readiness',
        title: 'Kesiapan',
        description: 'Proses, pemilik proses, kapasitas pelaksanaan, risiko yang dapat diterima, serta SOP dan template minimum harus tersedia.'
      },
      {
        key: 'documents',
        title: 'Dokumen',
        description: 'Sumber, versi, tanggal berlaku, dasar kesepakatan, dan informasi yang dapat ditelusuri harus tersedia.'
      },
      {
        key: 'publication',
        title: 'Publikasi',
        description: 'Review, persetujuan, status, route, CTA, serta mekanisme penarikan harus ditetapkan sebelum kartu aktif ditampilkan.'
      }
    ],
    notice: 'Checklist rinci, kewenangan, parameter komersial, dan kontrol internal tetap menjadi informasi internal RKK.'
  },
  catalog: {
    eyebrow: 'DAFTAR LAYANAN AKTIF',
    title: 'Layanan yang telah memenuhi status publikasi.',
    description: 'Area ini hanya menampilkan layanan berstatus PUBLISHED dengan route detail, sumber, versi, dan tanggal berlaku yang valid.'
  },
  emptyState: {
    statusLabel: 'CURRENT STATE',
    title: 'Belum ada layanan siap publik.',
    description: 'Informasi layanan sedang diselaraskan dengan ruang lingkup, dokumen, kapasitas, risiko, dan persetujuan yang berlaku.',
    availableNow: 'Sementara itu, Anda dapat mempelajari cara RKK menerima, memeriksa, merencanakan, mengendalikan, dan mengevaluasi kebutuhan melalui Halaman Cara Kerja.',
    primaryAction: {
      label: 'Pelajari Cara Kerja',
      href: '/cara-kerja'
    },
    secondaryAction: {
      label: 'Kembali ke Beranda',
      href: '/'
    },
    notice: 'Tidak ada kartu layanan aktif, harga, durasi, wilayah, rating, atau CTA transaksi pada kondisi ini.'
  },
  conceptDifference: {
    eyebrow: 'MEMAHAMI KEDUDUKAN LAYANAN',
    title: 'Tidak semua aktivitas atau fitur merupakan layanan.',
    description: 'Pembedaan ini membantu mencegah aktivitas internal, proses kerja, dan fitur digital ditampilkan sebagai penawaran yang belum mempunyai keputusan bisnis.',
    items: [
      {
        key: 'service',
        title: 'Layanan',
        description: 'Nilai yang diberikan kepada pelanggan dengan ruang lingkup, keluaran, tanggung jawab, proses, pemilik, dasar nilai, dan dokumen kesepakatan yang jelas.'
      },
      {
        key: 'integrated-component',
        title: 'Komponen Terintegrasi',
        description: 'Aktivitas yang dapat menjadi bagian dari layanan utama dan kedudukannya ditentukan dalam penawaran serta kesepakatan. Komponen tidak otomatis dijual sebagai layanan mandiri.'
      },
      {
        key: 'business-process',
        title: 'Proses Bisnis',
        description: 'Rangkaian sembilan fase untuk menerima, menilai, menyiapkan, melaksanakan, mengendalikan, menyerahkan, dan mengevaluasi pekerjaan.'
      },
      {
        key: 'system-feature',
        title: 'Fitur Sistem',
        description: 'Alat digital untuk mendukung informasi, dokumen, laporan, perubahan, atau audit. Fitur bukan layanan dan bukan bukti bahwa layanan telah siap dipublikasikan.'
      }
    ]
  },
  boundaries: {
    eyebrow: 'BATAS INFORMASI LAYANAN',
    title: 'Informasi layanan mengikuti status dan versi yang berlaku.',
    description: 'Halaman ini memberikan orientasi publik dan tidak menggantikan pemeriksaan kebutuhan, detail layanan, penawaran, atau kesepakatan.',
    items: [
      'halaman ini bukan penawaran, kontrak, atau daftar harga',
      'hanya layanan berstatus PUBLISHED yang dapat menjadi kartu aktif',
      'layanan yang disetujui untuk penggunaan internal belum tentu siap dipublikasikan',
      'pengajuan kebutuhan tidak berarti proyek atau layanan otomatis diterima',
      'harga dan jadwal hanya dapat dibahas setelah data dinilai cukup',
      'ruang lingkup, keluaran, prasyarat, dan batas mengikuti detail serta kesepakatan yang berlaku',
      'risiko dikelola dan diperiksa, bukan dijanjikan dapat dihilangkan seluruhnya',
      'status dan versi layanan dapat berubah sehingga kartu atau CTA dapat ditarik',
      'fitur digital tidak menjadi bukti kesiapan layanan'
    ]
  },
  closing: {
    title: 'Pelajari proses yang telah tersedia saat ini.',
    description: 'Informasi layanan akan diperbarui setelah keputusan bisnis, dokumen, kesiapan, dan persetujuan publikasinya lengkap. Untuk saat ini, Halaman Cara Kerja memberikan gambaran proses tingkat tinggi RKK.',
    primaryAction: {
      label: 'Pelajari Cara Kerja',
      href: '/cara-kerja'
    },
    secondaryAction: {
      label: 'Kembali ke Beranda',
      href: '/'
    },
    notice: 'Halaman ini tidak menerima pengajuan, tidak memberikan harga, dan tidak menyediakan transaksi layanan.'
  }
};

export const serviceCatalog = [];

export function resolvePublishedServices(services = []) {
  if (!Array.isArray(services)) {
    return [];
  }

  return services.filter((service) => (
    service?.publicationStatus === 'PUBLISHED'
    && service?.isVisible === true
    && typeof service?.detailRoute === 'string'
    && service.detailRoute.startsWith('/layanan/')
    && Boolean(service?.sourceVersion)
    && Boolean(service?.effectiveDate)
  ));
}
