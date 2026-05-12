# Backend Checklist - Pengajuan Material Mandor

## Source Alur
- [docs/alur/material-request.md](../../alur/material-request.md)

## Status Saat Ini
**Local E2E Workflow v1 / UI Consistency Stabilized**. Endpoint, model, status transition lokal, dan UI lintas Mandor/Pengawas/Admin/Superadmin sudah berjalan untuk fase *Local Development CRUD Integration*. Ini bukan procurement/warehouse/payment production dan belum memakai RBAC/auth production.

## Tujuan Backend
Mengelola permintaan kebutuhan material dari lapangan secara terstruktur untuk mengontrol penggunaan budget dan audit logistik.

## Entity / Model
- [x] Model `MaterialRequest`: request code, project/stage/foreman/supervisor/admin relation, status, priority, needed date, notes, dan timestamp lifecycle lokal.
- [x] Model `MaterialRequestItem`: material name, requested/approved/received qty, unit, optional RAB item reference, variance/tolerance fields, dan additional-material marker.
- [x] Model `MaterialRequestHistory`: audit trail status lokal per aksi dan aktor.

## API / Service
- [x] `GET /api/material-requests`: List request, mendukung filter `projectId`, `foremanId`, `supervisorId`, `adminId`, dan `status`.
- [x] `GET /api/material-requests/:id`: Detail request lengkap dengan project, stage, role relation, items, RAB info, dan history.
- [x] `POST /api/material-requests`: Mandor membuat dan submit kebutuhan material untuk proyek aktif.
- [x] `PATCH /api/material-requests/:id/status`: Update status oleh Pengawas/Admin/Mandor sesuai flow lokal.
- [x] `GET /api/material-requests/rab-usage/:projectId`: Ringkasan penggunaan material terhadap item RAB proyek.

## Status Flow
- [x] `submitted` -> `approved_by_supervisor` / `rejected`.
- [x] `approved_by_supervisor` -> `approved_by_admin` / `rejected`.
- [x] `approved_by_admin` -> `processing` -> `delivered` -> `received` -> `completed`.
- [x] `cancelled` dan `rejected` diperlakukan sebagai status final lokal.

## Business Rules
- [x] Request hanya untuk proyek aktif/berjalan.
- [x] Mandor pembuat request harus sesuai assignment project.
- [x] Approval mengecek ketersediaan alokasi RAB untuk item yang terhubung ke RAB.
- [x] Status final tidak dapat diubah lagi.
- [x] Priority tersedia sebagai workflow lokal (`low`/`medium`/`high`) tanpa klaim urgent procurement production.

## Permission / Role Rules
- [x] Mandor: create/submit kebutuhan material dan confirm received saat barang delivered.
- [x] Pengawas: review/verifikasi kebutuhan lapangan.
- [x] Admin: approval/status distribusi lokal.
- [x] Superadmin: read-only monitoring global.
- [ ] Auth/RBAC production belum tersedia; role berjalan melalui dev persona/payload lokal.

## Validation
- [x] Project harus tersedia dan berstatus aktif/berjalan.
- [x] Assignment Mandor pada project diverifikasi saat create.
- [x] Item dapat merujuk ke RAB item untuk perhitungan usage/remaining qty.
- [x] Approval menolak request yang melebihi remaining RAB qty untuk item terkait.

## Audit Trail / History
- [x] Log setiap transisi status dengan actor role, actor id, old/new status, dan note.

## Integrasi dengan Alur Lain
- [x] Terhubung ke Project, Stage, Foreman, Supervisor, Admin, RAB Item, dan RAB usage summary.
- [x] Terlihat di UI Mandor, Pengawas, Admin, dan Superadmin read-only monitoring.

## Tidak Dikerjakan di Fase Ini
- [ ] Production procurement / purchasing.
- [ ] Warehouse/inventory production.
- [ ] Perbandingan harga supplier otomatis.
- [ ] Payment, invoice, escrow, payout, atau transaksi production.
- [ ] Auth/JWT/session/password/RBAC production.
