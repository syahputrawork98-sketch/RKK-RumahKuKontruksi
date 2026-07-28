---
kode: PLAN-008B
judul: Standardisasi Komponen Dasar dan Ownership CSS Website Publik Rumahku Konstruksi
versi: 1.0
status: DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
parent_plan: PLAN-008
tahap_sebelumnya: PLAN-008A — Selesai dan Terverifikasi
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
base_sha: d04f43d6bf790c5cb6befb447e15a174863f1e4f
base_sha_status: Remote terverifikasi sebagai koreksi metadata final setelah penutupan PLAN-008A
area_implementasi: apps/web
tahap: komponen dasar, shared CSS ownership, import order, dan pencegahan selector collision
route_baru: tidak ada
perubahan_konten_bisnis: tidak ada
perubahan_status_publikasi: tidak ada
dependency_baru: tidak ada
redesign: tidak
migrasi_halalaman_menyeluruh: tidak
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-008B — STANDARDISASI KOMPONEN DASAR DAN OWNERSHIP CSS WEBSITE PUBLIK RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
PLAN-008B ADALAH TAHAP KEDUA PLAN-008
GEMINI BOLEH MENGUBAH WORKING TREE HANYA SETELAH BASELINE DAN VALIDASI AWAL LULUS
GEMINI TIDAK BOLEH COMMIT, PUSH, MERGE, ATAU MEMBUAT BRANCH
```

PLAN-008B adalah tahap kedua dari PLAN-008 dan telah disetujui Pemilik RKK pada 28 Juli 2026.

Tahap ini memindahkan shared CSS primitive dari stylesheet halaman ke owner lintas halaman yang jelas, menstabilkan komponen dasar yang telah dipakai website publik, memperbaiki ketergantungan komponen terhadap class halaman, serta mengurangi risiko selector collision.

PLAN-008B bukan migrasi seluruh halaman ke design system canonical. Pekerjaan migrasi halaman, penghapusan compatibility layer, dan audit regresi menyeluruh tetap menjadi PLAN-008C.

---

## 2. Ringkasan Keputusan Final

| Area | Keputusan Final |
|---|---|
| Strategi | Membuat owner CSS bersama dan menstabilkan komponen yang sudah digunakan |
| Shared stylesheet | Membuat `apps/web/src/styles/components.css` |
| Import order | `globals.css` → `shell.css` → `components.css` → page styles |
| Komponen wajib | `PublicContainer`, `PublicSection`, `SectionHeading`, `InfoCard`, `ActionLink`, `HoldAction` |
| Komponen baru wajib | Tidak ada selain kebutuhan yang terbukti saat audit |
| Ekstraksi kondisional | Action group, status notice, empty state, closing CTA hanya jika pola benar-benar stabil dan lintas halaman |
| `.btn*` | Dipindahkan dari `home.css` ke `components.css` |
| `.section-padding` dan `.section-bg-*` | Dipindahkan dari `home.css` ke `components.css` |
| `.info-card*` dan `.hold-*` | Dipindahkan dari `home.css` ke `components.css` |
| `.public-container` | Dipindahkan dari `shell.css` ke `components.css` karena dimiliki `PublicContainer` |
| `SectionHeading` | Berhenti memakai class `.hero-*`; menggunakan class khusus komponen |
| Page stylesheet | Tetap ada; hanya shared selector yang dipindahkan |
| Page migration | Ditahan ke PLAN-008C |
| Legacy token alias | Tetap dipertahankan; penghapusan di PLAN-008C |
| Route | Tidak berubah |
| Data/publikasi | Tidak berubah |
| Redesign | Tidak dilakukan |
| Dependency | Tidak ditambah |
| Commit/push | Tetap manual oleh Pemilik |
| Audit SHA | Dilakukan ChatGPT setelah commit Pemilik |

Keputusan arsitektur yang diusulkan:

```text
tokens.css      → design token dan compatibility layer
globals.css     → reset, base typography, focus, reduced motion
shell.css       → app shell, header, drawer, footer
components.css  → komponen dan primitive lintas halaman
home.css        → khusus Beranda
about.css       → khusus Tentang
work-process.css
services.css
projects.css
project-detail.css
```

---

## 3. Hubungan dengan PLAN-008

Urutan PLAN-008:

```text
PLAN-008A — Normalisasi Design Token dan CSS Foundation
PLAN-008B — Standardisasi Komponen Dasar dan Ownership CSS
PLAN-008C — Migrasi Halaman Publik dan Audit Regresi
PLAN-008D — Hanya jika audit akhir menemukan pekerjaan besar
```

Status:

```text
PLAN-008A : SELESAI DAN TERVERIFIKASI
PLAN-008B : DRAF
PLAN-008C : BELUM DIMULAI
PLAN-008D : BERSYARAT
```

PLAN-008A telah menghasilkan:

- token canonical;
- semantic surface, text, border, dan action;
- focus token;
- `shadow-none`;
- compatibility layer sementara;
- static token contract test;
- undefined custom property = 0;
- final audit SHA implementasi `bab278229b6eadfcadac5ded33d83b0f533c64b5`;
- penutupan administratif dan koreksi metadata sampai baseline `d04f43d6bf790c5cb6befb447e15a174863f1e4f`.

PLAN-008B harus memakai fondasi tersebut tanpa menghapus compatibility layer.

---

## 4. Baseline Repository

Repository:

```text
syahputrawork98-sketch/RKK-RumahKuKontruksi
```

Baseline draf:

```text
branch   : main
base SHA : d04f43d6bf790c5cb6befb447e15a174863f1e4f
commit   : fix(docs): synchronize PLAN-008 version metadata
```

Sebelum eksekusi, Gemini wajib menjalankan:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git remote -v
```

