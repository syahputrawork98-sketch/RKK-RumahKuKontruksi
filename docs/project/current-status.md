# Current Status - RKK RumahKu Konstruksi

## Status Umum
- **Phase**: Local Development CRUD Integration Phase
- **Environment**: Localhost only
- **Production Ready**: No
- **Auth System**: NOT IMPLEMENTED (Intentionally postponed)
- **Persona Switcher**: Dev-only persona selector is used for role simulation. This system is local-only and does not use JWT, sessions, or passwords.
- **Fokus Saat Ini**: Stabilisasi Admin Dashboard (DB-backed statistics), Stage Communication (Non-realtime HTTP thread), dan Cross-Role UI consistency (Hold-State Cleanup). Seluruh label "Live Sync" atau "Real-time" telah diganti menjadi "Local DB Snapshot" untuk transparansi operasional lokal.
- **Curated Seed Data**: Database lokal telah dibersihkan dan diisi dengan skenario demo yang utuh (Design Flow, Project Bridge, Active Construction, Finished Project, Superadmin Stats, stage/progress/comment demo). Gunakan `npm run db:seed` (alias dari `node prisma/seed.js`) untuk reset data testing.


## Backend Status (Local API)

| Module | Status | Notes |
| :--- | :--- | :--- |
| **Health Check** | DONE | `/api/health` |
| **Customers** | CRUD Available | Local API CRUD; profile Konsumen sudah API-backed via dev persona |
| **Projects** | Local Workflow v1 / Stabilized | Full Lifecycle lokal: create/edit/detail/assignment, activation, stage completion, dan closeout lokal |
| **Project Stages**| Local Workflow v1 / Stabilized | Plan-based stages plus Project Stage Completion lokal oleh Pengawas assigned |
| **RAB** | Local CRUD v1 / Admin Builder Stabilized | Project RAB Builder untuk RAB Plan, RabCategory, dan RabItem sebagai baseline draft planning lokal |
| **Supervisors** | CRUD Available | Profile plus Certificate & Work Experience Local CRUD v1 stabilized; Experience Read-Only summary tetap tersedia |
| **Foremen** | CRUD Available | Profile plus Certificate & Work Experience Local CRUD v1 stabilized; Experience Read-Only summary tetap tersedia |
| **Architects** | CRUD Available | Profile, Certificates, and Experiences included |
| **Auth/Login** | NOT IMPLEMENTED | Using Dev Persona Selector on frontend |
| **Weekly Journals** | Local E2E Workflow v1 / UI Consistency Stabilized | Mandor creates weekly journal with `claimedProgress` as non-official claim; Pengawas review is administrative only |
| **Weekly Reports** | Local E2E Workflow v1 / UI Consistency Stabilized | Pengawas creates report with `verifiedProgressSnapshot`; Admin review/publish is administrative/customer-summary flow |
| **Project Activation**| DONE | Readiness Checklist & Activation Gate (Berjalan) |
| **Project Stage Completion** | Local Workflow v1 / Stabilized | Pengawas assigned menandai stage selesai/terverifikasi lokal; tidak mengubah `Project.verifiedProgress` |
| **Project Lifecycle Completion Pack** | Local Workflow v1 / Stabilized | Admin complete project lokal, post-completion guard Mandor/Pengawas, dan reader status selesai |
| **Post-Completion History & Experience Pack** | Local Workflow v1 / Stabilized | Finished Project History Reader, completed project guard Mandor/Pengawas, dan Experience Summary from Completed Projects |
| **Material Requests**| Local Workflow v1 / Stabilized | Material Request from RAB Usage lokal: Mandor bisa memakai RabItem sebagai baseline material, Pengawas review, Admin distribusi lokal, Mandor confirm received |
| **Verification** | Local Workflow v1 / Stabilized | Progress Verification from RAB/Stage Context; `Project.verifiedProgress` tetap progress resmi dan diisi manual oleh Pengawas assigned |
| **Mandor/Pengawas Certificate & Work Experience** | Local CRUD v1 / Stabilized | Data sertifikat keahlian dan riwayat pengalaman kerja lokal/manual; bukan sertifikasi legal atau reputation marketplace |
| **Design Request** | Local E2E Workflow v1 / UI Consistency Stabilized | Konsumen create/list permintaan desain lokal; Admin review/manage workflow lokal; Superadmin read-only monitoring |
| **Timeline Evidence / Field Thread** | Local Workflow v1 / Stabilized | Laporan Mandor per RabItem (Work Item Thread), review Pengawas/Admin, visibility preparation (customer-visible), dan role-colored thread v2 |
| **Design Tender** | Local Workflow v1 / Stabilized | Local simulation polished; status/action guard clearer; bukan marketplace production |
| **Admin & Superadmin Control** | Local Dashboard/Governance Polish | Admin Operational Summary (DB-backed activity) & Superadmin Direktori Persona Lokal; status planning/active/finished and action safe-wording stabilized |
| **Konsumen Transparency Polish** | Local Transparency UX Polish / Stabilized | Consumer Project Overview, payment/doc demo hold, official verified progress, and Stage Communication viewer (HTTP thread) |
| **Design Collaboration & Revision** | Local Workflow v2 / Stabilized | Design thread role-colored, revision tracker (3 Major / 5 Minor), enforcement limit, and Arsitek Workspace polish |
| **Local Governance & Persona Control** | Local Persona Governance v2 / Stabilized | Standardized Direktori Persona Lokal for Superadmin, modal disclaimer (No Auth/JWT), and self-profile governance via GovernanceNotice |
| **Governance Hold & Visibility Preparation** | Local Hold/Preparation / Stabilized | Pusat Audit & Approval Lokal (Hold), Visibility Preparation Labels (Hold), and Action Guards for Finished Projects |
| **Stage Communication Source Flow** | Local Workflow v1 / Stabilized | Admin sebagai sumber update resmi; Konsumen sebagai replier; berbasis HTTP CRUD (Bukan WebSocket) |

