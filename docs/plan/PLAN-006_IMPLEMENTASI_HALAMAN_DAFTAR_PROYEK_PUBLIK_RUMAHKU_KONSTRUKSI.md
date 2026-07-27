---
kode: PLAN-006
judul: Implementasi Halaman Daftar Proyek Publik Rumahku Konstruksi
versi: 1.0
status: DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
base_sha: 016405d9327125e9b63e626dffc8b9d708d5996d
base_sha_status: Remote terverifikasi sebagai penutup final PLAN-005
area_implementasi: apps/web
route_utama: /proyek
route_detail: /proyek/:slug — DITAHAN
jenis_pekerjaan: implementasi halaman publik — daftar proyek dengan current-hold state dan gerbang publikasi
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-006 — IMPLEMENTASI HALAMAN DAFTAR PROYEK PUBLIK RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
PLAN FINAL SIAP DIGUNAKAN SEBAGAI INSTRUKSI EKSEKUSI
GEMINI BOLEH MENGUBAH WORKING TREE SETELAH AUDIT LOKAL LULUS
GEMINI TETAP DILARANG COMMIT, PUSH, MERGE, ATAU MEMBUAT BRANCH
```

Dokumen ini menyusun rencana implementasi route `/proyek` sebagai halaman Daftar Proyek Publik Rumahku Konstruksi.

Halaman dibangun pada kondisi **current-hold state**. Route dan struktur halaman boleh tersedia, tetapi tidak ada kartu proyek, foto proyek, angka portofolio, progres, filter, pencarian, atau detail proyek yang diaktifkan sebelum proyek operasional melewati gerbang publikasi.

PLAN-006 telah disetujui Pemilik pada 28 Juli 2026 dan dapat digunakan sebagai instruksi eksekusi setelah audit lokal memastikan branch, HEAD, remote, dan working tree sesuai.

---

## 2. Ringkasan Keputusan Disetujui

| Area | Keputusan Disetujui |
|---|---|
| Route daftar | `/proyek` |
| Route detail | Belum dibuat; `/proyek/:slug` tetap 404 |
| Kondisi katalog | Kosong |
| Proyek published | 0 |
| Kartu proyek | 0 |
| Media proyek | Tidak ada |
| Navigasi | Tambahkan `Proyek` setelah `Layanan` dan sebelum `Masuk` |
| Header desktop | Proyek tampil |
| Mobile drawer | Proyek tampil |
| Footer | Proyek tampil |
| Beranda | Tidak wajib menambah section proyek pada PLAN-006 |
| CTA utama | `Pelajari Cara Kerja` menuju `/cara-kerja` |
| CTA kedua | `Kembali ke Beranda` menuju `/` |
| Filter dan pencarian | Tidak dirender |
| Sort dan pagination | Tidak dirender |
| Integrasi API/P06 | Tidak dilakukan |
| Data produksi | `projectCatalog = []` |
| Dummy/seed/acuan | Tidak boleh tampil |
| Foto stok | Tidak boleh dianggap dokumentasi proyek |
| Legacy client | Tidak disentuh |

---

## 3. Latar Belakang

PLAN-005 telah menyelesaikan halaman Daftar Layanan dan navigasi publik sampai status final.

Tahap berikutnya adalah membangun halaman Daftar Proyek Publik agar arsitektur website berkembang menjadi:

```text
Beranda
Tentang
Cara Kerja
Layanan
Proyek
Masuk
```

Namun sumber aktif menetapkan bahwa:

1. belum ada proyek operasional RKK yang telah dibuktikan dan disetujui untuk publikasi;
2. sembilan proyek pada B05 adalah data `ACUAN`, bukan proyek nyata;
3. data dummy atau hard-coded pada GitHub lama tidak boleh digunakan sebagai portofolio;
4. kontrak data publik proyek dari P06 belum tersedia;
5. halaman boleh dibangun sebagai current-hold state yang informatif;
6. detail proyek hanya boleh dibuka setelah paket Detail Proyek Publik dan proyek terkait siap.

Karena itu, PLAN-006 tidak membangun portofolio palsu. PLAN-006 membangun struktur publik, tata kelola visual, dan kontrak future-safe tanpa mengaktifkan proyek yang belum layak publik.

---

## 4. Sumber yang Menjadi Dasar

### 4.1 Sumber Produk dan UI

1. `[PRY-01] - SPESIFIKASI HALAMAN DAFTAR PROYEK PUBLIK RKK.md`
2. `[PRY-02] - PEMETAAN DATA DAN KONTEN DAFTAR PROYEK PUBLIK RKK.csv`
3. `[PRY-03] - DAFTAR REFERENSI HALAMAN DAFTAR PROYEK PUBLIK RKK.md`
4. `[PRY-04] - WIREFRAME HALAMAN DAFTAR PROYEK PUBLIK RKK.pdf`
5. `[PRY-05] - SPESIFIKASI KOMPONEN UI DAFTAR PROYEK PUBLIK RKK.md`
6. `[P07.1-F04] — BLUEPRINT DAN SPESIFIKASI UI HALAMAN WEBSITE PUBLIK RKK.md`
7. `[P07.1-F05] — STATUS KESIAPAN DAN HANDOFF WEBSITE PUBLIK RKK.md`

### 4.2 Sumber Bisnis

1. keputusan aktif Pemilik RKK;
2. `[B00-F01] — STATUS DAN PETA KERJA BISNIS RKK.md`;
3. B05 sebagai struktur data acuan proyek;
4. panduan klasifikasi, status, dokumen, media, hak akses, dan izin publikasi proyek;
5. register proyek operasional apabila tersedia pada masa depan.

### 4.3 Sumber Teknis

Repository:

```text
syahputrawork98-sketch/RKK-RumahKuKontruksi
```

Baseline:

```text
branch   : main
base SHA : 016405d9327125e9b63e626dffc8b9d708d5996d
```

Kondisi route publik sebelum PLAN-006:

```text
/             : Beranda
/tentang      : Tentang
/cara-kerja   : Cara Kerja
/layanan      : Daftar Layanan
/sign-in      : Unavailable state
/*            : 404
```

---

## 5. Hierarki Sumber Kebenaran

Urutan keputusan:

1. keputusan Pemilik RKK;
2. sumber bisnis aktif Room 1;
3. data operasional proyek yang sah;
4. izin publikasi dan persetujuan penggunaan media;
5. paket PRY-01 sampai PRY-05;
6. P04 dan P05 setelah sinkronisasi;
7. P06 setelah kontrak data publik tersedia;
8. P07/P07.1;
9. repository aktif;
10. arsip dan legacy hanya sebagai pembanding.

GitHub bukan sumber keputusan bisnis.

Data `ACUAN`, `UJI`, seed, dummy, mock, atau legacy tidak boleh berubah menjadi klaim proyek nyata.

---

## 6. Tujuan PLAN-006

PLAN-006 bertujuan:

1. menambahkan route publik `/proyek`;
2. menyediakan halaman Daftar Proyek Publik yang bernilai walaupun katalog masih kosong;
3. menjelaskan alasan portofolio belum ditampilkan secara profesional dan tenang;
4. menjelaskan empat kelompok gerbang publikasi;
5. menjelaskan batas informasi proyek publik;
6. menambahkan navigasi Proyek secara konsisten;
7. menyiapkan kontrak data publik yang tidak membocorkan objek proyek internal;
8. menyiapkan resolver lokal future-safe;
9. menjaga `projectCatalog` produksi tetap kosong;
10. mencegah data acuan, dummy, seed, dan legacy tampil sebagai portofolio;
11. memastikan `/proyek/:slug` belum aktif;
12. menyediakan metadata, responsive behavior, aksesibilitas, lint, test, dan build;
13. tidak menambahkan API, CMS, backend, database, atau dependency;
14. tidak menyentuh legacy client.

---

## 7. Non-Tujuan

PLAN-006 tidak bertujuan:

- menerbitkan proyek operasional;
- membuat proyek contoh;
- menyalin sembilan proyek B05 sebagai portofolio;
- menggunakan proyek dummy dari GitHub lama;
- menampilkan foto stok sebagai proyek RKK;
- menampilkan nama pelanggan;
- menampilkan alamat rinci;
- menampilkan nomor kontrak;
- menampilkan nilai kontrak;
- menampilkan biaya, pembayaran, margin, atau termin;
- menampilkan personel proyek;
- menampilkan nomor atau tautan dokumen internal;
- menampilkan progres proyek;
- menampilkan persentase penyelesaian;
- menampilkan jadwal atau janji penyelesaian;
- membuat filter kategori;
- membuat pencarian;
- membuat sort;
- membuat pagination;
- membuat kartu placeholder;
- membuat counter `0 proyek`;
- membuat route `/proyek/:slug`;
- membuat halaman Detail Proyek;
- membuat CTA konsultasi atau transaksi;
- mengaktifkan API proyek;
- mengubah skema database;
- menambah dependency;
- memodifikasi folder legacy `client/`.

---

## 8. Current State dan Future State

### 8.1 Current State

```text
projectCatalog          : []
publishedProjects       : []
project cards           : 0
project media           : 0
project filters         : 0
project detail routes   : 0
transaction CTA         : 0
```

Page state:

```text
NO_PUBLISHED_PROJECTS
```

### 8.2 Future State

Future state hanya dapat aktif bila tersedia minimal satu proyek operasional yang:

1. mempunyai sumber pekerjaan nyata;
2. mempunyai izin publikasi;
3. telah dianonimkan;
4. mempunyai dokumentasi berizin;
5. telah melalui review konten;
6. mempunyai status publikasi aktif;
7. mempunyai data publik minimum;
8. belum melewati review due date atau memiliki keputusan perpanjangan;
9. tidak mengirim data sensitif ke client;
10. detail route hanya ada bila detailnya siap.

Future state bukan bagian implementasi PLAN-006 current-hold state.

---

## 9. Keputusan Navigasi Disetujui

Urutan navigasi:

```text
Beranda
Tentang
Cara Kerja
Layanan
Proyek
Masuk
```

`Proyek` ditempatkan:

- setelah `Layanan`;
- sebelum `Masuk`.

Permukaan yang harus konsisten:

1. `PublicHeader`;
2. `MobileDrawer`;
3. `PublicFooter`.

Route aktif:

```text
/proyek
```

Active state:

```text
aria-current="page"
```

harus muncul pada `NavLink` Proyek ketika route `/proyek` aktif.

Klik Proyek pada mobile drawer harus memanggil `onClose`.

### 9.1 Alasan Navigasi

- Proyek merupakan top-level area publik;
- halaman tetap informatif walaupun katalog kosong;
- pengguna tidak perlu menemukan route secara tersembunyi;
- menu tidak menyiratkan proyek aktif karena halaman menjelaskan status publikasi;
- pola ini konsisten dengan keputusan visibilitas menu Layanan.

---

## 10. Struktur Halaman

Urutan final current state:

1. Global Header;
2. Page Hero;
3. Publication Status Notice;
4. Publication Gate Summary;
5. Projects Hold State;
6. Public Information Boundary;
7. Projects Closing CTA;
8. Global Footer.

Tidak ada:

- toolbar;
- filter;
- pencarian;
- sort;
- result count;
- project grid;
- project card;
- loading skeleton;
- filter empty state;
- pagination.

---

## 11. Copy Halaman

### 11.1 Metadata

Title:

```text
Proyek dan Portofolio | Rumahku Konstruksi
```

Description:

```text
Pelajari tata kelola publikasi proyek Rumahku Konstruksi. Portofolio hanya ditampilkan setelah sumber pekerjaan, izin, anonimisasi, dokumentasi, dan peninjauan kontennya terverifikasi.
```

Canonical path:

```text
/proyek
```

### 11.2 Hero

Eyebrow:

```text
Proyek dan Portofolio RKK
```

H1:

```text
Portofolio hanya ditampilkan setelah data, dokumentasi, izin, dan batas informasinya terverifikasi.
```

Supporting copy:

```text
RKK sedang menyiapkan tata kelola publikasi proyek agar setiap informasi yang tampil dapat ditelusuri ke pekerjaan nyata dan persetujuan yang berlaku. Saat ini belum ada proyek yang ditampilkan sebagai portofolio publik.
```

Primary CTA:

```text
Pelajari Cara Kerja
```

Target:

```text
/cara-kerja
```

Secondary CTA:

```text
Kembali ke Beranda
```

Target:

```text
/
```

### 11.3 Status Publikasi

Judul:

```text
Belum ada proyek yang dipublikasikan sebagai portofolio RKK.
```

Deskripsi:

```text
Data proyek acuan telah tersedia untuk merancang kebutuhan sistem, tetapi bukan bukti proyek nyata. Portofolio akan ditampilkan setelah sumber operasional, izin publikasi, anonimisasi, media, dan peninjauan konten tersedia.
```

Tone:

```text
informational
```

Tidak menggunakan:

- warning;
- error;
- `coming soon`;
- `segera hadir`;
- counter nol;
- skeleton loading;
- kartu bayangan.

### 11.4 Gerbang Publikasi

Heading:

```text
Empat pemeriksaan sebelum proyek tampil
```

Supporting copy:

```text
Setiap proyek harus melewati pemeriksaan sumber pekerjaan, izin publikasi, anonimisasi, serta dokumentasi dan review sebelum dapat ditampilkan.
```

Empat kelompok:

#### 1. Sumber Pekerjaan Nyata

```text
Proyek harus dapat ditelusuri ke pekerjaan operasional dan bukti yang sah, bukan data acuan, seed, dummy, atau arsip tanpa verifikasi.
```

#### 2. Izin Publikasi

```text
Persetujuan penggunaan informasi dan media harus tersedia, tercatat, masih berlaku, dan dapat ditinjau kembali.
```

#### 3. Anonimisasi

```text
Identitas pelanggan, alamat rinci, nilai kontrak, dokumen, serta data sensitif lain harus dihilangkan atau dibatasi sesuai keputusan publikasi.
```

#### 4. Dokumentasi dan Review

```text
Media harus mempunyai sumber dan hak penggunaan, sedangkan copy, metadata, alt text, dan status publikasinya harus selesai ditinjau.
```

### 11.5 Hold State

Judul:

```text
Portofolio publik belum tersedia.
```

Deskripsi:

```text
RKK tidak menggunakan proyek contoh atau dokumentasi tanpa izin untuk membangun kesan pengalaman. Informasi proyek akan tampil setelah seluruh gerbang publikasi terpenuhi.
```

Primary CTA:

```text
Pelajari Cara Kerja
```

Secondary CTA:

```text
Kembali ke Beranda
```

Tidak menggunakan:

- gambar rumah realistis;
- foto konstruksi stok;
- kartu placeholder;
- teaser proyek acuan;
- badge segera hadir;
- angka proyek.

### 11.6 Batas Informasi Publik

Heading:

```text
Informasi proyek yang tetap dilindungi
```

Supporting copy:

```text
Publikasi proyek tidak berarti membuka seluruh data operasional. Informasi hanya ditampilkan dalam bentuk yang aman dan telah disetujui.
```

Item:

1. `Identitas pelanggan dilindungi.`
2. `Lokasi ditampilkan secara umum.`
3. `Biaya, pembayaran, dan dokumen internal tidak dipublikasikan.`
4. `Media hanya digunakan dengan sumber dan izin yang berlaku.`

### 11.7 CTA Penutup

Heading:

```text
Pelajari pendekatan RKK sebelum portofolio tersedia.
```

Description:

```text
Cara Kerja menjelaskan tahapan, batas peran, dan pendekatan yang digunakan RKK dalam menata kebutuhan konstruksi.
```

Primary:

```text
Pelajari Cara Kerja
```

Secondary:

```text
Kembali ke Beranda
```

---

## 12. Komponen Current State

### 12.1 `ProjectsPageHero`

Tanggung jawab:

- menampilkan eyebrow;
- satu H1;
- supporting copy;
- dua CTA;
- visual abstrak;
- tidak menggunakan media proyek.

Visual mode:

```text
verification-frame
```

Visual dapat dibangun dengan CSS:

- frame dokumentasi;
- garis verifikasi;
- panel abstrak;
- checkpoint;
- token global;
- tanpa remote image.

### 12.2 `PublicationStatusNotice`

State:

```text
NO_PUBLISHED_PROJECTS
```

Aturan:

- informational;
- bukan warning;
- tidak menampilkan jumlah proyek internal;
- tidak menampilkan reviewed date kecuali bersumber;
- tidak menggunakan ikon error.

### 12.3 `PublicationGateSummary`

Menampilkan empat item:

1. sumber pekerjaan nyata;
2. izin publikasi;
3. anonimisasi;
4. dokumentasi dan review.

Bentuk:

- desktop: empat kolom;
- tablet: dua kolom;
- mobile: list satu kolom;
- bukan checklist interaktif;
- tidak membuka data internal.

### 12.4 `ProjectsHoldState`

Mode:

```text
NO_PUBLISHED_DATA
```

Aturan:

- tidak merender skeleton;
- tidak merender kartu;
- tidak merender ilustrasi proyek realistis;
- tidak menggunakan bahasa promosi;
- focus order terjaga.

### 12.5 `PublicInformationBoundary`

Aturan:

- list/callout ringan;
- tidak terlalu dominan;
- berisi empat batas informasi;
- tidak membocorkan detail internal.

### 12.6 `ProjectsClosingCTA`

CTA aman:

- `/cara-kerja`;
- `/`.

Tidak ada:

- konsultasi;
- pesan sekarang;
- ajukan proyek;
- minta penawaran;
- hitung biaya;
- jadwalkan survei.

---

## 13. Komponen Future State yang Hanya Disiapkan Secara Konseptual

Nama berikut boleh dicatat di kontrak dan test resolver, tetapi tidak dirender pada current state:

- `ProjectsToolbar`;
- `ProjectFilterGroup`;
- `ProjectSortSelect`;
- `ProjectResultsSummary`;
- `PublicProjectGrid`;
- `PublicProjectCard`;
- `ProjectMedia`;
- `PublicProjectMeta`;
- `ProjectsLoadingState`;
- `ProjectsFilterEmptyState`;
- `ProjectsErrorState`;
- `ProjectsPagination`.

PLAN-006 tidak wajib membuat seluruh file future component.

Rekomendasi:

- buat hanya kontrak dan resolver future-safe;
- tunda seluruh file future UI sampai ada proyek publik;
- hindari komponen mati tanpa data.

---

## 14. Content Layer

File:

```text
apps/web/src/content/projects.js
```

Ekspor:

```js
export const projectListContent = {};
export const projectCatalog = [];
export function resolvePublishedProjects(projects, options) {}
```

### 14.1 `projectListContent`

Memuat:

- meta;
- hero;
- publication status;
- publication gate;
- hold state;
- public boundary;
- closing CTA.

Copy tidak ditulis langsung pada komponen.

### 14.2 `projectCatalog`

Kondisi produksi:

```js
export const projectCatalog = [];
```

Tidak boleh berisi:

- sembilan proyek B05;
- proyek contoh;
- dummy;
- seed;
- foto stok;
- data legacy;
- klaim pengalaman;
- nama pelanggan;
- alamat;
- nilai kontrak.

---

## 15. Kontrak Data Future-Safe

Kontrak konseptual:

```ts
type ProjectPublicationRecord = {
  publicProjectId: string;
  publicTitle: string;
  publicSummary: string;
  publicCategory: string;
  publicLocation?: string;
  publicStatus?: string;
  completionYear?: number;
  publicMedia?: {
    src: string;
    alt: string;
    rightsStatus: 'APPROVED';
    sourceVersion: string;
  };
  detailPageReady: boolean;
  detailRoute?: string;
  publicationStatus: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'WITHDRAWN';
  visibility: 'PRIVATE' | 'INTERNAL' | 'PUBLIC';
  effectiveDate: string;
  reviewDueAt?: string;
  sourceVersion: string;
};
```

Data output komponen:

```ts
type PublicProjectCardData = {
  publicProjectId: string;
  title: string;
  summary: string;
  category: string;
  locationGeneral?: string;
  publicStatus?: string;
  completionYear?: number;
  coverMedia?: {
    src: string;
    alt: string;
  };
  detailPageReady: boolean;
  detailHref?: string;
  publishedAt: string;
  reviewDueAt?: string;
};
```

Resolver tidak boleh mengembalikan seluruh objek internal.

---

## 16. Resolver Publikasi

Nama:

```text
resolvePublishedProjects
```

Tanggung jawab:

1. menerima array;
2. menolak input non-array secara aman;
3. hanya mengambil record `PUBLISHED`;
4. hanya mengambil record `PUBLIC`;
5. memastikan `sourceVersion`;
6. memastikan `effectiveDate`;
7. memastikan title, summary, dan category;
8. menolak media tanpa izin atau alt text;
9. menolak route detail yang tidak valid;
10. menghapus field sensitif;
11. memetakan data ke `PublicProjectCardData`;
12. mengembalikan array baru;
13. tidak melakukan mutation;
14. tidak melakukan fetch;
15. tidak membaca environment;
16. deterministik.

Contoh prinsip:

```js
export function resolvePublishedProjects(projects = [], { now = new Date() } = {}) {
  if (!Array.isArray(projects)) return [];

  return projects
    .filter(isPubliclyPublishableProject)
    .map(toPublicProjectCardData);
}
```

Current production result:

```text
[]
```

---

## 17. Aturan Detail Route

PLAN-006 tidak menambahkan:

```text
/proyek/:slug
```

Route berikut harus 404:

```text
/proyek/contoh
/proyek/proyek-001
/proyek/rumah-tinggal
```

`detailHref` hanya boleh tersedia apabila:

- detail page ready;
- route menggunakan `/proyek/`;
- slug aman;
- slug tidak memuat nama pelanggan;
- slug tidak memuat alamat;
- slug tidak memuat nomor kontrak;
- slug tidak memuat internal project id;
- paket Detail Proyek telah diimplementasikan.

---

## 18. Batas Informasi

Tidak boleh dikirim ke client:

- internal project id;
- customer id;
- nama pelanggan;
- nomor telepon;
- email;
- alamat rinci;
- koordinat;
- nomor kontrak;
- nilai kontrak;
- biaya;
- pembayaran;
- margin;
- termin;
- person id;
- document id;
- risk code;
- status internal;
- internal progress;
- catatan internal;
- informasi sengketa;
- informasi legal;
- informasi yang dapat mengidentifikasi aset tanpa izin.

Tidak cukup menyembunyikan data dengan CSS.

Data sensitif tidak boleh berada pada object props, markup, dataset, JSON inline, source map, atau client bundle.

---

## 19. Media

Current state:

```text
Tidak ada media proyek.
```

Hero hanya menggunakan visual abstrak.

Future media harus memiliki:

- sumber;
- hak penggunaan;
- status izin;
- alt text;
- source version;
- review;
- mapping ke proyek publik;
- tidak membocorkan lokasi atau identitas.

Dilarang:

- Unsplash sebagai dokumentasi proyek;
- foto stok yang dilabeli sebagai proyek RKK;
- remote image tanpa kontrol;
- foto dengan metadata sensitif yang belum diproses;
- carousel;
- before-after tanpa izin.

---

## 20. Styling

File:

```text
apps/web/src/styles/projects.css
```

Import pada:

```text
apps/web/src/main.jsx
```

Scope wajib:

```css
.page-projects { }
.page-projects .projects-hero { }
.page-projects .publication-status { }
.page-projects .publication-gates { }
.page-projects .projects-hold-state { }
.page-projects .public-information-boundary { }
.page-projects .projects-closing-cta { }
```

Aturan:

- gunakan token global;
- informational menggunakan info/neutral token;
- tidak menggunakan warning untuk empty state normal;
- tidak menggunakan warna literal bila token tersedia;
- tidak mengubah selector global;
- tidak menimpa halaman Layanan;
- responsif mobile-first;
- reduced motion;
- focus-visible;
- kontras memadai;
- tidak menggunakan full viewport hero pada mobile.

---

## 21. Reuse Komponen Global

Gunakan kembali:

- `PublicAppShell`;
- `PublicHeader`;
- `MobileDrawer`;
- `PublicFooter`;
- `PublicSection`;
- `PublicContainer`;
- `SectionHeading`;
- `PageMeta`;
- pattern button/link yang sudah ada;
- spacing dan typography token.

Jangan membuat ulang container global.

---

## 22. Struktur File yang Diusulkan

### 22.1 File Baru

```text
apps/web/src/pages/ProjectListPage.jsx
apps/web/src/content/projects.js

apps/web/src/sections/projects/ProjectsPageHero.jsx
apps/web/src/sections/projects/PublicationStatusNotice.jsx
apps/web/src/sections/projects/PublicationGateSummary.jsx
apps/web/src/sections/projects/ProjectsHoldState.jsx
apps/web/src/sections/projects/PublicInformationBoundary.jsx
apps/web/src/sections/projects/ProjectsClosingCTA.jsx

apps/web/src/styles/projects.css
apps/web/src/test/projects.test.jsx

docs/plan/PLAN-006_IMPLEMENTASI_HALAMAN_DAFTAR_PROYEK_PUBLIK_RUMAHKU_KONSTRUKSI.md
```

### 22.2 File Dimodifikasi

```text
apps/web/src/app/AppRouter.jsx
apps/web/src/main.jsx
apps/web/src/components/public/PublicHeader.jsx
apps/web/src/components/public/MobileDrawer.jsx
apps/web/src/components/public/PublicFooter.jsx
apps/web/src/test/app.test.jsx
docs/plan/README.md
```

### 22.3 File Future yang Ditunda

```text
PublicProjectGrid.jsx
PublicProjectCard.jsx
ProjectMedia.jsx
ProjectsToolbar.jsx
ProjectFilterGroup.jsx
ProjectSortSelect.jsx
ProjectsPagination.jsx
```

---

## 23. Page Composer

Contoh struktur:

```jsx
import { PageMeta } from '../components/ui/PageMeta';
import {
  projectListContent,
  projectCatalog,
  resolvePublishedProjects,
} from '../content/projects';
import ProjectsPageHero from '../sections/projects/ProjectsPageHero';
import PublicationStatusNotice from '../sections/projects/PublicationStatusNotice';
import PublicationGateSummary from '../sections/projects/PublicationGateSummary';
import ProjectsHoldState from '../sections/projects/ProjectsHoldState';
import PublicInformationBoundary from '../sections/projects/PublicInformationBoundary';
import ProjectsClosingCTA from '../sections/projects/ProjectsClosingCTA';

export default function ProjectListPage() {
  const publishedProjects = resolvePublishedProjects(projectCatalog);

  return (
    <div className="page-projects">
      <PageMeta
        title={projectListContent.meta.title}
        description={projectListContent.meta.description}
        path="/proyek"
      />
      <ProjectsPageHero />
      <PublicationStatusNotice />
      <PublicationGateSummary />
      {publishedProjects.length === 0 && <ProjectsHoldState />}
      <PublicInformationBoundary />
      <ProjectsClosingCTA />
    </div>
  );
}
```

Catatan:

- tidak membuat grid pada current state;
- tidak memanggil API;
- tidak membuat loading state;
- tidak menggunakan fallback dummy;
- `publishedProjects` harus tetap kosong pada produksi.

---

## 24. Routing

Pada `AppRouter.jsx`:

```jsx
import ProjectListPage from '../pages/ProjectListPage';
```

Tambahkan:

```jsx
<Route path="/proyek" element={<ProjectListPage />} />
```

Posisi:

```text
setelah /layanan
sebelum /sign-in
```

Jangan menambahkan:

```jsx
<Route path="/proyek/:slug" ... />
```

Fallback `*` tetap menuju `NotFoundPage`.

---

## 25. Navigasi

### 25.1 Desktop

```jsx
<li>
  <NavLink to="/proyek">Proyek</NavLink>
</li>
```

Posisi:

```text
setelah Layanan
sebelum Masuk
```

### 25.2 Mobile Drawer

```jsx
<li>
  <NavLink to="/proyek" onClick={onClose}>
    Proyek
  </NavLink>
</li>
```

### 25.3 Footer

```jsx
<li>
  <Link to="/proyek">Proyek</Link>
</li>
```

---

## 26. Integrasi Beranda

PLAN-006 tidak wajib menambah section proyek pada Beranda.

Alasan:

- navigasi Proyek sudah menyediakan discoverability;
- belum ada proyek yang dapat ditampilkan;
- menambah teaser proyek berisiko menyiratkan portofolio aktif;
- Beranda sudah memiliki alur konteks, cara kerja, layanan, prinsip, dan CTA.

PLAN berikut dapat menambahkan integrasi Beranda setelah ada proyek publik.

---

## 27. Metadata dan SEO

Wajib:

- title unik;
- meta description;
- canonical `/proyek`;
- satu H1;
- document title berubah;
- tidak ada noindex kecuali keputusan terpisah;
- tidak menambahkan structured data proyek;
- tidak menambahkan angka portofolio;
- tidak menambahkan keyword stuffing;
- tidak menambahkan Open Graph image proyek palsu.

---

## 28. Aksesibilitas

Wajib:

1. satu `<main>` dari shell;
2. satu H1;
3. hierarchy heading benar;
4. CTA dapat digunakan keyboard;
5. `aria-current="page"` pada Proyek;
6. drawer tetap inert saat tertutup;
7. Proyek menutup drawer saat diklik;
8. focus-visible terlihat;
9. visual dekoratif `aria-hidden`;
10. tidak ada informasi hanya berdasarkan warna;
11. gerbang dapat dibaca sebagai list;
12. mobile order logis;
13. tidak menggunakan auto-rotating carousel;
14. reduced motion dihormati.

---

## 29. Responsive Behavior

### Mobile

- satu kolom;
- hero compact;
- CTA dapat stack;
- empat gate menjadi list;
- boundary menjadi list;
- spacing mengikuti token;
- tidak ada horizontal scroll.

### Tablet

- gate dapat dua kolom;
- CTA dapat inline bila cukup;
- panjang copy tetap terkendali.

### Desktop

- gate empat kolom;
- hero dapat dua kolom dengan visual abstrak;
- max width mengikuti container global;
- tidak membuat layout terlalu lebar.

---

## 30. Testing

### 30.1 Route

Test:

```text
/proyek → ProjectListPage
/proyek/contoh → 404
```

### 30.2 Metadata

Pastikan:

- title benar;
- description benar;
- canonical `/proyek`.

### 30.3 Semantik

Pastikan:

- satu main;
- satu H1;
- H1 exact;
- heading order masuk akal.

### 30.4 Current-Hold State

Pastikan:

- status notice ada;
- empat gate ada;
- hold state ada;
- boundary ada;
- dua CTA ada.

### 30.5 Larangan UI

Pastikan tidak ada:

- `.project-card`;
- `.projects-toolbar`;
- filter;
- search input;
- sort select;
- pagination;
- project image;
- remote image;
- progress;
- contract value;
- price;
- rating;
- testimonial;
- customer name;
- exact address;
- `coming soon`;
- `segera hadir`;
- `0 proyek`;
- `Lihat Detail Proyek`.

### 30.6 Navigasi

Expected desktop/mobile:

```js
['Beranda', 'Tentang', 'Cara Kerja', 'Layanan', 'Proyek', 'Masuk']
```

Expected footer:

```js
['Beranda', 'Tentang RKK', 'Cara Kerja', 'Layanan', 'Proyek', 'Masuk']
```

Pastikan:

- href Proyek `/proyek`;
- active desktop `aria-current="page"`;
- active drawer `aria-current="page"`;
- klik drawer memanggil onClose.

### 30.7 Resolver

Fixture test tidak masuk production catalog.

Test:

1. non-array menghasilkan `[]`;
2. DRAFT ditolak;
3. INTERNAL ditolak;
4. WITHDRAWN ditolak;
5. record tanpa sourceVersion ditolak;
6. record tanpa effectiveDate ditolak;
7. media tanpa APPROVED ditolak;
8. detail route invalid dihapus atau record ditolak;
9. field sensitif tidak terdapat pada output;
10. input tidak dimutasi;
11. output hanya public fields;
12. record valid dipetakan dengan benar.

### 30.8 Regression

Seluruh test PLAN-001 sampai PLAN-005 harus tetap lulus.

---

## 31. Acceptance Criteria

PLAN-006 diterima apabila:

### Route

- `/proyek` aktif;
- `/proyek/:slug` belum ada;
- `/proyek/contoh` 404;
- fallback tetap bekerja.

### Navigasi

- Proyek tampil pada header;
- Proyek tampil pada drawer;
- Proyek tampil pada footer;
- posisi setelah Layanan dan sebelum Masuk;
- active state benar;
- drawer close tetap bekerja.

### Page

- hero tampil;
- status notice tampil;
- empat gate tampil;
- hold state tampil;
- boundary tampil;
- CTA tampil;
- tidak ada project card;
- tidak ada project image;
- tidak ada filter;
- tidak ada pagination;
- tidak ada detail link.

### Data

- `projectCatalog = []`;
- `resolvePublishedProjects` pure;
- tidak ada data B05;
- tidak ada dummy;
- tidak ada legacy data;
- tidak ada sensitive field pada output.

### Visual

- visual abstrak;
- informational tone;
- CSS scoped;
- responsive;
- accessible;
- reduced motion;
- tidak ada remote image.

### Quality

```text
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
```

seluruhnya lulus.

---

## 32. Protected Files dan Batas Perubahan

Jangan menyentuh:

```text
client/
apps/backend/
packages/
database/
prisma/
legacy route/
auth implementation/
```

Jangan:

- menghapus fitur lama;
- memindahkan folder besar;
- refactor global;
- mengganti dependency;
- mengubah lockfile;
- mengubah konfigurasi build;
- mengubah brand asset;
- menambahkan image eksternal;
- mengaktifkan API.

---

## 33. Tahapan Implementasi

### Tahap 1 — Audit Lokal

```bash
git branch --show-current
git rev-parse HEAD
git status --short
```

Expected:

```text
main
016405d9327125e9b63e626dffc8b9d708d5996d
working tree clean
```

### Tahap 2 — Content Layer

- buat `content/projects.js`;
- isi copy;
- `projectCatalog = []`;
- resolver pure.

### Tahap 3 — Page dan Sections

- buat page composer;
- buat enam komponen current state;
- reuse global UI.

### Tahap 4 — Styling

- buat `projects.css`;
- import di `main.jsx`;
- scope `.page-projects`.

### Tahap 5 — Routing

- tambahkan `/proyek`;
- jangan tambahkan detail route.

### Tahap 6 — Navigasi

- header;
- drawer;
- footer;
- urutan final.

### Tahap 7 — Testing

- `projects.test.jsx`;
- update `app.test.jsx`;
- regression.

### Tahap 8 — Dokumentasi

- simpan PLAN-006 final;
- update `docs/plan/README.md`.

### Tahap 9 — Validasi

- lint;
- test;
- build;
- diff check;
- status.

Gemini tidak boleh commit atau push.

---

## 34. Perintah Validasi

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
git status --short
```

Laporan Gemini harus memuat:

- branch;
- baseline SHA;
- daftar file;
- route;
- urutan navigasi;
- current state;
- jumlah published project;
- konfirmasi no cards/media/filter/detail;
- lint;
- test;
- build;
- diff check;
- status;
- konfirmasi tidak commit/push.

---

## 35. Risiko dan Mitigasi

### Risiko 1 — Data Acuan Dianggap Portofolio

Mitigasi:

- catalog produksi kosong;
- test melarang title proyek acuan;
- copy menjelaskan data acuan bukan bukti proyek.

### Risiko 2 — Foto Stok Dianggap Proyek

Mitigasi:

- tidak ada foto;
- hero visual CSS abstrak;
- test remote image.

### Risiko 3 — Route Detail Terbuka Terlalu Cepat

Mitigasi:

- tidak ada route param;
- test `/proyek/contoh` 404;
- tidak ada detail link.

### Risiko 4 — Data Sensitif Dikirim ke Client

Mitigasi:

- resolver memetakan public fields;
- tidak mengirim objek internal;
- test field sensitif.

### Risiko 5 — Empty State Terlihat Sebagai Error

Mitigasi:

- informational tokens;
- no warning icon;
- no retry;
- no skeleton.

### Risiko 6 — Navigasi Menyiratkan Portofolio Aktif

Mitigasi:

- hero dan status menjelaskan hold state;
- tidak ada card/count/media;
- copy tidak promosi.

### Risiko 7 — Scope Meluas ke Detail Proyek

Mitigasi:

- route detail eksplisit non-scope;
- PLAN Detail Proyek terpisah;
- acceptance criteria 404.

---

## 36. Keputusan Pemilik

Pemilik telah menyetujui:

1. route `/proyek`;
2. current-hold state;
3. menu Proyek pada header, drawer, dan footer;
4. posisi Proyek setelah Layanan dan sebelum Masuk;
5. tidak ada kartu proyek;
6. tidak ada foto proyek;
7. tidak ada proyek B05;
8. tidak ada filter/search/sort/pagination;
9. tidak ada route detail;
10. empat gerbang publikasi;
11. copy hero;
12. copy status;
13. copy hold state;
14. batas informasi;
15. CTA;
16. content contract;
17. resolver lokal;
18. scope file;
19. acceptance criteria;
20. base SHA.

---

## 37. Keputusan Final

Keputusan final:

```text
CURRENT-HOLD STATE DISETUJUI
MENU PROYEK DISETUJUI
ROUTE /proyek DISETUJUI
SEMUA KARTU DAN MEDIA DITAHAN
ROUTE /proyek/:slug DITAHAN
FILTER DAN SEARCH DITAHAN
EMPAT GERBANG PUBLIKASI DISETUJUI
IMPLEMENTASI BOLEH DIMULAI SETELAH AUDIT LOKAL LULUS
```

Alasan:

- jujur terhadap kondisi data;
- mencegah portofolio palsu;
- menyediakan arsitektur top-level yang lengkap;
- future-safe;
- konsisten dengan Daftar Layanan;
- dapat diimplementasikan tanpa P06;
- tidak menghambat tahap proyek berikutnya.

---

## 38. Status Plan Final

```text
AUDIT SUMBER PRY          : SELESAI
AUDIT KONDISI BISNIS      : SELESAI
AUDIT GITHUB BASELINE     : SELESAI
CURRENT-HOLD STATE        : DISETUJUI
COPY HALAMAN              : DISETUJUI
EMPAT GERBANG             : DISETUJUI
NAVIGASI PROYEK           : DISETUJUI
DATA CONTRACT             : DISETUJUI
SCOPE FILE                : DISETUJUI
ACCEPTANCE CRITERIA       : DISETUJUI
BASE SHA                  : 016405d9327125e9b63e626dffc8b9d708d5996d
PERSETUJUAN PEMILIK       : SELESAI — 28 JULI 2026
IMPLEMENTASI              : SIAP DIMULAI SETELAH AUDIT LOKAL LULUS
```

---

## 39. Riwayat Perubahan

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1-draft | 2026-07-28 | Draf awal PLAN-006 berdasarkan paket PRY-01 sampai PRY-05, kondisi bisnis B05, dan repository setelah PLAN-005 | Direview Pemilik |
| 1.0 | 2026-07-28 | Pemilik menyetujui current-hold state, route, navigasi Proyek, empat gerbang publikasi, copy, data contract, scope, dan acceptance criteria | Disetujui Pemilik — Siap Eksekusi Bersyarat Audit Lokal |
