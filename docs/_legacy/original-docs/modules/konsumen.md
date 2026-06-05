# Module: Konsumen - RKK RumahKu Konstruksi

Role Konsumen fokus pada transparansi informasi proyek dan komunikasi dengan pihak manajemen.

## 🏗️ Fitur Utama
- **Project Monitoring**: Dashboard untuk melihat status proyek dan Progres Resmi (`verifiedProgress`) tanpa fallback ambigu (Batch 94).
- **Timeline Transparency**: Diferensiasi jelas antara Timeline Desain (Arsitek) dan Timeline Konstruksi (Mandor/Pengawas) (Batch 97).
- **Stage Communication**: Jalur diskusi dengan Admin per tahap proyek. Evidence thread menampilkan empty state jika belum ada bukti kerja (Batch 97).
- **Design Request**: Mengajukan permintaan desain dan memantau status revisi hingga konversi ke proyek.
- **Document Access**: Akses dokumen administratif (Helper Docs) berbasis status `released` (Batch 97).
- **Payment Monitoring (Batch 107–110)**:
  - Melihat tagihan aktif berdasarkan `CustomerPaymentPlan` rill.
  - Mengunggah bukti bayar (`ProjectDocument`) untuk divalidasi admin.
  - Memantau riwayat pembayaran melalui `PaymentRecord`.

## 🛡️ Batasan
- **Read-only Progress**: Konsumen hanya memantau progres resmi; tidak memiliki wewenang mengubah progres atau status proyek.
- **Local Workflow Only**: Pembayaran dilakukan via transfer manual ke rekening admin; sistem tidak terhubung ke gateway pembayaran rill.
- **Simulation Only**: Fitur pengunduhan dokumen legal (PDF) masih bersifat draf lokal (Hold).
- **Non-Realtime**: Panel komunikasi tidak menggunakan WebSocket (Refresh-based/Polling).

## 📊 Technical Context (Batch 107–110 Persistence)
- **Services**: `customerService`, `paymentService`, `projectDocumentService`, `administrativeHelperDocumentService`, `projectService`.
- **UX Polish**: Transparansi tagihan rill yang terhubung dengan rencana bayar proyek.
- **Status Mapping**: Konsumen melihat status `sent`, `paid`, `verified`, dan `rejected` pada alur pembayaran.

---
*Status: Hardened — Konsumen Batch 111 (Payment Persistence & Transparency).*
