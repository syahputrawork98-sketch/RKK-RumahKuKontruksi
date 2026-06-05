# F01E.1 — Low-Risk Legacy Archive Cleanup

## Story
Sejak awal fase migrasi dokumentasi RKK, telah diidentifikasi keberadaan direktori usang yang hanya berisi catatan sementara (temporary review) dan salinan redundan dari referensi bisnis. Direktori `archive/` ini sejak evaluasi awal (F01C) telah ditandai sebagai `Low Priority Archive` dan aman untuk dibersihkan (`Safe to Delete Later`). Berdasarkan persetujuan audit dari Roomchat 01, penghapusan bertahap (Cleanup) kini telah diizinkan untuk dimulai secara sangat terbatas pada area paling minim risiko ini.

## Status
- **Current Status**: Completed

## Tujuan
- Mengeksekusi penghapusan fisik pertama pada folder *legacy* RKK, spesifik hanya pada target dengan risiko paling rendah.
- Mensterilisasi repositori dari file-file yang menduplikasi aturan atau rancangan bisnis lama yang sudah tidak digunakan.
- Membuktikan bahwa tahapan *cleanup* dapat dijalankan secara presisi tanpa merusak repositori aktif atau struktur arsip lainnya.

## Scope
- Area spesifik: `docs/_legacy/original-docs/archive/` (Penghapusan).
- Pencatatan log historis pada *migration tracker* dan *feature history*.

## Folder yang Dihapus
- `docs/_legacy/original-docs/archive/` (Beserta seluruh isinya seperti `business-reference-legacy/` dan `temporary-review/`).

## File yang Dibuat
- `docs/project/history/features/F01E1_LOW_RISK_LEGACY_ARCHIVE_CLEANUP.md`

## File yang Diubah
- `docs/project/history/CURRENT_STATUS.md`
- `docs/project/history/FEATURE_HISTORY.md`
- `docs/project/migration/LEGACY_DOCS_INVENTORY.md`
- `docs/project/migration/LEGACY_DOCS_MIGRATION_TRACKER.md`

## File/Folder yang Tidak Disentuh
- *Folder legacy* lainnya (`alur/`, `modules/`, `batches/`, `technical/`, `project-root/`).
- `client/` dan `server/`.
- Repositori database, kredensial (`.env`), dan spesifikasi *Prisma*.
- File rencana cleanup (`LEGACY_DOCS_CLEANUP_PLAN.md`).
- File rekam fitur (`F02–F13`).

## Alasan Cleanup Aman
- Folder `archive/` sudah melewati audit *review* menyeluruh pada batch **F01C** dan dikonfirmasi tidak memuat struktur fungsional aplikasi terkini maupun histori penting (*batches*). 
- Isinya hanyalah coretan draf *temporary-review* yang redundan dan sudah lama tidak dirujuk pada *codebase* aktual maupun prosedur operasional aktif.

## Definition of Done
1. Keberadaan `docs/_legacy/original-docs/archive/` beserta isinya telah terhapus mutlak dari sistem *tracking* Git.
2. Tidak ada pergeseran, penghapusan, atau perubahan pada *source code* sistem utama maupun direktori *legacy* lainnya.
3. *Feature History* dan *Current Status* mencatat pengerjaan F01E.1 dengan status sukses.
4. *Inventory* dan *Migration Tracker* memperbarui baris *archive* menjadi `Deleted in F01E.1`.

## Validasi
- Instruksi `git diff --name-only` mengonfirmasi bahwa rentetan *deleted files* hanya mencakup subfolder dalam `archive/`.
- Instruksi `dir` (PowerShell) di `docs/_legacy/original-docs/` membuktikan direktori lain (`alur`, `batches`, `modules`, `project-root`, `technical`) tetap eksis secara utuh.

## Catatan Risiko
- Sekali pun tahap *Low-Risk Cleanup* ini berhasil, penghapusan di area karantina berikutnya (seperti `alur/` atau `modules/`) wajib melampaui fase validasi fitur (F02–F13) terlebih dahulu guna memitigasi kemungkinan *miss-information*.

## Next Step
- Tetap memfokuskan pengerjaan kembali pada validasi komponen-komponen fitur sistem (`F02` dan seterusnya) sembari menunggu sinyal keamanan untuk tahap eksekusi *Cleanup* berikutnya.
