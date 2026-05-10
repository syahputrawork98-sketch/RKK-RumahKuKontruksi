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
- `PATCH /projects/:id/verify-progress`: Verifikasi progres fisik oleh Pengawas assigned (Progress SOT).
- `PATCH /projects/:id/activate`: Aktivasi proyek dari `planning` menjadi `Berjalan` jika readiness checklist terpenuhi.
- `GET /projects/:id/progress-history`: Riwayat verifikasi progres proyek.

**Catatan Konsumen Monitoring**:
- Gunakan `verifiedProgress` sebagai sumber progress resmi untuk tampilan Konsumen.
- `Project.verifiedProgress` adalah Source of Truth; `WeeklyJournal.claimedProgress` adalah klaim Mandor non-resmi dan tidak menggantikan verifikasi Pengawas assigned.
- Seed lokal menyediakan `customer-002` dengan project aktif `project-active-001`, stage aktif, verified progress, dan public timeline comments.

**Catatan Progress Verification Context**:
- **Status**: *Progress Verification from RAB/Stage Context = Local Workflow v1 / Stabilized*.
- Alur lokal: Pengawas memilih project aktif, UI menampilkan konteks pendukung Stage, RAB, dan jurnal Mandor terbaru/ringkas, lalu Pengawas tetap mengisi `verifiedProgress` secara manual.
- Submit tetap melalui `PATCH /projects/:id/verify-progress`.
- Backend menyimpan `Project.verifiedProgress`, `verifiedProgressUpdatedAt`, `verifiedProgressById`, dan `ProgressVerificationLog`.
- Jika `stageId` dikirim, backend memvalidasi Stage tersebut milik project yang diverifikasi.
- `GET /projects/:id/rab` membaca approved RAB terlebih dahulu dan fallback ke latest RAB untuk local development/planning jika belum ada approved RAB.
- RAB, ProjectStage, Weekly Journal, dan review jurnal tidak otomatis menghitung atau mengubah `Project.verifiedProgress`.
- Bukan progress automation production dan tidak mengubah aturan Progress SOT.

**Catatan Project Activation**:
- Endpoint aktivasi tersedia untuk local CRUD integration dan tetap memakai dev persona/adminId lokal, bukan RBAC production.
- Backend menolak aktivasi jika customer, pengawas, mandor, stage, RAB plan, total RAB, atau tanggal jadwal belum lengkap.
- Aktivasi tidak membuat RAB, stage, assignment, pembayaran, atau dokumen legal otomatis.

## RAB Builder (Local CRUD v1 / Admin Builder Stabilized)
- `GET /rab/project/:projectId`: Ambil RAB Plan proyek beserta `RabCategory` dan `RabItem`.
- `POST /rab/project/:projectId/plans`: Membuat RAB Plan lokal untuk proyek.
- `PATCH /rab/plans/:rabPlanId`: Update RAB Plan lokal.
- `POST /rab/plans/:rabPlanId/categories`: Membuat kategori pekerjaan (`RabCategory`).
- `PATCH /rab/categories/:categoryId`: Update kategori pekerjaan.
- `DELETE /rab/categories/:categoryId`: Hapus kategori pekerjaan jika belum memiliki item.
- `POST /rab/categories/:categoryId/items`: Membuat item pekerjaan (`RabItem`).
- `PATCH /rab/items/:itemId`: Update item pekerjaan dan auto-recalculate total.
- `DELETE /rab/items/:itemId`: Hapus item pekerjaan jika belum dipakai workflow lain.

**Catatan**:
- Struktur lokal: `Project` -> `RAB Plan` -> `RabCategory` -> `RabItem`.
- RAB adalah baseline lokal/draft planning untuk scope, volume, unit, harga satuan, subtotal kategori, dan total plan; bukan kontrak final, invoice, payment, escrow, atau dokumen legal production.
- Admin dapat CRUD lokal RAB plan/category/item untuk Local Development CRUD Integration.
- Delete guard: `RabItem` yang sudah dipakai Material Request tidak boleh dihapus; `RabItem` yang sudah dipakai Weekly Journal tidak boleh dihapus; `RabCategory` yang masih punya item tidak boleh dihapus.
- RAB Builder tidak mengubah Progress SOT. `Project.verifiedProgress` tetap Source of Truth lewat Verifikasi Progres manual oleh Pengawas assigned.
- **Status**: *Local CRUD v1 / Admin Builder Stabilized*.

