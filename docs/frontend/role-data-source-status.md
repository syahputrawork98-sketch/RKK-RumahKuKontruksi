# Role Data Source Status

Panduan mengenai sumber data (Data Source) yang digunakan oleh setiap role di frontend selama fase transisi CRUD.

## Kebijakan Umum (Policy)
Sesuai dengan strategi pengembangan *Production-Ready Feature Completion Mode with Developer Persona Switcher*:
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
- **RAB-Linked Reports**: Laporan mingguan dan verifikasi progres mengacu pada struktur RAB (`RabItem`) untuk akurasi data lapangan.
- **No Fallback**: Jika database kosong, tampilkan *Empty State* proyek, jangan tampilkan data mock.
- **Operational Status**: 
  - Verifikasi progres: **Local Workflow v1 / Stabilized**. Progress Verification from RAB/Stage Context menampilkan konteks Stage, RAB, dan jurnal Mandor terbaru/ringkas; Pengawas assigned tetap mengisi `Project.verifiedProgress` secara manual sebagai progress resmi (SOT).
  - Project Stage Completion: **Local Workflow v1 / Stabilized**. Pengawas assigned membuka detail proyek dan menandai stage selesai/terverifikasi lokal; backend memvalidasi stage milik project dan Pengawas assigned, tanpa mengubah `Project.verifiedProgress`.
  - Post-Completion History & Experience Pack: **Local Workflow v1 / Stabilized**. Pengawas tetap bisa membaca histori project/laporan untuk project `Selesai`; Verifikasi Progress menjadi read-only dan action lapangan baru ditahan (Hard Guarded).
  - Jurnal Mandor: **Local E2E Workflow v1 / UI Consistency Stabilized**. Pengawas review Weekly Journal secara administratif; approval jurnal tidak otomatis mengubah `Project.verifiedProgress`.
  - Laporan Mingguan Pengawas: **Local E2E Workflow v1 / UI Consistency Stabilized**. `SupervisorWeeklyReport.verifiedProgressSnapshot` hanya snapshot `Project.verifiedProgress` saat laporan dibuat.
  - Certificate & Work Experience: **Local CRUD v1 / Stabilized**. Pengawas dapat mengelola Sertifikat Keahlian dan Riwayat Pengalaman Kerja lokal/manual memakai schema/backend existing tanpa schema/seed baru; data belum diverifikasi resmi dan delete memakai soft-delete endpoint existing.
  - Experience Read-Only: **Local Experience Summary / Stabilized**. Ringkasan pengalaman dibaca dari project aktif/selesai termasuk project `Selesai`, jurnal, aktivitas pekerjaan, laporan/review Pengawas, material request jika tersedia, dan `Project.verifiedProgress` read-only.
  - Dokumentasi: **Shell / Backend Pending**.
  - Visibility Guard: **Local Workflow v1 / Stabilized**. Kontrol `isVisibleToCustomer` aktif pada backend; Konsumen hanya dapat melihat laporan mingguan yang sudah dipublikasikan.
  - Sertifikasi resmi/legal, PDF certificate, legal validation, rating/scoring, dan reputation marketplace: **Hold / Not Production**. (Upload dokumen production: Planned for staged implementation).

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
  - Payment Status: **Local Payment Eligibility = Local Workflow v1 / Stabilized**. Mandor melihat status kelayakan pembayaran mingguan yang telah di-review oleh Admin secara lokal.
  - Sertifikasi resmi/legal, PDF certificate, legal validation, rating/scoring, dan reputation marketplace: **Hold / Not Production**. (Upload dokumen production: Planned for staged implementation).

