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
  - Verifikasi progres: **Local Workflow v1 / Stabilized**. Progress Verification from RAB/Stage Context menampilkan konteks Stage, RAB, dan jurnal Mandor terbaru/ringkas; Pengawas assigned tetap mengisi `Project.verifiedProgress` secara manual sebagai progress resmi (SOT).
  - Project Stage Completion: **Local Workflow v1 / Stabilized**. Pengawas assigned membuka detail proyek dan menandai stage selesai/terverifikasi lokal; backend memvalidasi stage milik project dan Pengawas assigned, tanpa mengubah `Project.verifiedProgress`.
  - Post-Completion History & Experience Pack: **Local Workflow v1 / Stabilized**. Pengawas tetap bisa membaca histori project/laporan untuk project `Selesai`; Verifikasi Progress menjadi read-only dan action lapangan baru ditahan.
  - Jurnal Mandor: **Local E2E Workflow v1 / UI Consistency Stabilized**. Pengawas review Weekly Journal secara administratif; approval jurnal tidak otomatis mengubah `Project.verifiedProgress`.
  - Laporan Mingguan Pengawas: **Local E2E Workflow v1 / UI Consistency Stabilized**. `SupervisorWeeklyReport.verifiedProgressSnapshot` hanya snapshot `Project.verifiedProgress` saat laporan dibuat.
  - Certificate & Work Experience: **Local CRUD v1 / Stabilized**. Pengawas dapat mengelola Sertifikat Keahlian dan Riwayat Pengalaman Kerja lokal/manual memakai schema/backend existing tanpa schema/seed baru; data belum diverifikasi resmi dan delete memakai soft-delete endpoint existing.
  - Experience Read-Only: **Local Experience Summary / Stabilized**. Ringkasan pengalaman dibaca dari project aktif/selesai termasuk project `Selesai`, jurnal, aktivitas pekerjaan, laporan/review Pengawas, material request jika tersedia, dan `Project.verifiedProgress` read-only.
  - Dokumentasi: **Shell / Backend Pending**.
  - Request material: **Material Request from RAB Usage = Local Workflow v1 / Stabilized**. Pengawas review kebutuhan material dan kesesuaian lapangan pada project aktif/`Berjalan`; approval tetap menjaga quantity check terhadap remaining RAB dan tidak mengubah Progress SOT.
  - Sertifikasi resmi/legal, upload dokumen production, PDF certificate, legal validation, rating/scoring, dan reputation marketplace: **Hold / Not Production**.

