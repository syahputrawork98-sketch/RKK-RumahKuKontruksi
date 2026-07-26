# Batch F03 — Role and Layout System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Role and Layout System.

## Status
Existing / Verified Frontend

## Story
Sistem dasar yang mengatur *layout* spesifik untuk setiap peran (*role*) dan pengaturan state role global agar navigasi konsisten.

## Current State
- Rute-rute aplikasi terbungkus kuat dalam blok `DevRouteGuard`.
- Layout 6 role privat (`Konsumen`, `Superadmin`, `Admin`, `Pengawas`, `Mandor`, `Arsitek`) terisolasi dengan baik.
- *Dev Persona Switcher* masih digunakan, diatur dalam `DevAuthContext`.
## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F03A | Existing Codebase Verification | Completed | Memverifikasi komponen dan API existing | - |

## HOLD / Blocked Notes
- *Needs Verification*: Bagaimana transisi *Dev Persona Switcher* menuju sistem otentikasi JWT asli.

## Next Step
- Verifikasi kelancaran peralihan sesi (*persona switcher*) ke sistem otentikasi nyata yang dihubungkan dengan API/backend sesungguhnya.

## Validation Checklist
- [x] Frontend route/component diverifikasi: `App.jsx` menggunakan pembungkus per-role yang tepat.
- [x] Frontend auth context terpetakan: `DevAuthProvider` dan `DevRouteGuard` memvalidasi berdasarkan `allowedRolePrefix` dan `session.role`.
- [ ] Peralihan ke production auth / backend endpoint
- [ ] Database model migrasi untuk autentikasi riil

## Notes
- [F03A] Verifikasi berhasil pada lapisan antarmuka. `DevRouteGuard` secara aktif memblokir pendarahan rute lintas-role (*role bleeding*). Tidak ada klaim bahwa ini merupakan autentikasi riil; `DevAuthContext` secara eksplisit menggunakan data statis (`session.role`, `personaId`) dalam `localStorage` yang kelak harus diganti oleh dekripsi klaim JWT di lingkungan produksi. Peralihan nanti harus menjaga struktur `selectedPersona` agar layout/topbar tidak patah (error).
