# F05 — Superadmin User Management System

## Story
Sistem kontrol tertinggi yang mengelola semua pengguna, hak akses, *master data*, dan pengaturan global aplikasi.

## Status
- **Current Status**: Existing / Partial

## Scope
- Manajemen *User* & *Role*.
- Konfigurasi sistem global.
- Pemantauan log *Operational*.

## Role / Modul Terkait
- Superadmin

## Alur Utama
1. Superadmin membuat dan mengelola akses pengguna (Admin, Pengawas, Mandor).
2. Superadmin melihat log sistem dan menyelesaikan *dispute* tingkat tinggi.

## Data / API / Dependency Terkait
- Tabel `Persona` / `Users`.

## Status Implementasi Saat Ini
- *Existing / Partial*

## Risiko / Needs Verification
- *Needs Verification*: Kebijakan *soft delete* untuk akun pengguna yang sudah terkait dengan data operasional (proyek berjalan).

## Next Step
- Verifikasi manajemen pengguna di API dan database.
