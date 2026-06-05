# Batch F04 — Konsumen Project Tracking System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Konsumen Project Tracking System.

## Status
Existing / Verified Frontend + API

## Story
Sistem pelacakan proyek khusus untuk role Konsumen, meliputi pengajuan desain, pembayaran, hingga pemantauan progres pembangunan fisik.

## Current State
- Halaman Konsumen, integrasi service, serta endpoint API Backend telah sepenuhnya diverifikasi terhubung dengan Prisma schema.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F04A | Konsumen Project Tracking Re-Verification | Completed | Memverifikasi komponen dan API existing | - |

## HOLD / Blocked Notes
- *Partial*: Interaksi dokumen (unggah/unduh) memerlukan perbaikan struktur dan pengikatan ke cloud storage.

## Next Step
- Menyempurnakan alur lampiran dokumen agar mendukung standar cloud upload di fase selanjutnya.

## Validation Checklist
- [x] Frontend route/component
- [x] Frontend service/API client
- [x] Backend endpoint/module
- [x] Prisma/database model

## Notes
- [F04A] Rute UI `/konsumen/proyek` dan `/konsumen/timeline-proyek` stabil di bawah `KonsumenLayout`. `projectService.js` map dengan presisi ke `/projects`, `/projects/:id/stages`, dan `/projects/:id/rab`. Backend `projects.routes.js` serta skema Prisma `Project`, `ProjectStage`, `AdministrativeHelperDocument` sudah tervalidasi selaras tanpa masalah (*Completed*).
