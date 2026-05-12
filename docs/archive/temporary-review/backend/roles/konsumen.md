# Backend Role - Konsumen

## Status
**Partial**. Entitas Pelanggan (*Customer*) sudah tersedia, namun dashboard progres proyek untuk konsumen masih bersifat *Mock-First*.

## Data Scope
- [x] Entitas Pelanggan tersedia di database.
- [ ] Boleh melihat progres resmi proyek yang sudah dipublikasikan Admin.
- [ ] Boleh melihat dokumen dan invoice terkait proyeknya sendiri.

## Entity / Model Terkait
- `Customer`, `Project`, `CustomerUpdate` (Planned), `Invoice` (Planned).

## Endpoint Terkait
- `/api/customers`
- `/api/projects` (Relasi melalui CustomerId)

## Allowed Actions
- [ ] Melihat grafik progres pembangunan secara real-time (setelah verifikasi).
- [ ] Melihat galeri foto dokumentasi yang sudah disetujui Admin.
- [ ] Melihat riwayat pembayaran dan tagihan.

## Forbidden Actions
- [ ] Melihat jurnal lapangan mentah milik Mandor.
- [ ] Melihat catatan internal antara Pengawas dan Admin.
- [ ] Mengubah data apapun terkait operasional proyek.

## Workflow Terkait
- Monitoring Progres Investasi.
- Manajemen Dokumen & Pembayaran Konsumen.

## Belum Final / Backend Pending
- Dashboard Konsumen berbasis Progres Terverifikasi.
- Modul Publikasi Progres ke Konsumen (*Progress-to-Customer*).
- Modul Tagihan & Termin.

## Catatan Sinkronisasi
Meskipun data profil pelanggan sudah ada di database, dashboard monitoring progres konsumen belum dianggap DB-backed penuh sampai alur verifikasi dari sisi Pengawas dan publikasi dari sisi Admin selesai diimplementasikan.
