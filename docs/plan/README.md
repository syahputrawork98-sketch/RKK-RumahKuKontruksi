# RKK Rumahku Konstruksi — Dokumen Perencanaan

> **Status Saat Ini:** PLAN-001 — SELESAI DAN TERVERIFIKASI

Folder ini berisi plan-plan teknis yang memandu implementasi arsitektur dan pengembangan RKK.

## Daftar Plan

### [PLAN-000: Persiapan Refactor dan Baseline Implementasi RKK](./PLAN-000_PERSIAPAN_REFACTOR_DAN_BASELINE_IMPLEMENTASI_RKK.md)
- **Status:** Selesai dan Terverifikasi
- **Ruang Lingkup:** Memindahkan dokumentasi lama ke Archive Hub dan membuat fondasi `apps/web`.
- **Base SHA:** `42e97c3313cdd2888025db4e2aa8e3cc01d18e8b`
- **Audit SHA:** `e031dc50801f67901fa181e99fae8dbefe461599`
- **Hasil Eksekusi:** Menyiapkan repository bersih untuk implementasi PLAN-001.

### [PLAN-001: Fondasi UI Website Publik & Beranda RKK](./PLAN-001_FONDASI_UI_WEBSITE_PUBLIK_DAN_BERANDA_RKK.md)
- **Status:** Selesai dan Terverifikasi
- **Baseline Audit SHA:** `a0c5140ea02d04f21b20772c746aa7561ddae915`
- **Checkpoint Administratif:** `8334f6dbc053a3a2cbc165f8d29f4b2f755cd258`
- **Final Completion Audit SHA:** `365ba31ae0e231ae1f4786ac1baf198b88a6ae60`
- **Hasil:** Fondasi website publik dan Beranda telah dibangun, diperkuat melalui PLAN-001A, dan diterima dalam audit final.

### [PLAN-001A: Penguatan Konten dan Penyempurnaan Visual Beranda RKK](./PLAN-001A_PENGUATAN_KONTEN_DAN_PENYEMPURNAAN_VISUAL_BERANDA_RKK.md)
- **Status:** Implementasi Terverifikasi
- **Base SHA:** `8334f6dbc053a3a2cbc165f8d29f4b2f755cd258`
- **Implementation SHA Awal:** `975f9dd1c9f7d683b12554d452f746f2307f8f29`
- **Final Audit SHA:** `365ba31ae0e231ae1f4786ac1baf198b88a6ae60`

### [PLAN-002: Fondasi Backend RKK](./PLAN-002_FONDASI_BACKEND_RKK.md)
- **Status:** DIEKSEKUSI — PERLU REVISI
- **Catatan Implementasi:** Gemini hanya mengimplementasikan dan memvalidasi. Commit dan push dilakukan pemilik setelah hasil diperiksa. Pull Request hanya dibuat setelah audit SHA dinyatakan diterima. PLAN-002 belum dinyatakan selesai atau diterima.
- **Ruang Lingkup:** Membangun fondasi NestJS, Prisma, API `/api/v1`, dan Swagger.
- **Branch:** `refactor/plan-002-backend-foundation`
- **Base SHA:** `6a011bb98150d3492b7d24999a4eb72ba3eec174`

### [PLAN-003: Implementasi Halaman Tentang Rumahku Konstruksi](./PLAN-003_IMPLEMENTASI_HALAMAN_TENTANG_RUMAHKU_KONSTRUKSI.md)
- **Status:** SIAP AUDIT IMPLEMENTASI
- **Base SHA:** `04379b872d3b24cd4cd5d159bf0698d1f43c795a`
- **Hasil:** Halaman Tentang telah diimplementasikan lengkap beserta komponen, content layer, styling, routing, metadata, dan test tanpa menyentuh legacy client.

### [PLAN-004: Implementasi Halaman Cara Kerja Rumahku Konstruksi](./PLAN-004_IMPLEMENTASI_HALAMAN_CARA_KERJA_RUMAHKU_KONSTRUKSI.md)
- **Status:** SELESAI DIEKSEKUSI
- **Hasil:** Halaman Cara Kerja telah diimplementasikan lengkap beserta komponen sembilan fase, content layer, styling, routing, dan integrasi Beranda.

### [PLAN-005: Implementasi Halaman Daftar Layanan Rumahku Konstruksi](./PLAN-005_IMPLEMENTASI_HALAMAN_DAFTAR_LAYANAN_RUMAHKU_KONSTRUKSI.md)
- Status: SELESAI DAN TERVERIFIKASI
- Final Audit SHA: 9baecc1dde5acacb621c0f6916a10d6512b8fbc6
- Hasil: Halaman Layanan, gerbang publikasi, current-empty state, integrasi Beranda, dan navigasi publik telah diimplementasikan dan diterima.

*(Plan lain akan ditambahkan di sini setelah disetujui)*

