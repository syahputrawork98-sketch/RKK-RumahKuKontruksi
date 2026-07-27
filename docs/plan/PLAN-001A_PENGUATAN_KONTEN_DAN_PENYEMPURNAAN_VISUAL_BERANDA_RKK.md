---
kode: PLAN-001A
judul: Penguatan Konten, Penyempurnaan Visual, dan Pemanfaatan Selektif Baseline Website Publik RKK
versi: 1.0
status: PLAN-001A — IMPLEMENTASI TERVERIFIKASI
tanggal_penyusunan: 2026-07-28
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: refactor/plan-001-public-ui-home
base_sha: 8334f6dbc053a3a2cbc165f8d29f4b2f755cd258
parent_plan: PLAN-001 — BASELINE IMPLEMENTASI TERVERIFIKASI
area_implementasi: apps/web
jenis_pekerjaan: subtahap penyempurnaan dalam jalur PLAN-001
---

# PLAN-001A — PENGUATAN KONTEN, PENYEMPURNAAN VISUAL, DAN PEMANFAATAN SELEKTIF BASELINE WEBSITE PUBLIK RKK

## 1. Status Dokumen

```text
PLAN-001A — IMPLEMENTASI TERVERIFIKASI
```

Dokumen ini merupakan subtahap penyempurnaan dari PLAN-001. PLAN-001 telah menghasilkan baseline frontend publik yang terverifikasi. PLAN-001A tidak membangun ulang fondasi tersebut, tetapi memperkuat kualitas isi, identitas brand, hierarchy visual, ritme halaman, dan kematangan presentasi Beranda.

PLAN-001A tetap memakai branch yang sama agar pekerjaan berada pada satu jalur:

```text
refactor/plan-001-public-ui-home
```

Base SHA final:

```text
8334f6dbc053a3a2cbc165f8d29f4b2f755cd258
```

Base SHA wajib diperiksa ulang pada awal eksekusi. Jika branch, HEAD, atau working tree tidak sesuai, Gemini harus berhenti dan melaporkan kondisi aktual.

---

## 2. Aturan Akses Sumber dan Kemandirian Plan

Antigravity dan Gemini tidak memiliki akses langsung ke Google Drive RKK.

Seluruh keputusan bisnis, produk, konten, visual, batas publikasi, dan acceptance criteria yang relevan telah diterjemahkan ke dalam dokumen ini. Nama kode sumber seperti `HOM-01`, `P07-F02`, `B02.1-F01`, atau `P07.1-F03` hanya dicatat untuk keterlacakan pemilik dan audit.

Gemini tidak boleh:

- membuka atau mencari Google Drive;
- meminta tautan Drive sebagai sumber kerja;
- menebak isi dokumen berdasarkan kode file;
- menggunakan nama file Drive sebagai pengganti instruksi konkret;
- mengambil aset dari tautan remote yang tidak diberikan sebagai file lokal.

Gemini hanya menggunakan:

1. dokumen PLAN-001A final;
2. repository dan working tree pada branch yang ditentukan;
3. file lokal atau lampiran yang sengaja diberikan bersama paket eksekusi.

Jika informasi atau aset yang dibutuhkan tidak tersedia pada tiga sumber tersebut, Gemini wajib berhenti dan melaporkan blocker.

---

## 3. Kedudukan PLAN-001A

### 3.1 Hubungan dengan PLAN-001

PLAN-001 telah menyediakan:

- React + Vite + JavaScript di `apps/web`;
- React Router;
- public application shell;
- header dan mobile drawer;
- footer minimum;
- route `/`, `/tentang`, `/cara-kerja`, `/sign-in`, dan 404;
- struktur section Beranda;
- content layer;
- design token berbasis CSS custom properties;
- accessibility baseline;
- automated test;
- publication gate;
- hold action untuk jalur pengajuan;
- baseline implementasi terverifikasi.

PLAN-001A wajib mempertahankan fondasi tersebut.

### 3.2 Masalah yang Diselesaikan

Baseline PLAN-001 sudah benar secara struktur, tetapi secara presentasi masih terlihat seperti fondasi atau wireframe awal karena:

- identitas brand di header masih berbasis teks tanpa logo resmi;
- hero visual masih berupa empat kotak sederhana;
- hierarchy visual antarseksi belum cukup kuat;
- beberapa judul kartu terlalu panjang;
- ritme whitespace dan pergantian background belum memberi alur yang matang;
- card, workflow, publication gate, dan closing CTA masih membutuhkan diferensiasi visual;
- footer masih sangat minimum;
- kekuatan komposisi dari UI legacy belum dimanfaatkan secara selektif;
- halaman perlu terasa profesional dan siap dikembangkan tanpa menampilkan klaim atau data yang belum disahkan.

### 3.3 Hasil yang Diharapkan

Setelah PLAN-001A:

- Beranda tidak lagi terasa seperti wireframe;
- brand Rumahku Konstruksi tampil jelas dan konsisten;
- alur baca halaman lebih kuat dari hero sampai closing CTA;
- setiap section mempunyai fungsi visual yang berbeda tetapi tetap satu sistem;
- konten lebih mudah dipindai dan lebih manusiawi;
- publication gate tetap jujur dan tidak terasa seperti error;
- tidak ada klaim, layanan, proyek, statistik, kontak, harga, wilayah, atau testimoni palsu;
- responsif dan aksesibilitas PLAN-001 tidak mengalami regresi;
- kode legacy hanya menjadi referensi pola, bukan sumber fakta atau source code yang diubah.

---

## 4. Tujuan PLAN-001A

PLAN-001A bertujuan:

1. memasukkan identitas visual RKK melalui logo lokal yang benar;
2. menyempurnakan public header dan footer tanpa memperluas route;
3. memperkuat hierarchy dan komposisi hero;
4. merapikan copy Beranda tanpa mengubah positioning atau membuat klaim baru;
5. memperjelas fungsi setiap section;
6. memperbaiki typography, spacing, grid, card, border, shadow, background, dan visual rhythm;
7. memakai kembali pola layout legacy yang masih layak secara selektif;
8. menghapus ketergantungan pada visual remote, foto stok, atau wordmark yang salah;
9. mempertahankan publication gate;
10. mempertahankan accessibility, keyboard behavior, focus management, dan responsive behavior yang telah terverifikasi;
11. menambah test yang membuktikan identitas brand, aset lokal, struktur konten, dan tidak adanya regresi.

---

## 5. Prinsip Bisnis dan Produk yang Mengikat

### 5.1 Identitas

Nama resmi yang wajib digunakan:

```text
Rumahku Konstruksi
```

Singkatan:

```text
RKK
```

Varian berikut dilarang:

- RumahKuKontruksi;
- RumahKu Konstruksi;
- Rumahku Kontruksi;
- RUMAHKUKONTRUKSI;
- Rumahku Kontruksi;
- wordmark lama dengan ejaan `kontruksi`.

### 5.2 Kedudukan RKK

RKK diposisikan sebagai usaha konstruksi berbasis sistem.

Platform digital adalah sarana pendukung pengelolaan proses dan arah pengembangan usaha. Website tidak boleh memosisikan RKK sebagai:

- perusahaan teknologi;
- marketplace konstruksi;
- aplikasi pencari tenaga kerja;
- pengembang properti;
- ekosistem hunian yang telah terintegrasi penuh;
- perusahaan dengan operasi, pelanggan, proyek, tenaga, atau wilayah yang belum dibuktikan.

### 5.3 Inti Pengalaman

Website harus memberi kesan bahwa pekerjaan konstruksi dapat dikelola agar lebih:

- terencana;
- terkendali;
- transparan;
- terdokumentasi.

Empat prinsip tersebut bukan jaminan hasil, melainkan arah pendekatan dan pengalaman yang ingin dibangun.

### 5.4 Publication Gate

Website tidak boleh menampilkan sebagai fakta publik:

- daftar layanan yang belum disahkan;
- harga;
- wilayah layanan;
- kapasitas;
- jadwal;
- proyek;
- portofolio;
- pelanggan;
- testimoni;
- statistik;
- nama tenaga atau personel;
- legalitas;
- alamat;
- nomor kontak;
- akun media sosial;
- sertifikasi;
- jaminan kualitas;
- klaim pengalaman;
- klaim keberhasilan.

Data mock, seed, placeholder, nama, proyek, wilayah, dan konten lama di GitHub bukan fakta perusahaan.

---

## 6. Arah Visual yang Mengikat

Arah visual PLAN-001A:

```text
terstruktur
profesional
tenang
jelas
modern
ringan
tepercaya
tidak berlebihan
```

### 6.1 Karakter Visual

Gunakan:

- light mode;
- warna brand teal yang sudah tersedia pada token;
- putih dan neutral surface sebagai dasar;
- border lembut;
- shadow tipis dan selektif;
- radius konsisten;
- hierarchy typography yang jelas;
- whitespace yang cukup;
- grid yang stabil;
- ilustrasi sistem berbasis CSS atau inline SVG sederhana;
- motion ringan dan menghormati reduced motion.

Hindari:

- neon;
- gradient keras;
- glassmorphism berlebihan;
- shadow berat;
- setiap elemen menjadi kartu;
- radius terlalu bulat;
- terlalu banyak pill;
- animasi dekoratif;
- floating particles;
- autoplay;
- carousel;
- foto stok;
- foto proyek tanpa sumber;
- visual yang menyiratkan proyek nyata;
- dekorasi yang mengalahkan informasi.

### 6.2 Penggunaan Token

Pertahankan token yang sudah ada. Perubahan token hanya boleh dilakukan apabila:

- memperbaiki konsistensi;
- tidak mengganti arah warna utama;
- tidak merusak route lain;
- mempunyai alasan yang dicatat.

Jangan menambahkan framework UI atau dependency baru.

---

## 7. Aset Brand

### 7.1 Aset yang Digunakan

Paket eksekusi final harus menyertakan file lokal:

```text
RKK-logo.png
```

Karakter aset:

- PNG;
- transparan;
- 426 × 426;
- mark/icon saja;
- warna teal;
- tidak memuat wordmark;
- tidak memuat ejaan yang salah.

Target repository:

```text
apps/web/src/assets/brand/rkk-mark.png
```

Nama file target boleh disesuaikan secara minimum, tetapi harus:

- lokal;
- jelas;
- tidak menggunakan remote URL;
- tidak menggunakan Cloudinary;
- tidak mengambil wordmark lama.

### 7.2 Brand Lockup

Header dan footer menggunakan:

```text
[mark logo lokal] + [teks HTML: Rumahku Konstruksi]
```

Aturan accessibility:

- karena teks brand sudah tersedia, gambar mark menggunakan `alt=""` dan `aria-hidden="true"` agar screen reader tidak membaca brand dua kali;
- link brand mempunyai accessible name `Rumahku Konstruksi`;
- logo tidak boleh menjadi satu-satunya sumber nama brand;
- ukuran logo tidak boleh membuat header terlalu tinggi;
- logo tetap jelas pada mobile.

Jika file aset lokal belum tersedia saat eksekusi, Gemini berhenti dan melaporkan blocker. Jangan mengganti dengan remote image atau membuat logo baru.

---

## 8. Scope Implementasi

### 8.1 Scope Utama

PLAN-001A mencakup:

- brand lockup;
- public header;
- mobile drawer secara visual tanpa mengubah behavior yang telah lulus;
- footer;
- Hero;
- Context;
- Approach;
- Workflow;
- publication gate layanan;
- Principles;
- Closing CTA;
- content layer Beranda;
- style Beranda dan shell;
- aset lokal;
- test terkait;
- dokumentasi PLAN-001A dan indeks plan.

### 8.2 Route

Route tetap:

```text
/
 /tentang
 /cara-kerja
 /sign-in
 *
```

Jangan menambah route baru.

