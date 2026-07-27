---
kode: PLAN-005
judul: Implementasi Halaman Daftar Layanan Rumahku Konstruksi
versi: 1.0
status: DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
base_sha: ad0cbc19cb62d1672217faaed82676ee9fc5735d
base_sha_status: Remote terverifikasi dan disetujui; wajib cocok dengan HEAD lokal sebelum perubahan
area_implementasi: apps/web
route_utama: /layanan
jenis_pekerjaan: implementasi halaman publik — daftar layanan dengan gerbang publikasi
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-005 — IMPLEMENTASI HALAMAN DAFTAR LAYANAN RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
PLAN FINAL SIAP DIGUNAKAN SEBAGAI INSTRUKSI EKSEKUSI
GEMINI BOLEH MENGUBAH WORKING TREE SETELAH AUDIT LOKAL LULUS
GEMINI TETAP DILARANG COMMIT, PUSH, MERGE, ATAU MEMBUAT BRANCH
```

Dokumen ini merupakan draf teknis mandiri untuk membangun route `/layanan` sebagai halaman Daftar Layanan Rumahku Konstruksi.

Halaman tidak langsung berfungsi sebagai katalog penawaran aktif. Kondisi bisnis yang berlaku saat penyusunan PLAN-005 adalah:

```text
BELUM ADA LAYANAN BERSTATUS SIAP PUBLIK
TIDAK ADA KARTU LAYANAN AKTIF
TIDAK ADA CTA TRANSAKSI ATAU PENGAJUAN
```

Halaman dibangun sebagai katalog dengan gerbang publikasi agar hanya layanan yang mempunyai keputusan, ruang lingkup, keluaran, batas, kesiapan, sumber, versi, dan persetujuan publikasi yang dapat ditampilkan pada masa depan.

PLAN-005 telah disetujui Pemilik pada 28 Juli 2026.

Persetujuan mencakup:

1. route `/layanan` dibangun pada current-empty state;
2. tidak ada kartu layanan aktif;
3. Pembangunan Rumah Baru dan Renovasi Rumah hanya disebut sebagai layanan internal yang belum siap publik;
4. tidak ada candidate service teaser;
5. tidak ada detail route;
6. tidak ada CTA konsultasi atau transaksi;
7. tidak ada menu Layanan pada header, mobile drawer, atau footer;
8. Beranda mempunyai CTA `Lihat Status Layanan`;
9. publication flow enam tahap;
10. publication gate empat kelompok;
11. resolver lokal future-safe;
12. service catalog production kosong;
13. seluruh copy halaman;
14. scope file dan protected files;
15. acceptance criteria;
16. base SHA `ad0cbc19cb62d1672217faaed82676ee9fc5735d`.

Eksekusi tetap bersyarat: branch lokal, HEAD lokal, remote, dan working tree wajib lolos audit awal sebelum Gemini membuat perubahan.

---

## 2. Identitas dan Tata Kelola Repository

### 2.1 Repository

```text
https://github.com/syahputrawork98-sketch/RKK-RumahKuKontruksi
```

Nama resmi bisnis:

```text
Rumahku Konstruksi
```

Nama repository menggunakan ejaan historis dan tidak menjadi ejaan brand pada antarmuka publik.

### 2.2 Branch

RKK menggunakan single-branch workflow.

```text
Branch aktif dan permanen: main
```

Gemini dilarang:

- membuat branch baru;
- berpindah ke branch lama;
- membuat pull request;
- melakukan merge;
- melakukan rebase;
- melakukan reset;
- melakukan stash;
- melakukan clean;
- melakukan commit;
- melakukan push;
- melakukan force push.

### 2.3 Base SHA Kandidat

Remote `main` terakhir yang diperiksa:

```text
ad0cbc19cb62d1672217faaed82676ee9fc5735d
```

Commit:

```text
fix(web): align work hero class names
```

SHA belum dianggap terkunci sampai audit lokal dijalankan sebelum eksekusi.

Apabila SHA lokal berbeda dari base SHA final PLAN-005, Gemini wajib berhenti dan melaporkan perbedaannya. Gemini tidak boleh menyesuaikan base SHA sendiri.

---

## 3. Audit Awal Wajib Sebelum Eksekusi

Gemini wajib menjalankan secara read-only:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git remote -v
git log --oneline --decorate -15
```

Kondisi yang wajib terpenuhi:

```text
branch aktif: main
HEAD: sama dengan base SHA final PLAN-005
working tree: bersih
remote: repository RKK yang benar
tidak ada merge, rebase, cherry-pick, atau operasi Git tertunda
```

Jika salah satu kondisi tidak terpenuhi, Gemini berhenti tanpa mengubah file.

Gemini dilarang memperbaiki baseline dengan reset, stash, clean, checkout paksa, merge, rebase, atau tindakan Git korektif lainnya.

---

## 4. Kedudukan PLAN-005

### 4.1 Urutan Implementasi Website Publik

PLAN-005 melanjutkan implementasi website publik yang telah tersedia:

1. Beranda;
2. Tentang;
3. Cara Kerja;
4. Daftar Layanan.

PLAN-005 tidak membangun shell baru.

PLAN-005 menggunakan:

- `PublicAppShell`;
- `PublicHeader`;
- `MobileDrawer`;
- `PublicFooter`;
- `PageMeta`;
- `PublicContainer`;
- `PublicSection`;
- `SectionHeading`;
- token CSS yang telah tersedia;
- pola content layer;
- pola section component;
- pola routing React Router;
- pola pengujian Vitest dan Testing Library.

### 4.2 Perbedaan dengan PLAN-004

PLAN-004 menjelaskan proses bisnis tingkat tinggi melalui sembilan fase.

PLAN-005 menjelaskan:

- status publikasi layanan;
- mengapa belum ada layanan aktif;
- apa yang harus siap sebelum layanan dipublikasikan;
- perbedaan layanan dengan komponen, proses, dan fitur sistem;
- batas informasi layanan;
- jalur informasi yang tersedia sekarang.

PLAN-005 tidak mengulang rincian sembilan fase. Halaman mengarahkan pengguna ke `/cara-kerja`.

### 4.3 Hubungan dengan Halaman Detail Layanan

PLAN-005 hanya mengimplementasikan daftar layanan.

PLAN-005 tidak mengimplementasikan:

```text
/layanan/:slug
```

Halaman detail layanan akan menjadi plan terpisah setelah setidaknya satu layanan mempunyai status publikasi yang sah.

---

## 5. Sumber Keputusan yang Telah Diterjemahkan

PLAN-005 menerjemahkan keputusan dari sumber berikut:

### 5.1 Sumber Bisnis R01

```text
B03.0-F01 — Catatan Penyelarasan Layanan dan Proses Bisnis RKK
B03.0-F02 — Layanan dan Proses Bisnis Rumahku Konstruksi
B03.1-F01 — Pembangunan Rumah Baru RKK
B03.1-F02 — Renovasi Rumah RKK
B02.1-F01 — Positioning Perusahaan RKK
```

Ketetapan bisnis utama:

- Pembangunan Rumah Baru telah disetujui sebagai layanan utama internal, tetapi belum siap publik;
- Renovasi Rumah telah disetujui sebagai layanan utama awal/internal menurut arsitektur layanan, tetapi detail sumbernya belum menjadi konten publik final;
- kandidat layanan pendukung belum boleh ditampilkan sebagai layanan aktif;
- komponen terintegrasi tidak otomatis menjadi layanan mandiri;
- fitur sistem tidak otomatis menjadi layanan;
- belum ada layanan siap publik;
- sumber bisnis belum menetapkan harga, paket, tarif, wilayah, durasi, revisi, pembayaran, termin, retensi, garansi, kapasitas, personel, legalitas, atau klaim publik.

### 5.2 Paket Produk R02

```text
SRV-01 — Spesifikasi Halaman Daftar Layanan RKK
SRV-02 — Pemetaan Data dan Konten Daftar Layanan RKK
SRV-03 — Daftar Referensi Halaman Daftar Layanan RKK
SRV-04 — Wireframe Halaman Daftar Layanan RKK
SRV-05 — Spesifikasi Komponen UI Daftar Layanan RKK
P04-F03 — Spesifikasi Halaman Website Publik
P05.1-F01 — Spesifikasi Fitur dan Alur Website Publik
P07.1 — Paket UI Website Publik
```

Ketetapan produk utama:

- route kanonis adalah `/layanan`;
- halaman merupakan katalog dengan gerbang publikasi;
- hanya layanan berstatus `PUBLISHED` yang boleh menjadi kartu aktif;
- status bisnis dan status publikasi harus dipisahkan;
- current state adalah empty/hold yang informatif;
- current state tidak menampilkan kartu layanan aktif;
- current state tidak menampilkan CTA transaksi;
- route dapat tersedia tanpa menu utama;
- daftar layanan lama pada GitHub bukan sumber bisnis;
- halaman tetap berguna tanpa layanan aktif.

### 5.3 Penggunaan oleh Gemini

Gemini tidak mempunyai akses langsung ke Google Drive RKK.

Gemini tidak boleh diminta membuka, mencari, menebak, atau meminta isi sumber Drive. Seluruh keputusan yang diperlukan untuk implementasi telah diterjemahkan ke dalam PLAN-005.

Apabila informasi yang diperlukan tidak tersedia pada PLAN-005 atau repository, Gemini wajib berhenti dan melaporkan blocker.

---

## 6. Kondisi Repository Saat Ini

### 6.1 Route

Pada baseline, `AppRouter.jsx` mempunyai route:

```text
/
/tentang
/about
/cara-kerja
/sign-in
*
```

Route `/layanan` belum tersedia.

### 6.2 Navigasi

Header desktop, mobile drawer, dan footer saat ini mempunyai:

```text
Beranda
Tentang
Cara Kerja
Masuk
```

Tidak ada menu Layanan.

Keputusan current state PLAN-005:

```text
JANGAN menambahkan Layanan ke PublicHeader.
JANGAN menambahkan Layanan ke MobileDrawer.
JANGAN menambahkan Layanan ke PublicFooter.
```

Alasan:

- SRV-01 menetapkan route dapat tersedia tanpa menu;
- visibilitas menu Layanan belum disetujui sebagai navigasi utama;
- belum ada layanan aktif;
- menu tidak boleh menyiratkan katalog penawaran aktif.

### 6.3 Beranda

Beranda sudah mempunyai section Informasi Layanan dengan pesan bahwa informasi layanan disiapkan secara bertahap.

PLAN-005 perlu menyelaraskan section tersebut agar:

- status bisnis tetap jujur;
- pengguna dapat membuka `/layanan`;
- label CTA tidak menyiratkan penawaran aktif;
- tidak ada CTA transaksi.

### 6.4 Legacy Client

Legacy client mempunyai `client/src/modules/guest/pages/Layanan.jsx` dengan konten lama yang berpotensi memuat layanan dan klaim yang belum disetujui.

Legacy client hanya menjadi bahan pembanding teknis dan tidak boleh diubah atau dijadikan sumber copy.

---

## 7. Tujuan PLAN-005

PLAN-005 bertujuan:

1. membuat route kanonis `/layanan`;
2. menjelaskan status publikasi layanan saat ini;
3. tidak menampilkan layanan internal sebagai kartu publik;
4. menjelaskan gerbang publikasi secara ringkas;
5. menyediakan struktur katalog future-safe tanpa data palsu;
6. membedakan layanan, komponen terintegrasi, proses bisnis, dan fitur sistem;
7. menjelaskan batas informasi layanan;
8. menyediakan CTA aman menuju Cara Kerja dan Beranda;
9. membuat halaman dapat ditemukan melalui Beranda tanpa menambah menu utama;
10. menyediakan metadata, responsive behavior, aksesibilitas, dan test;
11. menjaga implementasi tetap statis dan lokal selama belum ada P06/API aktif;
12. mencegah konten lama GitHub menjadi fakta bisnis.

---

## 8. Ruang Lingkup Implementasi

### 8.1 Termasuk

PLAN-005 mencakup:

- route `/layanan`;
- metadata dan canonical;
- hero;
- visual gerbang publikasi berbasis teks/CSS;
- status publikasi saat ini;
- empat kelompok gerbang publikasi;
- struktur area daftar layanan;
- resolver status publikasi lokal;
- current empty/hold state;
- pembedaan empat konsep;
- batas informasi layanan;
- closing CTA;
- sinkronisasi section Informasi Layanan di Beranda;
- styling khusus halaman Layanan;
- responsive behavior;
- accessibility;
- automated tests;
- dokumentasi plan.

### 8.2 Tidak Termasuk

PLAN-005 tidak mencakup:

