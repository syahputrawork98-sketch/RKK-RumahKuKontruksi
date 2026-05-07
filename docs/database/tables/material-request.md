# Material Request Tables

Status: Draft / Generated from Prisma schema

## Tujuan Domain
Mengelola siklus pengadaan material mulai dari permintaan di lapangan hingga penerimaan barang.

## Model/Tabel

### MaterialRequest / `material_requests`
**Tujuan**: Dokumen induk permintaan material.
**Relasi Utama**: Belongs to `Project`, `ProjectStage`. Inisiasi oleh `Foreman`, Verifikasi oleh `Supervisor`, Approval oleh `Admin`.
**Dipakai oleh workflow**: Pengadaan material.
**Catatan penting**: Status (`draft`, `submitted`, `verified`, `approved`, dll) mengontrol akses edit dan alur kerja.

### MaterialRequestItem / `material_request_items`
**Tujuan**: Daftar detail material yang diminta.
**Relasi Utama**: Belongs to `MaterialRequest`. Referensi ke `RabItem` (Opsional).
**Catatan penting**: Memiliki perbandingan antara `requested_qty` (permintaan awal) dan `approved_qty` (yang disetujui). Flag `is_additional_material` menandai material di luar perencanaan RAB.

### MaterialRequestHistory / `material_request_history`
**Tujuan**: Tabel audit trail untuk melacak siapa yang melakukan perubahan status pengajuan dan kapan.
**Catatan penting**: Menyimpan `old_status` dan `new_status` untuk keperluan histori audit.
