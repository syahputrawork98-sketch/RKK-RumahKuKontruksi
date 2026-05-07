# Backend Checklist - Publikasi Progres ke Konsumen

## Source Alur
- [docs/alur/alur-progress-proyek-ke-konsumen.md](../../alur/alur-progress-proyek-ke-konsumen.md)

## Status Saat Ini
**Backend Pending**. Mekanisme publikasi data progres ke publik/konsumen belum tersedia.

## Tujuan Backend
Menyediakan data progres resmi yang telah disaring dan dipublikasikan oleh Admin agar dapat dikonsumsi oleh dashboard Konsumen.

## Entity / Model
- [ ] Model `CustomerProjectView`: `id`, `projectId`, `publishedProgress`, `publishedAt`, `notesToCustomer`.
- [ ] Model `ProjectDocumentation`: `id`, `projectId`, `fileUrl`, `isVisibleToCustomer`.

## API / Service
- [ ] `PATCH /api/projects/:id/publish-progress`: Admin mempublikasikan progres ke konsumen.
- [ ] `GET /api/customer/project-status`: Endpoint khusus dashboard Konsumen.

## Status Flow
- [ ] `unverified` (Mandor) -> `verified` (Pengawas) -> `published` (Admin).

## Business Rules
- [ ] **Data Filtering**: Konsumen tidak boleh melihat progres mentah yang belum diverifikasi Pengawas.
- [ ] Progres yang tampil di dashboard Konsumen adalah `publishedProgress` yang ditetapkan Admin.

## Permission / Role Rules
- [ ] **Admin**: Satu-satunya role yang boleh memicu aksi `publish`.
- [ ] **Konsumen**: Hanya memiliki hak akses baca pada data yang telah dipublikasikan.

## Validation
- [ ] `publishedProgress` tidak boleh melebihi `verifiedProgress` dari Pengawas.

## Audit Trail / History
- [ ] Catat log setiap kali Admin melakukan publikasi progres baru.

## Integrasi dengan Alur Lain
- [ ] Mengambil sumber data dari [Verifikasi Progres Proyek](./project-progress.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Notifikasi otomatis (Push/WA) ke Konsumen saat progres baru dipublish.
- [ ] Fitur chat interaktif Konsumen di dalam dashboard progres.
