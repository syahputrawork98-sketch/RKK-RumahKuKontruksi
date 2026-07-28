---
kode: PLAN-008
judul: Normalisasi Design System dan Fondasi Visual Website Publik Rumahku Konstruksi
versi: 1.4
status: DISETUJUI PEMILIK — SIAP EKSEKUSI BERTAHAP
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
tahap_aktif: PLAN-008D — Menunggu Penyusunan dan Persetujuan
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
base_sha: b21562f5ffb2e7877a094197e5d21cd72eccf6a4
base_sha_status: Remote terverifikasi sebagai penutup final PLAN-007
area_implementasi: apps/web
jenis_pekerjaan: normalisasi design system, design token, fondasi CSS, komponen UI lintas halaman, penyempurnaan visual Beranda, dan harmonisasi visual halaman publik
route_baru: tidak ada
perubahan_konten_bisnis: tidak ada
perubahan_status_publikasi: tidak ada
strategi: PLAN induk dengan eksekusi bertahap PLAN-008A, PLAN-008B, PLAN-008C, dan PLAN-008D
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-008 — NORMALISASI DESIGN SYSTEM DAN FONDASI VISUAL WEBSITE PUBLIK RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
PLAN-008A TELAH SELESAI DAN TERVERIFIKASI.
PLAN-008B TELAH SELESAI DAN TERVERIFIKASI.
PLAN-008C TELAH SELESAI DAN TERVERIFIKASI.
FINAL AUDIT PLAN-008C: 09d4f315d18d3843687efb6e9553c7ff351d10c6

TAHAP BERIKUTNYA ADALAH PLAN-008D — HARMONISASI VISUAL HALAMAN PUBLIK MENGACU PADA BERANDA.
PLAN-008D BELUM BOLEH DIEKSEKUSI SEBELUM PLAN DISEPAKATI PEMILIK.
```

Dokumen ini merupakan plan induk final untuk menormalkan design system dan fondasi visual website publik Rumahku Konstruksi.

PLAN-008 bukan redesign visual menyeluruh. PLAN-008 juga bukan implementasi halaman publik baru. Pekerjaan difokuskan pada kontrak design token, arsitektur CSS, ownership stylesheet, komponen UI yang digunakan lintas halaman, migrasi halaman yang sudah tersedia, serta audit regresi.

Pemilik RKK menyetujui PLAN-008 pada 28 Juli 2026. Eksekusi dimulai melalui PLAN-008A dan tetap tunduk pada audit baseline lokal.

---

## 2. Ringkasan Keputusan Final

| Area | Keputusan Final |
|---|---|
| Strategi utama | Normalisasi fondasi visual dan penyempurnaan/harmonisasi visual |
| Bentuk pekerjaan | PLAN induk dengan tahap terkontrol |
| Tahap besar | PLAN-008A, PLAN-008B, PLAN-008C, dan PLAN-008D |
| PLAN-008C | Penyempurnaan Visual Beranda sebagai Acuan Harmonisasi (Selesai & Terverifikasi) |
| PLAN-008D | Harmonisasi Visual Halaman Publik Mengacu pada Beranda (Menunggu Penyusunan) |
| Route baru | Tidak ada |
| Route yang dihapus | Tidak ada |
| Konten bisnis | Tidak diubah |
| Status layanan | Tetap ditahan |
| Status proyek | Tetap tidak ada proyek published |
| `projectCatalog` | Tetap `[]` |
| Slug proyek aktif | Tetap `0` |
| Data B05 | Tetap dilarang menjadi portofolio |
| Dummy/seed/legacy | Tetap dilarang tampil |
| Redesign penuh | Tidak dilakukan |
| Visual refinement | Beranda disempurnakan (PLAN-008C); halaman publik lain diharmonisasi pada PLAN-008D |
| Dependency baru | Tidak direncanakan |
| Backend/API/database | Tidak disentuh |
| Shell publik | Dipertahankan, hanya dinormalisasi bila diperlukan |
| Pelaksana kode | Gemini Antigravity |
| Commit dan push | Tetap dilakukan manual oleh Pemilik |
| Audit akhir | Dilakukan ChatGPT terhadap SHA hasil commit Pemilik |

Keputusan kerja yang diusulkan:

```text
PLAN-008
├── PLAN-008A — Normalisasi Design Token dan CSS Foundation (Selesai & Terverifikasi)
├── PLAN-008B — Standardisasi Komponen Dasar dan Ownership CSS (Selesai & Terverifikasi)
├── PLAN-008C — Penyempurnaan Visual Beranda sebagai Acuan Harmonisasi (Selesai & Terverifikasi)
└── PLAN-008D — Harmonisasi Visual Halaman Publik Mengacu pada Beranda (Menunggu Penyusunan)
```

PLAN-008D difokuskan untuk melakukan rollout harmonisasi visual pada halaman Tentang, Cara Kerja, Layanan, Proyek, Detail Proyek, dan public states dengan mengacu pada benchmark Beranda (PLAN-008C).

---

## 3. Latar Belakang

Website publik RKK telah mempunyai route:

```text
/                 → Beranda
/tentang          → Tentang Rumahku Konstruksi
/cara-kerja       → Cara Kerja
/layanan          → Daftar Layanan
/proyek           → Daftar Proyek Publik
/proyek/:slug     → Detail Proyek Publik
/sign-in          → State belum tersedia
*                 → 404 global
```

Plan yang telah diselesaikan:

```text
PLAN-001   Fondasi UI Website Publik dan Beranda
PLAN-001A  Penguatan Konten dan Visual Beranda
PLAN-003   Halaman Tentang
PLAN-004   Halaman Cara Kerja
PLAN-005   Halaman Daftar Layanan
PLAN-006   Halaman Daftar Proyek Publik
PLAN-007   Halaman Detail Proyek Publik
```

Konten, struktur informasi, modularitas halaman, dan keamanan publikasi telah berkembang dengan baik. Namun implementasi visual tumbuh melalui beberapa plan dan menggunakan lebih dari satu pola token serta ownership CSS.

Temuan utama:

1. terdapat beberapa namespace design token;
2. sejumlah custom property dipakai tetapi tidak didefinisikan pada `tokens.css`;
3. build dapat tetap lulus meskipun browser membuang deklarasi yang memakai variabel tidak terdefinisi;
4. primitive global seperti button dan section spacing berada di stylesheet halaman Beranda;
5. seluruh stylesheet halaman diimpor secara global;
6. beberapa selector generik berpotensi berbenturan lintas route;
7. hero, section heading, card, panel, notice, status, empty state, dan closing CTA belum memakai satu kontrak lintas halaman;
8. halaman yang sudah selesai berisiko memerlukan rework lebih besar apabila halaman berikutnya dibangun di atas fondasi yang belum dinormalisasi;
9. masalah fondasi teknis perlu dipisahkan dari visual refinement besar.

Karena itu, tahap paling efisien adalah menstabilkan fondasi terlebih dahulu sebelum melanjutkan Detail Layanan, Orientasi Konsultasi, dan tahap visual refinement menyeluruh.

---

## 4. Baseline Repository

Repository:

```text
syahputrawork98-sketch/RKK-RumahKuKontruksi
```

Baseline draf:

```text
branch   : main
base SHA : b21562f5ffb2e7877a094197e5d21cd72eccf6a4
commit   : docs(plan): close PLAN-007 after final audit
```

Sebelum setiap tahap dieksekusi, Gemini wajib memeriksa:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git remote -v
```

