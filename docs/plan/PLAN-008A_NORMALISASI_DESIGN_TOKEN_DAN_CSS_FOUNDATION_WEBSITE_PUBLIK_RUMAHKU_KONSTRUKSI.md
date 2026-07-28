---
kode: PLAN-008A
judul: Normalisasi Design Token dan CSS Foundation Website Publik Rumahku Konstruksi
versi: 1.0
status: DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
parent_plan: PLAN-008
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
base_sha: b21562f5ffb2e7877a094197e5d21cd72eccf6a4
base_sha_status: Remote terverifikasi sebagai penutup final PLAN-007
area_implementasi: apps/web
tahap: design token dan CSS foundation
route_baru: tidak ada
perubahan_konten_bisnis: tidak ada
perubahan_status_publikasi: tidak ada
dependency_baru: tidak ada
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-008A — NORMALISASI DESIGN TOKEN DAN CSS FOUNDATION WEBSITE PUBLIK RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
PLAN-008A ADALAH TAHAP PERTAMA PLAN-008
GEMINI BOLEH MENGUBAH WORKING TREE HANYA SETELAH BASELINE DAN VALIDASI AWAL LULUS
GEMINI TIDAK BOLEH COMMIT, PUSH, MERGE, ATAU MEMBUAT BRANCH
```

PLAN-008A menstabilkan kontrak design token dan CSS foundation sebelum shared component dipindahkan dalam PLAN-008B dan sebelum seluruh halaman dimigrasikan dalam PLAN-008C.

Tahap ini sengaja dibatasi. PLAN-008A tidak boleh berubah menjadi ekstraksi komponen, migrasi halaman menyeluruh, atau redesign.

---

## 2. Hubungan dengan PLAN-008

PLAN-008 menetapkan urutan:

```text
PLAN-008A — Normalisasi Design Token dan CSS Foundation
PLAN-008B — Standardisasi Komponen Dasar dan Ownership CSS
PLAN-008C — Migrasi Halaman Publik dan Audit Regresi
PLAN-008D — Hanya jika audit penutupan menemukan pekerjaan besar
```

PLAN-008A hanya mengerjakan kontrak token, compatibility layer sementara, focus/motion foundation, audit custom property, serta pengujian agar token tidak terdefinisi tidak kembali muncul.

---

## 3. Baseline Wajib

Repository:

```text
syahputrawork98-sketch/RKK-RumahKuKontruksi
```

Expected:

```text
branch       : main
HEAD         : b21562f5ffb2e7877a094197e5d21cd72eccf6a4
working tree : clean
remote       : repository RKK yang benar
```

Gemini wajib menjalankan:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git remote -v
```

### Stop Condition Baseline

Berhenti dan laporkan tanpa mengubah file apabila:

- branch bukan `main`;
- HEAD tidak sama dengan baseline;
- working tree tidak clean;
- remote bukan repository RKK;
- terdapat file plan lain yang belum disinkronkan;
- terdapat perubahan Pemilik yang tidak dijelaskan.

Gemini tidak boleh melakukan reset, stash, checkout, pull, merge, rebase, atau penghapusan perubahan untuk memaksa baseline sesuai.

---

## 4. Validasi Awal Sebelum Perubahan

