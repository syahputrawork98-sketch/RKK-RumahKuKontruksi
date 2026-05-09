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

**Catatan**:
- Customer API adalah data profil lokal untuk fase developer persona, bukan auth/user production.
- Seed lokal menyediakan `customer-001`, `customer-002`, dan `customer-003` untuk Konsumen persona/demo.
- Field profil yang dapat dipakai UI Edit Profil: `name`, `email`, `phone`, `avatar`, `address`, `identityNumber`, `occupation`, `companyName`, `picName`, `picPosition`, `logo`, `taxNumber`, `businessField`, dan `notes`.
- Field sistem/read-only untuk UI profil: `id`, `userId`, `customerType`, `createdAt`, `updatedAt`, serta relasi `projects` dan `designRequests`.

## Projects
- `GET /projects`: Ambil semua proyek.
- `GET /projects?supervisorId=:id`: Ambil proyek berdasarkan ID Pengawas.
- `GET /projects?foremanId=:id`: Ambil proyek berdasarkan ID Mandor.
- `GET /projects?customerId=:id`: Ambil proyek berdasarkan ID Konsumen.
- `GET /projects/:id`: Ambil detail proyek.
- `POST /projects`: Tambah proyek baru.
- `PATCH /projects/:id`: Update data proyek.
- `DELETE /projects/:id`: Hapus proyek.
- `GET /projects/:id/stages`: Ambil tahapan proyek.
- `GET /projects/:id/rab`: Ambil data RAB proyek.
- `PATCH /projects/:id/verify-progress`: Verifikasi progres fisik oleh Pengawas (SOT).
- `GET /projects/:id/progress-history`: Riwayat verifikasi progres proyek.

**Catatan Konsumen Monitoring**:
- Gunakan `verifiedProgress` sebagai sumber progress resmi untuk tampilan Konsumen.
- Seed lokal menyediakan `customer-002` dengan project aktif `project-active-001`, stage aktif, verified progress, dan public timeline comments.

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

## Weekly Journals (Implemented Local Backend v1)
- `GET /weekly-journals`: Ambil list jurnal (dukung filter actorRole/actorId/foremanId/status).
- `GET /weekly-journals/:id`: Ambil detail jurnal lengkap dengan activities dan photos.
- `POST /weekly-journals`: Membuat draft jurnal baru (Role: Mandor).
- `PATCH /weekly-journals/:id`: Memperbarui draft/revisi jurnal.
- `POST /weekly-journals/:id/submit`: Mengirim jurnal ke Pengawas (Status: submitted).
- `POST /weekly-journals/:id/review`: Review jurnal oleh Pengawas (Aksi: approve, request_revision, reject).

**Catatan**:
- Actor menggunakan payload local dev (`actorRole`, `actorId`).
- Mendukung snapshot progress verifikasi saat jurnal dikunci.
- **Status**: *Implemented Local Backend v1 / Frontend Integrated*.

## Supervisor Weekly Reports (Implemented Local Backend v1 / UI Stabilized)
- `GET /supervisor-weekly-reports/context`: Ambil data pendukung pembuatan laporan.
- `GET /supervisor-weekly-reports`: Ambil list laporan (dukung filter role/project/status/period).
- `GET /supervisor-weekly-reports/:id`: Ambil detail laporan lengkap.
- `POST /supervisor-weekly-reports`: Membuat draft laporan baru (Role: Pengawas).
- `PATCH /supervisor-weekly-reports/:id`: Memperbarui draft/revisi laporan.
- `POST /supervisor-weekly-reports/:id/submit`: Mengirim laporan ke Admin (Status: submitted).
- `POST /supervisor-weekly-reports/:id/review`: Review laporan oleh Admin.

**Catatan**:
- Admin review/publish flow sudah tersedia untuk local development.
- Approval dapat memperbarui progress resmi melalui workflow lokal yang sudah distabilkan.
- **Status**: *Implemented Local Backend v1 / Frontend Stabilized*.

## Material Requests (Implemented Local Backend v1 / UI Stabilized)
- `GET /material-requests`: Ambil semua pengajuan material.
- `GET /material-requests/:id`: Ambil detail pengajuan material.
- `POST /material-requests`: Membuat pengajuan material baru.
- `PATCH /material-requests/:id/status`: Update status pengajuan.
- `GET /material-requests?projectId=:projectId`: List pengajuan per proyek.
- `GET /material-requests/rab-usage/:projectId`: Ringkasan pemakaian RAB material per proyek.

**Catatan**: 
- Endpoint sudah tersedia dengan model Prisma `MaterialRequest` dan `MaterialRequestItem`.
- Status approval, delivery, receipt, dan completion sudah distabilkan untuk local CRUD integration.
- **Status**: *Implemented Local Backend v1 / Frontend Stabilized*.

## Project Stage Public Comments (Implemented Local Backend v1 / Read Path Ready)
- `GET /project-stage-comments/stage/:stageId`: Ambil update publik/thread komentar per stage.
- `POST /project-stage-comments/stage/:stageId`: Buat official update Admin atau reply Konsumen.
- `PATCH /project-stage-comments/:id`: Update isi/status komentar.
- `DELETE /project-stage-comments/:id`: Soft delete komentar.

**Catatan**:
- Konsumen hanya boleh membalas update yang sudah ada; official update hanya untuk Admin.
- Data ini adalah bridge komunikasi publik per tahap proyek, bukan chat internal tim lapangan.
- Untuk integrasi UI Konsumen berikutnya, gunakan mode **read-only panel** terlebih dahulu. Jalur `POST` sudah ada, tetapi reply Konsumen perlu verifikasi/fix backend ringan pada validasi parent comment sebelum dipakai sebagai flow utama.

## Auth
- **NOT IMPLEMENTED**: Endpoint login/register belum tersedia. Autentikasi disimulasi di frontend melalui persona selector.

The following APIs are intentionally postponed and should not be implemented before Project/Stage/Progress/RAB workflow is clarified:

- `GET/POST /daily-reports`: Laporan harian mandor (NOT IMPLEMENTED)
- `GET/POST /daily-reports`: Laporan harian mandor (NOT IMPLEMENTED)
- `GET/POST /field-issues`: Kendala lapangan (NOT IMPLEMENTED)
- `GET/POST /documentation`: Upload foto/video dokumentasi (NOT IMPLEMENTED)
- `GET/POST /tasks`: Manajemen tugas harian (NOT IMPLEMENTED)
- `GET/POST /design-files`: Upload file desain (NOT IMPLEMENTED)
- `GET/POST /design-revisions`: Manajemen revisi desain (NOT IMPLEMENTED)

*These endpoints are intentionally postponed to ensure data consistency with the core Project and RAB modules.*

## Notes
- **No JWT/Token**: Request tidak memerlukan header Authorization.
- **No Role Guard**: Pengecekan role/RBAC rill belum dilakukan di sisi server. Keberadaan API entity tidak otomatis berarti role management sudah final.
- **Local Development**: API hanya dioptimalkan untuk berjalan di localhost.
- **Local Stabilized Status**: Material Request dan Supervisor Weekly Report sudah distabilkan untuk local CRUD integration, tetapi belum mencakup warehouse, payment, auth production, atau RBAC production.
