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
| **Auth/Login** | NOT IMPLEMENTED | Using Dev Persona Selector on frontend |
| **Daily Reports** | NOT IMPLEMENTED | Future operational module |
| **Material Requests** | NOT IMPLEMENTED | Future operational module |
| **Field Issues** | NOT IMPLEMENTED | Future operational module |
| **Documentation** | NOT IMPLEMENTED | Future operational module |

## Frontend Role Status

| Role | Data Source | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Pengawas** | Backend/Database | DB-Backed v1 | Requires persona, no mock fallback for main data |
| **Mandor** | Backend/Database | DB-Backed v1 | Requires persona, no mock fallback for main data |
| **Admin** | Mock/Partial | UI Shell Available | Backend integration pending |
| **Superadmin** | Mock/Partial | UI Shell Available | Backend integration pending |
| **Arsitek** | Mock/Partial | UI Shell Available | Backend integration pending |
| **Konsumen** | Mock/Partial | UI Shell Available | Backend integration pending |

## Data Source Rule
Aturan penggunaan data source untuk menjaga integritas sistem selama masa transisi:

### Untuk Pengawas dan Mandor:
- **No Persona**: Jika persona belum dipilih di Dev Mode, UI wajib menampilkan *Empty State*.
- **Database Only**: Dashboard, Daftar Proyek, dan Profil wajib ditarik dari API Backend.
- **Empty/Error State**: Jika data di database kosong atau terjadi error API, tampilkan state yang sesuai, jangan gunakan mock data sebagai penambal.
- **Mock Usage**: Mock data hanya boleh digunakan untuk referensi struktur kode atau pengisian awal (*seed*) database.

### Untuk Role Lain (Admin, Arsitek, dll):
- **Mock Allowed**: Masih diperbolehkan menggunakan mock data terpusat hingga modul backend untuk role tersebut tersedia.

## Known Issues / Technical Notes
1. **Operational Modules**: Halaman operasional Mandor (Tugas Harian, Laporan Harian, Request Material, dll) masih menggunakan tampilan statis/mock karena backend operasional belum diimplementasikan.
2. **Supervisor Operations**: Halaman Verifikasi Progres dan Laporan Mingguan pada Pengawas masih dalam tahap pengembangan backend.
3. **Auth Bypass**: Seluruh sistem saat ini mengabaikan pengecekan token/autentikasi asli untuk mempermudah pengembangan integrasi data lokal.

## Next Recommended Actions
1. **Stabilisasi Pengawas & Mandor**: Memastikan seluruh detail proyek dan profil benar-benar sinkron dengan database.
2. **Implementasi Operational CRUD**: Mulai mengerjakan modul Laporan Harian (Daily Reports) dan Kendala Lapangan (Field Issues).
3. **Migrasi Role Admin**: Mulai memindahkan data statistik Admin ke backend secara bertahap.
4. **Auth Implementation**: Implementasi JWT/Session dilakukan hanya setelah fungsionalitas CRUD lokal stabil di semua role utama.
