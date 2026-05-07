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
- [ ] **Auth Module**: Login, Logout, JWT Guard (Deferred).
- [ ] **User & Role Module**: Manajemen hak akses.
- [x] **Customer Module**: CRUD Customers.
- [x] **Project Module**: Read-only Proyek & Stages.
- [ ] **Project Module**: CRUD Proyek (NEXT).
- [ ] **Estimation Module**: Logic perhitungan RAB (Read-only implemented).
- [ ] **Approval Engine**: Logic workflow status berjenjang.
- [ ] **Reporting Module**: Input laporan harian & foto progres.

## Phase 3: Integration & Stabilization (PLANNED)
- [ ] Sinkronisasi API service dengan Frontend (Planned, after backend CRUD baseline).
- [ ] Penggantian Mock Data Service ke Real API Service (Planned, gradual fallback strategy).
- [ ] End-to-End Testing (E2E).

> [!NOTE]
> Proyek telah memasuki tahap implementasi **Core Data Service**. Fokus saat ini adalah melengkapi CRUD untuk modul Proyek dan RAB sebelum integrasi penuh ke frontend.
