# Backend Checklist - Laporan Mingguan Pengawas

## Source Alur
- `docs/alur/alur-laporan-mingguan-pengawas.md`
- `docs/alur/pengawas.md`
- `docs/alur/jurnal-mingguan-mandor.md`
- `docs/backend/checklist/project-progress.md`
- `docs/backend/checklist/jurnal-mingguan-mandor.md`

## Status Saat Ini
Implemented Local Backend v1 / Frontend Pending.

## Tujuan Backend
Menyiapkan kontrak backend untuk laporan mingguan Pengawas sebagai rekap/evaluasi resmi berbasis jurnal Mandor approved dan progress verified, bukan sebagai sumber progress baru.

## Prinsip Utama
- [x] Laporan Pengawas bukan progress resmi baru.
- [x] Progress resmi tetap berasal dari Project Progress SOT.
- [x] Laporan Pengawas mengambil snapshot `Project.verifiedProgress`.
- [x] Laporan Pengawas boleh merujuk jurnal Mandor approved.
- [x] Laporan Pengawas menjadi bahan monitoring Admin.
- [x] Laporan Pengawas dapat menjadi bahan ringkasan Konsumen nanti, tetapi bukan customer publication final.
- [x] Laporan Pengawas tidak membuat payment.

## Database Contract
- [x] Prisma model `SupervisorWeeklyReport`, `SupervisorWeeklyReportJournal`, `SupervisorWeeklyReportNote`, `SupervisorWeeklyReportReviewLog`.

## Database Contract

| Model/Table | Purpose | Required Fields | Optional Fields | Relations | Notes |
|---|---|---|---|---|---|
| `SupervisorWeeklyReport` | Header laporan mingguan Pengawas | `id`, `projectId`, `supervisorId`, `weekStartDate`, `weekEndDate`, `status`, `verifiedProgressSnapshot`, `createdAt`, `updatedAt` | `summary`, `qualityNotes`, `safetyNotes`, `blockerNotes`, `recommendation`, `adminNote`, `submittedAt`, `reviewedAt`, `lockedAt`, `reviewedByAdminId`, `customerSummaryDraft` | `Project`, `Supervisor`, `SupervisorWeeklyReportJournal[]`, `SupervisorWeeklyReportNote[]`, `SupervisorWeeklyReportReviewLog[]` | Laporan evaluasi resmi, bukan progress source |
| `SupervisorWeeklyReportJournal` | Relasi laporan ke jurnal Mandor approved | `id`, `reportId`, `weeklyJournalId`, `createdAt` | `note` | `SupervisorWeeklyReport`, `WeeklyJournal` | Menghubungkan laporan dengan jurnal approved yang direkap |
| `SupervisorWeeklyReportNote` | Catatan detail laporan | `id`, `reportId`, `type`, `content`, `createdAt` | `severity`, `projectStageId`, `rabItemId` | `SupervisorWeeklyReport` | Tipe catatan: quality, safety, blocker, recommendation, material, other |
| `SupervisorWeeklyReportReviewLog` | Riwayat status/review laporan | `id`, `reportId`, `actorRole`, `actorId`, `action`, `newStatus`, `createdAt` | `oldStatus`, `note` | `SupervisorWeeklyReport` | Audit trail submit/review/lock |

> [!IMPORTANT]
> - `verifiedProgressSnapshot` hanya snapshot dari Project Progress SOT pada saat laporan dibuat/disubmit, bukan field progress baru yang berdiri sendiri.
> - `customerSummaryDraft` hanya draft calon ringkasan, bukan publikasi otomatis ke Konsumen.

## Enum / Status

| Enum | Values | Notes |
|---|---|---|
| `SupervisorWeeklyReportStatus` | `draft`, `submitted`, `under_admin_review`, `revision_requested`, `approved`, `rejected`, `locked` | Status utama laporan |
| `SupervisorWeeklyReportAction` | `create_draft`, `submit`, `start_admin_review`, `request_revision`, `approve`, `reject`, `lock`, `reopen` | Aksi perubahan status |
| `SupervisorReportNoteType` | `quality`, `safety`, `blocker`, `recommendation`, `material`, `schedule`, `other` | Tipe catatan detail |
| `SupervisorReportSeverity` | `low`, `medium`, `high`, `critical` | Tingkat urgensi catatan |

### Aturan Status:
- **draft**: dibuat Pengawas, masih bisa diedit.
- **submitted**: dikirim ke Admin untuk monitoring/review.
- **under_admin_review**: sedang direview Admin.
- **revision_requested**: Admin meminta Pengawas memperbaiki laporan.
- **approved**: disetujui Admin sebagai laporan internal.
- **rejected**: ditolak Admin.
- **locked**: dikunci, bisa menjadi arsip final.

