# F04 — Konsumen Project Tracking System

## Story
Sistem pelacakan proyek khusus untuk role Konsumen, meliputi pengajuan desain, pembayaran, hingga pemantauan progres pembangunan fisik.

## Status
- **Current Status**: Existing / Verified Frontend + API

## Scope
- Dashboard Konsumen.
- Modul *Design Request* & *Payment*.
- Pemantauan *Verified Progress*.

## Role / Modul Terkait
- Konsumen

## Alur Utama
1. Konsumen melihat status persetujuan desain.
2. Konsumen melakukan pembayaran dan melihat statusnya.
3. Konsumen melihat update SOT progres pembangunan yang disetujui Pengawas.

## Data / API / Dependency Terkait
- `Project.verifiedProgress`
- API `/api/project/konsumen`

## Status Implementasi Saat Ini
- *Existing / Partial*

## Risiko / Needs Verification
- *Partial*: Interaksi dokumen (unggah/unduh) memerlukan perbaikan struktur dan pengikatan ke cloud storage.

## Codebase Verification
- **Frontend Routes/Components**: Ditemukan komponen aktif untuk Konsumen: `Proyek` (Daftar Proyek), `TimelineProyek` (Detail/Timeline Proyek), dan navigasi ke dokumen administratif (`CustomerAdministrativeHelperDocumentsPage`).
- **API Service**: Menggunakan `projectService.js` (dengan `apiClient.get('/projects')`, `/projects/:id/stages`, `/projects/:id/rab`) serta service khusus dokumen administratif.
- **Backend Endpoints**: Modul `projects` dan `administrative-helper-documents` (meliputi *controller*, *repository*, dan *routes*) telah diimplementasikan utuh di `/server/src/modules/`.
- **Database Model**: Ditemukan model Prisma yang relevan (`Project`, `ProjectStage`, `ProjectDocument`, `AdministrativeHelperDocument`) dan penanda progres lapangan `verifiedProgress`.
- **Progress SOT Status**: Terverifikasi. Progress dirender melalui mekanisme *Single Source of Truth* yang bersandar pada persetujuan/verifikasi di tabel (menggunakan atribut `verifiedProgress` di model Project dan `isVerified` di ProjectStage).
- **Helper Docs/Timeline Status**: Tersedia antarmuka untuk struktur pekerjaan (RAB) per kategori dan arsip dokumen resmi rilis dari sisi Admin.
- **Build/Check Result**: *Pass*. Pembangunan *bundle* frontend (Vite) berjalan tanpa rintangan fatal.
- **Keputusan Status**: Tervalidasi (*Existing / Verified Frontend + API*). Fungsionalitas dasar telah menjangkau dari sisi UI konsumen hingga persimpangan database relasional.

## Next Step
- Verifikasi *codebase* untuk dashboard Konsumen.
