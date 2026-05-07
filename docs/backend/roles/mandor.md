# Backend Role - Mandor

## Status
**DB-Backed v1** untuk Profil dan Proyek aktif. Modul operasional pelaporan masih dalam tahap pengembangan.

## Data Scope
- [x] Boleh membaca data profil diri sendiri.
- [x] Boleh melihat daftar proyek yang sedang dikerjakan.
- [ ] Boleh mengirim jurnal harian/mingguan (Planned).
- [ ] Boleh mengirim permintaan material.

## Entity / Model Terkait
- `Foreman`, `Project`, `WeeklyJournal`, `MaterialRequest`.

## Endpoint Terkait
- `/api/foremen`
- `/api/foremen/:id/projects`
- `/api/projects?foremanId=:id`
- `/api/material-requests` (Experimental)

## Allowed Actions
- [x] Melihat detail proyek yang sedang dikerjakan.
- [ ] Mencatat aktivitas lapangan (Jurnal).
- [ ] Mengajukan kebutuhan material melalui sistem.
- [ ] Melaporkan kendala lapangan (Planned).

## Forbidden Actions
- [ ] Mengubah angka progres resmi (Hanya boleh klaim progres).
- [ ] Menyetujui pengajuan pembayaran sendiri.
- [ ] Melakukan pembelian material besar tanpa approval sistem.

## Workflow Terkait
- Jurnal Mingguan Mandor.
- Pengajuan Material.
- Pengajuan Pembayaran Upah.

## Belum Final / Backend Pending
- Modul Jurnal Mingguan.
- Modul Laporan/Tugas Harian.
- Alur Pengajuan Pembayaran Final.

## Catatan Sinkronisasi
Mandor saat ini dapat melihat proyek yang ditugaskan kepadanya. Seluruh aksi input operasional (jurnal/material) masih menggunakan status *Backend Pending* atau *Experimental*.