### 8.3 Bukan Scope

PLAN-001A tidak mencakup:

- implementasi penuh halaman Tentang;
- implementasi penuh halaman Cara Kerja;
- halaman Layanan;
- halaman Kontak;
- halaman Proyek;
- portofolio;
- testimoni;
- statistik;
- form pengajuan;
- backend;
- API;
- database;
- autentikasi;
- role;
- permission;
- dashboard;
- deployment;
- SEO lanjutan;
- analytics;
- legalitas;
- konten bisnis yang belum disahkan;
- penghapusan `client/` atau `server/`.

---

## 9. Struktur Halaman yang Dipertahankan

Beranda mempertahankan tujuh section isi:

1. Hero;
2. Context;
3. Approach;
4. Workflow;
5. Publication Gate Layanan;
6. Principles;
7. Closing CTA.

Header dan footer tetap menjadi bagian shell global.

Urutan tersebut tidak boleh diubah tanpa persetujuan pemilik.

---

## 10. Spesifikasi Public Header

### 10.1 Struktur Desktop

Urutan:

```text
Brand lockup
→ Beranda
→ Tentang
→ Cara Kerja
→ Masuk
```

Aturan:

- brand di kiri;
- navigasi di kanan atau area tengah-kanan;
- `Masuk` boleh diberi treatment berbeda tetapi tidak boleh terlihat sebagai autentikasi aktif;
- sticky header boleh dipertahankan;
- background putih atau surface ringan;
- border bawah tipis;
- blur hanya sangat halus apabila dipakai;
- tidak perlu menambah scroll listener hanya untuk efek visual;
- active route memakai `aria-current="page"` dan indikator selain warna;
- ukuran header stabil;
- link tidak bertabrakan pada tablet.

### 10.2 Brand

Gunakan logo lokal dan teks:

```text
Rumahku Konstruksi
```

Teks tidak boleh diganti menjadi wordmark image.

### 10.3 Mobile

Behavior PLAN-001 wajib dipertahankan:

- tombol menu minimal 44 × 44 px;
- focus berpindah ke tombol tutup;
- focus trap;
- Escape menutup;
- focus kembali ke trigger;
- body scroll lock;
- background inert;
- drawer tertutup keluar dari tab order.

Perubahan PLAN-001A pada drawer hanya untuk:

- visual hierarchy;
- brand lockup;
- spacing;
- active state;
- surface dan border;
- alignment.

Jangan menulis ulang accessibility logic tanpa alasan.

---

## 11. Spesifikasi Hero

### 11.1 Layout

Desktop:

```text
copy group 55–60%
visual system 40–45%
```

Mobile:

```text
copy
actions
visual
```

Visual tidak boleh mendahului H1 pada urutan baca mobile.

### 11.2 Copy yang Wajib Dipertahankan

Eyebrow:

```text
Rumahku Konstruksi
```

H1:

```text
Pekerjaan konstruksi yang lebih terencana, terkendali, transparan, dan terdokumentasi.
```

Supporting copy:

```text
RKK membantu kebutuhan pembangunan dan renovasi dikelola melalui alur kerja yang lebih terstruktur, dengan informasi, pemeriksaan, pengendalian, dan dokumentasi yang disesuaikan dengan ruang lingkup pekerjaan.
```

Primary hold action:

```text
Ajukan Kebutuhan
```

Visible reason:

```text
Jalur pengajuan sedang disiapkan.
```

Secondary action:

```text
Pelajari Cara Kerja
```

Target:

```text
/cara-kerja
```

### 11.3 Hero Visual

Ganti empat kotak sederhana dengan visual sistem abstrak yang tidak mengklaim proyek nyata.

Konsep:

```text
Kebutuhan
→ Pemeriksaan
→ Pengendalian
→ Dokumentasi
```

Empat hasil/karakter tetap terlihat:

- Terencana;
- Terkendali;
- Transparan;
- Terdokumentasi.

Visual boleh menggunakan:

- panel utama;
- empat node;
- garis penghubung;
- small status label;
- icon abstrak sederhana;
- grid atau diagram ringan;
- CSS dan inline SVG;
- decorative elements dengan `aria-hidden="true"`.

Visual tidak boleh menggunakan:

- foto bangunan;
- foto pekerja;
- blueprint proyek nyata;
- angka progres;
- nilai anggaran;
- nama proyek;
- tanggal proyek;
- lokasi;
- data pelanggan;
- dashboard palsu;
- remote image.

---

## 12. Spesifikasi Section Context

Eyebrow yang disarankan:

```text
MENGAPA PERLU TERSTRUKTUR
```

Judul wajib:

```text
Pekerjaan konstruksi membutuhkan arah yang jelas sejak awal.
```

Intro wajib:

```text
Kebutuhan, keputusan, dan bukti pekerjaan perlu dikelola secara terstruktur agar setiap tahap mempunyai konteks yang dapat dipahami.
```

### 12.1 Copy Penguatan yang Diusulkan

Kartu 1:

```text
Judul:
Ruang lingkup perlu dipahami

Deskripsi:
Kebutuhan, detail, dan batas pekerjaan perlu dicatat agar pembahasan tidak kehilangan arah.
```

Kartu 2:

```text
Judul:
Keputusan perlu memiliki konteks

Deskripsi:
Perubahan, progres, dan kendala perlu disampaikan bersama alasan serta dampaknya.
```

Kartu 3:

```text
Judul:
Dokumen perlu mudah ditelusuri

Deskripsi:
Catatan dan bukti pekerjaan perlu disusun agar dapat ditemukan ketika dibutuhkan.
```

Copy pada bagian ini berstatus **usulan PLAN-001A** dan menjadi locked copy setelah disetujui pemilik.

### 12.2 Visual

Gunakan tiga card atau tiga column yang:

- mempunyai nomor atau icon ringan;
- tidak memakai statistik;
- tidak memakai alarmisme;
- tidak menggunakan kalimat negatif berlebihan;
- mempunyai tinggi visual yang seimbang;
- tetap menjadi satu column pada mobile.

