# F11 — Auth Access Control System

## Story
Sistem keamanan lapisan inti untuk memverifikasi kredensial dan mengatur batas privasi pengguna berdasarkan *role* (Authentication & Authorization).

## Status
- **Current Status**: Not Verified

## Scope
- Integrasi JWT Auth / Supabase Auth.
- Proteksi Route Frontend.
- Proteksi Middleware Backend.

## Role / Modul Terkait
- Lintas Role

## Alur Utama
1. User login dengan password/email.
2. Server merespon dengan token/sesi.
3. User menavigasi ke halaman khusus yang divalidasi lewat *auth guard*.

## Data / API / Dependency Terkait
- Auth Strategy (belum ditentukan pastinya, berpotensi JWT atau Supabase GoTrue).

## Status Implementasi Saat Ini
- *Not Verified* (kemungkinan masih digantikan *Dev Persona Switcher*).

## Risiko / Needs Verification
- *Needs Verification*: Implementasi asli keamanan. Apakah masih 100% menggunakan switch simulasi?

## Next Step
- Merancang alur otentikasi asli untuk produksi.
