# Batch F08 — Mandor Field Report System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Mandor Field Report System.

## Status
Existing / Verified Frontend + API

## Story
Sistem pencatatan log aktivitas harian oleh Mandor di lapangan, yang mencakup permintaan material ke Pengawas, pelaporan progres teknis (jurnal), dan pencatatan kendala (issue).

## Current State
- Seluruh rute antarmuka Mandor, operasi pengiriman jurnal, manajemen tugas/laporan harian, serta relasi klaim progres di Backend telah terverifikasi aman.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F08A | Mandor Field Report Re-Verification | Completed | Memverifikasi komponen dan API existing | - |

## HOLD / Blocked Notes
- *Needs Verification*: Koneksi *Material Request* menuju persetujuan Admin yang mengontrol budget RAB.

## Next Step
- Mengimplementasikan infrastruktur _cloud storage_ murni untuk menyimpan aman foto dokumentasi Jurnal Mingguan dan Laporan Harian Mandor.

## Validation Checklist
- [x] Frontend route/component
- [x] Frontend service/API client
- [x] Backend endpoint/module
- [x] Prisma/database model
- [x] Sinkronisasi SOT vs Claimed Progress

## Notes
- [F08A] Susunan navigasi Mandor diverifikasi bersih dan tidak memuat _role bleeding_ berkat `MandorLayout`. Pengajuan Jurnal membedakan secara tegas nilai kemajuan yang diklaim oleh Mandor (`claimedProgress`) dengan SOT sesungguhnya milik Pengawas (`verifiedProgress`); tak terjadi manipulasi silang. Integrasi `WeeklyJournal`, `DailyTask`, dan `MaterialRequest` telah kohesif dalam ekosistem _Project_. Kendala terbesar (_HOLD/Risk_) adalah pengunggahan foto/berkas yang saat ini mengandalkan _string URL_ mentah tanpa mekanisme kompresi ke _cloud storage_ riil. (*Completed*)
