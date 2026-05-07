# Core Project ERD

Status: Draft / Generated from Prisma schema

## Tujuan
Menjelaskan relasi inti antara entitas pemilik proyek, pengelola, dan struktur dasar pengerjaan (Stages & RAB).

## Diagram

```mermaid
erDiagram
    Customer {
        string id PK
        string name
        string customerType
    }
    Project {
        string id PK
        string projectCode
        string name
        float verifiedProgress
        string customerId FK
        string adminId FK
        string supervisorId FK
        string foremanId FK
    }
    ProjectStage {
        string id PK
        string projectId FK
        string code
        string title
        int progress
        boolean isVerified
    }
    RabPlan {
        string id PK
        string projectId FK
        decimal totalAmount
    }
    Admin {
        string id PK
        string name
    }
    Supervisor {
        string id PK
        string name
    }
    Foreman {
        string id PK
        string name
    }

    Customer ||--o{ Project : owns
    Admin ||--o{ Project : manages
    Supervisor ||--o{ Project : supervises
    Foreman ||--o{ Project : executes
    Project ||--o{ ProjectStage : has_milestones
    Project ||--o{ RabPlan : has_budget
```

## Catatan Relasi
- Relasi antara Project dengan Admin, Supervisor, dan Foreman adalah relasi penugasan (*assignment*).
- **verifiedProgress** di level Project adalah rekapitulasi dari hasil verifikasi lapangan.
- **ProjectStage** merepresentasikan lini masa (timeline) pekerjaan yang dibagi per kategori atau minggu.
