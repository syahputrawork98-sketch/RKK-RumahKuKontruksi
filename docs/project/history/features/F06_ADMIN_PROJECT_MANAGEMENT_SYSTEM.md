# F06 — Admin Project Management System

## Story
Sistem bagi Admin (dan/atau Arsitek internal) untuk merespons *Design Request*, menyiapkan parameter proyek (RAB, spesifikasi), mengeksekusi *Construction Readiness*, hingga memonitor proyek harian secara *high-level*.

## Status
- **Current Status**: Not Started / Partial

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

## Next Step
- Merancang dan memvalidasi dashboard Admin serta integrasi database-nya.
