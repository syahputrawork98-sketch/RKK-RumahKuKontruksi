# API Status - Local Development

Daftar endpoint yang tersedia pada backend server (Localhost) untuk fase integrasi CRUD.

## Base URL
`http://localhost:4000/api`

## Health
- `GET /health`: Cek kesehatan server.

## Customers
- `GET /customers`: Ambil semua data pelanggan.
- `GET /customers/:id`: Ambil detail pelanggan.
- `POST /customers`: Tambah pelanggan baru.
- `PATCH /customers/:id`: Update data pelanggan.
- `DELETE /customers/:id`: Hapus pelanggan.

## Projects
- `GET /projects`: Ambil semua proyek.
- `GET /projects?supervisorId=:id`: Ambil proyek berdasarkan ID Pengawas.
- `GET /projects?foremanId=:id`: Ambil proyek berdasarkan ID Mandor.
- `GET /projects/:id`: Ambil detail proyek.
- `POST /projects`: Tambah proyek baru.
- `PATCH /projects/:id`: Update data proyek.
- `DELETE /projects/:id`: Hapus proyek.
- `GET /projects/:id/stages`: Ambil tahapan proyek.
- `GET /projects/:id/rab`: Ambil data RAB proyek.
- `PATCH /projects/:id/verify-progress`: Verifikasi progres fisik oleh Pengawas (SOT).
- `GET /projects/:id/progress-history`: Riwayat verifikasi progres proyek.

## Supervisors
- `GET /supervisors`: Ambil semua data Pengawas.
- `GET /supervisors/:id`: Ambil detail Pengawas.
- `POST /supervisors`: Tambah Pengawas baru.
- `PATCH /supervisors/:id`: Update profil Pengawas.
- `DELETE /supervisors/:id`: Hapus Pengawas.

### Certificates (Supervisor)
- `GET /supervisors/:id/certificates`: List sertifikat pengawas.
- `POST /supervisors/:id/certificates`: Tambah sertifikat.
- `PATCH /supervisors/certificates/:certificateId`: Update sertifikat.
- `DELETE /supervisors/certificates/:certificateId`: Hapus sertifikat.

### Experiences (Supervisor)
- `GET /supervisors/:id/experiences`: List pengalaman pengawas.
- `POST /supervisors/:id/experiences`: Tambah pengalaman.
- `PATCH /supervisors/experiences/:experienceId`: Update pengalaman.
- `DELETE /supervisors/experiences/:experienceId`: Hapus pengalaman.

## Foremen
- `GET /foremen`: Ambil semua data Mandor.
- `GET /foremen/:id`: Ambil detail Mandor.
- `POST /foremen`: Tambah Mandor baru.
- `PATCH /foremen/:id`: Update profil Mandor.
- `DELETE /foremen/:id`: Hapus Mandor.
- `GET /foremen/:id/projects`: Ambil proyek yang dikerjakan Mandor tertentu.

### Certificates (Foreman)
- `GET /foremen/:id/certificates`: List sertifikat mandor.
- `POST /foremen/:id/certificates`: Tambah sertifikat.
- `PATCH /foremen/certificates/:certificateId`: Update sertifikat.
- `DELETE /foremen/certificates/:certificateId`: Hapus sertifikat.

### Experiences (Foreman)
- `GET /foremen/:id/experiences`: List pengalaman mandor.
- `POST /foremen/:id/experiences`: Tambah pengalaman.
- `PATCH /foremen/experiences/:experienceId`: Update pengalaman.
- `DELETE /foremen/experiences/:experienceId`: Hapus pengalaman.

## Architects
- `GET /architects`: Ambil semua data Arsitek.
- `GET /architects/:id`: Ambil detail Arsitek.
- `POST /architects`: Tambah Arsitek baru.
- `PATCH /architects/:id`: Update profil Arsitek.
- `DELETE /architects/:id`: Hapus Arsitek (Soft delete).

