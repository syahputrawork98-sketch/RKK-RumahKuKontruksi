# Backend Role - Superadmin

## Status
**Partial / Entity API Exists**. Entitas database sudah tersedia, namun workflow manajemen sistem belum final.

## Data Scope
- [x] Memiliki akses teknis ke seluruh entitas di database.
- [ ] Boleh mengelola data user Admin.
- [ ] Boleh melihat seluruh log aktivitas sistem.

## Entity / Model Terkait
- `Superadmin`, `Admin`, `AuditLog` (Planned).

## Endpoint Terkait
- `/api/superadmins`
- `/api/admins`
- `/api/supervisors`
- `/api/foremen`
- `/api/architects`

## Allowed Actions
- [x] CRUD data Admin dan Mitra.
- [ ] Manajemen konfigurasi global sistem (Planned).
- [ ] Melihat dan mengekspor log audit (Planned).

## Forbidden Actions
- [ ] Menganggap status keamanan/RBAC sudah final (Masih fase pengembangan).
- [ ] Bypass aturan integritas data proyek.

## Workflow Terkait
- Manajemen Akun & Hak Akses.
- Audit & Monitoring Sistem.

## Belum Final / Backend Pending
- Sistem Autentikasi (JWT/Session).
- Role-Based Access Control (RBAC) rill di level server.
- System Configuration Module.

## Catatan Sinkronisasi
Superadmin saat ini berfungsi sebagai pengelola entitas master. Alur kontrol sistem secara mendalam belum diimplementasikan.
