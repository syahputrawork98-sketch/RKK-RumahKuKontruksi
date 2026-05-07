# Backend Documentation Center

Pusat dokumentasi perencanaan dan blueprint backend untuk **RumahKu Konstruksi**.

> [!NOTE]
> **Status Backend**: Implemented v0.1 (Core Data Service & Integration).  
> Backend sudah melayani data riil untuk Customers dan Projects. Fokus saat ini di sisi Frontend adalah standarisasi UI Dashboard agar siap menerima integrasi data dari API secara konsisten lintas role.
> **Database**: PostgreSQL aktif di port 5433 (Dev).

## Technology Stack (Current)
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: PostgreSQL (v18+)
- **ORM**: Prisma ORM
- **Architecture**: Modular Monolith
- **Auth**: Pending (Belum diimplementasikan)

**Status**: Implemented v0 (Core Data Service)

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