Jalankan:

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
```

Apabila salah satu gagal pada baseline:

1. jangan mulai refactor;
2. simpan output kegagalan;
3. identifikasi apakah kegagalan berasal dari baseline;
4. laporkan kepada Pemilik;
5. jangan melakukan perbaikan di luar scope PLAN-008A.

---

## 5. Kondisi Aktual yang Harus Diselesaikan

### 5.1 Token Canonical yang Sudah Ada

`apps/web/src/styles/tokens.css` telah mempunyai:

```text
--color-brand-*
--color-accent-*
--color-neutral-*
--color-info-*
--color-warning-*
--font-family-primary
--font-size-*
--line-height-*
--spacing-*
--container-*
--radius-button
--radius-card
--radius-panel
--transition-normal
```

Numeric spacing scale aktif:

```text
--spacing-0
--spacing-1
--spacing-2
--spacing-3
--spacing-4
--spacing-5
--spacing-6
--spacing-8
--spacing-10
--spacing-12
--spacing-16
--spacing-20
--spacing-24
```

### 5.2 Namespace Legacy atau Tidak Terdefinisi

Audit sebelumnya menemukan keluarga:

```text
--space-*
--spacing-xs
--spacing-sm
--spacing-md
--spacing-lg
--spacing-xl
--spacing-2xl
--spacing-3xl
--spacing-4xl
--text-xs
--text-sm
--text-base
--text-lg
--text-xl
--text-2xl
--text-3xl
--text-4xl
--text-5xl
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-full
--shadow-sm
--shadow-md
--color-surface
--color-surface-hover
--color-border
--color-border-strong
--color-primary
--color-text
--color-text-muted
--color-brand-200
```

Gemini wajib mengaudit ulang daftar aktual. Daftar di atas merupakan baseline temuan, bukan pengganti audit repository.

### 5.3 Risiko Teknis

CSS custom property yang tidak terdefinisi dapat membuat deklarasi dibuang browser tanpa membuat build gagal. Karena itu lint, test, dan build saja tidak cukup.

PLAN-008A wajib menghasilkan pemeriksaan statis:

```text
custom property digunakan tetapi tidak didefinisikan = 0
```

---

## 6. Tujuan PLAN-008A

1. Menetapkan satu namespace canonical.
2. Mempertahankan primitive palette yang sudah aktif.
3. Menambah semantic token minimum.
4. Menutup seluruh penggunaan custom property yang tidak terdefinisi.
5. Menyediakan compatibility alias sementara yang eksplisit.
6. Memisahkan alias legacy dari token canonical.
7. Menambahkan focus foundation.
8. Menjaga motion foundation.
9. Menambahkan pengujian statis token.
10. Menjaga visual baseline sedekat mungkin dengan current rendered state.
11. Tidak mengubah route, copy, data, publikasi, atau kontrak komponen.
12. Menyiapkan dasar untuk PLAN-008B.

---

## 7. Non-Tujuan

PLAN-008A tidak boleh:

- membuat `components.css`;
- memindahkan `.btn`;
- memindahkan `.section-padding`;
- mengekstrak page hero;
- mengekstrak section heading;
- mengekstrak card/panel/notice/empty state;
- mengganti ownership shared component;
- melakukan page scoping menyeluruh;
- mengubah struktur JSX;
- mengubah route;
- menambah route;
- mengubah navigation;
- mengubah copy;
- mengubah metadata halaman;
- mengubah data layanan;
- mengubah data proyek;
- mengaktifkan layanan;
- mengaktifkan proyek;
- mengisi `projectCatalog`;
- membuat dummy;
- memakai B05;
- memakai legacy;
- menambah dependency;
- mengubah backend;
- mengubah deployment;
- melakukan redesign;
- menambahkan shadow visual baru secara massal.

Pekerjaan tersebut berada di PLAN-008B, PLAN-008C, atau plan berikutnya.

---

## 8. File Scope

### 8.1 File Plan dan Dokumentasi

```text
docs/plan/PLAN-008_NORMALISASI_DESIGN_SYSTEM_DAN_FONDASI_VISUAL_WEBSITE_PUBLIK_RUMAHKU_KONSTRUKSI.md
docs/plan/PLAN-008A_NORMALISASI_DESIGN_TOKEN_DAN_CSS_FOUNDATION_WEBSITE_PUBLIK_RUMAHKU_KONSTRUKSI.md
docs/plan/README.md
```

Dua file plan harus disalin persis dari dokumen final yang diberikan Pemilik. Jangan mengubah substansi plan saat eksekusi.

### 8.2 File Implementasi Utama

```text
apps/web/src/styles/tokens.css
apps/web/src/styles/globals.css
```

### 8.3 File Pengujian yang Boleh Dibuat

Kandidat:

```text
apps/web/src/styles/tokens.test.js
```

Nama dapat disesuaikan dengan pola test repository, tetapi test harus tetap berada di workspace web dan tidak menambah dependency.

### 8.4 File Kondisional

File berikut hanya boleh diubah apabila audit membuktikan kebutuhan langsung untuk menutup undefined token tanpa refactor komponen:

```text
apps/web/src/styles/home.css
apps/web/src/styles/about.css
apps/web/src/styles/work-process.css
apps/web/src/styles/services.css
apps/web/src/styles/projects.css
apps/web/src/styles/project-detail.css
apps/web/src/styles/shell.css
apps/web/src/main.jsx
```

Apabila compatibility layer pada `tokens.css` sudah cukup, jangan mengubah page stylesheet pada PLAN-008A.

### 8.5 Protected Scope

Jangan menyentuh:

```text
client/
apps/backend/
packages/
database/
prisma/
archive/
deployment configuration/
authentication/
content/data catalogs/
```

Jangan mengubah lockfile atau dependency manifest.

---

## 9. Canonical Namespace

Gunakan:

```text
--color-brand-*
--color-accent-*
--color-neutral-*
--color-surface-*
--color-text-*
--color-border-*
--color-info-*
--color-success-*
--color-warning-*
--color-error-*
--font-family-*
--font-size-*
--font-weight-*
--line-height-*
--letter-spacing-*
--spacing-*
--container-*
--radius-*
--shadow-*
--focus-*
--transition-*
```

Aturan:

- jangan membuat kategori yang belum dibutuhkan;
- jangan menambah token hanya untuk meniru framework lain;
- kode baru tidak boleh memakai namespace legacy;
- alias legacy ditempatkan pada blok terpisah;
- setiap alias memiliki komentar removal target `PLAN-008C`.

---

## 10. Semantic Token Minimum

Tambahkan semantic token dengan referensi ke primitive aktif, bukan nilai warna baru apabila tidak diperlukan.

Kandidat yang disetujui:

```css
/* Semantic surfaces */
--color-surface-page: var(--color-neutral-0);
--color-surface-muted: var(--color-neutral-50);
--color-surface-raised: var(--color-neutral-0);
--color-surface-hover: var(--color-neutral-100);

