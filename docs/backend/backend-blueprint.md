# Backend Blueprint - RumahKu Kontruksi

## Gambaran Umum
Backend RumahKu Kontruksi dirancang untuk menjadi tulang punggung platform jasa konstruksi dan manajemen proyek yang profesional, transparan, dan akuntabel.

## Stack Teknologi Terencana
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Auth**: JWT atau Supabase Auth (Diputuskan nanti)
- **Architecture**: Modular Monolith

## Arsitektur Modular Monolith
Backend RumahKu Kontruksi akan menggunakan arsitektur **Modular Monolith**.

**Artinya**:
- Backend tetap satu aplikasi Express.js dan satu server utama.
- Database utama tetap satu PostgreSQL.
- Kode dipisahkan per modul/domain agar rapi dan terisolasi secara logika.
- Struktur ini lebih sederhana daripada microservices, tetapi jauh lebih rapi daripada monolith tradisional.

**Contoh Struktur Backend**:
```text
server/
├── src/
│   ├── app.js             # Entry point aplikasi
│   ├── config/            # Konfigurasi database, env, dll
│   ├── middleware/        # Global middleware (auth, error handler)
│   ├── modules/           # Direktori utama modul
│   │   ├── auth/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── projects/
│   │   ├── estimations/
│   │   ├── approvals/
│   │   ├── reports/
│   │   ├── materials/
│   │   ├── payments/
│   │   ├── documents/
│   │   ├── notifications/
│   │   └── audit-logs/
│   └── utils/             # Helper universal
├── prisma/                # Skema database Prisma
└── package.json
```

**Pola Internal Modul**:
Setiap modul akan mengikuti pola:
- `module-name.routes.js`: Daftar endpoint API.
- `module-name.controller.js`: Menerima request dan mengirim response.
- `module-name.service.js`: Implementasi logika bisnis utama.
- `module-name.repository.js`: Komunikasi dengan database melalui Prisma.
- `module-name.validation.js`: Validasi input request (misal: Joi atau Zod).

## Current Implemented Structure (v0)
Saat ini backend telah mengimplementasikan modul dasar berikut:
- **Module Customers**: Full CRUD (Create, Read, Update, Delete) dengan validasi data dan pengecekan duplikasi email.
- **Module Projects**: Read-only access untuk data proyek, tahapan proyek (stages), dan RAB (approved plan).

**Future Modules (Planned)**:
- **Auth, Users, Roles**: Belum diimplementasikan (Pending).
- **Upload, Payments, Documents**: Belum diimplementasikan (Pending).
- **Workflow & Approval Engine**: Belum diimplementasikan (Pending).

## Keputusan Framework
**RKK tidak menggunakan Next.js untuk backend.**

**Alasan**:
- Frontend sudah menggunakan Vite React JSX.
- Backend akan berdiri sebagai API server terpisah di folder `server/`.
- Next.js lebih cocok untuk aplikasi fullstack terintegrasi, sedangkan RKK memakai struktur client/server terpisah.
- Express.js lebih sesuai untuk backend API modular yang ringan dan mudah dikembangkan.

**Catatan Historis**:
NestJS TypeScript sempat dipertimbangkan sebagai opsi backend, tetapi untuk tahap awal proyek RKK diputuskan menggunakan **Express.js JavaScript** agar lebih sederhana, konsisten dengan frontend JSX, dan lebih mudah dikembangkan bertahap.

## Prinsip Utama
1. **Role-Based Access Control (RBAC)**: Akses data dibatasi ketat berdasarkan peran pengguna.
2. **Workflow-Based System**: Setiap perubahan status proyek harus melalui tahapan yang telah ditentukan.
3. **Approval-Based Process**: Pekerjaan kritis memerlukan persetujuan berjenjang.
4. **Audit Trail**: Seluruh aktivitas penting dicatat untuk transparansi.
5. **No Data Loss**: Menggunakan Soft Delete untuk data historis penting.

## Fungsi Utama
- **Auth & Session**: Manajemen login dan profil.
- **User & Role**: Manajemen data pengguna dan hak akses.
- **Manajemen Proyek**: Database proyek dari kontrak hingga serah terima.
- **Estimasi/RAB**: Pengelolaan anggaran dan biaya.
- **Laporan Progres**: Pencatatan progres harian dan mingguan.
- **Approval Engine**: Sistem persetujuan berjenjang.
- **Audit Log**: Pencatatan jejak aktivitas sistem.