Expected pada awal PLAN-008A:

```text
branch       : main
HEAD         : b21562f5ffb2e7877a094197e5d21cd72eccf6a4
working tree : clean
remote       : repository RKK yang benar
```

Apabila HEAD telah berubah karena keputusan Pemilik atau pekerjaan lain yang sah, eksekusi harus dihentikan sementara untuk sinkronisasi baseline. Gemini tidak boleh menebak bahwa perubahan tersebut aman.

Baseline PLAN-008B dan PLAN-008C akan mengikuti SHA penutup tahap sebelumnya setelah:

1. Gemini menyelesaikan working tree;
2. Pemilik memeriksa hasil;
3. Pemilik melakukan commit dan push;
4. ChatGPT mengaudit SHA;
5. plan tahap berikutnya dikunci.

---

## 5. Hierarki Sumber Kebenaran

Urutan sumber keputusan:

1. keputusan aktif Pemilik RKK;
2. sumber bisnis aktif Room 1;
3. sumber produk dan website publik R02;
4. sumber design system P07;
5. paket halaman publik yang telah disetujui;
6. kontrak data publik P06 apabila telah tersedia;
7. repository aktif pada SHA yang disepakati;
8. arsip dan legacy hanya sebagai bahan pemeriksaan atau pembanding.

GitHub merupakan sumber kondisi implementasi aktual, tetapi bukan sumber keputusan bisnis dan publikasi.

Sumber produk dan website publik yang menjadi dasar:

1. `P04-F03 — SPESIFIKASI HALAMAN WEBSITE PUBLIK RKK`;
2. `P05.1-F01 — SPESIFIKASI FITUR DAN ALUR WEBSITE PUBLIK RKK`;
3. `P07.1-F04 — BLUEPRINT DAN SPESIFIKASI UI HALAMAN WEBSITE PUBLIK RKK`.

Sumber design system yang menjadi dasar:

1. `P07-F00 — PANDUAN DAN ARSITEKTUR UI UX DAN DESIGN SYSTEM RKK`;
2. `P07-F01 — AUDIT BASELINE UI UX GITHUB RKK`;
3. `P07-F02 — PRINSIP PENGALAMAN DAN ARAH VISUAL PRODUK RKK`;
4. `P07-F03 — DESIGN TOKEN DAN FONDASI VISUAL RKK`;
5. `P07-F04 — KATALOG KOMPONEN UI RKK`;
6. `P07-F06 — RESPONSIF AKSESIBILITAS DAN CONTENT DESIGN RKK`;
7. `P07-F08 — STATUS KESIAPAN DAN HANDOFF UI UX RKK`.

Sumber halaman yang telah diimplementasikan:

1. paket HOM;
2. paket ABT;
3. paket WRK;
4. paket SRV;
5. paket PRY;
6. paket PDT;
7. PLAN-001 sampai PLAN-007 yang relevan.

Aturan penggunaan sumber:

- spesifikasi konseptual tidak otomatis menjadi konfigurasi kode;
- repository tidak boleh memperluas keputusan bisnis;
- legacy tidak boleh menjadi acuan otomatis;
- nilai token atau API komponen tidak boleh diciptakan hanya untuk mempertahankan kesalahan lama;
- perubahan normalisasi harus mempertahankan makna konten dan state yang telah disetujui.

---

## 6. Hasil Audit yang Menjadi Dasar PLAN-008

### 6.1 Design Token Aktif

`apps/web/src/styles/tokens.css` saat ini telah menyediakan fondasi:

- warna brand;
- warna accent;
- neutral scale;
- semantic minimum untuk info dan warning;
- font family;
- ukuran teks utama;
- line-height;
- numeric spacing scale;
- container;
- radius dasar;
- transition.

Namespace yang paling konsisten dan menjadi kandidat canonical:

```text
--color-*
--font-size-*
--line-height-*
--spacing-*
--container-*
--radius-*
--transition-*
```

Fondasi tersebut belum mencakup secara utuh:

- semantic surface;
- semantic text;
- semantic border;
- semantic success/error apabila memang dibutuhkan;
- shadow scale;
- focus ring;
- beberapa nilai brand atau neutral yang dipakai halaman;
- dokumentasi alias dan migration path.

### 6.2 Namespace Tidak Konsisten

Contoh namespace lain yang ditemukan:

```text
--space-*
--text-*
--color-surface
--color-surface-hover
--color-border
--color-border-strong
--color-primary
--color-text
--color-text-muted
--radius-md
--radius-lg
```

Variasi lain:

```text
--spacing-xs
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
--text-4xl
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-full
--shadow-sm
--shadow-md
```

Token seperti `--color-brand-200` juga digunakan, sementara skala aktif belum mendefinisikannya.

PLAN-008 tidak boleh menyelesaikan masalah dengan sekadar menambahkan semua nama yang pernah digunakan. Setiap token harus dinilai berdasarkan fungsi, frekuensi, dan kebutuhan lintas halaman.

### 6.3 Ownership CSS

`apps/web/src/main.jsx` mengimpor seluruh stylesheet halaman secara global.

Primitive lintas halaman saat ini masih berada di `home.css`, termasuk pola seperti:

```text
.section-padding
.section-bg-muted
.section-bg-white
.btn
.btn-primary
.btn-secondary
.btn-outline
.informative-panel
.info-card
```

Akibatnya:

- shared component bergantung pada stylesheet halaman;
- urutan import ikut menentukan perilaku;
- ownership komponen tidak jelas;
- selector generik lebih mudah bentrok;
- halaman baru berpotensi menambah duplikasi.

### 6.4 Selector dan Page Scope

Sebagian halaman yang lebih baru sudah memakai page scope, misalnya:

```text
.page-projects
.page-project-detail
.page-services
.page-work-process
```

Namun masih terdapat selector generik seperti:

```text
.hero-actions
.hero-title
.hero-desc
.callout-title
.callout-desc
.stage-name
.value-title
```

PLAN-008 harus memastikan selector halaman:

- berada di bawah root page scope; atau
- benar-benar dipindahkan menjadi primitive bersama dengan API yang jelas.

### 6.5 Komponen Lintas Halaman

Fondasi reusable yang sudah tersedia meliputi:

- `PublicAppShell`;
- `PublicHeader`;
- `PublicFooter`;
- `PublicContainer`;
- `PublicSection`;
- `ActionLink`;
- `HoldAction`;
- `PageMeta`.

Namun pola berikut belum sepenuhnya distandardisasi:

- page hero;
- section heading;
- card;
- panel;
- callout;
- inline notice;
- status notice;
- empty state;
- closing CTA;
- visual frame;
- action group.

PLAN-008 harus mengekstrak hanya pola yang benar-benar berulang dan stabil. Jangan membuat component abstraction besar hanya karena dua elemen terlihat mirip.

### 6.6 Masalah Estetika yang Tidak Diselesaikan Sekarang

Temuan berikut dicatat, tetapi tidak menjadi target redesign PLAN-008:

- terlalu banyak section berbentuk kartu putih;
- variasi layout antarsection masih terbatas;
- hierarchy dan ritme visual belum matang;
- identitas konstruksi masih abstrak;
- header dan footer masih generik;
- art direction, fotografi, tekstur arsitektural, blueprint detail, dan microinteraction belum matang.

PLAN-008 hanya boleh memperbaiki bagian tersebut apabila perubahan diperlukan untuk konsistensi fondasi dan tidak berubah menjadi redesign halaman.

---

## 7. Definisi Normalisasi dan Batas Redesign

### 7.1 Normalisasi

Normalisasi berarti:

- menetapkan satu kontrak token;
- memperbaiki custom property yang tidak terdefinisi;
- menata semantic token;
- menata ownership CSS;
- memisahkan shared primitive dari page stylesheet;
- menata page scope;
- mengurangi duplikasi komponen;
- membangun baseline responsif dan aksesibilitas;
- memigrasikan halaman ke fondasi yang sama;
- menjaga hasil visual tetap dekat dengan implementasi yang sudah disetujui.

### 7.2 Bukan Redesign

PLAN-008 tidak boleh:

- mengganti komposisi seluruh halaman;
- mengganti seluruh copy;
- menambah halaman;
- mengubah navigasi;
- mengubah route;
- mengubah brand;
- mengganti logo;
- menambahkan foto proyek;
- menambahkan foto stok sebagai bukti konstruksi;
- menambahkan ilustrasi eksternal;
- membuat animasi dekoratif besar;
- mengganti header/footer secara menyeluruh;
- mengubah halaman menjadi gaya baru yang tidak dapat dibandingkan dengan baseline;
- mengaktifkan layanan atau proyek;
- membuat CTA transaksi.

### 7.3 Prinsip Visual yang Dipertahankan

Normalisasi harus menjaga arah:

```text
modern
profesional
terstruktur
bersih
tenang
teknis tetapi tidak kaku
hangat secara terbatas
dapat dipercaya
tidak berlebihan
```

Website publik harus tetap lebih editorial dan lapang dibanding dashboard internal.

Border dan struktur lebih diutamakan daripada shadow berat. Tidak semua card membutuhkan shadow.

---

## 8. Tujuan PLAN-008

PLAN-008 bertujuan:

1. menetapkan satu namespace design token canonical;
2. memastikan seluruh CSS custom property terdefinisi atau mempunyai fallback yang disengaja;
3. membedakan primitive palette dan semantic token;
4. membedakan warna brand dari warna status;
5. menormalkan typography scale;
6. menormalkan spacing scale;
7. menormalkan radius scale;
8. menormalkan shadow scale minimum;
9. menormalkan container dan section spacing;
10. menetapkan focus ring dan motion baseline;
11. memindahkan global shared primitives keluar dari stylesheet halaman;
12. membuat ownership CSS dapat dipahami;
13. memastikan stylesheet halaman memakai root page scope;
14. mengurangi selector global yang berpotensi bentrok;
15. menstandardisasi komponen lintas halaman yang benar-benar berulang;
16. memigrasikan halaman yang telah tersedia ke token canonical;
17. mempertahankan route, copy, data, state, dan publication gate;
18. mempertahankan current production state;
19. mempertahankan responsive behavior;
20. mempertahankan atau meningkatkan aksesibilitas;
21. mempertahankan seluruh regression test;
22. menyiapkan fondasi untuk halaman Detail Layanan dan Konsultasi;
23. mengurangi rework pada visual refinement menyeluruh;
24. mendokumentasikan alias sementara dan target penghapusannya;
25. menutup plan dengan audit lintas halaman yang dapat ditelusuri.

---

## 9. Non-Tujuan

PLAN-008 tidak bertujuan:

- membuat `/layanan/:slug`;
- membuat `/konsultasi`;
- membuat formulir konsultasi;
- membuat bukti penerimaan;
- membuat endpoint submission;
- membuat receipt token;
- mengubah kontrak P06;
- membuat backend;
- membuat database;
- membuat CMS;
- membuat autentikasi;
- mengaktifkan `/sign-in`;
- menerbitkan layanan;
- menerbitkan proyek;
- mengisi `projectCatalog`;
- membuat dummy service;
- membuat dummy project;
- memakai data B05 sebagai portofolio;
- memakai legacy sebagai sumber publik;
- mengganti konten bisnis;
- mengubah metadata halaman kecuali akibat refactor teknis yang tidak mengubah makna;
- mengubah urutan navigasi;
- menambah dependency;
- mengganti framework;
- mengganti Vite;
- mengganti React Router;
- mengganti test runner;
- mengubah deployment;
- menyentuh backend;
- menyentuh legacy client;
- melakukan visual refinement menyeluruh.

---

## 10. Invariant yang Wajib Dipertahankan

### 10.1 Route

Route berikut harus tetap bekerja:

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

PLAN-008 tidak menambah atau menghapus route.

### 10.2 Layanan

Kondisi layanan harus tetap:

```text
service catalog produksi : kosong atau sesuai current hold-state yang aktif
layanan published        : 0
detail layanan aktif     : 0
CTA transaksi            : 0
```

Tidak boleh muncul:

- Pembangunan Rumah Baru sebagai layanan aktif;
- Renovasi sebagai layanan aktif;
- harga;
- paket;
- wilayah;
- jadwal;
- SLA;
- tombol pesan atau konsultasi aktif.

### 10.3 Proyek

Kondisi proyek harus tetap:

```text
projectCatalog          : []
publishedProjects       : []
proyek published        : 0
slug detail aktif       : 0
project media           : 0
```

Semua slug current production tetap menghasilkan public unavailable state yang aman.

### 10.4 Data dan Publikasi

Dilarang:

- mengubah data `ACUAN` menjadi publik;
- memakai data B05 sebagai portofolio;
- menyalin seed, mock, dummy, atau legacy;
- memasukkan data internal ke client DTO;
- mengubah gate publikasi;
- melonggarkan anonimisasi;
- menambah remote image.

### 10.5 Konten

Copy halaman yang sudah disetujui harus dipertahankan, kecuali:

- koreksi typo yang jelas;
- perubahan markup untuk aksesibilitas;
- perubahan pembungkus komponen tanpa mengubah arti;
- perubahan kecil yang disetujui Pemilik.

---

## 11. Arsitektur Eksekusi PLAN-008

### 11.1 PLAN-008 sebagai Plan Induk

PLAN-008 menetapkan:

- tujuan;
- batas;
- kontrak;
- urutan;
- invariant;
- acceptance criteria keseluruhan;
- aturan subplan;
- workflow audit.

PLAN-008 tidak harus dieksekusi dalam satu working tree besar.

### 11.2 PLAN-008A

Judul kandidat:

```text
PLAN-008A — NORMALISASI DESIGN TOKEN DAN CSS FOUNDATION WEBSITE PUBLIK RKK
```

Fokus:

- audit seluruh custom property;
- tetapkan namespace canonical;
- lengkapi token yang dibutuhkan;
- buat semantic token minimum;
- dokumentasikan alias sementara;
- tetapkan stylesheet ownership dasar;
- siapkan file shared foundation;
- pertahankan visual dan markup halaman sejauh mungkin.

### 11.3 PLAN-008B

Judul kandidat:

```text
PLAN-008B — STANDARDISASI KOMPONEN DASAR DAN OWNERSHIP CSS WEBSITE PUBLIK RKK
```

Fokus:

- pindahkan shared primitives dari `home.css`;
- standardisasi komponen lintas halaman;
- tetapkan API class/component minimum;
- scope selector;
- kurangi duplikasi;
- jangan memigrasikan semua halaman sekaligus apabila belum aman.

### 11.4 PLAN-008C

Judul kandidat:

```text
PLAN-008C — MIGRASI HALAMAN PUBLIK DAN AUDIT REGRESI DESIGN SYSTEM RKK
```

Fokus:

- migrasi seluruh halaman ke token dan komponen canonical;
- hapus alias yang sudah tidak dibutuhkan;
- audit lintas route;
- audit responsive dan accessibility;
- validasi visual side-by-side;
- penutupan PLAN-008.

### 11.5 PLAN-008D Bersyarat

PLAN-008D hanya dibuat apabila setelah PLAN-008C terdapat pekerjaan besar, misalnya:

- alias legacy masih tersebar luas;
- audit visual menemukan regresi lintas halaman;
- kontrak komponen perlu revisi arsitektur;
- responsive regression memerlukan perubahan multi-page;
- test architecture memerlukan tahap khusus;
- penutupan tidak aman dilakukan melalui instruksi kecil.

Jika sisa pekerjaan hanya berupa koreksi lokal, jangan membuat PLAN-008D.

---

## 12. Aturan Memilih Subplan atau Instruksi Langsung Gemini

### 12.1 Wajib Menjadi Plan atau Subplan

Buat plan tersendiri apabila perubahan:

1. mengubah kontrak design token;
2. mengubah API komponen bersama;
3. memindahkan ownership CSS lintas halaman;
4. menyentuh banyak halaman;
5. berisiko menghasilkan visual regression;
6. perlu acceptance criteria terpisah;
7. perlu audit dan SHA terpisah;
8. mengubah struktur file secara berarti;
9. memerlukan keputusan Pemilik;
10. memperluas scope PLAN-008.

### 12.2 Cukup Instruksi Fix-Forward Gemini

Tidak perlu plan baru apabila perubahan:

- lokal;
- kecil;
- jelas;
- tidak mengubah keputusan;
- tidak mengubah kontrak token;
- tidak mengubah API komponen;
- tidak mengubah route;
- tidak mengubah data;
- tidak mengubah state publikasi;
- tidak memerlukan dependency;
- dapat diuji melalui regression suite yang sudah ada.

Contoh:

- satu selector belum di-scope;
- satu token salah ketik;
- satu halaman masih memakai alias lama;
- satu spacing mobile tidak konsisten;
- satu focus state terlewat;
- satu test perlu disesuaikan setelah perubahan class;
- satu alias dapat dihapus;
- satu warning lint;
- satu regresi visual kecil.

### 12.3 Heuristik Tambahan

Instruksi langsung biasanya sesuai bila:

```text
file terdampak          : 1–3 file
lapisan arsitektur      : satu lapisan lokal
route/data/publication  : tidak berubah
kontrak bersama         : tidak berubah
risiko rollback         : rendah
```

Angka tersebut merupakan heuristik, bukan aturan mutlak. Perubahan satu file tetap harus menjadi plan bila file tersebut mengubah kontrak global.

---

## 13. Kontrak Design Token yang Diusulkan

### 13.1 Namespace Canonical

Gunakan kategori canonical:

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

Tidak semua kategori harus mempunyai banyak nilai. Hanya tambahkan nilai yang benar-benar digunakan.

### 13.2 Primitive dan Semantic Token

Primitive:

```text
--color-brand-600
--color-neutral-200
--spacing-6
--radius-card
```

Semantic:

```text
--color-surface-page
--color-surface-muted
--color-surface-raised
--color-text-primary
--color-text-secondary
--color-text-inverse
--color-border-default
--color-border-strong
--focus-ring-color
```

Komponen sebaiknya memakai semantic token apabila fungsi visualnya sama di banyak halaman.

### 13.3 Aturan Alias

Alias sementara diperbolehkan apabila:

- migrasi langsung terlalu berisiko;
- mapping nilainya jelas;
- alias dicatat dalam tabel migrasi;
- halaman pemakai diketahui;
- target penghapusan ditetapkan;
- alias tidak dipakai untuk kode baru.

Contoh prinsip:

```css
/* Temporary migration alias — remove in PLAN-008C */
--space-4: var(--spacing-4);
```

Namun alias tidak boleh dibuat secara buta. `--text-lg` tidak otomatis dipetakan sebelum fungsi dan nilai aktualnya diperiksa.

### 13.4 Token Tidak Terdefinisi

Setiap token tidak terdefinisi harus diselesaikan melalui salah satu keputusan:

1. ganti dengan token canonical yang sudah ada;
2. tambahkan token baru karena fungsi lintas halaman terbukti;
3. tambahkan alias sementara;
4. hapus deklarasi yang tidak diperlukan;
5. gunakan fallback yang disengaja dan terdokumentasi.

Dilarang membiarkan browser diam-diam membuang deklarasi.

### 13.5 Shadow

