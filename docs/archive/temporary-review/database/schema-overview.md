# Schema Overview

Dokumen ini memberikan ringkasan model database RKK yang dikelompokkan berdasarkan domain fungsionalnya.

## Domain 1: Core Project
Pusat dari seluruh aktivitas konstruksi.
- **Project**: Menyimpan data utama proyek, status, dan snapshot progress resmi.
- **ProjectStage**: Tahapan pengerjaan proyek (milestone).
- **Customer**: Data konsumen (Retail/Corporate) pemilik proyek.

## Domain 2: Role Master (Persona)
Menyimpan profil dan kapasitas para aktor proyek.
- **Superadmin**: Pengelola sistem global.
- **Admin**: Pengelola administrasi dan pembayaran proyek.
- **Supervisor (Pengawas)**: Verifikator teknis dan penanggung jawab kualitas.
- **Foreman (Mandor)**: Pelaksana lapangan dan pengaju material.
- **Architect**: Mitra desain (pra-konstruksi).
- **Sub-models**: `SupervisorCertificate`, `SupervisorExperience`, `ForemanCertificate`, `ForemanExperience`, `ArchitectCertificate`, `ArchitectExperience`.

## Domain 3: RAB (Rencana Anggaran Biaya)
Acuan biaya dan volume pekerjaan.
- **RabPlan**: Header rencana anggaran.
- **RabCategory**: Pengelompokan pekerjaan (misal: Pekerjaan Tanah, Pasangan Dinding).
- **RabItem**: Detail item pekerjaan, volume, dan harga satuan.

## Domain 4: Weekly Journal (Mandor)
Dokumentasi aktivitas harian/mingguan dari lapangan.
- **WeeklyJournal**: Header jurnal mingguan mandor.
- **WeeklyJournalActivity**: Detail aktivitas pekerjaan per item.
- **WeeklyJournalPhoto**: Bukti foto kegiatan.
- **WeeklyJournalReviewLog**: Histori persetujuan/revisi dari Pengawas.

## Domain 5: Supervisor Weekly Report
Laporan manajerial mingguan hasil evaluasi Pengawas.
- **SupervisorWeeklyReport**: Header laporan mingguan pengawas.
- **SupervisorWeeklyReportJournal**: Link ke jurnal mandor yang dirangkum.
- **SupervisorWeeklyReportNote**: Catatan khusus (Quality, Safety, Blocker).
- **SupervisorWeeklyReportReviewLog**: Histori review dari Admin.

## Domain 6: Material Request
Workflow pengadaan material proyek.
- **MaterialRequest**: Header pengajuan material.
- **MaterialRequestItem**: Detail material, kuantitas, dan unit.
- **MaterialRequestHistory**: Audit trail perubahan status pengajuan.

## Domain 7: Progress Verification (Source of Truth)
Sistem audit progress resmi yang menjadi satu-satunya acuan progres fisik proyek.
- **ProgressVerificationLog**: Log audit setiap kali Pengawas melakukan verifikasi progress lapangan. Aksi ini secara langsung memperbarui `Project.verifiedProgress`.

---
**Status**: Generated from Prisma Schema v1.0
