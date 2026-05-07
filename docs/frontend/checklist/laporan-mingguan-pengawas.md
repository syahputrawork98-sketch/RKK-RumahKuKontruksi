# Frontend Checklist - Laporan Mingguan Pengawas

## Source Alur
- `docs/alur/alur-laporan-mingguan-pengawas.md`
- `docs/alur/pengawas.md`
- `docs/alur/jurnal-mingguan-mandor.md`
- `docs/frontend/checklist/project-progress.md`
- `docs/frontend/checklist/jurnal-mingguan-mandor.md`

## Status Saat Ini
Implemented Local Frontend v1.

## Tujuan Frontend
Memberikan antarmuka bagi Pengawas untuk menyusun rekap evaluasi mingguan (internal) dan bagi Admin untuk meninjau hasil evaluasi tersebut sebelum dijadikan arsip.

## Prinsip UI
- [x] Antarmuka Pengawas untuk List, Create, dan Detail/Edit.
- [x] Antarmuka Admin untuk Review (List & Detail).
- [x] Snapshot Progres: Menampilkan angka progres resmi dari SOT (Project), bukan input progres baru.
- [x] Referensi Jurnal: Menampilkan ringkasan jurnal Mandor yang sudah disetujui sebagai bahan evaluasi.
- [x] Customer Summary Draft: Draft ringkasan untuk konsumen (tidak dipublish otomatis).
- [x] Role Visibility: Hanya Pengawas proyek dan Admin yang bisa melihat detail.
- [x] Readonly State: Laporan yang sudah di-submit/disetujui tidak bisa diedit.

## Page Contract

### Pengawas Views
- [x] **List Laporan Pengawas** (`/pengawas/laporan-mingguan`): Menampilkan list laporan per project/periode.
- [x] **Create Laporan Pengawas** (`/pengawas/laporan-mingguan/create`): Form pembuatan laporan.
- [x] **Detail/Edit Laporan Pengawas** (`/pengawas/laporan-mingguan/:reportId`): Detail laporan, edit draf, dan submit.
- [x] **Context Loader**: Tombol/tomatisasi pengambilan jurnal Mandor approved & progress verified untuk periode terpilih.

### Admin Views
- [x] **Review List Laporan** (`/admin/laporan-mingguan-pengawas`): List laporan yang butuh review.
- [x] **Detail Review Laporan** (`/admin/laporan-mingguan-pengawas/:reportId`): Melihat detail laporan & memberikan status (Approve/Revision/Reject).

## Component Contract

| Component | Used By | Data / Props | Notes |
|---|---|---|---|
| `SupervisorWeeklyReportList` | Pengawas/Admin | `reports[]`, `statusFilter` | List laporan dengan status badge |
| `SupervisorWeeklyReportForm` | Pengawas create/edit | `project`, `report`, `context` | Form header laporan |
| `ApprovedJournalSummaryPanel` | Pengawas/Admin | `approvedJournals[]` | Menampilkan jurnal approved sebagai bahan rekap |
| `VerifiedProgressSnapshotCard` | Pengawas/Admin | `verifiedProgressSnapshot`, `updatedAt` | Menegaskan progress resmi sumbernya dari SOT |
| `SupervisorReportNoteList` | Pengawas/Admin | `notes[]` | Catatan quality/safety/blocker/recommendation |
| `SupervisorReportNoteForm` | Pengawas | note fields | Tambah/edit catatan |
| `CustomerSummaryDraftBox` | Pengawas/Admin | `customerSummaryDraft` | Draft saja, bukan publish |
| `SupervisorReportStatusBadge` | Semua page | `status` | Badge status laporan |
| `SupervisorReportReviewPanel` | Admin detail | `report`, `reviewLogs[]` | Approve/revision/reject |
| `SupervisorReportReviewHistory` | Pengawas/Admin | `reviewLogs[]` | Timeline status |

## Service Mapping

| UI Action | Service/API | Success State | Error State |
|---|---|---|---|
| Load laporan Pengawas | `GET /api/supervisor-weekly-reports?supervisorId=` | List rendered | Error banner |
| Load report context | `GET /api/supervisor-weekly-reports/context` | Approved journals + progress snapshot shown | Error banner |
| Create draft | `POST /api/supervisor-weekly-reports` | Redirect detail laporan | Validation error |
| Save draft | `PATCH /api/supervisor-weekly-reports/:id` | Toast saved | Validation error |
| Submit laporan | `POST /api/supervisor-weekly-reports/:id/submit` | Status submitted | Error banner |
| Load admin review list | `GET /api/supervisor-weekly-reports?status=submitted` | List rendered | Error banner |
| Approve laporan | `POST /api/supervisor-weekly-reports/:id/review` action approve | Status approved | Error banner |
| Request revision | `POST /api/supervisor-weekly-reports/:id/review` action request_revision | Status revision_requested | Note required error |
| Reject laporan | `POST /api/supervisor-weekly-reports/:id/review` action reject | Status rejected | Note required error |

