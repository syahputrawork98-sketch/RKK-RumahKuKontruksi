---
kode: PLAN-004
judul: Implementasi Halaman Cara Kerja Rumahku Konstruksi
versi: 1.0
status: DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: main
base_sha: 7471572a819faef462c6ac7aa76ecd7023e685e9
base_sha_status: Remote terverifikasi dan disetujui; wajib cocok dengan HEAD lokal sebelum perubahan
area_implementasi: apps/web
route_utama: /cara-kerja
jenis_pekerjaan: implementasi halaman publik
pelaksana_kode: Gemini Antigravity
pemilik_persetujuan_dan_git: Pemilik RKK
---

# PLAN-004 — IMPLEMENTASI HALAMAN CARA KERJA RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
DISETUJUI PEMILIK — SIAP EKSEKUSI BERSYARAT AUDIT LOKAL
PLAN FINAL SIAP DIGUNAKAN SEBAGAI INSTRUKSI EKSEKUSI
GEMINI BOLEH MENGUBAH WORKING TREE SETELAH AUDIT LOKAL LULUS
GEMINI TETAP DILARANG COMMIT, PUSH, MERGE, ATAU MEMBUAT BRANCH
```

Dokumen ini merupakan draf teknis mandiri untuk mengganti halaman sementara pada route `/cara-kerja` dengan halaman Cara Kerja Rumahku Konstruksi yang utuh, realistis, responsif, mudah dipahami, dapat diakses, dan tidak memuat klaim bisnis yang belum mempunyai sumber resmi.

PLAN-004 telah disetujui Pemilik pada 28 Juli 2026.

Persetujuan tersebut mencakup:

1. struktur halaman;
2. seluruh copy halaman;
3. batas klaim;
4. daftar file yang boleh diubah;
5. protected files;
6. acceptance criteria;
7. penahanan route `/konsultasi`;
8. single-branch workflow pada `main`;
9. base SHA `7471572a819faef462c6ac7aa76ecd7023e685e9`.

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

Nama repository tetap menggunakan ejaan historis:

```text
RKK-RumahKuKontruksi
```

Ejaan repository tidak boleh digunakan sebagai ejaan brand pada antarmuka publik.

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

Remote `main` terakhir yang telah diperiksa:

```text
7471572a819faef462c6ac7aa76ecd7023e685e9
```

SHA tersebut belum dianggap terkunci sampai Gemini menjalankan audit lokal read-only sebelum eksekusi.

Apabila SHA lokal berbeda dari SHA plan final, Gemini wajib berhenti dan melaporkan perbedaan tersebut. Gemini tidak boleh menyesuaikan base SHA sendiri.

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
HEAD: sama dengan base SHA final PLAN-004
working tree: bersih
remote: repository RKK yang benar
tidak ada merge, rebase, cherry-pick, atau operasi Git tertunda
```

Apabila salah satu kondisi tidak terpenuhi, Gemini berhenti tanpa mengubah file.

Gemini dilarang menyelesaikan kondisi tersebut dengan reset, stash, clean, checkout paksa, penghapusan, atau tindakan Git lain.

---

## 4. Kedudukan dan Tujuan PLAN-004

### 4.1 Kedudukan

PLAN-004 melanjutkan fondasi website publik yang telah tersedia melalui Beranda dan Halaman Tentang.

PLAN-004 tidak membangun fondasi frontend baru.

PLAN-004 menggunakan:

- `PublicAppShell`;
- `PublicHeader`;
- `MobileDrawer`;
- `PublicFooter`;
- `PageMeta`;
- `PublicContainer`;
- `PublicSection`;
- `SectionHeading`;
- token CSS dan pola responsive yang telah tersedia;
- content layer terpisah;
- section component terpisah;
- pola pengujian Vitest dan Testing Library yang telah tersedia.

### 4.2 Tujuan

Target PLAN-004 adalah:

1. mengganti `UnavailablePage` pada `/cara-kerja`;
2. menjelaskan sembilan fase proses RKK pada tingkat tinggi;
3. menunjukkan bahwa kebutuhan tidak otomatis menjadi proyek;
4. menunjukkan adanya pemeriksaan, keluaran, gate, dan keputusan;
5. menjelaskan bahwa proses dapat kembali, meminta data, ditunda, dirujuk, atau tidak dilanjutkan;
6. menjelaskan kontrol yang berjalan lintas fase;
7. menjelaskan pengelolaan perubahan dan kendala secara konseptual;
8. menjaga batas publikasi bisnis;
9. meneruskan narasi Beranda dan Halaman Tentang;
10. menyediakan metadata, responsivitas, aksesibilitas, dan test yang memadai.

---

## 5. Sumber Keputusan yang Telah Diterjemahkan

Dokumen ini telah menerjemahkan keputusan dari sumber bisnis dan produk berikut:

```text
B03.0-F02 — Layanan dan Proses Bisnis Rumahku Konstruksi
B01.2-F02 — Nilai Inti dan DNA Perusahaan RKK
B02.1-F01 — Positioning Perusahaan RKK
B04 — SOP dan Template Operasional terkait
WRK-01 — Spesifikasi Halaman Cara Kerja RKK
WRK-02 — Pemetaan Data dan Konten Cara Kerja RKK
WRK-03 — Daftar Referensi Halaman Cara Kerja RKK
WRK-04 — Wireframe Halaman Cara Kerja RKK
WRK-05 — Spesifikasi Komponen UI Cara Kerja RKK
```

Gemini tidak memiliki akses langsung ke Google Drive RKK.

Gemini tidak boleh diminta membuka, mencari, menebak, atau meminta isi sumber tersebut. Seluruh keputusan yang diperlukan untuk implementasi telah diterjemahkan ke dalam PLAN-004.

Apabila Gemini membutuhkan informasi yang tidak tersedia dalam PLAN-004, repository, atau file lokal yang diberikan Pemilik, Gemini wajib berhenti dan melaporkan blocker.

---

## 6. Kondisi Implementasi Saat Ini

Route `/cara-kerja` sudah terdaftar, tetapi masih merender halaman sementara:

```text
Halaman Cara Kerja sedang disiapkan.
```

Navigasi desktop, mobile drawer, dan footer sudah memiliki tautan menuju `/cara-kerja`.

Active state sudah menggunakan `NavLink` dan `aria-current="page"`.

Halaman Tentang sudah memiliki CTA menuju `/cara-kerja`.

Beranda sudah memiliki ringkasan empat tahap dan CTA menuju `/cara-kerja`, tetapi notice Beranda masih menyatakan bahwa detail proses menunggu struktur siap dipublikasikan. Notice tersebut harus diselaraskan setelah halaman Cara Kerja tersedia.

Route `/sign-in` harus tetap tidak tersedia.

