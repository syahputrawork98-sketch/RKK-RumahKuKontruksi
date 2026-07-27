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

*(Plan lain akan ditambahkan di sini setelah disetujui)*