---

## 13. Spesifikasi Section Approach

Eyebrow:

```text
PENDEKATAN RKK
```

Judul:

```text
Pendekatan yang membantu pekerjaan tetap memiliki arah.
```

Deskripsi yang diusulkan:

```text
RKK menggunakan empat prinsip untuk membantu kebutuhan, keputusan, informasi, dan bukti pekerjaan tetap berada dalam alur yang dapat dipahami.
```

Empat kartu:

### Terencana

```text
Kebutuhan, ruang lingkup, dan langkah kerja diarahkan sejak awal.
```

### Terkendali

```text
Status, keputusan, dan perubahan mempunyai konteks yang dapat ditelusuri.
```

### Transparan

```text
Informasi relevan disampaikan kepada pihak yang tepat sesuai kebutuhan.
```

### Terdokumentasi

```text
Catatan, bukti, dan versi dijaga agar proses dapat ditelusuri.
```

Visual:

- empat kartu;
- icon sederhana;
- satu aksen warna per card boleh memakai variasi tint token yang sama;
- tidak membuat empat gaya visual berbeda;
- hover tidak boleh dibutuhkan untuk memahami isi;
- tidak memakai klaim hasil pasti.

---

## 14. Spesifikasi Section Workflow

Eyebrow:

```text
GAMBARAN CARA KERJA
```

Judul yang diusulkan:

```text
Dari kebutuhan awal menuju tindak lanjut yang lebih tertata.
```

Empat tahap:

### 01 — Orientasi kebutuhan

```text
Memahami kebutuhan awal, konteks, dan informasi dasar.
```

### 02 — Pemeriksaan dan perencanaan

```text
Meninjau ruang lingkup dan menyiapkan arah pekerjaan.
```

### 03 — Pelaksanaan dan pengendalian

```text
Menjaga komunikasi, keputusan, perubahan, dan bukti pekerjaan.
```

### 04 — Dokumentasi dan tindak lanjut

```text
Merapikan catatan serta kebutuhan tindak lanjut sesuai ruang lingkup.
```

Notice:

```text
Tahapan ini merupakan gambaran ringkas. Detail proses akan dijelaskan pada halaman Cara Kerja setelah struktur dan ketentuannya siap dipublikasikan.
```

Action:

```text
Pelajari Cara Kerja
```

Target:

```text
/cara-kerja
```

Visual:

- timeline horizontal pada desktop;
- two-column pada tablet bila lebih stabil;
- vertical timeline pada mobile;
- connector bersifat dekoratif;
- nomor tahap tetap terbaca tanpa warna;
- tidak menyiratkan durasi atau SLA.

---

## 15. Spesifikasi Publication Gate Layanan

Bagian ini bukan daftar layanan dan bukan error state.

Eyebrow:

```text
INFORMASI LAYANAN
```

Judul yang diusulkan:

```text
Informasi layanan disiapkan secara bertahap sebelum dipublikasikan.
```

Deskripsi:

```text
RKK tidak menampilkan daftar layanan, harga, wilayah, jadwal, atau ketentuan yang belum memiliki sumber resmi. Informasi akan tersedia setelah ruang lingkup dan batasnya ditetapkan.
```

Label status:

```text
Konten sedang disiapkan
```

Aturan:

- tampil sebagai panel informatif;
- tidak menggunakan warning merah;
- tidak terlihat seperti aplikasi rusak;
- tidak menampilkan card layanan kosong;
- tidak menampilkan skeleton;
- tidak mempunyai CTA palsu;
- tidak mengarah ke `/layanan`;
- tidak memakai icon yang menyiratkan gangguan sistem.

---

## 16. Spesifikasi Section Principles

Eyebrow:

```text
TRANSPARANSI DAN DOKUMENTASI
```

Judul:

```text
Transparansi dibangun melalui informasi yang relevan dan dapat ditelusuri.
```

Intro yang diusulkan:

```text
Keterbukaan perlu berjalan bersama konteks, tanggung jawab, dan batas akses yang tepat.
```

Empat prinsip:

### Informasi relevan

```text
Informasi disampaikan sesuai kebutuhan dan pihak yang berkepentingan.
```

### Keputusan mempunyai konteks

```text
Perubahan dan keputusan penting perlu mempunyai alasan dan catatan yang jelas.
```

### Dokumen dapat ditelusuri

```text
Catatan dan bukti disusun agar mudah ditemukan ketika diperlukan.
```

### Batas akses tetap dijaga

```text
Transparansi tidak berarti membuka informasi yang bersifat rahasia atau tidak berhak diakses.
```

Visual:

- boleh berupa split layout;
- satu sisi copy utama;
- satu sisi empat principle rows;
- hindari empat card yang identik dengan section Approach agar halaman tidak monoton.

---

## 17. Spesifikasi Closing CTA

Judul:

```text
Mulai dari kebutuhan yang dipahami dengan jelas.
```

Deskripsi:

```text
Jalur pengajuan kebutuhan sedang disiapkan. Sementara itu, Anda dapat mempelajari pendekatan dan gambaran cara kerja RKK.
```

Primary hold action:

```text
Ajukan Kebutuhan
```

Reason:

```text
Jalur pengajuan sedang disiapkan.
```

Secondary:

```text
Pelajari Cara Kerja
```

Target:

```text
/cara-kerja
```

Visual:

- panel closing yang mempunyai kontras surface;
- bukan banner iklan;
- tidak menggunakan foto;
- hold reason tetap terlihat;
- kedua tindakan tidak bertabrakan pada mobile.

---

## 18. Spesifikasi Footer

Footer diperkuat tetapi tetap bebas data yang belum disahkan.

Struktur minimum:

```text
Brand lockup
Positioning pendek
Navigasi publik aktif
Copyright dinamis
```

Positioning pendek yang diusulkan:

```text
Pendekatan terstruktur untuk membantu kebutuhan konstruksi memiliki arah, konteks, dan dokumentasi yang lebih jelas.
```

