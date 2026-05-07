# Supervisor Weekly Report Tables

Status: Draft / Generated from Prisma schema

## Tujuan Domain
Laporan evaluasi mingguan dari Pengawas yang merangkum aktivitas dan memberikan catatan kualitas/safety.

## Model/Tabel

### SupervisorWeeklyReport / `supervisor_weekly_reports`
**Tujuan**: Header laporan mingguan pengawas.
**Relasi Utama**: Belongs to `Project`, `Supervisor`. Di-review oleh `Admin` (ID dicatat di `reviewed_by_admin_id`).
**Catatan penting**: Menyimpan rangkuman manajerial dalam kolom `summary`, `quality_notes`, `safety_notes`, dan `blocker_notes`. `reviewed_by_admin_id` adalah **Reference Field** (String ID).

### SupervisorWeeklyReportJournal / `supervisor_weekly_report_journals`
**Tujuan**: Tabel junction untuk menghubungkan laporan dengan satu atau lebih jurnal mandor.

### SupervisorWeeklyReportNote / `supervisor_weekly_report_notes`
**Tujuan**: Catatan temuan spesifik di lapangan yang dikategorikan berdasarkan tipe (Quality/Safety/Blocker) dan level keparahan (*severity*).

### SupervisorWeeklyReportReviewLog / `supervisor_weekly_report_review_logs`
**Tujuan**: Histori interaksi review antara Admin dan Pengawas terhadap isi laporan.
