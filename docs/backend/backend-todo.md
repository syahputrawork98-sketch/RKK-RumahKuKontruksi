# Backend To-Do List

Daftar tugas pengembangan backend jangka panjang.

## Phase 0: Documentation Planning (DONE)
- [x] Buat blueprint arsitektur backend.
- [x] Buat modul inventory.
- [x] Buat role permission matrix.
- [x] Buat workflow & status rules.
- [x] Buat database entity plan.
- [x] Buat API contract plan awal.

## Phase 1: Backend Infrastructure (DONE)
- [x] Inisialisasi server Express.js.
- [x] Setup struktur folder Modular Monolith (JavaScript).
- [x] Setup Environment Config (.env & .env.example).
- [ ] Setup Docker Compose (PostgreSQL).
- [x] Integrasi Prisma ORM & Skema Awal.
- [ ] Implementasi Validation Middleware (Joi/Zod) -> Basic implemented in Controller.
- [x] Setup Error Handling Middleware.
- [ ] Setup Logger & Audit Log Middleware.

## Phase 2: Core Modules Development (PARTIAL)
- [ ] **Auth Module**: Login, Logout, JWT Guard (Planned).
- [ ] **User & Role Module**: Manajemen hak akses (Planned).
- [x] **Customer Module**: CRUD Customers (Implemented v0).
- [x] **Project Module**: Read-only Proyek & Stages (Implemented v0).
- [ ] **Project Module**: CRUD Proyek (Planned).
- [ ] **Estimation Module**: Read-only RAB 3-Level (Implemented v0).
- [ ] **Approval Engine**: Logic workflow status berjenjang (Planned).
- [ ] **Reporting Module**: Input laporan harian & foto progres (Planned).

## Phase 3: Integration & Stabilization (PARTIAL)
- [x] Sinkronisasi API service dengan Frontend (Project List & Detail).
- [ ] Penggantian Mock Data Service ke Real API Service (On-going for other modules).
- [ ] End-to-End Testing (E2E).

> [!NOTE]
> Proyek telah memasuki tahap implementasi **Core Data Service**. Fokus saat ini adalah melengkapi CRUD untuk modul Proyek dan RAB sebelum integrasi penuh ke frontend.
