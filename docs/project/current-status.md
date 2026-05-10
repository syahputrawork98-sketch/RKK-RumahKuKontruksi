# Current Status - RKK RumahKu Konstruksi

## Status Umum
- **Phase**: Local Development CRUD Integration Phase
- **Environment**: Localhost only
- **Production Ready**: No
- **Auth System**: NOT IMPLEMENTED (Intentionally postponed)
- **Persona Switcher**: Dev-only persona selector is used for role simulation. This system is local-only and does not use JWT, sessions, or passwords.
- **Fokus Saat Ini**: Stabilisasi CRUD lokal lintas role sudah masuk fase sinkronisasi status dan cleanup sisa placeholder. Flow Konsumen utama (Dashboard, Profil, Design Request, Project Monitoring, dan Stage Communication Panel) sudah API-backed untuk kebutuhan localhost.
- **Curated Seed Data**: Database lokal telah dibersihkan dan diisi dengan skenario demo yang utuh (Design Flow, Project Bridge, Active Construction, Finished Project, Superadmin Stats, stage/progress/comment demo). Gunakan `npm run db:seed` (alias dari `node prisma/seed.js`) untuk reset data testing.


## Backend Status (Local API)

| Module | Status | Notes |
| :--- | :--- | :--- |
| **Health Check** | DONE | `/api/health` |
| **Customers** | CRUD Available | Local API CRUD; profile Konsumen sudah API-backed via dev persona |
| **Projects** | CRUD Available | Full Lifecycle (Create, Edit, Detail, Assignment) |
| **Project Stages**| CRUD Available | Plan-based stages for scheduling |
| **RAB** | Local CRUD v1 / Admin Builder Stabilized | Project RAB Builder untuk RAB Plan, RabCategory, dan RabItem sebagai baseline draft planning lokal |
| **Supervisors** | CRUD Available | Profile plus Certificate & Work Experience Local CRUD v1 stabilized; Experience Read-Only summary tetap tersedia |
| **Foremen** | CRUD Available | Profile plus Certificate & Work Experience Local CRUD v1 stabilized; Experience Read-Only summary tetap tersedia |
| **Architects** | CRUD Available | Profile, Certificates, and Experiences included |
| **Auth/Login** | NOT IMPLEMENTED | Using Dev Persona Selector on frontend |
| **Weekly Journals** | Local E2E Workflow v1 / UI Consistency Stabilized | Mandor creates weekly journal with `claimedProgress` as non-official claim; Pengawas review is administrative only |
| **Weekly Reports** | Local E2E Workflow v1 / UI Consistency Stabilized | Pengawas creates report with `verifiedProgressSnapshot`; Admin review/publish is administrative/customer-summary flow |
| **Project Activation**| DONE | Readiness Checklist & Activation Gate (Berjalan) |
| **Material Requests**| Local Workflow v1 / Stabilized | Material Request from RAB Usage lokal: Mandor bisa memakai RabItem sebagai baseline material, Pengawas review, Admin distribusi lokal, Mandor confirm received |
| **Verification** | Local Workflow v1 / Stabilized | Progress Verification from RAB/Stage Context; `Project.verifiedProgress` tetap progress resmi dan diisi manual oleh Pengawas assigned |
| **Mandor/Pengawas Certificate & Work Experience** | Local CRUD v1 / Stabilized | Data sertifikat keahlian dan riwayat pengalaman kerja lokal/manual; bukan sertifikasi legal atau reputation marketplace |
| **Design Request** | Local E2E Workflow v1 / UI Consistency Stabilized | Konsumen create/list permintaan desain lokal; Admin review/manage workflow lokal; Superadmin read-only monitoring |
| **Design Tender** | Local E2E Workflow v1 / UI Consistency Stabilized | Admin publish tender lokal dan award bid lokal; Arsitek view open tender, submit bid, serta melihat desain aktif/riwayat lokal |
| **Design to Project Draft** | Local Demo Completion / Local E2E Workflow v1 | Design Request -> Tender -> Award -> assigned/approved -> Project draft/planning lokal sudah berjalan untuk demo localhost |
| **Project Bridge** | Local Draft/Planning Bridge | Manual conversion from approved Design Request to project draft/planning lokal; tidak mengaktifkan proyek otomatis |
| **Timeline Panel** | DONE | Stage Communication Panel functional v1 via ProjectStagePublicComment API; create/reply memakai `projectId` eksplisit dari client |

## Operational Modules Progress
Modul operasional inti (Progress Monitoring, Journal Mandor, Report Pengawas) telah dipindahkan ke database (DB-Backed v1). Progress Verification from RAB/Stage Context sudah berstatus **Local Workflow v1 / Stabilized** dan tetap mengikuti prinsip Progress SOT: `Project.verifiedProgress` adalah sumber progress resmi, `WeeklyJournal.claimedProgress` adalah klaim Mandor non-resmi, dan `SupervisorWeeklyReport.verifiedProgressSnapshot` hanya snapshot progress resmi saat laporan dibuat. RAB, ProjectStage, dan Jurnal Mandor menjadi konteks pendukung, bukan penghitung progress otomatis. Review/approval Weekly Journal tidak otomatis mengubah `Project.verifiedProgress`; review/publish Weekly Report oleh Admin adalah administrasi/publikasi ringkasan, bukan verifikasi fisik progress. Pengawas assigned tetap pihak yang memperbarui progress fisik resmi secara manual lewat Progress SOT flow. Konsumen melihat progress resmi, dan Superadmin hanya read-only monitoring.