Shadow scale harus minimum.

Rekomendasi awal:

```text
--shadow-none
--shadow-sm
--shadow-md
```

Penggunaan:

- tidak semua card memakai shadow;
- border menjadi pemisah utama;
- shadow hanya untuk elevasi yang benar-benar mempunyai makna;
- tidak membuat tampilan mewah atau berat.

### 13.6 Radius

Radius harus mempunyai fungsi yang jelas.

Kandidat:

```text
--radius-control
--radius-card
--radius-panel
--radius-pill
--radius-circle
```

Jangan mempertahankan banyak nama radius dengan nilai hampir sama tanpa alasan.

### 13.7 Responsive Token

Media query tetap dapat menggunakan breakpoint yang ada. PLAN-008 tidak wajib membangun token breakpoint apabila tidak memberi manfaat nyata pada CSS saat ini.

Section spacing dapat menggunakan token responsif atau aturan media yang konsisten, tetapi jangan menambah abstraction yang sulit dibaca.

---

## 14. Arsitektur CSS yang Diusulkan

### 14.1 Ownership File

Kandidat struktur:

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

`components.css` adalah kandidat, bukan kewajiban nama. Nama final dapat ditetapkan setelah audit lokal selama ownership tetap jelas.

### 14.2 Tanggung Jawab

`tokens.css`:

- seluruh custom property canonical;
- alias sementara yang terdokumentasi;
- tidak berisi selector komponen.

`globals.css`:

- reset;
- base typography;
- body;
- link dasar;
- focus-visible global;
- reduced-motion baseline;
- utilitas global yang benar-benar universal.

`shell.css`:

- app shell;
- header;
- drawer;
- footer;
- skip link;
- navigasi global.

`components.css`:

- button/action;
- container;
- section;
- page hero;
- section heading;
- card/panel;
- notice;
- status;
- empty state;
- closing CTA;
- shared action group.

Page stylesheet:

- hanya layout dan visual khusus halaman;
- seluruh selector di-scope di bawah root page class;
- tidak memiliki shared global primitive.

### 14.3 Urutan Import

Import harus jelas dan stabil:

```text
tokens
globals
shell
components
page styles
```

Apabila `tokens.css` saat ini sudah diimpor dari `globals.css`, jangan membuat import ganda. Audit actual import graph terlebih dahulu.

### 14.4 Selector

Aturan:

- shared component memakai namespace class yang jelas;
- page-specific selector wajib memiliki page root;
- generic selector hanya boleh ada di shared layer;
- hindari selector berdasarkan urutan DOM yang rapuh;
- hindari `!important` kecuali ada alasan terdokumentasi;
- hindari specificity escalation;
- state class dan attribute selector harus dapat diuji.

---

## 15. Komponen Minimum yang Diusulkan

Komponen hanya diekstrak apabila:

- dipakai oleh minimal dua permukaan; atau
- merupakan primitive global yang jelas; atau
- mempunyai kontrak aksesibilitas yang perlu dipusatkan.

### 15.1 Action dan Button

Pertahankan atau normalisasi:

- `ActionLink`;
- primary;
- secondary;
- outline;
- disabled/held state;
- focus-visible;
- action group.

Tidak membuat button variant hanya untuk satu halaman.

### 15.2 Container dan Section

Pertahankan atau normalisasi:

- `PublicContainer`;
- `PublicSection`;
- width variants;
- section spacing;
- surface variants;
- semantic markup.

Shared section class tidak boleh bergantung pada `home.css`.

### 15.3 Page Hero

Kandidat API:

- eyebrow;
- heading;
- supporting copy;
- primary action;
- secondary action;
- optional visual;
- alignment;
- width variant.

Page hero tidak boleh memaksa semua halaman memiliki layout identik. Komponen dapat menyediakan struktur dasar dan membiarkan visual khusus halaman tetap lokal.

### 15.4 Section Heading

Kandidat API:

- eyebrow optional;
- heading;
- supporting copy;
- alignment;
- max width;
- heading level.

### 15.5 Card dan Panel

Bedakan fungsi:

- card untuk unit konten;
- panel untuk kelompok atau area informasi;
- tidak membuat seluruh section menjadi card;
- border default;
- shadow optional dan terbatas.

### 15.6 Notice dan Status

Kandidat:

- inline notice;
- status notice;
- informational;
- warning;
- success/error hanya bila kebutuhan nyata tersedia;
- icon tidak wajib;
- warna bukan satu-satunya pembeda.

### 15.7 Empty State

Kandidat:

- title;
- description;
- action optional;
- tone;
- tidak menyamarkan hold state sebagai error;
- tidak membuat loading palsu.

### 15.8 Closing CTA

Kandidat:

- heading;
- supporting copy;
- primary/secondary safe action;
- nontransaksional pada current state;
- tidak membuat janji.

### 15.9 Prinsip Anti-Overengineering

Jangan:

- membuat component factory besar;
- membuat prop matrix yang sulit dipahami;
- membuat abstraction sebelum pola stabil;
- mengubah semua markup hanya demi konsistensi nama;
- memaksa visual khusus menjadi satu komponen generik;
- menambah dependency component library.

---

## 16. Ruang Lingkup File

### 16.1 Minimal Audit

```text
apps/web/src/styles/tokens.css
apps/web/src/styles/globals.css
apps/web/src/styles/shell.css
apps/web/src/styles/home.css
apps/web/src/styles/about.css
apps/web/src/styles/work-process.css
apps/web/src/styles/services.css
apps/web/src/styles/projects.css
apps/web/src/styles/project-detail.css

apps/web/src/components/ui/
apps/web/src/components/public/
apps/web/src/pages/
apps/web/src/app/AppRouter.jsx
apps/web/src/main.jsx
```

### 16.2 File yang Boleh Dibuat

Kandidat:

```text
apps/web/src/styles/components.css
apps/web/src/components/public/PageHero.jsx
apps/web/src/components/public/SectionHeading.jsx
apps/web/src/components/ui/SurfaceCard.jsx
apps/web/src/components/ui/InlineNotice.jsx
apps/web/src/components/ui/StatusNotice.jsx
apps/web/src/components/ui/PublicEmptyState.jsx
apps/web/src/components/public/ClosingCta.jsx
```

Nama dan jumlah file final harus mengikuti audit. Jangan membuat semua kandidat apabila pola aktual tidak membutuhkannya.

### 16.3 File yang Tidak Boleh Disentuh

```text
client/
apps/backend/
packages/
database/
prisma/
archive/
legacy server/
deployment config/
```

Jangan:

- mengubah lockfile;
- mengganti dependency;
- memindahkan folder besar;
- mengubah root workspace;
- mengubah auth;
- mengubah API;
- mengubah environment;
- mengubah Vercel/Railway/Neon;
- menghapus fitur lama;
- mengubah brand asset.

