# RAB Tables

Status: Draft / Generated from Prisma schema

## Tujuan Domain
Menyimpan rencana anggaran biaya sebagai baseline pengerjaan fisik dan pengadaan material.

## Model/Tabel

### RabPlan / `rab_plans`
**Tujuan**: Header utama dokumen RAB per proyek.
**Relasi Utama**: Belongs to `Project`. Has many `RabCategory`.
**Dipakai oleh workflow**: Penyusunan budget, Approval budget oleh konsumen.

### RabCategory / `rab_categories`
**Tujuan**: Pengelompokan item pekerjaan (misal: Pekerjaan Pondasi, Pekerjaan Atap).
**Relasi Utama**: Belongs to `RabPlan`. Has many `RabItem`.

### RabItem / `rab_items`
**Tujuan**: Detail paling kecil dari pekerjaan konstruksi (volume, satuan, harga satuan).
**Relasi Utama**: Belongs to `RabCategory`. Referensi bagi `MaterialRequestItem`.
**Catatan penting**: Menyimpan `unit_price` dan `total`. Juga memiliki field `progress` untuk melacak penyelesaian pekerjaan di level item detail.