PLAN-004 tidak mengaktifkan autentikasi, akun, konsultasi, formulir, dashboard, backend, atau API.

---

## 7. Ruang Lingkup Implementasi

### 7.1 Termasuk

PLAN-004 mencakup:

- halaman `/cara-kerja`;
- metadata dan canonical;
- hero;
- prinsip membaca proses;
- overview sembilan fase;
- tiga kelompok fase;
- sembilan kartu fase;
- titik keputusan;
- kontrol lintas proses;
- perubahan dan kendala;
- batas informasi dan ekspektasi;
- CTA penutup yang aman;
- sinkronisasi notice Beranda;
- routing;
- styling khusus Cara Kerja;
- responsive behavior;
- accessibility;
- automated tests;
- pembaruan `docs/plan/README.md`.

### 7.2 Tidak Termasuk

PLAN-004 tidak mencakup:

- route `/konsultasi`;
- formulir pengajuan;
- form kontak;
- CTA aktif menuju route yang belum tersedia;
- login;
- autentikasi;
- role;
- dashboard;
- portal pelanggan;
- portal operasional;
- backend;
- API;
- database;
- Prisma;
- email;
- WhatsApp;
- CMS;
- analytics;
- data proyek;
- portofolio;
- katalog layanan aktif;
- harga;
- paket;
- penawaran otomatis;
- kalkulator RAB;
- jadwal proyek;
- proses pembayaran;
- upload dokumen;
- perubahan `client/`;
- perubahan `server/`;
- perubahan `archive/`;
- pembaruan administratif substantif PLAN-002 atau PLAN-003.

---

## 8. Batas Publikasi dan Klaim

### 8.1 Klaim yang Boleh Ditampilkan

Halaman boleh menjelaskan bahwa:

- RKK menggunakan sembilan fase proses tingkat tinggi;
- kebutuhan perlu dicatat dan dipahami;
- kebutuhan diperiksa sebelum dilanjutkan;
- kelanjutan proses bergantung pada data, kesiapan, kemampuan, risiko, dan kesepakatan;
- tiap fase mempunyai tujuan dan keluaran;
- proses dapat meminta data tambahan;
- proses dapat kembali ke fase sebelumnya;
- proses dapat ditunda;
- proses dapat dirujuk;
- proses dapat tidak dilanjutkan;
- perubahan dan kendala perlu dicatat;
- keputusan penting perlu mempunyai konteks;
- dokumentasi dan bukti digunakan sepanjang proses;
- mutu, biaya, waktu, risiko, perubahan, dan tanggung jawab perlu dikendalikan;
- evaluasi digunakan untuk pembelajaran dan perbaikan.

### 8.2 Klaim yang Dilarang

Halaman dilarang menampilkan atau menyiratkan:

- harga pasti;
- paket layanan aktif;
- durasi pasti;
- SLA;
- wilayah layanan;
- persentase pembayaran;
- termin;
- retensi;
- garansi;
- jumlah revisi;
- kapasitas proyek;
- jumlah personel;
- struktur tim aktual;
- legalitas;
- alamat;
- kontak resmi;
- sertifikasi;
- jumlah proyek;
- statistik;
- portofolio;
- testimoni;
- klaim kualitas terjamin;
- klaim tanpa risiko;
- klaim seluruh progres real-time;
- klaim seluruh proses otomatis;
- klaim seluruh persetujuan digital;
- klaim platform sudah terintegrasi penuh;
- klaim pengajuan pasti diterima;
- klaim data mock sebagai data nyata;
- detail SOP internal;
- checklist sensitif;
- formula harga;
- margin;
- kontrol internal rahasia.

### 8.3 Batas Layanan

Pembangunan Rumah Baru dan Renovasi Rumah tidak ditampilkan sebagai penawaran aktif pada PLAN-004.

Halaman menjelaskan proses, bukan katalog layanan.

---

## 9. Route dan Metadata

### 9.1 Route

```text
/cara-kerja
```

Route harus merender:

```text
WorkProcessPage
```

Route tidak boleh lagi merender `UnavailablePage`.

### 9.2 Metadata

Gunakan `PageMeta` dengan nilai:

```js
{
  title: 'Cara Kerja Rumahku Konstruksi | Sembilan Fase Proses',
  description: 'Pelajari sembilan fase Rumahku Konstruksi dari kebutuhan masuk, pemeriksaan, perencanaan, kesepakatan, pelaksanaan, serah terima, hingga evaluasi.',
  path: '/cara-kerja'
}
```

Persyaratan metadata:

- `document.title` sesuai;
- meta description sesuai;
- canonical berakhir dengan `/cara-kerja`;
- metadata dipulihkan saat halaman unmount mengikuti perilaku `PageMeta`;
- tidak menambahkan library SEO baru.

---

## 10. Struktur Halaman Final untuk Implementasi

Urutan halaman:

1. Global Header;
2. Page Hero;
3. Prinsip Membaca Proses;
4. Overview Sembilan Fase;
5. Kelompok Fase 1–3;
6. Kelompok Fase 4–6;
7. Kelompok Fase 7–9;
8. Titik Keputusan dan Kemungkinan Jalur;
9. Kontrol yang Berjalan Sepanjang Proses;
10. Perubahan dan Kendala;
11. Batas Informasi dan Ekspektasi;
12. Closing CTA;
13. Global Footer.

Global Header dan Global Footer berasal dari `PublicAppShell`, bukan dibuat ulang di halaman.

---

## 11. Content Layer Final

Seluruh copy halaman ditempatkan dalam:

```text
apps/web/src/content/workProcess.js
```

Copy tidak ditulis langsung secara tersebar di banyak section component, kecuali label teknis kecil yang benar-benar statis.

### 11.1 Meta

```js
meta: {
  title: 'Cara Kerja Rumahku Konstruksi | Sembilan Fase Proses',
  description: 'Pelajari sembilan fase Rumahku Konstruksi dari kebutuhan masuk, pemeriksaan, perencanaan, kesepakatan, pelaksanaan, serah terima, hingga evaluasi.'
}
```

### 11.2 Hero

```js
hero: {
  eyebrow: 'Cara Kerja Rumahku Konstruksi',
  title: 'Sembilan fase untuk membantu pekerjaan berjalan melalui proses yang lebih jelas dan dapat ditelusuri.',
  description: 'Alur ini menunjukkan bagaimana kebutuhan bergerak dari pencatatan awal menuju pemeriksaan, perencanaan, kesepakatan, kesiapan, pelaksanaan, serah terima, dan evaluasi. Tahapan dapat menyesuaikan kebutuhan dan tidak menjamin setiap pengajuan dilanjutkan menjadi proyek.',
  primaryAction: {
    label: 'Pelajari Tentang RKK',
    href: '/tentang'
  },
  secondaryAction: {
    label: 'Kembali ke Beranda',
    href: '/'
  },
  notice: 'Jalur pengajuan kebutuhan sedang disiapkan. Ketika tersedia, pengajuan tetap akan melalui pemeriksaan dan tidak berarti proyek otomatis diterima.'
}
```

