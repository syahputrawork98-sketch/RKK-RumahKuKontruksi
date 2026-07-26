# Batch F07 — Pengawas Monitoring System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Pengawas Monitoring System.

## Status
Existing / Verified Frontend + API

## Story
Sistem operasional bagi Pengawas lapangan yang bertugas mengecek pekerjaan Mandor, menyetujui *Material Request*, menangani laporan *Field Issue*, dan mengunci *Verified Progress* (SOT) setiap minggunya.

## Current State
- Modul Pengawas, integrasi service, serta logika penentuan nilai kemajuan (_SOT Progress_) di Backend telah terverifikasi aman dan dikawal kuat.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F07A | Pengawas Monitoring Re-Verification | Completed | Memverifikasi komponen dan API existing | - |

## HOLD / Blocked Notes
- *Needs Verification*: Bagaimana sistem menangani *overriding* nilai progres oleh Pengawas jika Mandor mengisi *daily log* secara tidak logis.

## Next Step
- Merancang integrasi nyata file foto/dokumen pada layanan cloud storage untuk fungsi pelaporan dokumentasi lapangan.

## Validation Checklist
- [x] Frontend route/component
- [x] Frontend service/API client
- [x] Backend endpoint/module
- [x] Prisma/database model
- [x] SOT Progress / verifiedProgress integrity

## Notes
- [F07A] Tervalidasi struktur antarmuka terisolasi di bawah `PengawasLayout`. Mekanisme SOT Progress (`verifiedProgress`) di `projects.controller.js` diproteksi ketat: dilarang update via endpoint sembarangan, mengunci ke ID pengawas spesifik per proyek, tidak membolehkan angka turun (mundur), dan direkam mutlak ke model `ProgressVerificationLog`. Isu Mandor dapat dijembatani sebab nilai SOT berdiri otonom tanpa paksaan dari klaim Mandor. Upload dokumen/foto masih menyimpan risiko bilamana belum terhubung *cloud storage*. Modul export (PDF) telah dikelola di F12 secara terpisah. (*Completed*)
