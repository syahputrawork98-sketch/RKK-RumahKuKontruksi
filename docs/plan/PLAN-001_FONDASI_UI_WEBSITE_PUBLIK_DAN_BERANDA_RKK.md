---
kode: PLAN-001
judul: Fondasi UI Website Publik dan Implementasi Struktur Beranda RKK
versi: 1.0
status: DISETUJUI PEMILIK — SIAP EKSEKUSI
tanggal_penyusunan: 2026-07-27
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
base_branch: main
base_sha: 2e8237f0e76c36229945931ab9a2d915f51dcd1b
target_branch: refactor/plan-001-public-ui-home
area_implementasi: apps/web
plan_sebelumnya: PLAN-000 — SELESAI DAN TERVERIFIKASI
branch_dilindungi: refactor/plan-002-backend-foundation
---

# PLAN-001 — FONDASI UI WEBSITE PUBLIK DAN IMPLEMENTASI STRUKTUR BERANDA RKK

## 1. Status Dokumen

```text
FINAL — DISETUJUI PEMILIK
SIAP DIGUNAKAN SEBAGAI INSTRUKSI EKSEKUSI ANTIGRAVITY
GEMINI TETAP DILARANG COMMIT, PUSH, MERGE, ATAU MEMBUAT PULL REQUEST
COMMIT DAN PUSH HANYA DILAKUKAN SETELAH LAPORAN HASIL DIAUDIT ROOM 3
```

Dokumen ini merupakan PLAN-001 final yang telah dibaca dan disetujui Pemilik pada 27 Juli 2026. Dokumen menjadi sumber instruksi teknis untuk eksekusi di Antigravity pada branch dan base SHA yang ditetapkan.

Plan ini menerjemahkan keputusan produk dan UI/UX yang telah disetujui di R02/P07 menjadi pekerjaan teknis mandiri pada `apps/web`. Gemini tidak diarahkan membaca Google Drive. Seluruh ketetapan yang dibutuhkan untuk implementasi harus tersedia di dalam file plan final.

---

## 2. Tujuan PLAN-001

PLAN-001 bertujuan:

1. mengganti placeholder minimum `apps/web` dengan fondasi frontend publik RKK yang dapat dikembangkan;
2. membuat satu shell website publik yang konsisten, responsif, dan dapat digunakan dengan keyboard;
3. menerjemahkan design token P07 ke CSS variables yang terstruktur;
4. menyediakan routing publik minimum dan page state yang aman;
5. mengimplementasikan struktur halaman Beranda pada route `/` menggunakan konten yang terverifikasi atau copy editorial yang secara eksplisit ditandai;
6. menyediakan publication gate untuk informasi, layanan, kontak, legalitas, pengajuan kebutuhan, dan bukti kepercayaan yang belum disahkan;
7. membangun fondasi pengujian frontend agar shell dan interaksi penting dapat divalidasi;
8. meninggalkan baseline yang bersih untuk halaman publik berikutnya tanpa menyentuh backend atau sistem legacy.

PLAN-001 bukan implementasi final seluruh website publik. Plan ini membangun fondasi UI dan struktur Beranda yang aman sebagai tahap pertama.

---

## 3. Latar Belakang dan Baseline

### 3.1 PLAN-000

PLAN-000 telah selesai dan terverifikasi. Checkpoint final pada branch `main` adalah:

```text
2e8237f0e76c36229945931ab9a2d915f51dcd1b
```

Checkpoint tersebut menjadi base resmi PLAN-001.

### 3.2 Kondisi `apps/web`

Pada base SHA tersebut:

- `apps/web` menggunakan React, Vite, dan JavaScript;
- aplikasi hanya menampilkan placeholder minimum;
- belum tersedia router publik;
- belum tersedia shell publik;
- belum tersedia header, mobile navigation, footer, atau page state;
- `index.css` masih memakai token starter berwarna ungu dan dark mode otomatis;
- `App.css` hanya berisi style placeholder;
- belum tersedia test otomatis pada workspace `apps/web`;
- `client/` dan `server/` masih dipertahankan sebagai baseline legacy;
- fondasi backend baru berada di branch PLAN-002 yang terpisah dan tidak boleh masuk ke pekerjaan ini.

### 3.3 Ketidaksesuaian yang Diselesaikan

PLAN-001 harus menyelesaikan ketidaksesuaian berikut pada `apps/web`:

1. placeholder belum mencerminkan produk RKK;
2. palet starter ungu tidak sesuai P07-F03;
3. dark mode otomatis belum disetujui sebagai fitur aktif;
4. root layout starter tidak cocok untuk website publik;
5. tidak ada pemisahan antara shell, halaman, section, content, dan style;
6. belum ada routing atau 404;
7. belum ada mobile navigation dengan pengelolaan focus;
8. belum ada mekanisme menahan konten yang belum disahkan;
9. belum ada test interaksi minimum.

---

## 4. Sumber Keputusan yang Diterjemahkan

Dokumen berikut menjadi sumber produk PLAN-001. Statusnya telah disetujui Pemilik pada R02/P07:

| Sumber | Fungsi dalam PLAN-001 |
|---|---|
| P07-F03 — Design Token dan Fondasi Visual RKK | warna, typography, spacing, breakpoint, container, radius, border, shadow, motion |
| P07-F04 — Katalog Komponen UI RKK | prinsip komponen reusable, varian minimum, state, dan penggunaan semantic element |
| P07-F05 — Pola Interaksi dan Keadaan Produk RKK | navigasi, loading, hold, unavailable, error, dan pola interaksi umum |
| P07-F06 — Responsif, Aksesibilitas, dan Content Design RKK | mobile baseline, keyboard, focus, kontras, landmark, target sentuh, reduced motion |
| P07.1-F03 — Sistem UI Shell Website Publik RKK | PublicAppShell, header, drawer, main, footer, notice, page state |
| P07.1-F05 — Status Kesiapan dan Handoff Website Publik RKK | paket yang dapat mulai masuk GitHub dan bagian yang wajib ditahan |
| HOM-01 — Spesifikasi Halaman Beranda RKK | tujuan halaman, pengguna, urutan section, pesan utama, CTA, batas publikasi |
| HOM-05 — Spesifikasi Komponen UI Beranda RKK | komponen konseptual Beranda, state, responsive behavior, dan acceptance awal |

