# Hold & Follow-up - RKK RumahKu Konstruksi

Dokumen ini merangkum fitur yang ditahan, rencana perbaikan teknis, dan fitur masa depan.

## 🛑 Valid Hold (Postponed)
- **Production Infrastructure**: Auth (JWT/Password), Deployment, Cloud Storage, Payment Gateway.
- **Advanced Real-time**: WebSocket / Direct Chat (Tetap menggunakan HTTP CRUD).
- **Reputation System**: Marketplace, Rating, Scoring resmi.
- **Shell Routes**: Seluruh route yang masih berstatus shell/static (e.g. Katalog Vendor) dilarang dikembangkan menjadi logic operasional tanpa persetujuan.
- **Weekly Report — Publish ke Konsumen**: Tombol publikasi laporan mingguan ke Customer-facing timeline tetap **Hold**. Fitur ini menunggu keputusan Room 00 terkait customer-visible progress update.
- **Production Procurement/Payment/Vendor/Warehouse**: Material Request Admin hanya mencakup logistik lokal. Tidak ada integrasi dengan sistem pengadaan atau pembayaran produksi.

## 🛠️ Technical Follow-up
- **Reporting**: Ekspor PDF/Excel untuk RAB dan Laporan.
- **UX Polish**: Animasi transisi, loading states premium, dan micro-interactions.
- **Data Integrity**: Audit log lanjutan dan pembersihan sisa-sisa data hardcoded/mock yang tidak perlu.
- **Field Issue — Direct Close vs Resolve Flow**: Saat ini Admin dapat langsung menutup (closed) kendala tanpa status perantara `resolved`. Keputusan apakah perlu flow dua langkah ditunda untuk Room 00 pada batch berikutnya.
- **StatusBadge.jsx — Regresi Visual**: Perubahan StatusBadge pada Batch 63–64 (tambah tipe `material`, `issue`, `priority`) perlu dipantau agar tidak menyebabkan regresi visual di modul lain yang menggunakan komponen ini.
- **Dashboard Stats — Clickable CTA**: Kartu statistik dashboard Admin belum bersifat wajib clickable. Alert/CTA operasional sudah cukup aman untuk fase ini.

## 🌟 Future Optional
- **Catalog/Gallery**: Katalog mitra (Arsitek/Mandor) sebagai portfolio.
- **Analytics**: Dashboard statistik global untuk manajemen pusat.
- **Mobile App**: Transisi UI ke arah native/mobile-ready design.

## 📜 Already Stabilized / Historical
- **Progress Verification Core**: Sudah stabil di Batch 33, 43, & Pengawas Batch 02.
- **RAB Builder**: Sudah stabil di Batch 34 & 42.
- **Material Request Workflow**: Sudah stabil di Batch 41, Mandor Batch 04, & **Admin Batch 63** (local logistics normalization).
- **Foreman Daily Workflow (Task/Report)**: Sudah stabil di Batch 52 & Mandor Batch 03.
- **Field Issue Workflow**: Sudah stabil di Batch 54, Mandor Batch 04, & **Admin Batch 64** (monitoring/resolution normalization).
- **Mandor Role Polish**: Feature Complete di Batch Mandor 05.
- **Supervisor Role Monitoring**: Sudah stabil di Pengawas Batch 00-04.
- **Admin Dashboard & Sidebar**: Sudah stabil di **Admin Batch 61** (DB/API-backed stats, active sidebar).
- **Admin Progress SOT & Weekly Report**: Sudah stabil di **Admin Batch 62** (SOT hardening, wording audit, Hold publish).

## ⚠️ Remaining Risks & Follow-up
- **Payment Verification**: Pembayaran Mandor masih berstatus Read-only Lokal (Mock-backed simulation). Belum ada integrasi payment gateway.
- **Document Consistency**: Gambar Kerja dan Dokumentasi Lapangan bergantung pada konsistensi penamaan kategori dokumen oleh Admin.
- **Persona Switcher**: Memerlukan audit keamanan jika akan diimplementasikan di lingkungan produksi (saat ini hanya untuk kemudahan Local Development).
- **Mandor Hold Features**: Fitur Peluang Proyek dan Penawaran Saya tetap ditahan karena masuk dalam scope Marketplace v2.

---
*Catatan: Dokumen ini menggantikan `remaining-hold-features.md`. Terakhir diperbarui: Batch 65.*
