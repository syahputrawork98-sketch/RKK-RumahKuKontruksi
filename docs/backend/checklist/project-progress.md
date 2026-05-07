# Backend Checklist - Verifikasi Progres Proyek

## Source Alur
- [docs/alur/pengawas.md](../../alur/pengawas.md)
- [docs/alur/jurnal-mingguan-mandor.md](../../alur/jurnal-mingguan-mandor.md)

## Status Saat Ini
**Implemented Local Workflow v1**. Database-backed dengan local dev actor validation. No JWT/RBAC yet.

## Tujuan Backend
Menyediakan mekanisme bagi Pengawas untuk memverifikasi progres fisik di lapangan yang menjadi sumber kebenaran data (*Single Source of Truth*) bagi seluruh sistem.

## Database Contract
| Model/Table | Purpose | Required Fields | Optional Fields | Relations | Notes |
|---|---|---|---|---|---|
| `Project` | Update progress resmi | `verifiedProgress` (Float) | - | - | Simpan status terakhir |
| `ProgressVerificationLog` | Riwayat verifikasi | `id`, `projectId`, `supervisorId`, `previousProgress`, `newProgress`, `notes`, `createdAt` | `stageId`, `sourceJournalId`, `evidencePhotoId` | `Project`, `Supervisor` | **Soft Delete Only** |

## Enum / Status
| Enum | Values | Notes |
|---|---|---|
| `ProjectProgressStatus` | `not_started`, `in_progress`, `on_hold`, `completed` | Status siklus proyek |
| `ProgressVerificationAction` | `verify`, `revise`, `rollback_request` | Aksi saat verifikasi |

## API Contract
| Method | Endpoint | Actor | Purpose | Request Body | Response | Error |
|---|---|---|---|---|---|---|
| `PATCH` | `/api/projects/:id/verify-progress` | Pengawas Assigned | Update progress resmi | `{ verifiedProgress, notes, stageId? }` | Project Updated + Log Entry | 403 (Non-assigned), 400 (Invalid range) |
| `GET` | `/api/projects/:id/progress-history` | Admin / Pengawas Assigned | Melihat riwayat progress | - | List of `ProgressVerificationLog` | 403 (Unauthorized) |

## Status Transition Matrix
| From | Action | Actor | To | Rule |
|---|---|---|---|---|
| `in_progress` | `verify` | Assigned Pengawas | `in_progress` | Update `verifiedProgress` |
| `in_progress` | `progress 100` | Assigned Pengawas | `completed` (Candidate) | Membutuhkan review Admin untuk status final |
| `completed` / `closed` | `verify` | - | - | **Forbidden** (Read-only) |

## Allowed Action Matrix
| Role | Status/Condition | Allowed Actions | Forbidden Actions |
|---|---|---|---|
| Pengawas Assigned | `in_progress` | `verify progress`, `add notes` | Delete logs |
| Pengawas Non-assigned | Any | `view` (Internal) | `verify progress` |
| Mandor | `in_progress` | `view verified progress`, `submit claim` | `change verified progress` |
| Admin | Any | `view history`, `publish to customer` | `change field progress` |
| Konsumen | Any | `view published progress` | `view internal claim` |

## Validation & Error Rules
| Rule | Error Message / Code | Notes |
|---|---|---|
| Range Check | `Progress must be between 0-100` | HTTP 400 |
| Decrement Check | `Progress cannot decrease without admin override` | Cegah manipulasi data |
| Notes Length | `Notes must be at least 10 characters` | Wajib alasan teknis |
| Assignment Check | `You are not assigned to this project` | HTTP 403 |
| Status Check | `Project is not in active state` | HTTP 400 |

## Acceptance Criteria
- [x] Progress resmi hanya bisa diubah oleh Pengawas yang ditugaskan (*Assigned*).
- [x] Setiap perubahan progress secara otomatis membuat entri di `ProgressVerificationLog`.
- [x] Mandor tidak memiliki izin untuk mengubah `verifiedProgress`.
- [x] Admin bertindak sebagai pemantau, bukan pembuat progress lapangan.
- [x] Progress tidak boleh turun dari nilai sebelumnya (Phase 1).
- [x] Validasi notes minimal 10 karakter.

## Integrasi dengan Alur Lain
- [ ] Dasar untuk [Payment Foreman](./payment-foreman.md).
- [ ] Dasar untuk [Progress to Customer](./progress-to-customer.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Otomasi perhitungan progres dari sub-task detail.
- [ ] Integrasi sensor IoT lapangan.
