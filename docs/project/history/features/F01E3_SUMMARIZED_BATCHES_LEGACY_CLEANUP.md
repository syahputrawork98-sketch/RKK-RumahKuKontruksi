# F01E.3 — Summarized Batches Legacy Cleanup

## Story
Berdasarkan kelanjutan dari rencana pembersihan bertahap dokumentasi lama (Legacy Cleanup), direktori `docs/_legacy/original-docs/batches/` menjadi target eliminasi. Pada tahap sebelumnya (**F01D.5**), keseluruhan sejarah pengerjaan Batch 01 hingga 110 telah diekstrak intisarinya secara aman ke dalam berkas `F01D5_LEGACY_BATCHES_HISTORY_SUMMARY.md`. Mengingat log mentah historis tersebut tidak lagi memiliki fungsi teknis langsung terhadap *codebase* modern, maka pembersihan fisik pada *folder batches* ini dinyatakan aman untuk dieksekusi demi menjaga keringkasan repositori.

## Status
- **Current Status**: Completed

## Tujuan
- Mengeksekusi penghapusan fisik bertahap ketiga eksklusif pada folder log iterasi masa lalu (`batches/`).
- Mengurangi beban tumpukan berkas tak berguna yang berpotensi membingungkan pengembang baru.
- Membuktikan bahwa dokumentasi riwayat (`F01D5_LEGACY_BATCHES_HISTORY_SUMMARY.md`) telah cukup tangguh untuk mewakili seluruh jejak masa lampau yang dihapus.

## Scope
- Area spesifik: `docs/_legacy/original-docs/batches/` (Penghapusan fisik folder dan seluruh isinya).
- Pencatatan log status pelacakan fitur dan *migration tracker*.

## Folder yang Dihapus
- `docs/_legacy/original-docs/batches/` (Berisi serangkaian fail `.md` dari `batch-01-10.md` hingga `batch-101-110.md`).

## File yang Dibuat
- `docs/project/history/features/F01E3_SUMMARIZED_BATCHES_LEGACY_CLEANUP.md`

## File yang Diubah
- `docs/project/history/CURRENT_STATUS.md`
- `docs/project/history/FEATURE_HISTORY.md`
- `docs/project/migration/LEGACY_DOCS_INVENTORY.md`
- `docs/project/migration/LEGACY_DOCS_MIGRATION_TRACKER.md`

## File/Folder yang Tidak Disentuh
- Intisari riwayat yang telah dibuat pada: `docs/project/history/features/F01D5_LEGACY_BATCHES_HISTORY_SUMMARY.md` (Fail penopang riwayat utama).
- *Folder legacy* tersisa: `alur/`, `modules/`, dan `technical/`.
- Repositori aktif pada `client/` dan `server/`.
- Struktur konfigurasi lingkungan aplikasi (`.env`, `package.json`, *Prisma Schema*).
- Status pendataan fitur fungsional `F02-F13`.

## Alasan Cleanup Aman
- Tidak ada sebaris pun *source code* sistem berjalan yang merujuk pada direktori ini.
- Semua nilai historis telah dilestarikan via dokumen rekaman padat pada *Batch F01D.5*.

## Definition of Done
1. Keseluruhan folder `docs/_legacy/original-docs/batches/` bersih tidak bersisa di lingkup repositori Git.
2. Direktori-direktori warisan lainnya tidak ikut tersapu.
3. Berkas saksi sejarah `F01D5_LEGACY_BATCHES_HISTORY_SUMMARY.md` dibiarkan utuh tidak terhapus.
4. *Migration Tracker* dan dasbor *Current Status* memperlihatkan mutasi status dari `Summarized` menjadi `Deleted in F01E.3`.

## Validasi
- Penelusuran via `git diff --name-only` telah membuktikan bahwa perubahan tidak menjalar ke fail kritis lain.
- Pengecekan keberadaan struktur dasar (`dir`) pada area penampungan karantina membenarkan absensi permanen dari entitas `batches/`.

## Catatan Risiko
- Penuntasan agenda pembersihan pada sisa folder kunci, semacam `alur/` dan `modules/`, harus direm kembali. Sangat riskan menghapusnya sekarang tanpa melewati fase pembuktian operasional pada *codebase* per masing-masing fitur di masa depan.

## Next Step
- Mengarahkan perhatian dari fase "pembersihan arsip mati" menuju "pembuktian arsip hidup". Rencana selanjutnya idealnya langsung menargetkan konfirmasi berjalannya *Frontend* publik atau skema antarmuka dasar (*Batch F02/F03*).
