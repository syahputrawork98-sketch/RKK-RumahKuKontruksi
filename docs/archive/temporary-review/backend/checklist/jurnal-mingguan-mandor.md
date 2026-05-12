# Backend Checklist - Jurnal Mingguan Mandor

## Source Alur
- `docs/alur/jurnal-mingguan-mandor.md`
- `docs/alur/mandor.md`
- `docs/alur/pengawas.md`
- `docs/backend/checklist/project-progress.md`

## Status Saat Ini
Implemented Local Backend v1 / Frontend Pending.

## Tujuan Backend
Menyiapkan kontrak backend untuk jurnal mingguan Mandor sebagai bukti aktivitas kerja dan klaim awal, bukan sebagai sumber progress resmi proyek.

## Prinsip Utama
- Jurnal Mandor bukan progress resmi.
- `claimedProgress` adalah klaim Mandor.
- `verifiedProgress` tetap berasal dari Project Progress SOT.
- Jurnal approved/locked dapat menjadi bahan payment nanti.
- Pengawas assigned yang boleh review jurnal.
- Mandor hanya boleh membuat/mengedit jurnal milik proyek yang ditugaskan kepadanya.

## Database Contract

| Model/Table | Purpose | Required Fields | Optional Fields | Relations | Notes |
|---|---|---|---|---|---|
| `WeeklyJournal` | Header jurnal mingguan Mandor | `id`, `projectId`, `foremanId`, `supervisorId`, `weekStartDate`, `weekEndDate`, `status`, `createdAt`, `updatedAt` | `claimedProgress`, `summary`, `blockerNote`, `submittedAt`, `reviewedAt`, `lockedAt`, `reviewedById`, `verifiedProgressSnapshot` | `Project`, `Foreman`, `Supervisor`, `WeeklyJournalActivity[]`, `WeeklyJournalPhoto[]`, `WeeklyJournalReviewLog[]` | Jurnal utama per proyek/mandor/periode minggu |
| `WeeklyJournalActivity` | Detail aktivitas pekerjaan mingguan | `id`, `weeklyJournalId`, `workTitle`, `description`, `createdAt`, `updatedAt` | `projectStageId`, `rabItemId`, `location`, `volume`, `unit`, `workerCount`, `startDate`, `endDate`, `progressClaim`, `notes` | `WeeklyJournal`, optional `ProjectStage`, optional `RabItem` | Menyimpan aktivitas kerja, bukan progress resmi |
| `WeeklyJournalPhoto` | Foto pendukung jurnal | `id`, `weeklyJournalId`, `photoUrl`, `createdAt` | `activityId`, `caption`, `takenAt`, `uploadedAt` | `WeeklyJournal`, optional `WeeklyJournalActivity` | Untuk fase awal `photoUrl` boleh string URL/manual placeholder |
| `WeeklyJournalReviewLog` | Riwayat review/status jurnal | `id`, `weeklyJournalId`, `actorRole`, `actorId`, `action`, `newStatus`, `createdAt` | `oldStatus`, `note` | `WeeklyJournal` | Audit trail perubahan status dan review |

> [!NOTE]
> Ini kontrak database, bukan implementasi Prisma sekarang. Jangan ubah schema Prisma atau membuat migration pada tahap ini.

## Enum / Status

| Enum | Values | Notes |
|---|---|---|
| `WeeklyJournalStatus` | `draft`, `submitted`, `under_review`, `revision_requested`, `approved`, `rejected`, `locked` | Status utama jurnal |
| `WeeklyJournalReviewAction` | `submit`, `start_review`, `request_revision`, `approve`, `reject`, `lock`, `reopen` | Aksi perubahan status |

### Aturan Status:
- **draft**: Dibuat Mandor, masih bisa diedit.
- **submitted**: Dikirim Mandor, menunggu review Pengawas.
- **under_review**: Sedang direview Pengawas.
- **revision_requested**: Dikembalikan ke Mandor untuk revisi.
- **approved**: Disetujui Pengawas.
- **rejected**: Ditunjuk Pengawas.
- **locked**: Dikunci, tidak bisa diedit lagi dan bisa menjadi bukti payment nanti.
- **reopen**: Hanya konsep future/admin override, jangan implementasikan dulu.

## API Contract

| Method | Endpoint | Actor | Purpose | Request | Response | Error |
|---|---|---|---|---|---|---|
| `GET` | `/api/weekly-journals` | Mandor / Pengawas / Admin | List jurnal berdasarkan role/filter | `projectId?`, `foremanId?`, `supervisorId?`, `status?`, `weekStartDate?`, `weekEndDate?`, `actorRole`, `actorId` | List jurnal | 403 jika actor tidak boleh akses |
| `GET` | `/api/weekly-journals/:id` | Mandor / Pengawas / Admin | Detail jurnal | `actorRole`, `actorId` | Detail jurnal + activities + photos + reviewLogs | 403 / 404 |
| `POST` | `/api/weekly-journals` | Mandor | Membuat draft jurnal | `actorRole`, `actorId`, `projectId`, `weekStartDate`, `weekEndDate`, `summary?`, `claimedProgress?` | Created journal | 400 / 403 |
| `PATCH` | `/api/weekly-journals/:id` | Mandor | Edit draft/revision jurnal | fields jurnal + activities/photos | Updated journal | 400 / 403 |
| `POST` | `/api/weekly-journals/:id/submit` | Mandor | Submit jurnal ke Pengawas | `actorRole`, `actorId` | status `submitted` | 400 / 403 |
| `POST` | `/api/weekly-journals/:id/review` | Pengawas | Review jurnal | `actorRole`, `actorId`, `action`, `note?` | Updated status + review log | 400 / 403 |
| `POST` | `/api/weekly-journals/:id/lock` | Pengawas/Admin future | Lock jurnal approved | `actorRole`, `actorId` | status `locked` | 400 / 403 |