Expected:

```text
branch       : main
HEAD         : d04f43d6bf790c5cb6befb447e15a174863f1e4f
working tree : clean, kecuali file PLAN-008B final yang diberikan Pemilik
remote       : repository RKK yang benar
```

Stop apabila:

- branch bukan `main`;
- HEAD berbeda;
- working tree mempunyai perubahan lain;
- remote salah;
- terdapat konflik;
- PLAN-008A belum tertutup;
- terdapat pekerjaan lain yang belum disinkronkan.

Gemini tidak boleh reset, stash, pull, merge, rebase, checkout branch lain, atau menghapus perubahan Pemilik.

---

## 5. Validasi Baseline

Sebelum mengubah kode:

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
```

Expected berdasarkan PLAN-008A:

```text
lint  : lulus
test  : 106 test lulus
build : lulus
diff  : bersih
```

Jumlah test dapat bertambah setelah PLAN-008B.

Jika baseline gagal:

1. jangan mulai refactor;
2. simpan output;
3. identifikasi sumber kegagalan;
4. laporkan;
5. jangan memperbaiki masalah di luar scope PLAN-008B.

---

## 6. Hierarki Sumber Kebenaran

Urutan keputusan:

1. keputusan aktif Pemilik RKK;
2. PLAN-008 final;
3. PLAN-008A final dan hasil auditnya;
4. sumber bisnis aktif Room 1;
5. sumber produk dan website publik R02;
6. P07 design system;
7. paket halaman publik yang telah disetujui;
8. repository pada baseline;
9. arsip dan legacy hanya sebagai pembanding.

Prinsip P07 yang dipertahankan:

```text
terstruktur
tenang
jelas
profesional
bersih
teknis tetapi tidak kaku
dapat dipercaya
border lebih utama daripada shadow berat
website publik lebih editorial daripada dashboard
```

GitHub adalah sumber kondisi implementasi, bukan sumber keputusan bisnis dan publikasi.

---

## 7. Kondisi Aktual yang Menjadi Dasar PLAN-008B

### 7.1 Shared Components Sudah Ada

Komponen aktif:

```text
apps/web/src/components/ui/ActionLink.jsx
apps/web/src/components/ui/HoldAction.jsx
apps/web/src/components/ui/PublicContainer.jsx
apps/web/src/components/ui/PublicSection.jsx
apps/web/src/components/ui/SectionHeading.jsx
apps/web/src/components/ui/InfoCard.jsx
apps/web/src/components/ui/PageMeta.jsx
```

`PageMeta` tidak menjadi target CSS utama PLAN-008B karena tidak mempunyai visual primitive.

### 7.2 Shared CSS Masih Dimiliki Beranda

`home.css` saat ini memiliki:

```text
.section-padding
.section-bg-muted
.section-bg-white

.btn
.btn-primary
.btn-secondary
.btn-outline
.btn:disabled
.btn[aria-disabled="true"]

.hold-action-wrapper
.hold-reason

.info-card
.card-indicator
.card-marker
.card-icon
.info-card h3
.info-card p
```

Selector tersebut digunakan oleh komponen lintas halaman, tetapi ownership-nya berada di stylesheet halaman Beranda.

Akibat:

- halaman lain bergantung pada import `home.css`;
- urutan import menentukan perilaku;
- menghapus atau menunda `home.css` dapat merusak komponen global;
- komponen bersama tidak mempunyai stylesheet owner;
- halaman baru berisiko menyalin selector yang sama.

### 7.3 Container Dimiliki Shell

`PublicContainer.jsx` menggunakan:

```text
.public-container
```

Gaya `.public-container` berada di `shell.css`.

Container digunakan oleh shell dan section halaman. Secara arsitektur, container adalah layout primitive lintas halaman, bukan bagian internal header/footer/drawer.

Draf ini mengusulkan memindahkan `.public-container` ke `components.css`.

### 7.4 SectionHeading Bergantung pada Hero Beranda

`SectionHeading.jsx` saat ini menghasilkan:

```jsx
<div className="section-heading">
  <div className="hero-eyebrow">...</div>
  <h2 className="hero-title">...</h2>
  <p className="hero-desc">...</p>
