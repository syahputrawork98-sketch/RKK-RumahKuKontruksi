# Role Data Source Status

Panduan mengenai sumber data (Data Source) yang digunakan oleh setiap role di frontend selama fase transisi CRUD.

## Kebijakan Umum (Policy)
Sesuai dengan strategi pengembangan *Local CRUD Integration*:
1. **DB-Backed Roles**: Role yang sudah memiliki modul backend lengkap **dilarang** menggunakan mock data sebagai sumber data utama di UI.
2. **Mock-First Roles**: Role yang belum memiliki modul backend diperbolehkan tetap menggunakan mock data hingga tahap migrasi backend-nya dimulai.

---

## DB-Backed Roles (Database-Driven)

### 1. Pengawas / Supervisor
Status: **Database-Backed v1**
- **Context**: `SupervisorPersonaContext`
- **Services**: `supervisorService`, `projectService`
- **Dependency**: Membutuhkan seleksi persona melalui `SupervisorSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Projects**: Seluruh statistik dan daftar proyek ditarik dari database berdasarkan `supervisorId`.
- **No Fallback**: Jika database kosong, tampilkan *Empty State* proyek, jangan tampilkan data mock.
- **Operational Status**: 
  - Verifikasi progres: **Local Workflow v1 / UI Consistency Stabilized**. Pengawas assigned memperbarui `Project.verifiedProgress` sebagai progress resmi (SOT).
  - Jurnal Mandor: **Local E2E Workflow v1 / UI Consistency Stabilized**. Pengawas review Weekly Journal secara administratif; approval jurnal tidak otomatis mengubah `Project.verifiedProgress`.
  - Laporan Mingguan Pengawas: **Local E2E Workflow v1 / UI Consistency Stabilized**. `SupervisorWeeklyReport.verifiedProgressSnapshot` hanya snapshot `Project.verifiedProgress` saat laporan dibuat.
  - Dokumentasi: **Shell / Backend Pending**.
  - Request material: **Local Stabilized / DB-Backed v1**.

### 2. Mandor / Foreman
Status: **Database-Backed v1**
- **Context**: `ForemanPersonaContext`
- **Services**: `foremanService`, `projectService`
- **Dependency**: Membutuhkan seleksi persona melalui `ForemanSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Projects**: Seluruh statistik dan daftar proyek ditarik dari database berdasarkan `foremanId`.
- **Operational Status**: 
  - Jurnal Mingguan: **Local E2E Workflow v1 / UI Consistency Stabilized**. Mandor membuat Weekly Journal dan mengisi `WeeklyJournal.claimedProgress` sebagai klaim non-resmi yang tidak mengubah `Project.verifiedProgress`.
  - Tugas harian, laporan harian, dokumentasi, kendala: **Shell / Backend Pending**.
  - Request material: **Local Stabilized / DB-Backed v1**.

