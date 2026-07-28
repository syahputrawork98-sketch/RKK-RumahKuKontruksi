---
kode: PLAN-007
judul: Implementasi Halaman Detail Proyek Publik Rumahku Konstruksi
versi: 1.1
status: SELESAI DAN TERVERIFIKASI
final_audit_sha: bd7431d21680a4ac5b7667a6bf5b8ea8ec33bb77
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
base_sha: bb4733ae4296ff914bbc79aae0443859c4787164
base_sha_status: Baseline awal implementasi; pekerjaan telah selesai dan diverifikasi pada final_audit_sha
area_implementasi: apps/web
route_pattern: /proyek/:slug
route_daftar: /proyek
jenis_pekerjaan: implementasi template halaman detail proyek publik, published-only gate, state aman, metadata dinamis, dan kontrak data future-ready
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-007 — IMPLEMENTASI HALAMAN DETAIL PROYEK PUBLIK RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
SELESAI DAN TERVERIFIKASI
IMPLEMENTASI, ROUTING, RESOLVER, METADATA, TEST, LINT, BUILD, DAN DIFF CHECK TELAH DITERIMA
CURRENT PRODUCTION TETAP MENGGUNAKAN 404 PUBLIK GENERIK
PROJECT CATALOG PRODUKSI TETAP KOSONG
TIDAK ADA DETAIL PROYEK PRODUKSI YANG DIPUBLIKASIKAN
```

Dokumen ini merupakan plan teknis final yang mendokumentasikan implementasi route pola `/proyek/:slug` sebagai halaman Detail Proyek Publik Rumahku Konstruksi.

PLAN-007 membangun:

- route detail;
- published-only gate;
- resolver slug aman;
- template detail future-ready;
- metadata dinamis;
- state 404 publik generik;
- perlindungan data dan media;
- test untuk current state dan future state.

PLAN-007 tidak menerbitkan proyek nyata dan tidak mengubah data acuan menjadi portofolio.

PLAN-007 telah disetujui Pemilik pada 28 Juli 2026 dan dapat digunakan sebagai instruksi eksekusi setelah audit lokal memastikan branch, HEAD, dan working tree sesuai.

---

## 2. Ringkasan Keputusan Disetujui

| Area | Keputusan Disetujui |
|---|---|
| Route detail | `/proyek/:slug` |
| Route daftar | `/proyek` tetap aktif |
| Data produksi | Tetap menggunakan `projectCatalog = []` |
| Slug aktif saat implementasi | 0 |
| Detail proyek published | 0 |
| Perilaku current state | Semua slug menghasilkan state 404 publik generik |
| HTTP status riil | Belum dijamin oleh SPA; PLAN-007 mengatur UI 404 dan `noindex` |
| Template future state | Dibuat dan diuji menggunakan fixture lokal |
| Fixture test | Hanya di file test; tidak masuk production catalog |
| Data B05 | Dilarang tampil |
| Dummy/seed/legacy | Dilarang tampil |
| Resolver | `resolvePublishedProjectDetailBySlug` |
| Gate | Published, public, detail-ready, slug aman, sumber, izin, anonimisasi, review, masa berlaku |
| Metadata published | Dinamis dari DTO publik |
| Metadata unavailable | Generik, `noindex, nofollow`, canonical `/proyek` |
| Breadcrumb | Beranda → Proyek → Judul publik |
| Media | Approved, public, alt text, tanpa EXIF/geotag |
| Section detail | Hero, facts, overview, media, scope, approach, outcomes, related content, CTA |
| Optional section | Tidak dirender bila tidak punya data approved |
| CTA aman | Kembali ke Daftar Proyek dan Pelajari Cara Kerja |
| CTA transaksi | Tidak dibuat |
| API/P06 | Tidak diaktifkan |
| Backend/database/CMS | Tidak disentuh |
| Dependency | Tidak ditambah |
| Navigasi global | Tidak berubah |
| Legacy client | Tidak disentuh |

---

## 3. Latar Belakang

PLAN-006 telah menyelesaikan Halaman Daftar Proyek Publik pada current-hold state.

Kondisi repository setelah PLAN-006:

```text
/proyek                  : aktif
projectCatalog           : []
publishedProjects        : []
project cards            : 0
project media            : 0
/proyek/:slug            : belum terdaftar
unknown project detail   : jatuh ke wildcard 404
```

Paket Detail Proyek Publik pada R02 telah tersedia dan disetujui Pemilik:

1. `PDT-01 — Spesifikasi Halaman Detail Proyek Publik RKK`;
2. `PDT-02 — Pemetaan Data dan Konten Detail Proyek Publik RKK`;
3. `PDT-03 — Daftar Referensi Halaman Detail Proyek Publik RKK`;
4. `PDT-04 — Wireframe Halaman Detail Proyek Publik RKK`;
5. `PDT-05 — Spesifikasi Komponen UI Detail Proyek Publik RKK`.

Paket tersebut menetapkan bahwa halaman detail hanya boleh menampilkan proyek yang:

- telah lolos gerbang publikasi daftar proyek;
- menggunakan slug publik;
- mempunyai detail publik yang lengkap;
- mempunyai sumber yang dapat ditelusuri;
- mempunyai izin publikasi;
- telah dianonimkan;
- mempunyai dokumentasi berizin;
- telah melalui review;
- masih berlaku;
- tidak membawa data internal ke client.

Saat ini belum ada proyek operasional yang memenuhi semua syarat tersebut.

Karena itu, PLAN-007 membangun template dan gate, tetapi current production state tetap tertutup.

---

## 4. Sumber yang Menjadi Dasar

### 4.1 Sumber Utama Detail Proyek

1. `[PDT-01] - SPESIFIKASI HALAMAN DETAIL PROYEK PUBLIK RKK.md`
2. `[PDT-02] - PEMETAAN DATA DAN KONTEN DETAIL PROYEK PUBLIK RKK.csv`
3. `[PDT-03] - DAFTAR REFERENSI HALAMAN DETAIL PROYEK PUBLIK RKK.md`
4. `[PDT-04] - WIREFRAME HALAMAN DETAIL PROYEK PUBLIK RKK.pdf`
5. `[PDT-05] - SPESIFIKASI KOMPONEN UI DETAIL PROYEK PUBLIK RKK.md`

### 4.2 Sumber Induk Daftar Proyek

1. `[PRY-01] - SPESIFIKASI HALAMAN DAFTAR PROYEK PUBLIK RKK.md`
2. `[PRY-02] - PEMETAAN DATA DAN KONTEN DAFTAR PROYEK PUBLIK RKK.csv`
3. `[PRY-03] - DAFTAR REFERENSI HALAMAN DAFTAR PROYEK PUBLIK RKK.md`
4. `[PRY-04] - WIREFRAME HALAMAN DAFTAR PROYEK PUBLIK RKK.pdf`
5. `[PRY-05] - SPESIFIKASI KOMPONEN UI DAFTAR PROYEK PUBLIK RKK.md`

### 4.3 Sumber Produk

1. `[P04-F03] — SPESIFIKASI HALAMAN WEBSITE PUBLIK RKK.md`
2. `[P05.1-F01] — SPESIFIKASI FITUR DAN ALUR WEBSITE PUBLIK RKK.md`
3. `[P07.1-F02] — USER JOURNEY NAVIGASI DAN UX MINIMUM WEBSITE PUBLIK RKK.md`
4. `[P07.1-F04] — BLUEPRINT DAN SPESIFIKASI UI HALAMAN WEBSITE PUBLIK RKK.md`
5. `[P07.1-F05] — STATUS KESIAPAN DAN HANDOFF WEBSITE PUBLIK RKK.md`

### 4.4 Sumber Bisnis

1. keputusan aktif Pemilik RKK;
2. sumber bisnis Room 1;
3. struktur proyek B05 hanya untuk memahami domain;
4. sumber proyek operasional nyata pada masa depan;
5. izin publikasi proyek;
6. izin penggunaan media;
7. keputusan anonimisasi;
8. hasil review konten publik.

### 4.5 Sumber Teknis

Repository:

```text
syahputrawork98-sketch/RKK-RumahKuKontruksi
```

Baseline:

```text
branch   : main
base SHA : bb4733ae4296ff914bbc79aae0443859c4787164
```

---

## 5. Hierarki Sumber Kebenaran

Urutan keputusan:

1. keputusan Pemilik RKK;
2. sumber bisnis aktif Room 1;
3. sumber operasional proyek nyata;
4. izin publikasi dan izin media;
5. keputusan anonimisasi dan review;
6. paket PDT-01 sampai PDT-05;
7. paket PRY-01 sampai PRY-05;
8. P04 dan P05 setelah sinkronisasi;
9. kontrak publik P06 setelah tersedia;
10. P07/P07.1;
11. repository aktif;
12. arsip dan legacy hanya sebagai pembanding.

Aturan:

- detail proyek tidak boleh melonggarkan gate halaman daftar;
- keberadaan record internal tidak berarti record boleh dirender;
- referensi bukan izin publikasi;
- data `ACUAN`, seed, dummy, mock, dan legacy bukan portofolio.

---

## 6. Tujuan PLAN-007

PLAN-007 bertujuan:

1. mendaftarkan route `/proyek/:slug`;
2. membaca slug publik dengan aman;
3. membangun resolver detail publik yang pure;
4. menerapkan published-only gate;
5. menyatukan current state dan future state secara aman;
6. membangun state 404 publik generik;
7. membangun template detail future-ready;
8. mengatur metadata dinamis untuk detail published;
9. mengatur `noindex` untuk detail unavailable;
10. menyediakan breadcrumb;
11. menyediakan hero detail;
12. menyediakan fakta proyek publik;
13. menyediakan overview;
14. menyediakan media berizin;
15. menyediakan scope publik;
16. menyediakan pendekatan/tahapan;
17. menyediakan outcomes yang dapat dibuktikan;
18. menyediakan layanan terkait;
19. menyediakan proyek terkait secara aman;
20. menyediakan CTA penutup nontransaksional;
21. memastikan optional section hilang dengan rapi;
22. melindungi identitas pelanggan;
23. melindungi alamat rinci;
24. melindungi nilai dan data kontrak;
25. melindungi data keuangan;
26. melindungi dokumen internal;
27. memastikan data sensitif tidak masuk client DTO;
28. menguji current production state tanpa data;
29. menguji future template dengan fixture lokal;
30. tidak menambahkan API, backend, database, CMS, atau dependency.

---

## 7. Non-Tujuan

PLAN-007 tidak bertujuan:

- menerbitkan proyek operasional;
- mengaktifkan slug publik nyata;
- mengisi `projectCatalog`;
- menggunakan sembilan proyek B05;
- menggunakan proyek legacy;
- membuat proyek contoh pada production;
- membuat kartu proyek baru di `/proyek`;
- mengaktifkan filter;
- mengaktifkan pencarian;
- mengaktifkan pagination;
- membuat admin project;
- membuat CMS;
- membuat endpoint API;
- membuat database query;
- membuat preview internal;
- membuat mode editor;
- membuat login;
- membuat CTA konsultasi;
- membuat CTA pengajuan proyek;
- membuat CTA permintaan penawaran;
- membuat CTA WhatsApp;
- membuat estimasi biaya;
- membuat jadwal proyek;
- membuat progress tracker publik;
- membuat before-after tanpa izin;
- menampilkan testimonial pelanggan;
- menampilkan nama pelanggan;
- menampilkan alamat rinci;
- menampilkan koordinat;
- menampilkan nilai kontrak;
- menampilkan biaya;
- menampilkan pembayaran;
- menampilkan margin;
- menampilkan BOQ;
- menampilkan RAB;
- menampilkan nomor dokumen;
- menampilkan internal ID;
- menjamin HTTP transport status 404 dari Vercel;
- mengubah deployment config;
- menambah dependency;
- menyentuh legacy client.

---

## 8. Batas Implementasi Current State

Production data:

```text
projectCatalog = []
```

Hasil:

```text
/proyek/proyek-apa-pun
→ ProjectDetailPage
→ slug divalidasi
→ resolver mencari record published
→ tidak ditemukan
→ ProjectDetailUnavailableState
→ visual 404 publik generik
→ meta robots noindex, nofollow
→ canonical /proyek
```

Tidak ada slug yang menghasilkan `PublishedProjectDetail` pada production.

Future template hanya diuji menggunakan fixture yang berada di test.

---

## 9. Keterbatasan SPA yang Harus Dicatat

React Router dapat:

- mencocokkan route `/proyek/:slug`;
- menampilkan UI 404;
- mengatur metadata `noindex`;
- mencegah kebocoran alasan internal.

React Router pada client-side SPA tidak otomatis menjamin response HTTP `404`.

Karena itu acceptance criteria PLAN-007 menggunakan istilah:

```text
CLIENT-SIDE 404 PUBLIC STATE
```

Bukan:

```text
SERVER TRANSPORT 404 GUARANTEED
```

HTTP status riil dapat diselesaikan pada plan deployment, SSR, edge routing, atau server rendering pada masa depan.

PLAN-007 tidak mengubah Vercel config.

---

## 10. Keputusan Route

Tambahkan route:

```jsx
<Route path="/proyek/:slug" element={<ProjectDetailPage />} />
```

Posisi:

```text
setelah /proyek
sebelum /sign-in
```

Urutan:

```text
/proyek
/proyek/:slug
/sign-in
*
```

Route daftar tetap:

```text
/proyek
```

Wildcard tetap digunakan untuk route selain pola detail proyek.

---

## 11. Definisi State

### 11.1 `PUBLISHED`

Record lolos seluruh gate dan dapat dirender sebagai detail publik.

### 11.2 `UNAVAILABLE`

Digunakan untuk semua kondisi berikut:

- slug tidak aman;
- slug tidak dikenal;
- record tidak ditemukan;
- record draft;
- record review;
- record withdrawn;
- visibility bukan public;
- detail belum ready;
- source version tidak ada;
- effective date belum berlaku;
- review due date lewat;
- izin belum approved;
- anonimisasi belum approved;
- content review belum approved;
- media wajib tidak valid;
- field detail wajib tidak lengkap.

UI tidak menjelaskan alasan internal.

### 11.3 `ERROR`

Future state untuk kegagalan data layer/API.

Pada PLAN-007 current local mode:

- resolver sinkron;
- tidak ada fetch;
- tidak ada API;
- `ERROR` tidak terjadi pada production;
- bentuk state boleh disiapkan secara konseptual atau sebagai komponen terpisah tanpa dipakai.

### 11.4 `LOADING`

Future state untuk async data.

Pada PLAN-007:

- tidak ada async fetch;
- tidak perlu loading skeleton pada route current production;
- jangan membuat loading palsu.

---

## 12. Copy State Tidak Tersedia

Label:

```text
404
```

H1:

```text
Halaman proyek tidak tersedia.
```

Description:

```text
Proyek yang Anda cari belum tersedia untuk ditampilkan secara publik atau alamatnya tidak dapat digunakan.
```

Primary CTA:

```text
Kembali ke Daftar Proyek
```

Target:

```text
/proyek
```

Secondary CTA:

```text
Kembali ke Beranda
```

Target:

```text
/
```

Aturan copy:

- generik;
- tidak menyebut draft;
- tidak menyebut withdrawn;
- tidak menyebut expired;
- tidak menyebut permission;
- tidak menyebut review;
- tidak mengonfirmasi keberadaan record internal;
- tidak menyebut nama proyek dari slug;
- tidak memantulkan slug ke UI.

---

## 13. Metadata State Tidak Tersedia

Title:

```text
Halaman proyek tidak tersedia | Rumahku Konstruksi
```

Description:

```text
Halaman proyek yang Anda cari belum tersedia untuk ditampilkan secara publik.
```

Canonical:

```text
/proyek
```

Robots:

```text
noindex, nofollow
```

Dilarang:

- canonical ke slug invalid;
- title dari slug;
- description dari data internal;
- Open Graph proyek;
- structured data proyek;
- breadcrumb JSON-LD untuk unavailable state.

---

## 14. Metadata Detail Published

Title:

```text
{publicTitle} | Proyek Rumahku Konstruksi
```

Description:

```text
publicSummary
```

Canonical:

```text
/proyek/{safeSlug}
```

Robots:

```text
index, follow
```

Batas:

- title hanya memakai judul publik approved;
- description hanya memakai ringkasan publik;
- tidak memakai nama pelanggan;
- tidak memakai alamat rinci;
- tidak memakai nilai kontrak;
- tidak memakai klaim yang belum dibuktikan;
- tidak membuat structured data pada PLAN-007 kecuali diputuskan terpisah.

---

## 15. Perubahan `PageMeta`

File:

```text
apps/web/src/components/ui/PageMeta.jsx
```

Tambahkan prop opsional:

```jsx
robots
```

Signature:

```jsx
export function PageMeta({ title, description, path, robots })
```

Behavior:

- bila `robots` tersedia, buat atau perbarui `<meta name="robots">`;
- simpan state sebelumnya;
- restore saat unmount;
- halaman lama yang tidak mengirim `robots` tidak berubah;
- tidak menambah dependency.

Test:

- robots dibuat;
- robots diperbarui;
- robots dibersihkan atau direstore saat unmount;
- existing title, description, canonical tetap lulus.

---

## 16. Content Layer

Buat:

```text
apps/web/src/content/project-detail.js
```

Ekspor minimal:

```js
export const projectDetailContent = {};
export const SAFE_PUBLIC_PROJECT_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export function resolvePublishedProjectDetailBySlug(projects, slug, options) {}
```

Production catalog tetap di:

```text
apps/web/src/content/projects.js
```

Page mengimpor:

```js
projectCatalog
```

Tidak membuat katalog produksi kedua.

---

## 17. `projectDetailContent`

Memuat copy:

- unavailable metadata;
- unavailable state;
- breadcrumb label;
- section labels;
- fallback cover label;
- CTA penutup.

Contoh struktur:

```js
export const projectDetailContent = {
  unavailable: {
    meta: {},
    label: '404',
    title: 'Halaman proyek tidak tersedia.',
    description: '...',
    primaryCTA: {},
    secondaryCTA: {},
  },
  labels: {
    home: 'Beranda',
    projects: 'Proyek',
    facts: 'Ringkasan Proyek',
    overview: 'Gambaran dan Kebutuhan',
    media: 'Galeri Dokumentasi',
    scope: 'Ruang Lingkup',
    approach: 'Pendekatan dan Tahapan',
    outcomes: 'Hasil yang Dapat Dibuktikan',
    relatedServices: 'Layanan Terkait',
    relatedProjects: 'Proyek Terkait',
  },
  closingCTA: {},
};
```

Jangan menulis copy berulang langsung pada komponen.

---

## 18. Resolver Detail Publik

Nama:

```text
resolvePublishedProjectDetailBySlug
```

Signature konseptual:

```js
resolvePublishedProjectDetailBySlug(
  projects,
  slug,
  { now = new Date() } = {}
)
```

Output:

```ts
type ProjectDetailResolution =
  | {
      status: 'PUBLISHED';
      project: PublicProjectDetailDTO;
    }
  | {
      status: 'UNAVAILABLE';
      project: null;
    };
