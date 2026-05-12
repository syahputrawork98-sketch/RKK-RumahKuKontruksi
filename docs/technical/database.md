# Technical: Database - RKK RumahKu Konstruksi

Sistem menggunakan **PostgreSQL** dengan **Prisma** sebagai layer abstraksi data.

## 🏗️ Skema Utama
- **Persona Models**: `Admin`, `Supervisor`, `Foreman`, `Architect`, `Customer`.
- **Project Models**: `Project`, `ProjectStage`, `RabItem`, `RabCategory`.
- **Operational Models**: `WeeklyJournal`, `SupervisorWeeklyReport`, `MaterialRequest`.
- **Log Models**: `ProgressVerificationLog`, `ActivityLog`.

## 🛡️ Aturan Data
- **Progress SOT**: `Project.verifiedProgress` adalah satu-satunya sumber progres fisik resmi.
- **Seeding**: Menggunakan sistem **Modular Seed** (Lean Orchestrator) untuk mengisi data demo lokal secara teratur per domain.
- **Soft Delete**: Sebagian besar entitas penting menggunakan flag penghapusan untuk menjaga integritas histori.

---
*Struktur teknis detail dapat dilihat langsung pada `server/prisma/schema.prisma`.*