Link yang diizinkan:

- Beranda → `/`;
- Tentang → `/tentang`;
- Cara Kerja → `/cara-kerja`;
- Masuk → `/sign-in`.

Dilarang menambahkan:

- alamat;
- nomor telepon;
- WhatsApp;
- email;
- sosial media;
- legal link palsu;
- kebijakan privasi palsu;
- syarat layanan palsu;
- newsletter;
- lokasi;
- jam operasional.

Footer dapat memakai layout dua zona atau dua/three-column sederhana. Jangan memaksakan empat column bila konten tidak tersedia.

---

## 19. Pemanfaatan Selektif Baseline Legacy

Folder legacy:

```text
client/**
```

Kedudukan:

```text
READ-ONLY REFERENCE
```

Gemini boleh membaca source legacy yang relevan dari repository lokal, tetapi tidak boleh mengubahnya.

### 19.1 Matriks Keputusan

| Elemen Legacy | Keputusan | Yang Boleh Diambil | Yang Wajib Ditolak |
|---|---|---|---|
| `MainLayout.jsx` | Referensi ringan | pola shell dan komposisi global | dependency dan struktur lama |
| `Navbar.jsx` | Refactor selektif | brand kiri, menu desktop, active underline, mobile overlay/drawer, treatment action kanan | remote Cloudinary logo, wordmark salah, route Layanan/Proyek/Kontak, login modal, role demo, `href="#"`, scroll animation berlebihan |
| `Home.jsx` | Pertahankan konsep composer | halaman tersusun dari section modular | urutan lama sebagai keputusan otomatis |
| `HeroSlider.jsx` | Tolak implementasi | gagasan komposisi hero dua area | slider, autoplay, arrows, dots, foto remote, klaim lama |
| `AboutSection.jsx` | Referensi layout | split section dan hierarchy | copy/fakta/statistik lama |
| `ServiceChoiceSection.jsx` | Referensi card layout terbatas | pola card/grid | daftar layanan dan route yang belum publish |
| `FeaturesSection.jsx` | Referensi hierarchy | pola icon + title + supporting copy | klaim fitur/kemampuan yang belum aktif |
| `PlanningSection.jsx` | Referensi split composition | alternating layout | foto stok dan klaim proses detail |
| `ImplementationSection.jsx` | Referensi split composition | ritme visual | progres, proyek, bukti, atau data palsu |
| `ClosingCTA.jsx` | Refactor selektif | komposisi closing CTA | wording lama dan CTA aktif palsu |
| Footer legacy | Referensi ringan | pemisahan brand, nav, copyright | kontak, sosial, legal, alamat, klaim, multi-column kosong |

### 19.2 Aturan Reuse

- jangan menyalin file legacy utuh;
- jangan mengimpor komponen legacy ke `apps/web`;
- jangan menambahkan Tailwind ke `apps/web`;
- jangan memindahkan dependency legacy;
- jangan menggunakan remote asset lama;
- jangan menggunakan ejaan brand dari legacy;
- jangan memakai copy legacy sebagai fakta;
- pola visual harus diterjemahkan ke CSS dan komponen aktif `apps/web`.

---

## 20. Struktur File yang Diizinkan

Perubahan utama diperkirakan pada:

```text
apps/web/src/assets/brand/rkk-mark.png
apps/web/src/components/public/PublicHeader.jsx
apps/web/src/components/public/MobileDrawer.jsx
apps/web/src/components/public/PublicFooter.jsx
apps/web/src/components/public/BrandLockup.jsx        [opsional]
apps/web/src/components/ui/*.jsx                      [hanya jika benar-benar reusable]
apps/web/src/content/home.js
apps/web/src/pages/HomePage.jsx
apps/web/src/sections/home/HomeHero.jsx
apps/web/src/sections/home/HomeContext.jsx
apps/web/src/sections/home/HomeApproach.jsx
apps/web/src/sections/home/HomeWorkflow.jsx
apps/web/src/sections/home/HomeServices.jsx
apps/web/src/sections/home/HomePrinciples.jsx
apps/web/src/sections/home/HomeClosingCTA.jsx
apps/web/src/styles/tokens.css                        [hanya bila diperlukan]
apps/web/src/styles/globals.css
apps/web/src/styles/shell.css
apps/web/src/styles/home.css
apps/web/src/test/app.test.jsx
docs/plan/PLAN-001A_PENGUATAN_KONTEN_DAN_PENYEMPURNAAN_VISUAL_BERANDA_RKK.md
docs/plan/README.md
```

Gemini boleh membuat komponen kecil baru di `apps/web/src/components/` atau `apps/web/src/sections/home/` apabila:

- mengurangi duplikasi;
- nama dan fungsinya jelas;
- tidak menambah abstraction berlebihan;
- perubahan dijelaskan dalam laporan.

Tidak perlu mengubah:

```text
apps/web/package.json
package-lock.json
```

Dependency baru dilarang kecuali plan direvisi dan disetujui pemilik.

---

## 21. Protected Area

Jangan mengubah:

```text
client/**
server/**
apps/backend/**
archive/**
database/**
README.md
FITUR.md
.env*
docs/plan/PLAN-000*
docs/plan/PLAN-002*
```

`client/**` hanya boleh dibaca sebagai referensi.

Jangan melakukan:

- branch baru;
- branch switch;
- merge;
- rebase;
- cherry-pick;
- reset;
- stash;
- clean;
- commit;
- push;
- pull request;
- deployment.

---

## 22. Urutan Implementasi

### Task 1 — Baseline Gate

