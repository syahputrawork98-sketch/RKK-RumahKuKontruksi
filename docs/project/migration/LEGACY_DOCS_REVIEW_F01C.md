# F01C — Legacy Docs Review and Active Docs Mapping

## Tujuan Review
Dokumen ini bertujuan meninjau isi dari dokumen-dokumen lama yang telah dikarantina ke dalam folder `docs/_legacy/original-docs/`. Hasil tinjauan akan memetakan informasi mana yang masih relevan dan penting untuk dimigrasikan ke sistem dokumentasi aktif.

## Scope Review
Folder legacy yang direview:
1. `alur/`
2. `archive/`
3. `batches/`
4. `modules/`
5. `technical/`

## Ringkasan Per Folder

### 1. `alur/`
- **Isi utama**: Alur bisnis proyek dan alur spesifik per role (admin, arsitek, konsumen, mandor, pengawas, superadmin, publik).
- **Nilai penting**: Sangat tinggi. Berisi alur logika fungsional dasar dari aplikasi RKK.
- **Target docs aktif**: Feature files per role atau dokumentasi alur bisnis aktif di `docs/project/history/features/`.
- **Prioritas migrasi**: High
- **Risiko**: Jika diabaikan, akan terjadi hilangnya pemahaman mengenai alur operasional tiap role.
- **Rekomendasi**: Migrasikan ke dokumentasi fungsional per role.

### 2. `archive/`
- **Isi utama**: `business-reference-legacy` dan `temporary-review`. Catatan bisnis lama dan tinjauan sementara.
- **Nilai penting**: Rendah. Kebanyakan sudah tertinggal atau tergantikan dengan dokumentasi yang lebih baru.
- **Target docs aktif**: Tetap sebagai arsip (`_legacy`) atau dipindah ke `docs/project/baseline/` jika ada referensi khusus.
- **Prioritas migrasi**: Low
- **Risiko**: Risiko duplikasi jika isinya tercampur dengan dokumentasi baru.
- **Rekomendasi**: Tidak perlu dimigrasi isinya, jadikan *Low Priority Archive* dan jadwalkan untuk di-cleanup nanti.

### 3. `batches/`
- **Isi utama**: Laporan teknis historis pengembangan dari batch 01 hingga 110.
- **Nilai penting**: Sedang. Berfungsi sebagai jejak rekam audit proyek lama.
- **Target docs aktif**: `docs/project/history/FEATURE_HISTORY.md` (sebagai ringkasan).
- **Prioritas migrasi**: Low
- **Risiko**: Tidak ada risiko tinggi, namun memakan ruang dan kurang relevan dengan roadmap aktif saat ini.
- **Rekomendasi**: Rangkum sejarah batch secara singkat, lalu beri status *Safe to Delete Later* untuk file aslinya.

### 4. `modules/`
- **Isi utama**: Penjelasan fungsi fitur spesifik (design-request, construction-readiness, material-request) dan fitur per role.
- **Nilai penting**: Tinggi. Berisi logika detail mengenai rule bisnis.
- **Target docs aktif**: Spesifikasi fitur di bawah `docs/project/history/features/`.
- **Prioritas migrasi**: High
- **Risiko**: Pengembang kehilangan konteks rules spesifik pada modul yang sudah dikerjakan (seperti progress SOT).
- **Rekomendasi**: Gabungkan intisari dari file modul dengan file alur, lalu pindahkan sebagai feature spec utuh di batch migrasi aktif.

### 5. `technical/`
- **Isi utama**: Arsitektur API (api-map), backend, database, frontend, data-source-policy, dan dev-persona-switcher.
- **Nilai penting**: Sangat tinggi. Merupakan panduan fundamental coding dan arsitektur RKK saat ini.
- **Target docs aktif**: `docs/frontend/README.md`, `docs/backend/README.md`, `docs/database/README.md`.
- **Prioritas migrasi**: High
- **Risiko**: Pengembangan ke depan bisa merusak arsitektur eksisting jika arsitektur ini diabaikan.
- **Rekomendasi**: Segera migrasikan isi ke folder `docs/frontend/`, `docs/backend/`, dan `docs/database/` di batch F01D.

## Mapping Prioritas

| Legacy Area/File | Isi Utama | Target Active Docs | Priority | Migration Recommendation | Notes |
|------------------|-----------|--------------------|----------|--------------------------|-------|
| `alur/` | Alur bisnis & role | Feature files per role | High | Ekstrak logika bisnis | Hindari salin utuh |
| `archive/` | Referensi bisnis usang | Tetap legacy | Low | Abaikan / Cleanup | Safe to archive/delete |
| `batches/` | Log historis batch | `FEATURE_HISTORY.md` | Low | Rangkum ke index | Safe to archive/delete |
| `modules/` | Aturan fungsional modul | Feature files per modul | High | Gabungkan dengan `alur/` | Perhatikan spesifikasi |
| `technical/` | Arsitektur teknis RKK | `frontend/`, `backend/`, `database/` | High | Ekstrak pedoman teknis | Migrasi tahap awal |

## Kandidat Migrasi F01D
Daftar informasi yang paling penting untuk dimigrasikan pada batch F01D:
1. Referensi pedoman teknis (`technical/`) ke `docs/backend/README.md` & `docs/frontend/README.md`.
2. Penjelasan *Dev Persona Switcher* dan *Data Source Policy* dari folder `technical/`.
3. Rancangan dasar untuk Feature Document per role dari `alur/` dan `modules/`.

## Kandidat Cleanup F01E
Daftar file/folder yang mungkin aman dihapus nanti, tetapi belum boleh dilakukan tanpa batch cleanup dan persetujuan User:
- Seluruh isi `archive/`.
- Seluruh isi `batches/` (setelah informasinya diringkas jika diperlukan).

## Catatan Risiko
- Memindahkan isi dokumen lama mentah-mentah ke dokumentasi aktif akan memicu inkonsistensi yang membingungkan agen AI berikutnya, karena kode eksisting mungkin sudah berbeda dengan apa yang tertulis di dokumen lama. Ekstraksi harus fokus pada "konsep" arsitektur utama saja.

## Next Step
- Rekomendasi: Eksekusi **RKK-F01D — Legacy Docs Active Migration** untuk mengekstrak dan memigrasi isinya secara formal.
