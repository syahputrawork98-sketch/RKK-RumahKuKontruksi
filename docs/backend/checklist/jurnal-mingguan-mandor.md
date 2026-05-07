# Backend Checklist - Jurnal Mingguan Mandor

## Source Alur
- [docs/alur/jurnal-mingguan-mandor.md](../../alur/jurnal-mingguan-mandor.md)

## Status Saat Ini
**Backend Pending**. Modul pelaporan mingguan mandor belum tersedia.

## Tujuan Backend
Menampung data aktivitas mingguan, penggunaan tenaga kerja, dan klaim progres dari Mandor sebagai bahan evaluasi Pengawas.

## Entity / Model
- [ ] Model `WeeklyJournal`: `id`, `projectId`, `foremanId`, `weekNumber`, `status`, `notes`.
- [ ] Model `JournalActivity`: `id`, `journalId`, `description`, `category`.
- [ ] Model `JournalLabor`: `id`, `journalId`, `laborType`, `count`.

## API / Service
- [ ] `POST /api/journals/foreman`: Kirim jurnal mingguan.
- [ ] `GET /api/journals/foreman/:id`: Detail jurnal.
- [ ] `PATCH /api/journals/foreman/:id/status`: Update status oleh Pengawas.

## Status Flow
- [ ] `draft` -> `submitted` -> `reviewed` -> `approved` / `revision_required`.

## Business Rules
- [ ] Mandor hanya bisa mengirim jurnal untuk proyek yang ditugaskan kepadanya.
- [ ] Jurnal mingguan menjadi syarat awal pengajuan pembayaran Mandor.

## Permission / Role Rules
- [ ] **Mandor**: Membuat dan mengedit jurnal status `draft` atau `revision_required`.
- [ ] **Pengawas**: Mereview dan mengubah status menjadi `approved` atau `revision_required`.

## Validation
- [ ] Pengiriman jurnal hanya diperbolehkan di akhir minggu pengerjaan.
- [ ] Wajib mengisi minimal satu aktivitas kerja.

## Audit Trail / History
- [ ] Catat log perubahan status dan catatan revisi dari Pengawas.

## Integrasi dengan Alur Lain
- [ ] Menjadi input bagi [Laporan Mingguan Pengawas](./laporan-mingguan-pengawas.md).
- [ ] Dasar referensi untuk [Payment Foreman](./payment-foreman.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Integrasi otomatis dengan absensi pekerja harian.
- [ ] Perhitungan otomatis produktivitas tenaga kerja.
