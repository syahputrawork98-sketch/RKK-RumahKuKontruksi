# Module: Admin - RKK RumahKu Konstruksi

Role Admin berfungsi sebagai pengelola operasional pusat dan jembatan antara kebutuhan Konsumen dengan eksekusi lapangan.

## 🏗️ Tanggung Jawab Utama
- **Project Lifecycle**: Mengelola proyek dari Planning, Activation, hingga Completion.
- **RAB Management**: Menyusun baseline RAB (Plan/Category/Item) sebagai acuan kerja.
- **Material Request Approval**: Melakukan approval akhir dan pemantauan distribusi material lokal. **Bukan production procurement.**
- **Weekly Report Review**: Meninjau laporan mingguan Pengawas secara administratif. **Tidak mengubah `verifiedProgress` (Progress SOT).**
- **Field Issue Monitoring**: Memantau kendala lapangan dan memberikan resolusi administratif (Close/Archive). **Bukan sistem ticketing produksi.**
- **Design Management**: Mengelola alur permintaan desain hingga konversi menjadi draf proyek.
- **Administrative Helper Documents**: Mengelola rilis dokumen draf administratif untuk transparansi Konsumen (Batch 79).
- **Dashboard Monitoring**: Memantau statistik operasional (proyek aktif, material pending, kendala aktif) via dashboard DB/API-backed.
- **Dashboard Monitoring**: Memantau statistik operasional (proyek aktif, material pending, kendala aktif, Daily Report aggregation) via dashboard DB/API-backed.
- **Operational Analytics v1 (Batch 93)**: Visualisasi ringkasan aktivitas harian (Daily Report & Field Issue) untuk oversight manajerial lokal.

## 🛡️ Batasan Role (Boundary)
- **Bukan Verifikator Fisik**: Admin tidak melakukan verifikasi progres fisik di lapangan; wewenang ini eksklusif milik Pengawas.
- **Progress SOT**: `Project.verifiedProgress` adalah satu-satunya progress resmi. Admin hanya memantau, tidak mengubah nilai ini.
- **Field Issue Guard**: Admin hanya dapat menutup (Close) isu setelah Pengawas menandainya sebagai Resolved (Batch 73).
- **Hold Production**: Fitur pembayaran rill, pembuatan dokumen legal resmi (kontrak/BAST), production procurement, dan marketplace masih berstatus **Hold**.
- **Operational Logs**: Monitoring Kendala Lapangan berfungsi sebagai logbook operasional untuk transparansi tim dan **tidak mengubah** Progres Resmi proyek.
- **Publish to Customer**: Tombol publikasi laporan mingguan ke Customer-facing timeline tetap **Hold**.
- **Analytics Boundary**: Data analitik bersifat simulasi operasional lokal dan tidak digunakan untuk penilaian reputasi (scoring/rating) resmi.

## 📊 Technical Context (Batch 91–100 Hardening)
- **Services**: `projectService`, `designRequestService`, `materialRequestService`, `fieldIssueService`, `supervisorWeeklyReportService`, `rabService`, `administrativeHelperDocumentService`, `governanceService`.
- **Operational Analytics**: Agregasi status harian Mandor & Pengawas ditampilkan di Dashboard utama.
- **Design Bridge**: Eligibility check diimplementasikan sebelum konversi desain ke proyek planning (Batch 96).
- **StatusBadge**: Komponen `StatusBadge.jsx` mendukung tipe `project`, `design`, `material`, `issue`, dan `stage`. Diharmonisasi pada Batch 89.
- **Data Integrity**: Backend status guards (Batch 91) menjamin validitas transisi dokumen administratif dan resolusi kendala.

## 🔑 Prinsip SOT yang Tidak Boleh Dilanggar
1. `Project.verifiedProgress` diubah **hanya** oleh Pengawas via endpoint `/projects/:id/verify-progress`.
2. Admin review Weekly Report tidak menyentuh `verifiedProgress`.
3. Material Request Admin adalah koordinasi logistik, bukan pembelian resmi.
4. Field Issue close oleh Admin tidak mengubah progress proyek.
5. Penugasan tim oleh Admin tidak mengaktifkan proyek secara otomatis.

---
*Status: Hardened — Admin Batch 61–79 (Role Integration & Operational Guardrails).*

