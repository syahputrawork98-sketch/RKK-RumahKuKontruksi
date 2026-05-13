# Module: Admin - RKK RumahKu Konstruksi

Role Admin berfungsi sebagai pengelola operasional pusat dan jembatan antara kebutuhan Konsumen dengan eksekusi lapangan.

## 🏗️ Tanggung Jawab Utama
- **Project Lifecycle**: Mengelola proyek dari Planning, Activation, hingga Completion.
- **RAB Management**: Menyusun baseline RAB (Plan/Category/Item) sebagai acuan kerja.
- **Material Request Approval**: Melakukan approval akhir dan pemantauan distribusi material lokal. **Bukan production procurement.**
- **Weekly Report Review**: Meninjau laporan mingguan Pengawas secara administratif. **Tidak mengubah `verifiedProgress` (Progress SOT).**
- **Field Issue Monitoring**: Memantau kendala lapangan dan memberikan resolusi administratif (Close/Archive). **Bukan sistem ticketing produksi.**
- **Design Management**: Mengelola alur permintaan desain hingga konversi menjadi draf proyek.
- **Dashboard Monitoring**: Memantau statistik operasional (proyek aktif, material pending, kendala aktif) via dashboard DB/API-backed.

## 🛡️ Batasan Role (Boundary)
- **Bukan Verifikator Fisik**: Admin tidak melakukan verifikasi progres fisik di lapangan; wewenang ini eksklusif milik Pengawas.
- **Progress SOT**: `Project.verifiedProgress` adalah satu-satunya progress resmi. Admin hanya memantau, tidak mengubah nilai ini.
- **Weekly Report Snapshot**: Review Admin terhadap laporan Pengawas bersifat administratif. `verifiedProgressSnapshot` pada laporan adalah rekam jejak titik waktu, bukan progress resmi saat ini.
- **Hold Production**: Fitur pembayaran rill, pembuatan dokumen legal resmi (kontrak/BAST), production procurement, dan marketplace masih berstatus **Hold**.
- **Operational Logs**: Monitoring Kendala Lapangan berfungsi sebagai logbook operasional untuk transparansi tim dan **tidak mengubah** Progres Resmi proyek.
- **Publish to Customer**: Tombol publikasi laporan ke Customer-facing timeline tetap **Hold** sampai ada keputusan Room 00.

## 📊 Technical Context (Batch 61–64 Hardening)
- **Services**: `projectService`, `customerService`, `supervisorService`, `foremanService`, `architectService`, `designRequestService`, `designTenderService`, `projectStageCommentService`, `materialRequestService`, `fieldIssueService`, `supervisorWeeklyReportService`, `progressService`.
- **StatusBadge**: Komponen `StatusBadge.jsx` diperluas pada Batch 63–64 untuk mendukung tipe `material`, `issue`, dan `priority`. Perlu dipantau untuk regresi visual.
- **Bridge Boundary**: Konversi Design Request hanya menghasilkan draf proyek (`planning`) tanpa aktivasi otomatis.
- **Closeout Validation**: Penyelesaian proyek mensyaratkan progres 100%, seluruh stage selesai, dan tidak ada Material Request aktif.

## 🔑 Prinsip SOT yang Tidak Boleh Dilanggar
1. `Project.verifiedProgress` diubah **hanya** oleh Pengawas via endpoint `/projects/:id/verify-progress`.
2. Admin review Weekly Report tidak menyentuh `verifiedProgress`.
3. Material Request Admin adalah koordinasi logistik, bukan pembelian resmi.
4. Field Issue close oleh Admin tidak mengubah progress proyek.

---
*Status: Stabilized — Admin Batch 61–64 (Frontend/Client Hardening). Tidak ada perubahan backend/schema/seed.*