/* Semantic text */
--color-text-primary: var(--color-neutral-950);
--color-text-secondary: var(--color-neutral-700);
--color-text-muted: var(--color-neutral-600);
--color-text-inverse: var(--color-neutral-0);

/* Semantic borders */
--color-border-default: var(--color-neutral-200);
--color-border-strong: var(--color-neutral-300);

/* Semantic actions */
--color-action-primary: var(--color-brand-600);
--color-action-primary-hover: var(--color-brand-800);
--color-action-primary-soft: var(--color-brand-50);
```

Gemini boleh menyesuaikan nama hanya apabila:

- konflik nyata ditemukan;
- nama alternatif lebih konsisten dengan repository;
- perubahan dilaporkan;
- fungsi semantic tetap sama.

Jangan menambah success/error token apabila belum dipakai pada website publik tahap ini. Kebutuhan konseptual tidak sama dengan kebutuhan implementasi saat ini.

---

## 11. Focus dan Motion Foundation

Tambahkan token minimum:

```css
--focus-ring-color: var(--color-brand-600);
--focus-ring-width: 2px;
--focus-ring-offset: 3px;
```

Pastikan `globals.css` mempunyai baseline `:focus-visible` yang:

- terlihat;
- tidak menghapus outline tanpa pengganti;
- tidak menimpa komponen khusus yang sudah lebih baik;
- tidak mengubah layout;
- menggunakan semantic focus token.

Pertahankan:

```text
--transition-normal
prefers-reduced-motion
```

Apabila reduced-motion baseline belum ada, tambahkan aturan global minimum tanpa menghapus animasi secara tidak perlu.

---

## 12. Compatibility Layer Sementara

### 12.1 Prinsip

Compatibility layer:

- berada di `tokens.css`;
- diberi heading komentar yang jelas;
- hanya dipakai untuk migrasi;
- tidak boleh dipakai kode baru;
- ditargetkan untuk dihapus dalam PLAN-008C;
- memetakan legacy ke canonical;
- tidak menciptakan visual language baru.

### 12.2 Mapping Spacing

Gunakan mapping awal berikut apabila token aktual ditemukan:

```css
--space-1: var(--spacing-1);
--space-2: var(--spacing-2);
--space-3: var(--spacing-3);
--space-4: var(--spacing-4);
--space-5: var(--spacing-5);
--space-6: var(--spacing-6);
--space-8: var(--spacing-8);
--space-10: var(--spacing-10);
--space-12: var(--spacing-12);
--space-16: var(--spacing-16);
--space-20: var(--spacing-20);
--space-24: var(--spacing-24);

