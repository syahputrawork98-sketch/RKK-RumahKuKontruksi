# Frontend Checklist - Pengajuan Pembayaran Mandor

## Source Alur
- [docs/alur/payment-foreman.md](../../alur/payment-foreman.md)

## Tujuan UI
Memfasilitasi Mandor untuk mengajukan tagihan berdasarkan progres pekerjaan yang sudah disetujui.

## Pages / Routes
- [ ] `/dashboard/foreman/payments/request`: Form pengajuan pembayaran baru.
- [ ] `/dashboard/foreman/payments/history`: Daftar riwayat pengajuan dan status bayar.
- [ ] `/dashboard/admin/payments/review`: Daftar pengajuan yang perlu diproses Admin.

## Components
- [ ] `PaymentCategorySelector`: Dropdown/List kategori pekerjaan.
- [ ] `AmountAutoCalculator`: Menampilkan hitungan otomatis (Nilai x Progres %).
- [ ] `JournalRefSelector`: Memilih Jurnal Mingguan `approved` sebagai referensi.
- [ ] `PaymentStatusBadge`: Status pengajuan (Submitted, Approved, Paid).

## User Actions
- [ ] **Mandor**: Pilih kategori, pilih jurnal referensi, klik Submit Pengajuan.
- [ ] **Admin**: Verifikasi data, klik "Approve for Payment".

## UI States
- [ ] **Locked state**: Tombol "Submit" disabled di luar jendela waktu Sabtu-Minggu.
- [ ] **Loading state**: Saat kalkulasi nominal atau kirim data.
- [ ] **Success state**: Konfirmasi pengajuan diterima.

## Role Visibility
- [ ] Form pengajuan hanya untuk role **Mandor**.
- [ ] Approval finansial hanya untuk role **Admin**.

## Data Display
- [ ] Nilai Kategori Total.
- [ ] Progres Terverifikasi (%).
- [ ] Nominal yang Diajukan.
- [ ] Status Pembayaran (Paid/Unpaid).

## Form & Validation UI
- [ ] Validasi: Tidak bisa submit jika jurnal referensi belum `approved`.
- [ ] Pesan "Jendela pengajuan ditutup" jika di luar jadwal.

## Integrasi dengan Alur Lain
- [ ] Membaca data progres dari [Jurnal Mingguan Mandor](./jurnal-mingguan-mandor.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Upload bukti transfer (Resi bank) manual di UI.
- [ ] Print kwitansi pembayaran.
