# Module: Arsitek - RKK RumahKu Konstruksi

Role Arsitek bertanggung jawab atas pembuatan desain dan kolaborasi draf teknis sebelum proyek masuk ke fase konstruksi.

## 🏗️ Fitur Utama
- **Design Tender**: Melihat peluang desain lokal dan melakukan bid simulasi.
- **Design Workspace**: Mengelola progres desain harian dan mengunggah paket desain.
- **Revision Tracker**: Memantau batas revisi (Limit: 3 Major / 5 Minor).
- **History**: Melihat riwayat tender dan desain yang pernah dikerjakan.

## 🛡️ Batasan
- **Local Simulation**: Belum terintegrasi dengan marketplace arsitek rill atau sistem pembayaran termin desain otomatis.

## 📊 Technical Context
- **Services**: `architectService`, `designRequestService`, `designTenderService`.
- **Revision Limits**: Kedisiplinan iterasi dijaga dengan batas 3 Major dan 5 Minor revisi.
- **Design Package**: Dukungan pengunggahan paket desain melalui backend localhost (Batch 29).

---
*Status: Database-Backed v2 / Local E2E Workflow v1.*