- publikasi Pembangunan Rumah Baru sebagai kartu aktif;
- publikasi Renovasi Rumah sebagai kartu aktif;
- publikasi kandidat layanan;
- route `/layanan/:slug`;
- detail layanan;
- route `/konsultasi`;
- formulir pengajuan;
- form kontak;
- CTA transaksi;
- CTA pesan;
- CTA pilih layanan;
- CTA konsultasi sekarang;
- backend;
- API;
- database;
- Prisma;
- CMS;
- fetch eksternal;
- loading dari server;
- autentikasi;
- role;
- dashboard;
- akun;
- harga;
- paket;
- tarif;
- durasi;
- SLA;
- wilayah;
- jumlah revisi;
- termin;
- retensi;
- garansi;
- kapasitas;
- personel;
- legalitas;
- portofolio;
- testimoni;
- statistik;
- analytics;
- feature flag global;
- perubahan legacy client;
- perubahan legacy server;
- perubahan archive.

---

## 9. Keputusan Current State

### 9.1 Status Data

Data katalog current state:

```js
services: []
```

Tidak boleh membuat object layanan untuk:

```text
Pembangunan Rumah Baru
Renovasi Rumah
Konsultasi Lanjutan
Survei dan Pemeriksaan Kondisi
Perencanaan
Desain Arsitektur
Gambar Kerja/DED
RAB Mandiri
Pengawasan atau Manajemen Proyek
Dokumentasi Khusus
```

Nama Pembangunan Rumah Baru dan Renovasi Rumah hanya boleh disebut dalam penjelasan status internal, bukan sebagai data katalog, card, CTA, badge, atau route.

### 9.2 State Aktif

State halaman:

```text
current-empty
```

State tersebut bukan error.

### 9.3 Runtime

Tidak ada API atau data async pada PLAN-005.

Karena itu, PLAN-005 tidak membuat runtime palsu untuk:

- loading;
- retry;
- skeleton aktif;
- error fetch;
- stale data;
- status changed dari server.

Kontrak dan komponen future state boleh disiapkan secara minimal, tetapi tidak boleh menciptakan pengalaman palsu seolah data sedang dimuat dari server.

### 9.4 Future-Safe

Implementasi harus mempunyai resolver murni yang hanya mengembalikan layanan apabila seluruh syarat minimum berikut terpenuhi:

```text
publicationStatus === 'PUBLISHED'
isVisible === true
detailRoute tersedia
sourceVersion tersedia
effectiveDate tersedia
```

Pada PLAN-005:

```text
hasil resolver = []
```

Detail route tetap tidak dibuat.

---

## 10. Route dan Metadata

### 10.1 Route

```text
/layanan
```

Route merender:

```text
ServiceListPage
```

Tidak ada alias.

Tidak ada nested detail route.

### 10.2 Metadata

Gunakan `PageMeta` dengan nilai:

```js
{
  title: 'Layanan Rumahku Konstruksi | Status Publikasi Layanan',
  description: 'Lihat status publikasi layanan Rumahku Konstruksi, gerbang kesiapan, batas informasi, dan jalur yang dapat dipelajari saat belum ada layanan aktif.',
  path: '/layanan'
}
```

Persyaratan:

- `document.title` sesuai;
- meta description sesuai;
- canonical berakhir `/layanan`;
- metadata dipulihkan ketika halaman unmount;
- tidak menambahkan library SEO.

---

## 11. Struktur Halaman

Urutan final:

1. Global Header;
2. Page Hero;
3. Status Publikasi Saat Ini;
4. Gerbang Publikasi Layanan;
5. Daftar Layanan Aktif atau Empty/Hold State;
6. Pembedaan Layanan, Komponen, Proses, dan Fitur;
7. Batas Informasi Layanan;
8. Closing CTA;
9. Global Footer.

Global Header dan Footer berasal dari `PublicAppShell`.

---

## 12. Content Layer Final

Seluruh copy ditempatkan pada:

```text
apps/web/src/content/services.js
```

Nama export:

```js
serviceListContent
serviceCatalog
resolvePublishedServices
```

### 12.1 Meta

```js
meta: {
  title: 'Layanan Rumahku Konstruksi | Status Publikasi Layanan',
  description: 'Lihat status publikasi layanan Rumahku Konstruksi, gerbang kesiapan, batas informasi, dan jalur yang dapat dipelajari saat belum ada layanan aktif.'
}
```

### 12.2 Page State

```js
pageState: {
  key: 'current-empty',
  publicationStatus: 'HOLD',
  hasPublishedServices: false
}
```

### 12.3 Hero

```js
hero: {
  eyebrow: 'Layanan Rumahku Konstruksi',
  title: 'Daftar layanan yang telah melewati pemeriksaan kesiapan dan persetujuan publikasi.',
  description: 'RKK hanya menampilkan layanan yang mempunyai ruang lingkup, keluaran, batas, pemilik proses, kapasitas, risiko, dan sumber yang jelas. Saat ini, informasi layanan masih dalam tahap penyelarasan dan belum ditampilkan sebagai penawaran aktif.',
  primaryAction: {
    label: 'Pelajari Cara Kerja',
    href: '/cara-kerja'
  },
  secondaryAction: {
    label: 'Kembali ke Beranda',
    href: '/'
  }
}
```

### 12.4 Publication Gate Visual

```js
publicationFlow: {
  ariaLabel: 'Tahapan layanan dari sumber bisnis hingga kartu aktif',
  steps: [
    'Sumber Bisnis',
    'Definisi',
    'Kesiapan',
    'Review',
    'Persetujuan Publikasi',
    'Kartu Aktif'
  ],
  notice: 'Kartu aktif hanya tersedia setelah seluruh tahapan yang berlaku telah diperiksa.'
}
```

Visual harus:

- menggunakan teks dan CSS;
- tetap terbaca tanpa connector;
- tidak menggunakan foto proyek;
- tidak menyerupai kartu layanan aktif;
- tidak menggunakan screenshot dashboard;
- tidak menggunakan progress percentage;
- tidak menyatakan tahapan telah selesai.

### 12.5 Status Publikasi Saat Ini

```js
currentStatus: {
  eyebrow: 'STATUS PUBLIKASI SAAT INI',
  statusLabel: 'Belum ada layanan siap publik',
  title: 'Belum ada layanan yang dipublikasikan sebagai penawaran aktif.',
  description: 'Pembangunan Rumah Baru dan Renovasi Rumah telah ditetapkan sebagai layanan utama awal untuk penggunaan internal, tetapi informasi publiknya masih menunggu kelengkapan ruang lingkup, SOP, template, harga, kapasitas, legalitas, penanggung jawab, dan persetujuan publikasi.',
  notice: 'Status internal tidak sama dengan persetujuan untuk menampilkan layanan sebagai kartu, penawaran, atau jalur transaksi.'
}
```

Aturan:

- nama dua layanan tampil sebagai teks penjelasan;
- nama tidak menjadi heading kartu;
- nama tidak menjadi link;
- nama tidak mempunyai badge;
- tidak ada icon layanan;
- tone informatif, bukan error atau warning darurat.

### 12.6 Gerbang Publikasi

```js
publicationGate: {
  eyebrow: 'GERBANG PUBLIKASI LAYANAN',
  title: 'Apa yang harus siap sebelum layanan ditampilkan?',
  description: 'RKK menggunakan empat kelompok pemeriksaan agar informasi layanan yang dipublikasikan mempunyai dasar yang dapat dipahami dan ditelusuri.',
  groups: [
    {
      key: 'definition',
      title: 'Definisi',
      description: 'Pelanggan dan masalah yang dituju, ruang lingkup, keluaran, prasyarat, batas tanggung jawab, dan hal yang tidak termasuk harus dijelaskan.'
    },
    {
      key: 'readiness',
      title: 'Kesiapan',
      description: 'Proses, pemilik proses, kapasitas pelaksanaan, risiko yang dapat diterima, serta SOP dan template minimum harus tersedia.'
    },
    {
      key: 'documents',
      title: 'Dokumen',
      description: 'Sumber, versi, tanggal berlaku, dasar kesepakatan, dan informasi yang dapat ditelusuri harus tersedia.'
    },
    {
      key: 'publication',
      title: 'Publikasi',
      description: 'Review, persetujuan, status, route, CTA, serta mekanisme penarikan harus ditetapkan sebelum kartu aktif ditampilkan.'
    }
  ],
  notice: 'Checklist rinci, kewenangan, parameter komersial, dan kontrol internal tetap menjadi informasi internal RKK.'
}
```

### 12.7 Area Daftar Layanan

```js
catalog: {
  eyebrow: 'DAFTAR LAYANAN AKTIF',
  title: 'Layanan yang telah memenuhi status publikasi.',
  description: 'Area ini hanya menampilkan layanan berstatus PUBLISHED dengan route detail, sumber, versi, dan tanggal berlaku yang valid.'
}
```

Pada current state, heading area boleh tetap tampil untuk menjelaskan fungsi area, tetapi:

```text
PublishedServiceGrid tidak merender card.
```

### 12.8 Empty/Hold State

```js
emptyState: {
  statusLabel: 'CURRENT STATE',
  title: 'Belum ada layanan siap publik.',
  description: 'Informasi layanan sedang diselaraskan dengan ruang lingkup, dokumen, kapasitas, risiko, dan persetujuan yang berlaku.',
  availableNow: 'Sementara itu, Anda dapat mempelajari cara RKK menerima, memeriksa, merencanakan, mengendalikan, dan mengevaluasi kebutuhan melalui Halaman Cara Kerja.',
  primaryAction: {
    label: 'Pelajari Cara Kerja',
    href: '/cara-kerja'
  },
  secondaryAction: {
    label: 'Kembali ke Beranda',
    href: '/'
  },
  notice: 'Tidak ada kartu layanan aktif, harga, durasi, wilayah, rating, atau CTA transaksi pada kondisi ini.'
}
```

### 12.9 Pembedaan Konsep

```js
conceptDifference: {
  eyebrow: 'MEMAHAMI KEDUDUKAN LAYANAN',
  title: 'Tidak semua aktivitas atau fitur merupakan layanan.',
  description: 'Pembedaan ini membantu mencegah aktivitas internal, proses kerja, dan fitur digital ditampilkan sebagai penawaran yang belum mempunyai keputusan bisnis.',
  items: [
    {
      key: 'service',
      title: 'Layanan',
      description: 'Nilai yang diberikan kepada pelanggan dengan ruang lingkup, keluaran, tanggung jawab, proses, pemilik, dasar nilai, dan dokumen kesepakatan yang jelas.'
    },
    {
      key: 'integrated-component',
      title: 'Komponen Terintegrasi',
      description: 'Aktivitas yang dapat menjadi bagian dari layanan utama dan kedudukannya ditentukan dalam penawaran serta kesepakatan. Komponen tidak otomatis dijual sebagai layanan mandiri.'
    },
    {
      key: 'business-process',
      title: 'Proses Bisnis',
      description: 'Rangkaian sembilan fase untuk menerima, menilai, menyiapkan, melaksanakan, mengendalikan, menyerahkan, dan mengevaluasi pekerjaan.'
    },
    {
      key: 'system-feature',
      title: 'Fitur Sistem',
      description: 'Alat digital untuk mendukung informasi, dokumen, laporan, perubahan, atau audit. Fitur bukan layanan dan bukan bukti bahwa layanan telah siap dipublikasikan.'
    }
  ]
}
```

### 12.10 Batas Informasi

```js
boundaries: {
  eyebrow: 'BATAS INFORMASI LAYANAN',
  title: 'Informasi layanan mengikuti status dan versi yang berlaku.',
  description: 'Halaman ini memberikan orientasi publik dan tidak menggantikan pemeriksaan kebutuhan, detail layanan, penawaran, atau kesepakatan.',
  items: [
    'halaman ini bukan penawaran, kontrak, atau daftar harga',
    'hanya layanan berstatus PUBLISHED yang dapat menjadi kartu aktif',
    'layanan yang disetujui untuk penggunaan internal belum tentu siap dipublikasikan',
    'pengajuan kebutuhan tidak berarti proyek atau layanan otomatis diterima',
    'harga dan jadwal hanya dapat dibahas setelah data dinilai cukup',
    'ruang lingkup, keluaran, prasyarat, dan batas mengikuti detail serta kesepakatan yang berlaku',
    'risiko dikelola dan diperiksa, bukan dijanjikan dapat dihilangkan seluruhnya',
    'status dan versi layanan dapat berubah sehingga kartu atau CTA dapat ditarik',
    'fitur digital tidak menjadi bukti kesiapan layanan'
  ]
}
```

### 12.11 Closing CTA

```js
closing: {
  title: 'Pelajari proses yang telah tersedia saat ini.',
  description: 'Informasi layanan akan diperbarui setelah keputusan bisnis, dokumen, kesiapan, dan persetujuan publikasinya lengkap. Untuk saat ini, Halaman Cara Kerja memberikan gambaran proses tingkat tinggi RKK.',
  primaryAction: {
    label: 'Pelajari Cara Kerja',
    href: '/cara-kerja'
  },
  secondaryAction: {
    label: 'Kembali ke Beranda',
    href: '/'
  },
  notice: 'Halaman ini tidak menerima pengajuan, tidak memberikan harga, dan tidak menyediakan transaksi layanan.'
}
```

### 12.12 Katalog

```js
export const serviceCatalog = [];
```