## API Contract
- [x] `GET /api/supervisor-weekly-reports/context`
- [x] `GET /api/supervisor-weekly-reports`
- [x] `GET /api/supervisor-weekly-reports/:id`
- [x] `POST /api/supervisor-weekly-reports`
- [x] `PATCH /api/supervisor-weekly-reports/:id`
- [x] `POST /api/supervisor-weekly-reports/:id/submit`
- [x] `POST /api/supervisor-weekly-reports/:id/review`

## Status Transition Matrix

| From | Action | Actor | To | Rule |
|---|---|---|---|---|
| `none` | `create_draft` | Pengawas assigned | `draft` | Pengawas harus assigned ke project |
| `draft` | `edit` | Pengawas owner | `draft` | Hanya laporan miliknya |
| `draft` | `submit` | Pengawas owner | `submitted` | Minimal punya summary atau note |
| `submitted` | `start_admin_review` | Admin | `under_admin_review` | Admin internal |
| `submitted` | `approve` | Admin | `approved` | Review selesai |
| `submitted` | `request_revision` | Admin | `revision_requested` | Note wajib |
| `submitted` | `reject` | Admin | `rejected` | Note wajib |
| `under_admin_review` | `approve` | Admin | `approved` | Review selesai |
| `under_admin_review` | `request_revision` | Admin | `revision_requested` | Note wajib |
| `under_admin_review` | `reject` | Admin | `rejected` | Note wajib |
| `revision_requested` | `edit` | Pengawas owner | `revision_requested` | Pengawas boleh revisi |
| `revision_requested` | `submit` | Pengawas owner | `submitted` | Submit ulang |
| `approved` | `lock` | Admin | `locked` | Arsip final |
| `locked` | `edit` | Any | `locked` | Forbidden |
| `rejected` | `edit` | Any | `rejected` | Forbidden pada fase awal |

## Allowed Action Matrix

| Role | Condition | Allowed Actions | Forbidden Actions |
|---|---|---|---|
| Pengawas assigned | Project assigned to supervisor | create draft, edit draft/revision_requested, attach approved journals, submit report, view own report | approve admin review, publish to customer, create payment, change verified progress from report |
| Admin | Internal monitoring/review | view all reports, start review, approve, request revision, reject, lock future | edit Pengawas report content, create progress from report, create payment from report directly |
| Mandor | Project participant | no direct access in phase ini | view internal supervisor report, edit report, approve report |
| Konsumen | None | no access to raw report | view internal notes, view blocker/internal issue detail |

## Validation & Error Rules

| Rule | Error Message / Code | Notes |
|---|---|---|
| Project wajib ada | `Project not found` / 404 | |
| Pengawas harus assigned ke project | `Supervisor is not assigned to this project` / 403 | |
| Periode minggu wajib valid | `Invalid report period` / 400 | `weekStartDate <= weekEndDate` |
| Tidak boleh duplicate report per project/supervisor/week | `Supervisor weekly report already exists for this period` / 400 | Unique rule nanti |
| Submit butuh minimal summary/note | `Report must contain summary or note before submit` / 400 | |
| journalIds harus approved dan project sama | `Only approved journals from the same project can be attached` / 400 | |
| request_revision/reject wajib note | `Review note is required` / 400 | |
| approved/locked tidak bisa diedit | `Report is locked or approved` / 400 | |
| customerSummaryDraft tidak boleh publish otomatis | `Customer summary draft is not a publication` | Dokumentasi rule |

## Integrasi dengan Alur Lain

- **Project Progress SOT**:
  - Laporan mengambil `verifiedProgressSnapshot` dari Project Progress SOT.
  - Laporan tidak mengubah `Project.verifiedProgress`.
- **Jurnal Mingguan Mandor**:
  - Laporan boleh mengambil jurnal approved sebagai bahan rekap.
  - Jurnal raw tetap internal.
- **Progress to Customer**:
  - `customerSummaryDraft` dapat menjadi bahan publikasi nanti.
  - Publikasi ke Konsumen harus tetap melalui workflow Progress to Customer.
- **Payment Foreman**:
  - Laporan dapat menjadi bahan pertimbangan payment nanti.
  - Laporan tidak membuat payment otomatis.

## Tidak Dikerjakan di Fase Ini

- [ ] Payment Foreman.
- [ ] Progress to Customer publication.
- [ ] Customer visibility.
- [ ] Notification system.
- [ ] Upload file/foto fisik final.
- [ ] JWT/RBAC production.
- [ ] Auto-update verified progress dari laporan.
- [ ] Auto-generate payment dari laporan.

## Acceptance Criteria

- [x] Kontrak database laporan Pengawas sudah jelas & diimplementasikan.
- [x] Status flow laporan sudah jelas & diimplementasikan.
- [x] API contract laporan sudah jelas & diimplementasikan.
- [x] Pengawas hanya bisa membuat laporan untuk project yang dia awasi.
- [x] Laporan mengambil snapshot progress verified, bukan membuat progress baru.
- [x] Laporan bisa merujuk jurnal approved.
- [x] Admin bisa review laporan.
- [x] Konsumen tidak punya akses ke laporan mentah.
- [x] Payment tidak dibuat otomatis dari laporan.