```

Tidak mengembalikan alasan internal.

Dilarang output seperti:

```text
WITHDRAWN
PERMISSION_REVOKED
INTERNAL_PROJECT_EXISTS
REVIEW_EXPIRED
```

Reason internal boleh dipakai di server logs masa depan, tetapi tidak di client response PLAN-007.

---

## 19. Validasi Slug

Pola:

```js
/^[a-z0-9]+(?:-[a-z0-9]+)*$/
```

Slug aman:

```text
rumah-tinggal
renovasi-rumah-2026
proyek-hunian-minimalis
```

Slug tidak aman:

```text
../sign-in
/proyek-rahasia
Proyek Pelanggan
rumah--tinggal
customer@example.com
PRJ_INTERNAL_001
rumah_tinggal
%2e%2e
```

Aturan:

- trim;
- lowercase exact;
- tidak melakukan fallback ke publicProjectId;
- tidak melakukan decode manual berulang;
- tidak memantulkan slug invalid;
- invalid slug langsung `UNAVAILABLE`.

---

## 20. Gate Published-Only

Record hanya `PUBLISHED` bila seluruh syarat berikut benar:

### 20.1 Gate Daftar

```text
publicationStatus === 'PUBLISHED'
visibility === 'PUBLIC'
detailPageReady === true
```

### 20.2 Gate Slug

```text
record.slug aman
record.slug === requested slug
```

### 20.3 Gate Sumber

Minimal:

```text
sourceVersion tersedia
effectiveDate tersedia
```

### 20.4 Gate Masa Berlaku

- `effectiveDate` tidak berada di masa depan;
- bila `reviewDueAt` tersedia, tanggal tersebut belum lewat;
- `now` diinjeksi untuk test;
- tidak bergantung langsung pada waktu sistem di test.

### 20.5 Gate Tata Kelola Konseptual

Karena kontrak P06 belum final, gunakan group konseptual:

```js
publicationGate: {
  sourceVerified: true,
  permissionApproved: true,
  anonymizationApproved: true,
  contentReviewApproved: true,
}
```

Seluruh nilai harus `true`.

Nama final dapat disesuaikan ketika P06 tersedia, tetapi aturan bisnis tidak boleh dilemahkan.

### 20.6 Gate Field Wajib

Minimal:

```text
publicProjectId
slug
title
summary
category
overview
facts
scope
coverMedia
```

### 20.7 Gate Media

Cover wajib approved dan public.

Galeri opsional, tetapi setiap item harus approved dan public.

---

## 21. Kontrak Data Detail Future-Safe

Kontrak konseptual:

```ts
type PublicProjectDetailRecord = {
  publicProjectId: string;
  slug: string;

  title: string;
  summary: string;
  category: string;

  publicationStatus: 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'WITHDRAWN';
  visibility: 'PRIVATE' | 'INTERNAL' | 'PUBLIC';
  detailPageReady: boolean;

  sourceVersion: string;
  effectiveDate: string;
  reviewDueAt?: string;

  publicationGate: {
    sourceVerified: boolean;
    permissionApproved: boolean;
    anonymizationApproved: boolean;
    contentReviewApproved: boolean;
  };

  publicStatus?: string;
  locationGeneral?: string;
  periodGeneral?: string;
  completionYear?: number;
  serviceType?: string;
  workType?: string;

  overview: string[];
  facts: PublicProjectFact[];
  scope: string[];
  approach?: PublicProjectStep[];
  outcomes?: PublicProjectOutcome[];

  coverMedia: PublicProjectMedia;
  gallery?: PublicProjectMedia[];

  relatedServices?: PublicRelationLink[];
  relatedProjects?: PublicRelatedProject[];
};
```

---

## 22. DTO Publik

Resolver hanya mengembalikan:

```ts
type PublicProjectDetailDTO = {
  publicProjectId: string;
  slug: string;

  title: string;
  summary: string;
  category: string;

  publicStatus?: string;
  locationGeneral?: string;
  periodGeneral?: string;
  completionYear?: number;

  facts: Array<{
    label: string;
    value: string;
  }>;

  overview: string[];
  scope: string[];

  approach: Array<{
    order: number;
    title: string;
    description?: string;
  }>;

  outcomes: Array<{
    title: string;
    description?: string;
  }>;

  coverMedia: {
    src: string;
    alt: string;
    type?: string;
  };

  gallery: Array<{
    src: string;
    alt: string;
    type?: string;
  }>;

  relatedServices: Array<{
    title: string;
    href: string;
  }>;

  relatedProjects: Array<{
    title: string;
    href: string;
    summary?: string;
  }>;

  meta: {
    title: string;
    description: string;
    canonicalPath: string;
  };
};
```

DTO tidak membawa object internal.

---

## 23. Field Sensitif yang Dilarang

Tidak boleh berada di DTO, props, markup, dataset, JSON inline, source map, atau client bundle:

```text
internalProjectId
projectCodeInternal
customerId
customerName
customerPhone
customerEmail
phone
email
exactAddress
coordinates
latitude
longitude
contractNumber
contractValue
budget
cost
paymentStatus
paymentHistory
margin
profit
personIds
personNames
documentIds
documentLinksInternal
riskCodes
internalProgress
internalStatus
internalNotes
issueNotes
legalNotes
disputeStatus
supplierData
vendorData
bankData
taxData
```

Tidak cukup disembunyikan melalui CSS.

---

## 24. Media Publik

Kontrak:

```ts
type PublicProjectMedia = {
  src: string;
  alt: string;
  type?: 'IMAGE';
  rightsStatus: 'APPROVED';
  publicVisibility: 'PUBLIC';
  sourceVersion: string;
};
```

Validasi:

- `src` non-empty setelah trim;
- `alt` non-empty setelah trim;
- rights approved;
- public visibility;
- source version;
- tidak membawa EXIF;
- tidak membawa geotag;
- tidak membawa nama file sensitif sebagai teks UI;
- tidak membawa lokasi rinci;
- tidak membawa wajah/pelat/identitas yang belum disetujui.

Production current state:

```text
Tidak ada media detail proyek.
```

Fixture media hanya di test.

---

## 25. Struktur Halaman Published Future State

Urutan:

1. Global Header;
2. Project Breadcrumb;
3. Project Detail Hero;
4. Project Facts;
5. Project Overview;
6. Project Media Gallery;
7. Project Scope;
8. Project Approach;
9. Project Outcomes;
10. Related Services;
11. Related Projects;
12. Project Detail Closing CTA;
13. Global Footer.

Section opsional tidak merender wrapper kosong.

---

## 26. `ProjectBreadcrumb`

Struktur:

```text
Beranda / Proyek / {Judul Proyek Publik}
```

Link:

```text
Beranda → /
Proyek  → /proyek
```

Judul saat ini:

- teks biasa;
- `aria-current="page"`;
- hanya judul publik;
- tidak memakai slug sebagai fallback;
- tidak tampil pada unavailable state bila berisiko memantulkan slug.

---

## 27. `ProjectDetailHero`

Konten:

- kategori publik;
- H1 judul publik;
- ringkasan publik;
- metadata umum;
- cover media approved.

Metadata umum dapat memuat:

- lokasi umum;
- periode umum;
- status publik;
- completion year.

Tidak boleh memuat:

- pelanggan;
- alamat rinci;
- nilai;
- progress internal;
- janji hasil;
- klaim tanpa bukti.

Fallback cover:

- visual abstrak netral;
- bukan foto stok yang disajikan sebagai proyek;
- `aria-hidden` bila dekoratif.

---

## 28. `ProjectFacts`

Heading:

```text
Ringkasan Proyek
```

Fakta publik disajikan sebagai label-value.

Contoh label yang diizinkan:

- Jenis layanan;
- Tipe pekerjaan;
- Lokasi umum;
- Tahun/periode;
- Status publik.

Aturan:

- maksimum ringkas;
- tidak menggunakan ikon semata sebagai label;
- tidak mengisi tanda `-` untuk data tidak ada;
- fakta tanpa nilai tidak dirender;
- tidak menurunkan data dari field internal.

---

## 29. `ProjectOverview`

Heading:

```text
Gambaran dan Kebutuhan
```

Aturan:

- 1–4 paragraf;
- plain text;
- tidak merender rich HTML tanpa sanitasi;
- tidak memuat cerita pelanggan yang dapat diidentifikasi;
- tidak memuat alamat;
- tidak memuat alasan finansial pelanggan;
- tidak memuat sengketa;
- link hanya bila route/domain diizinkan.

---

## 30. `ProjectMediaGallery`

Heading:

```text
Galeri Dokumentasi Berizin
```

Aturan:

- opsional;
- tidak dirender bila gallery kosong;
- hanya media approved/public;
- cover tidak perlu diduplikasi;
- keyboard accessible;
- alt text faktual;
- tidak auto-play;
- tidak auto-rotate;
- tidak membutuhkan lightbox pada PLAN-007;
- grid responsif cukup;
- tidak mengekspos EXIF/geotag;
- tidak memakai remote stock image.

---

## 31. `ProjectScope`

Heading:

```text
Ruang Lingkup
```

Aturan:

- 3–10 item bila section dirender;
- berasal dari scope publik;
- bukan BOQ;
- bukan RAB;
- bukan daftar biaya;
- bukan daftar vendor;
- urutan berasal dari konten;
- tidak sorting alfabet otomatis;
- plain list semantik.

---

## 32. `ProjectApproach`

Heading:

```text
Pendekatan dan Tahapan
```

Aturan:

- opsional;
- 2–8 langkah;
- nomor urut;
- nomor tetap terbaca tanpa warna;
- title wajib;
- description opsional;
- tidak mengklaim SLA;
- tidak mengklaim tanggal penyelesaian;
- tidak menampilkan internal workflow code.

Contoh struktur generik:

```text
01 Penilaian kebutuhan
02 Perencanaan
03 Pelaksanaan
04 Pemeriksaan
```

Contoh bukan data proyek nyata.

---

## 33. `ProjectOutcomes`

Heading:

```text
Hasil yang Dapat Dibuktikan
```

Aturan:

- opsional;
- hanya hasil approved;
- hanya hasil yang mempunyai bukti aman;
- section hilang bila belum ada hasil;
- tidak menampilkan rating;
- tidak menampilkan testimonial;
- tidak menggunakan klaim absolut;
- tidak menyimpulkan kepuasan pelanggan tanpa sumber.

---

## 34. `RelatedServices`

Heading:

```text
Layanan Terkait
```

Aturan:

- opsional;
- maksimum tiga;
- hanya route layanan published;
- karena layanan published saat ini 0, section current production tidak tampil;
- tidak link ke `/layanan/:slug` sebelum route layanan detail aktif;
- fallback: section hilang.

---

## 35. `RelatedProjects`

Heading:

```text
Proyek Terkait
```

Aturan:

- opsional;
- maksimum tiga;
- hanya record published;
- hanya `detailPageReady`;
- tidak menampilkan proyek saat ini;
- href slug aman;
- tidak memakai data acuan;
- current production tidak tampil.

---

## 36. `ProjectDetailClosingCTA`

Heading:

```text
Lihat kembali proyek publik yang tersedia.
```

Primary CTA:

```text
Kembali ke Daftar Proyek
```

Target:

```text
/proyek
```

Secondary CTA:

```text
Pelajari Cara Kerja
```

Target:

```text
/cara-kerja
```

Dilarang:

- ajukan proyek;
- minta penawaran;
- pesan sekarang;
- konsultasi sekarang;
- WhatsApp;
- hitung biaya;
- jadwalkan survei.

---

## 37. Komponen

Buat:

```text
apps/web/src/pages/ProjectDetailPage.jsx

