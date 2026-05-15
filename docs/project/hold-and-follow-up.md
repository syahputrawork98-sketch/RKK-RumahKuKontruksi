# Hold & Follow-up - RKK RumahKu Konstruksi

Dokumen ini merangkum fitur yang ditahan, rencana perbaikan teknis, dan fitur masa depan.

## 🛑 Valid Hold (Postponed)
- **Production Infrastructure**: Auth (JWT/Password), Deployment, Cloud Storage.
- **Payment Gateway Integration**: Midtrans, Xendit, atau integrasi bank gateway rill tetap **Hold**.
- **Bank Webhook**: Verifikasi otomatis via webhook perbankan tetap **Hold**.
- **Advanced Real-time**: WebSocket / Direct Chat (Tetap menggunakan HTTP CRUD).
- **Reputation System**: Marketplace, Rating, Scoring resmi.
- **Shell Routes**: Seluruh route yang masih berstatus shell/static (e.g. Katalog Vendor) dilarang dikembangkan menjadi logic operasional tanpa persetujuan.
- **Weekly Report — Publish ke Konsumen**: Tombol publikasi laporan mingguan ke Customer-facing timeline tetap **Hold**. Fitur ini menunggu keputusan Room 00 terkait customer-visible progress update.
- **Production Procurement/Vendor/Warehouse**: Material Request Admin hanya mencakup logistik lokal. Tidak ada integrasi dengan sistem pengadaan atau pembayaran produksi.
- **Construction Request & Change Order rill**: Pengajuan konstruksi resmi dan mekanisme change order rill tetap **Hold**.
- **Global Billing & Payment Superadmin**: Fitur pembayaran tagihan sistem secara global tetap **Hold**.
- **Legal Documents Export**: Ekspor PDF/Excel resmi untuk Invoice, Kontrak, & BAST tetap **Hold**.

## 🛠️ Technical Follow-up (Pending)
- **Reporting**: Ekspor PDF/Excel untuk RAB dan Laporan (Status: **Hold/Future**).
- **Mandor Bank Accounts**: Penyimpanan rekening mandor masih di localStorage. Memerlukan model `ForemanAccount` di DB jika ingin dipersistenkan secara global.
- **Runtime Resilience**: Audit Batch 110 telah memperkuat null-safety pada alur pembayaran. Follow-up: Terus monitor regresi pada state-heavy components.
- **Construction Request & Change Order**: Mekanisme formal pengajuan konstruksi rill tetap **Hold**.
- **Build & Schema Verification**: 
  - `npm run build` (Client): **Pass** (Batch 110 sweep).
  - `npx prisma validate`: **Pass**.

## ⚠️ Remaining Risks & Follow-up
- **Payment & Progress SOT**: Pembayaran **tidak boleh** memicu perubahan progres proyek secara otomatis. Logika ini harus tetap terpisah (Manual Verification by Supervisor).
- **Persona Context Overlap**: Memerlukan audit berkala pada komponen bersama (common components) agar tidak crash saat diakses role lain (Solved for StatusBadge & EmptyStates in Batch 98/99).
- **Design Request to Project Integrity**: Bridge konversi desain memerlukan validasi metadata rill (lokasi, budget) sebelum menjadi draf proyek (Transparency added in Batch 96).

## 🌟 Future Optional
- **Analytics Dashboard v2**: Visualisasi statistik global dengan grafik interaktif (Chart.js/Recharts integration).
- **Export Engine**: Modul backend untuk men-generate dokumen resmi (PDF/Excel).

## 📜 Already Stabilized / Historical
- **Local Payment Workflow**: DB-backed customer billing & foreman eligibility. (Batch 101–110)
- **Progress Verification Core**: Sudah stabil di Batch 33, 43, & Pengawas Batch 02.
- **RAB Builder**: Sudah stabil di Batch 34, 42, & Admin Batch 68.
- **Field Issue Workflow**: Hardened in Batch 73/86. **Hard Guards** added in Batch 91.
- **Integrated Daily Monitoring**: Hardened in Batch 71, 72, & 86. **Context Polish** in Batch 92.
- **Design Request coordination**: Hardened in Batch 75, 84. **Bridge Transparency** in Batch 96.
- **Consumer Transparency Route**: Polished in Batch 74, 83. **Timeline Polish** in Batch 97.
- **Superadmin Local Governance**: Polished in Batch 76, 77, 85. **Audit Highlight** in Batch 98.
- **Administrative Docs Portal**: Polished in Batch 79, 82. **Status Guard** in Batch 91.
- **Operational Analytics v1**: Added in Batch 93.
- **Technical Debt Sweep**: Completed in Batch 99 & 110.

---

*Catatan: Terakhir diperbarui: Batch 111.*