## Operational Modules Progress
Modul operasional inti (Progress Monitoring, Journal Mandor, Report Pengawas) telah dipindahkan ke database (DB-Backed v1). Progress Verification from RAB/Stage Context sudah berstatus **Local Workflow v1 / Stabilized** dan tetap mengikuti prinsip Progress SOT: `Project.verifiedProgress` adalah sumber progress resmi, `WeeklyJournal.claimedProgress` adalah klaim Mandor non-resmi, dan `SupervisorWeeklyReport.verifiedProgressSnapshot` hanya snapshot progress resmi saat laporan dibuat. RAB, ProjectStage, dan Jurnal Mandor menjadi konteks pendukung, bukan penghitung progress otomatis. Review/approval Weekly Journal tidak otomatis mengubah `Project.verifiedProgress`; review/publish Weekly Report oleh Admin adalah administrasi/publikasi ringkasan, bukan verifikasi fisik progress. Pengawas assigned tetap pihak yang memperbarui progress fisik resmi secara manual lewat Progress SOT flow. Konsumen melihat progress resmi, dan Superadmin hanya read-only monitoring.

## Progress Verification Context
Progress Verification from RAB/Stage Context berstatus **Local Workflow v1 / Stabilized** untuk Local Development CRUD Integration. Alurnya: Pengawas memilih project aktif, sistem menampilkan konteks pendukung Stage, RAB, dan jurnal Mandor terbaru/ringkas untuk UI support, lalu Pengawas tetap mengisi `verifiedProgress` secara manual dan submit melalui `PATCH /projects/:id/verify-progress`. Backend menyimpan `Project.verifiedProgress`, `verifiedProgressUpdatedAt`, `verifiedProgressById`, dan `ProgressVerificationLog`.

