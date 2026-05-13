# Module: Arsitek - RKK RumahKu Konstruksi

Role Arsitek bertanggung jawab atas pembuatan desain dan kolaborasi draf teknis sebelum proyek masuk ke fase konstruksi.

## 🏗️ Fitur Utama (Hardened)
- **Design Tender**: Melihat peluang desain lokal dan melakukan bid simulasi.
- **Design Workspace**: Mengelola progres desain dan koordinasi revisi dengan Konsumen (Batch 75).
- **Revision Tracker**: Memantau batas revisi (Limit: 3 Major / 5 Minor).
- **Design-to-Project Bridge**: Alur draf desain yang siap dikonversi menjadi draf proyek oleh Admin.

## 🛡️ Batasan
- **Local Simulation**: Belum terintegrasi dengan marketplace arsitek rill atau sistem pembayaran termin desain otomatis.
- **Pre-Construction Only**: Arsitek tidak terlibat dalam pengawasan konstruksi aktif kecuali sebagai referensi desain.

## 📊 Technical Context
- **Services**: `architectService`, `designRequestService`, `designTenderService`.
- **Revision Limits**: Kedisiplinan iterasi dijaga dengan batas 3 Major dan 5 Minor revisi.

---
*Status: Hardened — Arsitek Batch 75 (Design Request Coordination).*