</div>
```

Masalah:

- komponen section heading memakai class hero;
- style `.hero-eyebrow`, `.hero-title`, dan `.hero-desc` berada di `home.css`;
- selector hero juga digunakan page hero;
- perubahan hero Beranda dapat mengubah section heading pada halaman lain;
- komponen tidak mempunyai sub-element namespace sendiri.

PLAN-008B harus memutus ketergantungan tersebut.

### 7.5 PublicSection Memakai Shared Class Tanpa Owner

`PublicSection.jsx` menggunakan:

```text
.section-padding
.section-bg-muted
.section-bg-white
```

Style berada di `home.css`.

Komponen harus mempunyai owner di `components.css`.

### 7.6 ActionLink dan HoldAction Memakai `.btn*`

`ActionLink.jsx` membentuk:

```text
btn btn-primary
btn btn-secondary
btn btn-outline
```

`HoldAction.jsx` memakai pola sama dan menambahkan:

```text
hold-action-wrapper
hold-reason
```

API komponen telah digunakan dan relatif stabil. PLAN-008B tidak perlu mengganti nama prop `variant` atau mengubah destination behavior.

### 7.7 InfoCard Sudah Menjadi Shared Component

`InfoCard.jsx` mempunyai:

- title;
- description;
- marker;
- icon;
- className.

Style-nya berada di `home.css`.

Komponen dapat distandardisasi tanpa memperluas prop API secara besar.

### 7.8 Semua Stylesheet Diimpor Global

`main.jsx` mengimpor:

```text
globals.css
shell.css
home.css
about.css
work-process.css
services.css
projects.css
project-detail.css
```

PLAN-008B mengusulkan:

```text
globals.css
shell.css
components.css
home.css
about.css
work-process.css
services.css
projects.css
project-detail.css
```

Import seluruh page stylesheet tetap global pada PLAN-008B. Perubahan route-level CSS loading bukan scope saat ini.

---

## 8. Masalah yang Harus Diselesaikan

1. Shared CSS tidak mempunyai owner.
2. `home.css` menjadi dependency tidak resmi untuk seluruh website.
3. `shell.css` memuat primitive di luar shell.
4. `SectionHeading` memakai class hero.
5. Generic selector dapat berbenturan dengan page selector.
6. Komponen tidak mempunyai kontrak class yang terdokumentasi.
7. Shared selector dapat terduplikasi di page stylesheet.
8. Test belum memastikan komponen tidak kembali bergantung pada page stylesheet.
9. Import order belum mempunyai shared component layer.
10. Halaman berikutnya berisiko menambah duplikasi.

---

## 9. Tujuan PLAN-008B

PLAN-008B bertujuan:

1. membuat satu owner CSS untuk shared component;
2. memisahkan shared primitive dari page stylesheet;
3. memisahkan container primitive dari shell;
4. membuat import order eksplisit;
5. mempertahankan API komponen yang sudah stabil;
6. memperbaiki class contract `SectionHeading`;
7. memastikan `PublicSection` mandiri;
8. memastikan `PublicContainer` mandiri;
9. memastikan `ActionLink` mandiri;
10. memastikan `HoldAction` mandiri;
11. memastikan `InfoCard` mandiri;
12. mengurangi selector collision;
13. menambah test shared component;
14. menambah audit ownership;
15. menjaga seluruh route dan publication state;
16. menjaga visual mendekati baseline;
17. menyiapkan PLAN-008C;
18. tidak melakukan migrasi halaman menyeluruh;
19. tidak menghapus compatibility aliases;
20. tidak melakukan redesign.

---

## 10. Non-Tujuan

PLAN-008B tidak bertujuan:

- menghapus compatibility layer PLAN-008A;
- mengganti seluruh token legacy pada page CSS;
- memigrasikan seluruh halaman;
- me-rename seluruh selector page;
- menyelesaikan semua selector collision halaman;
- membuat route baru;
- membuat `/layanan/:slug`;
- membuat `/konsultasi`;
- membuat formulir;
- membuat receipt;
- mengaktifkan layanan;
- mengaktifkan proyek;
- mengisi `projectCatalog`;
- mengganti copy;
- mengganti metadata halaman;
- mengganti struktur informasi;
- mengganti header/footer secara visual;
- membuat visual art direction baru;
- menambah foto;
- menambah ilustrasi;
- menambah icon library;
- menambah component library;
- menambah CSS framework;
- mengubah CSS menjadi CSS Modules;
- menambah CSS-in-JS;
- mengubah build system;
- mengubah routing;
- mengubah deployment;
- mengubah backend;
- mengubah auth;
- mengubah data contract;
- melakukan visual refinement menyeluruh.

---

## 11. Invariant Route dan Publikasi

Route tetap:

```text
/
/tentang
/about → redirect /tentang
/cara-kerja
/layanan
/proyek
/proyek/:slug
/sign-in
*
```

Publication invariant:

```text
projectCatalog       = []
publishedProjects    = []
published project    = 0
active project slug  = 0
active service       = 0
transaction CTA      = 0
```

Dilarang:

- B05 menjadi portofolio;
- dummy;
- seed;
- mock;
- legacy;
- remote project image;
- layanan aktif;
- proyek aktif;
- harga;
- jadwal;
- wilayah layanan;
- CTA transaksi.

---

## 12. Keputusan Ownership CSS

### 12.1 `tokens.css`

Owner:

- primitive token;
- semantic token;
- compatibility layer sementara;
- focus token;
- transition;
- shadow baseline.

Tidak boleh berisi:

- selector komponen;
- selector halaman;
- layout.

### 12.2 `globals.css`

Owner:

- box sizing;
- base `html` dan `body`;
- heading dasar;
- paragraph;
- anchor dasar;
- button font inheritance;
- global focus-visible;
- reduced motion.

Tidak boleh berisi:

- component variant;
- page layout;
- header/footer;
- card;
- section layout.

### 12.3 `shell.css`

Owner:

```text
.app-shell
.main-content
.skip-link
.public-header
header navigation
drawer
.public-footer
footer navigation
```

Bukan owner:

```text
.public-container
.btn*
.section-*
.info-card*
.hold-*
.section-heading*
```

### 12.4 `components.css`

Owner wajib:

```text
.public-container

.section-padding
.section-bg-muted
.section-bg-white

.section-heading
.section-heading__eyebrow
.section-heading__title
.section-heading__description

.btn
.btn-primary
.btn-secondary
.btn-outline
disabled/aria-disabled states