CTA `/konsultasi` tidak dibuat dan tidak ditampilkan pada PLAN-004.

### 11.3 Prinsip Membaca Proses

```js
readingPrinciples: {
  eyebrow: 'MEMAHAMI ALUR',
  title: 'Setiap fase mempunyai tujuan, keluaran, dan titik keputusan.',
  description: 'Sembilan fase ini menunjukkan arsitektur proses tingkat tinggi. Rincian aktivitas, dokumen, pihak, waktu, biaya, dan syarat mengikuti kebutuhan serta kesepakatan yang berlaku.',
  items: [
    {
      title: 'Setiap fase mempunyai tujuan dan keluaran',
      description: 'Tahapan digunakan untuk membantu informasi, pemeriksaan, keputusan, dan tindak lanjut tetap mempunyai konteks.'
    },
    {
      title: 'Kelanjutan memerlukan data dan keputusan',
      description: 'Kebutuhan tidak otomatis bergerak ke tahap berikutnya sebelum informasi dan kesiapan yang diperlukan diperiksa.'
    },
    {
      title: 'Jalur dapat berubah',
      description: 'Proses dapat meminta data tambahan, kembali, ditunda, dirujuk, atau tidak dilanjutkan sesuai hasil pemeriksaan.'
    },
    {
      title: 'Kontrol berjalan sepanjang proses',
      description: 'Dokumentasi, risiko, perubahan, tanggung jawab, mutu, biaya, dan waktu diperhatikan sesuai ruang lingkup.'
    }
  ],
  callout: 'Halaman ini menjelaskan proses pada tingkat tinggi dan bukan SOP, kontrak, jadwal, daftar harga, atau janji bahwa setiap kebutuhan akan diterima.'
}
```

### 11.4 Overview Sembilan Fase

```js
overview: {
  eyebrow: 'GAMBARAN SEMBILAN FASE',
  title: 'Dari kebutuhan masuk hingga evaluasi dan pembelajaran.',
  description: 'Urutan membantu pengguna memahami posisi proses. Beberapa fase dapat memerlukan pengulangan atau pemeriksaan tambahan sebelum bergerak lebih lanjut.'
}
```

Overview wajib menampilkan sembilan fase sebagai ordered list semantik.

Nomor dan urutan:

```text
01 Kebutuhan Masuk
02 Kualifikasi dan Penyaringan
03 Perumusan Kebutuhan dan Pemeriksaan Awal
04 Perencanaan, Desain, Estimasi, dan RAB
05 Kelayakan, Penawaran, dan Kesepakatan
06 Aktivasi dan Kesiapan
07 Pelaksanaan dan Pengendalian
08 Pemeriksaan Akhir, Serah Terima, dan Penutupan
09 Evaluasi dan Pembelajaran
```

Visual tidak boleh bergantung hanya pada warna, garis, atau arah panah.

### 11.5 Kelompok Fase 1–3

```js
{
  id: 'memahami-kebutuhan',
  eyebrow: 'FASE 1–3',
  title: 'Memahami dan menilai kebutuhan.',
  description: 'Tahap awal digunakan untuk mencatat kebutuhan, memeriksa kesesuaian, memperoleh data yang diperlukan, dan merumuskan jalur yang layak ditinjau lebih lanjut.'
}
```

#### Fase 1 — Kebutuhan Masuk

```js
{
  number: '01',
  slug: 'kebutuhan-masuk',
  title: 'Kebutuhan Masuk',
  summary: 'Mencatat kebutuhan awal, sumber masuk, status awal, dan penanggung jawab tindak lanjut.',
  purpose: 'Mencegah kebutuhan kehilangan konteks sebelum diperiksa.',
  outputs: [
    'catatan kebutuhan awal',
    'status awal',
    'sumber kebutuhan',
    'penanggung jawab tindak lanjut'
  ],
  decision: 'Kebutuhan dicatat untuk menentukan apakah informasi awal cukup untuk masuk ke tahap kualifikasi.',
  next: 'Lanjut ke kualifikasi, meminta informasi awal, atau menutup catatan bila kebutuhan tidak dapat ditindaklanjuti.'
}
```

#### Fase 2 — Kualifikasi dan Penyaringan

```js
{
  number: '02',
  slug: 'kualifikasi-dan-penyaringan',
  title: 'Kualifikasi dan Penyaringan',
  summary: 'Memeriksa kesesuaian kebutuhan, kesiapan, lokasi, anggaran, pengambil keputusan, dan risiko awal.',
  purpose: 'Menilai apakah kebutuhan mempunyai dasar yang cukup dan sesuai untuk diperiksa lebih lanjut.',
  outputs: [
    'hasil kualifikasi',
    'daftar data tambahan yang diperlukan',
    'catatan risiko awal',
    'keputusan jalur berikutnya'
  ],
  decision: 'Hasil dapat berupa lanjut, meminta data, merujuk, menunda, atau tidak melanjutkan.',
  next: 'Kebutuhan yang layak bergerak ke perumusan kebutuhan dan pemeriksaan awal.'
}
```

Catatan: penyebutan lokasi dan anggaran adalah objek pemeriksaan konseptual, bukan publikasi wilayah layanan atau angka anggaran.

#### Fase 3 — Perumusan Kebutuhan dan Pemeriksaan Awal

```js
{
  number: '03',
  slug: 'perumusan-dan-pemeriksaan-awal',
  title: 'Perumusan Kebutuhan dan Pemeriksaan Awal',
  summary: 'Merumuskan brief, memeriksa dokumen atau kondisi, serta mencatat asumsi, pengecualian, dan risiko awal.',
  purpose: 'Membentuk pemahaman kebutuhan yang lebih jelas sebelum perencanaan disusun.',
  outputs: [
    'ringkasan kebutuhan',
    'hasil pemeriksaan atau survei bila relevan',
    'ruang lingkup awal',
    'asumsi dan pengecualian',
    'risiko awal',
    'jalur yang direkomendasikan'
  ],
  decision: 'Data dinilai cukup atau pemeriksaan tambahan masih diperlukan.',
  next: 'Kebutuhan yang cukup jelas bergerak ke perencanaan, desain, estimasi, atau RAB sesuai jalur yang relevan.'
}
```

### 11.6 Kelompok Fase 4–6

```js
{
  id: 'menyiapkan-dasar',
  eyebrow: 'FASE 4–6',
  title: 'Menyiapkan dasar dan kesiapan.',
  description: 'Tahap ini membentuk dasar perencanaan, menilai kelayakan, menyusun kesepakatan, dan memastikan kesiapan sebelum proyek dinyatakan aktif.'
}
```