## Progress Verification Context
Progress Verification from RAB/Stage Context berstatus **Local Workflow v1 / Stabilized** untuk Local Development CRUD Integration. Alurnya: Pengawas memilih project aktif, sistem menampilkan konteks pendukung Stage, RAB, dan jurnal Mandor terbaru/ringkas untuk UI support, lalu Pengawas tetap mengisi `verifiedProgress` secara manual dan submit melalui `PATCH /projects/:id/verify-progress`. Backend menyimpan `Project.verifiedProgress`, `verifiedProgressUpdatedAt`, `verifiedProgressById`, dan `ProgressVerificationLog`.

Jika `stageId` dikirim, backend memvalidasi bahwa Stage tersebut milik project yang sedang diverifikasi. RAB context membaca approved RAB terlebih dahulu dan fallback ke latest RAB untuk kebutuhan local development/planning jika belum ada approved RAB. RAB, ProjectStage, Jurnal Mandor, dan review jurnal tidak otomatis mengubah `Project.verifiedProgress`; tidak ada progress automation production dan tidak ada perubahan aturan Progress SOT.

## RAB & Work Reporting Context
Project RAB Builder sudah berstatus **Local CRUD v1 / Admin Builder Stabilized**. Struktur lokalnya: `Project` -> `RAB Plan` -> `RabCategory`/kategori pekerjaan -> `RabItem`/item pekerjaan. RAB menjadi baseline draft planning lokal untuk scope dan estimasi pekerjaan, bukan kontrak final, invoice, payment, escrow, atau dokumen legal production. Admin dapat CRUD lokal RAB plan/category/item; delete guard menolak hapus `RabItem` yang sudah dipakai Material Request atau Weekly Journal, dan menolak hapus `RabCategory` yang masih memiliki item.

Mandor & Pengawas Work Reporting from RAB/Stage sudah berstatus **Local Integration v1 / Stabilized**. `WeeklyJournalActivity.projectStageId` dan `WeeklyJournalActivity.rabItemId` dapat dipakai Mandor sebagai referensi opsional Stage/RAB Item saat melaporkan aktivitas. Pengawas melihat konteks Stage/RAB Item saat review jurnal melalui manual enrichment di backend memakai field existing, tanpa schema migration dan tanpa perubahan seed pada batch docs ini. Review jurnal tetap administratif: Jurnal Mandor maupun review Pengawas tidak otomatis mengubah `Project.verifiedProgress`; Progress SOT tetap lewat Verifikasi Progres.

Material Request from RAB Usage sudah berstatus **Local Workflow v1 / Stabilized** untuk Local Development CRUD Integration. Alur lokalnya: Mandor memilih project aktif/`Berjalan`, memilih stage project, lalu dapat memilih `RabItem` sebagai baseline material. Sistem menampilkan total RAB qty, approved qty, dan remaining qty sebagai konteks pemakaian RAB lokal. Mandor tetap bisa membuat manual/outside-RAB request tanpa `RabItem`, tetapi wajib mengisi note/alasan. Pengawas review kebutuhan material dan kesesuaian lapangan, Admin menjalankan distribusi lokal, Mandor confirm received, dan Superadmin hanya read-only monitoring.

Backend menjaga validasi local workflow: project harus aktif/`Berjalan`, `foremanId` harus assigned ke project, `supervisorId` harus sesuai project, `stageId` harus milik project, `rabItemId` harus milik project, manual request tanpa `RabItem` wajib punya note/alasan, dan approval tetap menjaga quantity check terhadap remaining RAB. Flow ini tidak membuat inventory production, supplier marketplace, purchase order production, invoice/payment/escrow, atau procurement production. Material Request from RAB Usage juga tidak mengubah Progress SOT: tidak ada update otomatis ke `Project.verifiedProgress`, `ProjectStage.progress`, atau `RabItem.progress`.

## Mandor/Pengawas Certificate & Work Experience
Mandor/Pengawas Certificate & Work Experience sudah berstatus **Local CRUD v1 / Stabilized** untuk Local Development CRUD Integration. Mandor dan Pengawas dapat mengelola data profil lokal/manual berupa Sertifikat Keahlian dan Riwayat Pengalaman Kerja memakai schema/backend existing, tanpa schema baru dan tanpa seed baru pada batch docs ini. Delete memakai soft-delete endpoint existing.

Data ini belum diverifikasi resmi dan bukan legal certificate, bukan upload dokumen production, bukan PDF certificate, bukan rating/scoring/reputation marketplace, serta bukan dasar sertifikasi production. Experience Read-Only Summary dari data operasional lokal tetap tersedia sebagai ringkasan terpisah: project aktif/selesai, jurnal Mandor, aktivitas pekerjaan, review/laporan Pengawas, material request jika tersedia, dan `Project.verifiedProgress` sebagai data resmi read-only. Certificate & Work Experience CRUD maupun Experience Summary tidak mengubah `Project.verifiedProgress` dan tidak mengubah aturan Progress SOT.

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
1. **Admin Publish Update / Stage Communication Source Flow Verification**: Verifikasi jalur Admin sebagai sumber update resmi untuk Stage Communication Panel, termasuk guard role dan payload `projectId`.
2. **Admin Dashboard Demo Data Cleanup**: Bersihkan mockup "Recent Activity" dan sisa hardcoded demo data di Dashboard Admin agar sinkron dengan API.
3. **Final UI Consistency Check**: Lakukan audit visual menyeluruh untuk memastikan harmoni antar modul baru tanpa membuka scope auth/payment/upload production.
