# Role Master ERD

Status: Draft / Generated from Prisma schema

## Tujuan
Menjelaskan struktur data untuk setiap persona/aktor dalam sistem beserta data pendukungnya (sertifikat & pengalaman).

## Diagram

```mermaid
erDiagram
    Supervisor ||--o{ SupervisorCertificate : has
    Supervisor ||--o{ SupervisorExperience : has
    Foreman ||--o{ ForemanCertificate : has
    Foreman ||--o{ ForemanExperience : has
    Architect ||--o{ ArchitectCertificate : has
    Architect ||--o{ ArchitectExperience : has
    
    Admin {
        string id PK
        string status
    }
    Superadmin {
        string id PK
        string status
    }
    Customer {
        string id PK
        string customerType
    }

    Supervisor ||--o{ Project : assigned_to
    Foreman ||--o{ Project : assigned_to
    Admin ||--o{ Project : assigned_to
```

## Catatan Relasi
- Setiap role profesional (Supervisor, Foreman, Architect) memiliki tabel pengalaman dan sertifikat untuk validasi kapasitas oleh Admin/Superadmin.
- Relasi ke **Project** menunjukkan penugasan aktif aktor tersebut pada proyek tertentu.
- **Superadmin** mengelola seluruh data master ini secara global.