Jalankan:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git log -5 --oneline --decorate
```

Lanjutkan hanya jika:

- branch `refactor/plan-001-public-ui-home`;
- HEAD sesuai base SHA final plan;
- working tree bersih.

Jika tidak sesuai, berhenti.

### Task 2 — Asset Gate

Pastikan file logo lokal tersedia pada paket eksekusi.

Salin ke target repository.

Verifikasi:

- PNG valid;
- transparan;
- bukan wordmark salah;
- tidak berasal dari remote URL.

Jika aset tidak tersedia, berhenti.

### Task 3 — Audit Cepat Baseline

Baca:

- PLAN-001 aktif;
- source `apps/web`;
- file legacy yang disebut pada matriks secara read-only.

Catat pola yang akan digunakan dan ditolak.

### Task 4 — Brand Lockup

Implementasikan brand lockup reusable apabila berguna.

Terapkan pada header, drawer, dan footer.

### Task 5 — Public Header dan Drawer

Sempurnakan visual tanpa merusak behavior accessibility.

### Task 6 — Hero

Perkuat layout, hierarchy, actions, dan system visual.

### Task 7 — Context dan Approach

Terapkan copy yang telah disetujui dan diferensiasi visual.

### Task 8 — Workflow

Terapkan timeline responsif tanpa klaim durasi.

### Task 9 — Publication Gate

Ubah menjadi informative content state yang matang.

### Task 10 — Principles

Gunakan layout yang berbeda dari Approach.

### Task 11 — Closing CTA dan Footer

Perkuat penutupan halaman tanpa CTA palsu atau data kosong.

### Task 12 — Styling dan Cleanup

Rapikan:

- typography;
- spacing;
- grid;
- backgrounds;
- borders;
- shadows;
- radius;
- responsive behavior;
- reduced motion.

Hapus CSS yang sudah tidak dipakai.

### Task 13 — Test

Pertahankan seluruh test PLAN-001 dan tambah bukti PLAN-001A.

### Task 14 — Dokumentasi

Tambahkan PLAN-001A final dan perbarui indeks plan sesuai hasil.

---

## 23. Responsive Requirements

Periksa minimum:

```text
390 × 844
768 × 1024
1024 × 768
1440 × 900
```

Pastikan:

- tidak ada horizontal overflow;
- header tetap stabil;
- brand lockup tidak terpotong;
- logo tidak terlalu kecil atau besar;
- hero urutan baca benar;
- actions tidak bertabrakan;
- system visual tidak rusak;
- cards tidak terlalu sempit;
- workflow berubah layout dengan wajar;
- publication gate tetap terbaca;
- footer tidak overflow;
- zoom 200% tidak menghilangkan fungsi;
- text wrapping tidak menghasilkan orphan yang merusak hierarchy;
- tidak ada section dengan ruang kosong berlebihan akibat fixed height.

Gunakan fluid sizing secara wajar. Hindari fixed height untuk konten utama.

---

## 24. Accessibility Requirements

PLAN-001A wajib mempertahankan:

- satu H1;
- heading hierarchy;
- landmarks;
- SkipLink;
- keyboard access;
- focus visible;
- focus trap drawer;
- Escape;
- focus return;
- body scroll lock;
- inert background;
- `aria-current="page"`;
- touch target minimum;
- reduced motion;
- warna bukan satu-satunya indikator.

Tambahan:

- logo mark decorative jika berdampingan dengan teks brand;
- inline SVG decorative memakai `aria-hidden="true"`;
- visual system tidak dibaca sebagai informasi berulang;
- hold action tetap dapat dipahami;
- icon tidak menjadi satu-satunya label;
- contrast tidak boleh menurun akibat polish visual;
- hover bukan satu-satunya cara memahami state.

---

## 25. Automated Test Minimum

Pertahankan test PLAN-001.

Tambahkan atau perbarui test untuk membuktikan:

1. brand lockup menampilkan teks `Rumahku Konstruksi`;
2. logo menggunakan local asset, bukan `http`, `https`, atau Cloudinary;
3. variasi brand salah tidak tampil;
4. H1 tetap sama;
5. secondary CTA tetap `/cara-kerja`;
6. primary action tetap hold action;
7. route matrix tidak berubah;
8. header dan footer hanya memakai route yang diizinkan;
9. tidak ada `/layanan`, `/kontak`, atau `/proyek` pada nav aktif;
10. tidak ada slider, autoplay, arrows, atau dots;
11. tidak ada role demo atau login simulasi;
12. satu H1;
13. drawer accessibility regression tetap lulus;
14. section utama tetap dirender;
15. publication gate tidak mempunyai link palsu;
16. tidak ada remote image pada Beranda dan shell publik.

Test harus membuktikan behavior atau output penting, bukan hanya class implementation.

---

## 26. Validasi Wajib

Jalankan:

```bash
npm run test --workspace apps/web
npm run lint --workspace apps/web
npm run build --workspace apps/web
npm run dev --workspace apps/web -- --host 127.0.0.1
```

Periksa route:

```text
/
 /tentang
 /cara-kerja
 /sign-in
 /route-tidak-dikenal
