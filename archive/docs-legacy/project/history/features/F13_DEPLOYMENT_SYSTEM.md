# Batch F13 — Deployment System

## Feature Summary
Sistem infrastruktur akhir untuk hosting aplikasi RKK secara daring, mencakup frontend, backend API, database, environment variable, storage, auth production, dan deployment readiness.

## Status
Not Started / Audit Ready

## Story
F13 memastikan aplikasi RKK bisa dipersiapkan menuju production deployment tanpa membocorkan credential, tanpa mengandalkan local-only setup, dan tanpa mengklaim fitur production-ready sebelum auth, database, storage, dan backend readiness benar-benar aman.

## Current State
- Frontend sudah memiliki script Vite build (`npm run build`) dan mendukung `VITE_API_URL`.
- Backend sudah memiliki script `npm start` dan entrypoint `src/server.js`.
- Backend memiliki health check `/api/health`.
- Prisma memakai PostgreSQL melalui `DATABASE_URL`.
- Deployment production belum siap karena F11 Auth masih Dev Mock, CORS masih default, upload masih local `/uploads`, dan Supabase RLS/migration production belum tervalidasi.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F13A | Deployment Readiness Initial Audit | Completed | Memetakan readiness dan blocker deployment tanpa deploy | F09, F10, F11, F12 |

## HOLD / Blocked Notes
- F11/Auth production belum selesai; API belum diproteksi JWT/session middleware.
- CORS backend masih default `cors()` dan belum dibatasi ke domain production.
- Upload file/foto masih memakai local static `/uploads`, belum cloud storage.
- Supabase production migration dan RLS belum tervalidasi.
- Backend PDF generator belum tersedia; F12 masih frontend-only export.
- Environment template production belum terkonfirmasi lengkap dari audit awal.

## Next Step
- Selesaikan F11 production auth/JWT sebelum backend production diekspos.
- Siapkan environment template aman untuk frontend/backend tanpa secret asli.
- Rancang deployment target terpisah: frontend Vite, backend Node API, database Supabase/PostgreSQL.
- Rancang cloud storage untuk file/foto sebelum production rollout.
- Batasi CORS ke domain production setelah domain final tersedia.

## Validation Checklist
- [x] Frontend build command teridentifikasi.
- [x] Frontend API base URL mendukung `VITE_API_URL`.
- [x] Backend start command teridentifikasi.
- [x] Backend health check tersedia.
- [x] Prisma datasource memakai `DATABASE_URL`.
- [ ] Production auth/JWT middleware tersedia.
- [ ] CORS production domain whitelist tersedia.
- [ ] Cloud storage tersedia untuk upload/file.
- [ ] Supabase RLS/migration production tervalidasi.
- [ ] Backend PDF generator tersedia jika dibutuhkan.

## Notes
- [F13A] Audit awal deployment selesai tanpa deploy dan tanpa menyentuh secret. Frontend dan backend memiliki fondasi start/build, tetapi F13 tetap tidak boleh dinaikkan ke Completed karena blocker production masih besar: F11 Auth, CORS, local uploads, Supabase RLS/migration, dan server-side PDF/storage readiness.
