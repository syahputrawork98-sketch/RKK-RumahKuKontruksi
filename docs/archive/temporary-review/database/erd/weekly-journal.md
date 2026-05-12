# Weekly Journal ERD

Status: Draft / Generated from Prisma schema

## Tujuan
Menjelaskan relasi antara jurnal harian/mingguan yang dibuat oleh Mandor, aktivitas pekerjaan detail, dan bukti dokumentasi foto.

## Diagram

```mermaid
erDiagram
    Project ||--o{ WeeklyJournal : documented_in
    Foreman ||--o{ WeeklyJournal : authors
    Supervisor ||--o{ WeeklyJournal : reviews
    
    WeeklyJournal ||--o{ WeeklyJournalActivity : contains
    WeeklyJournal ||--o{ WeeklyJournalPhoto : has_galleries
    WeeklyJournal ||--o{ WeeklyJournalReviewLog : tracks_status
    
    WeeklyJournalActivity ||--o{ WeeklyJournalPhoto : specific_photo
    
    WeeklyJournal {
        string id PK
        datetime weekStartDate
        float claimedProgress
        string status
        string reviewedById "Ref: Supervisor/Admin"
    }
    WeeklyJournalActivity {
        string id PK
        string workTitle
        decimal volume
        float progressClaim
    }
```

## Catatan Relasi
- **WeeklyJournal** mencakup satu periode minggu pengerjaan.
- **reviewedById** adalah **Reference Field** (String ID) yang mencatat siapa yang melakukan review jurnal tersebut.
- **WeeklyJournalActivity** merujuk pada item pekerjaan spesifik. Secara opsional dapat merujuk ke `rabItemId` atau `projectStageId`.
- **WeeklyJournalPhoto** dapat terikat ke Jurnal secara umum atau ke Aktivitas spesifik.
- **WeeklyJournalReviewLog** menyimpan histori interaksi antara Mandor dan Pengawas (misal: "Catatan revisi pengawas").