## Supervisors
- `GET /supervisors`: Ambil semua data Pengawas.
- `GET /supervisors/:id`: Ambil detail Pengawas.
- `POST /supervisors`: Tambah Pengawas baru.
- `PATCH /supervisors/:id`: Update profil Pengawas.
- `DELETE /supervisors/:id`: Hapus Pengawas.

### Certificates (Supervisor - Local CRUD v1 / Stabilized)
- `GET /supervisors/:id/certificates`: List sertifikat pengawas.
- `POST /supervisors/:id/certificates`: Tambah sertifikat.
- `PATCH /supervisors/certificates/:certificateId`: Update sertifikat.
- `DELETE /supervisors/certificates/:certificateId`: Soft-delete sertifikat memakai endpoint existing.

### Experiences (Supervisor - Local CRUD v1 / Stabilized)
- `GET /supervisors/:id/experiences`: List pengalaman pengawas.
- `POST /supervisors/:id/experiences`: Tambah pengalaman.
- `PATCH /supervisors/experiences/:experienceId`: Update pengalaman.
- `DELETE /supervisors/experiences/:experienceId`: Soft-delete pengalaman kerja memakai endpoint existing.

**Catatan Certificate & Work Experience Pengawas**:
- Mandor/Pengawas Certificate & Work Experience berstatus **Local CRUD v1 / Stabilized** untuk data profil lokal/manual.
- Pengawas dapat mengelola Sertifikat Keahlian dan Riwayat Pengalaman Kerja lewat endpoint certificates/experiences di atas.
- Fitur memakai schema/backend existing, tanpa schema baru dan tanpa seed baru pada batch docs ini.
- Data belum diverifikasi resmi dan bukan legal certificate, upload dokumen production, PDF certificate, legal validation, rating/scoring, reputation marketplace, atau mekanisme update Progress SOT.
- Experience Read-Only Summary tetap tersedia sebagai ringkasan data operasional lokal: project aktif/selesai, jurnal, aktivitas pekerjaan, laporan/review Pengawas, material request jika tersedia, dan `Project.verifiedProgress` sebagai data resmi read-only.
- Status project aktif mendukung `Berjalan` dan legacy `active`; status project selesai mendukung `Selesai` dan legacy `completed`.
- **Status**: *Mandor/Pengawas Certificate & Work Experience = Local CRUD v1 / Stabilized*.

## Foremen
- `GET /foremen`: Ambil semua data Mandor.
- `GET /foremen/:id`: Ambil detail Mandor.
- `POST /foremen`: Tambah Mandor baru.
- `PATCH /foremen/:id`: Update profil Mandor.
- `DELETE /foremen/:id`: Hapus Mandor.
- `GET /foremen/:id/projects`: Ambil proyek yang dikerjakan Mandor tertentu.

### Certificates (Foreman - Local CRUD v1 / Stabilized)
- `GET /foremen/:id/certificates`: List sertifikat mandor.
- `POST /foremen/:id/certificates`: Tambah sertifikat.
- `PATCH /foremen/certificates/:certificateId`: Update sertifikat.
- `DELETE /foremen/certificates/:certificateId`: Soft-delete sertifikat memakai endpoint existing.

### Experiences (Foreman - Local CRUD v1 / Stabilized)
- `GET /foremen/:id/experiences`: List pengalaman mandor.
- `POST /foremen/:id/experiences`: Tambah pengalaman.
- `PATCH /foremen/experiences/:experienceId`: Update pengalaman.
- `DELETE /foremen/experiences/:experienceId`: Soft-delete pengalaman kerja memakai endpoint existing.

