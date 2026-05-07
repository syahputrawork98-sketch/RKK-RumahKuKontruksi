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
| **Customers** | `/api/customers` | CRUD | Manajemen data pelanggan |
| **Projects** | `/api/projects` | CRUD | Mendukung filter `supervisorId` dan `foremanId` |
| **Supervisors** | `/api/supervisors` | CRUD | Termasuk Sertifikat & Pengalaman |
| **Foremen** | `/api/foremen` | CRUD | Termasuk Sertifikat & Pengalaman |
| **Architects** | `/api/architects` | CRUD | Termasuk Sertifikat & Pengalaman |
| **Admins** | `/api/admins` | CRUD | Manajemen data Admin |
| **Superadmins** | `/api/superadmins` | CRUD | Manajemen data Superadmin |

## Experimental Backend Drafts
Modul berikut sudah memiliki draf backend awal (route/model/service), namun belum dianggap final dan belum siap untuk produksi.
- **Material Requests**: (`/api/material-requests`). Status: *Experimental*. RBAC dan alur persetujuan bertingkat belum final.

## Postponed Operational Modules
Modul berikut benar-benar belum tersedia di sisi backend:
- Laporan Harian/Mingguan & Tugas Harian.
- Kendala Lapangan & Dokumentasi Proyek.
- Alur Verifikasi Progres & Pembayaran.
- Alur Kerja Desain (Request, File, Revisi, Review).
- Sistem Notifikasi.

## Dokumentasi Teknis
- [**Backend Roles & Data Scope**](./roles/README.md): Aturan akses data per peran.
- [**Backend Checklist per Workflow**](./checklist/README.md): Panduan implementasi atomik.
- [**API Status & Endpoint List**](./api-status.md): Daftar endpoint rill yang tersedia.
- [**Role & Permission Matrix**](./role-permission-matrix.md): Rencana hak akses (Blueprint).

## Technology Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **ORM**: Prisma (PostgreSQL)