--spacing-xs: var(--spacing-1);
--spacing-sm: var(--spacing-2);
--spacing-md: var(--spacing-4);
--spacing-lg: var(--spacing-6);
--spacing-xl: var(--spacing-8);
--spacing-2xl: var(--spacing-12);
--spacing-3xl: var(--spacing-16);
--spacing-4xl: var(--spacing-24);
```

Jangan menambah alias yang tidak digunakan.

### 12.3 Mapping Typography

Gunakan mapping ke scale aktif:

```css
--text-xs: var(--font-size-supporting);
--text-sm: var(--font-size-supporting);
--text-base: var(--font-size-body);
--text-lg: var(--font-size-body-large-desktop);
--text-xl: var(--font-size-h3-mobile);
--text-2xl: var(--font-size-h3-desktop);
--text-3xl: var(--font-size-h2-mobile);
--text-4xl: var(--font-size-h2-desktop);
--text-5xl: var(--font-size-h1-desktop);
```

Mapping ini merupakan compatibility sementara, bukan scale canonical baru.

Apabila hasil browser memperlihatkan perubahan hierarchy yang besar, jangan membuat nilai baru secara bebas. Berhenti dan laporkan perbedaan visual yang ditemukan.

### 12.4 Mapping Radius

```css
--radius-sm: var(--radius-button);
--radius-md: var(--radius-card);
--radius-lg: var(--radius-panel);
--radius-xl: var(--radius-panel);
--radius-full: 9999px;
```

### 12.5 Mapping Color

Token legacy yang namanya berbeda dari semantic canonical dipetakan sebagai berikut:

```css
--color-surface: var(--color-surface-raised);
--color-border: var(--color-border-default);
--color-primary: var(--color-action-primary);
--color-text: var(--color-text-primary);
```

Token berikut tidak memerlukan alias karena namanya langsung ditetapkan sebagai semantic canonical:

```text
--color-surface-hover
--color-border-strong
--color-text-muted
```

Definisikan ketiganya langsung terhadap primitive, sebagaimana bagian Semantic Token Minimum. Jangan mendefinisikannya kembali pada compatibility layer.

Gemini wajib memeriksa dependency graph custom property agar tidak ada direct self-reference atau cyclic reference.

### 12.6 Brand 200

`--color-brand-200` tidak boleh menjadi primitive baru hanya karena satu penggunaan.

Pilihan urutan:

1. ganti penggunaan tunggal ke token canonical yang paling dekat dengan fungsi visual; atau
2. buat alias sementara ke `--color-brand-100` dengan komentar removal PLAN-008C.

Jangan menciptakan hex baru tanpa sumber design system yang eksplisit.

### 12.7 Shadow

Current rendered baseline membuang deklarasi yang memakai shadow undefined. Untuk menjaga baseline:

```css
--shadow-none: none;
```

Untuk alias sementara:

```css
--shadow-sm: var(--shadow-none);
--shadow-md: var(--shadow-none);
```

Jangan menambahkan non-zero shadow pada PLAN-008A. Elevation visual dibahas di PLAN-008B atau visual refinement.

---

## 13. Pencegahan Cyclic Custom Property

Gemini wajib memastikan tidak ada pola:

```css
--token-a: var(--token-a);
--token-a: var(--token-b);
--token-b: var(--token-a);
```

Test statis minimal harus:

- menangkap undefined token;
- menangkap direct self-reference;
- melaporkan daftar token legacy;
- tidak gagal karena custom property yang sengaja didefinisikan sebagai alias.

Cyclic graph lint lengkap boleh dibuat jika sederhana. Jangan menambah parser atau dependency baru.

---

## 14. Static Token Contract Test

Tambahkan test ringan menggunakan Node standard library dan Vitest yang sudah tersedia.

Test harus:

1. membaca seluruh `.css` di `apps/web/src/styles`;
2. mengumpulkan definisi custom property;
3. mengumpulkan semua penggunaan `var(--...)`;
4. menghitung token yang digunakan tetapi tidak didefinisikan;
5. memastikan hasil kosong;
6. mendeteksi direct self-reference;
7. mempunyai pesan gagal yang menunjukkan token dan file;
8. tidak bergantung pada urutan file;
9. tidak memakai snapshot besar;
10. tidak menambah dependency.

Opsional tetapi disarankan:

- allowlist alias legacy yang disetujui;
- test bahwa setiap alias legacy memiliki komentar `remove in PLAN-008C`;
- test bahwa page CSS baru tidak menambah namespace legacy di luar allowlist.

Jangan membuat test terlalu rapuh terhadap whitespace atau komentar.

---

## 15. README Plan

Tambahkan ke `docs/plan/README.md`:

```text
PLAN-008
Status: DISETUJUI PEMILIK — EKSEKUSI BERTAHAP
Tahap aktif: PLAN-008A
Hasil yang dituju: design system dan fondasi visual canonical