Dilarang menambahkan placeholder service.

### 12.13 Resolver

Resolver minimum:

```js
export function resolvePublishedServices(services = []) {
  if (!Array.isArray(services)) {
    return [];
  }

  return services.filter((service) => (
    service?.publicationStatus === 'PUBLISHED'
    && service?.isVisible === true
    && typeof service?.detailRoute === 'string'
    && service.detailRoute.startsWith('/layanan/')
    && Boolean(service?.sourceVersion)
    && Boolean(service?.effectiveDate)
  ));
}
```

Resolver:

- tidak melakukan fetch;
- tidak menentukan keputusan bisnis;
- tidak mengubah status;
- tidak membuat fallback service;
- tidak membuat route;
- hanya menyaring data yang telah diberikan.

---

## 13. Sinkronisasi Beranda

### 13.1 Content

Ubah `homeContent.services` menjadi:

```js
services: {
  eyebrow: 'INFORMASI LAYANAN',
  title: 'Informasi layanan dipublikasikan setelah melewati pemeriksaan kesiapan.',
  description: 'RKK belum menampilkan layanan sebagai penawaran aktif. Halaman Layanan menjelaskan status publikasi, gerbang kesiapan, dan batas informasi yang berlaku saat ini.',
  statusLabel: 'Belum ada layanan siap publik',
  action: {
    label: 'Lihat Status Layanan',
    href: '/layanan'
  }
}
```

### 13.2 Component

`HomeServices.jsx` menampilkan link netral:

```text
Lihat Status Layanan
```

Target:

```text
/layanan
```

Link:

- bukan CTA transaksi;
- tidak memakai label “Pilih Layanan”;
- tidak memakai label “Pesan Sekarang”;
- tidak memakai label “Konsultasi”;
- menggunakan class khusus Home Services;
- tetap dapat digunakan dengan keyboard.

### 13.3 Navigation Decision

Walaupun Beranda mempunyai link ke `/layanan`, PLAN-005 tetap tidak menambahkan menu Layanan ke header, drawer, atau footer.

---

## 14. Arsitektur Komponen

### 14.1 Page Composer

```text
ServiceListPage
```

Tanggung jawab:

- memanggil `PageMeta`;
- mengambil `serviceListContent`;
- mengambil `serviceCatalog`;
- menjalankan `resolvePublishedServices`;
- menyusun section;
- memilih `PublishedServiceSection` atau `ServiceListEmptyState`;
- tidak membuat `<main>` baru;
- menggunakan wrapper `.page-services`.

### 14.2 Section Components

Komponen minimum:

```text
ServiceListHero
PublicationGateVisual
CurrentPublicationStatus
ServicePublicationGate
PublishedServiceSection
PublishedServiceGrid
PublishedServiceCard
ServiceListEmptyState
ServiceConceptDifference
ServiceBoundaryNotice
ServiceClosingCTA
```

Komponen `PublishedServiceGrid` dan `PublishedServiceCard` dibuat future-safe, tetapi current state tidak merender card.

### 14.3 Reuse

Gunakan:

```text
PageMeta
PublicContainer
PublicSection
SectionHeading
Link dari react-router-dom
```

Jangan menduplikasi shell, header, footer, drawer, skip link, atau metadata logic.

### 14.4 Batas Abstraction

Jangan membuat:

- service framework generik;
- global state;
- provider;
- context;
- hook async;
- API client;
- schema backend;
- feature flag system;
- CMS adapter.

---

## 15. Struktur Semantic

### 15.1 Hero

- satu H1;
- description;
- dua link;
- visual gerbang menggunakan ordered list.

### 15.2 Publication Flow

Gunakan:

```html
<ol>
  <li>...</li>
</ol>
```

Connector dekoratif diberi `aria-hidden`.

### 15.3 Gate Cards

Gunakan heading semantik.

Card noninteraktif:

- bukan button;
- bukan link;
- tidak mempunyai tabindex.

### 15.4 Service Grid

Future state memakai:

```html
<ul>
  <li>
    <article>...</article>
  </li>
</ul>
```

Current state menghasilkan:

```text
0 published-service-card
```

### 15.5 Boundaries

Gunakan list semantik.

---

## 16. File yang Boleh Diubah

### 16.1 File Baru yang Diizinkan

```text
apps/web/src/pages/ServiceListPage.jsx
apps/web/src/content/services.js
apps/web/src/sections/services/ServiceListHero.jsx
apps/web/src/sections/services/PublicationGateVisual.jsx
apps/web/src/sections/services/CurrentPublicationStatus.jsx
apps/web/src/sections/services/ServicePublicationGate.jsx
apps/web/src/sections/services/PublishedServiceSection.jsx
apps/web/src/sections/services/PublishedServiceGrid.jsx
apps/web/src/sections/services/PublishedServiceCard.jsx
apps/web/src/sections/services/ServiceListEmptyState.jsx
apps/web/src/sections/services/ServiceConceptDifference.jsx
apps/web/src/sections/services/ServiceBoundaryNotice.jsx
apps/web/src/sections/services/ServiceClosingCTA.jsx
apps/web/src/styles/services.css
apps/web/src/test/services.test.js
docs/plan/PLAN-005_IMPLEMENTASI_HALAMAN_DAFTAR_LAYANAN_RUMAHKU_KONSTRUKSI.md
```

Gemini boleh menggabungkan komponen sangat kecil apabila hasil lebih sederhana, tetapi seluruh struktur, semantic, dan acceptance criteria harus terpenuhi.

### 16.2 File Existing yang Boleh Diubah

```text
apps/web/src/app/AppRouter.jsx
apps/web/src/main.jsx
apps/web/src/content/home.js
apps/web/src/sections/home/HomeServices.jsx
apps/web/src/styles/home.css
apps/web/src/test/app.test.jsx
docs/plan/README.md
```

### 16.3 File yang Tidak Perlu Diubah

Current state tidak memerlukan perubahan:

```text
apps/web/src/components/public/PublicHeader.jsx
apps/web/src/components/public/MobileDrawer.jsx
apps/web/src/components/public/PublicFooter.jsx
apps/web/src/layouts/PublicAppShell.jsx
apps/web/src/styles/tokens.css
apps/web/src/styles/globals.css
apps/web/src/styles/shell.css
```

Apabila Gemini menilai salah satu file tersebut wajib diubah, Gemini harus berhenti dan melaporkan alasan. Perubahan memerlukan revisi plan.

---

## 17. File dan Area yang Dilindungi

Gemini dilarang mengubah:

```text
apps/backend/**
archive/**
client/**
server/**
prisma/**
package.json
package-lock.json
vite.config.*
konfigurasi deployment
konfigurasi autentikasi
.env*
.github/**
```

Gemini juga dilarang mengubah:

```text
apps/web/src/components/public/PublicHeader.jsx
apps/web/src/components/public/MobileDrawer.jsx
apps/web/src/components/public/PublicFooter.jsx
apps/web/src/layouts/PublicAppShell.jsx
apps/web/src/pages/HomePage.jsx
apps/web/src/pages/AboutPage.jsx
apps/web/src/pages/WorkProcessPage.jsx
apps/web/src/content/about.js
apps/web/src/content/workProcess.js
apps/web/src/styles/about.css
apps/web/src/styles/work-process.css
```

---

## 18. Styling dan Design Token

### 18.1 Stylesheet

Gunakan:

```text
apps/web/src/styles/services.css
```

Import setelah `work-process.css` pada `main.jsx`.

### 18.2 Scope

Seluruh selector halaman wajib di-scope:

```css
.page-services ...
```

atau menggunakan class unik:

```text
.service-list-*
.service-publication-*
.service-gate-*
.published-service-*
```

Dilarang membuat selector global generik seperti:

```text
.hero-actions
.hero-title
.items-grid
.grid-item
.section-notice
.card
.badge
```

### 18.3 Token yang Diizinkan

Gunakan token existing:

```text
--spacing-*
--color-brand-*
--color-accent-*
--color-neutral-*
--color-info-bg
--color-info-text
--color-warning-bg
--color-warning-text
--font-size-*
--line-height-*
--radius-button
--radius-card
--radius-panel
--transition-normal
```

Dilarang menggunakan token yang tidak tersedia seperti:

```text
--space-*
--color-surface
--color-primary
--color-text
--text-sm
--radius-md
```

Dilarang membuat sistem token kedua.

### 18.4 Visual

Arah visual:

- konsisten dengan Beranda, Tentang, dan Cara Kerja;
- serius, tenang, dan informatif;
- border lebih utama daripada shadow;
- tidak memakai foto proyek;
- tidak memakai foto stok;
- tidak memakai image remote;
- tidak memakai icon library;
- tidak memakai progress bar;
- tidak memakai persentase kesiapan;
- tidak memakai badge sukses;
- tidak memakai kartu layanan palsu.

### 18.5 Responsive

Minimum:

```text
mobile-first
>= 640px
>= 768px
>= 1024px
```

Persyaratan:

- tidak ada horizontal scroll;
- hero satu kolom pada mobile;
- action bertumpuk pada mobile;
- publication flow tetap terbaca;
- gate cards satu kolom pada mobile, dua kolom pada tablet, maksimal empat atau 2x2 pada desktop;
- concept cards satu kolom pada mobile dan dua/four kolom sesuai keterbacaan;
- touch target link minimum 44 × 44 px;
- tidak ada informasi yang hanya muncul saat hover.

---

## 19. Aksesibilitas

Persyaratan:

1. hanya satu `<main>` dari `PublicAppShell`;
2. hanya satu H1;
3. `.page-services` bukan `<main>`;
4. heading hierarchy logis;
5. publication flow menggunakan `<ol>`;
6. list batas menggunakan `<ul>`;
7. card noninteraktif tidak menjadi button/link;
8. link mempunyai label jelas;
9. focus visible mengikuti global style;
10. page dapat digunakan dengan keyboard;
11. informasi tidak bergantung pada warna;
12. connector dekoratif `aria-hidden`;
13. reduced motion dihormati;
14. tidak ada autoplay;
15. tidak ada disabled CTA;
16. tidak ada tautan palsu;
17. tidak ada route detail palsu;
18. canonical benar;
19. skip link tetap bekerja;
20. menu drawer existing tetap tidak terganggu.

---

## 20. Data dan Publication Resolver

### 20.1 Status yang Dikenal

Kontrak konseptual dapat mengenal:

```text
HIDDEN
HOLD
PUBLISHED
PAUSED
RETIRED
INVALID
```

Current state page:

```text
HOLD
```

### 20.2 Aturan Render

Card hanya dirender apabila resolver mengembalikan item.

Kriteria minimum:

```text
PUBLISHED
isVisible true
detailRoute valid
sourceVersion ada
effectiveDate ada
```

### 20.3 Route Detail

Meskipun resolver memeriksa `detailRoute`, AppRouter tidak membuat route detail dalam PLAN-005.

Tidak ada item yang lolos resolver pada current state.

### 20.4 Test Fixture

Test resolver boleh menggunakan object fixture sintetis untuk memeriksa filtering.

Fixture:

- hanya berada di file test;
- tidak dirender pada UI;
- tidak memakai nama layanan RKK;
- tidak dianggap data bisnis;
- tidak masuk production bundle sebagai katalog.

---

## 21. Routing

Perubahan `AppRouter.jsx`:

1. import `ServiceListPage`;
2. tambahkan route `/layanan`;
3. pertahankan route existing;
4. jangan menambahkan `/layanan/:slug`;
5. pertahankan `/sign-in` unavailable;
6. pertahankan redirect `/about`;
7. pertahankan 404.

Target:

```jsx
<Route path="/layanan" element={<ServiceListPage />} />
```

---

## 22. Test yang Wajib

### 22.1 Route dan Landmark

Test memastikan:

- `/layanan` merender `ServiceListPage`;
- tepat satu main;
- tepat satu H1;
- `.page-services` bukan main;
- 404 tetap bekerja;
- `/sign-in` tetap unavailable.

### 22.2 Metadata

Test memastikan:

```text
Layanan Rumahku Konstruksi | Status Publikasi Layanan
```

Meta description sesuai plan.

Canonical berakhir:

```text
/layanan
```

Metadata cleanup existing tetap lulus.

### 22.3 Current State

Test memastikan:

- status `Belum ada layanan siap publik` tampil;
- headline status tampil;
- current state bukan error;
- tidak ada loading indicator;
- tidak ada skeleton;
- tidak ada retry button;
- tidak ada service card;
- tidak ada detail link;
- tidak ada CTA transaksi.

### 22.4 Publication Flow

Test memastikan urutan:

```text
Sumber Bisnis
Definisi
Kesiapan
Review
Persetujuan Publikasi
Kartu Aktif
```

Gunakan ordered list.

### 22.5 Publication Gate

Test memastikan empat card:

```text
Definisi
Kesiapan
Dokumen
Publikasi
```

Tidak ada progress percentage.

### 22.6 Concept Difference

Test memastikan empat kategori:

```text
Layanan
Komponen Terintegrasi
Proses Bisnis
Fitur Sistem
```