**Catatan Certificate & Work Experience Mandor**:
- Mandor/Pengawas Certificate & Work Experience berstatus **Local CRUD v1 / Stabilized** untuk data profil lokal/manual.
- Mandor dapat mengelola Sertifikat Keahlian dan Riwayat Pengalaman Kerja lewat endpoint certificates/experiences di atas.
- Fitur memakai schema/backend existing, tanpa schema baru dan tanpa seed baru pada batch docs ini.
- Data belum diverifikasi resmi dan bukan legal certificate, upload dokumen production, PDF certificate, legal validation, rating/scoring, reputation marketplace, atau mekanisme update Progress SOT.
- Experience Read-Only Summary tetap tersedia sebagai ringkasan data operasional lokal: project aktif/selesai, jurnal Mandor, aktivitas pekerjaan, material request jika tersedia, dan `Project.verifiedProgress` sebagai data resmi read-only.
- Status project aktif mendukung `Berjalan` dan legacy `active`; status project selesai mendukung `Selesai` dan legacy `completed`.
- **Status**: *Mandor/Pengawas Certificate & Work Experience = Local CRUD v1 / Stabilized*.

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
- `GET /superadmins/stats/global`: Ambil statistik global lokal untuk dashboard Superadmin.
- `GET /superadmins/:id`: Ambil detail Superadmin.
- `POST /superadmins`: Tambah Superadmin baru.
- `PATCH /superadmins/:id`: Update data Superadmin.
- `DELETE /superadmins/:id`: Hapus Superadmin.

**Catatan Superadmin Dashboard & Monitoring**:
- Dashboard Superadmin memakai kombinasi endpoint existing: `/superadmins/stats/global`, `/projects`, dan `/superadmins`.
- Monitoring proyek global memakai Project API sebagai read-only overview untuk Local Development CRUD Integration.
- Monitoring Design Request/Tender memakai endpoint Design Request dan Design Tender yang sama dengan flow Admin/Arsitek, tetapi mode Superadmin bersifat read-only.
- Superadmin tidak mengambil alih aksi operasional seperti assign architect, publish tender, award bid, convert-to-project, aktivasi proyek, atau update progress resmi.

## Design Requests (Local Demo Completion / Local E2E Workflow v1)
- `GET /design-requests`: Ambil list Design Request lokal; dukung filter `customerId`, `architectId`, dan `status`.
- `GET /design-requests/:id`: Ambil detail Design Request lokal.
- `POST /design-requests`: Membuat Design Request lokal dari Konsumen/Admin workflow.
- `PATCH /design-requests/:id`: Update status/detail Design Request lokal untuk review/manage Admin.
- `DELETE /design-requests/:id`: Soft delete Design Request lokal.
- `PATCH /design-requests/:id/assign`: Assign arsitek lokal pada Design Request.
- `POST /design-requests/:id/convert-to-project`: Membuat project draft/planning lokal dari Design Request yang eligible.

**Catatan**:
- Flow lokal: Konsumen create/list Design Request; Admin review/manage Design Request; Arsitek melihat assignment/desain aktif/riwayat lokal; Superadmin read-only monitoring.
- Demo completion lokal: Design Request dapat masuk `assigned` setelah award bid lokal, lalu `approved` sesuai workflow lokal sebelum Admin menjalankan `convert-to-project`.
- Project Bridge hanya membuat project berstatus `planning` sebagai draft lokal. Project draft tidak otomatis aktif, dan aktivasi tetap melalui Project Activation flow terpisah.
- Convert tidak otomatis membuat RAB, stage, penugasan tim production, payment/escrow/invoice, kontrak legal, atau upload file production.
- Bukan marketplace production, tender production, kontrak legal, payment/escrow, upload file production, auth production, atau RBAC production.
- **Status**: *Local Demo Completion / Local E2E Workflow v1*.

## Design Tenders (Local Demo Completion / Local E2E Workflow v1)
- `GET /design-tenders`: Ambil list tender desain lokal; dukung filter `status`.
- `POST /design-tenders/publish`: Publish tender lokal dari Design Request.
- `GET /design-tenders/open`: Ambil open tender lokal untuk Arsitek.
- `GET /design-tenders/:id`: Ambil detail tender desain lokal.
- `GET /design-tenders/:id/bids`: Ambil list bid lokal untuk tender.
- `POST /design-tenders/:id/bids`: Submit bid lokal oleh Arsitek.
- `POST /design-tenders/:id/award/:bidId`: Award bid lokal oleh Admin.
- `DELETE /design-tenders/:id`: Soft delete/cancel tender lokal.