#### Fase 4 — Perencanaan, Desain, Estimasi, dan RAB

```js
{
  number: '04',
  slug: 'perencanaan-desain-estimasi-rab',
  title: 'Perencanaan, Desain, Estimasi, dan RAB',
  summary: 'Menyiapkan jalur perencanaan yang sesuai serta keluaran yang dapat menjadi dasar penilaian berikutnya.',
  purpose: 'Menerjemahkan kebutuhan yang telah diperiksa menjadi dasar teknis dan ruang lingkup yang lebih terstruktur.',
  outputs: [
    'dokumen perencanaan sesuai kebutuhan',
    'konsep, gambar, atau spesifikasi bila relevan',
    'estimasi awal',
    'RAB setelah data dinilai cukup',
    'jadwal awal',
    'asumsi, pengecualian, dan opsi pekerjaan'
  ],
  decision: 'Dokumen dinilai cukup untuk masuk ke review kelayakan atau perlu diperbaiki dan dilengkapi.',
  next: 'Dasar yang cukup bergerak ke kelayakan, penawaran, dan kesepakatan.'
}
```

Wajib tampil:

```text
Harga final tidak diberikan sebelum data dinilai cukup.
```

#### Fase 5 — Kelayakan, Penawaran, dan Kesepakatan

```js
{
  number: '05',
  slug: 'kelayakan-penawaran-kesepakatan',
  title: 'Kelayakan, Penawaran, dan Kesepakatan',
  summary: 'Menilai kelayakan, ruang lingkup, risiko, kemampuan, penawaran, dan dasar kesepakatan.',
  purpose: 'Memastikan keputusan pekerjaan mempunyai dasar teknis, bisnis, risiko, dan tanggung jawab yang dapat dipahami.',
  outputs: [
    'hasil review kelayakan',
    'catatan risiko dan kemampuan',
    'ruang lingkup yang ditinjau',
    'penawaran',
    'hasil revisi atau negosiasi',
    'dasar kesepakatan'
  ],
  decision: 'Hasil dapat diterima, direvisi, ditunda, atau tidak dilanjutkan.',
  next: 'Kesepakatan yang memenuhi persyaratan bergerak ke aktivasi dan kesiapan.'
}
```

#### Fase 6 — Aktivasi dan Kesiapan

```js
{
  number: '06',
  slug: 'aktivasi-dan-kesiapan',
  title: 'Aktivasi dan Kesiapan',
  summary: 'Memastikan persyaratan bisnis, kontraktual, teknis, finansial, risiko, operasional, dan dokumentasi siap.',
  purpose: 'Mencegah pekerjaan dinyatakan aktif sebelum prasyarat yang berlaku diperiksa.',
  outputs: [
    'dokumen kesiapan',
    'rencana awal pelaksanaan',
    'baseline atau dasar pengendalian',
    'catatan penugasan dan koordinasi',
    'keputusan aktivasi'
  ],
  decision: 'Proyek hanya aktif setelah kesiapan yang dipersyaratkan diperiksa dan disetujui.',
  next: 'Proyek yang aktif bergerak ke pelaksanaan dan pengendalian.'
}
```

### 11.7 Kelompok Fase 7–9

```js
{
  id: 'melaksanakan-dan-menutup',
  eyebrow: 'FASE 7–9',
  title: 'Melaksanakan, menyerahkan, dan belajar.',
  description: 'Tahap ini menjalankan pekerjaan, memeriksa hasil, menutup administrasi dan dokumentasi, lalu menggunakan pembelajaran untuk perbaikan berikutnya.'
}
```

#### Fase 7 — Pelaksanaan dan Pengendalian

```js
{
  number: '07',
  slug: 'pelaksanaan-dan-pengendalian',
  title: 'Pelaksanaan dan Pengendalian',
  summary: 'Menjalankan pekerjaan sambil mengendalikan mutu, biaya, waktu, perubahan, risiko, pelaporan, dan bukti.',
  purpose: 'Menjaga pelaksanaan tetap mempunyai dasar, catatan, pemeriksaan, dan keputusan yang dapat ditelusuri.',
  outputs: [
    'catatan pelaksanaan',
    'progres yang telah diverifikasi',
    'dokumentasi dan bukti',
    'laporan',
    'catatan perubahan dan kendala',
    'keputusan tindak lanjut'
  ],
  decision: 'Progres, perubahan, kendala, dan risiko ditinjau sesuai dampak serta kewenangan yang berlaku.',
  next: 'Pekerjaan yang telah memenuhi pemeriksaan bergerak ke pemeriksaan akhir, serah terima, dan penutupan.'
}
```

Halaman tidak boleh menggunakan frasa:

```text
progres real-time
dashboard real-time
pemantauan otomatis penuh
```

#### Fase 8 — Pemeriksaan Akhir, Serah Terima, dan Penutupan

```js
{
  number: '08',
  slug: 'pemeriksaan-serah-terima-penutupan',
  title: 'Pemeriksaan Akhir, Serah Terima, dan Penutupan',
  summary: 'Memeriksa hasil, menyelesaikan temuan, menyerahkan keluaran, dan menutup administrasi serta dokumentasi.',
  purpose: 'Memastikan hasil dan kewajiban penutupan diperiksa sebelum pekerjaan dinyatakan selesai.',
  outputs: [
    'hasil pemeriksaan akhir',
    'daftar temuan dan penyelesaiannya',
    'dokumen serah terima',
    'dokumen penutupan',
    'kompilasi laporan dan bukti'
  ],
  decision: 'Temuan diselesaikan atau ditindaklanjuti sebelum penutupan sesuai ketentuan yang berlaku.',
  next: 'Pekerjaan yang telah ditutup bergerak ke evaluasi dan pembelajaran.'
}
```

#### Fase 9 — Evaluasi dan Pembelajaran

```js
{
  number: '09',
  slug: 'evaluasi-dan-pembelajaran',
  title: 'Evaluasi dan Pembelajaran',
  summary: 'Mengevaluasi hasil, masalah, keputusan, risiko, dan pembelajaran untuk memperbaiki sistem berikutnya.',
  purpose: 'Menggunakan pengalaman dan bukti pekerjaan sebagai bahan perbaikan proses.',
  outputs: [
    'ringkasan evaluasi',
    'pembelajaran utama',
    'catatan masalah dan keputusan',
    'catatan risiko',
    'rekomendasi perbaikan'
  ],
  decision: 'Pembelajaran yang relevan diterjemahkan menjadi tindak lanjut atau perbaikan sistem.',
  next: 'Evaluasi menutup siklus pekerjaan dan menjadi masukan untuk proses berikutnya.'
}
```

### 11.8 Titik Keputusan

