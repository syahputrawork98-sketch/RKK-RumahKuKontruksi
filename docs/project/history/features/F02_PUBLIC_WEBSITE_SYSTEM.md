# Batch F02 — Public Website System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Public Website System.

## Status
Existing / Verified Frontend + API

## Story
Sistem antarmuka publik untuk pengunjung non-login yang ingin melihat profil RKK, portofolio, atau mengajukan *Design Request*.

## Current State
- Frontend dan Backend API telah terverifikasi terhubung dengan Prisma schema.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F02A | Public Website Initial Review | Historical | Review awal struktur landing page | - |
| F02B | Public Website API Checkpoint | Historical | Cek awal status endpoint | F02A |
| F02C | Public Design Request Backend Re-Verif | Completed | Verifikasi end-to-end payload form | F02B |
| F02D | Public Guest Routes & CTA Verif | Completed | Verifikasi navigasi & layout publik | F02B |
| F02E | Public Website Story Docs Cleanup | Completed | Merapikan narasi tracker | F02D |

## HOLD / Blocked Notes
- Tidak ada blocker utama saat ini.

## Next Step
- Mengimplementasikan sistem otentikasi nyata (jika sistem saat ini masih sebatas *mock/persona-based*).

## Validation Checklist
- [x] Guest route mapping diverifikasi
- [x] Payload Design Request mencakup structured brief
- [x] Prisma `DesignRequest` tersimpan via `/design-requests`

## Notes
- [F02C] Structured brief terpadatkan ke field `description`.
- [F02D] Guest routes, MainLayout, CTA diverifikasi aktif.
- [F02E] Sub-batch story ter-update.
