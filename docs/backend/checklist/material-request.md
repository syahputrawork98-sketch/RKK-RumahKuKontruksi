# Backend Checklist - Pengajuan Material Mandor

## Source Alur
- [docs/alur/material-request.md](../../alur/material-request.md)

## Status Saat Ini
**Experimental Backend Draft**. Endpoint dan model dasar sudah tersedia, namun alur approval dan RBAC belum final.

## Tujuan Backend
Mengelola permintaan kebutuhan material dari lapangan secara terstruktur untuk mengontrol penggunaan budget dan audit logistik.

## Entity / Model
- [x] Model `MaterialRequest`: `id`, `projectId`, `foremanId`, `status`, `type` (normal/urgent), `reason`.
- [x] Model `MaterialRequestItem`: `id`, `requestId`, `itemName`, `qtyRequested`, `qtyApproved`, `unit`, `rabItemId` (ref).
- [x] Model `MaterialRequestHistory`: Audit trail status.

## API / Service
- [x] `POST /api/material-requests`: Membuat pengajuan baru.
- [ ] `PATCH /api/material-requests/:id/supervisor-verify`: Verifikasi teknis oleh Pengawas (Not final).
- [ ] `PATCH /api/material-requests/:id/admin-approve`: Approval pengadaan oleh Admin (Not final).

## Status Flow
- [ ] `draft` -> `submitted` -> `approved_by_supervisor` -> `approved_by_admin` -> `processing` -> `delivered` -> `received`.

## Business Rules
- [ ] **Normal vs Urgent flow not final**: Logika prioritas belum sepenuhnya dikunci.
- [ ] **Tolerance Policy**: Warning jika pengajuan > 5% dari estimasi RAB.
- [ ] **No Purchase without Approval**: Mandor dilarang mencatatkan pembelian tanpa approval sistem.

## Permission / Role Rules
- [ ] **Role validation not final**: Pengecekan izin akses rill belum diperketat.
- [ ] **Status transition enforcement not final**: Aturan perpindahan status belum dikunci.

## Validation
- [ ] Item material harus merujuk pada katalog atau RAB jika memungkinkan.

## Audit Trail / History
- [x] Log setiap transisi status dan catatan revisi (Drafting).

## Integrasi dengan Alur Lain
- [ ] Referensi ke item RAB di proyek terkait.

## Tidak Dikerjakan di Fase Ini
- [ ] **Not production-ready yet**: Masih bersifat eksperimental.
- [ ] Inventory management (Stok gudang pusat).
- [ ] Perbandingan harga antar supplier secara otomatis.
