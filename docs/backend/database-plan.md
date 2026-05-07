# Database Plan - Workflow Based

## Tujuan
Dokumen ini memetakan kebutuhan model/tabel database berdasarkan workflow RKK.

Banyaknya tabel bukan masalah selama setiap tabel punya tujuan, relasi, dan workflow owner yang jelas.

## Prinsip
- Core entity dipisahkan dari operational workflow.
- Tabel operasional harus punya audit trail jika menyangkut approval, progress, payment, material, atau publikasi ke Konsumen.
- Progress resmi proyek hanya berasal dari verifikasi Pengawas.
- Payment tidak boleh membuat progress baru.
- Customer-facing progress hanya berasal dari progress verified yang dipublish Admin.

## Core Entities
| Model/Table | Purpose | Status | Notes |
|---|---|---|---|
| Customer | Data pelanggan/konsumen | Existing | |
| Project | Data proyek utama | Existing | |
| ProjectStage | Tahapan proyek | Existing/Partial | |
| RabPlan | Header RAB | Existing | Alias: RAB |
| RabCategory | Kategori RAB | Existing | |
| RabItem | Struktur RAB | Existing/Partial | |
| Supervisor | Data Pengawas | Existing | Alias: Supervisor |
| Foreman | Data Mandor | Existing | Alias: Foreman |
| Architect | Data Arsitek | Existing | Alias: Architect |
| Admin | Data Admin | Existing | |
| Superadmin | Data Superadmin | Existing | |

## Progress & Verification
| Model/Table | Purpose | Status |
|---|---|---|
| ProgressVerification | Progres resmi proyek dari Pengawas | Planned |
| ProgressVerificationHistory | Riwayat perubahan progress verified | Planned |

## Foreman Journal
| Model/Table | Purpose | Status |
|---|---|---|
| WeeklyJournal | Jurnal mingguan Mandor | Planned |
| WeeklyJournalActivity | Detail aktivitas kerja | Planned |
| WeeklyJournalLabor | Data tenaga kerja | Planned |
| WeeklyJournalPhoto | Foto pendukung jurnal | Planned |

## Supervisor Report
| Model/Table | Purpose | Status |
|---|---|---|
| SupervisorWeeklyReport | Laporan/evaluasi mingguan Pengawas | Planned |
| SupervisorReportNote | Catatan kualitas/kendala/rekomendasi | Planned |

## Material Request
| Model/Table | Purpose | Status |
|---|---|---|
| MaterialRequest | Pengajuan material | Experimental Existing |
| MaterialRequestItem | Item material yang diminta | Experimental Existing |
| MaterialRequestHistory | Riwayat status pengajuan | Experimental Existing |

## Payment
| Model/Table | Purpose | Status |
|---|---|---|
| ForemanPaymentRequest | Pengajuan pembayaran Mandor | Planned |
| ForemanPaymentEvidence | Bukti pendukung pembayaran | Planned |
| CustomerPaymentTerm | Termin pembayaran Konsumen | Planned |

## Customer Publication
| Model/Table | Purpose | Status |
|---|---|---|
| CustomerProgressPublication | Progress verified yang dipublish ke Konsumen | Planned |
| CustomerVisiblePhoto | Foto yang aman ditampilkan ke Konsumen | Planned |

## Document & Photo
| Model/Table | Purpose | Status |
|---|---|---|
| ProjectDocument | Dokumen proyek | Planned |
| ProjectPhoto | Foto proyek | Planned |

## Notification & Audit
| Model/Table | Purpose | Status |
|---|---|---|
| Notification | Notifikasi antar role | Planned |
| ApprovalLog | Log approval/rejection/revision | Planned |
| AuditLog | Audit umum perubahan penting | Planned |

---
*Catatan: Status tabel harus jujur sesuai kondisi aktual implementasi.*