## Role Visibility Matrix

| UI Element | Pengawas | Admin | Mandor | Konsumen | Notes |
|---|---|---|---|---|---|
| Tombol Create Report | Yes assigned | No | No | No | Pengawas project assigned |
| Tombol Edit Draft | Yes owner | No | No | No | Only draft/revision_requested |
| Tombol Submit | Yes owner | No | No | No | Only draft/revision_requested |
| Tombol Approve | No | Yes | No | No | Admin review |
| Tombol Request Revision | No | Yes | No | No | Note wajib |
| Tombol Reject | No | Yes | No | No | Note wajib |
| Approved journal summary | Yes | Yes | No | No | Internal summary |
| Raw journal detail | Yes | Yes internal | No | No | Mandor raw journal tidak menjadi tampilan Konsumen |
| Verified progress snapshot | Yes readonly | Yes readonly | No/limited | Published only later | Source: Project Progress SOT |
| Customer summary draft | Yes edit | Yes read/review | No | No | Draft, bukan published |
| Internal notes | Yes | Yes | No | No | Quality/safety/blocker internal |

## UI State Contract

| State | Trigger | UI Behavior |
|---|---|---|
| No Persona Selected | Pengawas belum pilih persona | Empty state pilih persona |
| Loading Reports | Fetch list | Skeleton/list loader |
| Empty Reports | Tidak ada laporan | Empty message + CTA create untuk Pengawas |
| Context Loading | Fetch approved journals/progress | Loading panel |
| No Approved Journals | Belum ada jurnal approved | Warning bahwa laporan bisa dibuat manual tapi tanpa rekap jurnal |
| Draft Saved | Save draft success | Toast/success message |
| Submitted | Submit success | Form readonly, status submitted |
| Revision Requested | Admin minta revisi | Tampilkan note revisi dan tombol edit |
| Approved | Laporan disetujui | Readonly, badge approved |
| Rejected | Laporan ditolak | Readonly, badge rejected |
| Locked | Laporan dikunci | Readonly total |
| API Error | Request gagal | Error banner + retry |

## Form & Validation UI

- `projectId` wajib.
- `weekStartDate` dan `weekEndDate` wajib.
- `weekStartDate <= weekEndDate`.
- Minimal `summary` atau satu note sebelum submit.
- `journalIds` hanya boleh jurnal approved dari project yang sama.
- Note type wajib jika menambah note.
- `customerSummaryDraft` harus diberi label “Draft, belum dipublish”.
- Review action `request_revision` dan `reject` wajib note.
- Form edit disabled untuk status `submitted`, `under_admin_review`, `approved`, `rejected`, `locked`.

## Tidak Dikerjakan di Fase Ini

- [ ] Payment Foreman.
- [ ] Progress to Customer publication.
- [ ] Customer visibility final.
- [ ] Notification system.
- [ ] Upload file/foto fisik final.
- [ ] Auto-update progress verified dari laporan.
- [ ] Auto-generate payment dari laporan.
- [ ] JWT/RBAC production.

## Acceptance Criteria

- [x] Pengawas dapat melihat daftar laporannya.
- [x] Pengawas dapat membuat laporan baru dengan memilih proyek & periode.
- [x] Context loader mengambil jurnal mandor approved & verified progress snapshot.
- [x] Pengawas dapat mengisi evaluasi (quality, safety, blocker, recommendation).
- [x] Pengawas dapat mengedit draf laporan.
- [x] Pengawas dapat men-submit laporan (Status: submitted).
- [x] Admin dapat melihat daftar laporan yang masuk.
- [x] Admin dapat me-review laporan (Approve / Request Revision / Reject).
- [x] Laporan yang sudah disetujui/dikirim menjadi readonly bagi pengawas.
- [x] Pesan revisi admin tampil di halaman detail pengawas.
- [x] Snapshot progres SOT tampil jelas di UI.
- [x] Draft ringkasan konsumen tersimpan tetapi tidak publish otomatis.
- [x] Tidak ada fitur payment di tahap ini.
- [x] Tidak ada auto-update progress project.
- [x] Service mapping sudah jelas.
- [x] Route kontrak sudah jelas walaupun belum diimplementasikan.