---

## 17. Detail PLAN-008A

### 17.1 Tujuan

PLAN-008A menstabilkan kontrak token dan fondasi CSS sebelum komponen dan halaman dimigrasikan.

### 17.2 Tahap Audit

Gemini harus menghasilkan inventaris:

1. seluruh `var(--...)`;
2. lokasi file dan line;
3. token defined;
4. token undefined;
5. duplicate meaning;
6. alias candidate;
7. direct hard-coded value yang seharusnya token;
8. token yang hanya dipakai satu kali;
9. token yang tidak dipakai;
10. token status yang bercampur dengan brand.

Audit dapat menggunakan pencarian repository dan script lokal, tetapi script sementara tidak boleh masuk repository kecuali disetujui.

### 17.3 Implementasi

PLAN-008A dapat mencakup:

- normalisasi `tokens.css`;
- semantic surface/text/border;
- shadow minimum;
- focus ring;
- alias sementara;
- dokumentasi migration map;
- perbaikan import foundation;
- penghapusan token mati yang aman;
- fallback yang disengaja;
- perubahan minimum pada page CSS agar build dan browser memakai token valid.

PLAN-008A tidak memindahkan seluruh komponen halaman.

### 17.4 Deliverable

- token contract canonical;
- tabel token legacy → canonical;
- daftar alias sementara;
- daftar token yang dihapus;
- tidak ada custom property undefined pada jalur produksi;
- test atau audit script bila layak;
- dokumentasi hasil.

### 17.5 Acceptance Criteria PLAN-008A

- seluruh custom property production terdefinisi;
- tidak ada silent invalid declaration yang diketahui;
- canonical namespace terdokumentasi;
- semantic token minimum tersedia;
- alias sementara diberi komentar removal target;
- tidak ada route/content/data change;
- visual regression besar tidak terjadi;
- lint, test, build, dan diff check lulus.

---

## 18. Detail PLAN-008B

### 18.1 Tujuan

PLAN-008B memisahkan shared primitives dari page stylesheet dan menstandardisasi komponen minimum lintas halaman.

### 18.2 Implementasi

PLAN-008B dapat mencakup:

- pindahkan `.btn*` dari `home.css`;
- pindahkan shared section spacing dan surface;
- pindahkan shared panel/card/status primitives;
- pastikan `PublicSection` mempunyai ownership CSS yang benar;
- pastikan `ActionLink` mempunyai ownership CSS yang benar;
- buat page hero base bila pola stabil;
- buat section heading base;
- buat notice/status/empty state base;
- scope selector About dan halaman lain;
- rapikan import order.

### 18.3 Batas

PLAN-008B tidak:

- merombak layout seluruh halaman;
- mengganti copy;
- mengubah route;
- mengaktifkan halaman baru;
- memigrasikan semua visual secara agresif;
- membuat semua card menjadi satu komponen.

### 18.4 Deliverable

- shared stylesheet atau ownership setara;
- komponen bersama minimum;
- dokumentasi API class/component;
- page stylesheet tidak lagi menjadi sumber primitive global;
- selector collision utama ditutup;
- test komponen bersama.

### 18.5 Acceptance Criteria PLAN-008B

- `ActionLink` tidak bergantung pada `home.css`;
- `PublicSection` tidak bergantung pada `home.css`;
- shared primitive mempunyai satu owner;
- generic selector yang tersisa memang shared;
- page selector di-scope;
- component API tidak berlebihan;
- markup tetap semantik;
- keyboard/focus tetap bekerja;
- lint, test, build, dan diff check lulus.

---

## 19. Detail PLAN-008C

### 19.1 Tujuan

PLAN-008C memigrasikan halaman yang sudah tersedia ke fondasi canonical dan menutup regresi lintas route.

### 19.2 Urutan Migrasi yang Diusulkan

Urutan berdasarkan risiko:

1. Tentang;
2. Proyek;
3. Detail Proyek;
4. Layanan;
5. Cara Kerja;
6. Beranda;
7. shell global dan 404/sign-in regression.

Alasan:

- Tentang mempunyai namespace paling berbeda;
- Proyek dan Detail Proyek memakai alias spacing/text/radius/shadow;
- Beranda memiliki ownership shared primitive sehingga dimigrasikan setelah komponen bersama stabil.

Urutan dapat disesuaikan setelah audit lokal, tetapi alasan perubahan harus dilaporkan.

### 19.3 Matriks Halaman

| Halaman | Target PLAN-008C |
|---|---|
| Beranda | memakai shared primitive baru; tidak menjadi owner global |
| Tentang | ganti namespace undefined; scope selector generik |
| Cara Kerja | verifikasi token canonical dan page scope |
| Layanan | verifikasi hold state, notice, CTA, card/panel |
| Proyek | ganti spacing/text/radius/shadow alias; pertahankan catalog kosong |
| Detail Proyek | ganti token dan primitive; pertahankan published-only gate |
| Sign-in | regression only; state tetap belum tersedia |
| 404 | regression only; tidak mengubah perilaku |
| Header/Footer | regression dan konsistensi focus/responsive |

### 19.4 Visual Comparison

Wajib memeriksa minimal:

```text
mobile  : sekitar 360–430 px
tablet  : sekitar 768 px
desktop : sekitar 1280–1440 px
```

Audit side-by-side harus memeriksa:

- typography;
- spacing;
- container;
- alignment;
- card/panel;
- button;
- notice/status;
- hero;
- section rhythm;
- overflow;
- wrapping;
- focus;
- reduced motion;
- header/drawer/footer.

Normalisasi boleh menghasilkan perubahan kecil yang lebih konsisten. Perubahan layout besar harus dihentikan untuk keputusan Pemilik.

### 19.5 Alias Cleanup

Pada akhir PLAN-008C:

- hapus alias yang tidak lagi digunakan;
- pertahankan alias hanya bila ada alasan dan owner;
- dokumentasikan technical debt yang sengaja ditunda;
- pencarian repository tidak menemukan namespace legacy yang dilarang.

### 19.6 Acceptance Criteria PLAN-008C

- seluruh route tetap bekerja;
- seluruh halaman memakai token canonical;
- page stylesheet di-scope;
- shared primitives tidak diduplikasi;
- tidak ada token undefined;
- tidak ada regression publikasi;
- project catalog tetap kosong;
- tidak ada service/project dummy;
- responsive lulus;
- accessibility lulus;
- seluruh test lama lulus;
- lint/build/diff check lulus;
- visual audit disertakan dalam laporan.

---

## 20. Aksesibilitas

PLAN-008 wajib menjaga atau meningkatkan:

- semantic heading order;
- landmark;
- skip link;
- `aria-current`;
- accessible name;
- keyboard operation;
- visible focus;
- disabled dan held state;
- color contrast;
- informasi tidak bergantung pada warna;
- reduced motion;
- link versus button semantics;
- target size yang layak;
- no horizontal overflow;
- text zoom/reflow.

Dilarang:

- menghilangkan outline tanpa pengganti;
- membuat div clickable tanpa keyboard contract;
- menyembunyikan text penting hanya pada hover;
- membuat status hanya dibedakan melalui warna;
- mengubah held action menjadi button aktif.

---

## 21. Responsive Baseline

Prinsip:

- mobile-first;
- content tidak terpotong;
- action group dapat wrap;
- hero visual tidak mendorong overflow;
- grid turun secara logis;
- section spacing tidak terlalu besar pada mobile;
- line length tetap terbaca;
- header/drawer tidak regresi;
- footer tidak menumpuk secara acak.

PLAN-008 tidak bertujuan menyempurnakan semua art direction mobile. Targetnya adalah baseline yang konsisten dan bebas regresi.

---

## 22. Testing

### 22.1 Unit dan Component Test

Tambahkan atau perbarui test hanya bila diperlukan untuk:

- shared component variants;
- semantic element;
- action target;
- held/disabled state;
- optional section behavior;
- page hero structure;
- empty/status state;
- no unsafe content;
- route regression.

Test tidak boleh terlalu bergantung pada class name atau snapshot visual yang rapuh.

### 22.2 Regression Route

Minimal:

```text
/
/tentang
/about redirect bila masih aktif
/cara-kerja
/layanan
/proyek
/proyek/contoh
/sign-in
/route-tidak-dikenal
```

Expected current state:

- route publik tersedia;
- alias `/about` tetap sesuai keputusan aktif;
- `/proyek/contoh` menghasilkan unavailable/404 public state sesuai PLAN-007;
- sign-in tetap unavailable;
- wildcard tetap 404;
- tidak ada layanan atau proyek aktif.

### 22.3 Static Audit

Audit custom property harus dapat membuktikan:

- defined;
- used;
- alias;
- unused;
- undefined = 0 pada production CSS.

Audit dapat berupa command/report, tidak wajib menjadi dependency permanen.

---

## 23. Perintah Validasi

