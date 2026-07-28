---
kode: PLAN-008C
judul: Penyempurnaan Visual Beranda sebagai Acuan Harmonisasi Website Publik Rumahku Konstruksi
versi: 1.1
status: DIEKSEKUSI — MENUNGGU AUDIT
implementation_sha: c3d27eb079e37ffb361b275caceea4ba31ac98b9
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
parent_plan: PLAN-008
tahap_sebelumnya: PLAN-008B — Selesai dan Terverifikasi
tahap_berikutnya: PLAN-008D — Harmonisasi Visual Halaman Publik Mengacu pada Beranda
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
base_sha: b14ae9690233d5b350c4a198618cc7eeeb45040c
base_sha_status: Remote terverifikasi sebagai SHA penutupan administratif PLAN-008B
route_utama: /
area_implementasi: apps/web
jenis_pekerjaan: visual refinement nyata, editorial layout, foto ilustrasi berlisensi, ikon lokal, responsive polish, dan visual benchmark
perubahan_konten_bisnis: tidak
perubahan_struktur_data_bisnis: tidak
perubahan_route: tidak
perubahan_status_publikasi: tidak
dependency_baru: tidak
redesign_visual: ya — terarah dan terkendali
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-008C — PENYEMPURNAAN VISUAL BERANDA SEBAGAI ACUAN HARMONISASI WEBSITE PUBLIK RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
DISETUJUI PEMILIK — SIAP EKSEKUSI VISUAL
PLAN-008C ADALAH TAHAP PENYEMPURNAAN VISUAL NYATA BERANDA
GEMINI BOLEH MENGUBAH WORKING TREE SETELAH BASELINE DAN VALIDASI AWAL LULUS
GEMINI TIDAK BOLEH COMMIT, PUSH, MERGE, REBASE, ATAU MEMBUAT BRANCH
```

Pemilik RKK menyetujui PLAN-008C pada 28 Juli 2026.

PLAN-008C mengubah arah tahap ketiga PLAN-008.

Arah lama PLAN-008C berfokus pada migrasi halaman dan audit regresi design system. Berdasarkan evaluasi Pemilik, struktur, data, konten, route, dan fondasi teknis website publik sudah cukup rapi. Masalah utama yang masih dirasakan manusia adalah kualitas presentasi visual.

Karena itu, PLAN-008C tidak lagi diposisikan sebagai migrasi teknis yang hasilnya hampir tidak terlihat. PLAN-008C menjadi tahap penyempurnaan visual nyata pada Beranda agar Beranda dapat digunakan sebagai benchmark untuk harmonisasi visual seluruh halaman publik pada PLAN-008D.

---

## 2. Keputusan Arah yang Menjadi Dasar

Keputusan Pemilik RKK:

1. struktur halaman Beranda tetap;
2. struktur data dan content map tetap;
3. konten utama Beranda dinilai sudah baik;
4. urutan section tidak perlu dibongkar;
5. masalah utama berada pada kualitas visual;
6. Beranda perlu dirapikan kembali;
7. Beranda harus mempunyai foto ilustrasi yang relevan;
8. Beranda harus mempunyai ikon yang mendukung makna;
9. tampilan harus lebih menarik, profesional, matang, dan enak dilihat manusia;
10. Beranda menjadi acuan visual resmi untuk halaman publik lainnya;
11. halaman lain mengikuti melalui PLAN-008D;
12. sumber gambar boleh berasal dari internet selama lisensi, sumber, dan batas penggunaannya jelas.

Implikasi:

```text
PLAN-008A = fondasi token
PLAN-008B = fondasi komponen dan ownership CSS
PLAN-008C = visual refinement nyata pada Beranda
PLAN-008D = rollout harmonisasi visual ke seluruh halaman publik
```

---

## 3. Latar Belakang

Website publik RKK telah memiliki:

- route Beranda aktif;
- struktur section modular;
- content map terpisah;
- semantic page sections;
- design token canonical;
- shared component ownership;
- PublicContainer;
- PublicSection;
- SectionHeading;
- InfoCard;
- ActionLink;
- HoldAction;
- lint, test, dan build yang stabil.

Beranda saat ini terdiri dari:

1. HomeHero;
2. HomeContext;
3. HomeApproach;
4. HomeWorkflow;
5. HomeServices;
6. HomePrinciples;
7. HomeClosingCTA.

Struktur tersebut tidak menjadi masalah utama.

Masalah visual aktual:

1. hero masih didominasi panel diagram teknis tanpa foto ilustrasi;
2. komposisi hero terasa seperti dokumentasi sistem, belum seperti public landing page profesional;
3. beberapa section memakai pola grid kartu yang terlalu seragam;
4. pendekatan RKK memakai satu ikon chevron yang sama untuk seluruh prinsip;
5. ikon belum membawa makna spesifik;
6. ritme white–muted section belum cukup menghasilkan dinamika visual;
7. hierarchy section belum selalu kuat ketika dilihat secara utuh;
8. visual anchor di tengah halaman masih terbatas;
9. timeline masih fungsional tetapi belum editorial;
10. publication gate masih tampak seperti panel informasi biasa;
11. prinsip transparansi masih terasa sebagai daftar kartu;
12. CTA penutup belum mempunyai karakter penutup yang kuat;
13. Beranda belum mempunyai aset fotografi yang memberi gambaran manusia, rumah, perencanaan, dan proses konstruksi;
14. tampilan masih lebih dekat ke prototype teknis daripada public website yang matang;
15. kualitas visual belum cukup kuat untuk dijadikan benchmark halaman lain.

---

## 4. Tujuan PLAN-008C

PLAN-008C bertujuan:

1. mempercantik Beranda secara nyata;
2. menjaga seluruh konten bisnis yang sudah disetujui;
3. menjaga struktur data yang sudah stabil;
4. menjaga urutan section;
5. memperbaiki komposisi visual setiap section;
6. membuat hero lebih kuat dan manusiawi;
7. menambahkan foto ilustrasi yang relevan dan aman secara lisensi;
8. menambahkan ikon semantik yang konsisten;
9. mengurangi repetisi pola kartu;
10. menciptakan ritme visual yang lebih editorial;
11. memperkuat hierarchy judul, copy, visual, dan tindakan;
12. memperbaiki hubungan antarsection;
13. memperbaiki whitespace;
14. memperbaiki keseimbangan warna dan surface;
15. memperbaiki visual mobile;
16. menjaga aksesibilitas;
17. menjaga performa;
18. menjaga current hold-state;
19. menjadikan Beranda sebagai visual benchmark PLAN-008D;
20. menghasilkan perubahan yang jelas terlihat oleh manusia.

---

## 5. Syarat Perubahan Harus Terlihat

PLAN-008C dianggap berhasil hanya apabila perubahan dapat dirasakan tanpa membuka source code.

Minimal harus terlihat:

1. hero mempunyai foto ilustrasi nyata atau visual fotografi yang relevan;
2. hero tidak lagi didominasi panel diagram sederhana;
3. ikon pada prinsip dan proses berbeda sesuai makna;
4. minimal tiga section mempunyai komposisi visual yang berbeda satu sama lain;
5. tidak ada lebih dari dua section berurutan yang hanya berupa heading + grid kartu;
6. publication gate tampil sebagai state yang dirancang, bukan kotak informasi generik;
7. CTA penutup mempunyai karakter visual yang jelas;
8. whitespace desktop dan mobile terasa proporsional;
9. hierarchy heading lebih kuat;
10. Beranda terasa lebih profesional, matang, dan hidup;
11. konten tetap mudah dibaca;
12. visual tidak mengalahkan pesan;
13. pengguna tetap memahami RKK dalam beberapa detik.

Pernyataan “token sudah canonical” atau “CSS sudah bersih” tidak cukup sebagai bukti keberhasilan PLAN-008C.

---

## 6. Sumber Kebenaran

### 6.1 Urutan Sumber

1. keputusan aktif Pemilik RKK;
2. sumber bisnis aktif R01;
3. sumber produk dan website publik R02;
4. dokumen UI/UX P07 dan P07.1;
5. paket Beranda HOM;
6. repository pada baseline yang disepakati;
7. aset eksternal yang telah melewati pemeriksaan lisensi;
8. legacy hanya sebagai pembanding.

### 6.2 Dokumen R02 Wajib

1. `[P07-F00] — PANDUAN DAN ARSITEKTUR UI UX DAN DESIGN SYSTEM RKK.md`;
2. `[P07-F02] — PRINSIP PENGALAMAN DAN ARAH VISUAL PRODUK RKK.md`;
3. `[P07-F03] — DESIGN TOKEN DAN FONDASI VISUAL RKK.md`;
4. `[P07-F04] — KATALOG KOMPONEN UI RKK.md`;
5. `[P07-F06] — RESPONSIF AKSESIBILITAS DAN CONTENT DESIGN RKK.md`;
6. `[P07.1-F00] — PANDUAN DAN PETA KERJA UI UX WEBSITE PUBLIK RKK.md`;
7. `[P07.1-F04] — BLUEPRINT DAN SPESIFIKASI UI HALAMAN WEBSITE PUBLIK RKK.md`;
8. `[HOM-01] — SPESIFIKASI HALAMAN BERANDA RKK.md`;
9. `[HOM-02] — PEMETAAN DATA DAN KONTEN BERANDA RKK.csv`;
10. `[HOM-03] — DAFTAR REFERENSI HALAMAN BERANDA RKK.md`;
11. `[HOM-04] — WIREFRAME HALAMAN BERANDA RKK.pdf`;
12. `[HOM-05] — SPESIFIKASI KOMPONEN UI BERANDA RKK.md`.

### 6.3 Repository Wajib

1. PLAN-008;
2. PLAN-008A;
3. PLAN-008B;
4. PLAN-001;
5. PLAN-001A;
6. HomePage;
7. seluruh file `sections/home`;
8. `content/home`;
9. `styles/tokens.css`;
10. `styles/globals.css`;
11. `styles/components.css`;
12. `styles/home.css`;
13. relevant component tests;
14. relevant route and publication tests.

---

## 7. Arah Visual Resmi Beranda

Karakter:

```text
MODERN
PROFESIONAL
EDITORIAL
TERSTRUKTUR
BERSIH
TENANG
HANGAT SECARA TERBATAS
TEKNIS SECARA TERKENDALI
DAPAT DIPERCAYA
MANUSIAWI
```

Bukan:

```text
TEMPLATE KONSTRUKSI GENERIK
DASHBOARD
MARKETPLACE
LANDING PAGE BERLEBIHAN
TERLALU BANYAK KARTU
TERLALU BANYAK GRADIENT
TERLALU BANYAK SHADOW
TERLALU FUTURISTIK
TERLALU GELAP
TERLALU PENUH
```

Prinsip:

1. konten tetap menjadi fokus;
2. foto memberi konteks, bukan bukti proyek RKK;
3. ikon membantu scanning;
4. border dan surface lebih utama daripada shadow berat;
5. warna brand dipakai terarah;
6. aksen hangat terbatas;
7. setiap section mempunyai satu visual anchor;
8. komposisi tidak harus simetris;
9. mobile disusun ulang, bukan sekadar dikecilkan;
10. satu primary action per area;
11. visual harus terasa sebagai satu keluarga;
12. efek dekoratif hanya bila membantu depth dan hierarchy.

---

## 8. Benchmark Visual Beranda

Beranda hasil PLAN-008C menjadi acuan untuk:

1. typography hierarchy;
2. spacing section;
3. hero proportion;
4. editorial split layout;
5. penggunaan foto;
6. penggunaan ikon;
7. radius;
8. border;
9. shadow minimum;
10. background section;
11. CTA treatment;
12. hold-state treatment;
13. process visualization;
14. card density;
15. mobile stacking;
16. visual asset performance;
17. accessibility visual;
18. tone umum website publik.

PLAN-008D harus mengacu pada hasil ini, bukan membuat bahasa visual baru.

---

## 9. Konten dan Struktur yang Dibekukan

### 9.1 Urutan Section

```text
HomeHero
HomeContext
HomeApproach
HomeWorkflow
HomeServices
HomePrinciples
HomeClosingCTA
```

### 9.2 Konten

Tidak boleh mengubah makna:

- positioning;
- headline;
- supporting copy;
- konteks masalah;
- empat prinsip pendekatan;
- ringkasan cara kerja;
- publication gate;
- prinsip transparansi;
- CTA dan hold reason;
- batas layanan;
- batas proyek;
- status publikasi.

Koreksi hanya boleh berupa:

- typo jelas;
- punctuation;
- line break visual;
- aria-label;
- alt text;
- microcopy visual yang tidak menambah klaim.

### 9.3 Struktur Data

`homeContent` tetap menjadi source of truth.

Boleh menambah metadata visual minimum:

```text
iconKey
image
imageAlt
imageSource
imageFocalPoint
visualVariant
```

Dilarang:

- memindahkan copy kembali ke JSX;
- menambahkan layanan aktif;
- menambahkan proyek;
- menambahkan angka;
- menambahkan statistik;
- menambahkan testimoni;
- menambahkan legalitas;
- menambahkan kontak;
- menambahkan klaim baru.

---

## 10. Strategi Foto Ilustrasi

### 10.1 Tujuan

Foto digunakan untuk:

- memberi gambaran konteks konstruksi;
- membuat halaman lebih hidup;
- membantu pengguna membayangkan proses;
- menyeimbangkan teks;
- memperkuat karakter profesional dan manusiawi.

Foto bukan:

- bukti proyek RKK;
- portofolio;
- bukti tenaga ahli RKK;
- bukti lokasi;
- bukti pelanggan;
- klaim kapasitas;
- klaim hasil.

### 10.2 Jumlah

```text
1 foto utama wajib pada hero
1 foto pendukung opsional pada section tengah
maksimal 2 foto utama pada Beranda
```

### 10.3 Platform Kandidat

Prioritas:

1. Pexels;
2. Unsplash;
3. Pixabay sebagai fallback.

Lisensi resmi platform wajib diperiksa kembali saat aset dipilih.

### 10.4 Shortlist Aset yang Disetujui untuk Audit Implementasi

Gemini tidak boleh mengambil gambar acak dari hasil pencarian gambar. Audit dimulai dari shortlist resmi berikut.

#### Kandidat Hero Utama

**Kandidat H1 — prioritas awal**

```text
Platform    : Pexels
Judul       : Architects Reviewing Construction Blueprints Outdoors
Creator     : Maren Ferraro
Source page : https://www.pexels.com/photo/architects-reviewing-construction-blueprints-outdoors-29299826/
Status awal : Free to use — wajib cek ulang halaman aset dan Pexels License pada hari download
Kelebihan   : konteks kerja tim, blueprint, konstruksi, dan perencanaan terlihat jelas
Risiko      : periksa wajah, logo, merek alat, dan crop landscape sebelum dipilih
```

**Kandidat H2**

```text
Platform    : Pexels
Judul       : Man and Woman Holding a Blueprint of a House
Creator     : Thirdman
Source page : https://www.pexels.com/photo/man-and-woman-holding-a-blueprint-of-a-house-8470040/
Status awal : Free to use — wajib cek ulang halaman aset dan Pexels License pada hari download
Kelebihan   : konteks rumah dan kolaborasi sangat mudah dipahami
Risiko      : orientasi vertikal; pastikan crop hero desktop tidak merusak konteks
```

**Kandidat H3**

```text
Platform    : Pexels
Judul       : Construction Site with Engineers Discussing Plans
Creator     : Umut Karabulut
Source page : https://www.pexels.com/photo/construction-site-with-engineers-discussing-plans-29197533/
Status awal : Free to use — wajib cek ulang halaman aset dan Pexels License pada hari download
Kelebihan   : suasana lapangan dan koordinasi konstruksi kuat
Risiko      : periksa alat berat, merek, background, dan kesesuaian dengan skala rumah
```

#### Kandidat Foto Pendukung

**Kandidat S1 — prioritas awal**

```text
Platform    : Pexels
Judul       : Architect Working on a Project
Creator     : Gustavo Fring
Source page : https://www.pexels.com/photo/architect-working-on-a-project-6285159/
Status awal : Free to use — wajib cek ulang halaman aset dan Pexels License pada hari download
Kelebihan   : top-down planning desk, aman sebagai ilustrasi proses
Risiko      : pastikan hard hat atau alat tidak memiliki logo dominan
```

**Kandidat S2**

```text
Platform    : Pexels
Judul       : An Architect's Work Table With Tools and Blueprints
Creator     : Mikhail Nilov
Source page : https://www.pexels.com/photo/an-architect-s-work-table-with-tools-and-blueprints-6894105/
Status awal : Free to use — wajib cek ulang halaman aset dan Pexels License pada hari download
Kelebihan   : faceless, editorial, netral, mudah di-crop
Risiko      : jangan sampai terasa seperti dekorasi kantor generik
```

**Kandidat S3**

```text
Platform    : Pexels
Judul       : A Detailed Floor Plan on a Desk with Glasses, Pen, and Measuring Tape
Creator     : Anete Lusina
Source page : https://www.pexels.com/photo/pen-with-ruler-and-eyeglasses-placed-on-house-plan-4792480/
Status awal : Free to use — wajib cek ulang halaman aset dan Pexels License pada hari download
Kelebihan   : faceless, fokus pada perencanaan, risiko endorsement rendah
Risiko      : hanya cocok sebagai foto pendukung, bukan hero utama
```

#### Halaman Lisensi Wajib

```text
Pexels License:
https://www.pexels.com/legal-pages/license/

