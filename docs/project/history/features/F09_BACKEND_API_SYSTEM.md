# Batch F09 — Backend API System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Backend API System.

## Status
Existing / Partial

## Story
Sistem pusat yang menangani logika bisnis, validasi, rute *controller*, manipulasi data melalui repositori, serta pengolahan *request/response* secara keseluruhan.

## Current State
- Arsitektur struktur route/controller/repository inti secara global telah mapan, dan modul pendukung F02-F08 terverifikasi aman. Namun, status tertahan di **Partial** akibat eksistensi infrastruktur vital yang belum dipenuhi (Auth Produksi, Notifikasi Riil, Cloud Storage, dan PDF Generator).

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F09A | Backend API System Global Re-Verification | Completed | Memverifikasi komponen dan API existing | - |

## HOLD / Blocked Notes
- *Needs Verification*: Stabilitas saat menangani beban file/gambar berjumlah besar dari mandor dan pengawas.

## Next Step
- Merancang fondasi Middleware Otentikasi (JWT) untuk F11 dan mengupayakan peralihan _Local Uploads_ menuju _Cloud Storage_.

## Validation Checklist
- [x] Struktur Global `app.js` dan Global Middleware
- [x] Pemetaan 25+ Modul Backend Pendukung F02-F08
- [x] Pola Arsitektur Route/Controller/Repository
- [ ] Implementasi Production Authentication (F11 Blocker)
- [ ] Integrasi Database pada Sistem Notifikasi
- [ ] Integrasi Cloud Storage & Report Generator (F12 Blocker)

## Notes
- [F09A] Pengecekan pada `app.js` membuktikan bahwa 25+ modul (seperti `projects`, `weekly-journals`, dsb.) telah didaftarkan dan beroperasi dengan pola arsitektur *Controller-Repository* yang bersih. Sistem dibekali global `errorHandler`. Status dipatok **Partial** karena masih ditemukan *blocker* krusial: tidak ada perlindungan *Auth JWT Middleware*, unggahan file bersandar pada direktori lokal statis (`/uploads`), serta layanan Notifikasi yang beroperasi tanpa relasi tabel di Prisma Schema (*mock*). Semua aspek yang menghambat ini perlu diselesaikan di tahapan perombakan spesifik. (*Completed*)
