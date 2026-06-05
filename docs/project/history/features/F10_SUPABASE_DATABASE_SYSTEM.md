# F10 — Supabase Database System

## Story
Sistem penyimpanan data dan pengelolaan skema dengan menggunakan Prisma ORM dan layanan database Supabase.

## Status
- **Current Status**: Existing / Needs Verification
## Sub-Batch Story
- **F10**: Legacy verification stage, detail not expanded in current compact tracker.
## Scope
- Skema Tabel (Persona, Project, Operasional, Log).
- Eksekusi Prisma Migration.
- Keamanan Row Level Security (RLS) jika ada.

## Role / Modul Terkait
- Lintas Role (Sistem Pusat)

## Alur Utama
1. Backend menjalankan inisialisasi query melalui Prisma Client.
2. Prisma ORM menerjemahkan query dan mengeksekusinya ke Supabase (PostgreSQL).
3. Integritas tipe (seperti Decimal dan CUID) divalidasi oleh Prisma.

## Data / API / Dependency Terkait
- Supabase
- Prisma

## Status Implementasi Saat Ini
- *Existing / Needs Verification*

## Verification Coverage
- **Frontend**: Partial
- **Backend/API**: Not Verified
- **Database/Prisma**: Partial
- **Auth/Access**: Not Applicable
- **Build/Validation**: Not Run
## Next Step
- Melakukan verifikasi *schema.prisma* saat ini.

## Risiko / Needs Verification
- *Needs Verification*: Kinerja relasional antar *table* saat data sudah mulai membengkak dan penerapan *Row-Level Security* (RLS).

## API Verification (Design Request Models)
- **Model DesignRequest**: **Verified**. Telah terdefinisi di `server/prisma/schema.prisma` mencakup `model DesignRequest` dan `model DesignRequestHistory`. Modul ini siap menampung data riil yang disuntikkan dari formulir publik `client`.

## API Verification (Konsumen Project Tracking Models)
- **Model Proyek Konsumen**: **Verified**. Kesatuan model `Project`, `ProjectStage`, `ProjectDocument`, dan `AdministrativeHelperDocument` telah ditemukan.
- **SOT Parameter**: **Verified**. Status *Single Source of Truth* ditopang kuat oleh properti `verifiedProgress` pada tabel `Project` serta indikator `isVerified` pada `ProjectStage`.

## API Verification (Operational Lapangan Models)
- **Model Log Harian & Mingguan**: **Verified**. Telah diidentifikasi model Prisma `DailyTask`, `DailyReport`, `WeeklyJournal`, dan `SupervisorWeeklyReport`. Model ini memastikan persistensi log dari sisi Mandor maupun Pengawas.
- **Model Resolusi Konflik & Suplai**: **Verified**. Model `FieldIssue` dan `MaterialRequest` telah disiapkan dalam skema untuk penanganan insiden serta perputaran rantai pasok material dari lapangan ke Admin.

## API Verification (Superadmin & Admin Models)
- **Model Manajemen Inti**: **Verified**. Model spesifik tata kelola seperti `Superadmin`, `AuditLog`, dan `Admin` dipastikan tegak berdiri sebagai jangkar operasional utama platform.
- **Model Finansial & Persiapan**: **Verified**. Kerangka hitung rencana anggaran diwakili secara struktural oleh model `RabPlan`, `RabCategory`, dan `RabItem` yang terkait utuh pada `Project`.

## API Verification (Auth Models)
- **Kredensial Keamanan**: **Not Verified**. Belum terdapat kolom pengamanan produksi (contoh: `passwordHash`, `salt`, `token`) di dalam `schema.prisma`. Autentikasi masih murni dikelola melalui seleksi entitas persona.

## API Verification (Report Models)
- **Model Ekspor**: **Not Started**. Tidak ada model spesifik untuk menampung tautan PDF generik hasil konversi. Fungsionalitas pelaporan mengandalkan tarikan data mentah ke model eksisting seperti `DailyReport`, `WeeklyJournal`, maupun `ProjectDocument`.
