# Backend Documentation Center

Pusat dokumentasi perencanaan dan blueprint backend untuk **RumahKu Konstruksi**.

## Status Backend (Implemented v0)
Backend saat ini beroperasi sebagai **Core Data Service**. Fokus utama adalah menyediakan akses data riil dari database PostgreSQL melalui Prisma ORM untuk dikonsumsi oleh Frontend.

> [!WARNING]
> **Autentikasi & Login**: Belum diimplementasikan (Pending).  
> Saat ini API dapat diakses tanpa token/JWT. Role guard belum aktif di sisi server. Pengujian dilakukan dengan asumsi user sudah teridentifikasi secara hardcoded di sisi frontend atau melalui parameter URL.

## Technology Stack (Current)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: PostgreSQL (v18+)
- **ORM**: Prisma ORM
- **Auth**: **NOT IMPLEMENTED** (Phase 2 Planned)

## Daftar Blueprint Backend
Dokumentasi ini menjadi acuan utama saat tahap pengembangan backend dimulai nanti:

- [**Backend Blueprint**](./backend-blueprint.md): Gambaran umum arsitektur dan prinsip stack.
- [**Backend To-Do**](./backend-todo.md): Daftar tugas pengembangan backend jangka panjang.
- [**Module Inventory**](./module-inventory.md): Inventarisasi modul-modul yang direncanakan.
- [**Role & Permission Matrix**](./role-permission-matrix.md): Matriks akses pengguna berdasarkan role.
- [**Workflow Rules**](./workflow-rules.md): Aturan alur kerja dan approval proyek.
- [**Database Entity Plan**](./database-entity-plan.md): Rencana entitas data dan relasi utama.
- [**API Contract Plan**](./api-contract-plan.md): Rencana kontrak API dan standar response.
- [**Implementation Later**](./implementation-later.md): Panduan prasyarat sebelum memulai eksekusi.

---
*Dokumen lama sebagai referensi:*
- [Backend Notes (Old Reference)](./backend-notes.md)
