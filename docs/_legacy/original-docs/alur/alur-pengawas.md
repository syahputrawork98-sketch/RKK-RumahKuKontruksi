# Alur Pengawas - RKK RumahKu Konstruksi

## 1. Status Dokumen
- Dokumen ini menjelaskan alur operasional untuk role **Pengawas** (Supervisor).
- Pengawas adalah pemegang otoritas progres resmi (Source of Truth).
- Mengacu ke [Alur Bisnis RKK](./alur-bisnis-rkk.md) sebagai alur induk.

## 2. Posisi Role dalam Sistem
- Pengawas bertindak sebagai perwakilan Admin di lapangan untuk memastikan kualitas dan ketepatan waktu.
- Menjadi verifikator atas seluruh laporan dan klaim dari Mandor.
- Bertanggung jawab mengubah angka progres fisik proyek yang akan dilihat oleh Konsumen.

## 3. Entity / Database Terkait
- **Model Utama**: `Supervisor`.
- **Manajemen Data**: `Project` (Verified Progress SOT), `WeeklyJournal` (Review), `WeeklyReport` (Create), `DailyTask` (Assign), `MaterialRequest` (Approval), `FieldIssue` (Resolution).

## 4. Fitur / Halaman / API Terkait
- **Route Frontend**: `/pengawas/dashboard`, `/pengawas/proyek`, `/pengawas/verifikasi-progres`, `/pengawas/review-jurnal`, `/pengawas/laporan-mingguan`.
- **API**: `/api/supervisors`, `/api/projects/:id/verify-progress`, `/api/weekly-reports`.

## 5. Alur Utama Role
1. **Assignment**: Ditugaskan ke proyek aktif oleh Admin.
2. **Monitoring Mandor**: Meninjau `DailyReport` dan `WeeklyJournal` dari Mandor sebagai bukti aktivitas.
3. **Verifikasi Progres**: Melakukan inspeksi site dan melakukan update pada `Project.verifiedProgress` secara manual. Ini adalah progres fisik resmi.
4. **Stage Completion**: Menandai sebuah `ProjectStage` telah selesai 100% jika seluruh kriteria terpenuhi.
5. **Issue Resolution**: Memberikan arahan atau solusi atas `FieldIssue` yang dilaporkan Mandor.
6. **Logistics Approval**: Meninjau teknis `MaterialRequest` Mandor untuk memastikan kesesuaian dengan RAB.
7. **Weekly Reporting**: Membuat `WeeklyReport` sebagai snapshot kondisi proyek mingguan untuk direview Admin.

## 6. Hubungan dengan Role Lain
- **Pengawas ↔ Mandor**: Hubungan instruksi dan pelaporan teknis harian.
- **Pengawas ↔ Admin**: Pelaporan manajerial mingguan dan koordinasi anggaran.
- **Pengawas → Konsumen**: Output verifikasi Pengawas adalah angka progres utama yang dikonsumsi oleh dashboard Konsumen.

## 7. Batasan dan Catatan Scope
- **Authority SOT**: Hanya update melalui alur Verifikasi Progres Pengawas yang dianggap sah sebagai progres proyek. Angka klaim Mandor di jurnal tidak boleh mengubah SOT secara otomatis.
- **Weekly Snapshot**: Angka progres di `WeeklyReport` adalah snapshot saat laporan dibuat, bukan pengganti SOT dinamis di database Project.

## 8. Checklist Validasi Alur
- [ ] Angka `verifiedProgress` di database berubah hanya setelah aksi verifikasi Pengawas.
- [ ] Pengawas dapat melihat daftar jurnal Mandor yang butuh direview.
- [ ] Laporan mingguan tersimpan dengan metadata snapshot progres yang benar.

---
*Terakhir diperbarui: Batch Alur Per Role 01.*
