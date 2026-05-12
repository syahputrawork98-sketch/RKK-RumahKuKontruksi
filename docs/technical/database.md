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
- **Soft Delete**: Menggunakan flag `deletedAt` untuk menjaga integritas histori.
- **Persona Mapping**: Model profil fungsional (`Admin`, `Supervisor`, dll) memetakan ke sistem identitas melalui field `userId`.
- **Finance vs Progress**: `Project.paidAmount` adalah data administratif keuangan dan tidak memiliki relasi otomatis dengan `verifiedProgress`.

## 📏 Konvensi Database
- **Naming**: Model menggunakan `PascalCase` (Prisma) dan `snake_case` plural (PostgreSQL).
- **Primary Keys**: Menggunakan `String` dengan format **CUID**.
- **Data Types**: Nilai uang/volume menggunakan `Decimal` untuk menghindari rounding error.
- **Formal Relations**: Relasi utama (contoh: `Project.customerId`) didefinisikan secara formal untuk query `include`.
- **Reference Fields**: Snapshot/Audit (contoh: `verifiedProgressById`) disimpan sebagai String ID tanpa relasi formal.

---
*Struktur teknis detail dapat dilihat langsung pada `server/prisma/schema.prisma`.*