### Certificates (Architect)
- `GET /architects/:id/certificates`: List sertifikat arsitek.
- `POST /architects/:id/certificates`: Tambah sertifikat.
- `PATCH /architects/certificates/:certificateId`: Update sertifikat.
- `DELETE /architects/certificates/:certificateId`: Hapus sertifikat.

### Experiences (Architect)
- `GET /architects/:id/experiences`: List pengalaman arsitek.
- `POST /architects/:id/experiences`: Tambah pengalaman.
- `PATCH /architects/experiences/:experienceId`: Update pengalaman.
- `DELETE /architects/experiences/:experienceId`: Hapus pengalaman.

## Admins (Local CRUD/API Draft)
- `GET /admins`: Ambil semua data Admin.
- `GET /admins/:id`: Ambil detail Admin.
- `POST /admins`: Tambah Admin baru.
- `PATCH /admins/:id`: Update data Admin.
- `DELETE /admins/:id`: Hapus Admin.

## Superadmins (Local CRUD/API Draft)
- `GET /superadmins`: Ambil semua data Superadmin.
- `GET /superadmins/:id`: Ambil detail Superadmin.
- `POST /superadmins`: Tambah Superadmin baru.
- `PATCH /superadmins/:id`: Update data Superadmin.
- `DELETE /superadmins/:id`: Hapus Superadmin.

## Material Requests (Experimental Backend Draft)
- `GET /api/material-requests`: Ambil semua pengajuan material.
- `GET /api/material-requests/:id`: Ambil detail pengajuan material.
- `POST /api/material-requests`: Membuat pengajuan material baru.
- `PATCH /api/material-requests/:id/status`: Update status pengajuan.
- `GET /api/material-requests/project/:projectId`: List pengajuan per proyek.
- **Catatan**: 
  - Endpoint sudah tersedia dengan model Prisma `MaterialRequest` dan `MaterialRequestItem`.
  - Sistem *Audit Trail* (History) sudah mulai ada namun belum final.
  - Validasi role/RBAC dan transisi status belum diperketat secara final.
  - Jalur Normal vs Urgent belum diimplementasikan secara spesifik di backend.
  - **Status**: *Experimental Backend Draft* (Tidak untuk penggunaan produksi).

## Auth
- **NOT IMPLEMENTED**: Endpoint login/register belum tersedia. Autentikasi disimulasi di frontend melalui persona selector.

The following APIs are intentionally postponed and should not be implemented before Project/Stage/Progress/RAB workflow is clarified:

- `GET/POST /daily-reports`: Laporan harian mandor (NOT IMPLEMENTED)
- `GET/POST /weekly-reports`: Laporan mingguan pengawas (NOT IMPLEMENTED)
- `GET/POST /field-issues`: Kendala lapangan (NOT IMPLEMENTED)
- `GET/POST /documentation`: Upload foto/video dokumentasi (NOT IMPLEMENTED)
- `GET/POST /tasks`: Manajemen tugas harian (NOT IMPLEMENTED)
- `GET/POST /design-requests`: Permintaan desain (NOT IMPLEMENTED)
- `GET/POST /design-files`: Upload file desain (NOT IMPLEMENTED)
- `GET/POST /design-revisions`: Manajemen revisi desain (NOT IMPLEMENTED)

*These endpoints are intentionally postponed to ensure data consistency with the core Project and RAB modules.*

## Notes
- **No JWT/Token**: Request tidak memerlukan header Authorization.
- **No Role Guard**: Pengecekan role/RBAC rill belum dilakukan di sisi server. Keberadaan API entity tidak otomatis berarti role management sudah final.
- **Local Development**: API hanya dioptimalkan untuk berjalan di localhost.
- **Experimental Status**: Material Request saat ini sudah memiliki draft backend awal, tetapi status alurnya masih experimental. Implementasi ini dipertahankan sebagai basis awal, namun belum boleh dianggap final sampai checklist backend/frontend dan aturan alur diselesaikan.
