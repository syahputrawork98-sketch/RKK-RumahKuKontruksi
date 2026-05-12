# Backend Role - Pengawas

## Status
**DB-Backed v1** untuk Profil dan Proyek yang ditugaskan. Modul operasional masih dalam tahap pengembangan.

## Data Scope
- [x] Boleh membaca data profil diri sendiri.
- [x] Boleh melihat daftar proyek yang ditugaskan (*Assigned Projects*).
- [ ] Boleh memverifikasi progres lapangan (Planned).
- [ ] Boleh melihat jurnal mingguan Mandor di bawah pengawasannya.

## Entity / Model Terkait
- `Supervisor`, `Project`, `WeeklyJournal`, `ProgressVerification` (Planned).

## Endpoint Terkait
- `/api/supervisors`
- `/api/projects?supervisorId=:id`
- `/api/projects/:id`
- `/api/material-requests` (Experimental)

## Allowed Actions
- [x] Melihat detail teknis proyek yang sedang diawasi.
- [ ] Melakukan verifikasi progres fisik (Planned).
- [ ] Memberikan rekomendasi teknis di lapangan.
- [ ] Melakukan review teknis terhadap pengajuan material Mandor.

## Forbidden Actions
- [ ] Menyetujui biaya tambahan atau perubahan anggaran secara mandiri.
- [ ] Mengubah RAB atau scope pekerjaan tanpa alur Change Order.
- [ ] Mempublikasikan progres ke Konsumen tanpa melalui persetujuan Admin.

## Workflow Terkait
- Verifikasi Progres Proyek.
- Review Jurnal Mandor.
- Laporan Evaluasi Mingguan.

## Belum Final / Backend Pending
- Modul Verifikasi Progres Resmi.
- Modul Laporan Mingguan Pengawas.
- Alur Persetujuan Material Final.

## Catatan Sinkronisasi
Data dasar pengawas dan penugasan proyek sudah rill dari database. Alur verifikasi progres sedang disiapkan untuk sinkronisasi dengan Jurnal Mandor.
