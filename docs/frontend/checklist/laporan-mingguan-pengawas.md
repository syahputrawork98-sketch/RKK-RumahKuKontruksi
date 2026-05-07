# Frontend Checklist - Laporan Mingguan Pengawas

## Source Alur
- [docs/alur/alur-laporan-mingguan-pengawas.md](../../alur/alur-laporan-mingguan-pengawas.md)

## Tujuan UI
Memungkinkan Pengawas untuk merumuskan evaluasi teknis mingguan berdasarkan data lapangan yang sudah ada.

## Pages / Routes
- [ ] `/dashboard/supervisor/reports`: Daftar laporan mingguan.
- [ ] `/dashboard/supervisor/reports/create`: Halaman buat laporan baru (dengan auto-populate).
- [ ] `/dashboard/admin/reports/review`: Halaman review laporan oleh Admin.

## Components
- [ ] `AutoPopulateSection`: Komponen yang menampilkan ringkasan otomatis dari Jurnal Mandor.
- [ ] `EvaluationForm`: Input evaluasi, kendala, dan rekomendasi teknis.
- [ ] `CustomerSummaryEditor`: Editor khusus untuk narasi yang akan tampil di dashboard konsumen.

## User Actions
- [ ] **Pengawas**: Klik "Tarik Data Jurnal", Isi evaluasi, Klik Submit Laporan.
- [ ] **Admin**: Klik "Mark as Reviewed", Edit narasi konsumen, Klik "Publish to Customer".

## UI States
- [ ] **Loading state**: Saat menarik data otomatis dari jurnal.
- [ ] **Success state**: Notifikasi laporan terkirim ke Admin.
- [ ] **Locked state**: Laporan tidak bisa diubah setelah status `reviewed`.

## Role Visibility
- [ ] Form internal notes hanya tampil untuk role **Pengawas** dan **Admin**.
- [ ] Tombol "Publish" hanya tampil untuk role **Admin**.

## Data Display
- [ ] Ringkasan Jurnal Mandor (Read-only).
- [ ] Status Laporan (draft, submitted, reviewed, published).

## Form & Validation UI
- [ ] Validasi range tanggal laporan.

## Integrasi dengan Alur Lain
- [ ] Data dari laporan ini akan menjadi sumber untuk [Progress to Customer](./progress-to-customer.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Export PDF laporan resmi.
- [ ] Komentar/Thread diskusi per laporan.
