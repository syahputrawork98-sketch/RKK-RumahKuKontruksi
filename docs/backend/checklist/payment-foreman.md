# Backend Checklist - Pengajuan Pembayaran Mandor

## Source Alur
- [docs/alur/payment-foreman.md](../../alur/payment-foreman.md)

## Tujuan Backend
Mengelola alur pengajuan upah/pembayaran dari Mandor berdasarkan kategori pekerjaan yang sudah diverifikasi progresnya.

## Entity / Model
- [ ] Model `ForemanPaymentRequest`: `id`, `projectId`, `foremanId`, `category`, `progressClaimed`, `amountCalculated`, `status`, `journalRefId`.

## API / Service
- [ ] `POST /api/payments/foreman/request`: Membuat pengajuan pembayaran.
- [ ] `PATCH /api/payments/foreman/:id/admin-approve`: Admin menyetujui pembayaran (Disbursement).

## Status Flow
- [ ] `submitted` -> `under_admin_review` -> `approved_for_payment` -> `paid`.

## Business Rules
- [ ] **Single Source of Truth**: Pembayaran wajib menggunakan progres terverifikasi oleh Pengawas.
- [ ] **Dependency**: Pengajuan hanya bisa dilakukan jika Jurnal Mingguan kategori tersebut sudah `approved`.
- [ ] **Nominal Otomatis**: Backend menghitung nominal (Nilai Kategori x % Progres Terverifikasi) untuk mencegah manipulasi input.
- [ ] **Ceiling Limit**: Total pembayaran per kategori tidak boleh melebihi 100%.

## Permission / Role Rules
- [ ] **Mandor**: Melakukan pengajuan di jendela waktu yang ditentukan.
- [ ] **Admin**: Memberikan approval finansial final.

## Validation
- [ ] Cek apakah jurnal referensi sudah `approved`.
- [ ] Validasi jendela waktu pengajuan (Sabtu - Minggu).

## Audit Trail / History
- [ ] Log perubahan status pembayaran dan referensi invoice pembayaran internal.

## Integrasi dengan Alur Lain
- [ ] Membaca data dari [Jurnal Mingguan Mandor](./jurnal-mingguan-mandor.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Integrasi otomatis dengan API Bank (Transfer otomatis).
- [ ] Pemotongan pajak (PPh) otomatis.
