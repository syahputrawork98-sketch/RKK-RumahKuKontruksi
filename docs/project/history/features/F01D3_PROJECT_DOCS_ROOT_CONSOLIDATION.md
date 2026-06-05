# F01D.3 — Project Docs Root Consolidation and Compact Index

## Story
Direktori `docs/project/` sebelumnya dipenuhi dengan file-file markdown longgar (seperti `workflow-sop.md`, `current-status.md`, `hold-and-follow-up.md`) yang rentan menjadi duplikasi dari sistem tracking aktif. Batch ini bertujuan merapikan direktori root dokumentasi proyek agar menjadi *compact index* sesuai pola kerja yang benar, dengan memindahkan dokumen usang ke karantina dan mengekstrak informasi yang masih relevan ke dokumen aktif yang semestinya.

## Status
- **Current Status**: Completed

## Tujuan
- Melakukan inventarisasi dan konsolidasi terhadap file-file longgar di `docs/project/`.
- Memperbarui `WORKING_SYSTEM.md` dengan ekstraksi aturan penting dari `workflow-sop.md`.
- Menyelamatkan informasi operasional terkini dari file usang ke dalam riwayat ini sebelum memindahkannya ke *legacy*.
- Menjadikan `README.md` utama sebagai satu-satunya *entry point* di root proyek dokumentasi.

## Scope
- Area spesifik: `docs/project/` root, `WORKING_SYSTEM.md`, tracker aktif, dan folder *legacy quarantine*.

## Ringkasan Ekstraksi Operasional Lama
*(Berasal dari `current-status.md` dan `hold-and-follow-up.md`)*
- **Status Proyek Terakhir (Legacy)**: Local Development Feature Completion. Batch 101-110 terakhir membahas *Payment Flow Persistence & Hardening*.
- **Hold (Postponed)**: Integrasi Production Auth, Payment Gateway riil (Midtrans, dll), fitur ekspor PDF resmi. Semuanya masih ditahan pada tahap *Local Development*.
- **Source of Truth**: *Project.verifiedProgress* tetap diakui sebagai SOT mutlak.

## File Root `docs/project/` yang Ditemukan
1. `commit-rules.md`
2. `current-status.md`
3. `hold-and-follow-up.md`
4. `migration-plan.md`
5. `migration_analysis.md`
6. `operational_qa_summary.md`
7. `overview.md`
8. `roadmap-active.md`
9. `scope-guard.md`
10. `workflow-sop.md`

## File yang Dipindahkan ke Legacy Quarantine
Kesepuluh file di atas dipindahkan secara utuh ke `docs/_legacy/original-docs/project-root/`.

## File yang Diubah
- `docs/project/README.md` (Menjadi compact index)
- `docs/project/workflow/WORKING_SYSTEM.md` (Mendapat injeksi Scope Guard dan Aturan Acceptance)
- `docs/project/history/FEATURE_HISTORY.md` (Menambahkan referensi ke batch F01D.3)
- `docs/project/history/CURRENT_STATUS.md` (Memperbarui status F01D.3 menjadi *Completed*)
- `docs/project/migration/LEGACY_DOCS_INVENTORY.md` (Pencatatan inventaris baru)
- `docs/project/migration/LEGACY_DOCS_MIGRATION_TRACKER.md` (Pelacakan status migrasi baru)

## File/Folder yang Tidak Disentuh
- `client/`, `server/`, codebase aktif.
- File-file fitur `F02-F13`.
- File kredensial dan repositori database.

## Ringkasan Hasil Konsolidasi
Seluruh file markdown longgar di `docs/project/` telah divakum ke dalam folder arsip karantina tanpa penghapusan absolut. Aturan-aturan berharga dari `workflow-sop.md` (terkait eksekutor AI dan larangan Bypass) telah terselamatkan ke dalam `WORKING_SYSTEM.md`. Root direktori dokumentasi kini berpusat hanya pada `README.md` sebagai gerbang navigasi utama.

## Definition of Done
1. Root `docs/project/` bersih dari file `.md` parsial, hanya menyisakan index fungsional (`README.md`).
2. Isi penting dari *workflow* lama telah terintegrasi di `WORKING_SYSTEM.md`.
3. Inventory `LEGACY_DOCS_INVENTORY.md` dan Tracker memperbarui pencatatan file-file *project-root* tersebut.
4. Riwayat eksekusi (F01D.3) telah terdaftar di `FEATURE_HISTORY.md`.

## Validasi
- `find` command membuktikan root folder sudah bersih.
- Repositori aktif `client/` & `server/` bebas dari manipulasi eksidental.

## Catatan Risiko
- Status dari file-file yang baru dipindahkan ke karantina adalah `Migrated` atau `Safe to Delete Later`. Pastikan tahap *Cleanup* (F01E) kelak mengevaluasi folder `project-root` ini bersama dengan `alur/` dan `modules/`.

## Next Step
- Merencanakan tahap akhir dari siklus dokumentasi, yaitu eksekusi *Cleanup* permanen untuk mengeliminasi beban folder `_legacy/` secara terstruktur (F01E).
