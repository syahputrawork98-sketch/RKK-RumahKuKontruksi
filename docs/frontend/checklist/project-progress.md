# Frontend Checklist - Verifikasi Progres Proyek

## Source Alur
- [docs/alur/pengawas.md](../../alur/pengawas.md)

## Tujuan UI
Memberikan antarmuka bagi Pengawas untuk mengupdate progres resmi proyek secara akurat.

## Pages / Routes
- [ ] `/dashboard/supervisor/projects/:id/verify`: Halaman update progres.

## Components
- [ ] `ProgressSlider` / `ProgressInput`: Input angka progres 0-100%.
- [ ] `VerificationNoteForm`: Form input catatan teknis verifikasi.
- [ ] `LastVerifiedInfo`: Menampilkan angka progres sebelumnya dan tanggal verifikasi terakhir.

## User Actions
- [ ] Geser slider/input angka progres.
- [ ] Tulis catatan verifikasi.
- [ ] Klik tombol "Simpan Progres Resmi".

## UI States
- [ ] **Empty state**: Jika data proyek tidak ditemukan.
- [ ] **Loading state**: Saat data progres sedang dimuat/disimpan.
- [ ] **Error state**: Jika input di luar range atau gagal koneksi server.
- [ ] **Success state**: Notifikasi berhasil update progres.
- [ ] **Locked state**: Jika proyek sudah status `closed`.

## Role Visibility
- [ ] Tombol "Update Progres" hanya tampil untuk role **Pengawas**.
- [ ] Role **Admin** hanya melihat angka (Read-only).

## Data Display
- [ ] Nama Proyek, Tahap Saat Ini.
- [ ] Angka Progres Sebelumnya vs Angka Progres Baru.

## Form & Validation UI
- [ ] Validasi input angka (0-100).
- [ ] Pesan error jika catatan verifikasi kosong.

## Integrasi dengan Alur Lain
- [ ] Perubahan progres akan tercermin di Dashboard [Progress to Customer](./progress-to-customer.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Visualisasi 3D progres bangunan.
- [ ] Upload video timelaps.
