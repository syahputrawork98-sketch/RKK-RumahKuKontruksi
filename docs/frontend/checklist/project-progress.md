# Frontend Checklist - Verifikasi Progres Proyek

## Source Alur
- [docs/alur/pengawas.md](../../alur/pengawas.md)

## Status Saat Ini
**Experimental / Backend Pending**. UI shell sudah ada namun belum terhubung ke API verifikasi rill.

## Tujuan UI
Memberikan antarmuka bagi Pengawas untuk mengupdate progres resmi proyek secara akurat.

## Page Contract
| Page | Route | Actor | Purpose | Data Source |
|---|---|---|---|---|
| List Verifikasi | `/pengawas/verifikasi-progres` | Pengawas | Daftar proyek yang perlu verifikasi | `projectService.getProjects({ supervisorId })` |
| Form Verifikasi | `/pengawas/verifikasi-progres/:id` | Pengawas | Form update progress resmi | `projectService.getProjectById(id)` + Progress History |
| Admin Monitoring | `/admin/laporan-progress` | Admin | Memantau progress verified | `projectService.getProjects()` |
| Konsumen Timeline | `/konsumen/proyek` (atau terkait) | Konsumen | Melihat progress resmi dipublish | `customerService.getPublishedProgress()` |

## Component Contract
| Component | Used By | Data / Props | Notes |
|---|---|---|---|
| `ProgressVerificationForm` | Form Verifikasi | `currentProgress`, `onSave` | Form utama verifikasi |
| `ProgressSlider` | `ProgressVerificationForm` | `value`, `onChange` | Input intuitif 0-100% |
| `ProgressHistoryTimeline` | Form Verifikasi (Side) | `logs[]` | Riwayat verifikasi proyek |
| `ProgressComparisonCard` | Dashboard / Detail | `foremanClaim` vs `verifiedProgress` | Bandingkan klaim vs resmi |
| `VerifiedProgressBadge` | Global | `progressValue` | Badge indikator kebenaran data |
| `CustomerPublishedCard` | Konsumen Dashboard | `publishedValue` | Tampilan akhir untuk pelanggan |

## Service Mapping
| UI Action | Service/API | Success State | Error State |
|---|---|---|---|
| Update Progress | `PATCH /api/projects/:id/verify-progress` | Toast Success + Reload Log | Toast Error (Validation/Auth) |
| Load History | `GET /api/projects/:id/progress-history` | Render Timeline | Log Error to Console |
| Admin Publish | *Future Endpoint* | Progress Visible to Customer | HTTP 403 / 500 |

## Role Visibility Matrix
| UI Element | Admin | Pengawas | Mandor | Konsumen | Notes |
|---|---|---|---|---|---|
| Tombol Update Progress | No | Yes (Assigned) | No | No | |
| Verified Progress Badge | Yes | Yes | Yes (Readonly) | Yes (If Published) | |
| Mandor Claim Progress | Yes | Yes | Yes | No | |
| History Verification Log | Yes | Yes | No | No | |

## UI State Contract
| State | Trigger | UI Behavior |
|---|---|---|
| No Persona Selected | App Init | Tampilkan `RolePersonaEmptyState` |
| Loading Projects | Fetching Data | Skeleton loader pada list proyek |
| Empty Assigned | Search/Filter | Pesan "Tidak ada proyek yang ditugaskan" |
| API Error | Request Failure | Banner error dengan tombol retry |
| Validation Error | Form Submit | Pesan error di bawah input terkait |
| Readonly State | Closed Project | Form input disabled, tombol simpan hilang |
| Unpublished State | Konsumen View | Tampilkan status "Menunggu update admin" |

## Acceptance Criteria
- [ ] Pengawas hanya dapat melihat proyek yang ditugaskan (*Assigned*).
- [ ] Tombol "Update Progres" secara teknis tidak muncul untuk role Mandor atau Konsumen.
- [ ] Admin dapat melihat progres verified, namun dalam mode baca-saja (*Read-only*).
- [ ] Konsumen hanya melihat progres yang telah memiliki status `published`.
- [ ] UI membedakan secara visual antara **Klaim Mandor** (Draft) vs **Progres Resmi** (Verified).
- [ ] Jika API gagal (Error), UI tidak boleh melakukan *fallback* ke data mock untuk halaman berlabel DB-Backed.

## Integrasi dengan Alur Lain
- [ ] Mempengaruhi tampilan [Progress to Customer](./progress-to-customer.md).
- [ ] Mempengaruhi nominal di [Payment Foreman](./payment-foreman.md).

## Tidak Dikerjakan di Fase Ini
- [ ] Fitur upload foto bukti verifikasi langsung di form (Gunakan modul dokumentasi).
- [ ] Multi-approval verifikasi.
