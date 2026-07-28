---
kode: PLAN-008D
judul: Harmonisasi Visual Seluruh Halaman Publik Mengacu pada Benchmark Beranda Rumahku Konstruksi
versi: 1.4
status: DIEKSEKUSI — FINAL VISUAL POLISH MENUNGGU AUDIT
implementation_sha_awal: dde5857026f1c28f377a3844b7394fd83e70f828
fix_forward_sha_1: 266ef7f2371936b74fd25a9038d3883618044d24
source_alignment_sha: a56f7c709e7f5f39c77dac05853e065e83cc5e76
final_visual_polish_sha: MENUNGGU COMMIT PEMILIK
tanggal_penyusunan: 2026-07-29
tanggal_persetujuan: 2026-07-29
parent_plan: PLAN-008
tahap_sebelumnya: PLAN-008C — Selesai dan Terverifikasi
benchmark_visual: Beranda hasil PLAN-008C
baseline_sha: 8dc6298763e415c5ea13170f7a4ed722358d28eb
baseline_status: Remote terverifikasi sebagai baseline final setelah penutupan PLAN-008C
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
area_implementasi: apps/web
route_utama:
  - /tentang
  - /cara-kerja
  - /layanan
  - /proyek
  - /proyek/:slug
  - /sign-in
  - "*"