Jika `stageId` dikirim, backend memvalidasi bahwa Stage tersebut milik project yang sedang diverifikasi. RAB context membaca approved RAB terlebih dahulu dan fallback ke latest RAB untuk kebutuhan local development/planning jika belum ada approved RAB. RAB, ProjectStage, Jurnal Mandor, dan review jurnal tidak otomatis mengubah `Project.verifiedProgress`; tidak ada progress automation production dan tidak ada perubahan aturan Progress SOT.

## Project Stage Completion Context
Project Stage Completion sudah berstatus **Local Workflow v1 / Stabilized** untuk Local Development CRUD Integration. Alurnya: Pengawas assigned membuka detail proyek, menandai stage sebagai selesai lokal, lalu backend memvalidasi stage milik project dan Pengawas tersebut assigned ke project. Jika valid, stage berubah menjadi selesai/terverifikasi lokal melalui `PATCH /projects/:projectId/stages/:stageId`.

Stage completion bukan progress resmi proyek dan tidak mengubah `Project.verifiedProgress`; progress resmi tetap melalui Verifikasi Progres. Flow ini tidak memanggil `recalculateProjectVerifiedProgress`, tidak mengubah `RabItem.progress`, tidak otomatis menyelesaikan Material Request, dan tidak membuka payment, legal, auth, atau deployment production.

## Project Lifecycle Completion Context
Project Lifecycle Completion Pack sudah berstatus **Local Workflow v1 / Stabilized** untuk Local Development CRUD Integration. Batch ini mencakup tiga fitur utama: Admin complete project lokal, Mandor/Pengawas post-completion guard, dan reader status selesai untuk Konsumen/Admin/Superadmin. Complete project dijalankan Admin melalui `PATCH /projects/:id/complete`.

## Admin & Superadmin Operational Control Polish
**Admin & Superadmin Operational Control Polish** sudah berstatus **Local Dashboard/Monitoring Polish / Stabilized**.
- **Admin**: Memiliki "Operational Summary" yang mengagregasi jumlah proyek (Persiapan/Berjalan/Selesai) dan alert untuk Material Request atau Report yang perlu di-review.
- **Superadmin**: Memiliki "Global Monitoring Summary" untuk oversight lintas proyek secara global dengan label "Local Monitoring Mode" yang eksplisit.
- **Status Clarity**: Perbedaan antara fase planning, aktif konstruksi, dan histori (selesai) dipertegas melalui visual summary dan status badge yang konsisten.

## Konsumen Project Transparency & Detail Polish
**Konsumen Project Transparency & Detail Polish** sudah berstatus **Local Transparency UX Polish / Stabilized**.
- **Project Overview**: Tampilan hero proyek kini lebih informatif dengan label "Progress Resmi (Verified Pengawas)" dan status operasional yang lebih akurat.
- **Design vs Construction Separation**: Timeline desain dan timeline konstruksi dipisahkan secara visual (Phase Selector) untuk membantu Konsumen membedakan antara perencanaan (Brief/Revisi) dan implementasi lapangan.
- **Official Progress Logic**: Progress yang tampil adalah data resmi dari Pengawas assigned; sistem memberikan disclaimer bahwa progress didasarkan pada verifikasi kualitas fisik, bukan sekadar klaim Mandor.
- **Completion History**: Proyek yang telah selesai tampil dengan visual histori khusus, menandakan berakhirnya fase operasional konstruksi lokal.

Closeout lokal memvalidasi project harus `Berjalan`, `Project.verifiedProgress` wajib 100%, semua stage wajib selesai, dan tidak ada Material Request aktif. Jika closeout valid, project masuk status selesai lokal; Mandor/Pengawas tetap bisa membaca histori, tetapi action lapangan baru ditahan setelah project selesai. Closeout lokal tidak mengubah `Project.verifiedProgress`; progress resmi tetap berasal dari Verifikasi Progres. Ini bukan BAST/legal handover, bukan invoice/payment/escrow, bukan sertifikat resmi, dan bukan lifecycle/legal production.

