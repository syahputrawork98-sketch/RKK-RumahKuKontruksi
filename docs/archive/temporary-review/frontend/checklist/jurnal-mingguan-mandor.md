# Frontend Checklist - Jurnal Mingguan Mandor

## Source Alur
- `docs/alur/jurnal-mingguan-mandor.md`
- `docs/alur/mandor.md`
- `docs/alur/pengawas.md`
- `docs/frontend/checklist/project-progress.md`

## Status Saat Ini
Implemented Local Frontend v1

## Tujuan UI
Menyiapkan kontrak UI agar Mandor dapat membuat jurnal mingguan dan Pengawas dapat mereview jurnal tersebut tanpa menjadikan jurnal sebagai sumber progress resmi.

## Page Contract

| Page | Route | Actor | Purpose | Data Source |
|---|---|---|---|---|
| Daftar Jurnal Mandor | `/mandor/jurnal-mingguan` | Mandor | Melihat jurnal miliknya per proyek/periode | `GET /api/weekly-journals?foremanId=` |
| Buat Jurnal Mandor | `/mandor/jurnal-mingguan/create` | Mandor | Membuat draft jurnal | `POST /api/weekly-journals` |
| Detail/Edit Jurnal Mandor | `/mandor/jurnal-mingguan/:id` | Mandor | Edit draft/revision dan melihat status review | `GET/PATCH /api/weekly-journals/:id` |
| Daftar Review Jurnal | `/pengawas/jurnal-mandor` | Pengawas | Melihat jurnal submitted dari proyek assigned | `GET /api/weekly-journals?supervisorId=&status=submitted` |
| Detail Review Jurnal | `/pengawas/jurnal-mandor/:id` | Pengawas | Review detail jurnal dan approve/revision/reject | `GET /api/weekly-journals/:id`, `POST /review` |
| Admin Monitoring Jurnal | `/admin/jurnal-mandor` (Future) | Admin | Monitoring status jurnal | `GET /api/weekly-journals` |

> [!NOTE]
> Jangan implementasi route sekarang. Ini hanya kontrak rute untuk masa depan.

## Component Contract

| Component | Used By | Data / Props | Notes |
|---|---|---|---|
| `WeeklyJournalList` | Mandor/Pengawas | `journals[]`, `statusFilter` | List jurnal dengan status badge |
| `WeeklyJournalForm` | Mandor create/edit | `project`, `journal`, `activities[]` | Form header jurnal |
| `WeeklyJournalActivityTable` | Mandor detail | `activities[]` | Input/edit aktivitas |
| `WeeklyJournalActivityForm` | Mandor detail | activity fields | Tambah/edit aktivitas |
| `WeeklyJournalPhotoList` | Mandor/Pengawas | `photos[]` | Untuk fase awal URL/manual placeholder |
| `WeeklyJournalStatusBadge` | Semua page | `status` | Warna/status jelas |
| `WeeklyJournalReviewPanel` | Pengawas detail | `journal`, `reviewLogs[]` | Approve/revision/reject |
| `WeeklyJournalReviewHistory` | Mandor/Pengawas/Admin | `reviewLogs[]` | Timeline status |
| `ClaimedVsVerifiedProgressCard` | Mandor/Pengawas | `claimedProgress`, `verifiedProgress` | Bedakan klaim Mandor vs progress resmi |

## Service Mapping

| UI Action | Service/API | Success State | Error State |
|---|---|---|---|
| Load jurnal Mandor | `GET /api/weekly-journals?foremanId=` | List rendered | Error banner |
| Create draft | `POST /api/weekly-journals` | Redirect detail jurnal | Validation error |
| Save draft | `PATCH /api/weekly-journals/:id` | Toast saved | Validation error |
| Submit jurnal | `POST /api/weekly-journals/:id/submit` | Status submitted | Error banner |
| Load review list | `GET /api/weekly-journals?supervisorId=&status=submitted` | List rendered | Error banner |
| Approve jurnal | `POST /api/weekly-journals/:id/review` action approve | Status approved | Error banner |
| Request revision | `POST /api/weekly-journals/:id/review` action request_revision | Status revision_requested | Note required error |
| Reject jurnal | `POST /api/weekly-journals/:id/review` action reject | Status rejected | Note required error |

## Role Visibility Matrix

| UI Element | Mandor | Pengawas | Admin | Konsumen | Notes |
|---|---|---|---|---|---|
| Tombol Create Journal | Yes | No | No | No | Mandor assigned only |
| Tombol Edit Draft | Yes owner | No | No | No | Only draft/revision_requested |
| Tombol Submit | Yes owner | No | No | No | Only draft/revision_requested |
| Tombol Approve | No | Yes assigned | No | No | Pengawas review |
| Tombol Request Revision | No | Yes assigned | No | No | Note wajib |
| Tombol Reject | No | Yes assigned | No | No | Note wajib |
| Raw journal activities | Yes owner | Yes assigned | Yes internal | No | Konsumen tidak melihat mentah |
| Review notes | Yes owner | Yes assigned | Yes internal | No | Internal only |
| Claimed progress | Yes | Yes | Yes | No | Bukan progress resmi |
| Verified progress | Yes readonly | Yes readonly/update via Progress SOT | Yes readonly | Published only | Source: Project Progress SOT |

## UI State Contract

| State | Trigger | UI Behavior |
|---|---|---|
| No Persona Selected | Mandor/Pengawas belum pilih persona | Tampilkan empty state pilih persona |
| Loading Journals | Fetching list | Skeleton/list loader |
| Empty Journals | Tidak ada jurnal | Empty message + CTA create untuk Mandor |
| Draft Saved | Save draft success | Toast/success message |
| Submitted | Submit success | Form readonly, status submitted |
| Revision Requested | Pengawas minta revisi | Tampilkan note revisi dan tombol edit |
| Approved | Jurnal disetujui | Readonly, badge approved |
| Rejected | Jurnal ditolak | Readonly, badge rejected |
| Locked | Jurnal dikunci | Readonly total |
| API Error | Request gagal | Error banner + retry |

## Form & Validation UI
- `weekStartDate` dan `weekEndDate` wajib.
- `projectId` wajib.
- `summary` atau minimal satu activity wajib sebelum submit.
- `claimedProgress` harus 0–100 jika diisi.
- Activity wajib punya `workTitle` dan `description`.
- Review action `request_revision` dan `reject` wajib note.
- Form edit disabled untuk status `submitted`, `under_review`, `approved`, `rejected`, `locked`.

## Tidak Dikerjakan di Fase Ini
- [ ] Upload file/foto fisik final.
- [ ] Payment Foreman.
- [ ] Laporan Mingguan Pengawas.
- [ ] Customer visibility.
- [ ] Notification system.
- [ ] Auto-update progress verified dari jurnal.
- [ ] JWT/RBAC production.

## Acceptance Criteria
- [x] Mandor list view implemented.
- [x] Mandor create draft implemented.
- [x] Mandor detail & edit implemented.
- [x] Mandor submit implemented.
- [x] Pengawas review list implemented.
- [x] Pengawas detail & review action implemented.
- [x] Service mapping ke backend jurnal.
- [x] Role-based visibility (local dev).
- [x] Readonly state pada jurnal yang sudah disubmit/review.
- [x] Status badge reusable component.
- [x] Info SOT vs Claimed Progress ditampilkan.
