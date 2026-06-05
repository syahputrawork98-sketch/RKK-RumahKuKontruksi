# F13 — Deployment System

## Story
Sistem infrastruktur akhir untuk *hosting* aplikasi secara daring (Production environment).

## Status
- **Current Status**: Not Started

## Scope
- *Frontend Hosting* (Vercel / Cloudflare).
- *Backend Hosting* (VPS / Heroku / Render).
- *Database Hosting* (Supabase Cloud).

## Role / Modul Terkait
- Infrastruktur

## Alur Utama
1. Kode dari repositori di-*push* ke cabang rilis utama.
2. *Pipeline* CI/CD memicu proses pembangunan ulang aplikasi.
3. Aplikasi tayang secara aman di domain produksi.

## Data / API / Dependency Terkait
- `.env.production`
- SSL, Domain Mapping.

## Status Implementasi Saat Ini
- *Not Started*

## Risiko / Needs Verification
- *Needs Verification*: Persiapan variabel lingkungan dan pemisahan database dev vs prod.

## Next Step
- Menyiapkan infrastruktur dasar *hosting*.
