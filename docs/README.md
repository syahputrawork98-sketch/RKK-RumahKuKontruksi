# Documentation - RumahKu Konstruksi

Selamat datang di pusat dokumentasi proyek **RumahKu Konstruksi**. Repository ini diatur secara terstruktur untuk memudahkan navigasi informasi teknis dan manajerial selama fase integrasi CRUD lokal.

## Struktur Dokumentasi Utama

### 1. [Project Status & Roadmap](./project/)
Berisi status terbaru, rencana migrasi, dan panduan kontribusi.
- [**Current Status**](./project/current-status.md) - Snapshot kondisi pengembangan terbaru.
- [**Migration Plan**](./project/migration-plan.md) - Roadmap teknis migrasi mock ke database.
- [**Commit Rules**](./project/commit-rules.md) - Aturan penamaan dan pengelompokan commit.
- [Overview](./project/overview.md)
- [Roadmap](./project/roadmap.md)

### 2. [Backend & API Service](./backend/)
Dokumentasi implementasi Core Data Service (Express + Prisma).
- [**API Status**](./backend/api-status.md) - Daftar endpoint yang tersedia di localhost.
- [Backend README](./backend/README.md) - Gambaran umum stack dan modul yang sudah ada.
- [Backend Blueprint](./backend/backend-blueprint.md)
- [Backend To-Do](./backend/backend-todo.md)

### 3. [Frontend & UI State](./frontend/)
Dokumentasi implementasi UI (Vite React) dan integrasi data.
- [**Role Data Source Status**](./frontend/role-data-source-status.md) - Status integrasi database per role.
- [Component Inventory](./frontend/component-inventory.md)
- [Route Inventory](./frontend/route-inventory.md)
- [Issues Tracker](./frontend/issues.md)
- [Next Actions](./frontend/next-actions.md)

### 4. [Decisions (ADR)](./decisions/)
Catatan keputusan arsitektur dan teknis penting.
- [2026-05-06-frontend-source](./decisions/2026-05-06-frontend-source.md)

---
*Catatan: Project ini mengutamakan stabilitas fungsionalitas lokal sebelum mengimplementasikan sistem autentikasi dan deployment produksi.*