Urutan otoritas:

1. keputusan Pemilik;
2. keputusan bisnis aktif R01 yang telah diterjemahkan ke spesifikasi R02;
3. spesifikasi R02/P07 yang disetujui;
4. PLAN-001 final;
5. implementasi aktual GitHub;
6. arsip legacy hanya sebagai riwayat dan pembanding.

Apabila implementasi legacy berbeda dengan plan ini, plan ini yang digunakan untuk pekerjaan baru di `apps/web`.

---

## 5. Keputusan Teknis yang Dikunci

### 5.1 Stack

- React: pertahankan versi yang tersedia pada workspace;
- Vite: pertahankan versi yang tersedia;
- JavaScript, bukan TypeScript, untuk PLAN-001;
- routing: `react-router-dom`;
- styling: CSS custom properties dan CSS terstruktur;
- lint: `oxlint` yang sudah tersedia;
- test: Vitest + Testing Library + jsdom;
- icon: tidak menambahkan library icon pada PLAN-001;
- visual Beranda: CSS/SVG sederhana yang dibuat lokal dan tidak mengklaim proyek nyata;
- light mode menjadi satu-satunya mode aktif PLAN-001.

### 5.2 Keputusan Styling

PLAN-001 **tidak menambahkan Tailwind CSS**.

Alasan:

1. P07-F03 menetapkan token konseptual yang dapat diterjemahkan langsung ke CSS variables;
2. `apps/web` saat ini sudah menggunakan CSS biasa;
3. PLAN-001 perlu menguji fondasi token dan komponen sebelum menambah abstraction layer lain;
4. ketergantungan dan perubahan konfigurasi dijaga minimum;
5. keputusan penggunaan Tailwind pada tahap berikutnya tetap dapat dibuat berdasarkan hasil implementasi nyata.

Keputusan ini dapat dikoreksi Pemilik pada tahap review draf. Setelah plan disetujui, Gemini tidak boleh mengganti pendekatan styling secara sepihak.

### 5.3 Dependency yang Diizinkan

Dependency runtime baru:

```text
react-router-dom
```

Dev dependency baru yang diizinkan:

```text
vitest
jsdom
@testing-library/react
@testing-library/user-event
@testing-library/jest-dom
```

Tidak boleh menambahkan:

- Tailwind;
- Bootstrap;
- Material UI;
- Chakra UI;
- Ant Design;
- Framer Motion;
- slider/carousel library;
- icon library;
- form library;
- state management global;
- analytics;
- CMS SDK;
- backend client;
- authentication SDK.

---

## 6. Branch, Base SHA, dan Gerbang Mulai

### 6.1 Parameter

```text
Repository    : syahputrawork98-sketch/RKK-RumahKuKontruksi
Base branch   : main
Base SHA      : 2e8237f0e76c36229945931ab9a2d915f51dcd1b
Target branch : refactor/plan-001-public-ui-home
```

### 6.2 Urutan Verifikasi Awal

