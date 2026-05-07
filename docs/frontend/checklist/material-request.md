# Frontend Checklist - Pengajuan Material Mandor

## Source Alur
- [docs/alur/material-request.md](../../alur/material-request.md)

## Status Saat Ini
**Experimental / Backend Draft**. UI pengajuan sudah ada namun terhubung ke backend yang masih dalam tahap eksperimen.

## Tujuan UI
Memberikan antarmuka bagi Mandor untuk mengajukan kebutuhan barang/material proyek secara efisien.

## Pages / Routes
- [ ] `/mandor/request-material`: Halaman daftar dan form pengajuan.
- [ ] `/admin/request-material`: Halaman review logistik oleh Admin.

## Components
- [ ] `MaterialItemForm`: Input baris barang, jumlah, dan satuan.
- [ ] `UrgentToggle`: Switch untuk menandai pengajuan prioritas.
- [ ] `ApprovalChainStatus`: Visualisasi status persetujuan (Mandor -> Pengawas -> Admin).

## User Actions
- [ ] Tambah/Hapus item material.
- [ ] Pilih tipe (Normal/Urgent).
- [ ] Klik Submit.
- [ ] Klik "Barang Diterima" (Role Mandor).

## UI States
- [ ] **Experimental state**: Label peringatan bahwa alur masih dalam tahap uji coba.
- [ ] **Revision state**: Jika ada barang yang tidak disetujui atau perlu diganti.

## Role Visibility
- [ ] Tombol "Barang Diterima" hanya untuk **Mandor**.
- [ ] Tombol "Verifikasi Teknis" hanya untuk **Pengawas**.
- [ ] Tombol "Approve Pengadaan" hanya untuk **Admin**.

## Data Display
- [ ] Daftar barang & jumlah yang diminta vs yang disetujui.
- [ ] Status pengiriman barang dari gudang/supplier.

## Form & Validation UI
- [ ] Validasi: Nama barang dan jumlah wajib diisi.

## Integrasi API / Service
- [ ] `/api/material-requests`.

## Integrasi dengan Alur Lain
- [ ] Mengacu pada item material yang ada di RAB proyek.

## Tidak Dikerjakan di Fase Ini
- [ ] **Do not treat as final**: Alur UI belum dianggap produksi.
- [ ] Scan barcode saat barang sampai di lapangan.
