# Frontend Checklist - Pengajuan Material Mandor

## Source Alur
- [docs/alur/material-request.md](../../alur/material-request.md)

## Tujuan UI
Memberikan antarmuka bagi Mandor untuk mengajukan kebutuhan barang/material proyek secara efisien.

## Pages / Routes
- [x] **Request material UI may exist**: Halaman pengajuan mungkin sudah tersedia di beberapa role dashboard.
- [ ] `/dashboard/foreman/material-requests`: Daftar pengajuan material.
- [ ] `/dashboard/foreman/material-requests/new`: Form pengajuan baru.
- [ ] `/dashboard/admin/logistics/requests`: Daftar pengajuan yang perlu diproses logistik.

## Components
- [ ] `MaterialItemForm`: Baris input nama barang, jumlah, dan satuan.
- [ ] `UrgentToggle`: Switch untuk menandai pengajuan sebagai `Urgent`.
- [ ] `RabToleranceIndicator`: Label indikator (Normal/Warning/Anomali) berdasarkan estimasi RAB.
- [ ] `DeliveryStatusTimeline`: Visualisasi status barang (Ordered -> Delivered -> Received).

## User Actions
- [ ] **Mandor**: Tambah item, pilih tipe pengajuan, klik Submit, klik "Barang Diterima".
- [ ] **Pengawas**: Klik Verifikasi Teknis.
- [ ] **Admin**: Klik Approve Budget & Pengadaan.

## UI States
- [ ] **Experimental / Backend Draft**: Tandai UI sebagai fitur eksperimental.
- [ ] **Revision state**: Jika ada catatan revisi dari Pengawas/Admin.
- [ ] **Loading state**: Saat memuat katalog material atau kirim data.
- [ ] **Success state**: Konfirmasi barang berhasil diajukan.

## Role Visibility
- [ ] Tombol "Barang Diterima" hanya untuk role **Mandor**.
- [ ] Tombol "Verifikasi" hanya untuk role **Pengawas**.
- [ ] Tombol "Approve Pengadaan" hanya untuk role **Admin**.

## Data Display
- [ ] Daftar Item & Qty.
- [ ] Status Pengiriman.
- [ ] Estimasi vs Aktual Qty.

## Form & Validation UI
- [ ] Validasi: Field `Justification` wajib diisi jika progres melebihi batas toleransi RAB.

## Integrasi dengan Alur Lain
- [ ] Mengacu pada item RAB yang didefinisikan Admin di awal proyek.

## Tidak Dikerjakan di Fase Ini
- [ ] **Do not treat as final workflow**: Alur UI belum dianggap final.
- [ ] **UI must distinguish normal vs urgent later**: Pembedaan visual jalur normal vs urgent.
- [ ] **UI must show approval chain**: Tampilan rantai persetujuan Mandor → Pengawas → Admin.
- [ ] **UI must not allow Mandor free purchase flow**: Proteksi terhadap pembelian bebas tanpa sistem.
- [ ] Integrasi dengan katalog supplier luar (E-commerce).
- [ ] Scan barcode penerimaan barang.
