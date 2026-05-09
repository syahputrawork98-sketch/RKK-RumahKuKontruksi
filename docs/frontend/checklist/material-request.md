# Frontend Checklist - Pengajuan Material Mandor

## Source Alur
- [docs/alur/material-request.md](../../alur/material-request.md)

## Status Saat Ini
**Local E2E Workflow v1 / UI Consistency Stabilized**. UI lintas Mandor, Pengawas, Admin, dan Superadmin sudah terhubung ke backend lokal untuk fase *Local Development CRUD Integration*. Flow ini bukan procurement/warehouse/payment production.

## Tujuan UI
Memberikan antarmuka bagi Mandor untuk mengajukan kebutuhan barang/material proyek secara efisien.

## Pages / Routes
- [x] `/mandor/request-material`: List request Mandor, form pengajuan, detail, dan confirm received saat delivered.
- [x] `/pengawas/request-material`: Review/verifikasi kebutuhan lapangan.
- [x] `/admin/request-material`: Approval dan status distribusi lokal.
- [x] `/superadmin/monitoring/material`: Read-only monitoring global.

## Components
- [x] `MaterialRequestForm`: Input kebutuhan material, project/stage, RAB usage, item, jumlah, satuan, dan catatan.
- [x] Priority/status controls untuk kebutuhan lokal.
- [x] Status badges dan timeline/history untuk chain Mandor -> Pengawas -> Admin -> distribusi -> diterima.

## User Actions
- [x] Mandor tambah/hapus item material dan submit request.
- [x] Mandor pilih priority, project, stage, dan optional RAB item.
- [x] Pengawas approve/reject verifikasi lapangan.
- [x] Admin approve/process/deliver/complete status distribusi lokal.
- [x] Mandor klik "Barang Diterima" saat status delivered.

## UI States
- [x] Loading, error, empty state, status filter, detail panel/modal, status badge, history, dan note lokal.
- [x] RAB usage/remaining qty dipakai untuk membantu validasi kebutuhan material.

## Role Visibility
- [x] Tombol "Barang Diterima" hanya pada UI Mandor.
- [x] Tombol review/verifikasi hanya pada UI Pengawas.
- [x] Tombol approval/distribusi hanya pada UI Admin.
- [x] Superadmin hanya read-only monitoring.

## Data Display
- [x] Daftar request, project, stage, Mandor/Pengawas/Admin relation, status, priority, needed date, items, qty, unit, dan history.
- [x] Status distribusi lokal: submitted, approved_by_supervisor, approved_by_admin, processing, delivered, received, completed, rejected/cancelled.

## Form & Validation UI
- [x] Validasi required field untuk project, stage, material, qty, unit, dan reason sesuai kebutuhan form.
- [x] RAB usage ditampilkan agar Mandor melihat estimasi/remaining qty sebelum submit.

## Integrasi API / Service
- [x] `GET /api/material-requests` dengan filter role/project/status.
- [x] `GET /api/material-requests/:id`.
- [x] `POST /api/material-requests`.
- [x] `PATCH /api/material-requests/:id/status`.
- [x] `GET /api/material-requests/rab-usage/:projectId`.

## Integrasi dengan Alur Lain
- [x] Mengacu pada Project aktif, Stage, Assignment Mandor/Pengawas/Admin, RAB Item, dan RAB usage summary.

## Tidak Dikerjakan di Fase Ini
- [ ] Production procurement / purchasing.
- [ ] Warehouse/inventory production.
- [ ] Supplier comparison.
- [ ] Payment/invoice/escrow/payout.
- [ ] Barcode scan / upload bukti production.
- [ ] Auth/RBAC production.