.hold-action-wrapper
.hold-reason

.info-card
.card-indicator
.card-marker
.card-icon
.info-card title/description
```

Nama class existing dapat dipertahankan bila memang menjadi global shared contract.

`SectionHeading` harus memakai class khusus dan tidak lagi memakai `.hero-*`.

### 12.5 Page Stylesheet

Owner:

- layout spesifik halaman;
- visual khusus section;
- page root;
- grid khusus;
- diagram/visual;
- spacing khusus yang bukan shared primitive.

Tidak boleh menjadi owner:

- button global;
- container global;
- section primitive;
- shared card;
- shared heading.

---

## 13. File Structure yang Diusulkan

```text
apps/web/src/styles/
├── tokens.css
├── globals.css
├── shell.css
├── components.css
├── home.css
├── about.css
├── work-process.css
├── services.css
├── projects.css
└── project-detail.css
```

`components.css` menjadi file baru.

Urutan import:

```jsx
import './styles/globals.css'
import './styles/shell.css'
import './styles/components.css'
import './styles/home.css'
import './styles/about.css'
import './styles/work-process.css'
import './styles/services.css'
import './styles/projects.css'
import './styles/project-detail.css'
```

Jangan mengimpor `tokens.css` lagi dari `main.jsx` jika sudah diimpor melalui `globals.css`.

---

## 14. Komponen Wajib Distandardisasi

### 14.1 PublicContainer

Current API:

```jsx
<PublicContainer className="">
  ...
</PublicContainer>
```

Keputusan:

- pertahankan API;
- jangan menambah `size`, `as`, atau prop lain tanpa kebutuhan aktual;
- pindahkan CSS dari `shell.css` ke `components.css`;
- pertahankan width, margin, dan responsive horizontal padding;
- jangan mengubah max width.

Acceptance:

- seluruh pemakai tetap bekerja;
- shell tidak menjadi owner container;
- tidak ada duplicate `.public-container`.

### 14.2 PublicSection

Current API:

```jsx
<PublicSection id="" className="" bg="white|muted">
  ...
</PublicSection>
```

Keputusan:

- pertahankan API;
- pindahkan style section dari `home.css`;
- pertahankan default `bg="white"`;
- pertahankan semantic `<section>`;
- jangan menambah spacing variant pada tahap ini;
- jangan mengubah output DOM secara tidak perlu.

Acceptance:

- style tersedia tanpa `home.css`;
- muted dan white tetap bekerja;
- responsive section padding sama dengan baseline;
- tidak ada duplicate ownership.

### 14.3 SectionHeading

Current API:

```jsx
<SectionHeading
  eyebrow=""
  title=""
  description=""
  id=""
/>
```

Keputusan:

- pertahankan prop;
- class output menjadi:

```text
.section-heading
.section-heading__eyebrow
.section-heading__title
.section-heading__description
```

- jangan memakai `.hero-eyebrow`, `.hero-title`, `.hero-desc`;
- style dipindahkan atau ditulis di `components.css`;
- `<h2>` tetap;
- `id` tetap pada wrapper kecuali audit aksesibilitas menunjukkan target heading lebih tepat;
- perubahan target `id` tidak boleh dilakukan tanpa test route/anchor.

Kandidat style baseline:

```text
eyebrow      → supporting size, uppercase, brand-700
title        → h2 scale, margin
description  → body large, secondary text, max-width yang wajar
wrapper      → spacing konsisten
```

Jangan memaksa alignment center. Alignment khusus tetap melalui className/layout page jika dibutuhkan.

Acceptance:

- tidak bergantung pada hero Beranda;
- tidak mengubah page hero;
- heading order tetap;
- test menunjukkan class khusus.

### 14.4 InfoCard

Current API:

```jsx
<InfoCard
  title=""
  description=""
  marker=""
  icon=""
  className=""
/>
```

Keputusan:

- pertahankan API;
- pindahkan style dari `home.css`;
- gunakan border sebagai default;
- tidak menambah shadow;
- `marker` dan `icon` tetap decorative dengan `aria-hidden`;
- title tetap `<h3>`;
- description tetap paragraph;
- className extension tetap didukung;
- jangan menambah prop variant besar.

Acceptance:

- component tidak bergantung pada Beranda;
- page-specific `className` tetap bekerja;
- no shadow baru;
- semantic structure sama.

### 14.5 ActionLink

Current API:

```jsx
<ActionLink
  to=""
  variant="primary|secondary|outline"
  className=""
>
  ...
</ActionLink>
```

Keputusan:

- pertahankan API;
- pertahankan internal link dengan React Router;
- pertahankan external link dengan `target="_blank"` dan `rel="noopener noreferrer"`;
- pindahkan `.btn*` ke `components.css`;
- jangan mengubah route target;
- jangan menambah variant;
- class `.btn` boleh tetap menjadi canonical shared selector karena benar-benar global;
- pastikan `className` tidak menghasilkan whitespace bermasalah;
- jangan mengubah link menjadi button.

Acceptance:

- internal dan external behavior tetap;
- variant style sama;
- focus-visible tetap;
- test internal/external lulus.

### 14.6 HoldAction

Current API:

```jsx
<HoldAction
  reason=""
  variant="primary|secondary|outline"
  className=""
>
  ...