### 3. Arsitek / Architect
Status: **Database-Backed v2 / Local E2E Workflow v1**
- **Context**: `ArchitectPersonaContext`
- **Services**: `architectService`, `designRequestService`, `designTenderService`
- **Dependency**: Membutuhkan seleksi persona melalui `ArchitectSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Profil**: Nama, email, spesialisasi, sertifikat, dan pengalaman ditarik dari database.
- **Design Workflow**: Design Request/Tender berstatus **Local E2E Workflow v1 / UI Consistency Stabilized**. Arsitek dapat melihat open tender lokal, submit bid lokal, serta melihat desain aktif dan riwayat lokal melalui backend localhost.
- **Hold / Placeholder**: Tahapan desain detail, file upload production, final approved package, dan evaluasi teknis masih Planned/Placeholder.
- **No Fallback**: Data profil utama dilarang fallback ke mock.

### 4. Admin
Status: **Database-Backed v2**
- **Services**: `projectService`, `customerService`, `supervisorService`, `foremanService`, `architectService`, `designRequestService`, `designTenderService`, `projectStageCommentService`
- **Dependency**: Tidak membutuhkan persona context khusus (Global Admin role).

**Behavior UI:**
- **Dashboard**: Statistik rill dari database, dengan sisa demo activity/stat yang masih boleh dibersihkan terpisah.
- **Manajemen Proyek**: CRUD Proyek (List, Detail, Create): **DB-Backed v1**.
- **Konsumen & Design Flow**: Customer data, Design Request management, tender publish/award, dan manual bridge to project draft/planning lokal: **Local E2E Workflow v1 / UI Consistency Stabilized**.
- **Project Bridge Boundary**: Convert-to-project hanya membuat project draft/planning lokal. Tidak ada aktivasi otomatis, kontrak legal, payment/escrow, upload file production, marketplace production, atau tender production.
- **Project Activation**: Readiness checklist dan aktivasi `Berjalan`: **DB-Backed v1 / Local Stabilized**.
- **Publikasi Konsumen**: Stage communication source/update flow tersedia untuk local verification; belum production RBAC.
- **RAB**: Data RAB (Read-First): **Partial**.
- **Penugasan Tim**: Data Pengawas dan Mandor: **DB-Backed v1**.
- **Operational Data**: 
  - Laporan Progress Terverifikasi, Review Laporan Pengawas: **Local E2E Workflow v1 / UI Consistency Stabilized**. Admin review/publish Weekly Report sebagai administrasi/publikasi ringkasan; bukan verifikator progress fisik resmi dan bukan pengganti Progress SOT.
  - Pembayaran: **Shell / Backend Pending**.
  - Request Material: **Local Stabilized / DB-Backed v1**.

---

### 5. Superadmin
Status: **Partial / DB-Backed Local CRUD**
- **Context**: `SuperadminPersonaContext`
- **Services**: `superadminService`, `adminService`, `supervisorService`, `foremanService`, `customerService`, `architectService`, `projectService`, `designRequestService`, `designTenderService`
- **Entity CRUD**: Superadmin entity CRUD lokal tersedia melalui `/api/superadmins` untuk list, create, update, dan soft delete.
- **Dashboard & Master Data**: Dashboard memakai global stats lokal, latest projects, dan data Superadmin; halaman data Admin, Superadmin, Konsumen, Pengawas, Mandor, dan Arsitek memakai service API lokal.
- **Read-Only Monitoring**: Data Pengajuan Desain membaca Design Request/Tender lokal secara global; Monitoring Proyek Global, Proyek Aktif Global, dan Laporan Progres Global membaca Project API untuk audit status lintas proyek termasuk `verifiedProgress`.
- **Weekly Report Monitoring**: Audit Laporan Pengawas membaca Supervisor Weekly Report lokal secara read-only; Superadmin tidak review, publish, atau mengubah progress resmi.
- **Operational Boundary**: Superadmin tidak menjadi operator workflow Admin/Pengawas. Aksi assign architect, publish tender, award bid, convert-to-project, dan aktivasi proyek tetap milik flow Admin; update progress resmi tetap milik Progress SOT Pengawas assigned.
- **Hold / Placeholder**: Kapasitas admin, payment global, eskalasi, audit lanjutan, pengaturan sistem, dan production RBAC masih **Partial / Shell / Hold**.
- **Auth Boundary**: Ini bukan auth production. Dev persona tetap digunakan; tidak ada JWT/session/password/RBAC production.

### 6. Konsumen
Status: **Database-Backed v1**
- **Services**: `customerService`, `designRequestService`, `projectService`, `projectStageService`, `projectStageCommentService`
- **Dashboard & Monitoring**: Dashboard, project filter by `customerId`, ProjectStage, `Project.verifiedProgress` resmi, dan ProjectStagePublicComment sudah API-backed untuk localhost. Konsumen hanya melihat progress resmi, bukan mengubah atau memverifikasi progress.
- **Design Request**: List dan create permintaan desain memakai API lokal berdasarkan persona Konsumen. Status flow: **Local E2E Workflow v1 / UI Consistency Stabilized**.
- **CRUD Profil**: Customer API (`GET /api/customers/:id`, `PATCH /api/customers/:id`) dan seed persona `customer-001` sampai `customer-003` sudah dipakai untuk view/update profil dev persona.
- **Stage Communication Panel**: Functional v1 untuk read path dan customer reply. Payload create/reply tetap membutuhkan `projectId` eksplisit dan `parentId` untuk reply Konsumen.
- **Hold**: Password, auth production, payment, dokumen/legal upload, notification production API, upload foto rill, dan RBAC production tetap ditunda.

---

## Aturan Penggunaan Mock Data
Untuk menghindari kerancuan data selama pengembangan:

1. **Role dengan Status DB-Backed v1**:
    - **TIDAK BOLEH**: Menggunakan mock data untuk halaman yang sudah ditandai DB-backed.
    - **ERROR HANDLING**: Jika API kosong atau error, tampilkan *Empty State* atau *Error State*, bukan fallback ke mock.
    - **MOCK EXCEPTION**: Hanya boleh digunakan untuk modul operasional yang memang belum memiliki backend final (ditandai *Experimental* atau *Backend Pending*).

1. **Mock Data untuk Pengawas/Mandor/Arsitek**:
    - **BOLEH**: Digunakan untuk *Seeding* database lokal (`npm run db:seed`).
    - **BOLEH**: Digunakan sebagai referensi struktur objek data di komponen UI.
    - **TIDAK BOLEH**: Digunakan sebagai fallback data jika API backend kosong atau error.
    - **TIDAK BOLEH**: Membuat mock fallback untuk operational pages seolah-olah data sudah nyata. Jika backend belum ada, UI boleh menampilkan placeholder/0/belum tersedia dengan catatan TODO.

2. **Mock Data untuk Role Lain**:
    - **BOLEH**: Digunakan sebagai sumber data utama hingga modul backend terkait diimplementasikan.

## Dev Sign-In & Persona Session

Selama local development, sistem menggunakan Dev Sign-In untuk memilih role dan persona dari database.

- **Dev Sign-In bukan auth produksi.**
- Tidak memakai password/JWT.
- Session disimpan di localStorage dengan key `rkk.devAuth`.
- **Legacy Persona Sync**: Persona yang dipilih disinkronkan ke key localStorage lama per role (misal: `rkk.dev.selectedSupervisorId`) agar context existing tetap bekerja.
- **Role Arsitek**: Wajib tersedia di pilihan Dev Sign-In dan menggunakan endpoint `/api/architects`.
- **Pola Utama**: Pengawas dan Mandor digunakan sebagai standar referensi implementasi.
- **Auth/JWT/RBAC tetap Postponed.**

## Error Handling Policy
- Jika API Backend mengembalikan error (misal: Server mati), UI harus menampilkan komponen `ErrorState` atau pesan error yang jelas, bukan kembali menampilkan mock data secara otomatis.