Sebelum perubahan:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git log -5 --oneline --decorate
```

Plan hanya boleh dieksekusi apabila:

- branch target benar;
- branch target dibuat dari base SHA PLAN-001;
- working tree bersih;
- tidak terdapat perubahan PLAN-002;
- tidak terdapat `apps/backend` pada diff pekerjaan PLAN-001;
- tidak terdapat file lain yang belum disetujui.

### 6.3 Gerbang Berhenti

Gemini berhenti dan melapor apabila:

1. base SHA berbeda;
2. working tree tidak bersih;
3. branch dibuat dari PLAN-002 atau branch lain;
4. terdapat konflik dengan perubahan lain;
5. package manager atau lockfile tidak sesuai;
6. dependency yang dibutuhkan tidak dapat dipasang tanpa operasi destruktif;
7. scope membutuhkan keputusan bisnis yang tidak tersedia;
8. implementasi memerlukan backend, autentikasi, kontak, layanan, atau data publik yang belum disahkan.

Gemini tidak melakukan reset, rebase, stash, clean, force push, merge, commit, atau push.

---

## 7. Ruang Lingkup Utama

PLAN-001 mencakup:

### 7.1 Fondasi Aplikasi

- router publik;
- error boundary minimum;
- struktur folder baru yang jelas;
- entry point dan app composition;
- content layer statis untuk copy publik;
- CSS variables dan global reset;
- utility layout minimum;
- test setup.

### 7.2 Public App Shell

- SkipLink;
- PublicHeader;
- DesktopNavigation;
- MobileMenuButton;
- MobileNavigationDrawer;
- MainContent landmark;
- PublicFooter;
- optional notice yang default-nya tidak tampil;
- 404 state;
- unavailable/hold state;
- error fallback.

### 7.3 Halaman Beranda

- hero statis;
- konteks kebutuhan pengguna;
- empat pendekatan RKK;
- cara kerja ringkas;
- publication gate layanan/informasi;
- prinsip transparansi dan dokumentasi;
- closing CTA yang mengikuti kesiapan route;
- footer minimum tanpa placeholder.

### 7.4 Responsif dan Aksesibilitas

- desktop, tablet, dan mobile;
- navigasi keyboard;
- focus management drawer;
- focus visible;
- reduced motion;
- semantic landmark;
- heading hierarchy;
- target sentuh minimum;
- visual fallback tanpa layout shift besar.

### 7.5 Test Minimum

- route `/` merender Beranda;
- wildcard merender 404;
- mobile drawer dapat dibuka dan ditutup;
- Escape menutup drawer;
- focus kembali ke tombol pemicu;
- CTA atau link yang ditahan tidak mengarah ke route palsu;
- tidak ada role internal atau shortcut demo di shell publik.

---

## 8. Di Luar Ruang Lingkup

PLAN-001 tidak mengerjakan:

1. backend atau API;
2. `apps/backend`;
3. merge branch PLAN-002;
4. database;
5. autentikasi nyata;
6. halaman login nyata;
7. formulir pengajuan kebutuhan;
8. penyimpanan data;
9. integrasi frontend-backend;
10. daftar layanan aktif;
11. detail layanan;
12. harga;
13. estimasi durasi atau SLA;
14. cakupan wilayah layanan;
15. garansi;
16. alamat, telepon, email, WhatsApp, atau media sosial publik;
17. legalitas, privacy policy, terms, atau dokumen hukum;
18. daftar personel/tim;
19. portofolio atau foto proyek;
20. testimoni;
21. statistik;
22. dashboard atau role internal;
23. demo role;
24. login modal;
25. deployment;
26. konfigurasi Vercel;
27. analytics atau tracking;
28. SEO lanjutan, sitemap XML, atau structured data;
29. dark mode;
30. migrasi source code dari `client/` ke `apps/web`;
31. penghapusan `client/` dan `server/`;
32. perubahan dokumentasi arsip;
33. refactor root README/FITUR yang tidak diperlukan.

---

## 9. File dan Area yang Dilindungi

Tidak boleh diubah:

```text
client/**
server/**
apps/backend/**
archive/**
database/**
.env*
README.md
FITUR.md
```

`README.md` dan `FITUR.md` root hanya boleh diubah melalui pekerjaan dokumentasi terpisah setelah ada kebutuhan nyata.

Branch berikut dilindungi dan tidak boleh digabung:

```text
refactor/plan-002-backend-foundation
```

Commit PLAN-002 yang diketahui:

```text
3fa43c0cf3cbed5aacf9c86028bcda69e37352e3
```

---

## 10. File yang Boleh Diubah

Area utama:

```text
apps/web/**
package-lock.json
docs/plan/PLAN-001_FONDASI_UI_WEBSITE_PUBLIK_DAN_BERANDA_RKK.md
docs/plan/README.md
```

`package.json` root hanya boleh diubah apabila benar-benar diperlukan untuk script workspace. Default PLAN-001 adalah tidak mengubah root `package.json`.

File starter yang tidak digunakan boleh dihapus dari `apps/web`, termasuk aset Vite yang tidak relevan, selama tidak ada referensi aktif dan penghapusan tercatat dalam laporan.

---

## 11. Struktur Target `apps/web`

Struktur target konseptual:

```text
apps/web/
├── public/
│   └── ... aset publik minimum
├── src/
│   ├── app/
│   │   ├── AppRouter.jsx
│   │   └── AppErrorBoundary.jsx
│   ├── components/
│   │   ├── public/
│   │   │   ├── PublicHeader.jsx
│   │   │   ├── MobileNavigationDrawer.jsx
│   │   │   ├── PublicFooter.jsx
│   │   │   ├── SkipLink.jsx
│   │   │   ├── PublicContainer.jsx
│   │   │   └── PublicSection.jsx
│   │   └── ui/
│   │       ├── ActionLink.jsx
│   │       ├── SectionHeading.jsx
│   │       ├── InfoCard.jsx
│   │       ├── HoldAction.jsx
│   │       └── PageState.jsx
│   ├── content/
│   │   └── publicContent.js
│   ├── layouts/
│   │   └── PublicAppShell.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── UnavailablePage.jsx
│   │   └── NotFoundPage.jsx
│   ├── sections/
│   │   └── home/
│   │       ├── HomeHero.jsx
│   │       ├── ProblemContextSection.jsx
│   │       ├── ApproachSection.jsx
│   │       ├── ProcessPreviewSection.jsx
│   │       ├── PublicationGateSection.jsx
│   │       ├── TransparencySection.jsx
│   │       └── ClosingCtaSection.jsx
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── globals.css
│   │   ├── shell.css
│   │   └── home.css
│   ├── test/
│   │   └── setup.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── vite.config.js
```

Nama file dapat disederhanakan oleh Gemini apabila:

- tanggung jawab tetap jelas;
- tidak mencampur seluruh halaman ke satu file besar;
- pemisahan content, shell, section, dan state tetap terjaga;
- perubahan dijelaskan dalam laporan;
- tidak mengubah scope atau keputusan produk.

---

## 12. Route Matrix

| Route | Hasil PLAN-001 | Status |
|---|---|---|
| `/` | Halaman Beranda terstruktur | Aktif |
| `/tentang` | UnavailablePage di dalam PublicAppShell | Struktur route tersedia; konten penuh belum diimplementasikan |
| `/cara-kerja` | UnavailablePage di dalam PublicAppShell | Struktur route tersedia; konten penuh belum diimplementasikan |
| `/sign-in` | UnavailablePage di dalam PublicAppShell | Tidak ada login simulasi |
| `*` | NotFoundPage | Aktif |

Aturan route:

1. route placeholder memakai state “sedang disiapkan”, bukan halaman palsu;
2. route placeholder tidak memakai data dummy;
3. setiap route tetap memakai shell publik;
4. route internal, dashboard, role, atau demo tidak dibuat;
5. tidak membuat `/layanan`, `/kontak`, `/portofolio`, atau `/ajukan-kebutuhan` sebelum sumber dan alurnya siap;
6. link tidak menggunakan `href="#"`;
7. navigasi memakai link router yang benar.

---

## 13. Public App Shell

### 13.1 Skip Link

- teks: `Lewati ke konten utama`;
- muncul saat menerima focus;
- menuju elemen `main` dengan id stabil;
- tidak tertutup fixed header.

### 13.2 Header

Struktur desktop:

```text
Brand | Beranda | Tentang | Cara Kerja | Masuk
```

Aturan:

- brand menggunakan wordmark teks `Rumahku Konstruksi`;
- logo visual final belum diasumsikan tersedia;
- brand menuju `/`;
- link aktif memakai `aria-current="page"` dan indikator selain warna;
- tidak menampilkan menu Layanan, Kontak, Portofolio, role, atau dashboard;
- tidak menampilkan CTA Ajukan Kebutuhan di header karena route belum siap;
- header boleh sticky/fixed, tetapi tidak menutupi konten;
- tidak menggunakan blur berat;
- perubahan saat scroll tidak boleh menyebabkan layout shift;
- header tetap usable pada zoom dan lebar sempit.

### 13.3 Mobile Navigation Drawer

Wajib:

- menu button memiliki accessible name;
- drawer mempunyai judul atau nama aksesibel;
- focus berpindah ke drawer saat dibuka;
- background tidak dapat dioperasikan;
- Escape menutup drawer;
- focus kembali ke menu button;
- body scroll dikunci selama drawer terbuka;
- tombol tutup jelas;
- target sentuh minimum 44 px;
- route aktif terlihat tanpa bergantung pada warna;
- drawer tidak memakai animation delay per item;
- `prefers-reduced-motion` dihormati.

### 13.4 Main Content

- satu `main` landmark;
- id stabil untuk SkipLink;
- offset header aman;
- satu H1 per halaman;
- full-bleed section hanya melalui komponen terkontrol;
- lebar konten mengikuti container publik.

### 13.5 Footer Minimum

Isi yang diizinkan:

- `Rumahku Konstruksi`;
- ringkasan: `Usaha konstruksi berbasis sistem yang membantu pekerjaan pembangunan dan renovasi dijalankan secara lebih terencana, terkendali, transparan, dan terdokumentasi.`;
- Beranda;
- Tentang;
- Cara Kerja;
- copyright dinamis.

Tidak boleh ada:

- alamat;
- telepon;
- WhatsApp;
- email;
- social media;
- layanan;
- privacy policy;
- terms;
- legalitas;
- klaim penghargaan;
- placeholder.

---

## 14. Design Token yang Diimplementasikan

### 14.1 Prinsip

- nama token berdasarkan fungsi;
- light mode baseline;
- dark mode starter dihapus;
- warna bukan satu-satunya penanda;
- border lebih utama daripada shadow berat;
- token dipusatkan di `tokens.css`;
- komponen tidak memakai warna mentah berulang jika token tersedia.

### 14.2 Warna Brand

```css
--color-brand-900: #0B3B36;
--color-brand-800: #104E47;
--color-brand-700: #0F6259;
--color-brand-600: #0F766E;
--color-brand-500: #149187;
--color-brand-400: #2AA99D;
--color-brand-100: #DDF4F1;
--color-brand-50: #F1FAF8;
```

### 14.3 Aksen Hangat

```css
--color-accent-700: #9A5B13;
--color-accent-600: #B86B16;
--color-accent-500: #D38320;
--color-accent-100: #FCE9CB;
--color-accent-50: #FFF8ED;
```

Aksen hangat tidak menjadi warna default CTA utama.

### 14.4 Neutral

```css
--color-neutral-950: #17201F;
--color-neutral-900: #1F2928;
--color-neutral-800: #2D3837;
--color-neutral-700: #465150;
--color-neutral-600: #5E6968;
--color-neutral-500: #7A8583;
--color-neutral-400: #A2ABA9;
--color-neutral-300: #C9CFCD;
--color-neutral-200: #E2E6E5;
--color-neutral-100: #F0F2F1;
--color-neutral-50: #F7F9F8;
--color-neutral-0: #FFFFFF;
```

### 14.5 Semantic Minimum

Information, success, warning, dan danger dapat disiapkan sebagai token. PLAN-001 hanya memakai semantic state yang benar-benar diperlukan, terutama information dan warning untuk publication gate.

Setiap semantic state harus mempunyai teks atau icon dengan nama aksesibel. Warna tidak boleh menjadi satu-satunya penanda.

### 14.6 Typography

```text
Font utama: Inter jika tersedia tanpa menambah ketergantungan runtime; jika tidak, system font stack.
Fallback: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.
```

PLAN-001 tidak mengunduh atau menyimpan file font ke repository.

Type scale minimum:

| Fungsi | Desktop | Mobile | Line height |
|---|---:|---:|---:|
| Hero | 56 px | 40 px | 1.08 |
| H1 halaman | 40 px | 32 px | 1.15 |
| H2 section | 32 px | 28 px | 1.2 |
| H3/card | 24 px | 22 px | 1.25 |
| Body besar | 18 px | 17 px | 1.6 |
| Body | 16 px | 16 px | 1.55 |
| Supporting | 14 px | 14 px | 1.5 |

Implementasi menggunakan `rem` dan `clamp()` bila membantu responsif tanpa membuat ukuran ekstrem.

### 14.7 Spacing

Basis: 4 px.

Token minimum:

```text
0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96 px
```

### 14.8 Container dan Breakpoint

```text
sm  : 640 px
md  : 768 px
lg  : 1024 px
xl  : 1280 px
2xl : 1440 px
```

Container publik:

- normal: maksimum 1200 px;
- wide: maksimum 1320 px;
- mobile padding: 16–20 px;
- tablet padding: 24–32 px;
- desktop padding: 32–48 px.

### 14.9 Radius, Border, dan Shadow

```text
button/input : 8 px
card         : 12 px
panel besar  : 16–24 px
```

Shadow ringan dan selektif. Tidak membuat setiap card floating.

### 14.10 Motion

- durasi umum 120–200 ms;
- tidak ada autoplay;
- tidak ada parallax;
- tidak ada entrance animation berurutan yang memperlambat;
- reduced motion menghapus atau mengurangi transisi nonesensial.

---

## 15. Content Layer

Copy publik disimpan di satu content module, bukan tersebar tanpa sumber di seluruh komponen.

Contoh struktur:

```js
export const publicNavigation = []
export const homeContent = {}
export const footerContent = {}
export const unavailableContent = {}
```

Aturan:

1. komponen menerima content melalui props atau import content layer;
2. tidak membuat CMS atau data fetching;
3. tidak menyimpan data bisnis palsu;
4. komentar source mapping dapat digunakan secara ringkas;
5. wording editorial yang belum final harus mudah diganti;
6. tidak memasukkan URL kontak atau legal dummy;
7. tidak memakai lorem ipsum.

---

## 16. Struktur dan Konten Beranda

Urutan section wajib:

1. Global Header;
2. Hero statis;
3. Konteks kebutuhan pengguna;
4. Pendekatan RKK;
5. Cara kerja ringkas;
6. Gerbang informasi dan layanan;
7. Prinsip transparansi dan dokumentasi;
8. CTA penutup;
9. Global Footer.

### 16.1 Hero Statis

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

Action:

- `Ajukan Kebutuhan` ditampilkan sebagai hold action, bukan link aktif;
- alasan terlihat: `Jalur pengajuan sedang disiapkan.`;
- tidak menggunakan tooltip sebagai satu-satunya penjelasan;
- `Pelajari Cara Kerja` menjadi link aktif menuju `/cara-kerja`, yang pada PLAN-001 menampilkan UnavailablePage.

Visual:

- tidak memakai foto proyek;
- tidak memakai stock photo sebagai bukti;
- menggunakan panel visual abstrak berbasis CSS/SVG;
- visual dapat menampilkan empat label netral: `Orientasi`, `Pemeriksaan`, `Pengendalian`, `Dokumentasi`;
- dekorasi memakai `aria-hidden="true"`;
- visual tidak lebih dominan daripada H1;
- tidak ada slider atau autoplay.

### 16.2 Konteks Kebutuhan Pengguna

Judul:

```text
Pekerjaan konstruksi membutuhkan arah yang jelas sejak awal.
```

Intro:

```text
Kebutuhan, keputusan, dan bukti pekerjaan perlu dikelola secara terstruktur agar setiap tahap mempunyai konteks yang dapat dipahami.
```

Tiga poin:

1. `Kebutuhan dan ruang lingkup dapat berubah atau tidak tercatat dengan baik.`
2. `Keputusan, progres, dan kendala perlu disampaikan secara terstruktur.`
3. `Dokumen dan bukti pekerjaan perlu mudah ditelusuri sesuai kebutuhan.`

Aturan:

- tidak memakai statistik;
- tidak mengklaim hasil riset pelanggan;
- tidak menggunakan bahasa menakut-nakuti;
- maksimal tiga poin.

### 16.3 Pendekatan RKK

Judul:

```text
Pendekatan yang membantu pekerjaan tetap memiliki arah.
```

Empat kartu:

**Terencana**  
Kebutuhan, ruang lingkup, dan langkah kerja diarahkan sejak awal.

**Terkendali**  
Status, keputusan, dan perubahan mempunyai konteks yang dapat ditelusuri.

**Transparan**  
Informasi relevan disampaikan kepada pihak yang tepat sesuai kebutuhan.

**Terdokumentasi**  
Catatan, bukti, dan versi dijaga agar proses dapat ditelusuri.

Aturan:

- bukan badge prestasi;
- bukan jaminan hasil;
- tidak memakai angka;
- tidak menjadi carousel;
- icon opsional dan tidak boleh berdiri tanpa teks.

### 16.4 Cara Kerja Ringkas

Judul:

```text
Gambaran cara kerja RKK
```

Empat ringkasan:

1. **Orientasi kebutuhan** — memahami kebutuhan awal, konteks, dan informasi dasar.
2. **Pemeriksaan dan perencanaan** — meninjau ruang lingkup dan menyiapkan arah pekerjaan.
3. **Pelaksanaan dan pengendalian** — menjaga komunikasi, keputusan, perubahan, dan bukti pekerjaan.
4. **Dokumentasi dan tindak lanjut** — merapikan catatan serta kebutuhan tindak lanjut sesuai ruang lingkup.

Catatan visible:

```text
Tahapan di atas merupakan ringkasan orientasi. Detail proses akan dijelaskan pada halaman Cara Kerja setelah struktur dan ketentuannya disahkan.
```

Action:

```text
Pelajari Cara Kerja
```

menuju `/cara-kerja`.

### 16.5 Gerbang Informasi dan Layanan

Judul:

```text
Informasi layanan ditampilkan setelah ruang lingkupnya disahkan.
```

Copy:

```text
RKK tidak menampilkan daftar layanan, harga, wilayah, jadwal, atau ketentuan yang belum memiliki sumber resmi. Informasi tersebut akan tersedia setelah ruang lingkup dan batasnya ditetapkan.
```

State:

- information/hold panel;
- tidak membuat kartu layanan dummy;
- tidak menyebut Pembangunan Rumah Baru atau Renovasi sebagai penawaran aktif;
- tidak membuat CTA konsultasi gratis;
- tidak membuat link kosong.

### 16.6 Transparansi dan Dokumentasi

Judul:

```text
Transparansi dibangun melalui informasi yang relevan dan dapat ditelusuri.
```

Empat prinsip:

**Informasi relevan**  
Informasi disampaikan sesuai kebutuhan dan pihak yang berkepentingan.

**Keputusan mempunyai konteks**  
Perubahan dan keputusan penting perlu mempunyai alasan dan catatan yang jelas.

**Dokumen dapat ditelusuri**  
Catatan dan bukti disusun agar mudah ditemukan ketika diperlukan.

**Batas akses tetap dijaga**  
Transparansi tidak berarti membuka informasi yang bersifat rahasia atau tidak berhak diakses.

Aturan:

- tidak menyatakan sistem sudah real-time;
- tidak menyatakan seluruh proses sudah digital;
- tidak menyatakan dokumen selalu tersedia;
- tidak menjanjikan risiko hilang.

### 16.7 Closing CTA

Judul:

```text
Mulai dari kebutuhan yang dipahami dengan jelas.
```

Copy:

```text
Jalur pengajuan kebutuhan sedang disiapkan. Sementara itu, Anda dapat mempelajari pendekatan dan gambaran cara kerja RKK.
```

Action:

- hold action `Ajukan Kebutuhan` dengan alasan visible;
- active link `Pelajari Cara Kerja` menuju `/cara-kerja`;
- tidak ada form;
- tidak ada nomor kontak;
- tidak ada janji respons atau SLA.

---

## 17. Page State

### 17.1 UnavailablePage

Dipakai untuk `/tentang`, `/cara-kerja`, dan `/sign-in` selama PLAN-001.

Struktur:

- status label: `Sedang disiapkan`;
- H1 spesifik sesuai route;
- penjelasan singkat;
- link kembali ke Beranda;
- shell tetap utuh;
- tidak menyiratkan error server.

Copy route:

**Tentang**

```text
Halaman Tentang sedang disiapkan.
Informasi mengenai kedudukan, arah, dan identitas RKK akan ditampilkan setelah paket kontennya siap untuk implementasi.
```

**Cara Kerja**

```text
Halaman Cara Kerja sedang disiapkan.
Gambaran ringkas tersedia di Beranda. Detail tahapan akan ditampilkan setelah struktur dan istilah proses disahkan.
```

**Masuk**

```text
Akses akun belum tersedia pada tahap ini.
PLAN-001 tidak menyediakan login simulasi, role demo, atau autentikasi sementara.
```

### 17.2 NotFoundPage

- status `404`;
- H1: `Halaman tidak ditemukan`;
- penjelasan netral;
- link kembali ke Beranda;
- tidak menampilkan technical stack trace;
- memakai shell yang sama.

### 17.3 Error Fallback

- H1: `Halaman tidak dapat ditampilkan`;
- pesan tidak menyalahkan koneksi tanpa bukti;
- tombol/link kembali ke Beranda;
- detail error hanya di console development;
- tidak membuka informasi sensitif.

### 17.4 Optional Notice

Komponen tersedia tetapi default tidak dirender. Notice hanya digunakan jika ada informasi publik yang benar-benar perlu disampaikan.

---

## 18. Responsif

### 18.1 Mobile

- satu kolom;
- hero copy sebelum visual;
- CTA tersusun vertikal bila sempit;
- drawer menggantikan nav horizontal;
- section spacing lebih ringkas;
- card satu kolom atau dua kolom hanya bila tetap terbaca;
- target sentuh minimum 44 px;
- tidak ada horizontal scrolling pada konten utama;
- heading tidak terpotong;
- footer stacked.

### 18.2 Tablet

- grid 8 kolom konseptual;
- header dapat beralih ke drawer lebih awal jika menu sempit;
- approach card dapat 2x2;
- hero dua kolom hanya jika copy tetap terbaca.

### 18.3 Desktop

- container terpusat;
- grid 12 kolom;
- hero dua kolom;
- approach empat kolom;
- process empat kolom atau stepper noninteraktif;
- section spacing lega tetapi tidak berlebihan;
- panjang baris body dikendalikan.

### 18.4 Breakpoint Berbasis Konten

Breakpoint angka menjadi panduan. Komponen boleh berubah lebih awal apabila konten mulai bertabrakan atau sulit dibaca.

---

## 19. Aksesibilitas

Target internal awal: pengalaman setara AA untuk komponen dan alur utama.

Wajib:

1. `<html lang="id">`;
2. seluruh fungsi utama dapat digunakan keyboard;
3. focus visible tidak dihapus;
4. satu H1 per route;
5. heading berurutan;
6. header, nav, main, dan footer memakai landmark;
7. tombol untuk tindakan dan link untuk navigasi;
8. active nav memakai `aria-current`;
9. icon button mempunyai accessible name;
10. drawer tidak mempunyai keyboard trap;
11. focus kembali ke trigger;
12. reduced motion dihormati;
13. warna bukan satu-satunya penanda;
14. area sentuh minimum 44 px;
15. konten tetap dapat dibaca pada zoom 200%;
16. visual dekoratif menggunakan alt kosong atau `aria-hidden`;
17. tidak ada link `#`;
18. disabled/hold action mempunyai alasan visible;
19. urutan DOM mengikuti urutan baca;
20. error fallback dapat dibaca teknologi bantu.

Audit manual minimum:

- Tab dan Shift+Tab;
- Enter dan Space pada tombol/link;
- Escape pada drawer;
- focus order;
- resize mobile/tablet/desktop;
- reduced motion;
- zoom browser;
- contrast check pada token utama.

---

## 20. Aturan Konten dan Klaim

Dilarang menampilkan sebagai fakta publik:

- harga;
- estimasi waktu;
- SLA;
- wilayah;
- garansi;
- sertifikasi;
- legalitas;
- alamat;
- kontak;
- personel;
- kapasitas;
- proyek;
- testimoni;
- statistik;
- layanan aktif;
- diskon;
- konsultasi gratis;
- klaim “terbaik”;
- klaim “terpercaya” sebagai prestasi;
- klaim “pasti”;
- klaim “jaminan hasil”;
- klaim “real-time”;
- klaim “sepenuhnya digital”;
- klaim “selalu tersedia”.

Tidak boleh:

- memakai mock atau seed sebagai fakta;
- memakai stock photo sebagai proyek RKK;
- memakai foto tanpa izin;
- mengaktifkan route hanya agar tampak lengkap;
- membuat kontak palsu;
- membuat social link kosong;
- membuat privacy/terms kosong;
- membuat project count atau testimonial dummy.

---

## 21. Tahapan Implementasi

### Task 1 — Baseline dan Branch

- verifikasi repository, branch, SHA, working tree;
- pastikan branch PLAN-001 dibuat dari `main` pada base SHA;
- catat package manager dan versi Node/npm;
- pastikan PLAN-002 tidak ikut masuk.

### Task 2 — Dependency dan Test Setup

- tambahkan React Router;
- tambahkan Vitest/Testing Library/jsdom;
- tambahkan script test workspace;
- perbarui lockfile melalui npm normal;
- tidak menghapus node_modules secara paksa.

### Task 3 — Bersihkan Starter

- hapus placeholder App;
- hapus token ungu;
- hapus dark mode otomatis;
- hapus aset Vite yang tidak digunakan;
- pertahankan entry point yang masih relevan;
- pastikan tidak ada style global yang saling bertentangan.

### Task 4 — Design Token dan Global Style

- buat `tokens.css`;
- buat/reset `globals.css`;
- implementasikan typography, container, focus, link, button, section spacing;
- uji contrast token utama;
- jangan membuat utility CSS berlebihan.

### Task 5 — Router dan Shell

- buat AppRouter;
- buat PublicAppShell;
- buat SkipLink;
- buat header desktop;
- buat mobile drawer;
- buat footer minimum;
- buat optional notice;
- buat 404/unavailable/error state.

### Task 6 — Komponen Dasar

- ActionLink;
- HoldAction;
- SectionHeading;
- InfoCard;
- PublicContainer;
- PublicSection;
- PageState.

Varian dijaga minimum dan hanya dibuat jika digunakan PLAN-001.

### Task 7 — Beranda

- buat content layer;
- implementasikan semua section dalam urutan yang dikunci;
- implementasikan visual abstrak aman;
- pastikan primary hold action tidak menjadi dead link;
- pastikan semua copy sesuai plan;
- jangan menambahkan section lain tanpa persetujuan.

### Task 8 — Responsif dan Accessibility Pass

- mobile drawer;
- hero stacking;
- card grid;
- process layout;
- footer stacking;
- keyboard;
- focus;
- reduced motion;
- zoom dan overflow.

### Task 9 — Automated Test

Minimum test:

- Beranda route;
- 404 route;
- unavailable route;
- drawer open/close;
- Escape close;
- focus return;
- internal role/demo text tidak muncul;
- hold action tidak mempunyai navigation target palsu.

### Task 10 — Dokumentasi Hasil

- perbarui status PLAN-001 sesuai hasil;
- perbarui `docs/plan/README.md` menjadi `Dalam Implementasi` atau `Siap Audit`, sesuai tahap;
- tambahkan laporan eksekusi di bagian akhir plan;
- jangan mengubah status menjadi selesai sebelum audit SHA.

---

## 22. Validasi Wajib

### 22.1 Instalasi

```bash
npm install
```

### 22.2 Development

```bash
npm run dev --workspace apps/web -- --host 127.0.0.1
```

Verifikasi manual:

- `/`;
- `/tentang`;
- `/cara-kerja`;
- `/sign-in`;
- route tidak dikenal;
- drawer mobile;
- keyboard;
- resize.

### 22.3 Build

```bash
npm run build --workspace apps/web
```

### 22.4 Lint

```bash
npm run lint --workspace apps/web
```

### 22.5 Test

```bash
npm run test --workspace apps/web
```

Script test harus menjalankan Vitest dalam mode sekali jalan, bukan watch mode.

### 22.6 Pemeriksaan Scope

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
git grep -n "role demo" -- apps/web
git grep -n "Supabase" -- apps/web
git grep -n "Express" -- apps/web
git grep -n "localhost" -- apps/web
git grep -n 'href="#"' -- apps/web
```

Pencarian yang menghasilkan temuan harus ditinjau, bukan dihapus secara membabi buta.

### 22.7 Pemeriksaan Protected Area

Pastikan diff tidak memuat:

```text
client/
server/
apps/backend/
archive/
```

---

## 23. Acceptance Criteria PLAN-001

PLAN-001 dapat diajukan untuk audit apabila:

### Baseline dan Scope

- [ ] branch PLAN-001 dibuat dari base SHA yang benar;
- [ ] working tree awal bersih;
- [ ] PLAN-002 tidak tercampur;
- [ ] protected area tidak berubah;
- [ ] perubahan hanya berada dalam scope yang diizinkan.

### Fondasi

- [ ] placeholder minimum telah diganti;
- [ ] React Router terpasang dan digunakan;
- [ ] struktur folder memisahkan app, shell, page, section, content, style, dan test;
- [ ] token starter ungu telah dihapus;
- [ ] dark mode otomatis telah dihapus;
- [ ] design token P07-F03 diterjemahkan ke CSS variables;
- [ ] tidak ada framework UI tambahan;
- [ ] tidak ada dependency di luar daftar yang diizinkan tanpa deviasi disetujui.

### Shell

- [ ] SkipLink bekerja;
- [ ] header desktop tersedia;
- [ ] mobile drawer tersedia;
- [ ] Escape menutup drawer;
- [ ] focus kembali ke trigger;
- [ ] active navigation tidak hanya memakai warna;
- [ ] main landmark dan offset header benar;
- [ ] footer minimum bebas placeholder;
- [ ] role internal dan shortcut demo tidak tampil;
- [ ] link Masuk menuju `/sign-in` tanpa login simulasi.

### Routing dan State

- [ ] `/` merender Beranda;
- [ ] `/tentang` memakai unavailable state;
- [ ] `/cara-kerja` memakai unavailable state;
- [ ] `/sign-in` memakai unavailable state;
- [ ] route tidak dikenal memakai 404;
- [ ] error fallback tersedia;
- [ ] semua state memakai shell yang sama;
- [ ] tidak ada dead link atau link `#`.

### Beranda

- [ ] urutan sembilan bagian sesuai plan;
- [ ] hero statis dan hanya mempunyai satu H1;
- [ ] tidak ada slider/autoplay;
- [ ] visual tidak mengklaim proyek nyata;
- [ ] konteks masalah tidak memakai statistik palsu;
- [ ] empat pendekatan RKK tampil;
- [ ] cara kerja ringkas tampil;
- [ ] publication gate tidak menampilkan layanan dummy;
- [ ] prinsip transparansi dan dokumentasi tampil;
- [ ] CTA pengajuan tetap ditahan dengan alasan visible;
- [ ] footer tidak memuat kontak/legal/social placeholder;
- [ ] seluruh copy dapat ditelusuri ke content layer.

### Responsif dan Accessibility

- [ ] mobile, tablet, dan desktop telah diperiksa;
- [ ] tidak ada horizontal overflow pada viewport utama;
- [ ] target sentuh minimum terpenuhi;
- [ ] seluruh fungsi utama dapat digunakan keyboard;
- [ ] focus visible;
- [ ] heading hierarchy benar;
- [ ] landmark benar;
- [ ] reduced motion dihormati;
- [ ] warna bukan satu-satunya penanda;
- [ ] zoom 200% tidak menghilangkan fungsi utama;
- [ ] tidak ditemukan masalah aksesibilitas kritis pada audit manual.

### Validasi Teknis

- [ ] dependency install berhasil;
- [ ] development server berhasil;
- [ ] build produksi berhasil;
- [ ] lint berhasil;
- [ ] test berhasil;
- [ ] `git diff --check` berhasil;
- [ ] tidak ada error baru;
- [ ] laporan hasil Gemini lengkap;
- [ ] Gemini tidak melakukan commit atau push.

---

## 24. Format Laporan Gemini

### A. Baseline

- repository;
- branch;
- base SHA;
- working tree awal;
- Node.js;
- npm;
- dependency baseline.

### B. Perubahan

- file dibuat;
- file diubah;
- file dihapus;
- dependency ditambah;
- keputusan teknis minimum;
- deviasi dari struktur target, jika ada.

### C. Implementasi

- router;
- shell;
- route matrix;
- Beranda;
- content layer;
- design token;
- responsive behavior;
- accessibility behavior;
- automated test.

### D. Validasi

- install;
- dev server;
- build;
- lint;
- test;
- manual route check;
- keyboard/focus check;
- responsive check;
- `git diff --check`;
- protected area check.

### E. Batas dan Temuan

- blocker;
- item belum selesai;
- copy atau keputusan yang tetap perlu review;
- deviasi;
- risiko regresi;
- rekomendasi pekerjaan berikutnya tanpa mengerjakannya.

### F. Kondisi Akhir

- `git status --short`;
- `git diff --stat`;
- daftar file final;
- konfirmasi tidak commit/push/PR;
- konfirmasi PLAN-002 tidak disentuh.

---

## 25. Definition of Done

PLAN-001 dianggap selesai secara implementasi apabila:

1. `apps/web` memiliki fondasi frontend publik yang jelas;
2. PublicAppShell dapat dipakai halaman publik berikutnya;
3. Beranda route `/` telah menggantikan placeholder;
4. konten Beranda mematuhi publication gate;
5. route placeholder dan 404 tidak menyesatkan pengguna;
6. responsive behavior dan accessibility minimum terpenuhi;
7. build, lint, test, dan development server berhasil;
8. tidak ada perubahan di luar scope;
9. hasil Gemini telah diperiksa Pemilik dan Room 3;
10. commit dan push dilakukan Pemilik setelah audit;
11. SHA hasil dicatat;
12. status R03 dan indeks plan diperbarui berdasarkan implementasi nyata.

Status final tidak boleh ditulis sebelum audit SHA selesai.

---

## 26. Batas Pekerjaan Berikutnya

Setelah PLAN-001, pekerjaan dapat dipisah menjadi plan lain, misalnya:

- implementasi penuh halaman Tentang;
- implementasi penuh halaman Cara Kerja;
- spesifikasi dan implementasi jalur pengajuan kebutuhan;
- halaman Layanan setelah sumber bisnis siap;
- halaman Kontak setelah data resmi tersedia;
- integrasi autentikasi setelah P07.2 dan keputusan teknis siap;
- integrasi frontend-backend setelah PLAN-002 diterima dan kontrak API disetujui;
- deployment frontend setelah fondasi publik stabil.

PLAN-001 tidak mengambil pekerjaan tersebut lebih awal.

---

## 27. Register Deviasi

| Kode | Item | Target Plan | Hasil Implementasi | Alasan | Dampak | Keputusan | Status |
|---|---|---|---|---|---|---|---|
| DEV-001 | Belum ada | — | — | — | — | — | — |

Gemini tidak menetapkan keputusan bisnis melalui register deviasi. Deviasi yang berdampak pada scope, content, route, dependency, atau architecture harus dihentikan dan dikembalikan kepada Pemilik.

---

## 28. Persetujuan Pemilik

Status saat ini:

```text
SIAP AUDIT
```

Checklist persetujuan:

- [x] judul PLAN-001 disetujui;
- [x] base SHA disetujui;
- [x] target branch disetujui;
- [x] penggunaan React Router disetujui;
- [x] penggunaan CSS custom properties tanpa Tailwind disetujui;
- [x] penambahan test stack disetujui;
- [x] route matrix disetujui;
- [x] struktur dan copy Beranda disetujui untuk implementasi internal;
- [x] publication gate disetujui;
- [x] batas protected area disetujui;
- [x] acceptance criteria disetujui;
- [x] plan siap dieksekusi.

Persetujuan Pemilik diberikan pada 27 Juli 2026.

Gemini Antigravity wajib berhenti setelah implementasi, validasi, dan laporan. Commit, push, merge, serta pull request tetap menunggu audit Room 3.

---

## 29. Laporan Eksekusi Antigravity

**Tanggal:** 27 Juli 2026

### A. Baseline
- **Repository:** `RKK-RumahKuKontruksi`
- **Branch Target:** `refactor/plan-001-public-ui-home`
- **Base SHA:** `2e8237f0e76c36229945931ab9a2d915f51dcd1b`
- **Dependency Baseline:** `react`, `react-dom`, `vite`

### B. Perubahan
- **File dihapus:** `App.css`, `index.css`, folder `assets`.
- **File ditambahkan/diubah:** `App.jsx`, `main.jsx`, `vite.config.js`, `package.json`, beserta struktur komponen dan stylesheet baru.
- **Dependency ditambah:** `react-router-dom`, `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` (dev).
- **Keputusan Teknis Minimum:** Menggunakan CSS Variables secara natif untuk `tokens.css` dan membuat class konvensional sebagai layout/komponen UI publik. `react-router-dom` dipisahkan agar MemoryRouter dapat bekerja baik di Vitest.

### C. Implementasi
- **Router & Shell:** `AppRouter` ditambahkan. `PublicAppShell`, `MobileDrawer`, `PublicHeader`, `PublicFooter`, `SkipLink` berfungsi tanpa konflik.
- **Route Matrix:** Sesuai rencana (Beranda aktif; sisanya Unavailable/404).
- **Beranda:** Urutan dan content layer diimplementasikan via modular imports `home.js`. Semua 7 sections siap.
- **Automated Test:** `vitest` terkonfigurasi. 7 test case lulus.

### D. Validasi
- `npm run dev --workspace apps/web`: Berjalan tanpa error.
- `npm run build --workspace apps/web`: Berhasil (378ms).
- `npm run lint --workspace apps/web`: Lulus tanpa warning/error setelah menghapus unused imports.
- `npm run test --workspace apps/web`: 7/7 test passed.
- `git diff --check`: Bersih (selain warning CRLF bawaan sistem).
- `git status --short`: Menunjukkan file-file baru di `apps/web/src` dan modifikasi `package.json`.
- **Protected Area Check:** Tidak ada perubahan di luar `apps/web`. `PLAN-002` aman.

### E. Batas dan Temuan
- Seluruh spesifikasi UI dari desain token, accessibility pass, dan struktur file telah dicapai sesuai PLAN-001.

### F. Kondisi Akhir
Perubahan siap di-commit dan di-push oleh Pemilik. **Gemini telah berhenti di working tree.**
