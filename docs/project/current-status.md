# Current Status - RKK RumahKu Konstruksi

## Status Umum
- **Phase**: Local Development CRUD Integration Phase
- **Environment**: Localhost only
- **Production Ready**: No
- **Auth System**: NOT IMPLEMENTED (Intentionally postponed)
- **Persona Switcher**: Dev-only persona selector is used for role simulation. This system is local-only and does not use JWT, sessions, or passwords.
- **Fokus Saat Ini**: Integrasi data database lokal untuk role Pengawas, Mandor, dan Arsitek (Profil/Dashboard) serta pembersihan dependensi mock data pada role tersebut.


## Backend Status (Local API)

| Module | Status | Notes |
| :--- | :--- | :--- |
| **Health Check** | DONE | `/api/health` |
| **Customers** | CRUD Available | Local API CRUD |
| **Projects** | CRUD Available | Full Lifecycle (Create, Edit, Detail, Assignment) |
| **Project Stages**| CRUD Available | Plan-based stages for scheduling |
| **RAB** | CRUD Available | Plan, Category, Item with Auto-Aggregation |
| **Supervisors** | CRUD Available | Profile, Certificates, and Experiences included |
| **Foremen** | CRUD Available | Profile, Certificates, and Experiences included |
| **Architects** | CRUD Available | Profile, Certificates, and Experiences included |
| **Auth/Login** | NOT IMPLEMENTED | Using Dev Persona Selector on frontend |
| **Weekly Journals** | CRUD Available | Foreman Weekly Journals (Activities + Photos) |
| **Weekly Reports** | CRUD Available | Supervisor Weekly Reports with Admin Review flow |
| **Material Requests**| Experimental | Backend Draft & Partial Frontend Integration |
| **Verification** | DONE | Official Progress Verification Log (SOT) |

## Operational Modules Progress
Modul operasional inti (Progress Monitoring, Journal Mandor, Report Pengawas) telah dipindahkan ke database (DB-Backed v1). Admin sekarang dapat memonitor progres resmi (Source of Truth) secara real-time berdasarkan verifikasi Pengawas.

## Frontend Role Status

| Role | Data Source | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Pengawas** | Backend/Database | DB-Backed v1 | Full Operational Flow (Progress, Reports, Journals) |
| **Mandor** | Backend/Database | DB-Backed v1 | Full Operational Flow (Journals) |
| **Arsitek** | Backend/Database | DB-Backed v1 | Profile/Dashboard only |
| **Admin** | Backend/Database | DB-Backed v1 | Monitoring & Review: Verified Progress, Report Review |
| **Superadmin** | Mock/Partial | UI Shell Available | Backend integration for user management only |
| **Konsumen** | Mock/Partial | UI Shell Available | Backend integration for Profile/Projects only |
| **Admin Gap** | Analyzed | `admin_gap_analysis.md` | Audit of all Admin pages for DB integration |

## Next Recommended Actions
1. **Fase 4 - Admin Feature Stabilization**: Bersihkan mockup "Recent Activity" di Dashboard Admin dan integrasikan pencatatan log aktivitas di backend.
2. **Customer Portal Integration**: Hubungkan data "Verified Progress" ke timeline konsumen yang saat ini masih mock.
3. **Material Request Polish**: Finalisasi alur transisi status dan validasi kuantitas terhadap RAB.
4. **QA Operasional Penuh**: Simulasi alur penuh dari Mandor (Jurnal) -> Pengawas (Review Journal + Report) -> Admin (Review Report).
