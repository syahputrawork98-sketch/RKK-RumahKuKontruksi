# F10 — Supabase Database System

## Story
Sistem penyimpanan data dan pengelolaan skema dengan menggunakan Prisma ORM dan layanan database Supabase.

## Status
- **Current Status**: Existing / Needs Verification

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

## Risiko / Needs Verification
- *Needs Verification*: Kinerja relasional antar *table* saat data sudah mulai membengkak dan penerapan *Row-Level Security* (RLS).

## API Verification (Design Request Models)
- **Model DesignRequest**: **Verified**. Telah terdefinisi di `server/prisma/schema.prisma` mencakup `model DesignRequest` dan `model DesignRequestHistory`. Modul ini siap menampung data riil yang disuntikkan dari formulir publik `client`.

## Next Step
- Melakukan verifikasi *schema.prisma* saat ini.
