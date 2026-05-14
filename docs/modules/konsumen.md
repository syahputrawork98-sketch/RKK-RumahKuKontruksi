# Module: Konsumen - RKK RumahKu Konstruksi

Role Konsumen fokus pada transparansi informasi proyek dan komunikasi dengan pihak manajemen.

## 🏗️ Fitur Utama
- **Project Monitoring**: Dashboard untuk melihat status proyek dan Progres Resmi (`verifiedProgress`) tanpa fallback ambigu (Batch 94).
- **Timeline Transparency**: Diferensiasi jelas antara Timeline Desain (Arsitek) dan Timeline Konstruksi (Mandor/Pengawas) (Batch 97).
- **Stage Communication**: Jalur diskusi dengan Admin per tahap proyek. Evidence thread menampilkan empty state jika belum ada bukti kerja (Batch 97).
- **Design Request**: Mengajukan permintaan desain dan memantau status revisi hingga konversi ke proyek.
- **Document Access**: Akses dokumen administratif (Helper Docs) berbasis status `released` (Batch 97).

## 🛡️ Batasan
- **Read-only Progress**: Konsumen hanya memantau progres resmi; tidak memiliki wewenang mengubah progres atau status proyek.
- **Simulation Only**: Fitur pembayaran dan pengunduhan dokumen legal masih bersifat simulasi draf lokal.
- **Non-Realtime**: Panel komunikasi tidak menggunakan WebSocket (Refresh-based/Polling).

## 📊 Technical Context
- **Services**: `customerService`, `designRequestService`, `projectService`, `projectStageService`, `projectStageCommentService`, `administrativeHelperDocumentService`.
- **UX Polish**: Transparansi timeline yang lebih jelas dengan pemisahan fase persiapan, desain, dan konstruksi.

---
*Status: Hardened — Konsumen Batch 74 & 79 (Transparency & Helper Docs).*