```js
decisionGates: {
  eyebrow: 'TITIK KEPUTUSAN',
  title: 'Tidak semua kebutuhan bergerak lurus hingga pelaksanaan.',
  description: 'Gate digunakan untuk memastikan kelanjutan proses mempunyai data, dasar, kesiapan, dan persetujuan yang memadai.',
  items: [
    {
      title: 'Gate Kualifikasi',
      description: 'Hasil dapat berupa lanjut, meminta data, merujuk, menunda, atau tidak melanjutkan.'
    },
    {
      title: 'Gate Pemeriksaan Awal',
      description: 'Data dinilai cukup atau pemeriksaan tambahan masih diperlukan.'
    },
    {
      title: 'Gate Perencanaan',
      description: 'Dasar perencanaan dinilai cukup untuk review berikutnya atau perlu diperbaiki.'
    },
    {
      title: 'Gate Kelayakan',
      description: 'Hasil dapat diterima, direvisi, ditunda, atau tidak dilanjutkan.'
    },
    {
      title: 'Gate Aktivasi',
      description: 'Proyek hanya aktif setelah persyaratan kesiapan yang berlaku diperiksa dan disetujui.'
    },
    {
      title: 'Gate Perubahan',
      description: 'Perubahan diperiksa, dicatat, dan diputuskan sesuai alasan, dampak, risiko, dan kewenangan.'
    },
    {
      title: 'Gate Pemeriksaan Akhir',
      description: 'Temuan diperiksa dan ditindaklanjuti sebelum serah terima dan penutupan.'
    }
  ],
  notice: 'Permintaan untuk kembali, melengkapi data, menunda, merujuk, atau tidak melanjutkan merupakan bagian dari pengendalian proses dan bukan jaminan bahwa setiap kebutuhan akan diterima.'
}
```

### 11.9 Kontrol Lintas Proses

```js
crossPhaseControls: {
  eyebrow: 'KONTROL LINTAS PROSES',
  title: 'Beberapa kontrol berjalan dari awal hingga penutupan.',
  description: 'Kedalaman setiap kontrol menyesuaikan kebutuhan, ruang lingkup, risiko, dan kesepakatan yang berlaku.',
  items: [
    {
      title: 'Ruang lingkup',
      description: 'Kebutuhan, batas pekerjaan, asumsi, dan pengecualian perlu mempunyai konteks yang jelas.'
    },
    {
      title: 'Peran dan tanggung jawab',
      description: 'Pihak yang terlibat perlu memahami fungsi, kewenangan, dan tindak lanjutnya.'
    },
    {
      title: 'Dokumentasi',
      description: 'Catatan, bukti, versi, dan keputusan diarahkan agar dapat ditelusuri.'
    },
    {
      title: 'Mutu',
      description: 'Pemeriksaan dilakukan sesuai tahap dan ruang lingkup yang berlaku.'
    },
    {
      title: 'Biaya',
      description: 'Dasar biaya, perubahan, dan dampak perlu diperiksa sebelum keputusan dibuat.'
    },
    {
      title: 'Waktu',
      description: 'Rencana dan perubahan waktu perlu mempunyai alasan serta tindak lanjut.'
    },
    {
      title: 'Risiko',
      description: 'Risiko diidentifikasi dan dipertimbangkan, bukan dijanjikan dapat dihilangkan seluruhnya.'
    },
    {
      title: 'Perubahan',
      description: 'Perubahan perlu dicatat bersama alasan, dampak, keputusan, dan persetujuan yang berlaku.'
    },
    {
      title: 'Bukti dan pelaporan',
      description: 'Informasi progres dan hasil harus berasal dari sumber yang berwenang dan mekanisme verifikasi.'
    }
  ]
}
```

### 11.10 Perubahan dan Kendala

```js
changesAndIssues: {
  eyebrow: 'PERUBAHAN DAN KENDALA',
  title: 'Perubahan perlu mempunyai alasan, dampak, dan keputusan yang dapat ditelusuri.',
  description: 'Kondisi lapangan, data baru, risiko, kebutuhan pelanggan, ketersediaan sumber daya, atau temuan pemeriksaan dapat memengaruhi pekerjaan. Perubahan dan kendala tidak diperlakukan hanya sebagai percakapan terpisah tanpa catatan.',
  steps: [
    'objek perubahan atau kendala dicatat',
    'alasan dan sumber informasi dijelaskan',
    'dampak terhadap ruang lingkup, biaya, waktu, mutu, dan risiko ditinjau',
    'pihak berwenang melakukan review',
    'keputusan dan persetujuan dicatat',
    'bukti serta tindak lanjut disimpan sesuai kebutuhan'
  ],
  notice: 'Bagian ini menjelaskan prinsip tingkat tinggi dan tidak membuka SOP, formulir, nominal kewenangan, atau kontrol internal sensitif.'
}
```

### 11.11 Batas Informasi dan Ekspektasi

```js
boundaries: {
  eyebrow: 'BATAS INFORMASI',
  title: 'Halaman ini menjelaskan proses, bukan janji komersial atau SOP publik.',
  description: 'Rincian setiap pekerjaan mengikuti data, pemeriksaan, kemampuan, risiko, dokumen, penawaran, dan kesepakatan yang berlaku.',
  items: [
    'pengajuan kebutuhan tidak berarti proyek otomatis diterima',
    'setiap kebutuhan dapat mempunyai jalur dan kedalaman pemeriksaan yang berbeda',
    'fase dapat kembali, meminta data, ditunda, dirujuk, atau tidak dilanjutkan',
    'harga final tidak diberikan sebelum data dinilai cukup',
    'durasi, biaya, pembayaran, revisi, garansi, dan ketentuan lain tidak ditetapkan oleh halaman ini',
    'informasi progres harus berasal dari sumber yang berwenang dan telah diverifikasi',
    'platform tidak diklaim real-time, otomatis penuh, atau menjadi satu-satunya bukti keputusan',
    'SOP internal, checklist rinci, formula harga, margin, dan kontrol sensitif tidak dipublikasikan'
  ]
}
```

### 11.12 Closing CTA

```js
closing: {
  title: 'Pahami proses sebelum kebutuhan bergerak lebih jauh.',
  description: 'Anda dapat mempelajari kedudukan dan pendekatan RKK melalui Halaman Tentang. Jalur pengajuan kebutuhan akan tersedia setelah mekanisme dan informasi pendukungnya siap.',
  primaryAction: {
    label: 'Pelajari Tentang RKK',
    href: '/tentang'
  },
  secondaryAction: {
    label: 'Kembali ke Beranda',
    href: '/'
  },
  notice: 'Halaman ini tidak menerima pengajuan, tidak memberikan harga, dan tidak menjanjikan penerimaan proyek.'
}
```

---

## 12. Sinkronisasi Konten Beranda

