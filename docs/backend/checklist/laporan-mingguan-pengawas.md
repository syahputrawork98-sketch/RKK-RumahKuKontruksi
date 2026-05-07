# Backend Checklist - Laporan Mingguan Pengawas

## Source Alur
- [docs/alur/alur-laporan-mingguan-pengawas.md](../../alur/alur-laporan-mingguan-pengawas.md)

## Status Saat Ini
**Backend Pending**. Modul evaluasi mingguan pengawas belum tersedia.

## Tujuan Backend
Menghasilkan laporan resmi mingguan dari Pengawas kepada Admin yang merangkum progres verified, kendala, dan evaluasi performa Mandor.

## Entity / Model
- [ ] Model `SupervisorWeeklyReport`: `id`, `projectId`, `supervisorId`, `weekNumber`, `overallProgress`, `evaluation`, `recommendation`.
- [ ] Relasi ke `ProgressVerificationLog` pada minggu terkait.

## API / Service
- [ ] `POST /api/reports/supervisor`: Membuat laporan mingguan.
- [ ] `GET /api/reports/supervisor/project/:projectId`: Riwayat laporan per proyek.

## Status Flow
- [ ] `submitted` -> `reviewed_by_admin`.

## Business Rules
- [ ] **Data Consistency**: Laporan harus merangkum data progres yang sudah diverifikasi (Verified Progress).
- [ ] Pengawas wajib memberikan rating/evaluasi terhadap kualitas pengerjaan Mandor minggu tersebut.

## Permission / Role Rules
- [ ] **Pengawas**: Inisiator laporan.
- [ ] **Admin**: Viewer dan reviewer laporan untuk kepentingan manajemen.

## Validation
- [ ] Laporan hanya bisa dibuat jika sudah ada verifikasi progres di minggu terkait.

## Audit Trail / History
- [ ] Simpan versi laporan jika terjadi koreksi data teknis.

## Integrasi dengan Alur Lain
- [ ] Menggunakan data dari [Verifikasi Progres Proyek](./project-progress.md).
- [ ] Menjadi bahan pertimbangan Admin untuk [Progress to Customer](./progress-to-customer.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Generasi otomatis file PDF laporan resmi.
- [ ] Distribusi otomatis laporan ke email pemangku kepentingan.