## Post-Completion History & Experience Context
Post-Completion History & Experience Pack sudah berstatus **Local Workflow v1 / Stabilized** untuk Local Development CRUD Integration. Batch ini mencakup tiga fitur utama: Finished Project History Reader, Completed Project Guard for Mandor/Pengawas, dan Experience Summary from Completed Projects. Setelah project `Selesai`, histori operasional lokal tetap bisa dibaca oleh role terkait, sementara aksi lapangan baru ditahan.

Backend guard menjaga project selesai tetap read-only untuk workflow lapangan: `verifyProjectProgress` menolak project `Selesai`, `updateProjectStage` menolak project `Selesai`, dan update Weekly Journal ditahan jika parent project sudah selesai. Frontend guard menampilkan Verifikasi Progress Pengawas sebagai read-only untuk project `Selesai`; detail project Mandor menampilkan banner selesai; Lapor Progres ditahan; dan Material Request Mandor menahan project `Selesai`. Reader menampilkan status `Pekerjaan Selesai` pada timeline Konsumen, dan project `Selesai` masuk ke pengalaman lokal Mandor/Pengawas.

Pack ini adalah histori operasional lokal, bukan BAST/legal handover, bukan invoice/payment/escrow, bukan sertifikat otomatis/resmi, dan bukan marketplace reputation/scoring. Pack ini tidak mengubah `Project.verifiedProgress` dan tidak mengubah aturan Progress SOT.

Material Request from RAB Usage juga tidak mengubah Progress SOT: tidak ada update otomatis ke `Project.verifiedProgress`, `ProjectStage.progress`, atau `RabItem.progress`.

## Timeline Evidence & Field Thread Context (Work Item Thread v2)
**Timeline Evidence / Field Thread** sudah berstatus **Local Workflow v1 / Stabilized** untuk Local Development CRUD Integration. Alurnya: `Project` -> `RAB Plan` -> `RabCategory` -> `RabItem` -> Laporan Mandor per item pekerjaan -> Komentar/Review Pengawas atau Admin.

Timeline ini mengarahkan Konsumen ke bukti pekerjaan nyata per item pekerjaan (Work Item Evidence Thread). Polish v2 mencakup:
- **Official Progress Guard**: Penambahan evidence/comment tidak mengubah `Project.verifiedProgress`; progress resmi tetap melalui Verifikasi Progres manual oleh Pengawas assigned.
- **Timeline Stability**: Perbaikan crash pada `TLProyek.jsx` (blocker fix) dan stabilisasi mapping `RabItem` ke timeline.
- **Visibility Preparation**: Penambahan label `Visibility: Customer-Visible Preparation` pada detail pekerjaan dan jurnal untuk transparansi rencana kontrol Admin di masa depan.

## Design Collaboration & Revision Limit Context (v2)
**Design Collaboration Timeline & Revision Limit** sudah berstatus **Local Workflow v2 / Stabilized** untuk Local Development CRUD Integration. Alurnya: `Design Request` -> Timeline kolaborasi polished (Konsumen, Arsitek, Admin) -> Update thread role-colored -> Permintaan revisi.

Fitur ini menerapkan **Revision Limits & Workspace Polish** v2:
- **Revisi Besar (Major)**: Maksimal 3x (Perubahan konsep, fasad utama, layout besar).
- **Revisi Kecil (Minor)**: Maksimal 5x (Warna finishing, detail plafon, geser pintu minor).
- **Arsitek Workspace v2**: Arsitek memiliki workspace dengan visual tracker limit revisi; monitoring status desain lebih intuitif.
- **Konsumen Design Timeline**: Tampilan timeline lebih bersih dengan role-colored labels dan disclaimer simulasi revisi yang jelas.
- **Admin Design Oversight**: Admin memiliki kontrol oversight untuk memantau penggunaan limit revisi dan memberikan peringatan/bypass secara manual.
- **Hold Logic**: Jika limit habis, revisi berikutnya ditahan (**Hold**) dan memerlukan intervensi Admin.