> [!NOTE]
> Karena belum ada JWT/RBAC produksi, actor lokal dikirim via body/query untuk local development. Jangan membuat endpoint ini sekarang.

## Status Transition Matrix

| From | Action | Actor | To | Rule |
|---|---|---|---|---|
| `none` | `create_draft` | Mandor assigned | `draft` | Mandor harus assigned ke project |
| `draft` | `edit` | Mandor owner | `draft` | Hanya jurnal miliknya |
| `draft` | `submit` | Mandor owner | `submitted` | Minimal punya summary atau activity |
| `submitted` | `start_review` | Pengawas assigned | `under_review` | Pengawas harus assigned ke project |
| `submitted` | `approve` | Pengawas assigned | `approved` | Review note optional |
| `submitted` | `request_revision` | Pengawas assigned | `revision_requested` | Note wajib |
| `submitted` | `reject` | Pengawas assigned | `rejected` | Note wajib |
| `under_review` | `approve` | Pengawas assigned | `approved` | Review selesai |
| `under_review` | `request_revision` | Pengawas assigned | `revision_requested` | Note wajib |
| `under_review` | `reject` | Pengawas assigned | `rejected` | Note wajib |
| `revision_requested` | `edit` | Mandor owner | `revision_requested` | Mandor boleh revisi |
| `revision_requested` | `submit` | Mandor owner | `submitted` | Submit ulang |
| `approved` | `lock` | Pengawas/Admin future | `locked` | Untuk bukti payment nanti |
| `locked` | `edit` | Any | `locked` | Forbidden |
| `rejected` | `edit` | Any | `rejected` | Forbidden pada fase awal |

## Allowed Action Matrix

| Role | Condition | Allowed Actions | Forbidden Actions |
|---|---|---|---|
| Mandor assigned | Project assigned to foreman | create draft, edit draft, submit, revise revision_requested, view own journal | approve, reject, lock, edit approved/locked, edit other foreman journal |
| Pengawas assigned | Project assigned to supervisor | view submitted journals, start review, approve, request revision, reject, view history | create Mandor journal, edit Mandor journal content, change payment, change RAB |
| Admin | Internal monitoring | view journals, view review status, future lock/admin override | create Mandor journal, approve technical progress directly |
| Konsumen | None | no direct access | view raw journal, view internal review notes |

## Validation & Error Rules

| Rule | Error Message / Code | Notes |
|---|---|---|
| Project wajib ada | `Project not found` / 404 | |
| Mandor harus assigned ke project | `Foreman is not assigned to this project` / 403 | |
| Pengawas harus assigned ke project saat review | `Supervisor is not assigned to this project` / 403 | |
| Periode minggu wajib valid | `Invalid journal period` / 400 | `weekStartDate <= weekEndDate` |
| Tidak boleh duplicate jurnal per project/foreman/week | `Weekly journal already exists for this period` / 400 | Tambahkan unique rule nanti |
| claimedProgress 0-100 | `Claimed progress must be between 0-100` / 400 | Klaim, bukan progress resmi |
| submit butuh minimal summary/activity | `Journal must contain summary or activity before submit` / 400 | |
| request_revision/reject wajib note | `Review note is required` / 400 | |
| approved/locked tidak bisa diedit | `Journal is locked or approved` / 400 | |

## Integrasi dengan Alur Lain

- **Project Progress SOT**:
  - Jurnal boleh menjadi referensi verifikasi, tetapi tidak otomatis mengubah `verifiedProgress`.
- **Laporan Mingguan Pengawas**:
  - Laporan Pengawas nanti mengambil jurnal approved sebagai bahan rekap/evaluasi.
- **Payment Foreman**:
  - Payment nanti hanya boleh memakai jurnal approved/locked sebagai bukti pendukung.
- **Progress to Customer**:
  - Konsumen tidak melihat jurnal mentah.
  - Konsumen hanya melihat progress verified yang dipublish Admin.

## Tidak Dikerjakan di Fase Ini
- [ ] Payment Foreman.
- [ ] Laporan Mingguan Pengawas.
- [ ] Progress to Customer.
- [ ] Upload file/foto fisik final.
- [ ] Notification system.
- [ ] JWT/RBAC production.
- [ ] Auto-update verified progress dari jurnal.
- [ ] Customer visibility.

## Acceptance Criteria
- [x] Kontrak database jurnal sudah jelas.
- [x] Status flow jurnal sudah jelas.
- [x] API contract jurnal sudah jelas.
- [x] Mandor hanya bisa membuat/edit jurnal miliknya.
- [x] Pengawas assigned yang bisa review.
- [x] Jurnal tidak mengubah progress resmi secara otomatis.
- [x] Jurnal approved/locked bisa menjadi basis payment nanti.
- [x] Konsumen tidak punya akses ke jurnal mentah.
- [x] Prisma model implemented.
- [x] API list/detail/create/update/submit/review implemented.
- [x] Review log implemented.
