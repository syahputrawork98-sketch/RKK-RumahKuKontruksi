# Module: Pengawas - RKK RumahKu Konstruksi

Role Pengawas adalah pemegang otoritas tertinggi dalam verifikasi progres fisik dan kualitas pekerjaan di lapangan.

## 🏗️ Fitur Utama (Stabilized)
- **Dashboard Pengawas**: Monitoring status proyek diawasi secara real-time.
- **Proyek Diawasi**: Daftar hub proyek aktif dengan akses cepat ke monitoring.
- **Detail Proyek Diawasi**: Pusat kerja pengawas untuk memantau RAB, Jadwal, Tahapan, dan Logbook.
- **Progress Verification**: Mekanisme resmi untuk memperbarui `Project.verifiedProgress` (SOT).
- **Journal Review**: Review administratif (Approve/Reject/Note) terhadap jurnal Mandor.
- **Weekly Report**: Penyusunan laporan evaluasi mingguan dengan snapshot progres resmi.
- **Daily Monitoring**: Monitoring logbook harian Mandor (Tugas & Laporan) dengan fitur Supervisor Note.
- **Material Review**: Monitoring permintaan material Mandor (Read-only monitoring).
- **Field Issue Resolution**: Monitoring dan resolusi kendala lapangan.

## 🛡️ Aturan Otoritas
- **Progress SOT**: `Project.verifiedProgress` adalah satu-satunya progres resmi. Hanya form Verifikasi Progres Pengawas yang dapat mengubah angka ini.
- **Non-SOT Data**: Klaim Mandor, Laporan Mingguan, dan Daily Logbook bersifat administratif/monitoring dan **tidak mengubah** progres resmi proyek.
- **Stage Completion**: Menandai tahap selesai bersifat informatif dan tidak otomatis mengubah `verifiedProgress` total proyek.
- **Official Source**: Pengawas adalah katalis utama dalam sinkronisasi data lapangan ke sistem.

## 📊 Technical Context
- **Context**: `SupervisorPersonaContext`
- **Services**: `supervisorService`, `projectService`, `dailyReportService`, `weeklyJournalService`
- **Verification Snapshot**: `SupervisorWeeklyReport.verifiedProgressSnapshot` hanya merekam status progres saat laporan dibuat.

---
*Status: Stabilized up to Batch 04 (Monitoring Layer).*
