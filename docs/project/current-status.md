# Current Status - RKK RumahKu Konstruksi

## Status Umum
- **Phase**: Local Development CRUD Integration Phase
- **Environment**: Localhost only
- **Production Ready**: No
- **Auth System**: NOT IMPLEMENTED (Intentionally postponed)
- **Persona Switcher**: Dev-only persona selector is used for role simulation. This system is local-only and does not use JWT, sessions, or passwords.
- **Fokus Saat Ini**: Stabilisasi CRUD lokal lintas role sudah masuk fase sinkronisasi status dan cleanup sisa placeholder. Flow Konsumen utama (Dashboard, Profil, Design Request, Project Monitoring, dan Stage Communication Panel) sudah API-backed untuk kebutuhan localhost.
- **Curated Seed Data**: Database lokal telah dibersihkan dan diisi dengan skenario demo yang utuh (Design Flow, Project Bridge, Active Construction, Finished Project, Superadmin Stats, stage/progress/comment demo). Gunakan `npm run db:seed` (alias dari `node prisma/seed.js`) untuk reset data testing.


## Backend Status (Local API)

| Module | Status | Notes |
| :--- | :--- | :--- |
| **Health Check** | DONE | `/api/health` |
| **Customers** | CRUD Available | Local API CRUD; profile Konsumen sudah API-backed via dev persona |
| **Projects** | CRUD Available | Full Lifecycle (Create, Edit, Detail, Assignment) |
| **Project Stages**| CRUD Available | Plan-based stages for scheduling |
| **RAB** | CRUD Available | Plan, Category, Item with Auto-Aggregation |
| **Supervisors** | CRUD Available | Profile, Certificates, and Experiences included |
| **Foremen** | CRUD Available | Profile, Certificates, and Experiences included |
| **Architects** | CRUD Available | Profile, Certificates, and Experiences included |
| **Auth/Login** | NOT IMPLEMENTED | Using Dev Persona Selector on frontend |
| **Weekly Journals** | CRUD Available | Foreman Weekly Journals (Activities + Photos) |
| **Weekly Reports** | DONE | Supervisor Weekly Reports with Admin Review, publish flow, and local UI stabilization |
| **Project Activation**| DONE | Readiness Checklist & Activation Gate (Berjalan) |
| **Material Requests**| DONE | Local DB-Backed with stabilized status approval and receipt flow |
| **Verification** | DONE | Official Progress Verification Log (SOT) |
| **Design Request** | DONE | Consumer Request, Admin Management, Status Workflow |
| **Design Tender** | DONE | 30/70 Split, Architect Bidding, Admin Awarding |
| **Project Bridge** | DONE | Manual conversion from Design to Project Draft |
| **Timeline Panel** | DONE | Stage Communication Panel functional v1 via ProjectStagePublicComment API; create/reply memakai `projectId` eksplisit dari client |

## Operational Modules Progress
Modul operasional inti (Progress Monitoring, Journal Mandor, Report Pengawas) telah dipindahkan ke database (DB-Backed v1). Admin sekarang dapat memonitor progres resmi (Source of Truth) secara real-time berdasarkan verifikasi Pengawas.

### Project Activation Flow (Final)
1. **Planning Mode**: Proyek hasil bridge atau manual berstatus `planning` (Persiapan). Pada fase ini, proyek belum dianggap aktif.
2. **Readiness Requirements**: Aktivasi membutuhkan data lengkap: Customer, Mandor, Pengawas, minimal 1 Stage, minimal 1 RAB Plan, Total RAB > 0, dan tanggal jadwal.
3. **Activation Gate**: Backend menolak aktivasi (`PATCH /activate`) jika syarat di atas belum terpenuhi.
4. **Success Status**: Setelah aktivasi berhasil, status proyek berubah menjadi `Berjalan` (active/ongoing).
5. **Downstream Impact**: Modul *Material Request* hanya dapat digunakan jika proyek sudah berstatus `Berjalan`.

### Scope Guard (Safety First)
Sistem RKK pada fase ini **SENGAJA TIDAK** membuat fitur berikut secara otomatis demi menjaga kontrol administratif:
- RAB otomatis (Harus diinput/import manual).
- Stages otomatis (Harus direncanakan manual).
- Penugasan Mandor/Pengawas otomatis.
- Aktivasi otomatis (Harus melalui tombol aktivasi oleh Admin).
- Sistem Pembayaran (Escrow/Payment Gateway).
- Dokumen Legal Otomatis (SPK, Kontrak).
- Upload dokumen/file production.
- Notifikasi production API.
- Auth Production (Login/Register rill masih ditunda).

## Frontend Role Status

| Role | Data Source | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Pengawas** | Backend/Database | DB-Backed v1 | Full Operational Flow (Progress, Reports, Journals) |
| **Mandor** | Backend/Database | DB-Backed v1 | Full Operational Flow (Journals) |
| **Arsitek** | Backend/Database | DB-Backed v2 | Full Flow: Tender, Bidding, and Design Updates |
| **Admin** | Backend/Database | DB-Backed v2 | Full Flow: Publish Tender, Awarding, Bridge to Project |
| **Superadmin** | Backend/Partial | DB-Backed Local CRUD | Dashboard global stats, master data, Design Request/Tender monitoring, and global project monitoring use local APIs; operational design actions, RBAC, auth production, payment, and system settings remain Hold/Placeholder |
| **Konsumen** | Backend/Database | DB-Backed v1 | Dashboard, Profil, Design Request, Project Monitoring/Timeline, dan Stage Communication Panel sudah API-backed untuk localhost |
| **Admin Gap** | Analyzed | `admin_gap_analysis.md` | Audit of all Admin pages for DB integration |

## Next Recommended Actions
1. **Admin Publish Update / Stage Communication Source Flow Verification**: Verifikasi jalur Admin sebagai sumber update resmi untuk Stage Communication Panel, termasuk guard role dan payload `projectId`.
2. **Admin Dashboard Demo Data Cleanup**: Bersihkan mockup "Recent Activity" dan sisa hardcoded demo data di Dashboard Admin agar sinkron dengan API.
3. **Verified Progress Consistency Audit**: Cek konsistensi tampilan progress proyek antara `progress`, `verifiedProgress`, stage progress, dan log verifikasi.
4. **Final UI Consistency Check**: Lakukan audit visual menyeluruh untuk memastikan harmoni antar modul baru tanpa membuka scope auth/payment/upload production.
