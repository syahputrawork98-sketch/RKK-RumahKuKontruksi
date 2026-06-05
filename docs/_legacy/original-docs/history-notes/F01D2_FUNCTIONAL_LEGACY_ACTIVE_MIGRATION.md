# F01D.2 — Functional Legacy Active Migration

## Story
Setelah ekstraksi arsitektur teknis pada batch sebelumnya (F01D.1), area dokumentasi warisan fungsional (`alur/` dan `modules/`) dinilai cukup bertele-tele dan usang. Untuk mencegah kebingungan referensi, batch ini berupaya mengekstrak ringkasan spesifikasi logika dari setiap *role/module* ke dalam sistem pendataan fitur RKK yang rapi (F02-F13) sebagai pondasi bagi implementasi *codebase* ke depan.

## Status
- **Current Status**: Completed

## Tujuan
- Mengekstrak informasi penting dari direktori legacy `alur/` dan `modules/`.
- Membangun peta dokumentasi fitur fungsional aktif (F02 hingga F13) yang lebih padat dan langsung fokus pada *scope* modul.
- Melengkapi pembaruan pada seluruh fail log *tracking* agar area fungsional masuk kategori terselesaikan (`Migrated`).

## Scope
- Pembuatan dan pembaruan struktur rincian fitur F02 hingga F13.
- Sinkronisasi file jejak (`LEGACY_DOCS_MIGRATION_TRACKER.md` dan `LEGACY_DOCS_INVENTORY.md`).

## File Legacy yang Dibaca
- `docs/_legacy/original-docs/alur/` (berisi skema *role*)
- `docs/_legacy/original-docs/modules/` (berisi skema operasional tiap fitur spesifik)

## File yang Dibuat
- `docs/project/history/features/F02_PUBLIC_WEBSITE_SYSTEM.md`
- `docs/project/history/features/F03_ROLE_AND_LAYOUT_SYSTEM.md`
- `docs/project/history/features/F04_KONSUMEN_PROJECT_TRACKING_SYSTEM.md`
- `docs/project/history/features/F05_SUPERADMIN_USER_MANAGEMENT_SYSTEM.md`
- `docs/project/history/features/F06_ADMIN_PROJECT_MANAGEMENT_SYSTEM.md`
- `docs/project/history/features/F07_PENGAWAS_MONITORING_SYSTEM.md`
- `docs/project/history/features/F08_MANDOR_FIELD_REPORT_SYSTEM.md`
- `docs/project/history/features/F09_BACKEND_API_SYSTEM.md`
- `docs/project/history/features/F10_SUPABASE_DATABASE_SYSTEM.md`
- `docs/project/history/features/F11_AUTH_ACCESS_CONTROL_SYSTEM.md`
- `docs/project/history/features/F12_REPORT_PDF_EXPORT_SYSTEM.md`
- `docs/project/history/features/F13_DEPLOYMENT_SYSTEM.md`
- `docs/project/history/features/F01D2_FUNCTIONAL_LEGACY_ACTIVE_MIGRATION.md`

## File yang Diubah
- `docs/project/history/FEATURE_HISTORY.md`
- `docs/project/migration/LEGACY_DOCS_MIGRATION_TRACKER.md`
- `docs/project/migration/LEGACY_DOCS_INVENTORY.md`

## File/Folder yang Tidak Disentuh
- `client/`
- `server/`
- Fail konfigurasi, `package.json`, dan file `.env`
- Seluruh dokumen di direktori `docs/_legacy/original-docs/`

## Ringkasan Hasil Migrasi
Telah berhasil dibentuk rincian fitur F02-F13 dengan struktur singkat:
- **Alur Bisnis & Role**: Berhasil digeneralisasi dari data legacy untuk mendefinisikan *scope* setiap *role* (Konsumen, Admin, Mandor, dsb.).
- **Modul**: Modul seperti *Design Request*, RAB, hingga *Field Report* sudah terdistribusi dengan benar ke modul fitur yang berkaitan (F04, F06, F08).
- **Status Migrasi**: Folder legacy `alur/` dan `modules/` sekarang ditandai sebagai `Migrated`.

## Definition of Done
1. Intisari fungsional alur kerja dari dokumentasi usang sudah diwadahi di feature file spesifik masing-masing.
2. Seluruh file fitur dari rentang F02 hingga F13 sudah di-*link* pada `FEATURE_HISTORY.md`.
3. Tabel *tracker* di subfolder navigasi migrasi telah disesuaikan agar menampilkan parameter aktual (*Processed in F01D.2*).
4. Pembuatan file tidak menyusupkan salinan panjang dan *verbatim* dari direktori asalnya.
5. Codebase inti (`client/` & `server/`) dipastikan bebas dari gangguan.

## Validasi
- `git diff --name-only` telah memverifikasi batasan *scope* murni di dokumentasi aktif.
- Pengecekan *review file* menunjukkan struktur F02-F13 yang singkat dan siap diverifikasi langsung terhadap kode pada masa mendatang.

## Catatan Risiko
- Fitur-fitur ini statusnya mengemban frasa *Needs Verification* dan *Partial*, yang berarti integrasinya dengan *backend* atau komponen yang dimigrasikan dari repositori awal RKK (`RumahKuKontruksi-Dev`) masih butuh pembuktian per-modul. Agen eksekutor kelak harus fokus membedah direktori *client/server* tanpa ragu mengoreksi dokumen jika ditemui inkompatibilitas.
- Status migrasi F01D.2 berarti ringkasan aktif awal sudah dibuat, bukan berarti seluruh isi legacy sudah diverifikasi penuh atau aman dihapus.

## Next Step
- Merampungkan fase *Cleanup* (F01E) atau langsung memulai validasi fitur fungsional secara spesifik (mulai dari F02).
- Khusus untuk file legacy `alur/` dan `modules/`, proses cleanup hanya boleh dilakukan setelah: a. ada verifikasi per-feature, b. status cleanup disetujui User, c. batch cleanup khusus dibuka.
