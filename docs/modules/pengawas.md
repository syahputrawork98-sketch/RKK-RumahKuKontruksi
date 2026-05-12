# Module: Pengawas - RKK RumahKu Konstruksi

Role Pengawas adalah pemegang otoritas tertinggi dalam verifikasi progres fisik dan kualitas pekerjaan di lapangan.

## 🏗️ Fitur Utama
- **Progress Verification**: Satu-satunya cara untuk memperbarui `Project.verifiedProgress` (Progres Resmi).
- **Journal Review**: Melakukan review administratif (Approve/Reject) terhadap jurnal Mandor.
- **Weekly Report**: Menyusun laporan evaluasi mingguan dengan snapshot progres resmi.
- **Material Review**: Memverifikasi permintaan material Mandor sebelum diteruskan ke Admin.
- **Field Issue Resolution**: Memberikan arahan teknis/solusi atas kendala yang dilaporkan Mandor.

## 🛡️ Aturan Otoritas
- **Stage Completion**: Menandai tahap selesai bersifat informatif dan tidak otomatis mengubah `verifiedProgress` total proyek.
- **Official Source**: Pengawas adalah katalis utama dalam sinkronisasi data lapangan ke sistem.
- **Operational Logs**: Kendala Lapangan (Field Issue) berfungsi sebagai logbook operasional untuk koordinasi teknis dan **tidak mengubah** Progres Resmi proyek.

## 📊 Technical Context
- **Context**: `SupervisorPersonaContext`
- **Services**: `supervisorService`, `projectService`
- **Verification Snapshot**: `SupervisorWeeklyReport.verifiedProgressSnapshot` hanya merekam status progres saat laporan dibuat.

---
*Status: Database-Backed v1.*
