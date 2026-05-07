# Backend Checklist - Laporan Mingguan Pengawas

## Source Alur
- [docs/alur/alur-laporan-mingguan-pengawas.md](../../alur/alur-laporan-mingguan-pengawas.md)

## Tujuan Backend
Menghasilkan laporan evaluasi mingguan dari Pengawas kepada Admin yang merangkum aktivitas dan progres lapangan.

## Entity / Model
- [ ] Model `SupervisorWeeklyReport`: `id`, `projectId`, `supervisorId`, `weekStartDate`, `weekEndDate`, `status`, `evaluation`, `technicalIssues`, `recommendations`, `internalNotes`, `customerVisibleSummary`.

## API / Service
- [ ] `GET /api/reports/auto-populate`: Menarik data dari Jurnal Mandor yang sudah `approved` untuk periode tertentu.
- [ ] `POST /api/reports`: Membuat draf laporan.
- [ ] `PATCH /api/reports/:id/submit`: Kirim ke Admin.
- [ ] `PATCH /api/reports/:id/review`: Admin menandai laporan sebagai `reviewed`.

## Status Flow
- [ ] `draft` -> `submitted` -> `reviewed` -> `published` (ke Konsumen).

## Business Rules
- [ ] **Bukan Input Ulang**: Sistem harus mampu menarik ringkasan pekerjaan dari Jurnal Mandor secara otomatis.
- [ ] **Single Source of Truth**: Data progres di laporan harus identik dengan progres di Jurnal yang sudah diverifikasi.
- [ ] Laporan hanya bisa dibuat jika Jurnal Mandor pada minggu tersebut sudah `approved`.

## Permission / Role Rules
- [ ] **Pengawas**: Membuat dan submit laporan.
- [ ] **Admin**: Mereview dan menentukan bagian mana yang tampil ke Konsumen.

## Validation
- [ ] `weekStartDate` dan `weekEndDate` harus valid (Senin - Minggu).

## Audit Trail / History
- [ ] Log review Admin.

## Integrasi dengan Alur Lain
- [ ] Menjadi sumber narasi untuk [Progress to Customer](./progress-to-customer.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Penomoran dokumen otomatis secara serial.
- [ ] Tanda tangan digital.