apps/web/src/sections/project-detail/ProjectDetailUnavailableState.jsx
apps/web/src/sections/project-detail/PublishedProjectDetail.jsx
apps/web/src/sections/project-detail/ProjectBreadcrumb.jsx
apps/web/src/sections/project-detail/ProjectDetailHero.jsx
apps/web/src/sections/project-detail/ProjectFacts.jsx
apps/web/src/sections/project-detail/ProjectOverview.jsx
apps/web/src/sections/project-detail/ProjectMediaGallery.jsx
apps/web/src/sections/project-detail/ProjectScope.jsx
apps/web/src/sections/project-detail/ProjectApproach.jsx
apps/web/src/sections/project-detail/ProjectOutcomes.jsx
apps/web/src/sections/project-detail/RelatedServices.jsx
apps/web/src/sections/project-detail/RelatedProjects.jsx
apps/web/src/sections/project-detail/ProjectDetailClosingCTA.jsx
```

Komponen future state tetap boleh dibuat walaupun tidak dirender production.

Alasan:

- PLAN-007 memang menyiapkan template detail;
- fixture test memverifikasi struktur;
- production catalog tetap kosong;
- tidak ada klaim publik.

---

## 38. `ProjectDetailPage`

Tanggung jawab:

1. membaca `slug` dengan `useParams`;
2. memanggil resolver;
3. tidak melakukan fetch;
4. tidak membaca environment;
5. bila `UNAVAILABLE`, render unavailable state;
6. bila `PUBLISHED`, render `PublishedProjectDetail`;
7. memasang metadata sesuai state;
8. tidak mengirim alasan internal ke UI.

Signature yang memudahkan test:

```jsx
export default function ProjectDetailPage({
  catalog = projectCatalog,
  now,
}) {}
```

Production router:

```jsx
<ProjectDetailPage />
```

Test boleh mengirim fixture melalui prop.

---

## 39. Page Composer Konseptual

```jsx
export default function ProjectDetailPage({
  catalog = projectCatalog,
  now,
}) {
  const { slug = '' } = useParams();

  const resolution = resolvePublishedProjectDetailBySlug(
    catalog,
    slug,
    { now }
  );

  if (resolution.status !== 'PUBLISHED') {
    return <ProjectDetailUnavailableState />;
  }

  return <PublishedProjectDetail project={resolution.project} />;
}
```

Tidak ada loading palsu.

---

## 40. `ProjectDetailUnavailableState`

Tanggung jawab:

- metadata generic;
- robots noindex;
- label 404;
- H1 generic;
- description generic;
- link ke `/proyek`;
- link ke `/`;
- tidak menampilkan breadcrumb slug;
- tidak menampilkan project title;
- tidak menampilkan alasan gate gagal.

Gunakan komponen dedicated, bukan `NotFoundPage`, karena CTA utama harus kembali ke daftar proyek dan metadata harus noindex.

---

## 41. `PublishedProjectDetail`

Tanggung jawab:

- menerima DTO publik;
- tidak melakukan resolver ulang;
- tidak melakukan fetch;
- merender section wajib;
- merender section opsional hanya bila data ada;
- memasang metadata published;
- tidak memodifikasi data.

---

## 42. Reuse Komponen Global

Gunakan:

- `PublicAppShell`;
- `PublicHeader`;
- `PublicFooter`;
- `PublicSection`;
- `PublicContainer`;
- `SectionHeading`;
- `PageMeta`;
- `Link`;
- token global;
- button pattern global.

Jangan membuat ulang container atau shell.

---

## 43. Styling

Buat:

```text
apps/web/src/styles/project-detail.css
```

Import pada:

```text
apps/web/src/main.jsx
```

Scope wajib:

```css
.page-project-detail { }
.page-project-detail .project-detail-unavailable { }
.page-project-detail .project-breadcrumb { }
.page-project-detail .project-detail-hero { }
.page-project-detail .project-facts { }
.page-project-detail .project-overview { }
.page-project-detail .project-gallery { }
.page-project-detail .project-scope { }
.page-project-detail .project-approach { }
.page-project-detail .project-outcomes { }
.page-project-detail .related-services { }
.page-project-detail .related-projects { }
.page-project-detail .project-detail-closing-cta { }
```

Seluruh selector class detail harus memiliki prefix `.page-project-detail`.

Tidak mengubah selector global.

---

## 44. Responsive Behavior

### Mobile

- satu kolom;
- breadcrumb wrap;
- hero compact;
- fakta satu kolom;
- gallery satu kolom;
- CTA stack;
- tidak ada horizontal scroll;
- title tidak overflow;
- long text wrap.

### Tablet

- fakta dua kolom;
- gallery dua kolom;
- approach dua kolom bila sesuai.

### Desktop

- hero dapat dua kolom;
- fakta empat kolom maksimum;
- gallery 2–3 kolom;
- max width mengikuti container;
- reading line length terkendali.

---

## 45. Aksesibilitas

Wajib:

1. satu main dari shell;
2. satu H1 pada setiap state;
3. heading hierarchy benar;
4. breadcrumb memakai nav berlabel;
5. current breadcrumb memakai `aria-current="page"`;
6. CTA keyboard accessible;
7. focus-visible;
8. list memakai elemen semantik;
9. gallery alt text;
10. visual fallback dekoratif `aria-hidden`;
11. nomor approach tidak hanya berdasarkan warna;
12. tidak ada carousel auto-rotate;
13. reduced motion;
14. unavailable state tidak memantulkan slug;
15. link mempunyai nama jelas.

---

## 46. SEO dan Indexing Test

### Published Fixture

Pastikan:

- title dinamis;
- description public summary;
- canonical slug aman;
- robots `index, follow` atau robots default yang disetujui;
- tidak ada sensitive metadata.

### Unavailable Production

Pastikan:

- title generic;
- description generic;
- canonical `/proyek`;
- robots `noindex, nofollow`;
- tidak ada slug dalam title/description;
- tidak ada structured data proyek.

---

## 47. Test Resolver

Buat fixture valid lokal.

Test:

1. non-array → `UNAVAILABLE`;
2. slug non-string → `UNAVAILABLE`;
3. slug kosong → `UNAVAILABLE`;
4. slug unsafe → `UNAVAILABLE`;
5. unknown slug → `UNAVAILABLE`;
6. DRAFT → `UNAVAILABLE`;
7. REVIEW → `UNAVAILABLE`;
8. WITHDRAWN → `UNAVAILABLE`;
9. visibility INTERNAL → `UNAVAILABLE`;
10. detailPageReady false → `UNAVAILABLE`;
11. sourceVersion kosong → `UNAVAILABLE`;
12. effectiveDate kosong → `UNAVAILABLE`;
13. effectiveDate masa depan → `UNAVAILABLE`;
14. reviewDueAt lewat → `UNAVAILABLE`;
15. sourceVerified false → `UNAVAILABLE`;
16. permissionApproved false → `UNAVAILABLE`;
17. anonymizationApproved false → `UNAVAILABLE`;
18. contentReviewApproved false → `UNAVAILABLE`;
19. publicProjectId kosong → `UNAVAILABLE`;
20. title kosong → `UNAVAILABLE`;
21. summary kosong → `UNAVAILABLE`;
22. category kosong → `UNAVAILABLE`;
23. overview kosong → `UNAVAILABLE`;
24. facts kosong → `UNAVAILABLE`;
25. scope kurang dari minimum → `UNAVAILABLE`;
26. cover rights bukan approved → `UNAVAILABLE`;
27. cover visibility bukan public → `UNAVAILABLE`;
28. cover src kosong → `UNAVAILABLE`;
29. cover alt kosong → `UNAVAILABLE`;
30. valid record → `PUBLISHED`;
31. output hanya DTO publik;
32. input tidak dimutasi;
33. alasan internal tidak terdapat pada output;
34. related service invalid dihapus;
35. related project current dihapus;
36. related project unsafe dihapus;
37. gallery invalid dihapus;
38. optional section kosong menjadi array kosong.

---

## 48. Test Field Sensitif

Fixture memasukkan seluruh field sensitif.

Pastikan output tidak mempunyai:

```text
internalProjectId
projectCodeInternal
customerId
customerName
customerPhone
customerEmail
phone
email
exactAddress
coordinates
latitude
longitude
contractNumber
contractValue
budget
cost
paymentStatus
paymentHistory
margin
profit
personIds
personNames
documentIds
documentLinksInternal
riskCodes
internalProgress
internalStatus
internalNotes
issueNotes
legalNotes
disputeStatus
supplierData
vendorData
bankData
taxData
```

Gunakan loop `not.toHaveProperty`.

---

## 49. Test Current Production Route

Production catalog:

```js
expect(projectCatalog).toEqual([]);
```

Route:

```text
/proyek/contoh
/proyek/proyek-001
/proyek/rumah-tinggal
/proyek/../sign-in
```

Expected:

- unavailable state;
- label 404;
- H1 generic;
- CTA `/proyek`;
- CTA `/`;
- noindex;
- slug tidak tampil;
- tidak ada detail section;
- tidak ada project image;
- tidak ada customer data.

Catatan:

Router dapat menormalisasi beberapa URL; test unsafe slug juga dilakukan langsung pada resolver.

---

## 50. Test Published Template dengan Fixture

Render `ProjectDetailPage` atau `PublishedProjectDetail` menggunakan fixture lokal.

Pastikan:

- breadcrumb;
- category;
- H1;
- summary;
- facts;
- overview;
- cover;
- gallery;
- scope;
- approach;
- outcomes;
- related services;
- related projects;
- CTA;
- metadata;
- canonical;
- robots;
- optional sections.

Fixture tidak boleh diekspor dari production content.

---

## 51. Test Optional Section

Buat fixture minimal valid tanpa:

- gallery;
- approach;
- outcomes;
- related services;
- related projects.

Pastikan section dan heading tersebut tidak dirender.

Tidak boleh ada wrapper kosong.

---

## 52. Test Routing

Pada `app.test.jsx`:

```text
/proyek          → ProjectListPage
/proyek/:slug    → ProjectDetailPage
```

Dengan production catalog kosong:

```text
/proyek/contoh → unavailable detail state
```

Pastikan bukan wildcard generic app 404 secara kebetulan.

Halaman detail harus mempunyai CTA ke `/proyek`.

Unknown nonproject route tetap `NotFoundPage`.

---

## 53. Test `PageMeta`

Perbarui test untuk prop robots.

Pastikan:

- robots dibuat bila belum ada;
- robots content benar;
- robots lama direstore;
- robots buatan dihapus saat unmount;
- halaman tanpa robots tidak berubah;
- title/description/canonical regression lulus.

---

## 54. File Baru yang Diusulkan

```text
apps/web/src/pages/ProjectDetailPage.jsx
apps/web/src/content/project-detail.js

