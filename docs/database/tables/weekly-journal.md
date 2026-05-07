# Weekly Journal Tables

Status: Draft / Generated from Prisma schema

## Tujuan Domain
Dokumentasi aktivitas harian/mingguan yang dilakukan oleh Mandor di lapangan.

## Model/Tabel

### WeeklyJournal / `weekly_journals`
**Tujuan**: Header jurnal mingguan mandor per proyek.
**Relasi Utama**: Belongs to `Project`, `Foreman`. Di-review oleh `Supervisor` (ID dicatat di `reviewed_by_id`).
**Catatan penting**: Field `claimed_progress` adalah angka estimasi sepihak dari Mandor. `verified_progress_snapshot` adalah angka progress resmi yang diakui setelah review. `reviewed_by_id` adalah **Reference Field** (String ID).

### WeeklyJournalActivity / `weekly_journal_activities`
**Tujuan**: Detail baris pekerjaan yang dilakukan.
**Relasi Utama**: Belongs to `WeeklyJournal`. Opsional merujuk ke `rab_item_id` atau `project_stage_id`.

### WeeklyJournalPhoto / `weekly_journal_photos`
**Tujuan**: Galeri bukti foto kegiatan lapangan.
**Relasi Utama**: Terikat ke `WeeklyJournal` atau `WeeklyJournalActivity`.

### WeeklyJournalReviewLog / `weekly_journal_review_logs`
**Tujuan**: Histori interaksi review (Approve/Revisi) antara Pengawas dan Mandor.
