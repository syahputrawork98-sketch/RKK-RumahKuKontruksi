# F01E.2 — Consolidated Project Root Legacy Cleanup

## Story
Berdasarkan tinjauan arsip dokumentasi, subfolder `docs/_legacy/original-docs/project-root/` diidentifikasi sebagai repositori lama yang sebelumnya memuat file-file panduan usang, *overview*, dan aturan operasional tingkat tinggi. Sebagian besar muatan vital dari berkas-berkas ini sebelumnya telah sukses dikonsolidasikan dan dipindahkan pada eksekusi Batch **F01D.3** (yang memadatkan aturan ke `docs/project/README.md` dan `docs/project/workflow/`). Oleh karena itu, *legacy folder* ini sekarang bertindak sebagai draf kosong/redundan yang siap dieliminasi dalam kelanjutan fase bersih-bersih (*cleanup*).

## Status
- **Current Status**: Completed

## Tujuan
- Mengeksekusi penghapusan (*cleanup*) fisik bertahap kedua yang ditargetkan eksklusif pada folder `project-root/`.
- Membersihkan jejak file-file konsolidasi lama yang telah tidak lagi memiliki ketergantungan atau informasi fungsional yang valid.
- Merapikan ruang arsip karantina tanpa membahayakan direktori struktural yang masih belum sepenuhnya terverifikasi.

## Scope
- Area spesifik: `docs/_legacy/original-docs/project-root/` (Penghapusan fisik).
- Pencatatan log rekam jejak migrasi dan riwayat status proyek.

## Folder yang Dihapus
- `docs/_legacy/original-docs/project-root/` (Berisi fail *markdown* seperti `commit-rules.md`, `current-status.md`, `workflow-sop.md`, dll yang semuanya merupakan file kedaluwarsa).

## File yang Dibuat
- `docs/project/history/features/F01E2_CONSOLIDATED_PROJECT_ROOT_LEGACY_CLEANUP.md`

## File yang Diubah
- `docs/project/history/CURRENT_STATUS.md`
- `docs/project/history/FEATURE_HISTORY.md`
- `docs/project/migration/LEGACY_DOCS_INVENTORY.md`
- `docs/project/migration/LEGACY_DOCS_MIGRATION_TRACKER.md`

## File/Folder yang Tidak Disentuh
- *Folder legacy* utama yang krusial (*pending verification*): `alur/`, `modules/`, `batches/`, `technical/`.
- Folder arsip `archive/` (Sudah dihapus secara fisik pada F01E.1).
- Struktur aplikasi berjalan pada `client/` maupun `server/`.
- Konfigurasi `package.json`, *environment variables* (`.env`), atau *Prisma Schema*.
- Master plan migrasi (`LEGACY_DOCS_CLEANUP_PLAN.md`) dan *Feature Tracking* aktif `F02-F13`.

## Alasan Cleanup Aman
- Semua instruksi *SOP*, status fitur, dan *roadmap* yang tercantum pada folder ini sudah dipadatkan (*Consolidated*) dan dimigrasikan dengan baik ke dalam pedoman kerja modern melalui eksekusi Batch F01D.3. Folder ini sudah dinilai kehilangan nilai informasinya.

## Definition of Done
1. Seluruh keberadaan folder `docs/_legacy/original-docs/project-root/` hilang sepenuhnya dari pelacakan repositori.
2. Tidak ada gangguan pada keberadaan sisa folder arsip *legacy* lainnya.
3. *Feature History* dan dasbor *Current Status* ter-update untuk mendokumentasikan suksesnya langkah F01E.2 ini.
4. Baris entri *project-root* dalam *Migration Tracker* dan *Inventory* menyesuaikan status terkininya menjadi `Deleted in F01E.2`.

## Validasi
- Bukti silang melalui `git diff --name-only` telah menandakan ruang lingkup yang terjaga, di mana fail baru yang dibuat murni berasal dari rentetan modifikasi dokumentasi penjejak dan penghapusan khusus target `project-root`.
- Pembacaan folder via CLI `dir` membuktikan kehadiran *alur*, *batches*, *modules*, dan *technical* tanpa cacat sedikitpun.

## Catatan Risiko
- Penuntasan arsip yang lebih kompleks seperti `alur/` dan `modules/` akan memberikan dampak serius jika ditangani sembarangan sebelum seluruh kode fitur terkait divaksinasi dan divalidasi. Tahap berikutnya mutlak berfokus ke perbaikan *codebase*.

## Next Step
- Menghentikan agenda *Cleanup* fisik sementara waktu untuk menghindari kerusakan fatal. Mulai transisi penuh menuju perbaikan dan pemeriksaan komprehensif sistem *codebase* per fitur (`F02` dan seterusnya).