Data riwayat disimpan dalam `DesignRequestHistory`, dan jumlah revisi dicatat di `DesignRequest.majorRevisionCount` serta `DesignRequest.minorRevisionCount`. Ini adalah local development workflow, bukan kontrak legal, bukan payment/addendum production, bukan upload production, bukan realtime chat, dan tidak mengubah Progress SOT konstruksi.

## Mandor/Pengawas Certificate & Work Experience
Mandor/Pengawas Certificate & Work Experience sudah berstatus **Local CRUD v1 / Stabilized** untuk Local Development CRUD Integration. Mandor dan Pengawas dapat mengelola data profil lokal/manual berupa Sertifikat Keahlian dan Riwayat Pengalaman Kerja memakai schema/backend existing, tanpa schema baru dan tanpa seed baru pada batch docs ini. Delete memakai soft-delete endpoint existing.

Data ini belum diverifikasi resmi dan bukan legal certificate, bukan upload dokumen production, bukan PDF certificate, bukan rating/scoring/reputation marketplace, serta bukan dasar sertifikasi production. Experience Read-Only Summary dari data operasional lokal tetap tersedia sebagai ringkasan terpisah: project aktif/selesai termasuk project `Selesai`, jurnal Mandor, aktivitas pekerjaan, review/laporan Pengawas, material request jika tersedia, dan `Project.verifiedProgress` sebagai data resmi read-only. Certificate & Work Experience CRUD maupun Experience Summary tidak mengubah `Project.verifiedProgress` dan tidak mengubah aturan Progress SOT.

## Design to Project Draft Demo
Design Request -> Tender -> Project Draft sudah berstatus **Local Demo Completion / Local E2E Workflow v1** untuk Local Development CRUD Integration. Alur lokalnya: Konsumen membuat Design Request lokal, Admin review/manage dan publish tender lokal, Arsitek submit bid lokal, Admin award bid lokal, request masuk fase `assigned`, lalu request dapat masuk fase `approved` sesuai workflow lokal dan dikonversi Admin menjadi Project draft/planning. Project hasil convert tetap berstatus `planning`, tidak otomatis aktif, dan aktivasi tetap lewat Project Activation flow terpisah. Convert tidak otomatis membuat RAB, stage, penugasan tim production, payment/escrow/invoice, kontrak legal, upload file production, marketplace production, tender production, auth production, atau RBAC production.

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
- Project Bridge otomatis ke proyek aktif (Bridge hanya membuat draft/planning lokal).
- Sistem Pembayaran (Escrow/Payment Gateway).
- Dokumen Legal Otomatis (SPK, Kontrak).
- Upload dokumen/file production.
- Notifikasi production API.
- Auth Production (Login/Register rill masih ditunda).

## Frontend Role Status

| Role | Data Source | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Pengawas** | Backend/Database | DB-Backed v1 | Progress SOT dan Weekly Report Local E2E Workflow v1; Pengawas assigned update `Project.verifiedProgress`, membuat Weekly Report dengan `verifiedProgressSnapshot`, dan review jurnal Mandor secara administratif |
| **Mandor** | Backend/Database | DB-Backed v1 | Weekly Journal Local E2E Workflow v1; `WeeklyJournal.claimedProgress` tetap klaim non-resmi dan tidak mengubah `Project.verifiedProgress` |
| **Arsitek** | Backend/Database | DB-Backed v2 | Design Request/Tender Local E2E Workflow v1: open tender lokal, submit bid lokal, desain aktif, dan riwayat lokal |
| **Admin** | Backend/Database | DB-Backed v2 | Design Request/Tender Local E2E Workflow v1; Weekly Report review/publish adalah administrasi/publikasi ringkasan, bukan verifikasi fisik atau pengganti Progress SOT |
| **Superadmin** | Backend/Partial | DB-Backed Local CRUD | Dashboard global stats, master data, read-only Design Request/Tender and Weekly Report monitoring, global project/progress monitoring use local APIs; operational design/progress actions, RBAC, auth production, payment, and system settings remain Hold/Placeholder |
| **Konsumen** | Backend/Database | DB-Backed v1 | Dashboard, Profil, Design Request create/list lokal, Project Monitoring/Timeline, dan Stage Communication Panel sudah API-backed; progress yang tampil memakai `Project.verifiedProgress` resmi |
| **Admin Gap** | Analyzed | `admin_gap_analysis.md` | Audit of all Admin pages for DB integration |

