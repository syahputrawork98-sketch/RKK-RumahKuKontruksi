# Material Request Local Workflow

Dokumen ini mendefinisikan alur distribusi material secara lokal untuk mendukung operasional lapangan.

## Konsep Dasar
1. **Local Logistics Only**: Modul ini bukan sistem procurement, e-commerce, atau perbankan. Ini adalah alat koordinasi stok antara site dan gudang lokal.
2. **Project Status Guard**: Permintaan material hanya diperbolehkan untuk proyek dengan status **Berjalan** (Active Construction).
3. **Reference-Based**: Mandor menggunakan item RAB (RabItem) sebagai baseline referensi saat mengajukan permintaan.

## Peran & Tanggung Jawab

| Role | Tanggung Jawab |
| :--- | :--- |
| **Mandor** | Membuat pengajuan (request) & konfirmasi barang diterima (received). |
| **Pengawas** | Melakukan review teknis terhadap kewajaran jumlah material. |
| **Admin** | Memberikan persetujuan akhir (approve) & mengatur distribusi lokal. |

## Lifecycle Status
- **Diajukan**: Request baru dikirim oleh Mandor.
- **Diverifikasi**: Telah dicek oleh Pengawas.
- **Diproses**: Sedang dalam tahap pengadaan/pengiriman oleh Admin.
- **Diterima**: Barang telah sampai di site dan dikonfirmasi oleh Mandor.
- **Ditolak**: Pengajuan tidak sesuai atau melebihi kuota RAB secara tidak wajar.

## Batasan (Out of Scope)
- Tidak ada integrasi Payment Gateway atau Invoice.
- Tidak ada manajemen Warehouse/Inventory rill yang kompleks.
- Tidak ada fitur Purchase Order (PO) ke vendor eksternal.
- Tidak mengubah Progres Fisik Proyek (`verifiedProgress`).