route_baru: tidak
perubahan_konten_bisnis: tidak
perubahan_struktur_data_bisnis: tidak
perubahan_status_publikasi: tidak
perubahan_backend: tidak
dependency_baru: tidak
jenis_pekerjaan: harmonisasi visual lintas halaman, editorial layout, ikon semantik, ilustrasi state, fotografi terbatas, responsive polish, accessibility, dan regression audit
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-008D — HARMONISASI VISUAL SELURUH HALAMAN PUBLIK MENGACU PADA BENCHMARK BERANDA RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
DIEKSEKUSI — FINAL VISUAL POLISH MENUNGGU AUDIT
PLAN-008D MENCAKUP SELURUH HALAMAN PUBLIK SELAIN BERANDA
BERANDA MENJADI PROTECTED VISUAL BENCHMARK
GEMINI TELAH MEMPERBAIKI PROCESS RAIL VERTIKAL SANGAT RAPI (01–09 CONNECTOR), TITLE WHITESPACE, DAN TEST SUITE (>158 TEST LULUS)
GEMINI TIDAK BOLEH COMMIT, PUSH, MERGE, REBASE, RESET, STASH, ATAU MEMBUAT BRANCH
```

Pemilik RKK menyetujui PLAN-008D pada 29 Juli 2026.

PLAN-008D merupakan tahap lanjutan setelah PLAN-008C selesai dan terverifikasi.

PLAN-008C telah menjadikan Beranda sebagai benchmark visual website publik RKK melalui foto ilustrasi responsif, editorial structured list, ikon semantik, timeline visual, publication hold-state, editorial split, CTA penutup, scoped CSS, asset register, dan 121 test yang lulus.

PLAN-008D tidak membongkar ulang Beranda. PLAN-008D menggunakan Beranda sebagai acuan untuk menyelaraskan seluruh halaman publik lain agar terasa sebagai satu keluarga visual yang profesional, matang, hidup, terstruktur, dan tetap jujur terhadap status bisnis serta publikasi RKK.

---

## 2. Keputusan Pemilik yang Menjadi Dasar

1. Beranda hasil PLAN-008C dinilai sudah baik.
2. Kekurangan Beranda yang tersisa bersifat kecil dan tidak memerlukan redesign baru.
3. PLAN-008D digunakan untuk seluruh halaman publik selain Beranda.
4. Visual halaman lain harus mengikuti kualitas dan bahasa visual Beranda.
5. Konten yang sudah disetujui tetap dipertahankan.
6. Struktur data yang sudah stabil tidak perlu dibongkar.
7. Gambar digunakan hanya pada halaman yang benar-benar membutuhkan konteks visual.
8. Foto stok tidak boleh digunakan sebagai proyek, layanan aktif, tim resmi, pelanggan, atau bukti pekerjaan RKK.
9. Ikon, diagram, dan ilustrasi state lebih tepat untuk halaman proses, publication gate, empty state, unavailable state, dan 404.
10. Pekerjaan dilaksanakan dalam satu plan lintas halaman, bukan plan terpisah untuk setiap route.
11. Audit dan laporan tetap dilakukan per route.
12. Beranda hanya boleh mendapat koreksi kecil lintas halaman apabila diperlukan untuk konsistensi shell, shared component, atau responsive behavior.

---

## 3. Tujuan PLAN-008D

PLAN-008D bertujuan:

1. menyelaraskan seluruh halaman publik dengan benchmark Beranda;
2. membuat setiap halaman lebih menarik dan profesional;
3. mempertahankan fungsi unik setiap halaman;
4. menghindari penyalinan layout Beranda secara mentah;
5. memperbaiki hierarchy visual, section rhythm, whitespace, hero, CTA, dan navigation cues;
6. mengurangi pola heading + grid kartu yang berulang;
7. menambahkan ikon semantik, diagram, atau visual process bila relevan;
8. menambahkan foto ilustrasi secara terbatas;
9. menambahkan ilustrasi state untuk halaman tanpa data publik;
10. memperbaiki empty state, unavailable state, sign-in unavailable, dan 404;
11. menjaga aksesibilitas, performa, serta responsive behavior;
12. menjaga seluruh publication gate dan content map sebagai source of truth;
13. tidak menambahkan klaim bisnis atau mengaktifkan transaksi;
14. menghasilkan perubahan yang jelas terlihat oleh manusia;
15. menghasilkan satu visual system lintas halaman tanpa membuat semua halaman terlihat sama.

---

## 4. Definisi Harmonisasi

Harmonisasi berarti menyamakan bahasa visual, bukan menyamakan semua komposisi.

Yang diselaraskan:

```text
typography hierarchy
section spacing
surface
border
radius
shadow minimum
foto treatment
icon style
illustration style
CTA treatment
hold-state treatment
empty-state treatment
responsive behavior
focus state
content measure
visual rhythm
brand tone
```

Yang tetap berbeda menurut fungsi halaman:

```text
hero composition
jenis visual utama
jumlah section
timeline/process representation
publication gate
empty state
detail template
CTA hierarchy
content density
```

PLAN-008D dilarang menghasilkan semua halaman dengan pola identik:

```text
hero
heading
empat kartu
heading
empat kartu
CTA
```

---

## 5. Sumber Kebenaran

### 5.1 Urutan Sumber

1. keputusan aktif Pemilik RKK;
2. sumber bisnis R01 yang telah disetujui;
3. sumber produk dan website publik R02;
4. dokumen P07 dan P07.1;
5. paket spesifikasi per halaman;
6. PLAN-003 sampai PLAN-007;
7. PLAN-008, PLAN-008A, PLAN-008B, dan PLAN-008C;
8. repository pada baseline final;
9. asset eksternal yang telah diperiksa lisensinya;
10. legacy hanya sebagai pembanding.

### 5.2 Dokumen Global Wajib

```text
[P07-F00] — PANDUAN DAN ARSITEKTUR UI UX DAN DESIGN SYSTEM RKK
[P07-F02] — PRINSIP PENGALAMAN DAN ARAH VISUAL PRODUK RKK
[P07-F03] — DESIGN TOKEN DAN FONDASI VISUAL RKK
[P07-F04] — KATALOG KOMPONEN UI RKK
[P07-F05] — POLA INTERAKSI DAN KEADAAN PRODUK RKK
[P07-F06] — RESPONSIF AKSESIBILITAS DAN CONTENT DESIGN RKK
[P07.1-F00] — PANDUAN DAN PETA KERJA UI UX WEBSITE PUBLIK RKK
[P07.1-F03] — SISTEM UI SHELL WEBSITE PUBLIK RKK
[P07.1-F04] — BLUEPRINT DAN SPESIFIKASI UI HALAMAN WEBSITE PUBLIK RKK
[P07.1-F05] — STATUS KESIAPAN DAN HANDOFF WEBSITE PUBLIK RKK
```

### 5.3 Paket Halaman Wajib

#### Tentang

```text
[ABT-01] — SPESIFIKASI HALAMAN TENTANG RKK
[ABT-02] — PEMETAAN DATA DAN KONTEN TENTANG RKK
[ABT-03] — DAFTAR REFERENSI HALAMAN TENTANG RKK
[ABT-04] — WIREFRAME HALAMAN TENTANG RKK
[ABT-05] — SPESIFIKASI KOMPONEN UI TENTANG RKK
```

#### Cara Kerja

```text
[WRK-01] — SPESIFIKASI HALAMAN CARA KERJA RKK
[WRK-02] — PEMETAAN DATA DAN KONTEN CARA KERJA RKK
[WRK-03] — DAFTAR REFERENSI HALAMAN CARA KERJA RKK
[WRK-04] — WIREFRAME HALAMAN CARA KERJA RKK
[WRK-05] — SPESIFIKASI KOMPONEN UI CARA KERJA RKK
```

#### Layanan

```text
[SRV-01] — SPESIFIKASI HALAMAN DAFTAR LAYANAN RKK
[SRV-02] — PEMETAAN DATA DAN KONTEN DAFTAR LAYANAN RKK
[SRV-03] — DAFTAR REFERENSI HALAMAN DAFTAR LAYANAN RKK
[SRV-04] — WIREFRAME HALAMAN DAFTAR LAYANAN RKK
[SRV-05] — SPESIFIKASI KOMPONEN UI DAFTAR LAYANAN RKK
```

#### Daftar Proyek

```text
[PRY-01] — SPESIFIKASI HALAMAN DAFTAR PROYEK PUBLIK RKK
[PRY-02] — PEMETAAN DATA DAN KONTEN DAFTAR PROYEK PUBLIK RKK
[PRY-03] — DAFTAR REFERENSI HALAMAN DAFTAR PROYEK PUBLIK RKK
[PRY-04] — WIREFRAME HALAMAN DAFTAR PROYEK PUBLIK RKK
[PRY-05] — SPESIFIKASI KOMPONEN UI DAFTAR PROYEK PUBLIK RKK
```

#### Detail Proyek

```text
[PDT-01] — SPESIFIKASI HALAMAN DETAIL PROYEK PUBLIK RKK
[PDT-02] — PEMETAAN DATA DAN KONTEN DETAIL PROYEK PUBLIK RKK
[PDT-03] — DAFTAR REFERENSI HALAMAN DETAIL PROYEK PUBLIK RKK
[PDT-04] — WIREFRAME HALAMAN DETAIL PROYEK PUBLIK RKK
[PDT-05] — SPESIFIKASI KOMPONEN UI DETAIL PROYEK PUBLIK RKK
```

### 5.4 Repository Wajib

```text
docs/plan/PLAN-003*
docs/plan/PLAN-004*
docs/plan/PLAN-005*
docs/plan/PLAN-006*
docs/plan/PLAN-007*
docs/plan/PLAN-008*
apps/web/src/pages/AboutPage.jsx
apps/web/src/pages/WorkProcessPage.jsx
apps/web/src/pages/ServiceListPage.jsx
apps/web/src/pages/ProjectListPage.jsx
apps/web/src/pages/ProjectDetailPage.jsx
apps/web/src/pages/UnavailablePage.jsx
apps/web/src/pages/NotFoundPage.jsx
apps/web/src/content/**
apps/web/src/sections/about/**
apps/web/src/sections/work-process/**
apps/web/src/sections/services/**
apps/web/src/sections/projects/**
apps/web/src/sections/project-detail/**
apps/web/src/components/public/**
apps/web/src/components/icons/PublicIcon.jsx
apps/web/src/styles/about.css
apps/web/src/styles/work-process.css
apps/web/src/styles/services.css
apps/web/src/styles/projects.css
apps/web/src/styles/components.css
apps/web/src/styles/shell.css
apps/web/src/styles/tokens.css
apps/web/src/styles/home.css
apps/web/src/test/**
```

Nama path yang berbeda harus ditentukan melalui audit repository aktual, bukan diasumsikan.

---

## 6. Baseline dan Benchmark

### 6.1 Baseline

```text
8dc6298763e415c5ea13170f7a4ed722358d28eb
```

Baseline tersebut mencakup PLAN-008C selesai dan terverifikasi, Beranda sebagai benchmark visual, dokumentasi PLAN-008 sinkron, serta PLAN-008D menunggu penyusunan dan persetujuan.

### 6.2 Benchmark Visual Beranda

1. image-led hero;
2. foto disimpan lokal;
3. responsive image;
4. label foto ilustrasi;
5. overlay informasi terkontrol;
6. editorial structured list;
7. ikon semantik lokal;
8. timeline visual;
9. publication hold-state;
10. editorial split;
11. CTA penutup;
12. CSS ter-scope;
13. spacing dan surface canonical;
14. mobile copy-first;
15. konten tetap menjadi fokus;
16. tidak ada klaim proyek atau layanan palsu.

### 6.3 Protected Benchmark

Beranda route `/` tidak boleh dirombak.

Koreksi kecil diperbolehkan hanya untuk:

- shared icon;
- shared illustration component;
- shared CTA contrast;
- shell;
- responsive bug;
- accessibility bug;
- selector collision;
- consistency lintas halaman.

Setiap perubahan Beranda wajib dilaporkan terpisah dan dibuktikan tidak mengubah hasil PLAN-008C secara material.

---

## 7. Route Scope

### Dalam scope

```text
/tentang
/cara-kerja
/layanan
/proyek
/proyek/:slug
/sign-in
/*
```

### Di luar scope

```text
/
backend routes
API
admin
portal
auth aktif
legacy client
internal dashboard
service detail yang belum aktif
consultation flow
transaction form
```

Beranda tetap masuk smoke test dan regression audit, tetapi bukan target redesign.

---

## 8. Matriks Kebutuhan Visual

| Route | Foto | Ilustrasi | Ikon | Diagram | Fokus |
|---|---:|---:|---:|---:|---|
| `/tentang` | 1 wajib + 1 opsional | opsional | wajib | opsional | positioning dan identitas |
| `/cara-kerja` | 0–1 opsional | opsional | wajib | wajib | sembilan fase proses |
| `/layanan` | tidak disarankan | wajib | wajib | opsional | publication gate |
| `/proyek` | dilarang sebagai proyek | wajib | wajib | tidak | empty catalog |
| `/proyek/:slug` current-unavailable | dilarang sebagai galeri | keluarga ilustrasi proyek | wajib | tidak | unavailable detail |
| `/sign-in` | tidak | wajib ringan | wajib | tidak | portal unavailable |
| `404` | tidak | wajib ringan | wajib | tidak | navigasi kembali |
| Header/Footer | tidak | tidak | opsional | tidak | shell consistency |

### Batas asset

```text
foto minimum: 1
foto recommended: 2
foto maksimum: 3

ilustrasi state recommended: 3
ilustrasi state maksimum: 4
```

---

## 9. Strategi Asset

### 9.1 Fotografi

Sumber prioritas:

1. Pexels;
2. Unsplash non-Plus sebagai fallback;
3. Pixabay sebagai fallback terbatas.

Aturan:

1. buka halaman aset asli;
2. buka halaman lisensi resmi;
3. jangan memakai thumbnail search engine;
4. jangan hotlink;
5. simpan lokal;
6. catat creator dan source page;
7. catat tanggal pemeriksaan;
8. catat model/property/trademark risk;
9. jangan menyiratkan endorsement;
10. jangan menyebut foto sebagai tim atau proyek RKK;
11. jangan memakai foto dengan logo dominan;
12. jangan memakai rumah supermewah yang menyesatkan positioning;
13. jangan memakai foto pekerja dalam situasi keselamatan buruk;
14. jangan memakai gambar generatif seperti proyek nyata tanpa label jelas;
15. jangan memakai aset Getty, iStock, Pinterest, blog, agregator, atau watermark.

Pexels menjadi sumber utama karena lisensi resminya memperbolehkan penggunaan pada website dan proyek komersial. Hak atas orang, merek, logo, bangunan, atau objek yang tergambar tetap harus diperiksa.

Unsplash digunakan dengan kehati-hatian lebih tinggi terhadap privasi, publisitas, properti, merek, dan objek yang terlihat.

Pixabay hanya digunakan setelah dipastikan tidak ada merek atau logo yang menimbulkan pembatasan komersial.

### 9.1.1 Shortlist Fotografi Resmi untuk Audit Implementasi

Gemini tidak boleh mengambil gambar secara acak dari thumbnail mesin pencari, situs agregator, Pinterest, Getty Images, iStock, blog, atau sumber yang tidak menyediakan halaman aset dan lisensi resmi.

#### Tentang — Kandidat Hero

**ABT-H1 — prioritas awal**

```text
Platform    : Pexels
Judul       : Architects Looking at Blueprint
Creator     : Gustavo Fring
Source page : https://www.pexels.com/photo/architects-looking-at-blueprint-6285152/
Status awal : Free to use — wajib cek ulang halaman aset, Pexels License, dan Terms pada hari download
Kelebihan   : kolaborasi profesional dan blueprint terlihat jelas; cukup netral untuk halaman Tentang
Risiko      : wajah dan hard hat terlihat; wajib label foto ilustrasi dan pemeriksaan logo/merek
```

**ABT-H2**

```text
Platform    : Pexels
Judul       : Construction Workers Looking at Papers while Standing in a Wooden House
Creator     : Mikael Blomkvist
Source page : https://www.pexels.com/photo/construction-workers-looking-at-papers-while-standing-in-a-wooden-house-8961297/
Status awal : Free to use — wajib cek ulang halaman aset, Pexels License, dan Terms pada hari download
Kelebihan   : konteks hunian dan perencanaan konstruksi terasa kuat
Risiko      : harus dipastikan tidak tampak sebagai proyek atau tim RKK
```

**ABT-H3**

```text
Platform    : Pexels
Judul       : Man and Women Looking at House Plan
Creator     : Thirdman
Source page : https://www.pexels.com/photo/man-and-women-looking-at-house-plan-8469986/
Status awal : Free to use — wajib cek ulang halaman aset, Pexels License, dan Terms pada hari download
Kelebihan   : terang, profesional, dan mudah dipahami sebagai kolaborasi perencanaan
Risiko      : komposisi tim dapat terasa seperti foto korporat generik; crop harus diuji
```

#### Tentang — Kandidat Foto Pendukung

**ABT-S1 — prioritas awal**

```text
Platform    : Pexels
Judul       : Architect Hands Reviewing Architectural Blueprints and Design Documents
Creator     : Tima Miroshnichenko
Source page : https://www.pexels.com/photo/person-people-building-construction-6615095/
Status awal : Free to use — wajib cek ulang halaman aset, Pexels License, dan Terms pada hari download
Kelebihan   : fokus pada tangan dan dokumen; risiko endorsement lebih rendah
Risiko      : periksa logo pada alat, laptop, atau dokumen
```

**ABT-S2**

```text
Platform    : Pexels
Judul       : Top View of Architectural Blueprints and Drafting Tools
Creator     : Tima Miroshnichenko
Source page : https://www.pexels.com/photo/person-people-creative-building-6615239/
Status awal : Free to use — wajib cek ulang halaman aset, Pexels License, dan Terms pada hari download
Kelebihan   : faceless, netral, editorial, dan mudah di-crop
Risiko      : hanya cocok sebagai foto pendukung, bukan hero utama
```

#### Cara Kerja — Kandidat Opsional

Default PLAN-008D adalah **Cara Kerja tanpa fotografi**. Ikon, grouping fase, connector, gate, dan diagram menjadi visual utama.

Foto hanya dipakai apabila audit menunjukkan hero atau salah satu pemisah section benar-benar membutuhkan visual fotografi.

**WRK-O1**

```text
Platform    : Pexels
Judul       : Planning over Blueprints
Creator     : Angie Reyes
Source page : https://www.pexels.com/photo/planning-over-blueprints-465118/
Status awal : Free to use — wajib cek ulang halaman aset, Pexels License, dan Terms pada hari download
Kelebihan   : close-up kolaborasi dan blueprint; cocok sebagai supporting visual
Risiko      : jangan digunakan apabila timeline dan diagram sudah cukup kuat
```

**WRK-O2**

```text
Platform    : Pexels
Judul       : Construction Worker Explaining Blueprints
Creator     : Gustavo Fring
Source page : https://www.pexels.com/photo/construction-worker-explaining-blueprints-6285151/
Status awal : Free to use — wajib cek ulang halaman aset, Pexels License, dan Terms pada hari download
Kelebihan   : perencanaan dan penjelasan proses terlihat
Risiko      : layar, wajah, logo, dan kesan endorsement wajib diperiksa
```

#### Keputusan Pemilihan Aset

1. audit dimulai dari ABT-H1 dan ABT-S1;
2. pilih satu foto hero Tentang;
3. foto pendukung Tentang hanya dipakai jika benar-benar memperbaiki section rhythm;
4. Cara Kerja default tanpa foto;
5. WRK-O1 atau WRK-O2 hanya boleh dipakai setelah alasan visual dicatat;
6. maksimal tiga foto eksternal untuk seluruh PLAN-008D;
7. jangan menggunakan ulang dua foto aktif pada Beranda;
8. kandidat di luar shortlist memerlukan alasan tertulis dan pemeriksaan lisensi setara;
9. download harus melalui halaman/aset resmi Pexels;
10. catat creator, source page, tanggal pemeriksaan, risiko orang/properti/merek, alt, caption, crop, dimensi, dan ukuran file;
11. foto wajib diberi konteks sebagai ilustrasi, bukan bukti proyek, layanan, tim, kantor, atau pelanggan RKK;
12. Pexels License dan Pexels Terms wajib diperiksa kembali pada hari download.

Halaman lisensi resmi:

```text
https://www.pexels.com/legal-pages/license/
https://www.pexels.com/terms-of-service/
```

### 9.2 Ilustrasi State

Default:

```text
SVG lokal buatan proyek
tanpa dependency
tanpa remote runtime
tanpa klaim realistis
```

Gaya:

```text
line illustration
geometric
minimal
single-family stroke
brand + neutral
tidak kartun berlebihan
tidak 3D glossy
tidak seperti marketplace
```

Ilustrasi lokal diprioritaskan untuk:

- publication gate;
- empty projects;
- unavailable project detail;
- sign-in unavailable;
- 404.

### 9.3 Icon Set

Gunakan dan perluas:

```text
apps/web/src/components/icons/PublicIcon.jsx
```

Aturan:

- SVG lokal;
- currentColor;
- stroke konsisten;
- ukuran 16/20/24/32;
- semantic iconKey;
- dekoratif `aria-hidden`;
- no emoji;
- no remote icon;
- no icon dependency.

Kandidat icon:

```text
building
users
target
layers
compass
search-check
clipboard-list
shield-check
file-check
refresh-cw
construction
folder
folder-open
image-off
lock
route
map-pin
arrow-left
home
alert-circle
info
```

---

## 10. Asset Register

Buat:

```text
docs/assets/PUBLIC_VISUAL_ASSET_REGISTER.md
```

Register ini tidak menggantikan `HOME_VISUAL_ASSET_REGISTER.md`.

Setiap asset eksternal mencatat:

```text
asset_id
filename
asset_type
platform
creator
source_page
original_asset_url
download_date
license_checked_date
license_name
commercial_use_status
attribution_requirement
recognisable_people
recognisable_property
visible_trademark
intended_route
intended_section
alt_text
crop_focal_point
file_dimensions
file_size
notes
```

Asset lokal original SVG mencatat:

```text
asset_id
filename
asset_type
origin: local-original
creator: RKK project
intended_route
intended_state
accessibility_role
notes
```

---

## 11. Penyimpanan Asset

Kandidat:

```text
apps/web/src/assets/images/about/
apps/web/src/assets/images/work-process/
apps/web/src/assets/illustrations/public-states/
```

Foto Tentang:

```text
about-hero-planning-640.webp
about-hero-planning-960.webp
about-hero-planning-1440.webp
about-detail-documentation-640.webp
about-detail-documentation-960.webp
```

Foto Cara Kerja opsional:

```text
work-process-planning-640.webp
work-process-planning-960.webp
```

Ilustrasi:

```text
service-publication-gate.svg
project-empty-state.svg
portal-unavailable.svg
not-found-route.svg
```

Project detail current-unavailable boleh memakai `project-empty-state.svg` dengan komposisi berbeda tanpa membuat foto baru.

---

## 12. Performance Asset

Foto hero:

- WebP;
- responsive `srcSet`;
- `sizes`;
- width/height;
- `fetchPriority="high"` hanya jika LCP;
- `loading="eager"` hanya hero;
- `decoding="async"`;
- target 1440 px <= 300 KB;
- target 960 px <= 180 KB;
- target 640 px <= 100 KB.

Foto pendukung:

- WebP;
- `loading="lazy"`;
- `decoding="async"`;
- target 960 px <= 180 KB;
- target 640 px <= 100 KB.

SVG:

- tanpa metadata editor berlebihan;
- tanpa embedded raster;
- tanpa external resource;
- viewBox eksplisit;
- ukuran file wajar.

---

## 13. Target Visual Global

Karakter:

```text
MODERN
PROFESIONAL
EDITORIAL
TERSTRUKTUR
BERSIH
TENANG
MANUSIAWI
TEKNIS SECARA TERKENDALI
DAPAT DIPERCAYA
SATU KELUARGA DENGAN BERANDA
```

Bukan:

```text
TEMPLATE KONSTRUKSI GENERIK
MARKETPLACE
DASHBOARD
FOTO STOK BERLEBIHAN
KARTU BERULANG
GRADIENT BERAT
SHADOW BERAT
ILUSTRASI KARTUN
ANIMASI BERLEBIHAN
PROYEK PALSU
LAYANAN PALSU
```

Prinsip:

1. satu visual anchor utama per section;
2. tidak lebih dari dua section berurutan dengan pola kartu seragam;
3. hero tidak harus selalu split 50:50;
4. copy tetap mudah dibaca;
5. satu primary action per area;
6. secondary navigation jelas;
7. background section mempunyai ritme;
8. icon mendukung makna;
9. foto tidak menjadi bukti;
10. empty state dirancang;
11. mobile disusun ulang;
12. Beranda tetap menjadi acuan.

---

## 14. Halaman Tentang — `/tentang`

### 14.1 Fakta dan Batas

Tanpa sumber aktif, halaman tidak boleh menampilkan:

- sejarah;
- tahun berdiri;
- badan usaha;
- nomor legalitas;
- alamat;
- wilayah;
- kontak;
- sertifikasi;
- struktur tim;
- kapasitas;
- klien;
- proyek;
- testimoni;
- statistik.

Foto tidak boleh dilabeli sebagai Tim RKK, Kantor RKK, Proyek RKK, atau Klien RKK.

### 14.2 Komposisi Rekomendasi

```text
About Hero
Editorial Identity / Positioning
System or Approach Visual
Value Principles
Boundary / What RKK Is Not
Closing CTA
```

Hero:

- 1 foto ilustrasi wajib;
- label foto ilustrasi;
- H1 terkontrol;
- CTA menuju Cara Kerja;
- tidak mengklaim orang pada foto sebagai tim RKK.

Tema foto:

- diskusi perencanaan rumah;
- arsitek meninjau blueprint;
- koordinasi konstruksi aman;
- meja perencanaan dengan manusia terbatas.

Identity/Positioning:

- editorial split;
- structured facts;
- icon-led points;
- divider;
- line/diagram sederhana;
- hindari kartu identik.

Values:

- ikon semantik berbeda;
- tidak clickable jika tidak ada tindakan.

Boundary:

- icon;
- title;
- copy;
- tidak terasa defensif;
- tidak terasa sebagai error;
- menjelaskan batas klaim.

Foto pendukung opsional:

- blueprint;
- dokumentasi;
- alat perencanaan;
- faceless preferred.

---

## 15. Halaman Cara Kerja — `/cara-kerja`

### 15.1 Fakta dan Batas

Halaman menjelaskan sembilan fase tingkat tinggi.

Halaman bukan SOP, kontrak, jadwal, daftar harga, janji penerimaan proyek, atau bukti bahwa semua fase telah terdigitalisasi.

### 15.2 Komposisi Rekomendasi

```text
Work Hero
Four Reading Principles
Nine-Phase Process
Decision Gates
Cross-Phase Controls
Change / Issue Handling
Boundary Notice
Closing CTA
```

Hero:

1. icon-led hero tanpa foto; atau
2. hero dengan diagram proses abstrak; atau
3. satu foto ilustrasi perencanaan sebagai secondary visual.

Foto tidak wajib.

Four Reading Principles:

- empat ikon semantik;
- horizontal editorial band, 2x2 principle grid, atau structured rows;
- hindari empat kartu generik bila terlalu berulang.

Nine-Phase Process:

- visual anchor utama;
- nomor;
- ikon;
- title;
- ringkasan;
- keputusan/output;
- connector;
- mobile vertical;
- desktop tidak memaksakan sembilan kolom.

Grouping kandidat:

```text
Orientasi dan Kesiapan
Perencanaan dan Persetujuan
Pelaksanaan dan Pengendalian
Penutupan dan Pembelajaran
```

Decision Gate:

- visual checkpoint;
- tidak menunjukkan status real-time.

Cross-Phase Control:

- line diagram;
- icon rows;
- central axis;
- tidak menyerupai dashboard.

---

## 16. Halaman Layanan — `/layanan`

### 16.1 Invariant

```text
published service = 0
active service card = 0
transaction CTA = 0
```

Keberadaan layanan pada dokumen bisnis, database, route, atau kode tidak otomatis mengizinkan publikasi.

### 16.2 Komposisi Rekomendasi

```text
Service Hero
Publication Gate Illustration
Readiness Principles
What Users Can Learn Now
Boundary Notice
Closing Navigation
```

Hero:

- tanpa foto layanan;
- icon-led;
- subtle illustration;
- publication status chip.

Publication Gate:

```text
service-publication-gate.svg
```

Makna:

- katalog;
- verification;
- lock/gate;
- documentation.

Bukan:

- worker photo;
- house project image;
- price card;
- kartu layanan aktif.

Current state harus:

- tenang;
- jelas;
- bukan error;
- bukan “segera hadir”;
- tidak memberi janji waktu;
- tidak memancing transaksi.

CTA aktif:

- Pelajari Cara Kerja;
- Tentang RKK;
- navigasi informasi sesuai content map.

CTA transaksi tetap tidak aktif.

---

## 17. Halaman Daftar Proyek — `/proyek`

### 17.1 Invariant

```text
projectCatalog = []
published project = 0
project card = 0
```

Data internal, arsip, seed, legacy, dan proyek acuan bukan portofolio publik.

### 17.2 Larangan

Dilarang:

- foto rumah stok sebagai kartu proyek;
- foto konstruksi stok sebagai portofolio;
- galeri contoh seperti hasil RKK;
- caption proyek simulasi;
- lokasi palsu;
- statistik proyek.

### 17.3 Komposisi Rekomendasi

```text
Projects Hero
Project Publication Standard
Designed Empty State
Future Catalog Structure Preview secara abstrak
Closing Navigation
```

Hero:

- icon folder/documentation;
- line illustration;
- tanpa fotografi.

Empty state:

```text
project-empty-state.svg
```

Ilustrasi dapat memakai folder, image placeholder abstrak, checklist, document layers, atau house outline generik.

Publication standard:

- izin;
- data;
- media;
- status;
- anonimisasi;
- sumber;
- tanggal.

Future catalog preview:

- skeleton/abstract card structure;
- jelas bukan proyek nyata;
- tanpa judul, lokasi, foto, atau angka palsu.

---

## 18. Halaman Detail Proyek — `/proyek/:slug`

Hanya proyek published yang boleh dirender.

Slug tidak valid, tidak published, atau tidak ditemukan tetap menghasilkan state aman.

Current-unavailable state:

- keluarga visual yang sama dengan Daftar Proyek;
- illustration;
- icon;
- title;
- reason aman;
- kembali ke `/proyek`;
- secondary navigation;
- no galeri;
- no detail palsu.

Template future-ready boleh dipoles tanpa mengisi data baru:

- hero detail;
- fact grid;
- gallery shell;
- caption;
- publication metadata;
- related navigation;
- closing CTA.

Dilarang:

- membuat contoh proyek;
- mengisi dummy;
- merender unpublished data;
- mengambil foto stok;
- mengendurkan resolver;
- mengubah noindex policy;
- mengubah media security.

---

## 19. Sign-in Unavailable — `/sign-in`

Gunakan:

```text
portal-unavailable.svg
```

atau icon-led panel.

Komposisi:

- status;
- title;
- explanation;
- primary navigation kembali ke Beranda;
- secondary link ke Cara Kerja atau Tentang;
- lock/portal icon;
- subtle brand surface.

Dilarang:

- form palsu;
- input email/password;
- social login;
- forgot password;
- CTA daftar;
- countdown;
- janji waktu aktif.

---

## 20. Halaman 404 — `*`

Gunakan:

```text
not-found-route.svg
```

Tema:

- route/path;
- house outline;
- map pin;
- direction arrow;
- tanpa karakter kartun.

Komposisi:

- 404 marker;
- title;
- penjelasan;
- kembali Beranda;
- link halaman utama.

Tidak perlu foto.

---

## 21. Header dan Footer

Boleh dipoles:

- active state;
- spacing;
- alignment;
- divider;
- hover;
- focus;
- mobile drawer rhythm;
- footer grouping;
- current-page recognition.

Dilarang:

- menambah menu;
- mengubah urutan route tanpa keputusan Pemilik;
- mega menu;
- CTA transaksi;
- logo baru;
- auth aktif;
- mengganti architecture shell besar.

Perubahan shell wajib diuji pada Beranda dan seluruh route.

---

## 22. Shared Component Candidate

Kandidat:

```text
PublicPageHero
VisualMedia
IllustratedState
PublicIconFeature
EditorialList
ProcessTimeline
BoundaryNotice
ClosingNavigation
```

Kriteria shared:

1. digunakan minimal dua route;
2. semantic sama;
3. API sederhana;
4. tidak memaksa komposisi identik;
5. tidak memindahkan page-specific CSS ke shared tanpa alasan;
6. mempunyai accessibility contract;
7. mempunyai test.

---

## 23. CSS Ownership

```text
about.css        = visual khusus Tentang
work-process.css = visual khusus Cara Kerja
services.css     = visual khusus Layanan
projects.css     = visual Daftar dan Detail Proyek
components.css   = shared primitive
shell.css        = header/footer/layout
tokens.css       = token
home.css         = Beranda protected benchmark
```

Aturan:

1. tambah root scope per page;
2. gunakan prefix page;
3. jangan membuat selector global generik;
4. jangan menimpa class shared;
5. jangan memakai `!important`;
6. jangan memakai inline style;
7. jangan membuat palette baru;
8. jangan membuat random spacing;
9. hapus CSS lama hanya setelah usage audit;
10. compatibility layer yang diperlukan route lain tidak boleh dihapus;
11. perubahan home.css hanya jika dibuktikan perlu.

Root kandidat:

```text
.about-page
.work-process-page
.services-page
.projects-page
.project-detail-page
.unavailable-page
.not-found-page
```

---

## 24. Content dan Data Invariant

Wajib tetap:

- content map sebagai source of truth;
- copy bisnis tidak ditulis ulang di JSX;
- route tetap;
- metadata tetap sesuai sumber;
- publication gate tetap;
- hold reason tetap;
- no unpublished data;
- no dummy;
- no seed;
- no legacy content;
- no service card aktif;
- no project card aktif;
- no project gallery aktif;
- no transaction CTA;
- no sign-in form;
- no invented contact;
- no invented company facts.

Metadata visual yang boleh ditambah:

```text
iconKey
visualVariant
illustrationKey
image
imageAlt
imageCaption
imageFocalPoint
```

---

## 25. Accessibility

1. satu H1 per halaman;
2. hierarchy H2/H3 konsisten;
3. no heading jump;
4. alt text sesuai fungsi;
5. photo illustration caption bila diperlukan;
6. decorative SVG `aria-hidden`;
7. informative illustration mempunyai accessible name atau adjacent text;
8. focus visible;
9. keyboard navigation;
10. contrast AA;
11. target touch minimum;
12. reduced motion;
13. no text over image tanpa contrast;
14. no layout shift;
15. no state conveyed by color only;
16. active nav memakai `aria-current`;
17. unavailable/empty state memakai semantic heading;
18. links dan button tetap semantik.

---

## 26. Responsive

Viewport:

```text
360
390
768
1024
1366
1440
```

Mobile:

- copy-first;
- visual tidak mendominasi viewport;
- CTA stack;
- timeline vertical;
- no horizontal scroll;
- illustration tidak terlalu kecil;
- empty state ringkas;
- header drawer aman;
- content measure nyaman;
- list/grid satu kolom bila perlu;
- section padding tidak berlebihan.

Tablet:

- split layout diuji;
- grid tidak terlalu sempit;
- timeline grouped;
- photo crop aman;
- state panel tidak terlalu lebar.

Desktop:

- max width;
- section rhythm;
- visual balance;
- tidak terlalu banyak empty space;
- tidak terlalu banyak card grid;
- heading measure;
- CTA alignment;
- shell consistency.

---

## 27. Motion

Default:

```text
tidak ada animasi besar
```

Boleh:

- subtle hover;
- transition color/border;
- icon emphasis ringan.

Dilarang:

- scroll animation kompleks;
- parallax;
- auto carousel;
- looping illustration;
- progress animation palsu;
- entrance animation yang mengganggu.

`prefers-reduced-motion` wajib dihormati.

---

## 28. No New Dependency

```text
dependency baru: tidak ada
```

Gunakan CSS, React existing, SVG lokal, WebP, PublicIcon, dan shared component existing.

Dependency baru memerlukan revisi plan dan persetujuan Pemilik.

---

## 29. Tahapan Implementasi

### Tahap 1 — Audit Baseline

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git remote -v
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
```

Expected:

```text
branch: main
HEAD: 8dc6298763e415c5ea13170f7a4ed722358d28eb
working tree: clean kecuali PLAN-008D final
lint: 0 warning/error
test: minimal 121 lulus
build: lulus
diff: bersih
```

### Tahap 2 — Visual Audit Semua Route

Screenshot sebelum:

```text
/tentang
/cara-kerja
/layanan
/proyek
/proyek/contoh-tidak-valid
/sign-in
/route-tidak-dikenal
/
```

Viewport:

```text
390
768
1366
```

### Tahap 3 — Asset Discovery dan Illustration System

1. shortlist foto Tentang;
2. pilih 1 hero;
3. pilih maksimal 1 pendukung;
4. putuskan foto Cara Kerja dibutuhkan atau tidak;
5. cek lisensi;
6. buat asset register;
7. download resmi;
8. optimize;
9. buat local SVG state;
10. buat icon mapping.

### Tahap 4 — Harmonisasi Tentang

1. hero;
2. positioning;
3. identity/system visual;
4. values;
5. boundaries;
6. closing CTA;
7. responsive;
8. test.

### Tahap 5 — Harmonisasi Cara Kerja

1. hero;
2. reading principles;
3. nine-phase process;
4. decision gate;
5. cross-phase controls;
6. boundary;
7. closing CTA;
8. responsive;
9. test.

### Tahap 6 — Harmonisasi Layanan

1. hero;
2. publication gate illustration;
3. readiness principles;
4. current-empty state;
5. boundary;
6. closing navigation;
7. responsive;
8. test.

### Tahap 7 — Harmonisasi Proyek dan Detail Proyek

1. list hero;
2. publication standard;
3. empty state;
4. current-unavailable detail;
5. future-ready template polish;
6. security/publication regression;
7. responsive;
8. test.

### Tahap 8 — Harmonisasi Public States

1. sign-in unavailable;
2. 404;
3. shared illustrated state;
4. navigation;
5. responsive;
6. accessibility;
7. test.

### Tahap 9 — Shell dan Cross-Route Audit

1. header;
2. footer;
3. active state;
4. mobile drawer;
5. focus;
6. Beranda regression;
7. route smoke test;
8. bundle and asset audit.

---

## 30. Visual Change Requirement

PLAN-008D dianggap berhasil apabila:

1. semua route mempunyai hero yang lebih matang;
2. Tentang mempunyai foto ilustrasi;
3. Cara Kerja mempunyai sembilan fase yang lebih mudah dipahami;
4. Layanan mempunyai publication gate illustration;
5. Proyek mempunyai designed empty state;
6. Detail Proyek unavailable mempunyai state visual konsisten;
7. Sign-in unavailable tidak terlihat seperti placeholder;
8. 404 mempunyai visual dan navigasi jelas;
9. ikon lintas halaman konsisten;
10. section rhythm berbeda sesuai fungsi;
11. tidak ada foto stok sebagai proyek atau layanan;
12. tidak ada lebih dari dua section berurutan dengan grid kartu generik;
13. desktop dan mobile terlihat profesional;
14. seluruh halaman terasa satu keluarga dengan Beranda;
15. Beranda tidak mengalami regresi.

---

## 31. Test Requirements

Test count tidak boleh turun dari 121.

Global:

- root class setiap page;
- satu H1;
- no inline style;
- no remote asset;
- icon accessibility;
- publication invariants;
- no transaction CTA;
- no dummy content;
- shell active state;
- Beranda regression.

Tentang:

- hero photo local;
- `srcSet`;
- caption illustration;
- no team/project claim;
- boundary copy tetap;
- CTA route tetap.

Cara Kerja:

- sembilan fase tetap;
- icon mapping;
- phase grouping;
- no SOP detail;
- no active transaction;
- timeline semantic order.

Layanan:

- published service tetap 0;
- no service cards;
- publication gate state;
- no “segera”;
- illustration local;
- content map rendered.

Proyek:

- catalog tetap kosong;
- no stock project image;
- empty state local illustration;
- no project card;
- publication standard rendered.

Detail Proyek:

- unpublished slug unavailable;
- no gallery;
- no unpublished data;
- navigation kembali;
- noindex/security behavior tetap.

Sign-in:

- no form;
- unavailable state;
- link kembali;
- no active auth.

404:

- 404 marker;
- link Beranda;
- noindex bila policy mengatur;
- illustration local.

Screenshot audit tetap wajib; unit test tidak menggantikan review manusia.

---

## 32. Visual Audit Matrix

| Route | 390 | 768 | 1366 | Fokus |
|---|---:|---:|---:|---|
| `/` | wajib | wajib | wajib | benchmark tidak regresi |
| `/tentang` | wajib | wajib | wajib | photo, hierarchy, values |
| `/cara-kerja` | wajib | wajib | wajib | 9-phase readability |
| `/layanan` | wajib | wajib | wajib | gate dan empty state |
| `/proyek` | wajib | wajib | wajib | no fake project |
| `/proyek/:slug` | wajib | wajib | wajib | unavailable state |
| `/sign-in` | wajib | wajib | wajib | portal unavailable |
| `404` | wajib | wajib | wajib | recovery navigation |
| Header/Footer | wajib | wajib | wajib | shell consistency |
| Overflow | wajib | wajib | wajib | tidak ada |
| Focus | wajib | wajib | wajib | terlihat |

---

## 33. Before/After Evidence

Wajib per route utama:

```text
before-about-390 / after-about-390
before-about-1366 / after-about-1366
before-work-390 / after-work-390
before-work-1366 / after-work-1366
before-services-390 / after-services-390
before-services-1366 / after-services-1366
before-projects-390 / after-projects-390
before-projects-1366 / after-projects-1366
before-project-detail-state-390 / after-project-detail-state-390
before-project-detail-state-1366 / after-project-detail-state-1366
before-sign-in-390 / after-sign-in-390
before-404-390 / after-404-390
```

Beranda:

```text
before-home-390 / after-home-390
before-home-1366 / after-home-1366
```

Jangan commit screenshot besar kecuali disetujui.

---

## 34. File Kandidat

Kemungkinan diubah:

```text
apps/web/src/pages/AboutPage.jsx
apps/web/src/pages/WorkProcessPage.jsx
apps/web/src/pages/ServiceListPage.jsx
apps/web/src/pages/ProjectListPage.jsx
apps/web/src/pages/ProjectDetailPage.jsx
apps/web/src/pages/UnavailablePage.jsx
apps/web/src/pages/NotFoundPage.jsx
apps/web/src/content/**
apps/web/src/sections/about/**
apps/web/src/sections/work-process/**
apps/web/src/sections/services/**
apps/web/src/sections/projects/**
apps/web/src/sections/project-detail/**
apps/web/src/components/icons/PublicIcon.jsx
apps/web/src/components/public/**
apps/web/src/components/ui/** hanya bila shared contract terbukti
apps/web/src/styles/about.css
apps/web/src/styles/work-process.css
apps/web/src/styles/services.css
apps/web/src/styles/projects.css
apps/web/src/styles/components.css
apps/web/src/styles/shell.css
apps/web/src/test/**
docs/plan/PLAN-008D*.md
docs/plan/PLAN-008*.md
docs/plan/README.md
```

Kemungkinan dibuat:

```text
apps/web/src/components/ui/IllustratedState.jsx
apps/web/src/components/ui/VisualMedia.jsx
apps/web/src/assets/images/about/**
apps/web/src/assets/images/work-process/**
apps/web/src/assets/illustrations/public-states/**
docs/assets/PUBLIC_VISUAL_ASSET_REGISTER.md
```

Protected:

```text
apps/backend/**
client/**
server/**
prisma/**
database/**
deployment/**
auth active implementation
admin/**
portal/**
legacy/**
```

---

## 35. Invariant Bisnis dan Publikasi

```text
published services = 0
published projects = 0
projectCatalog = []
transaction CTA = 0
sign-in active form = 0
route count tidak bertambah
backend tidak berubah
```

Dilarang menambah:

- harga;
- wilayah layanan;
- garansi;
- SLA;
- tahun berdiri;
- legalitas;
- alamat;
- kontak;
- personel;
- klien;
- statistik;
- testimoni;
- layanan aktif;
- proyek aktif;
- galeri proyek;
- CTA pengajuan;
- jadwal aktif;
- countdown.

---

## 36. Risiko dan Mitigasi

### Foto dianggap tim/proyek RKK

- label ilustrasi;
- alt netral;
- caption;
- asset register;
- no project/team caption;
- maksimal tiga foto.

### Halaman menjadi seragam

- visual type matrix;
- fungsi per route;
- layout berbeda;
- shared language, bukan shared composition.

### Foto stok berlebihan

- hanya Tentang wajib;
- Cara Kerja opsional;
- route lain memakai illustration/icon;
- asset count maksimum.

### Empty state terlihat seperti kekurangan

- designed state;
- publication explanation;
- navigation;
- standard/readiness information.

### Dummy terlihat sebagai fakta

- no dummy;
- no example project;
- no example service;
- no placeholder text;
- tests.

### CSS collision

- root scope;
- page prefix;
- owner stylesheet;
- selector audit;
- Beranda regression.

### Shared abstraction berlebihan

- minimal two-route rule;
- no premature component;
- page-specific composition remains local.

### Asset legal

- official page;
- license check;
- creator/source record;
- trademark/model/property review;
- local storage.

### Scope terlalu besar

- satu plan;
- implementation groups;
- per-route audit;
- no new route;
- no backend;
- no business change.

---

## 37. Stop Conditions

Gemini harus STOP jika:

1. HEAD bukan baseline;
2. working tree tidak bersih;
3. lint/test/build baseline gagal;
4. asset license tidak jelas;
5. asset mempunyai trademark dominan;
6. foto berisiko dianggap proyek RKK;
7. kebutuhan membutuhkan copy bisnis baru;
8. kebutuhan membutuhkan layanan/project publication;
9. route baru diperlukan;
10. backend harus diubah;
11. dependency baru dianggap wajib;
12. content map tidak mendukung visual;
13. data unpublished harus dibuka;
14. auth aktif harus dibuat;
15. Beranda harus dirombak;
16. scope berubah menjadi service detail atau consultation flow;
17. visual menghasilkan klaim baru;
18. accessibility tidak dapat dipenuhi;
19. test count turun;
20. build gagal.

---

## 38. Acceptance Criteria

### Global

- [ ] seluruh route harmonis dengan Beranda;
- [ ] perubahan terlihat;
- [ ] tidak semua halaman memakai layout sama;
- [ ] tidak ada foto stok sebagai bukti;
- [ ] icon family konsisten;
- [ ] state illustration konsisten;
- [ ] content tetap;
- [ ] route tetap;
- [ ] publication tetap;
- [ ] Beranda tidak regresi.

### Tentang

- [ ] foto hero lokal dan responsif;
- [ ] label ilustrasi;
- [ ] positioning editorial;
- [ ] values menggunakan ikon;
- [ ] boundary matang;
- [ ] no company claim baru.

### Cara Kerja

- [ ] sembilan fase mudah dipahami;
- [ ] timeline/grouping visual;
- [ ] icon semantik;
- [ ] gate dan control visual;
- [ ] no SOP detail;
- [ ] mobile vertical aman.

### Layanan

- [ ] illustration gate;
- [ ] no photo layanan;
- [ ] no service card;
- [ ] no “segera”;
- [ ] no transaksi;
- [ ] state terasa intentional.

### Proyek dan Detail

- [ ] no project stock photo;
- [ ] empty/unavailable illustration;
- [ ] publication standard;
- [ ] no card atau dummy;
- [ ] no gallery palsu;
- [ ] resolver/security tidak berubah.

### Public States

- [ ] sign-in no form;
- [ ] sign-in visual matang;
- [ ] 404 visual matang;
- [ ] recovery navigation;
- [ ] no active auth.

### Teknis

- [ ] no dependency baru;
- [ ] no remote asset;
- [ ] asset register;
- [ ] scoped CSS;
- [ ] no inline style;
- [ ] no `!important`;
- [ ] lint 0 warning/error;
- [ ] test > 121 dan semua lulus;
- [ ] build lulus;
- [ ] diff check bersih.

---

## 39. Dokumentasi

Setelah implementasi awal:

PLAN-008D:

```text
versi: 1.1
status: DIEKSEKUSI — MENUNGGU AUDIT
implementation_sha: <SHA>
```

PLAN-008:

```text
versi: 1.5
tahap_aktif: PLAN-008D — Dieksekusi, Menunggu Audit
```

README:

```text
PLAN-008D
Status: DIEKSEKUSI — MENUNGGU AUDIT
Implementation SHA: <SHA>
Fokus: harmonisasi visual seluruh halaman publik mengacu pada Beranda
```

Penutupan hanya dilakukan setelah audit remote SHA.

---

## 40. Workflow Git

```text
Gemini mengerjakan working tree
→ Gemini menjalankan validasi
→ Pemilik commit dan push
→ Pemilik mengirim SHA
→ ChatGPT mengaudit remote SHA
→ kekurangan diperbaiki dengan fix-forward
→ final audit SHA dikunci
→ penutupan administratif
```

Gemini tidak commit atau push.

---

## 41. Format Laporan Gemini

```text
1. Audit Awal
2. Branch, HEAD, Working Tree, Remote
3. Baseline Lint/Test/Build
4. Audit Visual Sebelum per Route
5. Asset Shortlist
6. License Check
7. Asset Register
8. Image Optimization
9. Illustration System
10. Icon Mapping
11. Tentang
12. Cara Kerja
13. Layanan
14. Daftar Proyek
15. Detail Proyek
16. Sign-in Unavailable
17. 404
18. Header/Footer
19. Beranda Regression
20. Content Invariants
21. Publication Invariants
22. CSS Ownership
23. Responsive Audit
24. Accessibility Audit
25. Performance Audit
26. Before/After Evidence
27. File Dibuat
28. File Diubah
29. File Dihapus
30. Lint
31. Test
32. Build
33. git diff --check
34. Bundle dan Asset Size
35. Working Tree Akhir
36. Risiko atau Sisa
37. Konfirmasi Tidak Commit/Push
```

---

## 42. Keputusan Pemilik

Pemilik RKK menyetujui pada 29 Juli 2026:

1. judul PLAN-008D;
2. satu plan untuk seluruh halaman publik selain Beranda;
3. Beranda sebagai protected visual benchmark;
4. route `/tentang`, `/cara-kerja`, `/layanan`, `/proyek`, `/proyek/:slug`, `/sign-in`, dan 404 masuk scope;
5. Tentang wajib mempunyai satu foto hero;
6. Tentang boleh mempunyai satu foto pendukung;
7. Cara Kerja default tanpa foto dan memprioritaskan ikon serta diagram;
8. Cara Kerja boleh memakai maksimal satu foto opsional apabila audit membuktikan kebutuhan;
9. Layanan tidak menggunakan foto layanan;
10. Proyek tidak menggunakan foto stok sebagai portofolio;
11. Detail Proyek tidak menggunakan galeri stok;
12. sign-in unavailable dan 404 menggunakan ilustrasi lokal;
13. total foto eksternal maksimal tiga;
14. ilustrasi state maksimal empat;
15. Pexels menjadi sumber fotografi utama;
16. Unsplash non-Plus dan Pixabay hanya sebagai fallback setelah pemeriksaan lisensi;
17. local SVG menjadi default untuk state illustration;
18. `PUBLIC_VISUAL_ASSET_REGISTER.md` wajib dibuat;
19. tidak ada dependency baru;
20. content map, route, data, publication gate, auth state, dan security invariant tetap;
21. implementation grouping dilakukan per route di dalam satu plan;
22. before/after evidence wajib;
23. test count harus bertambah dari 121;
24. PLAN-008D dapat dieksekusi dari baseline `8dc6298763e415c5ea13170f7a4ed722358d28eb`.

---

## 43. Keputusan Eksekusi

```text
PLAN-008D DISETUJUI SEBAGAI HARMONISASI VISUAL LINTAS HALAMAN.
JADIKAN BERANDA SEBAGAI PROTECTED BENCHMARK.
GUNAKAN FOTO SECARA TERBATAS.
GUNAKAN IKON, DIAGRAM, DAN ILUSTRASI STATE SESUAI FUNGSI.
PERTAHANKAN KONTEN, ROUTE, DATA, DAN PUBLICATION GATE.
KERJAKAN SELURUH HALAMAN DALAM SATU PLAN TERKOORDINASI.
```

---

## 44. Status Penutup

```text
PLAN-008D DILENGKAPI DENGAN FINAL VISUAL POLISH PADA WORKING TREE.
PEMBAHARUAN FINAL:
- Process rail sembilan fase dipertahankan 1 kolom vertikal (max-width 840px) pada seluruh viewport (390, 768, 1366) agar connector 01–09 selalu menunjukkan urutan yang jelas;
- Membersihkan whitespace awal pada .node-title di NinePhaseOverview.jsx;
- Memperkuat regression testsuite dengan assertion node title dan CSS contract anti-grid repeat(3, 1fr) pada process-rail;
- Seluruh 159+ test lulus, lint 0 warning/0 error, build & diff check lulus.
STATUS: DIEKSEKUSI — FINAL VISUAL POLISH MENUNGGU AUDIT (MENUNGGU COMMIT PEMILIK DAN FINAL AUDIT SHA).
```

---

## 45. Riwayat Versi

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1-draft | 2026-07-29 | Menyusun harmonisasi visual seluruh halaman publik berdasarkan benchmark Beranda PLAN-008C; menetapkan matriks foto/ilustrasi/ikon, target visual per route, publication invariants, asset register, responsive audit, dan workflow implementasi satu plan | Direview dan Disetujui Pemilik |
| 1.0 | 2026-07-29 | Pemilik menyetujui harmonisasi visual seluruh halaman publik, Beranda sebagai protected benchmark, fotografi terbatas, ilustrasi state SVG lokal, asset register, implementation grouping per route, before/after evidence, dan regression test lintas halaman | Disetujui Pemilik — Siap Eksekusi |
| 1.1 | 2026-07-29 | Mencatat eksekusi PLAN-008D awal pada working tree (SHA dde5857026f1c28f377a3844b7394fd83e70f828) | Dieksekusi — Menunggu Audit |
| 1.2 | 2026-07-29 | Mencatat fix-forward PLAN-008D: harmonisasi nyata Cara Kerja, CSS scoping, single-source SVG, semantik Detail Proyek, asset register, dan strengthening regression tests (SHA 266ef7f2371936b74fd25a9038d3883618044d24) | Dieksekusi — Fix-forward Menunggu Audit |
| 1.3 | 2026-07-29 | Mencatat koreksi terakhir PLAN-008D: content map sebagai sumber process map Hero, workProcessVisuals.js sebagai single source pemetaan ikon, struktur visual NinePhaseOverview, CSS connector, serta penguatan regression test (SHA a56f7c709e7f5f39c77dac05853e065e83cc5e76) | Dieksekusi — Koreksi Terakhir Menunggu Audit |
| 1.4 | 2026-07-29 | Mencatat final visual polish PLAN-008D: mempertahankan urutan connector 01–09 vertikal 1 kolom pada seluruh viewport (max-width 840px), membersihkan title whitespace, dan memperkuat regression testsuite | Dieksekusi — Final Visual Polish Menunggu Audit |
