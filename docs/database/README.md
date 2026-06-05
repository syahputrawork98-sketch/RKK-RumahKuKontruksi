# Catatan Teknis Database RKK

Folder ini dikhususkan untuk dokumentasi struktur database, schema, dan penggunaan Supabase di proyek RKK.

## Arsitektur Utama
- Menggunakan database **PostgreSQL** yang dihosting (atau kompatibel) dengan **Supabase**.
- Menggunakan **Prisma ORM** (`prisma schema`) sebagai *Source of Truth* definisi tabel dan relasi.
- **Primary Key**: Secara standar menggunakan tipe **CUID** (Collision Resistant Unique Identifier) untuk keamanan dan skalabilitas ID.

## Model Data Utama
Skema database terbagi ke dalam domain operasi berikut:
- **Persona/Role**: Mengatur data pengguna multi-role.
- **Project**: Tabel pusat manajemen proyek.
- **Operational**: Pencatatan jurnal, laporan, request material, dan isu lapangan.
- **Log**: Pencatatan aktivitas sistem.

## Kebijakan Data
- **Progress SOT**: Status progres konstruksi utama terkunci pada properti `Project.verifiedProgress`.
- **Soft Delete**: Data kritikal tidak dihapus secara permanen (hard delete), melainkan menggunakan mekanisme *soft delete* (contoh: status arsip atau `deleted_at`).
- **Tipe Data Finansial**: Semua perhitungan uang, budget (RAB), dan volume diwajibkan menggunakan tipe data `Decimal` (bukan Float/Double) untuk akurasi matematis.

## Aturan Keamanan
- **DILARANG KERAS** menyimpan credential database, connection string, password, maupun API Key Supabase langsung di dalam repositori atau dokumentasi ini.
- Gunakan environment variables (seperti `.env`) pada lingkungan lokal untuk keamanan data.
