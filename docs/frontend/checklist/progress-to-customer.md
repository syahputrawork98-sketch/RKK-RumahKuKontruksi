# Frontend Checklist - Progress Proyek ke Konsumen

## Source Alur
- [docs/alur/alur-progress-proyek-ke-konsumen.md](../../alur/alur-progress-proyek-ke-konsumen.md)

## Tujuan UI
Menampilkan informasi kemajuan proyek secara transparan, bersih, dan mudah dipahami oleh Konsumen.

## Pages / Routes
- [ ] `/dashboard/customer/projects/:id`: Dashboard utama Konsumen.
- [ ] `/dashboard/customer/projects/:id/gallery`: Galeri foto progres.

## Components
- [ ] `ProjectProgressBar`: Visualisasi persentase progres total.
- [ ] `TimelineUpdateList`: Daftar update progres dari waktu ke waktu.
- [ ] `PublicPhotoGallery`: Grid foto-foto yang sudah dipublish Admin.
- [ ] `StatusMilestone`: Status per kategori pekerjaan (Selesai/Berjalan/Belum Mulai).

## User Actions
- [ ] **Konsumen**: Melihat progres, Scroll timeline histori, Lihat foto detail.

## UI States
- [ ] **Empty state**: Tampil jika belum ada update yang dipublish oleh Admin.
- [ ] **Loading state**: Saat memuat data timeline/galeri.
- [ ] **Error state**: Jika gagal memuat data proyek.

## Role Visibility
- [ ] Hanya data dengan status `published` yang boleh muncul di dashboard **Konsumen**.

## Data Display
- [ ] Progres Total (%).
- [ ] Narasi Update (Catatan Publik).
- [ ] Tanggal Update Terakhir.
- [ ] Foto Dokumentasi Terpilih.

## Form & Validation UI
- [ ] (Tidak ada form input untuk Konsumen di alur ini).

## Integrasi dengan Alur Lain
- [ ] Data bersumber dari [Laporan Mingguan Pengawas](./laporan-mingguan-pengawas.md) yang diproses Admin.

## Tidak Dikerjakan di Fase Ini
- [ ] Notifikasi Push/Email ke perangkat Konsumen.
- [ ] Download laporan progres versi ringkas.
