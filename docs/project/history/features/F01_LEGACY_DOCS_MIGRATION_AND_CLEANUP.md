# F01 — Legacy Docs Migration and Cleanup

## Feature Summary
F01 adalah fase merapikan dokumentasi RKK lama menjadi struktur aktif yang compact. Proses ini melibatkan pemindahan isi yang relevan ke direktori aktif, meringkas sejarah lama, dan membersihkan folder usang yang redundan tanpa menghapus logika fundamental yang belum diverifikasi.

## Status
In Progress / Partial

*Catatan: Jangan mengubah ke Completed dulu karena `alur/`, `modules/`, dan `technical/` belum selesai keputusan akhirnya.*

## Story
RKK awalnya memiliki banyak dokumen lama dan file longgar dari pengerjaan lampau yang berserakan di repositori. Batch F01 hadir untuk memigrasikan informasi penting ke dalam dokumentasi aktif RKK, memadatkan sejarah pengerjaan, dan membersihkan area *legacy* yang sudah aman, sembari mempertahankan struktur dasar untuk diverifikasi kelak saat *codebase* diperbaiki.

## Current State
Kondisi terbaru pada sistem dokumentasi:
- `technical/` migrated ke `docs/frontend/`, `docs/backend/`, `docs/database/`. Menunggu keputusan *cleanup*.
- `alur/` dan `modules/` sudah dibuat initial active summary, tapi masih *pending per-feature verification*.
- `project-root/` deleted in F01E.2.
- `archive/` deleted in F01E.1.
- `batches/` deleted in F01E.3.
- `technical/` masih menunggu keputusan cleanup.
- `alur/` dan `modules/` belum boleh masuk tahap cleanup.

## Sub-Batch Roadmap
| Sub-Batch | Name | Status | Purpose | Notes |
|---|---|---|---|---|
| F01D.1 | Technical Migration | Completed | Ekstraksi pedoman teknis | ... |
| F01D.2 | Functional Migration | Completed / Pending Verification | Ekstraksi bisnis dan alur kerja peran | alur/modules pending per-feature verification |
| F01D.3 | Project Root Consolidation | Completed | Pembersihan root docs project dan workflow | project-root moved then cleaned |
| F01D.4 | Compact Feature Summary | Completed | Pembuatan ringkasan root (FITUR.md) | FITUR.md and dashboard |
| F01D.5 | Batches Summary | Completed | Peringkasan log sejarah legacy batch lama | batches summarized then cleaned |
| F01E.1 | Archive Cleanup | Completed | Eksekusi penghapusan folder archive/ | deleted |
| F01E.2 | Project Root Cleanup | Completed | Eksekusi penghapusan folder project-root/ | deleted |
| F01E.3 | Batches Cleanup | Completed | Eksekusi penghapusan folder batches/ | deleted |
| F01E.4 | Technical Cleanup | Not Started / Pending Decision | Audit dan eksekusi cleanup area technical | do not execute in this batch |
| F01F | Per-Feature Verification | Not Started | Verifikasi sinkronisasi alur dokumen dengan fitur aktif | validate F02–F13, required before alur/modules cleanup |

## Earlier F01 Consolidation
- `F01 Existing Baseline`: baseline repo lama sudah dicatat dan dipindahkan ke project-control.
- `F01B Legacy Docs Quarantine`: dokumen lama dikarantina ke `docs/_legacy/original-docs`.
- `F01C Legacy Docs Review Mapping`: technical, alur, modules, batches, archive dipetakan untuk migrasi/cleanup.
- Semua detail lama kini tidak menjadi active feature file terpisah.

## Project Control Compaction
- `baseline/` summarized into F01
- `migration/` summarized into F01
- active docs now rely on `history/F01` + `FEATURE_HISTORY` + `CURRENT_STATUS`
- old control folders moved to `legacy/project-control`

## Cleanup Status
| Legacy Folder | Status | Decision |
|---|---|---|
| `archive/` | Deleted in F01E.1 | Done |
| `project-root/` | Deleted in F01E.2 | Done |
| `batches/` | Deleted in F01E.3 | Done |
| `technical/` | Migrated | Pending cleanup decision |
| `alur/` | Migrated — Pending Per-Feature Verification | Keep |
| `modules/` | Migrated — Pending Per-Feature Verification | Keep |

## HOLD / Blocked Notes
- `alur/` dan `modules/` tidak boleh dihapus sebelum F02–F13 diverifikasi keandalannya.
- `technical/` boleh diaudit, tapi jangan lakukan operasi cleanup di batch F01H ini.
- Jangan membuat history note anak baru lagi untuk pekerjaan kecil.

## Next Step
- Jika mau lanjut docs cleanup: Mulai F01E.4 Technical Cleanup, tetapi hanya setelah keputusan Roomchat 00 yang tegas.
- Jika mau lanjut produk: Mulai proses verifikasi *codebase* F02/F03 (Frontend publik / layout role).
