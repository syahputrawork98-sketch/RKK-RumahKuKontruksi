# Frontend Checklist - Verifikasi Progres Proyek

## Source Alur
- [docs/alur/pengawas.md](../../alur/pengawas.md)

## Status Saat Ini
**Experimental / Backend Pending**. UI shell sudah ada namun belum terhubung ke API verifikasi rill.

## Tujuan UI
Memberikan antarmuka bagi Pengawas untuk mengupdate progres resmi proyek secara akurat.

## Pages / Routes
- [ ] `/pengawas/verifikasi-progres`: Daftar proyek yang perlu diverifikasi.
- [ ] `/pengawas/verifikasi-progres/:id`: Form update progres resmi.

## Components
- [ ] `ProgressSlider` / `ProgressInput`: Input angka progres 0-100%.
- [ ] `VerificationNoteForm`: Form input catatan teknis verifikasi.
- [ ] `LastVerifiedInfo`: Menampilkan angka progres sebelumnya dan tanggal verifikasi terakhir.

## User Actions
- [ ] Geser slider atau input angka progres.
- [ ] Tulis catatan verifikasi teknis.
- [ ] Klik tombol "Simpan Progres Resmi".

## UI States
- [ ] **Empty state**: Jika tidak ada proyek yang perlu diverifikasi.
- [ ] **Loading state**: Saat data sedang dimuat atau disimpan ke server.
- [ ] **Error state**: Jika input di luar range (0-100) atau gagal simpan.
- [ ] **Success state**: Notifikasi berhasil memperbarui progres resmi.
- [ ] **Locked state**: Jika proyek sudah status `closed`.

## Role Visibility
- [ ] Tombol "Update Progres" hanya tampil untuk role **Pengawas**.
- [ ] Role **Admin** hanya melihat angka (Read-only).

## Data Display
- [ ] Nama Proyek, Tahap Saat Ini, dan Persentase RAB.
- [ ] Perbandingan progres klaim Mandor vs Progres resmi sebelumnya.

## Form & Validation UI
- [ ] Validasi client: Input angka harus numerik 0-100.
- [ ] Validasi client: Catatan verifikasi minimal 10 karakter.

## Integrasi API / Service
- [ ] `PATCH /api/projects/:id/verify-progress`.

## Integrasi dengan Alur Lain
- [ ] Mempengaruhi tampilan [Progress to Customer](./progress-to-customer.md).
- [ ] Mempengaruhi nominal di [Payment Foreman](./payment-foreman.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Fitur upload foto bukti verifikasi langsung di form (Gunakan modul dokumentasi).
- [ ] Multi-approval verifikasi.