apps/web/src/sections/project-detail/ProjectDetailUnavailableState.jsx
apps/web/src/sections/project-detail/PublishedProjectDetail.jsx
apps/web/src/sections/project-detail/ProjectBreadcrumb.jsx
apps/web/src/sections/project-detail/ProjectDetailHero.jsx
apps/web/src/sections/project-detail/ProjectFacts.jsx
apps/web/src/sections/project-detail/ProjectOverview.jsx
apps/web/src/sections/project-detail/ProjectMediaGallery.jsx
apps/web/src/sections/project-detail/ProjectScope.jsx
apps/web/src/sections/project-detail/ProjectApproach.jsx
apps/web/src/sections/project-detail/ProjectOutcomes.jsx
apps/web/src/sections/project-detail/RelatedServices.jsx
apps/web/src/sections/project-detail/RelatedProjects.jsx
apps/web/src/sections/project-detail/ProjectDetailClosingCTA.jsx

apps/web/src/styles/project-detail.css
apps/web/src/test/project-detail.test.jsx

docs/plan/PLAN-007_IMPLEMENTASI_HALAMAN_DETAIL_PROYEK_PUBLIK_RUMAHKU_KONSTRUKSI.md
```

---

## 55. File yang Diubah

```text
apps/web/src/app/AppRouter.jsx
apps/web/src/main.jsx
apps/web/src/components/ui/PageMeta.jsx
apps/web/src/test/app.test.jsx
docs/plan/README.md
```

Opsional bila test metadata sudah berada di file lain:

```text
apps/web/src/test/page-meta.test.jsx
```

Bila file baru test metadata dibuat, jangan menambah dependency.

---

## 56. File yang Tidak Diubah

```text
apps/web/src/content/projects.js
apps/web/src/pages/ProjectListPage.jsx
apps/web/src/styles/projects.css
apps/web/src/components/public/PublicHeader.jsx
apps/web/src/components/public/MobileDrawer.jsx
apps/web/src/components/public/PublicFooter.jsx
```

Alasan:

- navigasi global sudah lengkap;
- daftar proyek sudah final;
- production catalog tetap kosong;
- PLAN-007 tidak mengubah halaman daftar.

Pengecualian hanya bila audit implementasi menemukan kebutuhan teknis langsung dan Pemilik menyetujuinya.

---

## 57. Protected Scope

Jangan menyentuh:

```text
client/
apps/backend/
packages/
database/
prisma/
auth implementation
lockfile
package.json
vite config
deployment config
brand assets
PLAN-001 sampai PLAN-006
```

Jangan menambah dependency.

---

## 58. Acceptance Criteria — Route

PLAN-007 diterima apabila:

- `/proyek/:slug` terdaftar;
- route berada setelah `/proyek`;
- `/proyek` tidak berubah;
- unknown nonproject route tetap 404 global;
- current production slug menampilkan unavailable state;
- tidak ada slug production yang published.

---

## 59. Acceptance Criteria — Current State

- `projectCatalog = []`;
- semua slug detail unavailable;
- label 404;
- H1 generic;
- CTA ke `/proyek`;
- CTA ke `/`;
- robots noindex;
- canonical `/proyek`;
- slug tidak dipantulkan;
- alasan internal tidak dipantulkan;
- tidak ada loading palsu;
- tidak ada kartu dummy;
- tidak ada media dummy;
- tidak ada data B05;
- tidak ada legacy data.

---

## 60. Acceptance Criteria — Future Template

Dengan fixture valid:

- detail template tampil;
- breadcrumb benar;
- metadata benar;
- cover approved;
- facts tampil;
- overview tampil;
- scope tampil;
- optional section bersyarat;
- related content dibatasi;
- closing CTA aman;
- tidak ada sensitive field;
- tidak ada CTA transaksi.

---

## 61. Acceptance Criteria — Resolver

- pure;
- deterministic;
- safe slug;
- exact match;
- published only;
- public only;
- detail ready;
- source required;
- date gate;
- publication gate;
- media gate;
- DTO mapping;
- no mutation;
- no fetch;
- no environment;
- no internal reason leakage.

---

## 62. Acceptance Criteria — Styling

- seluruh selector scoped `.page-project-detail`;
- mobile-first;
- responsive;
- no horizontal overflow;
- focus-visible;
- reduced motion;
- tidak menimpa `projects.css`;
- tidak mengubah global selector;
- tidak memakai foto remote.

---

## 63. Acceptance Criteria — Quality

Wajib lulus:

```text
npm run lint --workspace web
npm run test --workspace web -- --run
npm run build --workspace web
git diff --check
```

Seluruh regression PLAN-001 sampai PLAN-006 tetap lulus.

---

## 64. Risiko dan Mitigasi

### Risiko 1 — Detail Route Mengonfirmasi Record Internal

Mitigasi:

- semua failure menjadi `UNAVAILABLE`;
- copy generik;
- tidak ada reason code di client;
- tidak memantulkan slug.

### Risiko 2 — Fixture Masuk Production

Mitigasi:

- fixture hanya di test;
- test `projectCatalog = []`;
- grep title fixture pada production source.

### Risiko 3 — Slug Membocorkan Identitas

Mitigasi:

- regex ketat;
- tidak fallback ke ID;
- slug harus approved;
- tidak memuat pelanggan atau alamat.

### Risiko 4 — Data Sensitif Terikut Props

Mitigasi:

- resolver menghasilkan DTO baru;
- test seluruh field sensitif;
- tidak spread object internal ke component.

### Risiko 5 — Media Tidak Berizin

Mitigasi:

- rights approved;
- public visibility;
- source version;
- alt text;
- invalid media dibuang;
- cover invalid membuat record unavailable.

### Risiko 6 — Konten Expired Tetap Tampil

Mitigasi:

- reviewDueAt;
- injected now;
- future cache purge dicatat;
- current mode tidak memakai cache/API.

### Risiko 7 — Optional Section Kosong

Mitigasi:

- conditional rendering;
- test wrapper tidak tampil;
- tidak mengisi dummy.

### Risiko 8 — UI 404 Disangka HTTP 404

Mitigasi:

- dokumentasi eksplisit;
- noindex;
- server status deferred;
- tidak membuat klaim transport status.

### Risiko 9 — Scope Meluas ke API

Mitigasi:

- local resolver;
- no fetch;
- no loading;
- P06 deferred.

### Risiko 10 — Detail Melonggarkan Gate Daftar

Mitigasi:

- detail gate lebih ketat;
- detailPageReady wajib;
- gate tata kelola wajib;
- test unpublished.

---

## 65. Tahapan Implementasi

### Tahap 1 — Audit Lokal

```bash
git branch --show-current
git rev-parse HEAD
git status --short
```

Expected:

```text
main
bb4733ae4296ff914bbc79aae0443859c4787164
working tree clean
```

### Tahap 2 — Content dan Resolver

- buat `project-detail.js`;
- copy unavailable;
- regex slug;
- resolver;
- DTO;
- date gate;
- publication gate.

### Tahap 3 — Metadata

- tambah robots prop;
- test cleanup;
- regression.

### Tahap 4 — Unavailable State

- dedicated state;
- CTA;
- noindex;
- no slug reflection.

### Tahap 5 — Published Template

- page composer;
- breadcrumb;
- hero;
- facts;
- overview;
- gallery;
- scope;
- approach;
- outcomes;
- related content;
- CTA.

### Tahap 6 — Routing

- tambah `/proyek/:slug`;
- posisi benar;
- jangan ubah nav.

### Tahap 7 — Styling

- `project-detail.css`;
- scope;
- responsive;
- accessibility.

### Tahap 8 — Test

- resolver;
- production route;
- future fixture;
- optional section;
- metadata;
- regression.

### Tahap 9 — Dokumentasi

- simpan PLAN-007;
- update README;
- status `DIEKSEKUSI — MENUNGGU AUDIT`.

### Tahap 10 — Validasi

- lint;
- test;
- build;
- diff check;
- status.

Gemini tidak boleh commit atau push.

---

## 66. Perintah Validasi

```bash
npm run lint --workspace web
npm run test --workspace web -- --run
npm run build --workspace web
git diff --check
git status --short
```

---

## 67. Laporan Gemini yang Diperlukan

### Baseline

```text
Branch:
HEAD:
Working tree sebelum perubahan:
```

### File

- file baru;
- file dimodifikasi;
- tidak ada file di luar scope.

### Route

```text
/proyek:
/proyek/:slug:
unknown nonproject:
```

### Current Production

```text
projectCatalog:
published detail:
active slug:
unavailable state:
robots:
canonical:
```

### Future Fixture

```text
breadcrumb:
hero:
facts:
overview:
gallery:
scope:
approach:
outcomes:
related services:
related projects:
CTA:
```

### Resolver

- safe slug;
- published-only;
- detail-ready;
- date gate;
- governance gate;
- media gate;
- DTO;
- sensitive fields;
- no mutation.

### Validasi

Output lengkap:

```text
npm run lint --workspace web
npm run test --workspace web -- --run
npm run build --workspace web
git diff --check
git status --short
```

### Larangan

Konfirmasikan:

- tidak memakai B05;
- tidak memakai dummy production;
- tidak memakai legacy;
- tidak memakai stock image;
- tidak menambah API;
- tidak menambah dependency;
- tidak mengubah navigasi global;
- tidak commit;
- tidak push.

---

## 68. Keputusan Pemilik

Pemilik telah menyetujui:

1. route `/proyek/:slug`;
2. seluruh slug current production unavailable;
3. visual 404 generik;
4. noindex;
5. canonical `/proyek`;
6. keterbatasan HTTP status SPA;
7. resolver detail;
8. gate tata kelola;
9. date gate;
10. shared production catalog tetap kosong;
11. fixture hanya di test;
12. struktur published template;
13. breadcrumb;
14. hero;
15. facts;
16. overview;
17. gallery;
18. scope;
19. approach;
20. outcomes;
21. related services;
22. related projects;
23. CTA penutup;
24. perubahan PageMeta;
25. file scope;
26. acceptance criteria;
27. base SHA.

---

## 69. Keputusan Final

Keputusan final:

```text
DISETUJUI PEMILIK PADA 28 JULI 2026
IMPLEMENTASI SELESAI DAN TERVERIFIKASI
ROUTE /proyek/:slug TELAH DIIMPLEMENTASIKAN
CURRENT PRODUCTION SEMUA SLUG MENGGUNAKAN 404 PUBLIK GENERIK
NOINDEX UNTUK UNAVAILABLE TETAP BERLAKU
TEMPLATE FUTURE-READY TELAH DIIMPLEMENTASIKAN DAN DIUJI
projectCatalog = [] TETAP DIPERTAHANKAN
PROYEK B05, DUMMY, LEGACY, API/P06, DAN CTA TRANSAKSI TETAP DITAHAN
KETERBATASAN HTTP STATUS CLIENT-SIDE SPA TETAP DICATAT
```

Alasan:

- menyelesaikan struktur halaman proyek publik;
- tetap jujur terhadap kondisi data;
- tidak menerbitkan portofolio palsu;
- menjaga detail route future-ready;
- tidak menunggu backend;
- mencegah kebocoran internal;
- menyediakan kontrak jelas untuk proyek nyata di masa depan;
- menjadi penutup pekerjaan halaman proyek untuk hari ini.

---

## 70. Status Plan Final

```text
AUDIT PDT-01 S.D. PDT-05 : SELESAI
AUDIT PRY                : SELESAI
AUDIT BISNIS B05         : SELESAI
AUDIT GITHUB             : SELESAI
ROUTE DETAIL             : TERVERIFIKASI
CURRENT 404 STATE        : TERVERIFIKASI
COPY UNAVAILABLE         : TERVERIFIKASI
NOINDEX                  : TERVERIFIKASI
PUBLISHED TEMPLATE       : TERVERIFIKASI
RESOLVER                 : TERVERIFIKASI
DATE GATE                : TERVERIFIKASI
GOVERNANCE GATE          : TERVERIFIKASI
MEDIA GATE               : TERVERIFIKASI
MEDIA URL SAFETY         : TERVERIFIKASI
CYCLIC RELATION SAFETY   : TERVERIFIKASI
RELATED PROJECT DEDUP    : TERVERIFIKASI
RELATED SERVICES         : DITAHAN — ARRAY KOSONG
SENSITIVE DATA BOUNDARY  : TERVERIFIKASI
PAGE META EXTENSION      : TERVERIFIKASI
CSS SCOPE                : TERVERIFIKASI
PROJECT CATALOG          : KOSONG
PUBLISHED DETAIL         : 0
ACCEPTANCE CRITERIA      : TERVERIFIKASI
FINAL AUDIT SHA          : bd7431d21680a4ac5b7667a6bf5b8ea8ec33bb77
PERSETUJUAN PEMILIK      : SELESAI
IMPLEMENTASI             : SELESAI DAN TERVERIFIKASI
```

---

## 71. Riwayat Perubahan

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1-draft | 2026-07-28 | Draf awal PLAN-007 berdasarkan paket PDT-01 sampai PDT-05, PLAN-006 final, sumber bisnis B05, dan repository aktif | Direview Pemilik |
| 1.0 | 2026-07-28 | Pemilik menyetujui route detail, current 404 state, noindex, resolver, template future-ready, data contract, media gate, scope, dan acceptance criteria | Disetujui Pemilik — Siap Eksekusi Bersyarat Audit Lokal |
| 1.1 | 2026-07-28 | Penutupan administratif setelah audit final route detail, resolver, metadata, perlindungan data, keamanan media, relasi proyek, test, lint, dan build | Selesai dan Terverifikasi |
