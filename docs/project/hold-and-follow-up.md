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
- **Backend Hard Guards (Minor)**: 
  - **Field Issue**: Implementasi guard pada controller/repository agar status `closed` hanya diterima jika status saat ini adalah `resolved`.
  - **Helper Documents**: Implementasi strict status transition guard pada backend (draft → reviewed → released).
- **Runtime Resilience**: Audit Batch 81 telah membersihkan sebagian besar ReferenceError. Follow-up: Monitoring regresi pada state-heavy components.
- **Design Request Bridge**: Data dari Design Request telah terhubung ke draf proyek. Follow-up: Memperluas metadata yang diturunkan (lokasi, budget limit).
- **StatusBadge.jsx — Visual Monitor**: Terus pantau regresi visual pada komponen StatusBadge seiring bertambahnya status operasional baru.
- **Administrative Helper Documents**: Modul dokumen administratif draf untuk Konsumen telah dibuka. Follow-up: Implementasi versioning draf lokal sederhana.
- **Build & Schema Verification**: 
  - `npm run build` (Client): **Pass** (with minor CSS/chunk warnings).
  - `npx prisma validate`: **Pass**.

## ⚠️ Remaining Risks & Follow-up
- **Persona Context Overlap**: Memerlukan audit berkala pada komponen bersama (common components) yang menggunakan hook persona spesifik agar tidak crash saat diakses role lain.
- **Database Consistency**: Sinkronisasi draf proyek dari Design Request ke Project SOT memerlukan validasi integritas data relasional yang ketat.
- **Progress SOT Integrity**: Wajib dipastikan bahwa tidak ada bypass manual pada database yang mengubah `verifiedProgress` di luar workflow Pengawas.

## 🌟 Future Optional
- **Analytics Dashboard v2**: Visualisasi statistik global dengan grafik (Chart.js/Recharts integration).

## 📜 Already Stabilized / Historical
- **Progress Verification Core**: Sudah stabil di Batch 33, 43, & Pengawas Batch 02.
- **RAB Builder**: Sudah stabil di Batch 34, 42, & Admin Batch 68.
- **Field Issue Workflow**: Hardened in Batch 73/86 (Resolve-vs-Close).
- **Integrated Daily Monitoring**: Hardened in Batch 71, 72, & 86.
- **Design Request coordination**: Hardened in Batch 75 & 84.
- **Consumer Transparency Route**: Polished in Batch 74 & 83.
- **Superadmin Local Governance**: Polished in Batch 76, 77, & 85.
- **Administrative Docs Portal**: Polished in Batch 79 & 82.

---

*Catatan: Dokumen ini menggantikan `remaining-hold-features.md`. Terakhir diperbarui: Batch 90.*
