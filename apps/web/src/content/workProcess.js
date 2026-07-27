export const workProcessContent = {
  meta: {
    title: 'Cara Kerja Rumahku Konstruksi | Sembilan Fase Proses',
    description: 'Pelajari sembilan fase Rumahku Konstruksi dari kebutuhan masuk, pemeriksaan, perencanaan, kesepakatan, pelaksanaan, serah terima, hingga evaluasi.'
  },
  hero: {
    eyebrow: 'Cara Kerja Rumahku Konstruksi',
    title: 'Sembilan fase untuk membantu pekerjaan berjalan melalui proses yang lebih jelas dan dapat ditelusuri.',
    description: 'Alur ini menunjukkan bagaimana kebutuhan bergerak dari pencatatan awal menuju pemeriksaan, perencanaan, kesepakatan, kesiapan, pelaksanaan, serah terima, dan evaluasi. Tahapan dapat menyesuaikan kebutuhan dan tidak menjamin setiap pengajuan dilanjutkan menjadi proyek.',
    primaryAction: {
      label: 'Pelajari Tentang RKK',
      href: '/tentang'
    },
    secondaryAction: {
      label: 'Kembali ke Beranda',
      href: '/'
    },
    notice: 'Jalur pengajuan kebutuhan sedang disiapkan. Ketika tersedia, pengajuan tetap akan melalui pemeriksaan dan tidak berarti proyek otomatis diterima.'
  },
  readingPrinciples: {
    eyebrow: 'MEMAHAMI ALUR',
    title: 'Setiap fase mempunyai tujuan, keluaran, dan titik keputusan.',
    description: 'Sembilan fase ini menunjukkan arsitektur proses tingkat tinggi. Rincian aktivitas, dokumen, pihak, waktu, biaya, dan syarat mengikuti kebutuhan serta kesepakatan yang berlaku.',
    items: [
      {
        title: 'Setiap fase mempunyai tujuan dan keluaran',
        description: 'Tahapan digunakan untuk membantu informasi, pemeriksaan, keputusan, dan tindak lanjut tetap mempunyai konteks.'
      },
      {
        title: 'Kelanjutan memerlukan data dan keputusan',
        description: 'Kebutuhan tidak otomatis bergerak ke tahap berikutnya sebelum informasi dan kesiapan yang diperlukan diperiksa.'
      },
      {
        title: 'Jalur dapat berubah',
        description: 'Proses dapat meminta data tambahan, kembali, ditunda, dirujuk, atau tidak dilanjutkan sesuai hasil pemeriksaan.'
      },
      {
        title: 'Kontrol berjalan sepanjang proses',
        description: 'Dokumentasi, risiko, perubahan, tanggung jawab, mutu, biaya, dan waktu diperhatikan sesuai ruang lingkup.'
      }
    ],
    callout: 'Halaman ini menjelaskan proses pada tingkat tinggi dan bukan SOP, kontrak, jadwal, daftar harga, atau janji bahwa setiap kebutuhan akan diterima.'
  },
  overview: {
    eyebrow: 'GAMBARAN SEMBILAN FASE',
    title: 'Dari kebutuhan masuk hingga evaluasi dan pembelajaran.',
    description: 'Urutan membantu pengguna memahami posisi proses. Beberapa fase dapat memerlukan pengulangan atau pemeriksaan tambahan sebelum bergerak lebih lanjut.',
    phases: [
      '01 Kebutuhan Masuk',
      '02 Kualifikasi dan Penyaringan',
      '03 Perumusan Kebutuhan dan Pemeriksaan Awal',
      '04 Perencanaan, Desain, Estimasi, dan RAB',
      '05 Kelayakan, Penawaran, dan Kesepakatan',
      '06 Aktivasi dan Kesiapan',
      '07 Pelaksanaan dan Pengendalian',
      '08 Pemeriksaan Akhir, Serah Terima, dan Penutupan',
      '09 Evaluasi dan Pembelajaran'
    ]
  },
  groups: [
    {
      id: 'memahami-kebutuhan',
      eyebrow: 'FASE 1–3',
      title: 'Memahami dan menilai kebutuhan.',
      description: 'Tahap awal digunakan untuk mencatat kebutuhan, memeriksa kesesuaian, memperoleh data yang diperlukan, dan merumuskan jalur yang layak ditinjau lebih lanjut.',
      phases: [
        {
          number: '01',
          slug: 'kebutuhan-masuk',
          title: 'Kebutuhan Masuk',
          summary: 'Mencatat kebutuhan awal, sumber masuk, status awal, dan penanggung jawab tindak lanjut.',
          purpose: 'Mencegah kebutuhan kehilangan konteks sebelum diperiksa.',
          outputs: [
            'catatan kebutuhan awal',
            'status awal',
            'sumber kebutuhan',
            'penanggung jawab tindak lanjut'
          ],
          decision: 'Kebutuhan dicatat untuk menentukan apakah informasi awal cukup untuk masuk ke tahap kualifikasi.',
          next: 'Lanjut ke kualifikasi, meminta informasi awal, atau menutup catatan bila kebutuhan tidak dapat ditindaklanjuti.'
        },
        {
          number: '02',
          slug: 'kualifikasi-dan-penyaringan',
          title: 'Kualifikasi dan Penyaringan',
          summary: 'Memeriksa kesesuaian kebutuhan, kesiapan, lokasi, anggaran, pengambil keputusan, dan risiko awal.',
          purpose: 'Menilai apakah kebutuhan mempunyai dasar yang cukup dan sesuai untuk diperiksa lebih lanjut.',
          outputs: [
            'hasil kualifikasi',
            'daftar data tambahan yang diperlukan',
            'catatan risiko awal',
            'keputusan jalur berikutnya'
          ],
          decision: 'Hasil dapat berupa lanjut, meminta data, merujuk, menunda, atau tidak melanjutkan.',
          next: 'Kebutuhan yang layak bergerak ke perumusan kebutuhan dan pemeriksaan awal.'
        },
        {
          number: '03',
          slug: 'perumusan-dan-pemeriksaan-awal',
          title: 'Perumusan Kebutuhan dan Pemeriksaan Awal',
          summary: 'Merumuskan brief, memeriksa dokumen atau kondisi, serta mencatat asumsi, pengecualian, dan risiko awal.',
          purpose: 'Membentuk pemahaman kebutuhan yang lebih jelas sebelum perencanaan disusun.',
          outputs: [
            'ringkasan kebutuhan',
            'hasil pemeriksaan atau survei bila relevan',
            'ruang lingkup awal',
            'asumsi dan pengecualian',
            'risiko awal',
            'jalur yang direkomendasikan'
          ],
          decision: 'Data dinilai cukup atau pemeriksaan tambahan masih diperlukan.',
          next: 'Kebutuhan yang cukup jelas bergerak ke perencanaan, desain, estimasi, atau RAB sesuai jalur yang relevan.'
        }
      ]
    },
    {
      id: 'menyiapkan-dasar',
      eyebrow: 'FASE 4–6',
      title: 'Menyiapkan dasar dan kesiapan.',
      description: 'Tahap ini membentuk dasar perencanaan, menilai kelayakan, menyusun kesepakatan, dan memastikan kesiapan sebelum proyek dinyatakan aktif.',
      phases: [
        {
          number: '04',
          slug: 'perencanaan-desain-estimasi-rab',
          title: 'Perencanaan, Desain, Estimasi, dan RAB',
          summary: 'Menyiapkan jalur perencanaan yang sesuai serta keluaran yang dapat menjadi dasar penilaian berikutnya.',
          purpose: 'Menerjemahkan kebutuhan yang telah diperiksa menjadi dasar teknis dan ruang lingkup yang lebih terstruktur.',
          outputs: [
            'dokumen perencanaan sesuai kebutuhan',
            'konsep, gambar, atau spesifikasi bila relevan',
            'estimasi awal',
            'RAB setelah data dinilai cukup',
            'jadwal awal',
            'asumsi, pengecualian, dan opsi pekerjaan'
          ],
          decision: 'Dokumen dinilai cukup untuk masuk ke review kelayakan atau perlu diperbaiki dan dilengkapi.',
          next: 'Dasar yang cukup bergerak ke kelayakan, penawaran, dan kesepakatan.',
          notice: 'Harga final tidak diberikan sebelum data dinilai cukup.'
        },
        {
          number: '05',
          slug: 'kelayakan-penawaran-kesepakatan',
          title: 'Kelayakan, Penawaran, dan Kesepakatan',
          summary: 'Menilai kelayakan, ruang lingkup, risiko, kemampuan, penawaran, dan dasar kesepakatan.',
          purpose: 'Memastikan keputusan pekerjaan mempunyai dasar teknis, bisnis, risiko, dan tanggung jawab yang dapat dipahami.',
          outputs: [
            'hasil review kelayakan',
            'catatan risiko dan kemampuan',
            'ruang lingkup yang ditinjau',
            'penawaran',
            'hasil revisi atau negosiasi',
            'dasar kesepakatan'
          ],
          decision: 'Hasil dapat diterima, direvisi, ditunda, atau tidak dilanjutkan.',
          next: 'Kesepakatan yang memenuhi persyaratan bergerak ke aktivasi dan kesiapan.'
        },
        {
          number: '06',
          slug: 'aktivasi-dan-kesiapan',
          title: 'Aktivasi dan Kesiapan',
          summary: 'Memastikan persyaratan bisnis, kontraktual, teknis, finansial, risiko, operasional, dan dokumentasi siap.',
          purpose: 'Mencegah pekerjaan dinyatakan aktif sebelum prasyarat yang berlaku diperiksa.',
          outputs: [
            'dokumen kesiapan',
            'rencana awal pelaksanaan',
            'baseline atau dasar pengendalian',
            'catatan penugasan dan koordinasi',
            'keputusan aktivasi'
          ],
          decision: 'Proyek hanya aktif setelah kesiapan yang dipersyaratkan diperiksa dan disetujui.',
          next: 'Proyek yang aktif bergerak ke pelaksanaan dan pengendalian.'
        }
      ]
    },
    {
      id: 'melaksanakan-dan-menutup',
      eyebrow: 'FASE 7–9',
      title: 'Melaksanakan, menyerahkan, dan belajar.',
      description: 'Tahap ini menjalankan pekerjaan, memeriksa hasil, menutup administrasi dan dokumentasi, lalu menggunakan pembelajaran untuk perbaikan berikutnya.',
      phases: [
        {
          number: '07',
          slug: 'pelaksanaan-dan-pengendalian',
          title: 'Pelaksanaan dan Pengendalian',
          summary: 'Menjalankan pekerjaan sambil mengendalikan mutu, biaya, waktu, perubahan, risiko, pelaporan, dan bukti.',
          purpose: 'Menjaga pelaksanaan tetap mempunyai dasar, catatan, pemeriksaan, dan keputusan yang dapat ditelusuri.',
          outputs: [
            'catatan pelaksanaan',
            'progres yang telah diverifikasi',
            'dokumentasi dan bukti',
            'laporan',
            'catatan perubahan dan kendala',
            'keputusan tindak lanjut'
          ],
          decision: 'Progres, perubahan, kendala, dan risiko ditinjau sesuai dampak serta kewenangan yang berlaku.',
          next: 'Pekerjaan yang telah memenuhi pemeriksaan bergerak ke pemeriksaan akhir, serah terima, dan penutupan.'
        },
        {
          number: '08',
          slug: 'pemeriksaan-serah-terima-penutupan',
          title: 'Pemeriksaan Akhir, Serah Terima, dan Penutupan',
          summary: 'Memeriksa hasil, menyelesaikan temuan, menyerahkan keluaran, dan menutup administrasi serta dokumentasi.',
          purpose: 'Memastikan hasil dan kewajiban penutupan diperiksa sebelum pekerjaan dinyatakan selesai.',
          outputs: [
            'hasil pemeriksaan akhir',
            'daftar temuan dan penyelesaiannya',
            'dokumen serah terima',
            'dokumen penutupan',
            'kompilasi laporan dan bukti'
          ],
          decision: 'Temuan diselesaikan atau ditindaklanjuti sebelum penutupan sesuai ketentuan yang berlaku.',
          next: 'Pekerjaan yang telah ditutup bergerak ke evaluasi dan pembelajaran.'
        },
        {
          number: '09',
          slug: 'evaluasi-dan-pembelajaran',
          title: 'Evaluasi dan Pembelajaran',
          summary: 'Mengevaluasi hasil, masalah, keputusan, risiko, dan pembelajaran untuk memperbaiki sistem berikutnya.',
          purpose: 'Menggunakan pengalaman dan bukti pekerjaan sebagai bahan perbaikan proses.',
          outputs: [
            'ringkasan evaluasi',
            'pembelajaran utama',
            'catatan masalah dan keputusan',
            'catatan risiko',
            'rekomendasi perbaikan'
          ],
          decision: 'Pembelajaran yang relevan diterjemahkan menjadi tindak lanjut atau perbaikan sistem.',
          next: 'Evaluasi menutup siklus pekerjaan dan menjadi masukan untuk proses berikutnya.'
        }
      ]
    }
  ],
  decisionGates: {
    eyebrow: 'TITIK KEPUTUSAN',
    title: 'Tidak semua kebutuhan bergerak lurus hingga pelaksanaan.',
    description: 'Gate digunakan untuk memastikan kelanjutan proses mempunyai data, dasar, kesiapan, dan persetujuan yang memadai.',
    items: [
      {
        title: 'Gate Kualifikasi',
        description: 'Hasil dapat berupa lanjut, meminta data, merujuk, menunda, atau tidak melanjutkan.'
      },
      {
        title: 'Gate Pemeriksaan Awal',
        description: 'Data dinilai cukup atau pemeriksaan tambahan masih diperlukan.'
      },
      {
        title: 'Gate Perencanaan',
        description: 'Dasar perencanaan dinilai cukup untuk review berikutnya atau perlu diperbaiki.'
      },
      {
        title: 'Gate Kelayakan',
        description: 'Hasil dapat diterima, direvisi, ditunda, atau tidak dilanjutkan.'
      },
      {
        title: 'Gate Aktivasi',
        description: 'Proyek hanya aktif setelah persyaratan kesiapan yang berlaku diperiksa dan disetujui.'
      },
      {
        title: 'Gate Perubahan',
        description: 'Perubahan diperiksa, dicatat, dan diputuskan sesuai alasan, dampak, risiko, dan kewenangan.'
      },
      {
        title: 'Gate Pemeriksaan Akhir',
        description: 'Temuan diperiksa dan ditindaklanjuti sebelum serah terima dan penutupan.'
      }
    ],
    notice: 'Permintaan untuk kembali, melengkapi data, menunda, merujuk, atau tidak melanjutkan merupakan bagian dari pengendalian proses dan bukan jaminan bahwa setiap kebutuhan akan diterima.'
  },
  crossPhaseControls: {
    eyebrow: 'KONTROL LINTAS PROSES',
    title: 'Beberapa kontrol berjalan dari awal hingga penutupan.',
    description: 'Kedalaman setiap kontrol menyesuaikan kebutuhan, ruang lingkup, risiko, dan kesepakatan yang berlaku.',
    items: [
      {
        title: 'Ruang lingkup',
        description: 'Kebutuhan, batas pekerjaan, asumsi, dan pengecualian perlu mempunyai konteks yang jelas.'
      },
      {
        title: 'Peran dan tanggung jawab',
        description: 'Pihak yang terlibat perlu memahami fungsi, kewenangan, dan tindak lanjutnya.'
      },
      {
        title: 'Dokumentasi',
        description: 'Catatan, bukti, versi, dan keputusan diarahkan agar dapat ditelusuri.'
      },
      {
        title: 'Mutu',
        description: 'Pemeriksaan dilakukan sesuai tahap dan ruang lingkup yang berlaku.'
      },
      {
        title: 'Biaya',
        description: 'Dasar biaya, perubahan, dan dampak perlu diperiksa sebelum keputusan dibuat.'
      },
      {
        title: 'Waktu',
        description: 'Rencana dan perubahan waktu perlu mempunyai alasan serta tindak lanjut.'
      },
      {
        title: 'Risiko',
        description: 'Risiko diidentifikasi dan dipertimbangkan, bukan dijanjikan dapat dihilangkan seluruhnya.'
      },
      {
        title: 'Perubahan',
        description: 'Perubahan perlu dicatat bersama alasan, dampak, keputusan, dan persetujuan yang berlaku.'
      },
      {
        title: 'Bukti dan pelaporan',
        description: 'Informasi progres dan hasil harus berasal dari sumber yang berwenang dan mekanisme verifikasi.'
      }
    ]
  },
  changesAndIssues: {
    eyebrow: 'PERUBAHAN DAN KENDALA',
    title: 'Perubahan perlu mempunyai alasan, dampak, dan keputusan yang dapat ditelusuri.',
    description: 'Kondisi lapangan, data baru, risiko, kebutuhan pelanggan, ketersediaan sumber daya, atau temuan pemeriksaan dapat memengaruhi pekerjaan. Perubahan dan kendala tidak diperlakukan hanya sebagai percakapan terpisah tanpa catatan.',
    steps: [
      'objek perubahan atau kendala dicatat',
      'alasan dan sumber informasi dijelaskan',
      'dampak terhadap ruang lingkup, biaya, waktu, mutu, dan risiko ditinjau',
      'pihak berwenang melakukan review',
      'keputusan dan persetujuan dicatat',
      'bukti serta tindak lanjut disimpan sesuai kebutuhan'
    ],
    notice: 'Bagian ini menjelaskan prinsip tingkat tinggi dan tidak membuka SOP, formulir, nominal kewenangan, atau kontrol internal sensitif.'
  },
  boundaries: {
    eyebrow: 'BATAS INFORMASI',
    title: 'Halaman ini menjelaskan proses, bukan janji komersial atau SOP publik.',
    description: 'Rincian setiap pekerjaan mengikuti data, pemeriksaan, kemampuan, risiko, dokumen, penawaran, dan kesepakatan yang berlaku.',
    items: [
      'pengajuan kebutuhan tidak berarti proyek otomatis diterima',
      'setiap kebutuhan dapat mempunyai jalur dan kedalaman pemeriksaan yang berbeda',
      'fase dapat kembali, meminta data, ditunda, dirujuk, atau tidak dilanjutkan',
      'harga final tidak diberikan sebelum data dinilai cukup',
      'durasi, biaya, pembayaran, revisi, garansi, dan ketentuan lain tidak ditetapkan oleh halaman ini',
      'informasi progres harus berasal dari sumber yang berwenang dan telah diverifikasi',
      'platform tidak diklaim real-time, otomatis penuh, atau menjadi satu-satunya bukti keputusan',
      'SOP internal, checklist rinci, formula harga, margin, dan kontrol sensitif tidak dipublikasikan'
    ]
  },
  closing: {
    title: 'Pahami proses sebelum kebutuhan bergerak lebih jauh.',
    description: 'Anda dapat mempelajari kedudukan dan pendekatan RKK melalui Halaman Tentang. Jalur pengajuan kebutuhan akan tersedia setelah mekanisme dan informasi pendukungnya siap.',
    primaryAction: {
      label: 'Pelajari Tentang RKK',
      href: '/tentang'
    },
    secondaryAction: {
      label: 'Kembali ke Beranda',
      href: '/'
    },
    notice: 'Halaman ini tidak menerima pengajuan, tidak memberikan harga, dan tidak menjanjikan penerimaan proyek.'
  }
};