PLAN-008A
Status: DIEKSEKUSI — MENUNGGU AUDIT
Hasil yang dituju: token canonical, semantic foundation, compatibility layer sementara, dan static token contract test
```

Gunakan pola format README yang sudah ada. Jangan mengubah status plan lama.

---

## 16. Urutan Implementasi

### Langkah 1 — Audit Baseline

- verifikasi branch, SHA, clean tree, remote;
- jalankan lint, test, build, diff check;
- simpan ringkasan output.

### Langkah 2 — Inventaris Token

- scan semua CSS di `apps/web/src/styles`;
- daftar definitions;
- daftar usages;
- daftar undefined;
- daftar unused;
- daftar legacy;
- daftar direct values yang tidak perlu dipindahkan pada tahap ini.

### Langkah 3 — Normalisasi `tokens.css`

- pertahankan primitive aktif;
- tambahkan semantic minimum;
- tambahkan focus token;
- tambahkan shadow none;
- tambahkan compatibility aliases yang benar-benar dipakai;
- beri komentar target removal;
- hindari cyclic reference.

### Langkah 4 — Global Foundation Minimum

- tambahkan atau rapikan focus-visible;
- verifikasi reduced-motion;
- jangan memindahkan shared component CSS.

### Langkah 5 — Static Test

- tambahkan test token contract;
- jalankan test terarah;
- perbaiki hanya masalah scope PLAN-008A.

### Langkah 6 — Visual Smoke Audit

Periksa:

```text
/
/tentang
/cara-kerja
/layanan
/proyek
/proyek/contoh
/sign-in
/route-tidak-dikenal
```

Viewport minimum:

```text
mobile  : sekitar 390 px
tablet  : sekitar 768 px
desktop : sekitar 1366 px
```

Fokus:

- tidak ada hilangnya spacing;
- tidak ada font melonjak tidak wajar;
- tidak ada border/radius aneh;
- tidak ada shadow baru;
- tidak ada overflow;
- focus terlihat;
- route hold state tetap aman.

Jika alias typography membuat perubahan besar, laporkan. Jangan melakukan redesign untuk menutupnya.

### Langkah 7 — Validasi Akhir

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
git status --short
git diff --stat
git diff --name-only
```

---

## 17. Invariant Route dan Publikasi

Tetap:

```text
/
/tentang
/cara-kerja
/layanan
/proyek
/proyek/:slug
/sign-in
*
```

Tetap:

```text
projectCatalog       = []
published project    = 0
active project slug  = 0
active service       = 0
transaction CTA      = 0
```

Dilarang:

- data B05;
- dummy;
- seed;
- mock;
- legacy;
- remote project image;
- service activation;
- project activation;
- content business change.

---

## 18. Acceptance Criteria

### Baseline

- branch benar;
- SHA benar;
- working tree awal clean;
- validasi awal lulus.

### Token

- satu canonical namespace terdokumentasi;
- semantic surface/text/border/action minimum tersedia;
- focus token tersedia;
- shadow baseline tidak menambah elevasi visual;
- setiap alias sementara diberi removal target;
- tidak ada cyclic custom property;
- undefined custom property = 0.

### Testing

- static token contract test tersedia;
- test menunjukkan file/token ketika gagal;
- seluruh test lama tetap lulus.

### Visual

- tidak ada redesign;
- tidak ada shadow baru;
- tidak ada perubahan layout besar;
- tidak ada overflow;
- focus-visible membaik;
- route smoke audit lulus.

### Data dan Publikasi

- catalog tetap kosong;
- layanan/proyek tidak aktif;
- hold state tetap aman;
- tidak ada dummy/legacy/B05.

### Quality

```text
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
```

seluruhnya lulus.

### Git

- Gemini tidak commit;
- Gemini tidak push;
- Gemini tidak merge;
- Gemini tidak membuat branch;
- working tree akhir dilaporkan;
- Pemilik melakukan commit/push manual setelah review.

---

## 19. Stop Condition Selama Implementasi

Berhenti dan laporkan apabila:

- perlu mengubah JSX untuk menyelesaikan token;
- perlu membuat shared component;
- perlu memindahkan `.btn` atau `.section-padding`;
- perlu menambah dependency;
- perlu mengubah route;
- perlu mengubah copy;
- perlu mengubah data;
- perlu menyentuh backend;
- alias menghasilkan perubahan visual besar;
- mapping typography tidak dapat ditentukan;
- baseline test gagal;
- ditemukan cyclic alias yang tidak dapat diselesaikan tanpa migrasi halaman besar;
- file di luar scope harus disentuh.

---

## 20. Format Laporan Gemini

Gunakan:

```text
1. Audit Awal
2. Branch, HEAD, Working Tree, Remote
3. Hasil Validasi Baseline
4. Inventaris Token
5. Token Undefined Sebelum
6. Keputusan Canonical Namespace
7. Semantic Token Ditambahkan
8. Compatibility Alias Ditambahkan
9. Alias yang Tidak Ditambahkan dan Alasannya
10. Cyclic Reference Check
11. Static Token Contract Test
12. File Diubah
13. File Dibuat
14. File Dihapus
15. Route dan Publication Invariants
16. Visual Smoke Audit
17. Hasil Lint
18. Hasil Test
19. Hasil Build
20. Hasil git diff --check
21. Working Tree Akhir
22. Risiko atau Sisa Pekerjaan untuk PLAN-008B/008C
23. Konfirmasi Tidak Commit/Push
```

Laporan harus menyertakan output penting, bukan hanya pernyataan “lulus”.

---

## 21. Status Penutup

```text
PLAN-008A DISETUJUI PEMILIK RKK.
BASE SHA: b21562f5ffb2e7877a094197e5d21cd72eccf6a4
EKSEKUSI BOLEH DIMULAI SETELAH AUDIT LOKAL DAN VALIDASI BASELINE LULUS.
GEMINI TIDAK BOLEH COMMIT, PUSH, MERGE, ATAU MEMBUAT BRANCH.
HASIL WORKING TREE WAJIB DIREVIEW PEMILIK DAN DIAUDIT CHATGPT.
```

---

## 22. Riwayat Versi

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 1.0 | 2026-07-28 | Plan eksekusi tahap pertama PLAN-008 untuk normalisasi token, semantic foundation, compatibility layer sementara, focus/motion baseline, dan static token contract test | Disetujui Pemilik — Siap Eksekusi Bersyarat Audit Lokal |
