# Hold & Follow-up - RKK RumahKu Konstruksi

Dokumen ini merangkum fitur yang ditahan, rencana perbaikan teknis, dan fitur masa depan.

## 🛑 Valid Hold (Postponed)
- **Production Infrastructure**: Auth (JWT/Password), Deployment, Cloud Storage, Payment Gateway.
- **Advanced Real-time**: WebSocket / Direct Chat (Tetap menggunakan HTTP CRUD).
- **Reputation System**: Marketplace, Rating, Scoring resmi.
- **Shell Routes**: Seluruh route yang masih berstatus shell/static (e.g. Katalog Vendor) dilarang dikembangkan menjadi logic operasional tanpa persetujuan.
- **Weekly Report — Publish ke Konsumen**: Tombol publikasi laporan mingguan ke Customer-facing timeline tetap **Hold**. Fitur ini menunggu keputusan Room 00 terkait customer-visible progress update.
- **Production Procurement/Payment/Vendor/Warehouse**: Material Request Admin hanya mencakup logistik lokal. Tidak ada integrasi dengan sistem pengadaan atau pembayaran produksi.
- **Construction Request & Change Order**: Pengajuan konstruksi resmi, validasi pengajuan, dan mekanisme change order rill tetap **Hold**.

## 🛠️ Technical Follow-up
- **Reporting**: Ekspor PDF/Excel untuk RAB dan Laporan (Status: **Hold/Future**).
- **UX Polish**: Animasi transisi, loading states premium, dan micro-interactions pada Dashboard Summary.
- **Fetch Optimization**: Beberapa pattern fetching di Dashboard & Project Detail dapat dioptimalkan lebih lanjut menggunakan `Promise.allSettled` untuk meningkatkan resilience UI.
- **Field Issue — Direct Close vs Resolve Flow**: Admin saat ini dapat langsung menutup (closed) kendala. Follow-up: Perlu keputusan apakah ingin mewajibkan status `resolved` sebelum `closed` untuk flow audit yang lebih ketat.
- **Admin Assignment Guard**: Pada `PenugasanTimAdminPage`, penugasan diri sendiri oleh Admin perlu guard tambahan jika di masa depan authority diperketat (Authority Boundary).
- **Design Request Bridge**: Konversi ke proyek saat ini menghasilkan draf minimal. Follow-up: Memastikan data yang kurang (lokasi detail, spesifikasi teknis) dilengkapi di `Detail Proyek` setelah konversi.
- **StatusBadge.jsx — Visual Monitor**: Monitor regresi visual pada komponen StatusBadge setelah penambahan tipe `material`, `issue`, dan `priority`.

## 🌟 Future Optional
- **Analytics Dashboard v2**: Visualisasi statistik global dengan grafik (Chart.js/Recharts integration).

## 📜 Already Stabilized / Historical
- **Progress Verification Core**: Sudah stabil di Batch 33, 43, & Pengawas Batch 02.
- **RAB Builder**: Sudah stabil di Batch 34, 42, & **Admin Batch 68**.
- **Material Request Workflow**: Sudah stabil di Batch 41, Mandor Batch 04, & **Admin Batch 63**.
- **Field Issue Workflow**: Sudah stabil di Batch 54, Mandor Batch 04, & **Admin Batch 64**.
- **Mandor Role Polish**: Feature Complete di Batch Mandor 05.
- **Supervisor Role Monitoring**: Sudah stabil di Pengawas Batch 00-04.
- **Admin Role Stabilization (Batch 61–70)**: 
  - Batch 61: Dashboard & Sidebar Normalization.
  - Batch 62: Progress SOT & Weekly Report Hardening.
  - Batch 66: Project Lifecycle Stabilization.
  - Batch 67: Team Assignment Boundary.
  - Batch 69: Customer & Design Request Stabilization.

## ⚠️ Remaining Risks & Follow-up
- **Persona Switcher**: Memerlukan audit keamanan jika akan diimplementasikan di lingkungan produksi (saat ini hanya untuk kemudahan Local Development).
- **Database Consistency**: Sinkronisasi draf proyek dari Design Request ke Project SOT memerlukan validasi integritas data relasional yang ketat.

---

*Catatan: Dokumen ini menggantikan `remaining-hold-features.md`. Terakhir diperbarui: Batch 70.*

