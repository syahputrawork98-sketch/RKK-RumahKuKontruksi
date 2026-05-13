# Hold & Follow-up - RKK RumahKu Konstruksi

Dokumen ini merangkum fitur yang ditahan, rencana perbaikan teknis, dan fitur masa depan.

## 🛑 Valid Hold (Postponed)
- **Production Infrastructure**: Auth (JWT/Password), Deployment, Cloud Storage, Payment Gateway.
- **Advanced Real-time**: WebSocket / Direct Chat (Tetap menggunakan HTTP CRUD).
- **Reputation System**: Marketplace, Rating, Scoring resmi.
- **Shell Routes**: Seluruh route yang masih berstatus shell/static (e.g. Katalog Vendor) dilarang dikembangkan menjadi logic operasional tanpa persetujuan.
- **Weekly Report — Publish ke Konsumen**: Tombol publikasi laporan mingguan ke Customer-facing timeline tetap **Hold**. Fitur ini menunggu keputusan Room 00 terkait customer-visible progress update.
- **Production Procurement/Payment/Vendor/Warehouse**: Material Request Admin hanya mencakup logistik lokal. Tidak ada integrasi dengan sistem pengadaan atau pembayaran produksi.
- **Construction Request & Change Order rill**: Pengajuan konstruksi resmi dan mekanisme change order rill tetap **Hold**.
- **Global Billing & Payment Superadmin**: Fitur pembayaran tagihan sistem secara global tetap **Hold**.

## 🛠️ Technical Follow-up
- **Reporting**: Ekspor PDF/Excel untuk RAB dan Laporan (Status: **Hold/Future**).
- **Runtime Resilience**: Audit menyeluruh terhadap error runtime pada komponen state-heavy pasca-integrasi Batch 71-79.
- **Null-Safety Guard**: Penguatan guard pada data relasional (e.g. project owner, stage linked items).
- **Field Issue — Resolved-before-Closed**: Workflow ini telah diimplementasikan di Batch 73. Admin hanya dapat menutup (Close) isu setelah Pengawas menandainya sebagai Resolved secara teknis.
- **Design Request Bridge**: Data dari Design Request telah terhubung ke draf proyek di Batch 75. Follow-up: Memperluas metadata yang diturunkan (lokasi, budget limit).
- **StatusBadge.jsx — Visual Monitor**: Terus pantau regresi visual pada komponen StatusBadge seiring bertambahnya status operasional baru.
- **Administrative Helper Documents**: Modul dokumen administratif draf untuk Konsumen telah dibuka di Batch 79. Follow-up: Implementasi versioning draf lokal sederhana.

## 🌟 Future Optional
- **Analytics Dashboard v2**: Visualisasi statistik global dengan grafik (Chart.js/Recharts integration).

## 📜 Already Stabilized / Historical
- **Progress Verification Core**: Sudah stabil di Batch 33, 43, & Pengawas Batch 02.
- **RAB Builder**: Sudah stabil di Batch 34, 42, & Admin Batch 68.
- **Field Issue Workflow**: Hardened in Batch 73 (Resolve-vs-Close).
- **Integrated Daily Monitoring**: Hardened in Batch 71 & 72.
- **Design Request coordination**: Hardened in Batch 75.
- **Consumer Transparency Route**: Polished in Batch 74.
- **Superadmin Local Governance**: Polished in Batch 76 & 77.
- **Administrative Docs Portal**: Polished in Batch 79.

## ⚠️ Remaining Risks & Follow-up
- **Persona Context Overlap**: Memerlukan audit pada komponen bersama (common components) yang menggunakan hook persona spesifik agar tidak crash saat diakses role lain (Solved for DailyMonitoringTab in Batch 80).
- **Database Consistency**: Sinkronisasi draf proyek dari Design Request ke Project SOT memerlukan validasi integritas data relasional yang ketat.

---

*Catatan: Dokumen ini menggantikan `remaining-hold-features.md`. Terakhir diperbarui: Batch 80.*