### 22.7 Status Internal

Test memastikan:

- Pembangunan Rumah Baru disebut hanya pada section status;
- Renovasi Rumah disebut hanya pada section status;
- tidak ada `.published-service-card` dengan kedua nama tersebut;
- kedua nama bukan link;
- kedua nama tidak mempunyai CTA.

### 22.8 CTA

Test memastikan:

- `Pelajari Cara Kerja` menuju `/cara-kerja`;
- `Kembali ke Beranda` menuju `/`;
- `Lihat Status Layanan` pada Beranda menuju `/layanan`;
- tidak ada link `/konsultasi`;
- tidak ada link `/kontak`;
- tidak ada link `/layanan/:slug`;
- tidak ada “Pesan Sekarang”;
- tidak ada “Pilih Layanan”;
- tidak ada “Konsultasi Sekarang”.

### 22.9 Navigasi

Test memastikan:

- PublicHeader tidak mempunyai link Layanan;
- MobileDrawer tidak mempunyai link Layanan;
- PublicFooter tidak mempunyai link Layanan;
- menu existing tetap sama;
- route `/layanan` tetap dapat dibuka melalui link Beranda dan direct navigation.

### 22.10 Form dan Media

Test memastikan:

- tidak ada `<form>`;
- tidak ada `<input>`;
- tidak ada `<select>`;
- tidak ada `<textarea>`;
- tidak ada gambar remote;
- tidak ada Cloudinary;
- tidak ada foto proyek;
- tidak ada dashboard screenshot.

### 22.11 Forbidden Content

Test negatif minimal:

```text
Solusi Rumah Terintegrasi
Konsultasi Konsep
Desain Arsitektur
Gambar Kerja/DED
Bangun Rumah Baru
Estimasi Biaya/RAB
Manajemen dan Pengawasan
jaminan presisi
kualitas tinggi
transparansi biaya
progres real-time
dashboard real-time
transparansi total
hasil terbaik
tanpa stres
harga mulai
paket populer
bestseller
rating
garansi
SLA
```

Catatan:

- frasa `Pembangunan Rumah Baru` diperbolehkan hanya pada copy status internal;
- frasa `Renovasi Rumah` diperbolehkan hanya pada copy status internal;
- kata “harga” dapat muncul dalam kalimat batas, bukan angka atau penawaran;
- kata “garansi” dapat muncul dalam larangan/batas hanya apabila copy plan memerlukannya. Current copy tidak memerlukannya.

### 22.12 Resolver Test

File:

```text
apps/web/src/test/services.test.js
```

Test memastikan:

- input bukan array menghasilkan `[]`;
- `HOLD` tidak lolos;
- `PAUSED` tidak lolos;
- `PUBLISHED` tanpa route tidak lolos;
- `PUBLISHED` tanpa source version tidak lolos;
- `PUBLISHED` tanpa effective date tidak lolos;
- hanya item valid yang lolos;
- urutan input valid dipertahankan;
- function tidak memutasi input.

---

## 23. Acceptance Criteria

PLAN-005 diterima apabila seluruh kondisi terpenuhi.

### 23.1 Git dan Scope

- branch tetap `main`;
- tidak ada branch baru;
- tidak ada commit/push oleh Gemini;
- hanya file scope berubah;
- protected files tidak berubah;
- `git diff --check` lulus;
- tidak ada dependency baru.

### 23.2 Route

- `/layanan` route kanonis;
- route merender page;
- tidak ada `/layanan/:slug`;
- `/sign-in` tetap unavailable;
- 404 tetap bekerja.

### 23.3 Current State

- service catalog production kosong;
- resolver menghasilkan array kosong;
- tidak ada kartu aktif;
- tidak ada CTA transaksi;
- tidak ada detail route;
- empty state informatif;
- empty state bukan error.

### 23.4 Publication Gate

- enam tahap publication flow tampil;
- empat kelompok gate tampil;
- checklist sensitif tidak tampil;
- tidak ada persentase;
- tidak ada klaim kesiapan.

### 23.5 Content

- copy sesuai PLAN-005;
- dua layanan utama disebut hanya sebagai status internal;
- kandidat layanan tidak ditampilkan;
- layanan lama GitHub tidak ditampilkan;
- komponen/proses/fitur dibedakan;
- batas informasi lengkap;
- tidak ada harga atau angka komersial.

### 23.6 Navigation

- tidak ada menu Layanan pada header;
- tidak ada menu Layanan pada drawer;
- tidak ada menu Layanan pada footer;
- Beranda mempunyai link `Lihat Status Layanan`;
- direct route bekerja.

### 23.7 Metadata

- title benar;
- description benar;
- canonical benar;
- cleanup benar.

### 23.8 Accessibility

- satu main;
- satu H1;
- ordered list;
- heading hierarchy;
- keyboard;
- focus;
- no color-only meaning;
- reduced motion;
- no fake controls;
- responsive.

### 23.9 Quality Gate

- lint lulus;
- seluruh test lulus;
- build lulus;
- `git diff --check` lulus;
- tidak ada warning baru yang berasal dari PLAN-005;
- tidak ada selector CSS global yang bocor ke halaman lain.

---

## 24. Command Validasi

Gemini menjalankan dari root:

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
git status --short
```

Jika format workspace tidak dikenali, gunakan bentuk ekuivalen tanpa mengubah package configuration:

```bash
npm --workspace apps/web run lint
npm --workspace apps/web run test
npm --workspace apps/web run build
```

Gemini tidak boleh mengubah dependency atau konfigurasi global untuk meluluskan validasi.

---

## 25. Larangan Implementasi

Gemini dilarang:

- membuka Google Drive;
- meminta link Drive;
- menebak sumber;
- menyalin legacy Layanan.jsx;
- membuat kartu layanan;
- membuat data mock produksi;
- membuat harga;
- membuat paket;
- membuat badge popular;
- membuat rating;
- membuat testimoni;
- membuat durasi;
- membuat wilayah;
- membuat legalitas;
- membuat personel;
- membuat kapasitas;
- membuat CTA konsultasi;
- membuat form;
- membuat route detail;
- membuat API;
- membuat backend;
- membuat feature flag global;
- membuat analytics;
- menambah dependency;
- menambah icon library;
- menggunakan foto remote;
- mengubah header/footer/drawer;
- mengubah backend;
- mengubah legacy;
- commit;
- push.

---

## 26. Stop Conditions

Gemini berhenti tanpa perubahan apabila:

- branch bukan `main`;
- HEAD tidak sesuai base SHA final;
- working tree tidak bersih;
- remote salah;
- ada operasi Git tertunda;
- file target mempunyai perubahan lokal;
- implementasi membutuhkan keputusan publikasi baru;
- implementasi membutuhkan layanan aktif;
- implementasi membutuhkan route detail;
- implementasi membutuhkan konsultasi;
- implementasi membutuhkan backend/API;
- implementasi membutuhkan dependency;
- protected file harus diubah;
- copy menimbulkan konflik bisnis;
- nama dua layanan internal tidak boleh ditampilkan menurut keputusan terbaru;
- route harus masuk menu tanpa persetujuan;
- test hanya dapat lulus dengan menghapus coverage existing.

Gemini melaporkan blocker dan tidak mengambil keputusan sendiri.

---

## 27. Format Laporan Gemini

```text
PLAN-005 — LAPORAN IMPLEMENTASI

