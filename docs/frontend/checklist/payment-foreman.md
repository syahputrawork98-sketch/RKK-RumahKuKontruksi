# Frontend Checklist - Pengajuan Pembayaran Mandor

## Source Alur
- [docs/alur/payment-foreman.md](../../alur/payment-foreman.md)

## Status Saat Ini
**Shell / Backend Pending**.

## Tujuan UI
Memberikan fasilitas bagi Mandor untuk mengajukan klaim upah berdasarkan capaian kerja yang telah diverifikasi.

## Pages / Routes
- [ ] `/mandor/pembayaran` (Planned): Halaman riwayat dan pengajuan upah.
- [ ] `/admin/pembayaran`: Halaman monitoring dan approval disbursement.

## Components
- [ ] `PaymentCategoryCard`: Card yang menampilkan progres verified vs jumlah yang sudah dibayarkan.
- [ ] `AmountCalculator`: Label yang menampilkan otomatis nominal (Progres x Nilai RAB).

## User Actions
- [ ] Pilih kategori pekerjaan.
- [ ] Klik "Ajukan Pembayaran Minggu Ini".

## UI States
- [ ] **Locked state**: Jika progres verified masih 0% atau jurnal belum diapprove.
- [ ] **Submitted state**: Menunggu review Admin.

## Role Visibility
- [ ] Tombol "Ajukan" hanya untuk role **Mandor**.
- [ ] Tombol "Bayar / Approve" hanya untuk role **Admin**.

## Data Display
- [ ] Nominal pengajuan, progres verified yang digunakan sebagai dasar, dan potongan (jika ada).

## Form & Validation UI
- [ ] Validasi: Pengajuan hanya bisa dilakukan pada jendela waktu Sabtu-Minggu.

## Integrasi API / Service
- [ ] `/api/payments/foreman`.

## Integrasi dengan Alur Lain
- [ ] Mengambil data progres dari [Verifikasi Progres Proyek](./project-progress.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Input data rekening bank secara dinamis (Hanya statis).