### 2. Mandor / Foreman
Status: **Database-Backed v1**
- **Context**: `ForemanPersonaContext`
- **Services**: `foremanService`, `projectService`
- **Dependency**: Membutuhkan seleksi persona melalui `ForemanSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Projects**: Seluruh statistik dan daftar proyek ditarik dari database berdasarkan `foremanId`.
- **Operational Status**: 
  - Jurnal Mingguan: **Local E2E Workflow v1 / UI Consistency Stabilized**. Mandor membuat Weekly Journal dan mengisi `WeeklyJournal.claimedProgress` sebagai klaim non-resmi yang tidak mengubah `Project.verifiedProgress`. Aktivitas jurnal dapat mereferensikan `projectStageId` dan `rabItemId` secara opsional untuk konteks kerja lokal.
  - Post-Completion History & Experience Pack: **Local Workflow v1 / Stabilized**. Detail project Mandor menampilkan banner selesai untuk project `Selesai`; Mandor tetap bisa membaca histori project/jurnal/material request, tetapi Lapor Progres dan action lapangan baru ditahan.
  - Certificate & Work Experience: **Local CRUD v1 / Stabilized**. Mandor dapat mengelola Sertifikat Keahlian dan Riwayat Pengalaman Kerja lokal/manual memakai schema/backend existing tanpa schema/seed baru; data belum diverifikasi resmi dan delete memakai soft-delete endpoint existing.
  - Experience Read-Only: **Local Experience Summary / Stabilized**. Ringkasan pengalaman dibaca dari project aktif/selesai termasuk project `Selesai`, jurnal Mandor, aktivitas pekerjaan, material request jika tersedia, dan `Project.verifiedProgress` read-only.
  - Tugas harian, laporan harian, dokumentasi, kendala: **Shell / Backend Pending**.
  - Request material: **Material Request from RAB Usage = Local Workflow v1 / Stabilized**. Mandor memilih project aktif/`Berjalan`, memilih stage, dapat memilih `RabItem` sebagai baseline material, melihat total RAB qty/approved qty/remaining qty, atau membuat manual/outside-RAB request dengan note/alasan wajib; project `Selesai` ditahan.
  - Sertifikasi resmi/legal, upload dokumen production, PDF certificate, legal validation, rating/scoring, dan reputation marketplace: **Hold / Not Production**.

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
- **Project Stage Completion**: **Local Workflow v1 / Stabilized** untuk aksi Pengawas assigned pada detail proyek; bukan progress resmi proyek dan tidak memanggil `recalculateProjectVerifiedProgress`.
- **Project Lifecycle Completion Pack**: **Local Workflow v1 / Stabilized**. Admin complete project lokal melalui closeout validation: project `Berjalan`, `Project.verifiedProgress` 100%, semua stage selesai, dan tidak ada Material Request aktif.
- **Post-Completion History & Experience Pack**: **Local Workflow v1 / Stabilized**. Admin dapat membaca Finished Project History dan status project `Selesai`; ini histori operasional lokal dan tidak mengubah Progress SOT.
- **Konsumen & Design Flow**: Customer data, Design Request management, tender publish/award, dan manual bridge to project draft/planning lokal: **Local E2E Workflow v1 / UI Consistency Stabilized**.
- **Project Bridge Boundary**: Convert-to-project hanya membuat project draft/planning lokal. Tidak ada aktivasi otomatis, kontrak legal, payment/escrow, upload file production, marketplace production, atau tender production.
- **Project Activation**: Readiness checklist dan aktivasi `Berjalan`: **DB-Backed v1 / Local Stabilized**.
- **Publikasi Konsumen**: Stage communication source/update flow tersedia untuk local verification; belum production RBAC.
- **RAB**: Project RAB Builder untuk RAB Plan, kategori pekerjaan, dan item pekerjaan: **Local CRUD v1 / Admin Builder Stabilized**. RAB adalah baseline draft planning lokal, bukan kontrak final/payment/legal production.
- **Product Direction - Consumer Timeline Evidence**: Planned direction berikutnya adalah menghubungkan `RabCategory`/kategori pekerjaan, `RabItem`/item pekerjaan, laporan Mandor, review Pengawas/Admin, visibility control, dan update customer-visible. Admin/Pengawas perlu kontrol internal-only vs customer-visible; keputusan final visibility dikunci Room Chat 00.
- **Penugasan Tim**: Data Pengawas dan Mandor: **DB-Backed v1**.
- **Profile Team Data**: Mandor/Pengawas Certificate & Work Experience: **Local CRUD v1 / Stabilized** untuk data lokal/manual Sertifikat Keahlian dan Riwayat Pengalaman Kerja memakai schema/backend existing tanpa schema/seed baru; data belum diverifikasi resmi dan bukan legal certificate, upload dokumen production, PDF certificate, rating/scoring, atau reputation marketplace.
- **Operational Data**: 
  - Laporan Progress Terverifikasi, Review Laporan Pengawas: **Local E2E Workflow v1 / UI Consistency Stabilized**. Admin review/publish Weekly Report sebagai administrasi/publikasi ringkasan; bukan verifikator progress fisik resmi dan bukan pengganti Progress SOT.
  - Project selesai: **Reader/Status Local Workflow v1 / Stabilized**. Admin dapat membaca status selesai lokal; closeout/history tidak mengubah `Project.verifiedProgress` dan bukan BAST/legal handover, invoice/payment/escrow, sertifikat otomatis/resmi, atau marketplace reputation/scoring.
  - Pembayaran: **Shell / Backend Pending**.
  - Request Material: **Material Request from RAB Usage = Local Workflow v1 / Stabilized**. Admin menjalankan approval/status distribusi lokal setelah review Pengawas; tidak ada inventory production, supplier marketplace, purchase order production, invoice/payment/escrow, atau procurement production.

---

### 5. Superadmin
Status: **Partial / DB-Backed Local CRUD**
- **Context**: `SuperadminPersonaContext`
- **Services**: `superadminService`, `adminService`, `supervisorService`, `foremanService`, `customerService`, `architectService`, `projectService`, `designRequestService`, `designTenderService`
- **Entity CRUD**: Superadmin entity CRUD lokal tersedia melalui `/api/superadmins` untuk list, create, update, dan soft delete.
- **Dashboard & Master Data**: Dashboard memakai global stats lokal, latest projects, dan data Superadmin; halaman data Admin, Superadmin, Konsumen, Pengawas, Mandor, dan Arsitek memakai service API lokal.
- **Read-Only Monitoring**: Data Pengajuan Desain membaca Design Request/Tender lokal secara global; Monitoring Proyek Global, Proyek Aktif Global, stage completion lokal, dan Laporan Progres Global membaca Project API untuk audit status lintas proyek termasuk `verifiedProgress`.
- **Completion Monitoring**: Project Lifecycle Completion Pack berstatus **Local Workflow v1 / Stabilized** untuk reader status selesai lintas proyek; Superadmin read-only dan tidak menjalankan closeout, legal handover, payment, atau sertifikat resmi.
- **Finished Project History Reader**: Post-Completion History & Experience Pack berstatus **Local Workflow v1 / Stabilized** untuk read-only histori project `Selesai`; bukan BAST/legal handover, invoice/payment/escrow, sertifikat otomatis/resmi, atau marketplace reputation/scoring.
- **Weekly Report Monitoring**: Audit Laporan Pengawas membaca Supervisor Weekly Report lokal secara read-only; Superadmin tidak review, publish, atau mengubah progress resmi.
- **Material Request Monitoring**: Material Request from RAB Usage berstatus **Local Workflow v1 / Stabilized** untuk read-only monitoring lintas proyek; Superadmin tidak review, approval, distribusi, confirm received, atau mengubah progress resmi.
- **Operational Boundary**: Superadmin tidak menjadi operator workflow Admin/Pengawas. Aksi assign architect, publish tender, award bid, convert-to-project, dan aktivasi proyek tetap milik flow Admin; update progress resmi tetap milik Progress SOT Pengawas assigned.
- **Hold / Placeholder**: Kapasitas admin, payment global, invoice/payment/escrow, supplier marketplace, purchase order production, inventory production, eskalasi, audit lanjutan, pengaturan sistem, dan production RBAC masih **Partial / Shell / Hold**.
- **Auth Boundary**: Ini bukan auth production. Dev persona tetap digunakan; tidak ada JWT/session/password/RBAC production.

### 6. Konsumen
Status: **Database-Backed v1**
- **Services**: `customerService`, `designRequestService`, `projectService`, `projectStageService`, `projectStageCommentService`
- **Dashboard & Monitoring**: Dashboard, project filter by `customerId`, ProjectStage, `Project.verifiedProgress` resmi, dan ProjectStagePublicComment sudah API-backed untuk localhost. Konsumen hanya melihat progress resmi, bukan mengubah atau memverifikasi progress.
- **Stage Status Boundary**: Stage selesai/terverifikasi lokal dapat tampil sebagai status tahapan, tetapi bukan progress resmi proyek; `Project.verifiedProgress` tetap berasal dari Verifikasi Progres.
- **Completion Reader**: Status project selesai lokal dapat dibaca Konsumen sebagai reader status; ini bukan BAST/legal handover, invoice/payment/escrow, atau sertifikat resmi.
- **Finished Project Timeline**: Timeline Konsumen menampilkan `Pekerjaan Selesai` untuk project `Selesai` sebagai histori operasional lokal; tidak mengubah Progress SOT.
- **Product Direction - Timeline Evidence Thread**: Planned direction, belum implemented/stabilized. Timeline Konsumen perlu menampilkan kategori pekerjaan, item pekerjaan/RAB item, status/proses, catatan hasil, foto/bukti jika nanti tersedia, dan comment thread role-colored bila customer-visible. Layout diarahkan kategori di area utama/kiri, detail item di area detail, lalu klik item membuka progress, catatan, hasil, dan thread berbasis item pekerjaan.
- **Design Request**: List dan create permintaan desain memakai API lokal berdasarkan persona Konsumen. Status flow: **Local E2E Workflow v1 / UI Consistency Stabilized**.
- **CRUD Profil**: Customer API (`GET /api/customers/:id`, `PATCH /api/customers/:id`) dan seed persona `customer-001` sampai `customer-003` sudah dipakai untuk view/update profil dev persona.
- **Stage Communication Panel**: Functional v1 untuk read path dan customer reply. Payload create/reply tetap membutuhkan `projectId` eksplisit dan `parentId` untuk reply Konsumen.
- **Hold**: Password, auth production, payment, dokumen/legal upload, notification production API, upload foto rill, dan RBAC production tetap ditunda.

## Product Direction Notes
- Consumer Timeline Work Evidence & Field Thread adalah **planned direction / next workflow candidate**, bukan fitur selesai.
- Thread komentar diarahkan role-colored untuk Mandor, Pengawas, Admin, dan Konsumen jika komentar Konsumen nanti dibuka.
- Bentuknya seperti group chat/thread berbasis item pekerjaan, bukan chat bebas global dan bukan realtime chat/websocket dulu.
- Visibility mendukung internal-only dan customer-visible; Admin/Pengawas dapat mengontrol catatan yang tampil ke Konsumen.
- Batasan tetap berlaku: bukan upload production besar, bukan legal evidence/BAST, bukan dispute/payment/legal workflow, bukan customer chat production aktif, dan tidak mengubah Progress SOT.

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
