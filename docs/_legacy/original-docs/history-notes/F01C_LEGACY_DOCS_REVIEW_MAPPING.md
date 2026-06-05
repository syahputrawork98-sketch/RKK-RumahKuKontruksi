# F01C — Legacy Docs Review and Active Docs Mapping

## Story
Folder legacy yang dikarantina (`alur`, `archive`, `batches`, `modules`, `technical`) perlu dinilai nilai relevansinya. Melalui batch ini, kita melakukan review mendalam tanpa menghapus file lama, agar migrasi ke dokumentasi aktif dapat dilakukan secara terarah dan terencana pada batch berikutnya.

## Status
- **Current Status**: Completed

## Tujuan
1. Mereview isi folder `docs/_legacy/original-docs/`.
2. Memetakan informasi penting ke target dokumentasi aktif yang sesuai.
3. Memperbarui status migrasi pada inventory dan tracker agar lebih jelas dan spesifik.

## Scope
- Membaca folder `alur/`, `archive/`, `batches/`, `modules/`, dan `technical/` di legacy karantina.
- Memperbarui file tracker di `docs/project/migration/`.

## File/Folder Legacy yang Direview
1. `docs/_legacy/original-docs/alur/`
2. `docs/_legacy/original-docs/archive/`
3. `docs/_legacy/original-docs/batches/`
4. `docs/_legacy/original-docs/modules/`
5. `docs/_legacy/original-docs/technical/`

## File yang Dibuat
- `docs/project/migration/LEGACY_DOCS_REVIEW_F01C.md`
- `docs/project/history/features/F01C_LEGACY_DOCS_REVIEW_MAPPING.md`

## File yang Diubah
- `docs/project/migration/LEGACY_DOCS_INVENTORY.md`
- `docs/project/migration/LEGACY_DOCS_MIGRATION_TRACKER.md`
- `docs/project/migration/LEGACY_DOCS_CLEANUP_PLAN.md`
- `docs/project/history/CURRENT_STATUS.md`
- `docs/project/history/FEATURE_HISTORY.md`

## File/Folder yang Tidak Disentuh
- `client/`
- `server/`
- `package files`, konfigurasi, dan file `.env`
- Tidak ada file legacy yang dihapus atau dipindahkan dari karantina.

## Hasil Review Ringkas
- **Technical & Modules & Alur**: Memiliki prioritas `High` untuk dimigrasikan karena memuat blueprint sistem, *dev persona switcher*, dan arsitektur route/logika. Targetnya adalah README teknis dan *feature tracker* di masa depan.
- **Archive & Batches**: Memiliki prioritas `Low`. Berfungsi sebagai jejak histori lama dan direkomendasikan untuk masuk kandidat *Safe to Delete Later* di fase cleanup.

## Definition of Done
1. Semua folder legacy utama sudah direview (`alur/`, `archive/`, `batches/`, `modules/`, `technical/`).
2. `LEGACY_DOCS_REVIEW_F01C.md` dibuat.
3. `LEGACY_DOCS_MIGRATION_TRACKER.md` sudah memiliki target aktif yang lebih jelas.
4. `LEGACY_DOCS_INVENTORY.md` sudah mencerminkan hasil review.
5. `LEGACY_DOCS_CLEANUP_PLAN.md` sudah diperbarui dengan urutan setelah F01C.
6. `CURRENT_STATUS.md` dan `FEATURE_HISTORY.md` sudah diperbarui.
7. Tidak ada file legacy yang dihapus, dipindahkan, atau mengganggu `client/` dan `server/`.

## Next Step
- Mengajukan eksekusi Batch **F01D — Legacy Docs Active Migration** untuk melakukan migrasi ekstraksi informasi kunci.