Gunakan workspace `web`:

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
git status --short
```

Tambahkan pemeriksaan repository:

```bash
git diff --stat
git diff --name-only
```

Apabila tersedia browser audit lokal, laporkan hasil tanpa menambahkan dependency permanen.

Gemini harus melaporkan:

- branch;
- baseline SHA;
- working tree awal;
- file yang diubah;
- file yang dibuat;
- file yang dihapus;
- token added/changed/removed;
- alias added/removed;
- shared components;
- page migrations;
- route invariants;
- data/publication invariants;
- lint;
- test;
- build;
- diff check;
- working tree akhir;
- konfirmasi tidak commit/push.

---

## 24. Acceptance Criteria Keseluruhan PLAN-008

PLAN-008 diterima apabila:

### Token

- satu canonical namespace diterapkan;
- seluruh custom property terdefinisi atau mempunyai fallback yang disengaja;
- alias sementara terdokumentasi;
- warna brand dan status dipisahkan;
- semantic surface/text/border tersedia sesuai kebutuhan;
- spacing, type, radius, shadow, dan transition konsisten.

### CSS Architecture

- shared primitive tidak dimiliki page stylesheet;
- import order jelas;
- page stylesheet di-scope;
- selector collision ditutup;
- tidak ada specificity escalation yang tidak perlu;
- tidak ada `!important` baru tanpa alasan.

### Components

- reusable component minimum tersedia;
- component API sederhana;
- tidak ada abstraction berlebihan;
- accessibility contract terjaga;
- shared component mempunyai satu owner.

### Pages

- Beranda tetap bekerja;
- Tentang tetap bekerja;
- Cara Kerja tetap bekerja;
- Layanan tetap hold-safe;
- Proyek tetap hold-safe;
- Detail Proyek tetap published-only;
- Sign-in tetap unavailable;
- 404 tetap bekerja;
- header/drawer/footer tidak regresi.

### Data dan Publikasi

- `projectCatalog = []`;
- proyek published = 0;
- slug detail aktif = 0;
- layanan aktif tidak diciptakan;
- data B05 tidak tampil;
- dummy/seed/legacy tidak tampil;
- tidak ada remote project image;
- tidak ada CTA transaksi.

### Visual

- perubahan merupakan normalisasi, bukan redesign;
- hierarchy tidak memburuk;
- spacing dan typography lebih konsisten;
- card/panel tidak mendapatkan shadow berat secara massal;
- responsive baseline lulus;
- visual comparison tidak menemukan regresi besar.

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
- Pemilik melakukan commit/push manual;
- ChatGPT mengaudit SHA;
- setiap tahap ditutup sebelum tahap berikutnya dimulai.

---

## 25. Risiko dan Mitigasi

### Risiko 1 — Normalisasi Berubah Menjadi Redesign

Mitigasi:

- pertahankan copy dan struktur;
- gunakan visual comparison;
- perubahan besar memerlukan keputusan Pemilik;
- pisahkan refinement ke plan masa depan.

### Risiko 2 — Alias Menjadi Technical Debt Permanen

Mitigasi:

- setiap alias mempunyai komentar;
- catat owner dan target penghapusan;
- audit pada PLAN-008C;
- jangan gunakan alias pada kode baru.

### Risiko 3 — Component Abstraction Berlebihan

Mitigasi:

- ekstrak pola stabil;
- gunakan minimal dua pemakai atau primitive global;
- hindari prop matrix;
- pertahankan visual lokal bila memang khusus halaman.

### Risiko 4 — CSS Collision Baru

Mitigasi:

- shared namespace;
- page root scope;
- import order;
- regression lint/test;
- pemeriksaan browser lintas route.

### Risiko 5 — Visual Regression Tersembunyi

Mitigasi:

- audit mobile/tablet/desktop;
- side-by-side;
- periksa seluruh route;
- per tahap memakai SHA terpisah;
- fix-forward kecil sebelum penutupan.

### Risiko 6 — Build Lulus tetapi CSS Tidak Berlaku

Mitigasi:

- audit custom property;
- undefined token = 0;
- browser inspection;
- fallback disengaja;
- test tidak hanya mengandalkan build.

### Risiko 7 — Publication Gate Berubah Saat Refactor

Mitigasi:

- test invariants;
- tidak mengubah content/data layer kecuali import;
- current catalogs tetap kosong;
- audit route proyek dan layanan;
- no dummy.

### Risiko 8 — Scope Membesar

Mitigasi:

- daftar non-tujuan;
- protected files;
- stop condition;
- perubahan di luar scope kembali ke Pemilik;
- gunakan subplan hanya bila pekerjaan memang besar.

---

## 26. Stop Condition

Gemini wajib berhenti dan melapor apabila:

- branch bukan `main`;
- HEAD tidak sesuai baseline;
- working tree awal tidak clean;
- remote bukan repository RKK;
- ditemukan perubahan Pemilik yang belum disinkronkan;
- normalisasi memerlukan route change;
- normalisasi memerlukan dependency;
- normalisasi memerlukan perubahan konten bisnis;
- ditemukan kebutuhan untuk mengaktifkan data;
- test failure berasal dari baseline;
- perubahan visual menjadi redesign besar;
- protected file harus disentuh;
- mapping token tidak dapat ditentukan tanpa keputusan.

Gemini tidak boleh menyelesaikan ketidakjelasan tersebut dengan asumsi.

---

## 27. Workflow Persetujuan dan Eksekusi

### Persetujuan Plan Induk

```text
ChatGPT menyusun draf PLAN-008
→ Pemilik membaca dan menyetujui pada 28 Juli 2026
→ PLAN-008 ditetapkan sebagai plan induk final
→ PLAN-008A ditetapkan sebagai tahap aktif pertama
→ instruksi Gemini disiapkan khusus untuk PLAN-008A
```

### Eksekusi Tiap Tahap

```text
Gemini audit lokal
→ Gemini mengubah working tree
→ Gemini menjalankan validasi
→ Gemini melaporkan hasil
→ Gemini tidak commit/push
→ Pemilik memeriksa
→ Pemilik commit/push
→ ChatGPT mengaudit SHA
→ tahap ditutup
```

### Perubahan Kecil

```text
temuan kecil
→ ChatGPT memberi instruksi fix-forward singkat
→ Gemini memperbaiki
→ validasi
→ Pemilik commit/push
→ ChatGPT audit SHA
```

Tidak perlu membuat plan baru apabila perubahan memenuhi definisi kecil pada dokumen ini.

---

## 28. Format Laporan Gemini

Laporan wajib menggunakan struktur:

```text
1. Audit Awal
2. Baseline
3. Keputusan Implementasi
4. File Diubah
5. File Dibuat
6. File Dihapus
7. Token dan Alias
8. Komponen
9. Halaman yang Dimigrasikan
10. Route dan Publication Invariants
11. Hasil Lint
12. Hasil Test
13. Hasil Build
14. Hasil git diff --check
15. Working Tree Akhir
16. Risiko atau Sisa Pekerjaan
17. Konfirmasi Tidak Commit/Push
```

Jangan hanya menulis “selesai” atau “semua lulus” tanpa output yang dapat diperiksa.

---

## 29. Keputusan Pemilik

Pemilik RKK menyetujui pada 28 Juli 2026:

1. judul dan tujuan PLAN-008;
2. PLAN-008 sebagai plan induk normalisasi;
3. pembagian tahap PLAN-008A, PLAN-008B, dan PLAN-008C;
4. PLAN-008D tetap bersyarat dan tidak dibuat otomatis;
5. canonical namespace ditetapkan melalui audit PLAN-008A;
6. shared CSS owner dapat menggunakan `components.css` atau nama setara setelah audit PLAN-008B;
7. migrasi halaman dilakukan bertahap dalam PLAN-008C;
8. visual comparison wajib dilakukan pada kelompok mobile, tablet, dan desktop;
9. perubahan kecil cukup memakai instruksi fix-forward Gemini;
10. PLAN-008 dapat dieksekusi mulai dari PLAN-008A.

---

## 30. Keputusan Eksekusi

Keputusan final:

```text
PLAN-008 DISETUJUI SEBAGAI PLAN INDUK NORMALISASI.
EKSEKUSI DIMULAI DARI PLAN-008A.
PLAN-008B DAN PLAN-008C DIKUNCI SETELAH SHA TAHAP SEBELUMNYA DIAUDIT.
PLAN-008D HANYA DIBUAT JIKA AUDIT PENUTUPAN MENUNJUKKAN PEKERJAAN BESAR.
KOREKSI KECIL DISELESAIKAN MELALUI INSTRUKSI FIX-FORWARD GEMINI.
```

Urutan setelah PLAN-008 selesai:

```text
PLAN-009 — Implementasi Halaman Detail Layanan
PLAN-010 — Implementasi Halaman Orientasi Konsultasi
PLAN-011 — Formulir dan Bukti Penerimaan setelah dependency siap
PLAN-012 — Visual Refinement Menyeluruh Website Publik
```

Urutan tersebut dapat disesuaikan melalui keputusan Pemilik dan kesiapan sumber pada saat masing-masing tahap dimulai.

---

## 31. Status Penutup

```text
PLAN-008 TELAH DISETUJUI PEMILIK RKK PADA 28 JULI 2026.
PLAN-008 MENJADI PLAN INDUK FINAL.
PLAN-008A TELAH SELESAI DAN TERVERIFIKASI.
PLAN-008B TELAH SELESAI DAN TERVERIFIKASI.
PLAN-008C TELAH SELESAI DAN TERVERIFIKASI.
FINAL AUDIT PLAN-008C: 09d4f315d18d3843687efb6e9553c7ff351d10c6

TAHAP BERIKUTNYA ADALAH PLAN-008D — HARMONISASI VISUAL HALAMAN PUBLIK MENGACU PADA BERANDA.
PLAN-008D BELUM BOLEH DIEKSEKUSI SEBELUM PLAN DISEPAKATI PEMILIK.
```

---

## 32. Riwayat Versi

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1-draft | 2026-07-28 | Draf awal PLAN-008 berdasarkan audit Drive, GitHub, design token, CSS ownership, komponen, dan halaman publik aktif | Direview Pemilik |
| 1.0 | 2026-07-28 | Pemilik menyetujui PLAN-008 sebagai plan induk, pembagian 008A–008C, 008D bersyarat, serta aturan fix-forward untuk perubahan kecil | Disetujui Pemilik — Siap Eksekusi Bertahap |
| 1.1 | 2026-07-28 | Mencatat PLAN-008A selesai dan terverifikasi. Tahap berikutnya PLAN-008B menunggu persetujuan | Eksekusi Bertahap (Menunggu PLAN-008B) |
| 1.2 | 2026-07-28 | Mencatat PLAN-008B selesai dan terverifikasi. Tahap berikutnya PLAN-008C menunggu persetujuan | Eksekusi Bertahap (Menunggu PLAN-008C) |
| 1.4 | 2026-07-28 | Mencatat PLAN-008C selesai dan terverifikasi. Tahap berikutnya PLAN-008D menunggu penyusunan dan persetujuan | Eksekusi Bertahap (Menunggu PLAN-008D) |
