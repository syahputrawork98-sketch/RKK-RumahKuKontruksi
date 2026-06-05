# Batch F10 — Supabase Database System

## Feature Summary
Dokumentasi pelacakan dan status pengembangan untuk fitur Supabase Database System.

## Status
Existing / Needs Verification

## Story
Sistem penyimpanan data dan pengelolaan skema dengan menggunakan Prisma ORM dan layanan database Supabase.

## Current State
- `schema.prisma` berhasil memetakan seluruh modul F02–F09 dengan lengkap (seperti _Project_, _WeeklyJournal_, hingga _AppNotification_), tetapi skema untuk pengerahan produksi (Auth `User` model, _Cloud Storage policy_, RLS) masih terhalang eksistensinya. Status global tertahan di **Partial**.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Dependency |
|---|---|---|---|---|
| F10A | Supabase Database System Global Re-Verification | Completed | Memverifikasi Prisma schema global | - |

## HOLD / Blocked Notes
- *Needs Verification*: Kinerja relasional antar *table* saat data sudah mulai membengkak dan penerapan *Row-Level Security* (RLS).

## Next Step
- Merancang entitas `User` khusus otentikasi produksi, menyempurnakan konfigurasi penyimpanan _cloud storage_ pengganti *URL string*, serta menerapkan kebijakan RLS Supabase sebelum tahap peluncuran (F13).

## Validation Checklist
- [x] Struktur Model Utama Prisma (`schema.prisma`)
- [x] Relasi Foreign Key Pendukung F02–F09
- [x] Sinkronisasi Model SOT dan Claimed Progress
- [ ] Model Otentikasi Produksi (F11 Blocker)
- [ ] Transformasi Data Dokumen menuju Entitas Cloud riil (F12 Blocker)
- [ ] Implementasi Migration, Supabase RLS, dan Database Produksi (F13 Blocker)

## Notes
- [F10A] Hasil pemeriksaan membedah `schema.prisma` (~1200 baris) membuktikan bahwa seluruh ekosistem bisnis mulai dari _Customer_, _Project_, _SupervisorWeeklyReport_, hingga struktur administratif dan keuangan (_PaymentRecord_, _ForemanWeeklyPaymentEligibility_) memiliki dasar relasi kokoh satu sama lain. Entitas _AppNotification_ juga telah disiapkan secara fundamental walau _backend_ saat ini mensimulasikannya via _mock_. Blokade terbesar yang menyebabkan F10 tertahan status **Partial** adalah belum adanya implementasi kredensial absolut (Tabel _User_, _Session_, _Tokens_) sehingga _AuditLog_ saat ini hanya mendata identitas _actorId_ generik tanpa relasi _Foreign Key_ pasti ke tabel otentikasi. _ProjectDocument_ juga hanya menampung berkas sebagai _string url_, belum terhubung dengan _Storage bucket policy_ produksi yang sesungguhnya. (*Completed*)
