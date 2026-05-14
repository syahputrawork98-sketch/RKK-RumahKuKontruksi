# Module: Pengawas - RKK RumahKu Konstruksi

Role Pengawas adalah pemegang otoritas tertinggi dalam verifikasi progres fisik dan kualitas pekerjaan di lapangan.

## 🏗️ Fitur Utama (Stabilized)
- **Dashboard Pengawas**: Monitoring status proyek diawasi secara real-time.
- **Proyek Diawasi**: Daftar hub proyek aktif dengan akses cepat ke monitoring.
- **Detail Proyek Diawasi**: Pusat kerja pengawas untuk memantau RAB, Jadwal, Tahapan, dan Logbook.
- **Technical Read-only Panels**: Akses data teknis baseline (RAB Baseline, Jadwal, Gambar Kerja) untuk pengawasan akurat (Batch 78).
- **Progress Verification**: Mekanisme resmi (SSOT) untuk memperbarui `Project.verifiedProgress`. Tampilan progres diselaraskan di seluruh frontend (Batch 94).
- **Journal Review**: Review administratif terhadap jurnal Mandor tanpa mengubah progres resmi.
- **Weekly Report**: Penyusunan laporan mingguan dengan snapshot `verifiedProgress`.
- **Daily Monitoring**: Monitoring logbook harian Mandor (Tugas & Laporan) dengan konteks proyek yang lebih jelas (Batch 92).
- **Material Review**: Monitoring permintaan material Mandor (Read-only monitoring).
- **Field Issue Resolution**: Resolusi teknis (Resolved) dengan backend status guard (Batch 91).

## 🛡️ Aturan Otoritas
- **Progress SOT (SSOT)**: `Project.verifiedProgress` adalah satu-satunya progres resmi. Frontend wajib merujuk ke field ini tanpa fallback ambigu (Batch 94).
- **Technical Access**: Panel teknis bersifat Read-only untuk menjaga integritas baseline desain dari Arsitek/Admin.
- **Non-SOT Data**: Klaim Mandor, Laporan Mingguan, dan Daily Logbook bersifat administratif/monitoring dan **tidak mengubah** progres resmi proyek.
- **Supervisor Note**: Memberikan instruksi teknis langsung pada logbook harian Mandor.

## 📊 Technical Context
- **Context**: `SupervisorPersonaContext`
- **Services**: `supervisorService`, `projectService`, `dailyReportService`, `weeklyJournalService`, `projectStageService`.
- **Shared Components**: `DailyMonitoringTab` mendukung "Supervisor View" untuk review laporan harian.

---
*Status: Hardened — Pengawas Batch 00-04 + Integration Batch 71-89.*
