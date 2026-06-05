# Catatan Teknis Database RKK

Folder ini dikhususkan untuk dokumentasi struktur database, schema, dan penggunaan Supabase di proyek RKK.

## Informasi Dasar
- Layanan **Supabase** digunakan sebagai *dependency* utama untuk penyimpanan data (dan/atau authentication).
- Struktur tabel database dan *Row Level Security* (RLS) policy perlu diverifikasi ulang pada batch khusus di waktu mendatang.

## Aturan Keamanan
- **DILARANG KERAS** menyimpan credential database, connection string, password, maupun API Key Supabase langsung di dalam repositori atau dokumentasi ini.
- Gunakan environment variables (seperti `.env`) pada lingkungan lokal untuk keamanan data.
