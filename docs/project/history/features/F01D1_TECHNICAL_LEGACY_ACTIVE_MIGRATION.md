# F01D.1 — Technical Legacy Active Migration

## Story
Pada batch F01C, area dokumen teknis (frontend, backend, database) yang berada di dalam karantina legacy dinilai memiliki tingkat prioritas `High` untuk dimigrasi. Melalui batch F01D.1 ini, kita mengekstrak panduan fundamental (seperti policy API, Dev Persona Switcher, Data Source Policy) dari file teks lama tanpa menyalin secara membabi buta agar relevansi terhadap basis kode (codebase) aktif tetap terjaga.

## Status
- **Current Status**: Completed

## Tujuan
1. Mengekstrak dan merangkum intisari informasi penting dari file dokumentasi legacy ke dalam dokumentasi aktif RKK.
2. Memperbarui panduan dasar teknis pengembangan untuk area frontend, backend, dan database.
3. Mencatatkan status baru pada *inventory* dan *migration tracker*.

## Scope
- Area spesifik: `docs/frontend/`, `docs/backend/`, `docs/database/` dan file *tracker* di `docs/project/`.
- Membaca dokumen legacy teknis tanpa menghapus/memindahkannya.
- Mengubah dokumentasi teknis aktif di `docs/`.

## File Legacy yang Dibaca
- `docs/_legacy/original-docs/technical/README.md`
- `docs/_legacy/original-docs/technical/backend.md`
- `docs/_legacy/original-docs/technical/frontend.md`
- `docs/_legacy/original-docs/technical/database.md`
- `docs/_legacy/original-docs/technical/api-map.md`
- `docs/_legacy/original-docs/technical/data-source-policy.md`
- `docs/_legacy/original-docs/technical/dev-persona-switcher.md`

## File yang Dibuat
- `docs/project/history/features/F01D1_TECHNICAL_LEGACY_ACTIVE_MIGRATION.md`

## File yang Diubah
- `docs/frontend/README.md`
- `docs/backend/README.md`
- `docs/database/README.md`
- `docs/project/migration/LEGACY_DOCS_MIGRATION_TRACKER.md`
- `docs/project/migration/LEGACY_DOCS_INVENTORY.md`
- `docs/project/history/FEATURE_HISTORY.md`
- `docs/project/history/CURRENT_STATUS.md`

## File/Folder yang Tidak Disentuh
- `client/`
- `server/`
- Konfigurasi `package.json`, `.env`, schema prisma, vite config.
- Folder `docs/_legacy/original-docs/`.

## Ringkasan Hasil Migrasi
1. **Frontend**: Telah terangkum panduan React + Vite, Tailwind CSS, struktur routing multi-role, keberadaan komponen UI utama, serta pedoman ketat pelarangan *mock fallback*.
2. **Backend**: Telah terangkum pedoman Node.js + Express, arsitektur *routes-controller-service*, implementasi pengunggahan *multer*, simulasi auth, serta pelindung integritas data.
3. **Database**: Telah didokumentasikan struktur entitas, aturan soft delete, CUID, `Project.verifiedProgress` sebagai referensi tunggal, tipe data uang yang menggunakan `Decimal`, serta peringatan keras tentang kredensial dan file env.
4. Tracker `technical/` resmi ditandai sebagai `Migrated`.

## Definition of Done
1. Informasi penting teknis dari dokumen lama telah diringkas ke frontend/backend/database README.
2. Tidak ada file legacy yang dihapus, diganti namanya, atau dipindahkan.
3. Tidak ada perubahan yang terjadi pada `client/` atau `server/`.
4. Tidak ada kebocoran kredensial, *password*, token, atau *API key* ke dalam dokumentasi repositori.
5. Tracker migrasi mencerminkan perubahan target dan status untuk *technical*.
6. History/status telah mencatat eksekusi F01D.1.

## Validasi
1. Status git memvalidasi perubahan terbatas pada dokumen.
2. README dokumentasi teknis bersih dari kerentanan credential dan menyajikan format rangkuman murni.

## Catatan Risiko
- Rangkuman yang dihasilkan merupakan intisari berdasarkan teks dokumentasi lama. Terdapat potensi bahwa *codebase* fungsional terbaru saat ini secara spesifik dapat memiliki varian penulisan yang berbeda dengan dokumen lama tersebut (seperti nama variabel *State*). Selalu jadikan eksekusi verifikasi *codebase* pada tahapan lanjut sebagai acuan utama yang aktual.

## Next Step
- Merencanakan tahap migrasi selanjutnya, seperti F01D.2 untuk mengekstrak dan memigrasi alur fungsional/modules, atau melanjutkan roadmap RKK fitur F02 - F13.
