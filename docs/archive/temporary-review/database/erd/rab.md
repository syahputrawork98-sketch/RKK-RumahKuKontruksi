# RAB (Rencana Anggaran Biaya) ERD

Status: Draft / Generated from Prisma schema

## Tujuan
Menjelaskan hierarki data dalam penyusunan anggaran proyek, mulai dari rencana induk hingga detail item pekerjaan.

## Diagram

```mermaid
erDiagram
    Project ||--o{ RabPlan : has
    RabPlan ||--o{ RabCategory : grouping
    RabCategory ||--o{ RabItem : details
    
    RabPlan {
        string id PK
        string title
        decimal totalAmount
        string status
    }
    RabCategory {
        string id PK
        string code
        string name
        decimal subtotal
    }
    RabItem {
        string id PK
        string description
        decimal volume
        string unit
        decimal unitPrice
        decimal total
        int progress
    }

    RabItem ||--o{ MaterialRequestItem : as_baseline
```

## Catatan Relasi
- **RabItem** menyimpan `unitPrice` dan `total` yang menjadi baseline biaya.
- **RabCategory** berfungsi untuk mengelompokkan item (misal: "Pekerjaan Persiapan", "Pekerjaan Atap").
- Item di RAB menjadi referensi utama saat melakukan permintaan material untuk memastikan penggunaan material tidak melebihi estimasi awal.
