# Progress Verification ERD

Status: Draft / Generated from Prisma schema

## Tujuan
Menjelaskan sistem pencatatan progress resmi yang memiliki otoritas tertinggi dalam menentukan status penyelesaian proyek fisik.

## Diagram

```mermaid
erDiagram
    Project ||--o{ ProgressVerificationLog : tracked_by
    Supervisor ||--o{ ProgressVerificationLog : verified_by
    Project ||--o{ ProjectStage : breakdown
    
    ProgressVerificationLog {
        string id PK
        float previousProgress
        float newProgress
        string notes
        datetime createdAt
    }
    
    Project {
        float verifiedProgress
        string verifiedProgressById "Ref: Supervisor"
        datetime verifiedProgressUpdatedAt
    }

    ProjectStage {
        boolean isVerified
        string verifiedBy "Ref: Supervisor"
        datetime verifiedAt
    }
```

## Catatan Relasi
- **ProgressVerificationLog** menyimpan histori setiap perubahan progress resmi secara formal.
- **verifiedProgressById** (tabel Project) dan **verifiedBy** (tabel ProjectStage) adalah **Reference Fields** (String ID), bukan formal foreign key di level Prisma, namun secara fungsional merujuk ke data master Supervisor.
- **ProjectStage** memiliki flag `isVerified` untuk menandai tahapan yang sudah selesai diaudit secara teknis.
