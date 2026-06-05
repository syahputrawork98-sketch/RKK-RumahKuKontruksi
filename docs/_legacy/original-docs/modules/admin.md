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
- **Payment Center (Batch 101–110)**:
  - **Tagihan Konsumen**: Mengelola rencana bayar (`CustomerPaymentPlan`) dan merilis draf invoice (`AdministrativeHelperDocument`).
  - **Pembayaran Konsumen**: Memverifikasi bukti bayar yang diunggah konsumen dan memperbarui status di `PaymentRecord`.
  - **Pengajuan Mandor**: Meninjau kelayakan bayar mandor (`ForemanWeeklyPaymentEligibility`) berdasarkan review pengawas.
  - **Pembayaran Mandor**: Melakukan simulasi pencairan dana (`paid_simulated`) yang secara otomatis mencatat `PaymentRecord` (FOREMAN_PAYMENT).
- **Dashboard Monitoring**: Memantau statistik operasional (proyek aktif, material pending, kendala aktif, Daily Report aggregation) via dashboard DB/API-backed.
- **Operational Analytics v1 (Batch 93)**: Visualisasi ringkasan aktivitas harian (Daily Report & Field Issue) untuk oversight manajerial lokal.

## 🛡️ Batasan Role (Boundary)
- **Bukan Verifikator Fisik**: Admin tidak melakukan verifikasi progres fisik di lapangan; wewenang ini eksklusif milik Pengawas.
- **Progress SOT**: `Project.verifiedProgress` adalah satu-satunya progress resmi. Pembayaran atau review laporan tidak mengubah nilai ini secara otomatis.
- **Field Issue Guard**: Admin hanya dapat menutup (Close) isu setelah Pengawas menandainya sebagai Resolved (Batch 73).
- **Hold Production**: Fitur pembayaran rill (Gateway), pembuatan dokumen legal resmi (PDF Kontrak/BAST/Invoice), production procurement, dan marketplace masih berstatus **Hold**.
- **Operational Logs**: Monitoring Kendala Lapangan berfungsi sebagai logbook operasional untuk transparansi tim dan **tidak mengubah** Progres Resmi proyek.
- **Publish to Customer**: Tombol publikasi laporan mingguan ke Customer-facing timeline tetap **Hold**.

## 📊 Technical Context (Batch 101–110 Payment Hardening)
- **Services**: `projectService`, `paymentService`, `foremanPaymentEligibilityService`, `administrativeHelperDocumentService`, `projectDocumentService`, `fieldIssueService`, `rabService`.
- **Payment Mapping**: Admin mengelola transisi status `paid` -> `verified` / `rejected` untuk konsumen, dan `eligible` -> `paid_simulated` untuk mandor.
- **Invoice Draft**: Menggunakan `AdministrativeHelperDocument` dengan `type: 'INVOICE'` sebagai penampung metadata draf penagihan.
- **Operational Analytics**: Agregasi status harian Mandor & Pengawas ditampilkan di Dashboard utama.

## 🔑 Prinsip SOT yang Tidak Boleh Dilanggar
1. `Project.verifiedProgress` diubah **hanya** oleh Pengawas via endpoint `/projects/:id/verify-progress`.
2. Admin review pembayaran atau laporan tidak menyentuh `verifiedProgress`.
3. Material Request Admin adalah koordinasi logistik, bukan pembelian resmi.
4. Field Issue close oleh Admin tidak mengubah progress proyek.

---
*Status: Hardened — Admin Batch 111 (Payment Center & Operational Hardening).*

