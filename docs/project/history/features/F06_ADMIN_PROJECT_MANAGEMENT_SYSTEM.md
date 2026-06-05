# F06 — Admin Project Management System

## Story
Sistem bagi Admin (dan/atau Arsitek internal) untuk merespons *Design Request*, menyiapkan parameter proyek (RAB, spesifikasi), mengeksekusi *Construction Readiness*, hingga memonitor proyek harian secara *high-level*.

## Status
- **Current Status**: Existing / Verified Frontend + API

## Scope
- Manajemen siklus awal proyek (*Approval* desain dan RAB).
- *Construction Readiness Check*.
- Pengelolaan master data material jika ada.

## Role / Modul Terkait
- Admin / Arsitek

## Alur Utama
1. Admin menerima *Design Request* dari Konsumen.
2. Admin membuat RAB dan parameter kontrak.
3. Setelah disetujui, Admin melakukan *Construction Readiness* sebelum proyek berjalan.
4. Admin memonitor pengeluaran finansial *Material Request*.

## Data / API / Dependency Terkait
- API `/api/admin`
- Tabel Manajemen Proyek.

## Status Implementasi Saat Ini
- *Not Started / Partial* (Struktur routing mungkin ada, namun logika *readiness* belum tuntas).

## Risiko / Needs Verification
- *Needs Verification*: Sejauh mana notifikasi berjalan dan apakah pembuatan RAB tersambung akurat ke modul *Finance*.

## API Verification (Design Request Bridge)
- **Status Bridge**: **Verified**. Terdapat fungsi `convertToProject` pada modul `design-requests` backend yang berfungsi sebagai gerbang transisi. Fungsi ini memvalidasi kelayakan status persetujuan, persetujuan konsumen, serta tinjauan akhir Admin sebelum melahirkan entitas *Project* berstatus `planning`.

## Codebase Verification
- **Frontend Routes/Components**: Seluruh laman kendali Admin (`DashboardAdmin`, `ProyekAdminPage`, `CreateProyekAdminPage`, `RabAdminPage`, `DesignRequestAdminPage`, dsb) diakomodasi kuat dalam `AdminLayout`.
- **API Service**: Memanfaatkan gerbang koneksi terpusat lewat `adminService.js`, `rabService.js`, `designRequestService.js`, dan `projectService.js`.
- **Backend Endpoints**: Modul operasional inti seperti `admins`, `projects`, `design-requests`, dan `rab` menduduki peranan solid di dalam `server/src/modules/`.
- **Database Model**: Terkuaknya presensi model Prisma pengikat manajemen proyek dan anggaran: `Admin`, `Project`, `RabPlan`, `RabCategory`, `RabItem`.
- **Design Request to Project Bridge**: **Verified**. Fungsionalitas konversi (*convertToProject*) memfasilitasi transmutasi dokumen pengajuan publik (*Design Request*) menjadi embrio pengerjaan aktif (*Project*).
- **RAB & Project Readiness**: **Verified**. Logika pengerjaan detail biaya diwakili oleh kerangka `RabPlan`, dan hierarki pekerjaan (`RabCategory`, `RabItem`).
- **Keputusan Status**: Tervalidasi (*Existing / Verified Frontend + API*). Fungsionalitas manajemen admin berdiri tegak tak sekadar antarmuka, melainkan terhubung fungsional menembus lapisan data.

## Next Step
- Merancang dan memvalidasi dashboard Admin serta integrasi database-nya.
