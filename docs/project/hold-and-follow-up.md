# Hold & Follow-up - RKK RumahKu Konstruksi

Dokumen ini merangkum fitur yang ditahan, rencana perbaikan teknis, dan fitur masa depan.

## 🛑 Valid Hold (Postponed)
- **Production Infrastructure**: Auth (JWT/Password), Deployment, Cloud Storage, Payment Gateway.
- **Advanced Real-time**: WebSocket / Direct Chat (Tetap menggunakan HTTP CRUD).
- **Reputation System**: Marketplace, Rating, Scoring resmi.
- **Shell Routes**: Seluruh route yang masih berstatus shell/static (e.g. Katalog Vendor) dilarang dikembangkan menjadi logic operasional tanpa persetujuan.

## 🛠️ Technical Follow-up
- **Reporting**: Ekspor PDF/Excel untuk RAB dan Laporan.
- **UX Polish**: Animasi transisi, loading states premium, dan micro-interactions.
- **Data Integrity**: Audit log lanjutan dan pembersihan sisa-sisa data hardcoded/mock yang tidak perlu.

## 🌟 Future Optional
- **Catalog/Gallery**: Katalog mitra (Arsitek/Mandor) sebagai portfolio.
- **Analytics**: Dashboard statistik global untuk manajemen pusat.
- **Mobile App**: Transisi UI ke arah native/mobile-ready design.

## 📜 Already Stabilized / Historical
- **Progress Verification Core**: Sudah stabil di Batch 33, 43, & Pengawas Batch 02.
- **RAB Builder**: Sudah stabil di Batch 34 & 42.
- **Material Request Workflow**: Sudah stabil di Batch 41 & Mandor Batch 04.
- **Foreman Daily Workflow (Task/Report)**: Sudah stabil di Batch 52 & Mandor Batch 03.
- **Field Issue Workflow**: Sudah stabil di Batch 54 & Mandor Batch 04.
- **Mandor Role Polish**: Feature Complete di Batch Mandor 05.
- **Supervisor Role Monitoring**: Sudah stabil di Pengawas Batch 00-04.

## ⚠️ Remaining Risks & Follow-up
- **Payment Verification**: Pembayaran Mandor masih berstatus Read-only Lokal (Mock-backed simulation). Belum ada integrasi payment gateway.
- **Document Consistency**: Gambar Kerja dan Dokumentasi Lapangan bergantung pada konsistensi penamaan kategori dokumen oleh Admin.
- **Persona Switcher**: Memerlukan audit keamanan jika akan diimplementasikan di lingkungan produksi (saat ini hanya untuk kemudahan Local Development).
- **Mandor Hold Features**: Fitur Peluang Proyek dan Penawaran Saya tetap ditahan karena masuk dalam scope Marketplace v2.

---
*Catatan: Dokumen ini menggantikan `remaining-hold-features.md`.*
