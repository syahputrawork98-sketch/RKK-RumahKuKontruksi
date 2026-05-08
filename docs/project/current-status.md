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
| **Design Request** | DONE | Consumer Request, Admin Management, Status Workflow |
| **Design Tender** | DONE | 30/70 Split, Architect Bidding, Admin Awarding |
| **Project Bridge** | DONE | Manual conversion from Design to Project Draft |

## Operational Modules Progress
Modul operasional inti (Progress Monitoring, Journal Mandor, Report Pengawas) telah dipindahkan ke database (DB-Backed v1). Admin sekarang dapat memonitor progres resmi (Source of Truth) secara real-time berdasarkan verifikasi Pengawas.

## Frontend Role Status

| Role | Data Source | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Pengawas** | Backend/Database | DB-Backed v1 | Full Operational Flow (Progress, Reports, Journals) |
| **Mandor** | Backend/Database | DB-Backed v1 | Full Operational Flow (Journals) |
| **Arsitek** | Backend/Database | DB-Backed v2 | Full Flow: Tender, Bidding, and Design Updates |
| **Admin** | Backend/Database | DB-Backed v2 | Full Flow: Publish Tender, Awarding, Bridge to Project |
| **Superadmin** | Mock/Partial | UI Shell Available | Backend integration for user management only |
| **Konsumen** | Backend/Database | DB-Backed v1 | Full Flow: Create Design Request, Project Monitoring |
| **Admin Gap** | Analyzed | `admin_gap_analysis.md` | Audit of all Admin pages for DB integration |

## Next Recommended Actions
1. **Design-to-Project QA**: Lakukan testing manual alur penuh dari pengajuan desain hingga aktivasi proyek konstruksi.
2. **Material Request Polish**: Finalisasi alur transisi status dan validasi kuantitas terhadap RAB.
3. **Customer Portal Expansion**: Hubungkan notifikasi status desain dan detail penawaran (tanpa harga) ke dashboard konsumen.
4. **Fase 4 - Admin Feature Stabilization**: Bersihkan mockup "Recent Activity" di Dashboard Admin.
