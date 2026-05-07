# Backend Checklist - Pengajuan Material Mandor

## Source Alur
- [docs/alur/material-request.md](../../alur/material-request.md)

## Tujuan Backend
Mengelola permintaan kebutuhan material dari lapangan secara terstruktur untuk mengontrol penggunaan budget dan audit logistik.

## Entity / Model
- [ ] Model `MaterialRequest`: `id`, `projectId`, `foremanId`, `status`, `type` (normal/urgent), `reason`.
- [ ] Model `MaterialRequestItem`: `id`, `requestId`, `itemName`, `qtyRequested`, `qtyApproved`, `unit`, `rabItemId` (ref).

## API / Service
- [ ] `POST /api/material-requests`: Membuat pengajuan baru.
- [ ] `PATCH /api/material-requests/:id/supervisor-verify`: Verifikasi teknis oleh Pengawas.
- [ ] `PATCH /api/material-requests/:id/admin-approve`: Approval pengadaan oleh Admin.

## Status Flow
- [ ] `draft` -> `submitted` -> `approved_by_supervisor` -> `approved_by_admin` -> `processing` -> `delivered` -> `received`.

## Business Rules
- [ ] **Normal vs Urgent**: Jalur `urgent` memberikan notifikasi prioritas tinggi namun tetap memerlukan verifikasi dan audit trail.
- [ ] **Tolerance Policy**: Warning jika pengajuan > 5% dari estimasi RAB.
- [ ] **No Purchase without Approval**: Mandor dilarang mencatatkan pembelian tanpa approval sistem.

## Permission / Role Rules
- [ ] **Mandor**: Inisiator pengajuan dan konfirmator penerimaan.
- [ ] **Pengawas**: Verifikasi kesesuaian fisik lapangan.
- [ ] **Admin**: Approval finansial dan logistik.

## Validation
- [ ] Item material harus merujuk pada katalog atau RAB jika memungkinkan.

## Audit Trail / History
- [ ] Log setiap transisi status dan catatan revisi.

## Integrasi dengan Alur Lain
- [ ] Referensi ke item RAB di proyek terkait.

## Tidak Dikerjakan di Fase Ini
- [ ] Inventory management (Stok gudang pusat).
- [ ] Perbandingan harga antar supplier secara otomatis.
