# Module: Pengawas - RKK RumahKu Konstruksi

Role Pengawas adalah pemegang otoritas tertinggi dalam verifikasi progres fisik dan kualitas pekerjaan di lapangan.

## 🏗️ Fitur Utama (Stabilized)
- **Dashboard Pengawas**: Monitoring status proyek diawasi secara real-time.
- **Proyek Diawasi**: Daftar hub proyek aktif dengan akses cepat ke monitoring.
- **Detail Proyek Diawasi**: Pusat kerja pengawas untuk memantau RAB, Jadwal, Tahapan, dan Logbook.
- **Technical Read-only Panels**: Akses data teknis baseline (RAB Baseline, Jadwal, Gambar Kerja) untuk pengawasan akurat (Batch 78).
- **Progress Verification**: Mekanisme resmi untuk memperbarui `Project.verifiedProgress` (SOT).
- **Journal Review**: Review administratif (Approve/Reject/Note) terhadap jurnal Mandor.
- **Weekly Report**: Penyusunan laporan evaluasi mingguan dengan snapshot progres resmi.
- **Daily Monitoring**: Monitoring logbook harian Mandor (Tugas & Laporan) terintegrasi (Batch 71-72).
- **Material Review**: Monitoring permintaan material Mandor (Read-only monitoring).
- **Field Issue Resolution**: Resolusi teknis (Resolved) kendala lapangan sebelum ditutup Admin (Batch 73).

## 🛡️ Aturan Otoritas
- **Progress SOT**: `Project.verifiedProgress` adalah satu-satunya progres resmi. Hanya form Verifikasi Progres Pengawas yang dapat mengubah angka ini.
- **Technical Access**: Panel teknis bersifat Read-only untuk menjaga integritas baseline desain dari Arsitek/Admin.
- **Non-SOT Data**: Klaim Mandor, Laporan Mingguan, dan Daily Logbook bersifat administratif/monitoring dan **tidak mengubah** progres resmi proyek.
- **Supervisor Note**: Memberikan instruksi teknis langsung pada logbook harian Mandor.

## 📊 Technical Context
- **Context**: `SupervisorPersonaContext`
- **Services**: `supervisorService`, `projectService`, `dailyReportService`, `weeklyJournalService`, `projectStageService`.
- **Shared Components**: `DailyMonitoringTab` mendukung "Supervisor View" untuk review laporan harian.

---
*Status: Hardened — Pengawas Batch 00-04 + Integration Batch 71-89.*
