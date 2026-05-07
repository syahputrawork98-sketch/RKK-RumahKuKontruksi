# Backend Checklist - Jurnal Mingguan Mandor

## Source Alur
- [docs/alur/jurnal-mingguan-mandor.md](../../alur/jurnal-mingguan-mandor.md)

## Tujuan Backend
Mengelola catatan aktivitas mingguan dari Mandor sebagai bukti pengerjaan fisik dan klaim progres awal.

## Entity / Model
- [ ] Model `WeeklyJournal`: `id`, `projectId`, `foremanId`, `weekStartDate`, `weekEndDate`, `status`, `mandorProgressClaim`, `supervisorVerifiedProgress`, `notes`.
- [ ] Model `JournalEntry`: `id`, `journalId`, `date`, `description`, `workerCount`, `materialNotes`.
- [ ] Model `JournalPhoto`: `id`, `journalEntryId`, `imageUrl`, `caption`.

## API / Service
- [ ] `POST /api/journals`: Membuat draf jurnal baru.
- [ ] `POST /api/journals/:id/entries`: Menambah catatan harian ke dalam jurnal mingguan.
- [ ] `PATCH /api/journals/:id/submit`: Mengirim jurnal ke Pengawas.
- [ ] `PATCH /api/journals/:id/review`: Approve/Revision/Reject oleh Pengawas.

## Status Flow
- [ ] `draft` -> `submitted` -> `under_review` -> `approved` / `revision_requested` / `rejected`.
- [ ] `approved` -> `locked` (setelah digunakan untuk pembayaran).

## Business Rules
- [ ] **Klaim Mandor vs Verifikasi**: `mandorProgressClaim` bukan progres resmi proyek.
- [ ] **Deadline**: Submit maksimal Jumat pukul 12.00 (Business Rule).
- [ ] **Locking**: Jurnal tidak bisa diedit jika status `submitted`, `approved`, atau `locked`.

## Permission / Role Rules
- [ ] **Mandor**: Hanya bisa melihat/mengelola jurnal milik proyeknya sendiri.
- [ ] **Pengawas**: Hanya bisa mereview jurnal proyek yang dia awasi.

## Validation
- [ ] Minimal 1 foto per entry jurnal.
- [ ] Range tanggal jurnal harus dalam periode proyek aktif.

## Audit Trail / History
- [ ] History status jurnal: Siapa yang mengubah status dan kapan.

## Integrasi dengan Alur Lain
- [ ] Jurnal `approved` menjadi syarat untuk [Payment Foreman](./payment-foreman.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Kompresi gambar otomatis di sisi server.
- [ ] Export jurnal ke PDF.
