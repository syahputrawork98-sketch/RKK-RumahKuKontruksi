# F01B — Legacy Docs Quarantine and Roomchat Workflow Alignment

## Story
Proyek RKK telah mengimplementasikan sistem dokumentasi baru (Batch F00), namun folder `docs/` masih berisi banyak file dan folder lama. File-file tersebut tidak dapat langsung dihapus karena mungkin masih mengandung informasi penting, sehingga perlu dikarantina. Bersamaan dengan itu, diperlukan penyelarasan workflow untuk mengakomodasi model interaksi antara Roomchat 00 (Manager) dan Roomchat 01 (Auditor).

## Status
- **Current Status**: Completed

## Tujuan
1. Mengarantina dokumen lama ke folder `_legacy/` tanpa menghapus isinya.
2. Menyediakan tracker untuk melacak migrasi dokumen lama.
3. Menyelaraskan instruksi workflow RKK agar mencakup peran Roomchat 00 dan Roomchat 01.

## Scope
- Folder `docs/`
- Folder `docs/_legacy/`
- Folder `docs/project/migration/`
- File `docs/project/onboarding/CHATGPT_PROJECT_INSTRUCTIONS.md`
- File `docs/project/workflow/WORKING_SYSTEM.md`
- File `docs/README.md`
- File `docs/project/README.md`
- File `docs/project/history/CURRENT_STATUS.md`
- File `docs/project/history/FEATURE_HISTORY.md`

## File/Folder yang Dibuat
- `docs/_legacy/README.md`
- `docs/project/migration/LEGACY_DOCS_INVENTORY.md`
- `docs/project/migration/LEGACY_DOCS_MIGRATION_TRACKER.md`
- `docs/project/migration/LEGACY_DOCS_CLEANUP_PLAN.md`
- `docs/project/history/features/F01B_LEGACY_DOCS_QUARANTINE.md`

## File/Folder yang Dipindahkan
- Dari `docs/alur/` ke `docs/_legacy/original-docs/alur/`
- Dari `docs/archive/` ke `docs/_legacy/original-docs/archive/`
- Dari `docs/batches/` ke `docs/_legacy/original-docs/batches/`
- Dari `docs/modules/` ke `docs/_legacy/original-docs/modules/`
- Dari `docs/technical/` ke `docs/_legacy/original-docs/technical/`

## File/Folder yang Tidak Disentuh
- `client/`
- `server/`
- `package.json`, `package-lock.json`, configurasi lainnya
- Dokumentasi aktif baru

## Batasan
- Tidak boleh mengubah source code frontend atau backend.
- Tidak boleh menghapus dokumen lama di batch ini.
- Tidak boleh menyalin atau mengadaptasi branding proyek lain.

## Definition of Done
- Semua folder lama telah dipindahkan ke `docs/_legacy/original-docs/`.
- File tracker migrasi berhasil dibuat.
- `WORKING_SYSTEM.md` dan `CHATGPT_PROJECT_INSTRUCTIONS.md` sudah memuat aturan Roomchat 00 dan Roomchat 01.
- `CURRENT_STATUS.md` dan `FEATURE_HISTORY.md` telah di-update dengan data batch F01B.

## Next Step
- Melakukan review isi legacy docs (F01C).
