# Module: Konsumen - RKK RumahKu Konstruksi

Role Konsumen fokus pada transparansi informasi proyek dan komunikasi dengan pihak manajemen.

## 🏗️ Fitur Utama
- **Project Monitoring**: Dashboard untuk melihat status proyek dan Progres Resmi (`verifiedProgress`).
- **Timeline**: Visualisasi terpisah antara Timeline Desain dan Timeline Konstruksi (Hardened in Batch 74).
- **Stage Communication**: Jalur diskusi dengan Admin per tahap proyek (HTTP CRUD).
- **Design Request**: Mengajukan permintaan desain baru dan memantau proses tender/revisi (Hardened in Batch 75).
- **Document Access**: Mengunduh Administrative Helper Documents yang telah dirilis oleh Admin (Batch 79).

## 🛡️ Batasan
- **Read-only Progress**: Konsumen hanya memantau progres resmi; tidak memiliki wewenang mengubah progres atau status proyek.
- **Simulation Only**: Fitur pembayaran dan pengunduhan dokumen legal masih bersifat simulasi draf lokal.
- **Non-Realtime**: Panel komunikasi tidak menggunakan WebSocket (Refresh-based/Polling).

## 📊 Technical Context
- **Services**: `customerService`, `designRequestService`, `projectService`, `projectStageService`, `projectStageCommentService`, `administrativeHelperDocumentService`.
- **UX Polish**: Transparansi timeline yang lebih jelas dengan pemisahan fase persiapan, desain, dan konstruksi.

---
*Status: Hardened — Konsumen Batch 74 & 79 (Transparency & Helper Docs).*