Pexels Terms:
https://www.pexels.com/terms-of-service/

Unsplash License:
https://unsplash.com/license

Pixabay Content License:
https://pixabay.com/service/license-summary/
```

Keputusan pemilihan:

1. H1 dan S1 menjadi kandidat awal;
2. Gemini wajib memeriksa tampilan penuh dan crop aktual;
3. Gemini boleh memilih kandidat lain dalam shortlist bila lebih cocok;
4. kandidat di luar shortlist memerlukan alasan dan pemeriksaan lisensi setara;
5. aset Unsplash+ berbayar tidak boleh dipilih;
6. hasil pencarian dari Getty Images, iStock, Pinterest, blog, dan situs agregator tidak boleh dipakai;
7. screenshot atau thumbnail hasil search engine tidak boleh dipakai;
8. source page dan creator harus masuk asset register;
9. gambar yang dipilih harus diunduh dari tombol download resmi platform;
10. attribution tetap dicatat pada register meskipun tidak wajib ditampilkan.

### 10.5 Kriteria Foto Hero

Foto ideal:

- menunjukkan perencanaan rumah, arsitektur, pembangunan, atau diskusi teknis;
- profesional;
- pencahayaan natural;
- warna netral atau hangat;
- mempunyai negative space;
- tidak mempunyai logo terlihat;
- tidak mempunyai merek alat dominan;
- tidak menunjukkan pelanggaran keselamatan;
- tidak menampilkan proyek monumental yang membuat klaim skala palsu;
- tidak terlalu mewah;
- tidak terlalu staged;
- tidak menampilkan orang sebagai fokus endorsement;
- aman dipotong desktop dan mobile.

Tema:

```text
arsitek atau tim meninjau gambar rumah
tangan dan blueprint rumah
diskusi perencanaan di meja
site planning dengan rumah di latar
detail proses pembangunan rumah yang rapi
```

### 10.6 Foto Pendukung Opsional

Tema:

- detail blueprint;
- material dan rencana;
- pemeriksaan lapangan;
- dokumentasi pekerjaan;
- koordinasi teknis.

Hindari:

- pekerja tanpa PPE dalam konteks berisiko;
- logo;
- wajah dominan;
- papan proyek;
- alamat;
- nomor rumah;
- merek alat;
- rumah supermewah;
- foto yang dapat disalahartikan sebagai proyek RKK.

### 10.7 Asset Register

Setiap aset wajib mencatat:

```text
asset_id
filename
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
intended_section
alt_text
crop_focal_point
notes
```

Simpan:

```text
docs/assets/HOME_VISUAL_ASSET_REGISTER.md
```

Aturan:

1. gunakan hanya aset yang diizinkan untuk website bisnis;
2. jangan mengambil thumbnail search engine;
3. buka halaman aset asli;
4. buka lisensi resmi;
5. catat creator;
6. attribution boleh diberikan walaupun tidak diwajibkan;
7. jangan menyiratkan endorsement;
8. jangan tampilkan sebagai proyek RKK;
9. hindari trademark dominan;
10. hindari risiko model/property release yang tidak jelas.

### 10.8 Penyimpanan dan Optimasi

Dilarang hotlink.

Lokasi:

```text
apps/web/src/assets/images/home/
```

Nama kandidat:

```text
home-hero-planning-640.webp
home-hero-planning-960.webp
home-hero-planning-1440.webp
home-planning-detail-640.webp
home-planning-detail-960.webp
```

Hero:

- WebP;
- width dan height eksplisit;
- `fetchPriority="high"`;
- `loading="eager"`;
- `decoding="async"`;
- responsive `srcSet`;
- reserved aspect ratio;
- target 1440 px <= 300 KB;
- target mobile <= 140 KB.

Foto pendukung:

- `loading="lazy"`;
- `decoding="async"`;
- target desktop <= 200 KB;
- target mobile <= 120 KB.

---

## 11. Strategi Ikon

### 11.1 Implementasi

```text
SVG lokal
tanpa dependency baru
tanpa remote icon
tanpa emoji
```

Lokasi kandidat:

```text
apps/web/src/components/icons/PublicIcon.jsx
```

### 11.2 Gaya

```text
24 x 24 default
stroke 1.8–2
rounded linecap
rounded linejoin
single-color
currentColor
viewBox konsisten
```

### 11.3 Pemetaan Semantik

Pendekatan:

| Makna | Kandidat Ikon |
|---|---|
| Terencana | clipboard-list / blueprint |
| Terkendali | sliders / shield-check |
| Transparan | eye / message-square / layers |
| Terdokumentasi | file-stack / folder-check |

Cara kerja:

| Tahap | Kandidat Ikon |
|---|---|
| Orientasi kebutuhan | compass / message |
| Pemeriksaan dan perencanaan | search-check / clipboard |
| Pelaksanaan dan pengendalian | hard-hat / settings |
| Dokumentasi dan tindak lanjut | file-check / archive |

State:

| State | Kandidat Ikon |
|---|---|
| Informasi sedang disiapkan | clock / construction |
| CTA hold | pause-circle / clock |
| Dokumentasi | file-text |
| Transparansi | layers / eye |

### 11.4 Aksesibilitas

- ikon dekoratif `aria-hidden="true"`;
- ikon bukan satu-satunya pembawa makna;
- icon-only button wajib accessible name;
- kontras mengikuti token;
- target sentuh minimum dipenuhi.

---

## 12. Target Visual per Section

### 12.1 HomeHero

Kondisi sekarang:

- split 1:1 sederhana;
- visual kanan berupa system diagram;
- belum ada foto;
- kurang memberi bayangan konstruksi nyata.

Target:

```text
editorial split hero
copy kuat di kiri
foto ilustrasi konstruksi/perencanaan di kanan
overlay sistem kecil sebagai secondary information
```

Desktop:

- copy sekitar 5 kolom;
- visual sekitar 6 kolom;
- gutter cukup;
- foto 4:3 atau 5:4;
- border halus;
- shadow ringan;
- overlay kecil 3–4 kata kunci;
- H1 maksimal 3 baris;
- supporting copy mempunyai measure;
- CTA lebih rapi.

Mobile:

- copy lebih dahulu;
- CTA tidak overflow;
- foto setelah CTA;
- overlay disederhanakan;
- image ratio tidak terlalu tinggi;
- headline tidak terlalu padat.

System diagram lama boleh dihapus atau dipadatkan menjadi overlay kecil.

### 12.2 HomeContext

Kondisi sekarang:

- heading;
- tiga InfoCard sejajar;
- marker angka;
- mirip section lain.

Target:

```text
intro/heading 4–5 kolom
context list 7–8 kolom
```

Gunakan:

- tiga row icon/number;
- divider;
- asymmetrical stack;
- optional small photo detail.

Aturan:

- tidak wajib memakai InfoCard;
- copy tetap;
- card chrome dikurangi;
- tidak ada statistik.

### 12.3 HomeApproach

Kondisi sekarang:

- empat InfoCard;
- seluruh ikon chevron sama.

Target:

- ikon unik;
- title dan description;
- visual rhythm konsisten;
- hover sangat halus bila perlu;
- tidak clickable bila tidak ada tindakan.

Wajib:

```text
Terencana != Terkendali != Transparan != Terdokumentasi
```

### 12.4 HomeWorkflow

Target:

1. timeline lebih jelas;
2. connector terkontrol;
3. ikon unik per tahap;
4. nomor tetap;
5. title dan description mempunyai measure;
6. desktop tidak terlalu rapat;
7. mobile vertical sequence;
8. notice menyatu dengan timeline;
9. CTA tanpa inline style.

Dilarang:

- progress palsu;
- status aktif palsu;
- mengganti content ringkasan;
- menampilkan sembilan fase penuh.

### 12.5 HomeServices

Target publication gate:

```text
icon/state visual
status label
description
secondary navigation
subtle supporting pattern
```

Wajib:

- tidak ada service card aktif;
- tidak ada layanan baru;
- tidak ada CTA transaksi;
- gunakan ActionLink/shared button;
- state terasa intentional, bukan error atau placeholder kosong.

### 12.6 HomePrinciples

Target:

```text
left: heading + optional supporting photo
right: structured principle rows
```

atau:

```text
central visual + principle callouts
```

Aturan:

- tidak menambah klaim;
- tidak menambah statistik;
- tidak menjadi dashboard;
- row/divider lebih disukai daripada card stack berulang;
- foto bukan bukti proyek.

### 12.7 HomeClosingCTA

Target:

1. brand surface lebih kuat;
2. class title/description/action khusus closing;
3. subtle pattern atau line illustration;
4. optional icon;
5. tidak memakai foto ketiga;
6. tidak memakai class hero;
7. HoldAction tetap aman;
8. secondary CTA tetap jelas;
9. kontras AA;
10. bukan banner promo.

### 12.8 Header dan Footer

Boleh polish terbatas:

- spacing;
- active state;
- border;
- background;
- logo alignment;
- menu rhythm;
- footer separation;
- hover/focus.

Dilarang:

- mengubah navigasi;
- menambah menu;
- mengubah route;
- mengaktifkan CTA;
- mengubah logo;
- membuat mega menu;
- mengganti shell architecture.

---

## 13. Ritme Halaman

Target:

```text
Hero: strong image-led
Context: editorial list
Approach: icon-led grid
Workflow: visual timeline
Services: designed hold-state
Principles: editorial split + optional image
Closing: brand CTA panel
```

Dilarang menghasilkan:

```text
heading + cards
heading + cards
heading + cards
heading + cards
```

---

## 14. Design Token, CSS, dan Ownership

Gunakan PLAN-008A dan PLAN-008B.

Owner:

```text
home.css = visual khusus Beranda
components.css = primitive shared
shell.css = header/footer/shell
tokens.css = token
globals.css = base
```

Aturan:

1. visual unik Beranda tetap di `home.css`;
2. shared primitive tidak dipindah kembali;
3. selector Beranda mempunyai scope jelas;
4. hapus inline style;
5. closing tidak memakai `.hero-*`;
6. icon reusable tidak bergantung pada page;
7. jangan membuat selector generik baru;
8. jangan menghapus compatibility layer halaman lain;
9. jangan memigrasikan halaman lain;
10. tidak memakai `!important`;
11. nilai baru harus diaudit;
12. tidak membuat palette baru.

Kandidat root scope:

```text
.home-page
```

---

## 15. Struktur File Kandidat

File kemungkinan diubah:

```text
apps/web/src/pages/HomePage.jsx
apps/web/src/content/home.js atau file ekuivalen
apps/web/src/sections/home/HomeHero.jsx
apps/web/src/sections/home/HomeContext.jsx
apps/web/src/sections/home/HomeApproach.jsx
apps/web/src/sections/home/HomeWorkflow.jsx
apps/web/src/sections/home/HomeServices.jsx
apps/web/src/sections/home/HomePrinciples.jsx
apps/web/src/sections/home/HomeClosingCTA.jsx
apps/web/src/styles/home.css
apps/web/src/styles/components.css                  # hanya bila reusable
apps/web/src/styles/shell.css                       # hanya polish terbatas
apps/web/src/test/components.test.jsx               # bila contract berubah
apps/web/src/test/*home*.test.jsx
docs/plan/PLAN-008*.md
docs/plan/README.md
```

File kemungkinan dibuat:

```text
apps/web/src/components/icons/PublicIcon.jsx
apps/web/src/assets/images/home/home-hero-planning-640.webp
apps/web/src/assets/images/home/home-hero-planning-960.webp
apps/web/src/assets/images/home/home-hero-planning-1440.webp
apps/web/src/assets/images/home/home-planning-detail-640.webp        # opsional
apps/web/src/assets/images/home/home-planning-detail-960.webp        # opsional
docs/assets/HOME_VISUAL_ASSET_REGISTER.md
```

Protected:

```text
apps/backend/**
client/**
server/**
prisma/**
deployment/**
auth/**
project catalog
service publication data
project publication data
```

---

## 16. No New Dependency

Default:

```text
dependency baru: tidak ada
```

Ikon dibuat lokal.

Dependency baru hanya boleh dipertimbangkan setelah revisi plan dan persetujuan Pemilik.

---

## 17. Responsive dan Accessibility

Viewport minimum:

```text
360
390
768
1024
1366
1440
```

Wajib:

- no horizontal overflow;
- hero copy dahulu pada mobile;
- image crop aman;
- CTA tidak overflow;
- context satu kolom mobile;
- workflow vertikal mobile;
- focus ring terlihat;
- satu H1;
- heading semantic;
- alt text benar;
- icon dekoratif aria-hidden;
- contrast AA;
- reduced motion;
- tidak ada layout shift besar;
- target sentuh aman.

---

## 18. Performance

1. tidak menambah library icon;
2. hero image responsive;
3. local asset;
4. image modern format;
5. secondary image lazy;
6. no remote image;
7. width/height eksplisit;
8. bundle growth dicatat;
9. CSS growth diaudit;
10. JS bundle tidak naik signifikan.

Laporan wajib mencantumkan:

```text
CSS bundle sebelum/sesudah
JS bundle sebelum/sesudah
hero image file sizes
secondary image file sizes
LCP risk assessment
```

---

## 19. Invariant Bisnis dan Publikasi

Tetap:

```text
route /
service published = 0
project published = 0
CTA transaksi = 0
sign-in unavailable tetap
projectCatalog = []
```

Dilarang:

- foto stok sebagai proyek;
- layanan aktif;
- proyek aktif;
- harga;
- wilayah;
- SLA;
- garansi;
- testimoni;
- statistik;
- legalitas;
- personel;
- kontak belum sah;
- form aktif;
- CTA pengajuan aktif;
- mengubah HoldAction menjadi aktif.

---

## 20. Audit Baseline

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git remote -v
```

Expected:

```text
branch       : main
HEAD         : b14ae9690233d5b350c4a198618cc7eeeb45040c
working tree : clean, kecuali PLAN-008C final
remote       : repository RKK yang benar
```

Validasi:

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
```

Expected:

```text
lint  : 0 warning, 0 error
test  : minimal 120 existing test lulus
build : lulus
diff  : bersih
```

STOP jika baseline gagal.

---

## 21. Tahapan Implementasi

### Tahap 1 — Audit Visual Sebelum

- jalankan route `/`;
- screenshot 390, 768, 1366;
- catat masalah per section;
- catat CSS dan markup yang membatasi;
- jangan mengubah kode sebelum audit selesai.

### Tahap 2 — Asset Discovery

- cari minimal tiga kandidat hero;
- periksa halaman aset asli;
- periksa lisensi resmi;
- periksa trademark;
- periksa recognizable people/property;
- pilih satu hero;
- pilih maksimal satu secondary;
- catat provenance;
- download dan optimize;
- simpan lokal.

### Tahap 3 — Icon Set

- tetapkan icon key;
- buat SVG lokal;
- pasang pada approach;
- pasang pada workflow;
- pasang pada publication state;
- audit accessibility.

### Tahap 4 — Hero

- perbaiki grid;
- pasang foto;
- buat overlay sistem kecil;
- perbaiki H1 measure;
- perbaiki CTA;
- perbaiki hold reason;
- perbaiki mobile;
- hapus diagram lama bila tidak dipakai.

### Tahap 5 — Mid-page

- HomeContext;
- HomeApproach;
- HomeWorkflow;
- HomeServices;
- HomePrinciples.

### Tahap 6 — Closing dan Shell Polish

- HomeClosingCTA;
- header minor polish;
- footer minor polish;
- tidak mengubah navigasi.

### Tahap 7 — Validasi

- lint;
- test;
- build;
- diff check;
- screenshot after;
- responsive;
- keyboard/focus;
- image loading;
- no remote request;
- publication invariants.

---

## 22. Test Requirements

Test count tidak boleh turun.

Tambah/perbarui test untuk:

1. hero image local;
2. `srcSet`, width, height;
3. alt sesuai fungsi;
4. icon semantik;
5. icon dekoratif aria-hidden;
6. approach tidak memakai ikon sama seluruh item;
7. workflow tetap empat tahap;
8. HomeServices tetap hold;
9. HoldAction tetap aman;
10. route dan content tetap;
11. no project proof claim;
12. no service publication;
13. closing tidak memakai hero class;
14. no inline style terlarang;
15. asset register tersedia.

Screenshot audit tetap wajib; unit test tidak menggantikan penilaian visual.

---

## 23. Visual Audit Matrix

| Area | 390 | 768 | 1366 | Kriteria |
|---|---:|---:|---:|---|
| Header | Wajib | Wajib | Wajib | rapi, tidak menutupi |
| Hero copy | Wajib | Wajib | Wajib | hierarchy jelas |
| Hero image | Wajib | Wajib | Wajib | crop aman |
| CTA | Wajib | Wajib | Wajib | tidak overflow |
| Context | Wajib | Wajib | Wajib | tidak monoton |
| Approach | Wajib | Wajib | Wajib | ikon unik |
| Workflow | Wajib | Wajib | Wajib | connector rapi |
| Services | Wajib | Wajib | Wajib | state intentional |
| Principles | Wajib | Wajib | Wajib | editorial |
| Closing | Wajib | Wajib | Wajib | penutup kuat |
| Footer | Wajib | Wajib | Wajib | separation baik |
| Focus | Wajib | Wajib | Wajib | terlihat |
| Overflow | Wajib | Wajib | Wajib | tidak ada |

---

## 24. Before/After Evidence

Wajib:

```text
before-home-390
after-home-390
before-home-768
after-home-768
before-home-1366
after-home-1366
```

Bukti harus memungkinkan Pemilik menilai perubahan tanpa membaca diff.

Jangan commit screenshot besar kecuali disetujui.

---

## 25. Acceptance Criteria

### Visual

- [ ] hero memakai foto ilustrasi;
- [ ] foto tidak menjadi bukti proyek;
- [ ] asset provenance tersedia;
- [ ] icon set konsisten;
- [ ] approach memakai ikon unik;
- [ ] workflow lebih visual;
- [ ] section rhythm tidak monoton;
- [ ] minimal tiga pola layout berbeda;
- [ ] publication gate didesain;
- [ ] principles editorial;
- [ ] closing CTA matang;
- [ ] Beranda terasa lebih profesional;
- [ ] perubahan terlihat jelas.

### Konten dan Bisnis

- [ ] content map tetap;
- [ ] copy tidak berubah makna;
- [ ] tidak ada klaim baru;
- [ ] tidak ada data internal;
- [ ] tidak ada layanan aktif;
- [ ] tidak ada proyek aktif;
- [ ] hold-state tetap.

### Teknis

- [ ] token canonical;
- [ ] no dependency baru;
- [ ] image local;
- [ ] image optimized;
- [ ] icon SVG lokal;
- [ ] no inline style;
- [ ] no selector collision;
- [ ] no remote image;
- [ ] no `!important`;
- [ ] lint bersih;
- [ ] seluruh test lulus;
- [ ] build lulus;
- [ ] diff check bersih.

### Responsive dan Accessibility

- [ ] 360/390 aman;
- [ ] 768 aman;
- [ ] 1024 aman;
- [ ] 1366/1440 aman;
- [ ] no horizontal overflow;
- [ ] focus visible;
- [ ] contrast aman;
- [ ] alt benar;
- [ ] icon accessible;
- [ ] reduced motion aman;
- [ ] layout shift diminimalkan.

### Dokumentasi

- [ ] PLAN-008C masuk repository;
- [ ] asset register tersedia;
- [ ] README diperbarui;
- [ ] PLAN-008 diperbarui sesuai scope baru;
- [ ] PLAN-008D disebut sebagai tahap berikutnya;
- [ ] final audit SHA dicatat setelah audit.

---

## 26. Stop Conditions

STOP jika:

1. baseline SHA berbeda;
2. working tree mempunyai perubahan lain;
3. asset license tidak jelas;
4. gambar mempunyai trademark dominan;
5. gambar berisiko dianggap proyek RKK;
6. gambar membutuhkan klaim baru;
7. visual membutuhkan copy material baru;
8. visual membutuhkan route baru;
9. visual membutuhkan layanan/proyek aktif;
10. dependency baru dianggap wajib;
11. perubahan menyentuh backend;
12. publication gate rusak;
13. build/test/lint gagal;
14. image tidak dapat dioptimalkan;
15. hasil menjadi template generik;
16. halaman lain harus dimigrasikan;
17. scope berubah menjadi PLAN-008D.

---

## 27. Risiko dan Mitigasi

### Foto dianggap proyek RKK

- gunakan label ilustrasi bila perlu;
- jangan beri caption proyek;
- catat sumber;
- alt tidak menyebut proyek RKK.

### Foto stok terasa generik

- shortlist;
- pilih gaya editorial;
- hindari pose kamera;
- crop terarah;
- maksimal dua foto.

### Terlalu dekoratif

- satu anchor per section;
- card terbatas;
- icon sederhana;
- shadow selektif;
- gradient minimum.

### Perubahan terlalu kecil

- hero image wajib;
- layout variation wajib;
- unique icon wajib;
- before/after wajib;
- visible change requirement.

### Perubahan terlalu besar

- urutan section tetap;
- content tetap;
- data tetap;
- route tetap;
- scope hanya Beranda.

### Image performance

- responsive size;
- WebP;
- local asset;
- size target;
- width/height;
- lazy secondary.

### Global regression

- home-specific CSS;
- shell change minimal;
- all-route smoke test;
- fix-forward setelah SHA audit.

---

## 28. Revisi Parent PLAN

Setelah PLAN-008C disetujui, PLAN-008 direvisi:

Arah lama:

```text
PLAN-008C — Migrasi Halaman Publik dan Audit Regresi
PLAN-008D — Bersyarat
```

Arah baru:

```text
PLAN-008C — Penyempurnaan Visual Beranda sebagai Acuan Harmonisasi
PLAN-008D — Harmonisasi Visual Halaman Publik Mengacu pada Beranda
```

PLAN-008A dan PLAN-008B tetap selesai.

---

## 29. Workflow Git

```text
Gemini mengerjakan working tree
→ Pemilik commit dan push
→ Pemilik mengirim SHA
→ ChatGPT mengaudit remote SHA
→ kekurangan diperbaiki melalui fix-forward
→ final audit SHA dikunci
→ penutupan administratif
→ PLAN-008D disusun
```

Gemini tidak commit atau push.

---

## 30. Format Laporan Gemini

```text
1. Audit Awal
2. Branch, HEAD, Working Tree, Remote
3. Baseline Lint/Test/Build
4. Audit Visual Sebelum
5. Asset Shortlist
6. Asset Terpilih
7. Pemeriksaan Lisensi
8. Asset Register
9. Optimasi Image
10. Icon Set
11. HomeHero
12. HomeContext
13. HomeApproach
14. HomeWorkflow
15. HomeServices
16. HomePrinciples
17. HomeClosingCTA
18. Header/Footer Polish
19. Content Invariants
20. Publication Invariants
21. CSS Ownership
22. Responsive Audit
23. Accessibility Audit
24. Before/After Evidence
25. File Dibuat
26. File Diubah
27. File Dihapus
28. Lint
29. Test
30. Build
31. git diff --check
32. Bundle/Asset Size
33. Working Tree Akhir
34. Risiko atau Sisa
35. Konfirmasi Tidak Commit/Push
```

---

## 31. Keputusan Pemilik

Pemilik RKK menyetujui pada 28 Juli 2026:

1. judul PLAN-008C;
2. Beranda sebagai benchmark visual resmi;
3. PLAN-008D sebagai rollout halaman publik lainnya;
4. satu hero image wajib;
5. satu secondary image opsional;
6. Pexels sebagai sumber utama;
7. Unsplash dan Pixabay sebagai fallback setelah pemeriksaan lisensi;
8. asset register wajib;
9. foto disimpan lokal;
10. icon SVG lokal tanpa dependency;
11. komposisi seluruh section boleh diubah selama urutan dan makna konten tetap;
12. header/footer boleh mendapat polish terbatas;
13. before/after screenshot wajib;
14. visible change requirement diterima;
15. parent PLAN-008 harus disinkronkan;
16. PLAN-008C dapat dieksekusi.

---

## 32. Keputusan Eksekusi

```text
PLAN-008C DISETUJUI SEBAGAI VISUAL REFINEMENT NYATA.
PERTAHANKAN STRUKTUR DAN KONTEN.
WAJIBKAN FOTO ILUSTRASI BERLISENSI.
WAJIBKAN IKON SEMANTIK LOKAL.
JADIKAN BERANDA SEBAGAI BENCHMARK PLAN-008D.
```

---

## 33. Status Penutup

```text
PLAN-008C TELAH DISETUJUI PEMILIK RKK PADA 28 JULI 2026.
PLAN-008C SIAP DIEKSEKUSI DARI BASELINE b14ae9690233d5b350c4a198618cc7eeeb45040c.
FOKUS: PERUBAHAN VISUAL NYATA PADA BERANDA.
STRUKTUR, CONTENT MAP, ROUTE, DATA, DAN PUBLICATION STATE TETAP.
FOTO WAJIB BERLISENSI, DISIMPAN LOKAL, DAN DICATAT DALAM ASSET REGISTER.
GEMINI TIDAK BOLEH COMMIT ATAU PUSH.
HASIL DI-COMMIT DAN DI-PUSH OLEH PEMILIK, LALU DIAUDIT BERDASARKAN SHA REMOTE.
```

---

## 34. Riwayat Versi

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1-draft | 2026-07-28 | Mengubah PLAN-008C dari migrasi teknis menjadi penyempurnaan visual nyata Beranda; menambahkan strategi foto ilustrasi, ikon lokal, visual benchmark, responsive audit, asset provenance, dan PLAN-008D sebagai rollout harmonisasi halaman lain | Direview dan Disetujui Pemilik |
| 1.0 | 2026-07-28 | Pemilik menyetujui visual refinement nyata Beranda, foto ilustrasi berlisensi, icon SVG lokal, asset register, before/after evidence, dan Beranda sebagai benchmark PLAN-008D | Disetujui Pemilik — Siap Eksekusi Visual |
