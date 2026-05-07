# Full Database Schema ERD

Status: Draft / Generated from Prisma schema

## Tujuan
Memberikan gambaran besar seluruh tabel yang ada dalam sistem RKK dan bagaimana mereka saling terhubung secara global.

## Diagram

```mermaid
erDiagram
    %% Core & Persona
    Customer ||--o{ Project : owns
    Admin ||--o{ Project : manages
    Supervisor ||--o{ Project : supervises
    Foreman ||--o{ Project : executes
    
    %% Persona Details
    Supervisor ||--o{ SupervisorCertificate : has
    Supervisor ||--o{ SupervisorExperience : has
    Foreman ||--o{ ForemanCertificate : has
    Foreman ||--o{ ForemanExperience : has
    Architect ||--o{ ArchitectCertificate : has
    Architect ||--o{ ArchitectExperience : has

    %% Project Details
    Project ||--o{ ProjectStage : contains
    Project ||--o{ RabPlan : has
    RabPlan ||--o{ RabCategory : contains
    RabCategory ||--o{ RabItem : contains
    
    %% Operations
    Project ||--o{ MaterialRequest : creates
    ProjectStage ||--o{ MaterialRequest : references
    MaterialRequest ||--o{ MaterialRequestItem : contains
    MaterialRequest ||--o{ MaterialRequestHistory : logs
    RabItem ||--o{ MaterialRequestItem : references
    
    Project ||--o{ WeeklyJournal : has
    WeeklyJournal ||--o{ WeeklyJournalActivity : contains
    WeeklyJournal ||--o{ WeeklyJournalPhoto : has
    WeeklyJournal ||--o{ WeeklyJournalReviewLog : logs
    WeeklyJournalActivity ||--o{ WeeklyJournalPhoto : has

    Project ||--o{ SupervisorWeeklyReport : has
    SupervisorWeeklyReport ||--o{ SupervisorWeeklyReportJournal : summarizes
    WeeklyJournal ||--o{ SupervisorWeeklyReportJournal : linked_to
    SupervisorWeeklyReport ||--o{ SupervisorWeeklyReportNote : contains
    SupervisorWeeklyReport ||--o{ SupervisorWeeklyReportReviewLog : logs

    %% Verification
    Project ||--o{ ProgressVerificationLog : logs
    Supervisor ||--o{ ProgressVerificationLog : performs
```

## Catatan Relasi
- **Project** adalah pusat gravitasi data. Hampir semua modul operasional (RAB, Jurnal, Material, Laporan) terikat langsung ke Project.
- **Reference Fields vs Formal Relations**: Beberapa field seperti `verifiedProgressById`, `verifiedBy`, dan `reviewedById` disimpan sebagai **String ID (Reference Fields)** untuk keperluan audit dan snapshot, tanpa relasi foreign key formal di level Prisma Schema.
- **Superadmin** saat ini belum memiliki relasi langsung ke tabel operasional karena fungsinya adalah manajemen sistem global.
- **ProgressVerificationLog** adalah kunci dari audit progress resmi yang membedakan klaim mandor dengan fakta lapangan.