**Catatan**:
- Flow lokal: Admin publish tender lokal dan award bid lokal; Arsitek view open tender dan submit bid lokal; award menghubungkan Design Request ke Arsitek terpilih sebagai fase `assigned`; Superadmin read-only monitoring.
- Split fee 30/70 adalah simulasi data workflow lokal, bukan payment/escrow/disbursement production.
- Award bid lokal menghubungkan Design Request dengan Arsitek terpilih, tetapi tidak membuat kontrak legal, pembayaran, atau file package production.
- **Status**: *Local Demo Completion / Local E2E Workflow v1*.

## Weekly Journals (Local E2E Workflow v1 / UI Consistency Stabilized)
- `GET /weekly-journals`: Ambil list jurnal (dukung filter actorRole/actorId/foremanId/status).
- `GET /weekly-journals/:id`: Ambil detail jurnal lengkap dengan activities dan photos.
- `POST /weekly-journals`: Membuat draft jurnal baru (Role: Mandor).
- `PATCH /weekly-journals/:id`: Memperbarui draft/revisi jurnal.
- `POST /weekly-journals/:id/submit`: Mengirim jurnal ke Pengawas (Status: submitted).
- `POST /weekly-journals/:id/review`: Review jurnal oleh Pengawas (Aksi: approve, request_revision, reject).

**Catatan**:
- Actor menggunakan payload local dev (`actorRole`, `actorId`).
- Mandor mengisi `WeeklyJournal.claimedProgress` sebagai klaim progress non-resmi.
- Work Reporting from RAB/Stage: `WeeklyJournalActivity.projectStageId` dan `WeeklyJournalActivity.rabItemId` dapat diisi opsional untuk mengaitkan aktivitas ke ProjectStage dan RabItem.
- Detail jurnal melakukan manual enrichment konteks Stage/RAB Item memakai field existing, tanpa schema migration.
- Pengawas review Weekly Journal secara administratif; approval/rejection/revision tidak otomatis mengubah `Project.verifiedProgress`.
- `Project.verifiedProgress` tetap Source of Truth dan hanya diperbarui lewat Progress SOT flow oleh Pengawas assigned.
- Bukan workflow payroll, payment, legal, upload production, auth production, atau RBAC production.
- **Status**: *Local E2E Workflow v1 / UI Consistency Stabilized; Work Reporting from RAB/Stage Local Integration v1 / Stabilized*.

## Supervisor Weekly Reports (Local E2E Workflow v1 / UI Consistency Stabilized)
- `GET /supervisor-weekly-reports/context`: Ambil data pendukung pembuatan laporan.
- `GET /supervisor-weekly-reports`: Ambil list laporan (dukung filter role/project/status/period).
- `GET /supervisor-weekly-reports/:id`: Ambil detail laporan lengkap.
- `POST /supervisor-weekly-reports`: Membuat draft laporan baru (Role: Pengawas).
- `PATCH /supervisor-weekly-reports/:id`: Memperbarui draft/revisi laporan.
- `POST /supervisor-weekly-reports/:id/submit`: Mengirim laporan ke Admin (Status: submitted).
- `POST /supervisor-weekly-reports/:id/review`: Review laporan oleh Admin.
- `POST /supervisor-weekly-reports/:id/publish`: Publish ringkasan laporan lokal untuk alur publikasi administrasi.

**Catatan**:
- Pengawas membuat Weekly Report dengan `SupervisorWeeklyReport.verifiedProgressSnapshot`, yaitu snapshot dari `Project.verifiedProgress` saat laporan dibuat.
- Admin review/publish Weekly Report sebagai administrasi/publikasi ringkasan; bukan verifikasi fisik progress dan bukan pengganti Progress SOT.
- `Project.verifiedProgress` tetap Source of Truth. Pengawas assigned tetap pihak yang memperbarui progress resmi lewat Progress SOT flow.
- Superadmin memakai data Supervisor Weekly Report untuk read-only monitoring/audit lokal, bukan review atau publish.
- Bukan workflow legal, payment, upload production, notification production API, auth production, atau RBAC production.
- **Status**: *Local E2E Workflow v1 / UI Consistency Stabilized*.