`apps/web/src/content/home.js` boleh diubah hanya pada notice bagian workflow.

Copy lama yang menyatakan detail proses masih menunggu struktur siap harus diganti menjadi:

```text
Halaman Cara Kerja menjelaskan sembilan fase RKK pada tingkat tinggi, termasuk pemeriksaan, keluaran, titik keputusan, pengendalian, perubahan, serah terima, dan evaluasi.
```

CTA `Pelajari Cara Kerja` tetap menuju:

```text
/cara-kerja
```

Bagian Beranda lain tidak diubah.

---

## 13. Arsitektur Komponen

### 13.1 Page Composer

```text
WorkProcessPage
```

Tanggung jawab:

- memanggil `PageMeta`;
- mengambil `workProcessContent`;
- menyusun urutan section;
- tidak memuat global header/footer;
- menggunakan wrapper `.page-work-process`;
- tidak membuat elemen `<main>` baru.

### 13.2 Section Components

Komponen minimum:

```text
WorkHero
ProcessReadingPrinciples
NinePhaseOverview
ProcessPhaseGroup
ProcessPhaseCard
DecisionGateSection
CrossPhaseControlSection
ChangeIssueSection
ProcessBoundarySection
WorkClosingCTA
```

Komponen tambahan hanya boleh dibuat bila:

- benar-benar mengurangi pengulangan;
- tetap berada dalam scope halaman;
- tidak menjadi generic abstraction yang belum dibutuhkan halaman lain;
- tidak menambahkan dependency.

### 13.3 Reuse

Gunakan komponen existing bila sesuai:

```text
PageMeta
PublicContainer
PublicSection
SectionHeading
```

Gunakan class button existing bila sesuai.

Jangan menduplikasi:

- `PublicHeader`;
- `MobileDrawer`;
- `PublicFooter`;
- `PublicAppShell`;
- skip link;
- focus management drawer;
- metadata component.

---

## 14. File yang Boleh Diubah

### 14.1 File Baru yang Diizinkan

```text
apps/web/src/pages/WorkProcessPage.jsx
apps/web/src/content/workProcess.js
apps/web/src/sections/work-process/WorkHero.jsx
apps/web/src/sections/work-process/ProcessReadingPrinciples.jsx
apps/web/src/sections/work-process/NinePhaseOverview.jsx
apps/web/src/sections/work-process/ProcessPhaseGroup.jsx
apps/web/src/sections/work-process/ProcessPhaseCard.jsx
apps/web/src/sections/work-process/DecisionGateSection.jsx
apps/web/src/sections/work-process/CrossPhaseControlSection.jsx
apps/web/src/sections/work-process/ChangeIssueSection.jsx
apps/web/src/sections/work-process/ProcessBoundarySection.jsx
apps/web/src/sections/work-process/WorkClosingCTA.jsx
apps/web/src/styles/work-process.css
docs/plan/PLAN-004_IMPLEMENTASI_HALAMAN_CARA_KERJA_RUMAHKU_KONSTRUKSI.md
```

Gemini boleh menggabungkan komponen kecil apabila hasil lebih sederhana, tetapi seluruh struktur dan acceptance criteria harus tetap terpenuhi.

### 14.2 File Existing yang Boleh Diubah

```text
apps/web/src/app/AppRouter.jsx
apps/web/src/main.jsx
apps/web/src/content/home.js
apps/web/src/test/app.test.jsx
docs/plan/README.md
```

### 14.3 Perubahan Bersyarat

File berikut hanya boleh diubah apabila implementasi gagal tanpa koreksi kecil yang benar-benar terkait PLAN-004:

```text
apps/web/src/styles/tokens.css
apps/web/src/styles/globals.css
apps/web/src/styles/shell.css
```

Sebelum mengubah file bersyarat, Gemini wajib menjelaskan alasan dalam laporan akhir.

Gemini tidak boleh mengubah nilai token global hanya agar satu halaman terlihat sesuai. Preferensi utama adalah styling lokal pada `work-process.css`.

---

## 15. File dan Area yang Dilindungi

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

Gemini juga dilarang mengubah secara substantif:

```text
apps/web/src/pages/HomePage.jsx
apps/web/src/pages/AboutPage.jsx
apps/web/src/content/about.js
apps/web/src/styles/about.css
apps/web/src/components/public/PublicHeader.jsx
apps/web/src/components/public/MobileDrawer.jsx
apps/web/src/components/public/PublicFooter.jsx
apps/web/src/layouts/PublicAppShell.jsx
```

Pengecualian hanya dapat diberikan melalui revisi PLAN-004 yang disetujui Pemilik.

---

## 16. Styling dan Visual

### 16.1 Arah Visual

Halaman harus:

- konsisten dengan Beranda dan Tentang;
- menggunakan token global;
- menggunakan warna brand yang sudah tersedia;
- mengutamakan tipografi, hierarchy, cards, panels, list, dan timeline;
- tidak menggunakan foto proyek;
- tidak menggunakan screenshot dashboard;
- tidak menggunakan ilustrasi yang menyiratkan sistem produksi sudah aktif;
- tidak menambahkan aset remote;
- tidak menambahkan icon library.

### 16.2 Overview

Overview sembilan fase dapat menggunakan:

- ordered list;
- timeline;
- grid bernomor;
- connector dekoratif.

Namun isi tetap harus terbaca tanpa:

- warna;
- connector;
- animasi;
- CSS tertentu.

### 16.3 Phase Cards

Setiap phase card menampilkan:

- nomor fase;
- nama;
- summary;
- tujuan;
- keluaran konseptual;
- titik keputusan;
- kemungkinan jalur berikutnya.

Kartu tidak boleh terlalu padat pada mobile.

Keluaran boleh ditampilkan sebagai list.

### 16.4 Responsive Behavior

Minimum breakpoint mengikuti pola existing:

```text
mobile-first
>= 640px
>= 768px
>= 1024px
```

Persyaratan:

- tidak ada horizontal scrolling pada viewport umum;
- hero satu kolom pada mobile;
- actions bertumpuk pada mobile;
- overview tetap terbaca pada layar sempit;
- phase cards satu kolom pada mobile;
- maksimal dua atau tiga kolom pada layar besar sesuai keterbacaan;
- teks tidak terlalu kecil;
- target sentuh minimum 44 × 44 px untuk kontrol interaktif;
- tidak ada konten yang bergantung pada hover.

---

## 17. Aksesibilitas

Persyaratan wajib:

1. hanya satu `<main>` dari `PublicAppShell`;
2. hanya satu H1 pada halaman;
3. heading hierarchy logis;
4. setiap section utama mempunyai heading;
5. overview menggunakan `<ol>`;
6. list keluaran menggunakan `<ul>`;
7. link mempunyai label yang jelas;
8. tidak ada disabled CTA tanpa penjelasan;
9. tidak ada route kosong atau tautan palsu;
10. active navigation tetap menggunakan `aria-current="page"`;
11. focus visible mengikuti global style;
12. halaman dapat digunakan dengan keyboard;
13. informasi tidak bergantung hanya pada warna;
14. dekorasi visual diberi `aria-hidden="true"` bila diperlukan;
15. `prefers-reduced-motion` tetap dihormati;
16. tidak menambahkan auto-scroll atau animasi wajib;
17. canonical dan metadata tidak mengganggu navigasi;
18. skip link tetap bekerja.

---

## 18. State dan Progressive Enhancement

Konten halaman bersifat statis lokal.

PLAN-004 tidak memerlukan:

- loading state dari API;
- fetch;
- suspense;
- backend error state;
- retry button;
- skeleton dinamis.

Apabila overview visual gagal tampil karena CSS, ordered list semantik tetap harus menampilkan sembilan fase.

CTA konsultasi disembunyikan, bukan dibuat disabled tanpa konteks.

---

## 19. Routing

Perubahan `AppRouter.jsx`:

1. import `WorkProcessPage`;
2. ganti element route `/cara-kerja`;
3. hapus penggunaan `UnavailablePage` hanya dari route `/cara-kerja`;
4. pertahankan `UnavailablePage` untuk `/sign-in`;
5. pertahankan redirect `/about` ke `/tentang`;
6. pertahankan 404.

Target:

```jsx
<Route path="/cara-kerja" element={<WorkProcessPage />} />
```

---

## 20. Test yang Wajib

Perbarui `apps/web/src/test/app.test.jsx`.

### 20.1 Route

Test memastikan:

- `/cara-kerja` merender halaman baru;
- teks “Halaman Cara Kerja sedang disiapkan.” tidak muncul;
- state “Sedang disiapkan” tidak digunakan oleh `/cara-kerja`;
- `/sign-in` tetap menampilkan unavailable state;
- 404 tetap bekerja.

### 20.2 Heading dan Struktur

Test memastikan:

- tepat satu H1;
- H1 sesuai copy final;
- terdapat sembilan fase;
- urutan fase 01 sampai 09 benar;
- nama sembilan fase benar;
- terdapat tiga kelompok fase;
- terdapat section titik keputusan;
- terdapat section kontrol lintas proses;
- terdapat section perubahan dan kendala;
- terdapat batas informasi.

### 20.3 Metadata

Test memastikan:

```text
Cara Kerja Rumahku Konstruksi | Sembilan Fase Proses
```

Meta description sesuai plan.

Canonical berakhir dengan:

```text
/cara-kerja
```

### 20.4 Navigation

Test memastikan:

- link `Cara Kerja` desktop memiliki `aria-current="page"`;
- CTA Halaman Tentang tetap menuju `/cara-kerja`;
- CTA halaman Cara Kerja menuju `/tentang` dan `/`;
- tidak ada link menuju `/konsultasi`;
- tidak ada link menuju `/kontak`;
- tidak ada link menuju `/proyek`.

### 20.5 Publication Gate

Test negatif minimal memastikan halaman tidak memuat:

```text
kualitas terjamin
progres real-time
dashboard real-time
otomatis penuh
garansi
SLA
harga mulai
paket
Founder & CEO
Tim Kami
Lihat Portofolio
Hubungi Kami
```

Test juga memastikan:

- tidak ada angka harga;
- tidak ada gambar remote;
- tidak ada Cloudinary;
- tidak ada data proyek atau personel;
- tidak ada form;
- tidak ada input;
- tidak ada login simulasi.

### 20.6 Beranda

Test notice Beranda diperbarui menjadi copy evergreen.

CTA Beranda `Pelajari Cara Kerja` tetap menuju `/cara-kerja`.

### 20.7 Metadata Cleanup

Test metadata existing tetap lulus dan metadata dipulihkan ketika halaman unmount.

---

## 21. Acceptance Criteria

PLAN-004 diterima apabila seluruh kondisi berikut terpenuhi.

### 21.1 Git dan Scope

- branch tetap `main`;
- tidak ada branch baru;
- tidak ada commit atau push oleh Gemini;
- hanya file scope yang berubah;
- working tree berisi perubahan PLAN-004 saja;
- tidak ada file backend, archive, client, atau server yang berubah;
- `git diff --check` lulus.

### 21.2 Route dan Navigasi

- `/cara-kerja` merender halaman lengkap;
- route tidak lagi menggunakan `UnavailablePage`;
- header active state benar;
- mobile drawer active state benar;
- footer link benar;
- CTA Tentang tetap bekerja;
- `/sign-in` tetap unavailable;
- 404 tetap bekerja.

### 21.3 Content

- sembilan fase tampil lengkap;
- urutan fase benar;
- nama fase benar;
- copy sesuai PLAN-004;
- harga final hanya disebut sebagai batas, tanpa angka;
- halaman menjelaskan jalur dapat berubah;
- halaman menjelaskan gate;
- halaman menjelaskan kontrol lintas fase;
- halaman menjelaskan perubahan dan kendala;
- halaman menjelaskan batas ekspektasi;
- tidak ada klaim dilarang.

### 21.4 CTA

- tidak ada link `/konsultasi`;
- tidak ada CTA pengajuan aktif;
- CTA menuju `/tentang` dan `/` bekerja;
- notice jalur pengajuan disiapkan tampil jelas;
- halaman tidak menerima data pengguna.

### 21.5 Metadata

- title benar;
- description benar;
- canonical benar;
- metadata cleanup tetap benar.

### 21.6 Accessibility

- satu main;
- satu H1;
- heading hierarchy benar;
- ordered list overview;
- link dapat diakses keyboard;
- focus visible;
- tidak bergantung hanya pada warna;
- tidak ada disabled control tanpa penjelasan;
- responsive tanpa horizontal scrolling.

### 21.7 Quality Gate

- lint lulus;
- test lulus;
- build lulus;
- `git diff --check` lulus;
- tidak ada dependency baru;
- tidak ada warning baru yang berasal dari PLAN-004.

---

## 22. Command Validasi

Gemini menjalankan dari root repository:

```bash
npm run lint --workspace web
npm run test --workspace web
npm run build --workspace web
git diff --check
git status --short
```

Apabila nama workspace tidak dapat dikenali oleh npm, Gemini boleh menggunakan bentuk yang ekuivalen tanpa mengubah package configuration:

```bash
npm --workspace apps/web run lint
npm --workspace apps/web run test
npm --workspace apps/web run build
```

Gemini tidak boleh memperbaiki kegagalan dengan mengubah dependency, package manager, atau konfigurasi global di luar scope.

---

## 23. Larangan Implementasi

Gemini dilarang:

- membuka Google Drive;
- meminta tautan Drive;
- menebak isi dokumen;
- membuat copy baru yang tidak ada di PLAN-004;
- membuat fakta bisnis;
- membuat harga;
- membuat durasi;
- membuat wilayah layanan;
- membuat kontak;
- membuat legalitas;
- membuat personel;
- membuat proyek;
- membuat statistik;
- membuat portofolio;
- membuat testimoni;
- mengaktifkan konsultasi;
- membuat form;
- membuat API palsu;
- membuat mock data bisnis;
- menambah framework;
- menambah library UI;
- menambah state management;
- menambah CMS;
- menambah analytics;
- menambah icon package;
- mengubah backend;
- mengubah autentikasi;
- mengubah archive;
- commit;
- push.

---

## 24. Stop Conditions

Gemini berhenti tanpa perubahan apabila:

- branch bukan `main`;
- HEAD tidak sesuai base SHA final;
- working tree tidak bersih;
- remote bukan repository RKK;
- ada operasi Git tertunda;
- file target mempunyai perubahan lokal yang tidak berasal dari PLAN-004;
- implementasi membutuhkan keputusan bisnis baru;
- implementasi membutuhkan route `/konsultasi`;
- implementasi membutuhkan backend;
- implementasi membutuhkan dependency baru;
- struktur existing berbeda secara material dari baseline plan;
- test hanya dapat diluluskan dengan menghapus coverage penting;
- diperlukan perubahan protected files;
- copy plan menimbulkan konflik yang tidak dapat diselesaikan tanpa keputusan Pemilik.

Gemini melaporkan blocker dan tidak mengambil keputusan sendiri.

---

## 25. Format Laporan Gemini

Gemini mengembalikan laporan dengan format berikut:

```text
PLAN-004 — LAPORAN IMPLEMENTASI

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
- Route /cara-kerja:
- Metadata:
- Sembilan fase:
- Decision gates:
- Cross-phase controls:
- Perubahan dan kendala:
- Publication boundary:
- CTA:
- Sinkronisasi Beranda:
- Accessibility:
- Responsive behavior:

5. VALIDASI
- npm run lint --workspace web:
- npm run test --workspace web:
- npm run build --workspace web:
- git diff --check:
- git status --short:

6. PERUBAHAN BERSYARAT
- Apakah tokens.css/globals.css/shell.css diubah:
- Alasan:

7. BLOCKER ATAU CATATAN
- ...

8. KONDISI AKHIR
- Branch:
- HEAD:
- Working tree:
- Commit dilakukan: TIDAK
- Push dilakukan: TIDAK
```

Gemini tidak memberikan perintah commit atau push.

---

## 26. Aturan Audit dan Penerimaan

Setelah Gemini selesai, Room 3 dan Pemilik memeriksa:

1. laporan baseline;
2. file yang berubah;
3. kesesuaian copy;
4. route;
5. metadata;
6. heading hierarchy;
7. keyboard accessibility;
8. mobile navigation;
9. responsive layout;
10. batas klaim;
11. CTA;
12. Beranda;
13. test;
14. lint;
15. build;
16. `git diff --check`;
17. working tree.

Apabila ada koreksi kecil dalam scope yang sama, Room 3 memberikan instruksi revisi kecil tanpa membuat plan baru.

Apabila koreksi mengubah struktur, copy bisnis, route, acceptance criteria, atau scope file, PLAN-004 harus direvisi dan disetujui ulang.

---

## 27. Commit dan Push

Gemini tidak melakukan commit dan push.

Commit dan push hanya dilakukan oleh Pemilik setelah:

1. laporan Gemini diperiksa;
2. implementasi diterima;
3. seluruh validasi lulus;
4. working tree sesuai scope;
5. Pemilik memberikan persetujuan eksplisit.

Commit message belum ditetapkan dalam draf ini.

Room 3 memberikan commit message dan perintah Git secara terpisah setelah implementasi diterima.

Karena RKK menggunakan single-branch workflow, PLAN-004 tidak membuat pull request dan tidak membuat branch implementasi.

---

## 28. Dokumentasi

PLAN-004 final ditempatkan di:

```text
docs/plan/PLAN-004_IMPLEMENTASI_HALAMAN_CARA_KERJA_RUMAHKU_KONSTRUKSI.md
```

`docs/plan/README.md` diperbarui untuk menambahkan PLAN-004 dengan status yang sesuai kondisi aktual.

PLAN-004 tidak mengubah status PLAN-002 atau PLAN-003.

Ketidaksinkronan administratif PLAN-002 dan PLAN-003 dicatat sebagai pekerjaan terpisah.

---

## 29. Keputusan Pemilik

Pemilik telah menyetujui:

1. penggunaan sembilan fase sebagai struktur final;
2. copy hero;
3. copy setiap fase;
4. copy decision gates;
5. copy cross-phase controls;
6. copy perubahan dan kendala;
7. batas informasi dan ekspektasi;
8. CTA hanya ke `/tentang` dan `/`;
9. penahanan `/konsultasi`;
10. sinkronisasi notice Beranda;
11. daftar file baru;
12. daftar file existing yang boleh diubah;
13. protected files;
14. acceptance criteria;
15. base SHA final.

Status keputusan:

```text
DISETUJUI PEMILIK PADA 28 JULI 2026
SIAP DIEKSEKUSI SETELAH AUDIT LOKAL LULUS
```

---

## 30. Status Plan Final

```text
AUDIT SUMBER               : SELESAI
STRUKTUR HALAMAN           : DISETUJUI
COPY HALAMAN               : DISETUJUI
BATAS KLAIM                : DISETUJUI
SCOPE FILE                 : DISETUJUI
ACCEPTANCE CRITERIA        : DISETUJUI
BASE SHA REMOTE            : 7471572a819faef462c6ac7aa76ecd7023e685e9
BASE SHA LOKAL             : WAJIB DIVERIFIKASI SEBELUM PERUBAHAN
PERSETUJUAN PEMILIK        : SELESAI — 28 JULI 2026
INSTRUKSI GEMINI           : BOLEH DIBERIKAN
IMPLEMENTASI               : SIAP DIMULAI SETELAH AUDIT LOKAL LULUS
```

---

## 31. Riwayat Perubahan

| Versi | Tanggal | Perubahan | Status |
|---|---|---|---|
| 0.1-draft | 2026-07-28 | Draf awal PLAN-004 berdasarkan audit GitHub, sumber bisnis, serta paket WRK-01 sampai WRK-05 | Direview Pemilik |
| 1.0 | 2026-07-28 | Pemilik menyetujui struktur, copy, batas klaim, scope, acceptance criteria, single-branch workflow, dan base SHA | Disetujui Pemilik — Siap Eksekusi Bersyarat Audit Lokal |