### 3. Arsitek / Architect
Status: **Database-Backed v2 / Local E2E Workflow v1**
- **Context**: `ArchitectPersonaContext`
- **Services**: `architectService`, `designRequestService`, `designTenderService`
- **Dependency**: Membutuhkan seleksi persona melalui `ArchitectSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Profil**: Nama, email, spesialisasi, sertifikat, dan pengalaman ditarik dari database.
- Design Workflow: Design Request/Tender berstatus **Local E2E Workflow v1 / UI Consistency Stabilized**. Arsitek dapat melihat open tender lokal (local simulation), submit bid lokal, serta melihat desain aktif dan riwayat lokal melalui backend localhost. Action guards diperjelas sebagai simulasi lokal.
- **Design Collaboration & Revision v2**: **Local Workflow v2 / Stabilized**. Arsitek memiliki workspace khusus dengan visual tracker revisi major/minor, role-colored update thread, menerima curated instruction dari Admin, mencatat progress desain harian, dan menandai "Ready for Review" jika draf siap.
- **Hold / Placeholder**: Tahapan desain detail, final approved package, dan evaluasi teknis masih Planned/Placeholder. (File upload production: Cloud upload adapter allowed for staged implementation).
- **No Fallback**: Data profil utama dilarang fallback ke mock.

### 4. Admin
Status: **Database-Backed v2 / Local Dashboard Polish Stabilized**
- **Services**: `projectService`, `customerService`, `supervisorService`, `foremanService`, `architectService`, `designRequestService`, `designTenderService`, `projectStageCommentService`, `materialRequestService`
- **Dependency**: Tidak membutuhkan persona context khusus (Global Admin role).

**Behavior UI:**
- **Dashboard & Project Control**: **Local Dashboard Polish / Stabilized**. Admin memiliki summary operasional (active/preparation/finished projects) dan alert monitoring untuk pending requests/reports. Seluruh statistik ditarik dari database (Local DB Snapshot).
- **Manajemen Proyek**: CRUD Proyek (List, Detail, Create): **DB-Backed v1**.
- **Project Stage Completion**: **Local Workflow v1 / Stabilized** untuk aksi Pengawas assigned pada detail proyek.
- **Project Lifecycle Completion Pack**: **Local Workflow v1 / Stabilized**. Admin complete project lokal melalui closeout validation: project `Berjalan`, `Project.verifiedProgress` 100%, semua stage selesai, dan tidak ada Material Request aktif.
- **Post-Completion History & Experience Pack**: **Local Workflow v1 / Stabilized**. Admin dapat membaca Finished Project History dan status project `Selesai`; ini histori operasional lokal dan tidak mengubah Progress SOT.
- **Konsumen & Design Flow**: Customer data, Design Request management, tender publish/award, dan manual bridge to project draft/planning lokal: **Local E2E Workflow v1 / UI Consistency Stabilized**.
- **Project Bridge Boundary**: Convert-to-project hanya membuat project draft/planning lokal. Tidak ada aktivasi otomatis, kontrak legal otomatis, payment/escrow otomatis, marketplace production, atau tender production. (Payment, upload file, dan BAST helper allowed bertahap).
- **Project Activation**: Readiness checklist dan aktivasi `Berjalan`: **DB-Backed v1 / Local Stabilized**.
- **Publikasi Konsumen**: Stage communication source/update flow tersedia untuk local verification; belum production RBAC.
- **RAB**: Project RAB Builder untuk RAB Plan, kategori pekerjaan, dan item pekerjaan: **Local CRUD v1 / Admin Builder Stabilized**. RAB adalah baseline draft planning lokal, bukan kontrak final/payment/legal production.
- **Timeline Evidence & Work Item Thread v2**: **Local Workflow v1 / Stabilized**. Admin dapat memantau laporan Mandor per `RabItem`, memberikan review/note dengan visual **Role-Colored Evidence** (Mandor/Pengawas/Admin), dan mengontrol visibility (customer-visible/internal-only) pada timeline proyek.
- **Design Collaboration & Revision Governance v2**: **Local Workflow v2 / Stabilized**. Admin mengelola flow kolaborasi desain, memberikan curated instructions ke arsitek, merilis ringkasan desain ke konsumen (`admin_released_design_to_customer`), memantau batas revisi (3 major / 5 minor), dan memantau persetujuan lokal konsumen (`customer_design_approved`).
- **Visibility Preparation**: Admin memiliki label `Visibility: Customer-Visible Preparation` pada UI operasional untuk menandakan area kontrol visibilitas di masa depan.
- **Penugasan Tim**: Data Pengawas dan Mandor: **DB-Backed v1**.
- **Profile Team Data**: Mandor/Pengawas Certificate & Work Experience: **Local CRUD v1 / Stabilized** untuk data lokal/manual Sertifikat Keahlian dan Riwayat Pengalaman Kerja memakai schema/backend existing tanpa schema/seed baru; data belum diverifikasi resmi dan bukan legal certificate, PDF certificate, rating/scoring, atau reputation marketplace. (Upload dokumen production: Planned).
- **Operational Data**: 
  - Laporan Progress Terverifikasi, Review Laporan Pengawas: **Local E2E Workflow v1 / UI Consistency Stabilized**. Admin review/publish Weekly Report sebagai administrasi/publikasi ringkasan; bukan verifikator progress fisik resmi dan bukan pengganti Progress SOT.
  - Project selesai: **Reader/Status Local Workflow v1 / Stabilized**. Admin dapat membaca status selesai lokal; closeout/history tidak mengubah `Project.verifiedProgress` dan bukan sertifikat otomatis/resmi, atau marketplace reputation/scoring. (BAST/legal helper dan invoice/payment record allowed bertahap).
  - Pembayaran: **Shell / Backend Pending**.
  - Request Material: **Material Request from RAB Usage = Local Workflow v1 / Stabilized**. Admin menjalankan approval/status distribusi lokal setelah review Pengawas; tidak ada inventory production, supplier marketplace, purchase order production, atau procurement production. (Invoice/payment record allowed bertahap).

---

### 5. Superadmin
Status: **Database-Backed Local CRUD / Monitoring Polish Stabilized**
- **Context**: `SuperadminPersonaContext`
- **Services**: `superadminService`, `adminService`, `supervisorService`, `foremanService`, `customerService`, `architectService`, `projectService`, `designRequestService`, `designTenderService`
- **Entity CRUD (Implemented v2)**: Superadmin memiliki kendali penuh untuk create, update, dan delete persona semua role melalui **Direktori Persona Lokal** dengan safe-wording dan form disclaimer (No Auth/JWT).
- **Global Monitoring (Polish)**: **Local Monitoring Polish / Stabilized**. Dashboard monitoring global stats dan monitoring proyek lintas role sudah dilengkapi dengan summary operasional global dan notice "Local Monitoring Mode" yang eksplisit.
- **Governance Layer (v2 Stabilized)**:
    - **GovernanceNotice**: Pesan peringatan standar pada profil/pengaturan mengenai batasan "Local CRUD".
    - **Safe Action Terminology**: Menggunakan "Persona Lokal" untuk membedakan simulasi dari user production.
    - **Audit & Approval Center (Stabilized)**: Halaman "Log Aktivitas" Superadmin berfungsi sebagai pusat monitoring **Database Activity Logs** dan Antrian Approval Profil rill (Local DB-backed). Action buttons untuk review approval aktif.
- **Read-Only Monitoring**: Data Pengajuan Desain membaca Design Request/Tender lokal secara global; Monitoring Proyek Global (Simulasi), Proyek Aktif Global, stage completion lokal, dan Laporan Progres Global membaca Project API untuk audit status lintas proyek termasuk `verifiedProgress`.
- **Operational Boundary**: Superadmin tidak menjadi operator workflow Admin/Pengawas. Aksi assign architect, publish tender, award bid, convert-to-project, dan aktivasi proyek tetap milik flow Admin; update progress resmi tetap milik Progress SOT Pengawas assigned.
- **Hold / Placeholder**: Kapasitas admin, supplier marketplace, purchase order production, inventory production, eskalasi, audit lanjutan, pengaturan sistem, dan production RBAC masih **Partial / Shell / Hold**. (Payment global, invoice/payment/escrow: Planned for staged implementation).
- **Auth Boundary**: Ini bukan auth production. Dev persona tetap digunakan; tidak ada JWT/session/password/RBAC production.

### 6. Konsumen
Status: **Database-Backed v1 / Local Transparency Polish Stabilized**
- **Services**: `customerService`, `designRequestService`, `projectService`, `projectStageService`, `projectStageCommentService`
- **Dashboard & Project Overview**: **Local Transparency UX Polish / Stabilized**. Dashboard dan Monitoring Proyek menampilkan label "Progress Resmi (Verified Pengawas)" dan status operasional yang akurat.
- **Phase Separation**: **Local Transparency UX Polish / Stabilized**. Timeline desain dan timeline konstruksi dipisahkan secara visual.
- **Action Guard**: Pembayaran dan Download Dokumen berstatus **Demo Only / Planned for staged implementation**.
- **Timeline Evidence & Work Item Thread v2**: **Local Workflow v1 / Stabilized**. Konsumen melihat bukti pekerjaan nyata per item pekerjaan (`RabItem`) dengan visual **Role-Colored Evidence** (Biru=Mandor, Amber=Pengawas, Netral=Admin). Label "Progress Resmi (Verified Pengawas)" dipertegas.
- **Visibility Preparation (Hold)**: Penambahan disclaimer bahwa visibilitas item tertentu sedang dalam tahap persiapan dan belum dikontrol secara dinamis oleh Admin.
- **Design Collaboration & Revision v2**: **Local Workflow v2 / Stabilized**. Konsumen memantau riwayat desain, feedback, dan revisi (limit 3 major / 5 minor) melalui **Curated Design Timeline** yang hanya menampilkan milestones penting; Konsumen dapat memberikan **Local Approval Intent** jika desain sudah sesuai.
- **Design Request**: List dan create permintaan desain memakai API lokal berdasarkan persona Konsumen. Status flow: **Local E2E Workflow v1 / UI Consistency Stabilized**.
- **CRUD Profil**: Perubahan data profil sensitif (Email, HP, NIK) diarahkan ke **Profile Change Approval Queue** dan baru diterapkan ke database setelah disetujui Admin/Superadmin (Apply Local Workflow).
- **Stage Communication Panel**: **Functional v1 / Local Thread / Stabilized**. Admin sebagai official source; Konsumen sebagai replier; berbasis HTTP CRUD (Bukan WebSocket). Label "Local Thread (Non-Realtime)" digunakan untuk transparansi.
- **Hold**: Password, auth production, dan RBAC production tetap ditunda. (Payment dan dokumen/legal upload rill kini Planned for staged implementation).

## Product Direction Notes
Catatan ini adalah referensi arah produk yang sedang atau telah distabilkan untuk Local Workflow v1.
- **Timeline Evidence & Role Thread**: Menghubungkan aktivitas lapangan nyata (`RabItem`) ke visibility Konsumen.
- **Design Collaboration & Revision Limits**: Menjaga disiplin iterasi desain dengan batas 3 Major dan 5 Minor revisi secara lokal.
- **Separation of Concerns**: Timeline Desain dan Timeline Konstruksi tetap terpisah secara visual dan fungsional.

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

## Role Authority & Profile Governance (Implemented v1)
Arah kewenangan dan tata kelola profil sekarang telah diimplementasikan dalam versi Local CRUD:

### 1. Pembagian Kewenangan (v2 Stabilized)
- **Superadmin**: Pengelola direktori persona lokal (CRUD entitas simulasi).
- **Admin**: Operator proyek; dilarang mengelola akun role lain, hanya dapat mengubah profil sendiri.
- **Role Lain**: Hanya dapat mengubah profil sendiri dengan batasan field penting yang memerlukan validasi/log di masa depan.

### 2. GovernanceNotice & Safe Action Labels (v2 Stabilized)
- **GovernanceNotice**: Digunakan pada `Pengaturan` semua role dan `Profil` Konsumen untuk penegasan self-management.
- **Safe-Wording**: Seluruh aksi administratif menggunakan terminologi "Persona Lokal" dan dialog konfirmasi menyertakan informasi database `localhost` yang non-permanen.
- **Modal Disclaimer**: Setiap form penambahan persona mencantumkan pernyataan eksplisit bahwa sistem ini tidak melibatkan production auth (password/JWT).

### 3. Audit & Approval Placeholder (Hold)
- Halaman **Pusat Audit & Approval Lokal** (Log Aktivitas) aktif sebagai placeholder/planned workflow untuk monitoring aktivitas operasional di masa depan.
