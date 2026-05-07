# Backend Documentation Center

Pusat dokumentasi untuk layanan backend **RumahKu Konstruksi** yang berfokus pada integrasi data lokal.

## Status Backend (Implemented v1)
Backend saat ini beroperasi sebagai **Core Data Service** untuk lingkungan pengembangan lokal. Fokus utama adalah menyediakan fungsionalitas CRUD dasar untuk mendukung transisi frontend dari mock data ke database.

> [!WARNING]
> **Autentikasi & Security**: Belum diimplementasikan secara sengaja.  
> API saat ini dapat diakses secara publik tanpa token/JWT. Role guard belum aktif di sisi server. Keamanan produksi akan dikerjakan pada fase akhir setelah seluruh alur CRUD lokal stabil.

## Implemented Local API Modules

| Module | Base Endpoint | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Health** | `/api/health` | DONE | Server health check |
| **Customers** | `/api/customers` | CRUD Available | Manajemen data pelanggan |
| **Projects** | `/api/projects` | CRUD/Filter Available | Mendukung filter `supervisorId` dan `foremanId` |
| **Supervisors** | `/api/supervisors` | CRUD Available | Termasuk sub-modul Sertifikat & Pengalaman |
| **Foremen** | `/api/foremen` | CRUD Available | Termasuk sub-modul Sertifikat & Pengalaman |
| **Architects** | `/api/architects` | CRUD Available | Termasuk sub-modul Sertifikat & Pengalaman |
| **Auth** | `/api/auth` | **NOT IMPLEMENTED** | Ditunda untuk fokus pada integrasi data |

## Not Implemented Yet
Fitur-fitur berikut masih dalam antrean pengembangan dan sengaja ditunda:
- Sistem Autentikasi (Login/JWT/Session) asli.
- Role Guard & Permission di sisi server.
- Modul Operasional (Laporan Harian, Laporan Mingguan, Request Material, Kendala, Verifikasi).
- Alur Kerja Desain (Design Request, Design File, Design Revision, Design Review).
- Sistem Notifikasi Real-time.
- Sistem Penyimpanan File/Upload Dokumentasi & Desain.
- Hardening untuk lingkungan produksi.

## Postponed Operational Modules

The following modules are intentionally not implemented yet:
- daily reports
- weekly reports
- material requests
- field issues
- documentation uploads
- daily tasks
- progress verification workflow
- design requests
- design files
- design revisions
- design comments/reviews

### Reason
These modules depend on a stable Project/Stage/Progress/RAB workflow and will be designed later to avoid data model mismatch and rework.

*Modul operasional ini belum dibuat secara sengaja karena membutuhkan desain relasi yang matang dengan Project, Stage, Progress, RAB, dan workflow lapangan. Modul ini akan dikerjakan setelah struktur Project lebih stabil.*

## Technology Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL (Prisma ORM)
- **Validation**: Joi / Custom Validation logic

## Referensi API
- [**API Status & Endpoint List**](./api-status.md): Daftar endpoint yang benar-benar tersedia sekarang.
- [**Database Entity Plan**](./database-entity-plan.md): Relasi model database saat ini.
- [**Role & Permission Matrix**](./role-permission-matrix.md): Rencana hak akses (Draft).
- [**Backend To-Do**](./backend-todo.md): Antrean tugas pengembangan backend.
