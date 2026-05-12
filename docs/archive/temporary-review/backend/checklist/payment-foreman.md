# Backend Checklist - Pengajuan Pembayaran Mandor

## Source Alur
- [docs/alur/payment-foreman.md](../../alur/payment-foreman.md)

## Status Saat Ini
**Backend Pending**. Alur finansial untuk upah mandor belum tersedia.

## Tujuan Backend
Mengelola alur pengajuan upah/pembayaran dari Mandor berdasarkan kategori pekerjaan yang sudah diverifikasi progresnya.

## Entity / Model
- [ ] Model `ForemanPaymentRequest`: `id`, `projectId`, `foremanId`, `category`, `progressClaimed`, `amountCalculated`, `status`, `journalRefId`.

## API / Service
- [ ] `POST /api/payments/foreman/request`: Membuat pengajuan pembayaran.
- [ ] `PATCH /api/payments/foreman/:id/admin-approve`: Approval finansial oleh Admin.

## Status Flow
- [ ] `submitted` -> `under_admin_review` -> `approved_for_payment` -> `paid`.

## Business Rules
- [ ] **Single Source of Truth**: Pembayaran wajib menggunakan progres terverifikasi oleh Pengawas. **Payment tidak membuat progres baru**.
- [ ] **Dependency**: Pengajuan hanya bisa dilakukan jika Jurnal Mingguan kategori tersebut sudah `approved`.
- [ ] **Nominal Otomatis**: Backend menghitung nominal (Nilai Kategori x % Progres Terverifikasi).

## Permission / Role Rules
- [ ] **Mandor**: Melakukan pengajuan di jendela waktu yang ditentukan.
- [ ] **Admin**: Memberikan approval finansial final.

## Validation
- [ ] Cek apakah jurnal referensi sudah `approved`.
- [ ] Validasi jendela waktu pengajuan (Sabtu - Minggu).

## Audit Trail / History
- [ ] Log perubahan status pembayaran dan referensi invoice internal.

## Integrasi dengan Alur Lain
- [ ] Membaca data dari [Jurnal Mingguan Mandor](./jurnal-mingguan-mandor.md).
- [ ] Menggunakan data progres dari [Verifikasi Progres Proyek](./project-progress.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Integrasi otomatis dengan API Bank.
- [ ] Pemotongan pajak (PPh) otomatis.