## Next Recommended Actions
1. **Local Audit Log v1**: Implementasi model dan repository AuditLog untuk mencatat perubahan data penting secara otomatis.
2. **Profile Change Approval Flow**: Implementasi antrian approval untuk perubahan data profil sensitif.
3. **Backend-Enforced Visibility**: Memindahkan kontrol visibilitas item pekerjaan dari label UI ke filter query di backend.

### Local Governance & Persona Management (v2 Stabilized)
Fitur tata kelola persona lokal telah distabilkan (v2) untuk memberikan transparansi fase pengembangan:
1. **Direktori Persona Lokal**: Terminologi "Data Master" telah diganti menjadi "Direktori Persona" untuk menegaskan bahwa ini adalah database entitas simulasi lokal.
2. **Standardized Action Labels**: Seluruh aksi administratif menggunakan terminologi "Tambah Persona Lokal" dan konfirmasi penghapusan menggunakan safe-wording (simulasi/non-permanen).
3. **Form Modal Disclaimer**: Seluruh modal penambahan/pengeditan persona memiliki footer disclaimer: *"Persona ini adalah entitas database lokal untuk simulasi. Tidak melibatkan sistem password, JWT, atau session production."*
4. **GovernanceNotice Component**: Penegasan self-profile governance; user mengelola profil sendiri, perubahan identitas penting diarahkan ke alur Audit & Approval di masa depan.
5. **Audit & Approval Local Hold**: Halaman "Log Aktivitas" diubah menjadi "Pusat Audit & Approval Lokal" sebagai placeholder/planned workflow (Hold/Preparation). Action buttons disabled.
6. **Visibility Preparation (Local Hold)**: Label visibilitas (Customer-Visible Preparation) ditambahkan pada UI operasional untuk menandakan area yang akan dikontrol Admin secara formal di masa depan.

Arah produk RKK memisahkan kewenangan pengelolaan akun secara bertahap:
1. **Superadmin**: Pengelola direktori persona lokal (CRUD entitas simulasi).
2. **Admin**: Operator proyek; hanya dapat mengubah profil miliknya sendiri.
3. **Role Lapangan/Konsumen**: Hanya dapat mengubah profil miliknya sendiri dengan pengawasan GovernanceNotice.

### Tata Kelola Perubahan Profil (Governance)

Beberapa contoh data penting yang memerlukan validasi atau pencatatan log jika diubah:
- Nomor telepon dan alamat.
- Data identitas resmi (KTP/ID) atau profil utama.
- Data perusahaan atau badan usaha.
- Sertifikat keahlian dan riwayat pengalaman kerja.
- Data konsumen yang berdampak pada administrasi proyek.
- Data Mandor/Pengawas/Arsitek yang berdampak langsung pada operasional lapangan.

### Future Workflow Candidate: Profile Change Request / Local Approval Log v1
Konsep alur yang direncanakan:
1. User mengajukan perubahan data melalui form profil.
2. Jika data bersifat "penting", status berubah menjadi `pending` atau masuk ke antrian `Local Request`.
3. Admin atau Superadmin melakukan review dan memilih `Approve` atau `Reject`.
4. Seluruh aktivitas perubahan tersimpan dalam **Audit/Change Log Lokal**.
5. Alur ini bersifat operasional lokal dan belum merupakan sistem approval production.

### Kandidat Batch Implementasi: "Superadmin Account & Profile Change Management Local CRUD v1"
Rencana cakupan batch berikutnya:
1. Implementasi Superadmin CRUD untuk akun seluruh role.
2. Pengaktifan fitur Edit Profil mandiri untuk setiap role.
3. Mekanisme Approval/Log untuk perubahan profil data penting secara lokal.