</HoldAction>
```

Keputusan:

- pertahankan held state;
- pertahankan `aria-disabled="true"`;
- jangan mengubah menjadi link aktif;
- jangan membuat CTA transaksi;
- pindahkan style ke `components.css`;
- tambahkan `type="button"` apabila belum ada agar tidak menjadi submit saat dipakai dalam form di masa depan;
- event tetap mencegah action;
- reason tetap dapat dibaca;
- jangan menghapus fokus hanya karena held;
- jangan memakai native `disabled` apabila itu membuat reason/focus contract hilang tanpa keputusan baru.

Acceptance:

- action tidak mengeksekusi;
- reason tetap tampil;
- keyboard focus terlihat;
- `type="button"` aman;
- publication gate tidak berubah.

---

## 15. Selector yang Wajib Dipindahkan

Dari `home.css` ke `components.css`:

```text
.section-padding
.section-bg-muted
.section-bg-white

.btn
.btn-primary
.btn-primary:hover
.btn-secondary
.btn-secondary:hover
.btn-outline
.btn-outline:hover
.btn:disabled
.btn[aria-disabled="true"]

.hold-action-wrapper
.hold-reason

.info-card
.card-indicator
.card-marker
.card-icon
.info-card h3
.info-card p
```

Dari `shell.css`:

```text
.public-container
responsive public-container rules
```

Style `SectionHeading`:

- dibuat di `components.css`;
- class hero tetap tinggal di `home.css` untuk hero Beranda;
- selector hero tidak dipindahkan secara massal.

Setelah pemindahan:

- hapus definisi lama;
- jangan menyisakan duplicate selector;
- jangan mengandalkan import order untuk override.

---

## 16. Selector yang Tidak Dipindahkan

Tetap di `home.css`:

```text
.home-hero
.hero-grid
.hero-eyebrow
.hero-title
.hero-desc
.hero-actions
.hero-visual
.system-diagram
.system-node
timeline Beranda
split layout Beranda jika hanya dipakai Beranda
closing visual Beranda jika belum terbukti shared
```

Catatan:

`.hero-actions` mungkin digunakan halaman lain secara raw. Audit harus mencatat pemakai. Namun PLAN-008B tidak otomatis menjadikannya shared component. Jika hanya nama yang berbenturan, page scoping atau migrasi diselesaikan di PLAN-008C.

Tetap di `shell.css`:

```text
header
navigation
drawer
footer
skip-link
app-shell
main-content
```

Tetap di page stylesheet:

- status content khusus;
- publication gate visual;
- project gallery;
- service diagram;
- page hero khusus;
- page CTA khusus;
- grid khusus halaman.

---

## 17. Ekstraksi Komponen Kondisional

Komponen berikut tidak otomatis dibuat:

```text
ActionGroup
StatusNotice
InlineNotice
PublicEmptyState
ClosingCTA
SurfaceCard
PageHero
```

Ekstraksi hanya boleh dilakukan apabila audit membuktikan:

1. minimal dua pemakai nyata;
2. struktur DOM stabil;
3. fungsi semantik sama;
4. style tidak bergantung page;
5. prop API dapat tetap kecil;
6. tidak memerlukan migrasi halaman besar;
7. acceptance criteria dapat diuji;
8. tidak mengubah copy atau publication state.

Jika salah satu tidak terpenuhi:

- catat sebagai kandidat PLAN-008C atau plan berikutnya;
- jangan membuat komponen.

### 17.1 ActionGroup

Boleh diekstrak jika:

- pola horizontal/wrap digunakan lintas hero/CTA;
- alignment dapat dikendalikan tanpa prop matrix;
- tidak bercampur dengan layout page.

### 17.2 StatusNotice

Boleh diekstrak jika:

- layanan dan proyek memakai struktur status yang setara;
- tone informasional sama;
- tidak mengaburkan hold state;
- class API sederhana.

### 17.3 Empty State

Boleh diekstrak jika:

- current-empty layanan dan proyek mempunyai kebutuhan sama;
- tidak mengubah 404;
- tidak mengubah unavailable state detail proyek.

### 17.4 Closing CTA

Boleh diekstrak hanya jika:

- markup benar-benar sama;
- action tetap nontransaksional;
- visual khusus halaman tidak hilang.

### 17.5 PageHero

Ditahan secara default.

Hero antarhalaman masih memiliki visual, layout, dan state berbeda. PageHero lebih aman diputuskan setelah PLAN-008C mengaudit semua halaman.

---

## 18. Prinsip Class Naming

### Shared Class

Shared class boleh generik apabila:

- benar-benar dimiliki `components.css`;
- API-nya stabil;
- lintas halaman;
- tidak mengandung nama halaman.

Contoh diterima:

```text
.btn
.info-card
.public-container
.section-heading
```

### Component Sub-element

Gunakan pola jelas:

```text
.section-heading__eyebrow
.section-heading__title
.section-heading__description
```

Tidak wajib mengubah seluruh repository menjadi BEM.

### Page-specific Class

Harus:

- tetap berada pada stylesheet halaman;
- sebisa mungkin di bawah page root;
- migrasi penuh diselesaikan pada PLAN-008C.

PLAN-008B hanya memperbaiki selector page apabila diperlukan langsung untuk mencegah collision akibat pemindahan shared CSS.

---

## 19. Arsitektur Import dan Cascade

Urutan:

```text
1. globals.css
2. shell.css
3. components.css
4. page styles
```

Konsekuensi:

- page style boleh memberi extension melalui class tambahan;
- page style tidak boleh mendefinisikan ulang shared selector global;
- override harus memakai page root dan class extension;
- jangan menambah `!important`;
- jangan menaikkan specificity tanpa alasan;
- jangan bergantung pada duplicate selector.

Contoh extension yang diterima:

```css
.page-about .position-panel {
  /* layout atau visual khusus posisi panel */
}
```

Contoh tidak diterima:

```css
.info-card {
  /* redefine global card dalam about.css */
}
```

---

## 20. Test Strategy

### 20.1 Component Tests

Tambahkan atau perbarui test untuk:

#### PublicContainer

- render children;
- className extension;
- class canonical.

#### PublicSection

- default white;
- muted variant;
- id;
- className extension;
- semantic `<section>`.

#### SectionHeading

- eyebrow optional;
- title wajib;
- description optional;
- id;
- class khusus;
- tidak menghasilkan `.hero-*`.

#### InfoCard

- title dan description;
- marker;
- icon;
- aria-hidden indicator;
- className extension.

#### ActionLink

- internal link;
- external link;
- target dan rel;
- variant;
- className extension.

#### HoldAction

- `aria-disabled`;
- `type="button"`;
- reason;
- prevent action;
- variant;
- focusable behavior bila test environment mendukung.

### 20.2 CSS Ownership Audit

Audit permanen atau test ringan boleh dibuat untuk memastikan selector shared hanya didefinisikan pada owner.

Minimal selector:

```text
.public-container
.section-padding
.section-bg-muted
.section-bg-white
.btn
.info-card
.hold-action-wrapper
.section-heading
```

Test/audit harus:

- menunjukkan duplicate owner;
- menyebut file;
- tidak terlalu rapuh;
- tidak menambah dependency.

Jika test permanen terlalu kompleks, hasil audit command wajib masuk laporan Gemini.

### 20.3 Token Contract

`tokens.test.js` harus tetap lulus.

PLAN-008B tidak boleh menurunkan cakupan atau menghapus test tersebut.

### 20.4 Route Regression

Seluruh test route lama harus tetap lulus.

---

## 21. Visual Smoke Audit

Viewport minimum:

```text
mobile  : sekitar 390 px
tablet  : sekitar 768 px
desktop : sekitar 1366 px
```

Route:

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

Periksa:

- header/footer;
- container width;
- horizontal padding;
- section spacing;
- button size;
- button hover/focus;
- held action;
- section heading;
- info card;
- no shadow baru;
- no overflow;
- no missing CSS;
- no selector collision;
- status/empty/404 tidak berubah;
- typography tidak melonjak;
- hero Beranda tidak berubah karena `SectionHeading`;
- Tentang tetap memiliki heading yang benar;
- page action tidak hilang.

---

## 22. Aksesibilitas

PLAN-008B harus menjaga:

- semantic link vs button;
- semantic section;
- heading order;
- focus-visible;
- keyboard operation;
- external link safety;
- held action announcement;
- `aria-disabled`;
- decorative marker/icon;
- contrast;
- reduced motion;
- 44px target pada shell tetap;
- no color-only status.

Khusus `HoldAction`:

- tetap focusable agar alasan dapat ditemukan;
- action tidak aktif;
- reason tidak disembunyikan;
- `type="button"` mencegah accidental submit.

Khusus `SectionHeading`:

- tetap `<h2>`;
- tidak menambah heading level prop sebelum kebutuhan nyata;
- id dan anchor behavior diuji.

---

## 23. Ruang Lingkup File

### 23.1 File Dokumentasi

```text
docs/plan/PLAN-008B_STANDARDISASI_KOMPONEN_DASAR_DAN_OWNERSHIP_CSS_WEBSITE_PUBLIK_RUMAHKU_KONSTRUKSI.md
docs/plan/PLAN-008_NORMALISASI_DESIGN_SYSTEM_DAN_FONDASI_VISUAL_WEBSITE_PUBLIK_RUMAHKU_KONSTRUKSI.md
docs/plan/README.md
```

Saat eksekusi, PLAN-008 induk hanya diperbarui untuk status tahap jika instruksi final memang mengharuskannya.

### 23.2 File CSS Utama

```text
apps/web/src/styles/components.css
apps/web/src/styles/home.css
apps/web/src/styles/shell.css
apps/web/src/main.jsx
```

### 23.3 File Komponen Utama

```text
apps/web/src/components/ui/PublicContainer.jsx
apps/web/src/components/ui/PublicSection.jsx
apps/web/src/components/ui/SectionHeading.jsx
apps/web/src/components/ui/InfoCard.jsx
apps/web/src/components/ui/ActionLink.jsx
apps/web/src/components/ui/HoldAction.jsx
```

Tidak semua file harus berubah. `PublicContainer`, `PublicSection`, `InfoCard`, dan `ActionLink` dapat tetap secara JSX apabila audit tidak menemukan kebutuhan.

### 23.4 File Test

Kandidat:

```text
apps/web/src/components/ui/PublicPrimitives.test.jsx
apps/web/src/styles/components-ownership.test.js
```

Nama final mengikuti pola repository.

### 23.5 File Kondisional

Page stylesheet/section hanya boleh diubah apabila:

- pemindahan style menghasilkan collision;
- raw shared selector perlu extension;
- test membuktikan kebutuhan;
- perubahan sangat lokal.

File kondisional:

```text
apps/web/src/styles/about.css
apps/web/src/styles/work-process.css
apps/web/src/styles/services.css
apps/web/src/styles/projects.css
apps/web/src/styles/project-detail.css
apps/web/src/sections/
apps/web/src/pages/
```

Setiap file kondisional harus dijelaskan.

### 23.6 Protected Scope

Jangan menyentuh:

```text
client/
apps/backend/
packages/
database/
prisma/
archive/
deployment configuration/
auth/
content catalogs/
project/service data resolver/
```

Jangan mengubah:

- package manifest;
- lockfile;
- environment;
- Vercel;
- Railway;
- Neon.

---

## 24. Urutan Implementasi yang Diusulkan

### Langkah 1 — Audit Baseline

- branch;
- HEAD;
- status;
- remote;
- lint;
- test;
- build;
- diff check.

### Langkah 2 — Inventaris Shared Selector

Cari:

```text
.public-container
.section-padding
.section-bg-*
.btn*
.hold-*
.info-card*
.section-heading
.hero-eyebrow
.hero-title
.hero-desc
```

Laporkan:

- definisi;
- pemakai;
- owner saat ini;
- duplicate;
- collision risk.

### Langkah 3 — Buat `components.css`

Pindahkan:

- container;
- section primitive;
- action/button;
- hold action;
- info card.

Tambahkan:

- SectionHeading class khusus.

Jangan mengubah nilai visual tanpa alasan.

### Langkah 4 — Rapikan Owner Lama

- hapus shared selector dari `home.css`;
- hapus container dari `shell.css`;
- pastikan tidak ada duplicate;
- pertahankan selector halaman.

### Langkah 5 — Perbarui Import

Tambahkan `components.css` setelah `shell.css`.

### Langkah 6 — Perbarui SectionHeading

- class khusus;
- test;
- audit pemakai;
- pastikan hero Beranda tetap menggunakan hero class sendiri.

### Langkah 7 — Hardening Komponen Minimum

- `HoldAction type="button"`;
- jangan memperluas API;
- jangan refactor component lain tanpa bukti.

### Langkah 8 — Test

- component tests;
- ownership audit;
- seluruh existing test;
- token contract.

### Langkah 9 — Visual Smoke Audit

Semua route dan viewport minimum.

### Langkah 10 — Validasi Akhir

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

## 25. Acceptance Criteria PLAN-008B

### Baseline

- branch `main`;
- HEAD sesuai;
- clean tree kecuali plan;
- baseline lint/test/build lulus.

### Ownership

- `components.css` tersedia;
- shared selector mempunyai satu owner;
- `.public-container` tidak lagi di `shell.css`;
- `.btn*`, `.section-*`, `.hold-*`, `.info-card*` tidak lagi di `home.css`;
- import order benar;
- tidak ada duplicate shared selector.

### Components

- enam komponen wajib tetap bekerja;
- API tidak diperluas secara berlebihan;
- `SectionHeading` tidak memakai `.hero-*`;
- `HoldAction` aman terhadap submit;
- `ActionLink` internal/external tetap;
- `PublicSection` semantic;
- `PublicContainer` responsive;
- `InfoCard` tidak mendapat shadow baru.

### CSS

- token contract tetap lulus;
- compatibility layer tetap ada;
- tidak ada undefined token;
- tidak ada `!important` baru;
- tidak ada CSS framework;
- tidak ada CSS Modules/CSS-in-JS;
- page-specific CSS tetap lokal.

### Visual

- tidak ada redesign;
- section spacing sama;
- container sama;
- button sama;
- card sama;
- no shadow baru;
- focus terlihat;
- no overflow;
- no missing style;
- hero Beranda tidak regresi.

### Route dan Publikasi

- route tetap;
- catalog tetap kosong;
- layanan/proyek tidak aktif;
- B05/dummy/legacy tidak tampil;
- sign-in dan 404 tetap;
- CTA transaksi tetap nol.

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
- laporan working tree lengkap;
- Pemilik commit/push manual;
- ChatGPT audit SHA.

---

## 26. Risiko dan Mitigasi

### Risiko 1 — Pemindahan CSS Mengubah Cascade

Mitigasi:

- import `components.css` sebelum page styles;
- pindahkan nilai tanpa modifikasi;
- hapus duplicate;
- visual smoke audit;
- periksa specificity.

### Risiko 2 — SectionHeading Berubah Visual

Mitigasi:

- salin baseline style yang memang dibutuhkan;
- jangan mengambil seluruh hero style;
- test pemakai;
- bandingkan Tentang dan section lain;
- jangan memengaruhi HomeHero.

### Risiko 3 — `home.css` Masih Menjadi Owner Tersembunyi

Mitigasi:

- audit selector;
- ownership test/report;
- hapus shared block secara lengkap;
- cari class pada seluruh repository.

### Risiko 4 — Komponen Baru Berlebihan

Mitigasi:

- komponen kondisional;
- minimal dua pemakai;
- API kecil;
- jangan membuat PageHero otomatis;
- catat kandidat untuk 008C.

### Risiko 5 — Override Page Hilang

Mitigasi:

- page style dimuat setelah components;
- extension memakai page root/class tambahan;
- jangan menghapus selector page;
- audit semua route.

### Risiko 6 — Held Action Menjadi Aktif

Mitigasi:

- pertahankan `aria-disabled`;
- pertahankan prevent default;
- test click;
- no route target;
- no transaction CTA.

### Risiko 7 — Scope Masuk PLAN-008C

Mitigasi:

- tidak menghapus legacy alias;
- tidak migrasi page token;
- tidak rename page selector massal;
- stop condition bila perlu banyak page changes.

### Risiko 8 — Test Terlalu Rapuh

Mitigasi:

- test behavior dan class contract minimum;
- jangan snapshot besar;
- static audit sederhana;
- error menunjukkan file/selector.

---

## 27. Stop Condition

Gemini wajib berhenti apabila:

- baseline tidak sesuai;
- baseline validation gagal;
- perlu menambah dependency;
- perlu mengubah route;
- perlu mengubah copy;
- perlu mengubah data;
- perlu mengubah resolver;
- perlu mengaktifkan layanan/proyek;
- perlu mengubah backend;
- perlu mengubah auth;
- perlu mengubah deployment;
- perlu migrasi seluruh halaman;
- perlu menghapus compatibility layer;
- pemindahan CSS menyebabkan redesign besar;
- komponen memerlukan prop API besar;
- lebih dari perubahan lokal page diperlukan;
- test failure tidak berasal dari scope;
- selector ownership tidak dapat diputuskan.

Jangan menyelesaikan ketidakjelasan dengan asumsi.

---

## 28. Perintah Validasi

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Audit tambahan:

```text
shared selector definitions
shared selector usages
duplicate selector owners
home.css dependency
shell.css dependency
components.css import position
```

Gemini harus menyertakan hasil, bukan hanya “lulus”.

---

## 29. Format Laporan Gemini

```text
1. Audit Awal
2. Branch, HEAD, Working Tree, Remote
3. Hasil Validasi Baseline
4. Inventaris Shared Selector
5. Ownership Sebelum
6. Keputusan Ownership Final
7. components.css
8. Selector Dipindahkan dari home.css
9. Selector Dipindahkan dari shell.css
10. Selector yang Tidak Dipindahkan dan Alasannya
11. Perubahan Komponen
12. SectionHeading Independence
13. HoldAction Safety
14. Komponen Kondisional yang Dibuat
15. Komponen Kondisional yang Ditahan
16. CSS Ownership Audit
17. File Diubah
18. File Dibuat
19. File Dihapus
20. Route dan Publication Invariants
21. Visual Smoke Audit
22. Hasil Lint
23. Hasil Test
24. Hasil Build
25. Hasil Token Contract Test
26. Hasil git diff --check
27. Working Tree Akhir
28. Risiko atau Sisa Pekerjaan untuk PLAN-008C
29. Konfirmasi Tidak Commit/Push
```

---

## 30. Keputusan Pemilik

Pemilik RKK menyetujui pada 28 Juli 2026:

1. `components.css` sebagai owner shared component;
2. `.public-container` dipindahkan dari `shell.css`;
3. selector shared dipindahkan dari `home.css`;
4. enam komponen wajib distandardisasi;
5. `SectionHeading` memakai class khusus dan tidak lagi memakai `.hero-*`;
6. `.btn` tetap menjadi shared canonical class;
7. `HoldAction` ditambah `type="button"`;
8. ekstraksi komponen lain tetap kondisional;
9. PageHero ditahan;
10. migrasi halaman tetap menjadi PLAN-008C;
11. scope file dan protected scope diterima;
12. PLAN-008B dapat dieksekusi mulai dari baseline yang diverifikasi.

---

## 31. Keputusan Eksekusi

Keputusan final:

```text
COMPONENTS.CSS DISETUJUI SEBAGAI OWNER SHARED CSS.
PERTAHANKAN API ENAM KOMPONEN DASAR.
PINDAHKAN SHARED SELECTOR TANPA REDESIGN.
PUTUS KETERGANTUNGAN SECTIONHEADING DARI HERO BERANDA.
JANGAN MEMBUAT KOMPONEN BARU TANPA DUA PEMAKAI NYATA.
JANGAN MIGRASI HALAMAN SECARA MENYELURUH.
PERTAHANKAN COMPATIBILITY LAYER SAMPAI PLAN-008C.
```

Urutan setelah PLAN-008B:

```text
audit SHA PLAN-008B
→ penutupan administratif PLAN-008B
→ draft PLAN-008C
→ migrasi halaman dan penghapusan compatibility layer
→ audit regresi lintas route
```

---

## 32. Status Penutup

```text
PLAN-008B TELAH DISETUJUI PEMILIK RKK PADA 28 JULI 2026.
PLAN-008B SIAP DIEKSEKUSI SETELAH AUDIT LOKAL DAN VALIDASI BASELINE LULUS.
BASE SHA: d04f43d6bf790c5cb6befb447e15a174863f1e4f
GEMINI TIDAK BOLEH COMMIT, PUSH, MERGE, ATAU MEMBUAT BRANCH.
HASIL WORKING TREE WAJIB DIREVIEW PEMILIK DAN DIAUDIT CHATGPT.
BELUM ADA PERUBAHAN REPOSITORY PADA SAAT PLAN INI DIFINALKAN.
```

---

## 33. Riwayat Versi

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1-draft | 2026-07-28 | Draf awal PLAN-008B berdasarkan PLAN-008, PLAN-008A terverifikasi, audit shared components, ownership `home.css`/`shell.css`, import order, dan baseline SHA `d04f43d...` | Direview Pemilik |
| 1.0 | 2026-07-28 | Pemilik menyetujui `components.css`, pemindahan shared selector, standardisasi enam komponen dasar, class khusus `SectionHeading`, hardening `HoldAction`, serta batas tegas terhadap PLAN-008C | Disetujui Pemilik — Siap Eksekusi Bersyarat Audit Lokal |
