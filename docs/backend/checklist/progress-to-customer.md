# Backend Checklist - Progress Proyek ke Konsumen

## Source Alur
- [docs/alur/alur-progress-proyek-ke-konsumen.md](../../alur/alur-progress-proyek-ke-konsumen.md)

## Tujuan Backend
Mengelola publikasi data progres dan dokumentasi foto yang bisa dilihat oleh Konsumen secara transparan dan jujur.

## Entity / Model
- [ ] Model `CustomerUpdate`: `id`, `projectId`, `reportId` (optional ref), `status` (published/archived), `narration`, `publishedAt`.
- [ ] Model `CustomerUpdatePhoto`: `id`, `updateId`, `imageUrl`, `caption`.

## API / Service
- [ ] `POST /api/customer-updates/publish`: Admin memilih data dari laporan Pengawas untuk dipublish.
- [ ] `GET /api/customer/projects/:id/updates`: Konsumen mengambil data progres resmi.

## Status Flow
- [ ] `not_published` -> `published_to_customer`.

## Business Rules
- [ ] **Verify-then-Publish**: Data tidak bisa dipublish jika belum diverifikasi Pengawas.
- [ ] **Honesty Principle**: Jika ada delay signifikan, data progres tetap harus mencerminkan kondisi riil (tidak boleh dimanipulasi).
- [ ] **Data Isolation**: Catatan internal Pengawas/Admin tidak boleh bocor ke tabel `CustomerUpdate`.

## Permission / Role Rules
- [ ] Hanya **Admin** yang berhak melakukan publikasi ke dashboard Konsumen.
- [ ] **Konsumen** hanya memiliki hak `Read` pada data yang berstatus `published`.

## Validation
- [ ] Narasi publik tidak boleh kosong.

## Audit Trail / History
- [ ] Catat siapa Admin yang menekan tombol publish.

## Integrasi dengan Alur Lain
- [ ] Mengambil data dari [Laporan Mingguan Pengawas](./laporan-mingguan-pengawas.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Integrasi ke WhatsApp/Email Notification ke Konsumen.
- [ ] Komentar/Interaksi dari Konsumen pada setiap update.