1. BASELINE
- Branch:
- HEAD:
- Working tree sebelum perubahan:
- Remote:

2. FILE BARU
- ...

3. FILE DIUBAH
- ...

4. IMPLEMENTASI
- Route /layanan:
- Metadata:
- Hero:
- Publication flow:
- Current publication status:
- Publication gate:
- Catalog current state:
- Empty state:
- Concept difference:
- Boundaries:
- Closing CTA:
- Sinkronisasi Beranda:
- Navigation visibility:
- Resolver:
- Accessibility:
- Responsive:

5. DATA DAN PUBLIKASI
- Jumlah service production:
- Jumlah published services:
- Service card yang dirender:
- Detail route:
- CTA transaksi:

6. VALIDASI
- npm run lint --workspace web:
- npm run test --workspace web:
- npm run build --workspace web:
- git diff --check:
- git status --short:

7. PROTECTED FILES
- Header berubah:
- Drawer berubah:
- Footer berubah:
- Backend berubah:
- Legacy berubah:

8. BLOCKER/CATATAN
- ...

9. KONDISI AKHIR
- Branch:
- HEAD:
- Working tree:
- Commit dilakukan: TIDAK
- Push dilakukan: TIDAK
```

Gemini tidak memberikan commit message atau perintah push.

---

## 28. Audit dan Penerimaan

Setelah Gemini selesai, Room 3 dan Pemilik memeriksa:

1. baseline;
2. scope file;
3. route;
4. metadata;
5. copy;
6. publication flow;
7. current status;
8. tidak adanya kartu layanan;
9. tidak adanya route detail;
10. publication resolver;
11. CTA;
12. Home Services;
13. header;
14. drawer;
15. footer;
16. semantic;
17. keyboard;
18. responsive;
19. test;
20. lint;
21. build;
22. diff check;
23. working tree.

Koreksi kecil dalam scope dapat diberikan tanpa plan baru.

Perubahan pada keputusan publikasi, menu, copy bisnis, route detail, layanan aktif, atau scope file memerlukan revisi PLAN-005.

---

## 29. Commit dan Push

Gemini tidak melakukan commit dan push.

Commit/push dilakukan Pemilik setelah:

1. implementasi diperiksa;
2. seluruh validasi lulus;
3. scope sesuai;
4. Pemilik menyetujui hasil.

Commit message belum ditetapkan dalam draf.

Room 3 memberikan commit message setelah audit implementasi.

Tidak ada pull request dan tidak ada branch baru.

---

## 30. Dokumentasi Plan

PLAN-005 final ditempatkan:

```text
docs/plan/PLAN-005_IMPLEMENTASI_HALAMAN_DAFTAR_LAYANAN_RUMAHKU_KONSTRUKSI.md
```

`docs/plan/README.md` diperbarui dengan status:

```text
DIEKSEKUSI — MENUNGGU AUDIT
```

Gemini dilarang menulis:

```text
SELESAI
SELESAI DAN TERVERIFIKASI
```

Status final hanya diberikan Room 3 setelah audit.

PLAN-005 tidak memperbaiki status administratif PLAN-002, PLAN-003, atau PLAN-004.

---

## 31. Keputusan Pemilik

Pemilik telah menyetujui:

1. route `/layanan` dibangun pada current-empty state;
2. tidak ada kartu layanan aktif;
3. Pembangunan Rumah Baru dan Renovasi Rumah disebut hanya sebagai layanan internal yang belum siap publik;
4. tidak ada candidate service teaser;
5. tidak ada detail route;
6. tidak ada CTA konsultasi;
7. tidak ada menu Layanan pada header;
8. tidak ada menu Layanan pada mobile drawer;
9. tidak ada menu Layanan pada footer;
10. Beranda mempunyai CTA `Lihat Status Layanan`;
11. publication flow enam tahap;
12. publication gate empat kelompok;
13. resolver lokal future-safe;
14. service catalog production kosong;
15. copy hero;
16. copy status;
17. copy empty state;
18. copy concept difference;
19. copy boundaries;
20. file scope;
21. acceptance criteria;
22. base SHA final.

Status keputusan:

```text
DISETUJUI PEMILIK PADA 28 JULI 2026
SIAP DIEKSEKUSI SETELAH AUDIT LOKAL LULUS
```

---

## 32. Status Plan Final

```text
AUDIT SUMBER R01           : SELESAI
AUDIT PAKET SRV-01–SRV-05 : SELESAI
AUDIT GITHUB REMOTE        : SELESAI
CURRENT STATE              : DISETUJUI
COPY HALAMAN               : DISETUJUI
GERBANG PUBLIKASI          : DISETUJUI
DATA CONTRACT              : DISETUJUI
SCOPE FILE                 : DISETUJUI
ACCEPTANCE CRITERIA        : DISETUJUI
BASE SHA REMOTE            : ad0cbc19cb62d1672217faaed82676ee9fc5735d
BASE SHA LOKAL             : WAJIB DIVERIFIKASI SEBELUM PERUBAHAN
PERSETUJUAN PEMILIK        : SELESAI — 28 JULI 2026
INSTRUKSI GEMINI           : BOLEH DIBERIKAN
IMPLEMENTASI               : SIAP DIMULAI SETELAH AUDIT LOKAL LULUS
```

---

## 33. Riwayat Perubahan

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1-draft | 2026-07-28 | Draf awal PLAN-005 berdasarkan audit sumber bisnis, paket SRV-01 sampai SRV-05, dan repository setelah PLAN-004 | Direview Pemilik |
| 1.0 | 2026-07-28 | Pemilik menyetujui current-empty state, copy, gerbang publikasi, resolver, navigasi, scope, acceptance criteria, dan base SHA | Disetujui Pemilik — Siap Eksekusi Bersyarat Audit Lokal |