### [PLAN-006: Implementasi Halaman Daftar Proyek Publik Rumahku Konstruksi](./PLAN-006_IMPLEMENTASI_HALAMAN_DAFTAR_PROYEK_PUBLIK_RUMAHKU_KONSTRUKSI.md)
- Status: SELESAI DAN TERVERIFIKASI
- Final Audit SHA: 872265f3a4e5b987b881b8b993b0bb00d5ef1bae
- Hasil: Halaman Daftar Proyek Publik, current-hold state, empat gerbang publikasi, resolver aman, perlindungan data, dan navigasi publik telah diimplementasikan dan diterima.

### [PLAN-007: Implementasi Halaman Detail Proyek Publik Rumahku Konstruksi](./PLAN-007_IMPLEMENTASI_HALAMAN_DETAIL_PROYEK_PUBLIK_RUMAHKU_KONSTRUKSI.md)
- Status: SELESAI DAN TERVERIFIKASI
- Final Audit SHA: bd7431d21680a4ac5b7667a6bf5b8ea8ec33bb77
- Hasil: Route Detail Proyek Publik, published-only gate, 404 publik generik, noindex, metadata dinamis, resolver aman, keamanan media, perlindungan data, dan template future-ready telah diimplementasikan dan diterima; production catalog tetap kosong.

### [PLAN-008: Normalisasi Design System dan Fondasi Visual Website Publik Rumahku Konstruksi](./PLAN-008_NORMALISASI_DESIGN_SYSTEM_DAN_FONDASI_VISUAL_WEBSITE_PUBLIK_RUMAHKU_KONSTRUKSI.md)
- Status: EKSEKUSI BERTAHAP
- Tahap aktif: PLAN-008D — Dieksekusi, Menunggu Audit
- Hasil saat ini: design token, shared component foundation, benchmark visual Beranda, dan harmonisasi visual seluruh halaman publik telah dieksekusi pada working tree.

### [PLAN-008A: Normalisasi Design Token dan CSS Foundation Website Publik Rumahku Konstruksi](./PLAN-008A_NORMALISASI_DESIGN_TOKEN_DAN_CSS_FOUNDATION_WEBSITE_PUBLIK_RUMAHKU_KONSTRUKSI.md)
- Status: SELESAI DAN TERVERIFIKASI
- Final Audit SHA: bab278229b6eadfcadac5ded33d83b0f533c64b5
- Hasil: canonical token, semantic foundation, compatibility layer sementara, focus foundation, dan automated token contract validation telah diterima.

### [PLAN-008B: Standardisasi Komponen Dasar dan Ownership CSS Website Publik Rumahku Konstruksi](./PLAN-008B_STANDARDISASI_KOMPONEN_DASAR_DAN_OWNERSHIP_CSS_WEBSITE_PUBLIK_RUMAHKU_KONSTRUKSI.md)
- Status: SELESAI DAN TERVERIFIKASI
- Final Audit SHA: 95ded3cb7134fa5da287974d0e1617b07bac6130
- Hasil: components.css menjadi owner shared CSS, enam komponen dasar distandardisasi, SectionHeading independen dari hero Beranda, HoldAction di-hardening, dan 120 test lulus.

### [PLAN-008C: Penyempurnaan Visual Beranda sebagai Acuan Harmonisasi Website Publik Rumahku Konstruksi](./PLAN-008C_PENYEMPURNAAN_VISUAL_BERANDA_SEBAGAI_ACUAN_HARMONISASI_WEBSITE_PUBLIK_RUMAHKU_KONSTRUKSI.md)
- Status: SELESAI DAN TERVERIFIKASI
- Implementation SHA Awal: c3d27eb079e37ffb361b275caceea4ba31ac98b9
- Fix-forward SHA: 8c69ef98ba9e345afccf55198c92e84f6a8acf12
- Final Audit SHA: 09d4f315d18d3843687efb6e9553c7ff351d10c6
- Hasil: Beranda menjadi benchmark visual RKK dengan foto ilustrasi berlisensi, ikon semantik, editorial layout, timeline visual, publication hold-state, CTA penutup, responsive image, scoped CSS, dan 121 test lulus.

### [PLAN-008D: Harmonisasi Visual Seluruh Halaman Publik Mengacu pada Benchmark Beranda RKK](./PLAN-008D_HARMONISASI_VISUAL_SELURUH_HALAMAN_PUBLIK_MENGACU_PADA_BENCHMARK_BERANDA_RKK.md)
- Status: DIEKSEKUSI — KOREKSI TERAKHIR MENUNGGU AUDIT
- Implementation SHA Awal: dde5857026f1c28f377a3844b7394fd83e70f828
- Fix-forward SHA 1: 266ef7f2371936b74fd25a9038d3883618044d24
- Final Correction SHA: MENUNGGU COMMIT PEMILIK
- Hasil: Halaman Tentang, Cara Kerja, Layanan, Proyek, Detail Proyek, Sign-in Unavailable, dan 404 telah diharmonisasi visualnya dengan foto berlisensi, 4 ilustrasi state SVG single-source, ikon semantik, process map dari content map, visual connector, dan test suite diperkuat (>156 test lulus).
