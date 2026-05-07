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

## Auth
- **NOT IMPLEMENTED**: Endpoint login/register belum tersedia. Autentikasi disimulasi di frontend melalui persona selector.

## Postponed / Not Implemented Operational APIs

The following APIs are intentionally postponed and should not be implemented before Project/Stage/Progress/RAB workflow is clarified:

- `GET/POST /daily-reports`: Laporan harian mandor (NOT IMPLEMENTED)
- `GET/POST /weekly-reports`: Laporan mingguan pengawas (NOT IMPLEMENTED)
- `GET/POST /material-requests`: Permintaan material (NOT IMPLEMENTED)
- `GET/POST /field-issues`: Kendala lapangan (NOT IMPLEMENTED)
- `GET/POST /documentation`: Upload foto/video dokumentasi (NOT IMPLEMENTED)
- `POST /progress-verifications`: Verifikasi progres oleh pengawas (NOT IMPLEMENTED)
- `GET/POST /tasks`: Manajemen tugas harian (NOT IMPLEMENTED)

*These endpoints are intentionally postponed to ensure data consistency with the core Project and RAB modules.*

## Notes
- **No JWT/Token**: Request tidak memerlukan header Authorization.
- **No Role Guard**: Pengecekan role belum dilakukan di sisi server.
- **Local Development**: API hanya dioptimalkan untuk berjalan di localhost.
