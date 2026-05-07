# Backend Roles Documentation

Dokumen ini menjelaskan scope backend per role di RKK.

Folder ini bukan implementasi RBAC final. Saat ini backend masih Local CRUD dan belum menerapkan auth/JWT/role guard asli.

Tujuan folder ini:
- Menjelaskan data scope per role.
- Menjelaskan endpoint yang relevan untuk setiap role.
- Menjelaskan allowed actions dan forbidden actions.
- Menjadi jembatan antara docs/alur, docs/backend/api-status.md, dan checklist backend.

## Status Kontrol Akses
| Role | Backend Status | Catatan |
|---|---|---|
| Admin | DB-Backed v1 / Local CRUD | Core project/customer/team/RAB read-first tersedia |
| Superadmin | Partial / Entity API Exists | API entity ada, workflow management belum final |
| Pengawas | DB-Backed v1 | Profile dan assigned projects tersedia |
| Mandor | DB-Backed v1 | Profile dan assigned projects tersedia |
| Arsitek | DB-Backed v1 | Profile tersedia, design workflow backend pending |
| Konsumen | Partial | Customer entity ada, dashboard konsumen belum progress verified |

## Catatan Penting
- **No Auth / No JWT**: Request tidak memerlukan token untuk saat ini.
- **No Real Server-Side RBAC**: Pengecekan role rill belum dilakukan secara ketat di sisi server.
- **Blueprint Rule**: Role docs ini adalah blueprint aturan, bukan penegakan (enforcement) yang sudah berjalan sepenuhnya.
- **Permission Enforcement**: Penegakan izin akan dibuat setelah alur CRUD lokal stabil.

## Daftar Role
- [Admin](./admin.md)
- [Superadmin](./superadmin.md)
- [Pengawas](./pengawas.md)
- [Mandor](./mandor.md)
- [Arsitek](./arsitek.md)
- [Konsumen](./konsumen.md)
