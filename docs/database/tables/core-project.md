# Core Project Tables

Status: Draft / Generated from Prisma schema

## Tujuan Domain
Pusat relasi data konstruksi yang menghubungkan antara konsumen, admin, dan tim lapangan (Pengawas/Mandor).

## Model/Tabel

### Project / `projects`
**Tujuan**: Header utama proyek konstruksi. Menyimpan data fundamental seperti kode proyek, lokasi, anggaran, dan status global.
**Relasi Utama**:
- Belongs to `Customer`.
- Assigned to `Admin`, `Supervisor`, `Foreman`.
- Has many `ProjectStage`, `RabPlan`, `MaterialRequest`, `WeeklyJournal`, `SupervisorWeeklyReport`.
**Dipakai oleh role**: Semua role.
**Dipakai oleh workflow**: Pendaftaran proyek, Penugasan tim, Monitoring progress.
**Catatan penting**: Menyimpan snapshot progress fisik resmi di kolom `verified_progress`.

### Customer / `customers`
**Tujuan**: Data master pemilik proyek (Konsumen).
**Relasi Utama**: Has many `Project`.
**Dipakai oleh role**: Admin, Superadmin.
**Dipakai oleh workflow**: Manajemen konsumen, Penagihan.

### ProjectStage / `project_stages`
**Tujuan**: Breakdown tahapan pengerjaan proyek (milestone/minggu).
**Relasi Utama**: Belongs to `Project`.
**Dipakai oleh role**: Admin, Supervisor, Mandor.
**Dipakai oleh workflow**: Perencanaan jadwal, Verifikasi tahap pekerjaan.
**Catatan penting**: Memiliki flag `is_verified` untuk menandai apakah tahap ini sudah diaudit oleh pengawas.
