# Current Status - RKK RumahKu Konstruksi

## Status Umum
- **Phase**: Local Development CRUD Integration Phase
- **Environment**: Localhost only
- **Production Ready**: No
- **Auth System**: NOT IMPLEMENTED (Intentionally postponed)
- **Fokus Saat Ini**: Integrasi data database lokal untuk role Pengawas dan Mandor serta pembersihan dependensi mock data pada role tersebut.

## Backend Status (Local API)

| Module | Status | Notes |
| :--- | :--- | :--- |
| **Health Check** | DONE | `/api/health` |
| **Customers** | CRUD Available | Local API CRUD |
| **Projects** | CRUD/Filter Available | Supports `supervisorId` and `foremanId` filtering |
| **Supervisors** | CRUD Available | Profile, Certificates, and Experiences included |
| **Foremen** | CRUD Available | Profile, Certificates, and Experiences included |
| **Architects** | CRUD Available | Profile, Certificates, and Experiences included |
| **Auth/Login** | NOT IMPLEMENTED | Using Dev Persona Selector on frontend |
| **Daily Reports** | NOT IMPLEMENTED | Postponed until Project/RAB stabilized |
| **Material Requests** | NOT IMPLEMENTED | Postponed until Project/RAB stabilized |
| **Field Issues** | NOT IMPLEMENTED | Postponed until Project/RAB stabilized |
| **Documentation** | NOT IMPLEMENTED | Postponed until Project/RAB stabilized |
| **Weekly Reports** | NOT IMPLEMENTED | Postponed until Project/RAB stabilized |
| **Daily Tasks** | NOT IMPLEMENTED | Postponed until Project/RAB stabilized |
| **Verification Workflow** | NOT IMPLEMENTED | Postponed until Project/RAB stabilized |

## Operational Modules Postponement
Modul operasional Pengawas dan Mandor sengaja ditunda. Modul seperti laporan harian, request material, kendala lapangan, dokumentasi, dan verifikasi progres akan dibahas dan dibuat nanti bersamaan dengan pematangan modul Project, Stage, Progress, RAB, dan workflow lapangan agar struktur datanya tidak bentrok atau perlu dibongkar ulang.

*Operational modules for Pengawas and Mandor are intentionally postponed until the Project, Stage, Progress, RAB, and field workflow structure are discussed and stabilized.*

## Frontend Role Status

| Role | Data Source | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Pengawas** | Backend/Database | DB-Backed v1 | Requires persona, no mock fallback for main data |
| **Mandor** | Backend/Database | DB-Backed v1 | Requires persona, no mock fallback for main data |
| **Arsitek** | Backend/Database | DB-Backed v1 | Profile/Dashboard only. Design workflow is Mock-First |
| **Admin** | Mock/Partial | UI Shell Available | Backend integration pending |
| **Superadmin** | Mock/Partial | UI Shell Available | Backend integration pending |
| **Konsumen** | Mock/Partial | UI Shell Available | Backend integration pending |

## Data Source Rule
Aturan penggunaan data source untuk menjaga integritas sistem selama masa transisi:

### Untuk Pengawas, Mandor, dan Arsitek (Profil/Dashboard):
- **No Persona**: Jika persona belum dipilih di Dev Mode, UI wajib menampilkan *Empty State*.
- **Database Only**: Dashboard dan Profil wajib ditarik dari API Backend.
- **Empty/Error State**: Jika data di database kosong atau terjadi error API, tampilkan state yang sesuai, jangan gunakan mock data sebagai penambal.
- **Mock Usage**: Mock data hanya boleh digunakan untuk referensi struktur kode atau pengisian awal (*seed*) database.

### Untuk Role Lain (Admin, Arsitek, dll):
- **Mock Allowed**: Masih diperbolehkan menggunakan mock data terpusat hingga modul backend untuk role tersebut tersedia.

## Known Issues / Technical Notes
1. **Operational/Design Modules**: Halaman operasional Mandor/Pengawas dan alur kerja desain Arsitek (Permintaan Desain, File Desain, Revisi, dll) masih menggunakan tampilan statis/mock karena backend terkait sengaja ditunda.
2. **Auth Bypass**: Seluruh sistem saat ini mengabaikan pengecekan token/autentikasi asli untuk mempermudah pengembangan integrasi data lokal.

## Next Recommended Actions
1. **QA Lokal**: Lakukan pengujian menyeluruh untuk fitur persona, empty state, error state, dan pengambilan data project/profil untuk ketiga role (Pengawas, Mandor, Arsitek).
2. **Diskusi Modul Core**: Mulai diskusi dan perapihan modul Project/Progress/RAB.
3. **Desain Operational & Design CRUD**: Setelah modul Project/Progress/RAB jelas, baru desain operational CRUD untuk Pengawas/Mandor dan design workflow CRUD untuk Arsitek.
5. **Auth Implementation**: Implementasi JWT/Session tetap ditunda sampai fungsionalitas CRUD lokal stabil di semua role utama.