```

Periksa manual:

- desktop;
- tablet;
- mobile;
- zoom 200%;
- keyboard;
- focus;
- drawer;
- reduced motion;
- no horizontal overflow;
- logo rendering;
- no broken image;
- no layout shift mencolok;
- no remote asset request untuk hero/header/footer;
- no inaccessible hover-only state.

Hentikan dev server setelah pemeriksaan.

Jalankan:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Pencarian minimum:

```bash
git grep -n "RumahKuKontruksi" -- apps/web
git grep -n "RUMAHKUKONTRUKSI" -- apps/web
git grep -n "Rumahku Kontruksi" -- apps/web
git grep -n "Cloudinary" -- apps/web
git grep -n "cloudinary" -- apps/web
git grep -n "HeroSlider" -- apps/web
git grep -n "autoplay" -- apps/web
git grep -n 'href="#"' -- apps/web
git grep -n "role demo" -- apps/web
git grep -n "login simulasi" -- apps/web
git grep -n 'to="/layanan"' -- apps/web
git grep -n 'to="/kontak"' -- apps/web
git grep -n 'to="/proyek"' -- apps/web
```

Temuan harus kosong atau dijelaskan jika hanya muncul dalam test negatif.

---

## 27. Acceptance Criteria

### Baseline dan Scope

- [x] branch dan base SHA benar;
- [x] working tree awal bersih;
- [x] tetap satu branch;
- [x] PLAN-002 tidak disentuh;
- [x] protected area tidak berubah;
- [x] tidak ada dependency baru;
- [x] perubahan hanya dalam scope PLAN-001A.

### Brand

- [x] logo lokal tersedia dan digunakan;
- [x] tidak ada remote logo;
- [x] tidak ada wordmark salah;
- [x] teks HTML `Rumahku Konstruksi` tetap tersedia;
- [x] brand lockup responsif;
- [x] brand accessible.

### Header dan Footer

- [x] header lebih matang secara visual;
- [x] nav tetap sesuai route matrix;
- [x] active state semantic dan visual;
- [x] drawer behavior tidak regresi;
- [x] footer bebas placeholder dan data palsu;
- [x] tidak ada link mati.

### Hero

- [x] H1 tetap;
- [x] copy tetap sesuai keputusan;
- [x] primary action tetap hold;
- [x] secondary action benar;
- [x] visual tidak memakai foto atau data palsu;
- [x] visual system tidak terasa seperti empat placeholder box;
- [x] hero stabil pada mobile dan desktop.

### Content Strengthening

- [x] copy Context disetujui diterapkan;
- [x] copy Approach disetujui diterapkan;
- [x] workflow jelas;
- [x] publication gate informatif;
- [x] Principles berbeda secara visual dari Approach;
- [x] closing CTA kuat tetapi jujur;
- [x] seluruh copy berada pada content layer.

### Visual System

- [x] section rhythm konsisten;
- [x] typography hierarchy jelas;
- [x] whitespace tidak berlebihan;
- [x] card treatment konsisten;
- [x] shadow dan radius tidak berlebihan;
- [x] tidak ada visual remote;
- [x] tidak ada autoplay atau carousel;
- [x] tidak ada dependency UI baru.

### Legacy Reuse

- [x] `client/**` tidak berubah;
- [x] pola legacy yang dipakai dicatat;
- [x] pola legacy yang dilarang tidak masuk;
- [x] tidak ada import dari `client/**`;
- [x] tidak ada copy/fakta legacy yang diterbitkan.

### Responsive dan Accessibility

- [x] viewport wajib diperiksa;
- [x] no horizontal overflow;
- [x] touch target minimum;
- [x] keyboard;
- [x] focus visible;
- [x] drawer focus management;
- [x] heading dan landmark;
- [x] reduced motion;
- [x] zoom 200%;
- [x] tidak ada masalah accessibility kritis yang ditemukan.

### Validasi

- [x] test lulus;
- [x] lint lulus;
- [x] build lulus;
- [x] dev server lulus;
- [x] route manual lulus;
- [x] `git diff --check` bersih;
- [x] laporan lengkap;
- [x] Gemini tidak commit/push/PR.

---

## 28. Format Laporan Gemini

### A. Baseline

- repository;
- branch;
- HEAD;
- working tree awal;
- base PLAN-001A;
- ketersediaan logo lokal.

### B. Legacy Audit

- file legacy yang dibaca;
- pola yang dipakai;
- pola yang ditolak;
- konfirmasi `client/**` tidak berubah.

### C. Implementasi

- asset;
- brand lockup;
- header;
- drawer;
- footer;
- hero;
- Context;
- Approach;
- Workflow;
- publication gate;
- Principles;
- Closing CTA;
- content layer;
- styling;
- test.

### D. Validasi

- test dan jumlah test;
- lint;
- build;
- dev server;
- route;
- viewport;
- keyboard;
- focus;
- drawer;
- zoom;
- reduced motion;
- remote asset check;
- `git diff --check`.

### E. Temuan dan Batas

- blocker;
- deviasi;
- item belum selesai;
- risiko regresi;
- copy yang tidak diterapkan;
- aset yang bermasalah;
- keputusan yang masih diperlukan.

### F. Kondisi Akhir

- status PLAN-001A;
- `git status --short`;
- `git diff --stat`;
- daftar file;
- protected area;
- PLAN-002;
- konfirmasi tidak branch baru;
- konfirmasi tidak commit;
- konfirmasi tidak push;
- konfirmasi tidak merge/PR.

---

## 29. Status Setelah Eksekusi

Jika seluruh acceptance criteria lulus, status maksimum:

```text
PLAN-001A — SIAP AUDIT IMPLEMENTASI
```

Gemini tidak boleh menulis:

- selesai;
- final;
- terverifikasi;
- ditutup;
- production ready.

Status `TERVERIFIKASI` hanya boleh ditetapkan setelah:

1. laporan Gemini diperiksa Room 3;
2. pemilik melakukan commit dan push;
3. SHA terbaru diaudit;
4. hasil audit diterima.

---

## 30. Keputusan yang Disetujui Pemilik

Pemilik telah membaca dan menyetujui keputusan berikut:

- [x] judul PLAN-001A;
- [x] tetap menggunakan branch `refactor/plan-001-public-ui-home`;
- [x] base SHA `8334f6dbc053a3a2cbc165f8d29f4b2f755cd258`;
- [x] penggunaan logo mark lokal + teks HTML;
- [x] konsep hero system visual tanpa foto;
- [x] copy penguatan Context;
- [x] copy penguatan Approach;
- [x] judul Workflow;
- [x] wording publication gate;
- [x] intro Principles;
- [x] positioning pendek Footer;
- [x] matriks reuse legacy;
- [x] batas scope dan protected area;
- [x] acceptance criteria.

---

## 31. Keterlacakan Sumber untuk Pemilik dan Audit

Bagian ini bukan instruksi bagi Gemini untuk membuka Drive.

Sumber keputusan yang telah diterjemahkan:

- T00-F00 — Panduan Room 3 Teknis dan GitHub RKK;
- T00-F03 — Tata Kerja Refactor dan Implementasi Teknis RKK;
- B01.1-F01 — Identitas dan Profil Perusahaan RKK;
- B01.2-F02 — Nilai Inti dan DNA Perusahaan RKK;
- B02.1-F01 — Positioning Perusahaan RKK;
- B02.2-F01 — Analisis Pasar dan Pelanggan RKK;
- P01-F01 — Visi Prinsip dan Batas Produk Digital RKK;
- P07-F01 — Audit Baseline UI UX GitHub RKK;
- P07-F02 — Prinsip Pengalaman dan Arah Visual Produk RKK;
- P07-F03 — Design Token dan Fondasi Visual RKK;
- P07-F06 — Responsif Aksesibilitas dan Content Design RKK;
- P07.1-F01 — Audit UI Website Publik pada GitHub RKK;
- P07.1-F02 — User Journey Navigasi dan UX Minimum Website Publik RKK;
- P07.1-F03 — Sistem UI Shell Website Publik RKK;
- P07.1-F04 — Blueprint dan Spesifikasi UI Halaman Website Publik RKK;
- HOM-01 — Spesifikasi Halaman Beranda RKK;
- HOM-03 — Daftar Referensi Halaman Beranda RKK;
- HOM-04 — Wireframe Halaman Beranda RKK;
- HOM-05 — Spesifikasi Komponen UI Beranda RKK;
- GitHub PLAN-001 pada SHA audit;
- GitHub baseline legacy `client/**` sebagai referensi read-only;
- aset lokal `RKK-logo.png`.

---

## 32. Catatan Penutup

PLAN-001A tidak dimaksudkan untuk memperbanyak fitur. Fokusnya adalah membuat baseline publik PLAN-001 terasa utuh, jelas, profesional, dan sesuai identitas RKK tanpa mendahului kesiapan data bisnis.

Prinsip penutup:

```text
perkuat yang sudah benar
rapikan yang masih terasa seperti baseline
gunakan legacy hanya sebagai referensi pola
jangan mengisi kekosongan dengan klaim
jangan menukar kejujuran publikasi dengan kepadatan visual
```

---

## 33. Laporan Implementasi dan Koreksi Audit

- **Base SHA PLAN-001A:** `8334f6dbc053a3a2cbc165f8d29f4b2f755cd258`
- **Implementation SHA Awal:** `975f9dd1c9f7d683b12554d452f746f2307f8f29`
- **Temuan Audit Room 3:** Perlu perbaikan index README, penyesuaian teks Workflow, koreksi hierarchy konten Hero visual menjadi stage dan outcome, penambahan numeric marker untuk Context, penambahan icon marker untuk Approach.
- **Koreksi Hero:** Mengubah bentuk visualNodes menjadi objek stage (Kebutuhan, Pemeriksaan, Pengendalian, Dokumentasi) dan outcome (Terencana, Terkendali, Transparan, Terdokumentasi). Garis penghubung memakai CSS Flexbox vertikal untuk mobile dan horizontal (serta centering text) untuk desktop. Dead SVG dan `display: none` dihapus.
- **Koreksi Workflow:** Memperbarui prop string `notice` pada konten menjadi `Tahapan ini merupakan gambaran ringkas. Detail proses akan dijelaskan pada halaman Cara Kerja setelah struktur dan ketentuannya siap dipublikasikan.`
- **Marker Context:** Menambahkan prop `marker` dengan prefix `0` (`01`, `02`, `03`) dan styling khusus via `InfoCard`.
- **Icon Approach:** Menambahkan prop `icon` berupa inline SVG (tanda panah chevron sederhana) di `HomeApproach.jsx` dan styling di `InfoCard`.
- **Pembaruan Indeks Plan:** Telah memperbarui `README.md` pada direktori plan sesuai hasil saat ini.
- **Hasil Test:** Lulus. 1 test suite, 9 pass. Tambahan assertion marker/icon, Hero stage/outcome, dan notis tercantum.
- **Hasil Lint:** Lulus. 0 warnings, 0 errors.
- **Hasil Build:** Lulus. Assets tersusun tanpa isu bundler.
- **Hasil Browser Verification:** Telah dilakukan uji manual. Diagram sistem pada desktop menyelaraskan node ke form horizontal secara rapi, tetap vertikal pada 390x844. Marker 01-03 pada konteks terlihat tanpa mendistorsi spacing. Icon Approach tampak kontras dan konsisten. Sidebar berfungsi dan responsive aman (no horizontal scroll bar).
- **File Yang Berubah:** `docs/plan/README.md`, `apps/web/src/content/home.js`, `apps/web/src/components/ui/InfoCard.jsx`, `apps/web/src/sections/home/HomeContext.jsx`, `apps/web/src/sections/home/HomeApproach.jsx`, `apps/web/src/sections/home/HomeHero.jsx`, `apps/web/src/styles/home.css`, `apps/web/src/test/app.test.jsx`.
- **Blocker dan Deviasi:** Tidak ada blocker. Deviasi: Penghapusan total code dead SVG karena pure CSS layout diagram lebih stabil.
- **Status Akhir:** `PLAN-001A — SIAP AUDIT IMPLEMENTASI`

## 34. Hasil Audit Final Room 3

- **Keputusan:** DITERIMA — KOREKSI AUDIT PLAN-001A TERVERIFIKASI
- **Base SHA:** `8334f6dbc053a3a2cbc165f8d29f4b2f755cd258`
- **Implementation SHA Awal:** `975f9dd1c9f7d683b12554d452f746f2307f8f29`
- **Final Audit SHA:** `365ba31ae0e231ae1f4786ac1baf198b88a6ae60`
- **Status:** PLAN-001A — IMPLEMENTASI TERVERIFIKASI
- **Hasil:** Penguatan konten, identitas brand lokal, penyempurnaan visual Beranda, responsive behavior, accessibility, dan koreksi audit telah diterima.
- **Blocker:** Tidak ada.
- **Deviasi yang Diterima:** Connector Hero menggunakan CSS, bukan SVG, karena lebih stabil untuk perubahan layout mobile dan desktop.