## Material Requests (Local Workflow v1 / Stabilized)
- `GET /material-requests`: Ambil semua pengajuan material.
- `GET /material-requests?projectId=:projectId`: List pengajuan per proyek.
- `GET /material-requests?foremanId=:foremanId`: List pengajuan per Mandor.
- `GET /material-requests?supervisorId=:supervisorId`: List pengajuan per Pengawas.
- `GET /material-requests?adminId=:adminId`: List pengajuan sesuai Admin proyek.
- `GET /material-requests?status=:status`: Filter pengajuan berdasarkan status.
- `GET /material-requests/:id`: Ambil detail pengajuan material.
- `POST /material-requests`: Membuat pengajuan material baru.
- `PATCH /material-requests/:id/status`: Update status pengajuan.
- `GET /material-requests/rab-usage/:projectId`: Ringkasan pemakaian RAB material per proyek.

**Catatan**: 
- Endpoint sudah tersedia dengan model Prisma `MaterialRequest` dan `MaterialRequestItem`.
- Material Request from RAB Usage adalah workflow lokal: Mandor memilih project aktif/`Berjalan`, memilih stage project, dan dapat memilih `RabItem` sebagai baseline material.
- Sistem menampilkan total RAB qty, approved qty, dan remaining qty untuk konteks pemakaian material berbasis RAB lokal.
- Manual/outside-RAB request tetap boleh dibuat tanpa `RabItem`, tetapi wajib punya note/alasan.
- Flow lokal: Mandor create/submit, Pengawas review kebutuhan dan kesesuaian lapangan, Admin approval/status distribusi lokal, Mandor confirm received, Superadmin read-only monitoring.
- Backend memvalidasi project harus aktif/`Berjalan`, `foremanId` harus assigned ke project, `supervisorId` harus sesuai project, `stageId` harus milik project, `rabItemId` harus milik project, dan manual request tanpa `RabItem` wajib memiliki note/alasan.
- Approval tetap menjaga quantity check terhadap remaining RAB agar approved qty tidak melewati sisa baseline lokal.
- Tidak ada inventory production, supplier marketplace, purchase order production, invoice/payment/escrow, procurement production, atau RBAC/auth production.
- Tidak ada perubahan Progress SOT dan tidak ada update otomatis ke `Project.verifiedProgress`, `ProjectStage.progress`, atau `RabItem.progress`.
- **Status**: *Material Request from RAB Usage = Local Workflow v1 / Stabilized*.

## Project Stage Public Comments (Implemented Local Backend v1 / Functional v1)
- `GET /project-stage-comments/stage/:stageId`: Ambil update publik/thread komentar per stage.
- `POST /project-stage-comments/stage/:stageId`: Buat official update Admin atau reply Konsumen.
- `PATCH /project-stage-comments/:id`: Update isi/status komentar.
- `DELETE /project-stage-comments/:id`: Soft delete komentar.

**Catatan**:
- Konsumen hanya boleh membalas update yang sudah ada; official update hanya untuk Admin.
- Data ini adalah bridge komunikasi publik per tahap proyek, bukan chat internal tim lapangan.
- Stage Communication Panel Konsumen sudah memakai read path dan customer reply lokal. Payload `POST` tetap wajib menyertakan `projectId`, `authorRole`, `message`, dan `parentId` untuk reply Konsumen.
- Update/delete masih perlu guard role yang lebih tegas sebelum dianggap production-ready.

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
- **Local Stabilized Status**: Material Request from RAB Usage, Mandor/Pengawas Certificate & Work Experience, Weekly Journal, Supervisor Weekly Report, Project Activation, dan flow Konsumen utama sudah distabilkan untuk local CRUD integration, tetapi belum mencakup legal certificate, document upload production, PDF certificate, procurement production, inventory/warehouse production, supplier marketplace, purchase order production, payment/invoice/escrow, legal upload, notification API, auth production, atau RBAC production.
