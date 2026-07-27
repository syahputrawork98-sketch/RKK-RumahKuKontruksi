---
kode: PLAN-003
judul: Implementasi Halaman Tentang Rumahku Konstruksi
versi: 1.0
status: DISETUJUI PEMILIK — SIAP EKSEKUSI
tanggal_penyusunan: 2026-07-28
tanggal_persetujuan: 2026-07-28
repository: syahputrawork98-sketch/RKK-RumahKuKontruksi
target_branch: refactor/plan-001-public-ui-home
base_sha: 04379b872d3b24cd4cd5d159bf0698d1f43c795a
parent_plan: PLAN-001 dan PLAN-001A — IMPLEMENTASI TERVERIFIKASI
area_implementasi: apps/web
route_utama: /tentang
alias_route: /about
jenis_pekerjaan: implementasi halaman publik berikutnya
---

# PLAN-003 — IMPLEMENTASI HALAMAN TENTANG RUMAHKU KONSTRUKSI

## 1. Status Dokumen

```text
DISETUJUI PEMILIK — SIAP EKSEKUSI
SIAP DIMASUKKAN KE docs/plan/
SIAP DIEKSEKUSI DI ANTIGRAVITY BERDASARKAN PLAN FINAL
GEMINI TETAP DILARANG COMMIT, PUSH, MERGE, ATAU MEMBUAT PULL REQUEST
```

Dokumen ini menerjemahkan paket halaman Tentang yang telah disetujui Pemilik, sumber bisnis aktif, kondisi repository terbaru, serta fondasi PLAN-001 dan PLAN-001A menjadi rencana teknis mandiri.

Target utama PLAN-003 adalah mengganti state sementara pada route `/tentang` dengan halaman informasi perusahaan yang utuh, realistis, terstruktur, responsif, dan bebas klaim yang belum mempunyai sumber.

PLAN-003 tidak membangun fitur bisnis baru, layanan aktif, autentikasi, backend, data perusahaan resmi, atau platform operasional.

---

## 2. Aturan Akses Drive dan Kemandirian Plan

Antigravity dan Gemini tidak memiliki akses langsung ke Google Drive RKK.

Nama dokumen seperti `ABT-01`, `B01.2-F01`, atau `P07.1-F04` pada bagian keterlacakan hanya digunakan oleh Pemilik dan Room 3 untuk audit. Gemini tidak boleh diminta membuka, mencari, atau menebak isi Google Drive.

Seluruh keputusan, copy, batas klaim, struktur halaman, acceptance criteria, dan aturan teknis yang diperlukan untuk implementasi telah diterjemahkan ke dalam PLAN-003.

Gemini hanya menggunakan:

1. PLAN-003 final;
2. repository dan working tree lokal;
3. file lokal yang sengaja diberikan Pemilik.

Jika terdapat informasi yang belum tersedia pada tiga sumber tersebut, Gemini wajib berhenti dan melaporkan blocker. Gemini tidak boleh:

- mencari link Drive;
- meminta folder Drive;
- menebak isi dokumen dari kode file;
- mengambil copy dari source legacy sebagai fakta bisnis;
- mengisi kekosongan dengan mock data;
- membuat sejarah, legalitas, alamat, kontak, personel, proyek, atau statistik.

---

## 3. Kedudukan Penomoran dan Branch

### 3.1 Penomoran

PLAN-003 digunakan untuk halaman Tentang.

PLAN-002 tetap merupakan plan fondasi backend pada jalur terpisah:

```text
Branch backend:
refactor/plan-002-backend-foundation

Checkpoint yang teridentifikasi:
3fa43c0cf3cbed5aacf9c86028bcda69e37352e3
```

PLAN-003 tidak:

- memulihkan atau memindahkan PLAN-002 ke branch publik;
- mengubah backend;
- bergantung pada hasil backend;
- memakai nomor PLAN-002;
- menyentuh branch backend.

### 3.2 Branch PLAN-003

PLAN-003 tetap menggunakan jalur publik yang sama:

```text
refactor/plan-001-public-ui-home
```

Keputusan ini menjaga pekerjaan website publik berada pada satu garis implementasi dan tidak membuat branch baru tanpa keputusan Pemilik.

Base SHA final:

```text
04379b872d3b24cd4cd5d159bf0698d1f43c795a
```

Base SHA telah diverifikasi saat finalisasi. Gemini wajib memeriksanya kembali pada awal eksekusi dan berhenti apabila branch, HEAD, atau working tree tidak sesuai.

---

## 4. Kondisi Baseline GitHub

Pada baseline saat ini:

- PLAN-001 berstatus selesai dan terverifikasi;
- PLAN-001A berstatus implementasi terverifikasi;
- public shell, header, drawer, footer, token, route, accessibility baseline, dan Beranda telah tersedia;
- route `/tentang` masih merender `UnavailablePage`;
- route `/cara-kerja` masih berupa halaman sementara;
- route `/sign-in` masih berupa halaman sementara;
- wildcard 404 telah tersedia;
- logo lokal RKK telah digunakan;
- content layer Beranda telah dipisahkan;
- tidak ada Tailwind pada `apps/web`;
- tidak ada dependency UI baru yang diperlukan untuk PLAN-003.

Baseline route yang harus diganti:

```jsx
<Route
  path="/tentang"
  element={
    <UnavailablePage
      title="Halaman Tentang sedang disiapkan."
      description="Informasi mengenai kedudukan, arah, dan identitas RKK akan ditampilkan setelah paket kontennya siap untuk implementasi."
    />
  }
/>
```

PLAN-003 mengganti state tersebut dengan `AboutPage`.

---

## 5. Tujuan PLAN-003

PLAN-003 bertujuan:

1. mengaktifkan halaman `/tentang`;
2. menjelaskan RKK sebagai usaha konstruksi berbasis sistem;
3. membedakan identitas usaha dari platform digital;
4. menjelaskan masalah proses yang ingin dikurangi melalui pendekatan sistem;
5. menampilkan positioning resmi dan tujuh nilai pendekatan;
6. menampilkan visi dan arah pertumbuhan sebagai arah, bukan klaim pencapaian;
7. menampilkan lima nilai inti dan tujuh DNA perusahaan;
8. menjelaskan fungsi platform sebagai sarana pendukung yang dikembangkan bertahap;
9. memisahkan arah yang telah ditetapkan dari fakta publik yang belum tersedia;
10. mengarahkan pengguna menuju `/cara-kerja`;
11. menangani alias `/about`;
12. mempertahankan public shell, accessibility, responsive behavior, dan publication gate;
13. menghapus state sementara halaman Tentang tanpa mengaktifkan route lain;
14. memperluas automated test untuk halaman Tentang;
15. memperbarui dokumentasi teknis tanpa menyentuh PLAN-002.

---

## 6. Identitas dan Positioning yang Mengikat

### 6.1 Nama Resmi

Gunakan:

```text
Rumahku Konstruksi
```

Singkatan:

```text
RKK
```

Dilarang:

- RumahKu Kontruksi;
- RumahKuKontruksi;
- Rumahku Kontruksi;
- RUMAHKUKONTRUKSI;
- wordmark legacy yang salah ejaan.

### 6.2 Kedudukan Terverifikasi

Copy yang boleh digunakan:

```text
Rumahku Konstruksi merupakan usaha konstruksi berbasis sistem yang sedang membangun fondasi bisnis, operasional, tata kelola, dan produk digital secara bertahap.
```

### 6.3 Positioning Utama

Copy verbatim:

```text
Rumahku Konstruksi adalah usaha konstruksi berbasis sistem yang membantu pekerjaan pembangunan dan renovasi dijalankan secara lebih terencana, terkendali, transparan, dan terdokumentasi.
```

### 6.4 Visi

Copy verbatim:

```text
Menjadi usaha konstruksi berbasis sistem yang terpercaya, terstandarisasi, dan bertumbuh secara terukur melalui tata kelola, pengendalian mutu, serta pengelolaan risiko yang disiplin.
```

### 6.5 Kedudukan Platform

Platform digital:

- merupakan sarana pendukung;
- dikembangkan untuk membantu dokumentasi, koordinasi, pemantauan, pelaporan, pengendalian, persetujuan, penyimpanan data, dan riwayat perubahan;
- diterapkan bertahap berdasarkan kesiapan bisnis dan teknis;
- bukan identitas utama RKK;
- bukan bukti bahwa seluruh proses sudah digital atau real-time.

---

## 7. Publication Gate dan Batas Klaim

Halaman tidak boleh menampilkan atau menyimpulkan sebagai fakta publik:

- sejarah;
- tahun berdiri;
- bentuk atau badan usaha;
- nomor legalitas;
- alamat;
- wilayah operasional;
- kontak;
- sertifikasi;
- struktur tim;
- nama personel;
- jabatan publik;
- foto tim;
- kapasitas;
- klien;
- proyek;
- portofolio;
- testimoni;
- statistik;
- rating;
- layanan aktif;
- harga;
- jadwal;
- jaminan hasil;
- klaim platform siap penuh.

Halaman tidak boleh memosisikan RKK sebagai:

- pengembang properti;
- perusahaan teknologi;
- marketplace konstruksi;
- aplikasi pencari tenaga kerja;
- platform digital murni;
- perusahaan besar dengan seluruh fungsi aktif;
- ekosistem hunian terintegrasi penuh;
- perusahaan yang menghilangkan seluruh risiko konstruksi.

Klaim berikut dilarang tanpa sumber:

- terbaik;
- terbesar;
- nomor satu;
- paling terpercaya;
- tanpa risiko;
- tanpa keterlambatan;
- tanpa pembengkakan biaya;
- transparansi total;
- kualitas pasti terjamin;
- seluruh pekerjaan real-time;
- seluruh proses otomatis;
- tim profesional lengkap;
- semua proses terintegrasi penuh.

Data mock, seed, placeholder, foto stok, source legacy, dan contoh GitHub tidak boleh menjadi fakta perusahaan.

---

## 8. Route dan Metadata

### 8.1 Route Kanonis

Route utama:

```text
/tentang
```

Route `/tentang` merender `AboutPage`.

### 8.2 Alias

Alias:

```text
/about
```

Keputusan teknis PLAN-003:

```jsx
<Route path="/about" element={<Navigate to="/tentang" replace />} />
```

Alias tidak merender halaman duplikat.

### 8.3 Metadata

Title:

```text
Tentang Rumahku Konstruksi | Konstruksi Berbasis Sistem
```

Description:

```text
Kenali kedudukan, positioning, visi, nilai inti, DNA, arah pertumbuhan, serta peran platform pendukung Rumahku Konstruksi.
```

Implementasi metadata:

- tidak menambah dependency;
- boleh memakai komponen reusable `PageMeta`;
- mengatur `document.title`;
- memperbarui atau membuat `meta[name="description"]`;
- memperbarui atau membuat `link[rel="canonical"]`;
- canonical menggunakan origin aktif dengan path `/tentang`;
- metadata dipulihkan atau diperbarui dengan aman ketika route berubah;
- structured data organisasi belum digunakan.

---

## 9. Struktur Halaman

Urutan wajib:

1. Global Header;
2. About Hero;
3. Kedudukan RKK;
4. Masalah yang Ingin Dikurangi;
5. Positioning dan Nilai Pendekatan;
6. Visi dan Arah Pertumbuhan;
7. Nilai Inti dan DNA;
8. Kedudukan Platform Digital;
9. Kondisi Aktual dan Batas Klaim;
10. Closing CTA menuju Cara Kerja;
11. Global Footer.

Section berikut tidak digunakan:

```text
Tim Kami
```

Tidak boleh dibuat ruang kosong, placeholder, skeleton permanen, atau “coming soon” untuk Tim.

---

## 10. Content Layer

Buat:

```text
apps/web/src/content/about.js
```

Seluruh copy bisnis halaman Tentang berada pada content layer. Section component tidak menyimpan literal copy bisnis utama.

Struktur yang disarankan:

```javascript
export const aboutContent = {
  meta: {},
  hero: {},
  companyPosition: {},
  problems: {},
  positioning: {},
  vision: {},
  values: {},
  platform: {},
  currentState: {},
  closing: {}
};
```

Nama key dapat disesuaikan secara minimum, tetapi pemisahan sumber konten dan presentasi wajib dipertahankan.

---

## 11. About Hero

### 11.1 Layout

Desktop:

```text
copy 7/12 atau 6/12
visual 5/12 atau 6/12
```

Mobile:

```text
eyebrow
H1
supporting copy
CTA
visual
```

### 11.2 Copy

Eyebrow:

```text
Tentang Rumahku Konstruksi
```

H1:

```text
Usaha konstruksi yang dibangun melalui sistem, proses, dan tanggung jawab yang dapat ditelusuri.
```

Supporting copy:

```text
Rumahku Konstruksi sedang membangun fondasi bisnis dan operasional agar pekerjaan konstruksi tidak hanya bergantung pada kebiasaan atau keputusan individu. RKK diarahkan untuk bekerja melalui perencanaan, pembagian peran, pemeriksaan, dokumentasi, dan pengelolaan risiko yang dilakukan secara bertahap sesuai kesiapan.
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

### 11.3 System Visual

Gunakan enam tahap:

```text
Kebutuhan
→ Perencanaan
→ Pemeriksaan
→ Pelaksanaan
→ Dokumentasi
→ Evaluasi
```

Aturan:

- visual abstrak;
- dapat memakai node dan connector berbasis CSS;
- horizontal atau grid pada desktop;
- vertikal pada mobile;
- tidak memakai foto;
- tidak memakai screenshot dashboard;
- tidak menyiratkan proyek nyata;
- tidak memakai angka progres;
- tidak memakai animasi berat;
- jika dekoratif, container memakai `aria-hidden="true"`;
- tidak menyalin visual Hero Beranda mentah-mentah apabila hierarchy tidak sesuai.

---

## 12. Kedudukan RKK

Eyebrow yang disarankan:

```text
KEDUDUKAN RKK
```

Judul:

```text
Usaha konstruksi sebagai identitas utama, sistem dan platform sebagai pendukung.
```

Intro:

```text
RKK membedakan identitas usaha, cara kerja, dan sarana digital agar arah perusahaan tidak tercampur dengan kemampuan yang masih dikembangkan.
```

### 12.1 Panel 1

Title:

```text
Usaha konstruksi berbasis sistem
```

Description:

```text
Identitas utama RKK adalah usaha konstruksi. Sistem digunakan untuk membantu pekerjaan direncanakan, dikendalikan, diperiksa, dikomunikasikan, dan didokumentasikan secara lebih konsisten.
```

### 12.2 Panel 2

Title:

```text
Platform digital sebagai sarana pendukung
```

Description:

```text
Platform digital dikembangkan untuk mendukung pencatatan, koordinasi, pemantauan, pelaporan, persetujuan, dan penyimpanan riwayat. Fungsi tersebut diterapkan bertahap berdasarkan kesiapan bisnis dan teknis.
```

### 12.3 Boundary Callout

Title:

```text
Batas posisi saat ini
```

Description:

```text
RKK saat ini tidak diposisikan sebagai pengembang properti, marketplace konstruksi, perusahaan teknologi, atau ekosistem hunian yang telah terintegrasi penuh.
```

Visual:

- dua panel pada desktop;
- satu kolom pada mobile;
- callout informasi lembut;
- bukan warning atau error;
- panel tidak interaktif;
- tidak menggunakan badge `aktif`, `terverifikasi`, atau `terbaik`.

---

## 13. Masalah yang Ingin Dikurangi

Eyebrow:

```text
KONTEKS PROSES
```

Judul:

```text
Masalah proses yang ingin dikurangi melalui pendekatan sistem.
```

Intro:

```text
Pendekatan RKK dibangun untuk membantu pekerjaan memiliki kebutuhan, keputusan, tanggung jawab, pemeriksaan, dan dokumentasi yang lebih jelas. Bagian ini bukan hasil survei dan bukan janji bahwa seluruh risiko dapat dihilangkan.
```

Enam kartu:

### 01 — Kebutuhan belum dirumuskan jelas

```text
Kebutuhan, ruang lingkup, batas pekerjaan, dan ekspektasi perlu dipahami sebelum keputusan pelaksanaan dibuat.
```

### 02 — Perencanaan belum cukup kuat

```text
Biaya, waktu, risiko, dan pembagian tanggung jawab perlu diperiksa sejak tahap awal.
```

### 03 — Perubahan pekerjaan tidak tercatat

```text
Perubahan dan keputusan sulit ditelusuri ketika tidak mempunyai catatan, alasan, dan persetujuan yang jelas.
```

### 04 — Komunikasi dan keputusan tersebar

```text
Informasi penting dapat kehilangan konteks ketika berada di banyak saluran tanpa pencatatan yang terstruktur.
```

### 05 — Tanggung jawab belum jelas

```text
Peran, kewenangan, jalur koordinasi, dan tindak lanjut perlu dipahami oleh pihak yang terlibat.
```

### 06 — Progres dan dokumen sulit ditelusuri

```text
Bukti pekerjaan, pemeriksaan, progres, dan catatan perlu disusun sebagai riwayat yang mudah ditinjau.
```

Aturan visual:

- enam kartu atau tiga kelompok;
- gunakan nomor 01–06;
- desktop tiga kolom atau dua baris;
- tablet dua kolom;
- mobile satu kolom;
- border lebih utama daripada shadow;
- tidak memakai statistik;
- tidak menggunakan hover scale;
- tidak menyalahkan konsumen, pekerja, atau pihak lain.

Copy pada bagian ini berstatus **usulan PLAN-003** dan menjadi locked copy setelah disetujui Pemilik.

---

## 14. Positioning dan Nilai Pendekatan

Eyebrow:

```text
POSITIONING RKK
```

Judul:

```text
Pembeda RKK berada pada kualitas proses yang digunakan.
```

Intro:

```text
Pembeda RKK bukan hanya jenis bangunan yang dikerjakan, tetapi cara pekerjaan direncanakan, dikendalikan, diperiksa, dikomunikasikan, dan didokumentasikan.
```

Positioning quote:

```text
Rumahku Konstruksi adalah usaha konstruksi berbasis sistem yang membantu pekerjaan pembangunan dan renovasi dijalankan secara lebih terencana, terkendali, transparan, dan terdokumentasi.
```

Tujuh nilai pendekatan:

### Kejelasan Proses

```text
Setiap pekerjaan diarahkan melalui tahapan, tanggung jawab, dan titik keputusan yang jelas.
```

### Perencanaan

```text
Kebutuhan, ruang lingkup, waktu, biaya, dan risiko diperiksa sebelum pekerjaan dilaksanakan.
```

### Pengendalian

```text
Pelaksanaan dibandingkan dengan rencana, dokumen, dan keputusan yang telah disepakati.
```

### Transparansi

```text
Informasi relevan mengenai ruang lingkup, progres, perubahan, kendala, dan keputusan disampaikan kepada pihak yang berhak mengetahuinya.
```

### Dokumentasi

```text
Data, keputusan, perubahan, progres, dan bukti pekerjaan diarahkan untuk dicatat secara teratur.
```

### Tanggung Jawab

```text
Setiap fungsi perlu mempunyai kewenangan, tanggung jawab, dan batas peran yang dapat ditelusuri.
```

### Pengelolaan Risiko

```text
Risiko biaya, waktu, mutu, teknis, sumber daya, keselamatan, kontrak, dan reputasi dipertimbangkan dalam pengambilan keputusan.
```

Visual:

- quote mempunyai prioritas visual;
- tujuh item menggunakan grid;
- desktop maksimal empat kolom;
- tablet dua kolom;
- mobile satu kolom;
- item bukan link;
- tidak ada badge unggulan;
- tidak ada jaminan hasil.

---

## 15. Visi dan Arah Pertumbuhan

Eyebrow:

```text
VISI DAN ARAH
```

Judul:

```text
Arah pertumbuhan yang dibangun secara bertahap dan terukur.
```

Intro:

```text
Visi menjelaskan arah jangka panjang RKK. Visi tidak digunakan sebagai bukti bahwa seluruh sistem, kapasitas, layanan, dan platform telah tercapai.
```

### 15.1 Vision Statement

Label:

```text
Visi Rumahku Konstruksi
```

Quote verbatim:

```text
Menjadi usaha konstruksi berbasis sistem yang terpercaya, terstandarisasi, dan bertumbuh secara terukur melalui tata kelola, pengendalian mutu, serta pengelolaan risiko yang disiplin.
```

Note:

```text
Visi merupakan arah perusahaan, bukan klaim kondisi yang telah tercapai sepenuhnya.
```

Gunakan `<blockquote>` bila sesuai.

### 15.2 Empat Pilar Arah

#### Terpercaya

```text
Kepercayaan dibangun melalui integritas, keterbukaan, konsistensi, tanggung jawab, dan kesesuaian antara janji dengan kemampuan aktual.
```

#### Terstandarisasi

```text
Alur, peran, dokumen, pemeriksaan, persetujuan, dan evaluasi diarahkan agar dapat digunakan secara konsisten.
```

#### Bertumbuh secara terukur

```text
Pertumbuhan mengikuti kesiapan sistem, sumber daya, keuangan, operasional, pengawasan, dan tingkat risiko.
```

#### Tata kelola, mutu, dan risiko

```text
Keputusan penting perlu mempunyai dasar, kewenangan, catatan, pemeriksaan, serta pertimbangan mutu dan risiko.
```

### 15.3 Ringkasan Misi

PLAN-003 menampilkan empat kelompok misi secara ringkas agar halaman tidak berubah menjadi daftar delapan misi yang panjang.

#### Sistem dan dokumentasi

```text
Membangun alur kerja, dokumen, pembagian peran, standar pemeriksaan, serta evaluasi yang dapat digunakan secara konsisten.
```

#### Perencanaan, transparansi, dan tanggung jawab

```text
Menjalankan pekerjaan dengan informasi ruang lingkup, biaya, waktu, progres, perubahan, dan risiko yang jelas bagi pihak berkepentingan.
```

#### Mutu dan pengelolaan risiko

```text
Menjaga mutu melalui pengendalian pada setiap tahap serta mempertimbangkan risiko teknis, keuangan, operasional, waktu, sumber daya, dan reputasi.
```

#### Peran, teknologi, hubungan, dan pertumbuhan

```text
Mengembangkan pembagian peran, teknologi pendukung, hubungan jangka panjang, dan pertumbuhan bertahap sesuai kapasitas.
```

Aturan:

- tidak ada target tahun;
- tidak ada progress bar;
- tidak ada persentase pencapaian;
- tidak menyatakan “telah terpercaya”;
- mission group bukan carousel;
- gunakan hierarchy yang membedakan visi, pilar, dan misi.

---

## 16. Nilai Inti dan DNA

Eyebrow:

```text
NILAI INTI DAN DNA
```

Judul:

```text
Prinsip yang tidak boleh dikorbankan dan pola berpikir yang membentuk cara kerja RKK.
```

Intro:

```text
Nilai inti menjadi dasar keputusan dan tindakan. DNA menjelaskan pola berpikir khas yang digunakan untuk membangun sistem, proses, dan pertumbuhan RKK.
```

### 16.1 Lima Nilai Inti

#### Integritas

```text
Menjaga kesesuaian antara perkataan, keputusan, dokumen, dan pelaksanaan pekerjaan.
```

#### Transparansi

```text
Memberikan kejelasan informasi kepada pihak yang berhak mengetahui, tanpa membuka informasi rahasia kepada semua pihak.
```

#### Disiplin Sistem

```text
Menjalankan pekerjaan melalui proses, standar, dokumentasi, pemeriksaan, dan jalur persetujuan yang telah ditetapkan.
```

#### Akuntabilitas

```text
Memastikan tanggung jawab, kewenangan, keputusan, dan tindak lanjut dapat dijelaskan serta ditelusuri.
```

#### Perbaikan Berkelanjutan

```text
Mengevaluasi dan memperbaiki sistem, proses, dokumen, serta cara kerja berdasarkan pengalaman, data, dan hasil pemeriksaan.
```

Keputusan presentasi:

- lima nilai ditampilkan sebagai card;
- desktop tiga kolom lalu dua kolom atau grid responsif;
- tablet dua kolom;
- mobile satu kolom;
- tidak menambah `Profesionalisme` sebagai nilai keenam;
- tidak mencampur janji layanan ke nilai inti.

### 16.2 Tujuh DNA

Urutan wajib:

1. Sistem lebih penting daripada ketergantungan kepada individu.
2. Data lebih penting daripada asumsi.
3. Risiko harus dihitung, bukan ditebak.
4. Kontrol lebih penting daripada kecepatan yang tidak terkendali.
5. Stabilitas lebih penting daripada pertumbuhan agresif.
6. Proses harus terdokumentasi.
7. Pertumbuhan dilakukan secara bertahap dan terukur.

Keputusan presentasi:

- ordered list semantik;
- dua kolom pada desktop bila urutan baca tetap benar;
- satu kolom pada mobile;
- tidak memakai tab;
- tidak memakai carousel;
- pasangan konsep boleh diberi emphasis visual;
- teks lengkap tetap tersedia.

---

## 17. Kedudukan Platform Digital

Eyebrow:

```text
PLATFORM PENDUKUNG
```

Judul:

```text
Platform dikembangkan untuk mendukung sistem dan proses, bukan menggantikan identitas usaha.
```

Intro:

```text
Teknologi digunakan sebagai sarana pencatatan, koordinasi, pemantauan, pelaporan, pengendalian, dan penyimpanan riwayat yang diterapkan secara bertahap.
```

### 17.1 Relationship Diagram

Urutan:

```text
Usaha Konstruksi
→ Sistem dan Proses
→ Platform Pendukung
```

Supporting label:

- Usaha Konstruksi — `Identitas utama`;
- Sistem dan Proses — `Alur, peran, pemeriksaan, dan dokumentasi`;
- Platform Pendukung — `Dikembangkan secara bertahap`.

Desktop:

- horizontal.

Mobile:

- vertikal.

Hubungan harus tetap tersedia sebagai teks dan tidak hanya melalui panah.

### 17.2 Fungsi Pendukung

Tampilkan sebagai daftar:

- dokumentasi;
- koordinasi;
- pemantauan;
- pelaporan;
- pengendalian;
- penyimpanan data;
- proses persetujuan;
- riwayat perubahan.

Gunakan framing:

```text
Platform dapat dikembangkan untuk membantu:
```

Bukan:

```text
Platform saat ini telah menjalankan seluruh fungsi berikut:
```

### 17.3 Claim Boundary

Title:

```text
Batas klaim teknologi
```

Items:

- tidak seluruh progres tersedia secara real-time;
- tidak seluruh proses berjalan otomatis;
- tidak semua persetujuan dilakukan secara digital;
- platform bukan satu-satunya bukti keputusan.

Tone:

- informative;
- netral;
- bukan warning keras;
- bukan error state.

---

## 18. Kondisi Aktual dan Batas Klaim

Eyebrow:

```text
KONDISI AKTUAL
```

Judul:

```text
Arah yang telah ditetapkan dipisahkan dari fakta yang belum siap dipublikasikan.
```

Intro:

```text
RKK masih membangun fondasi tata kelola, struktur peran, proses kerja, dokumentasi, model bisnis, layanan, serta platform digital. Arah dan prinsip pada halaman ini menjadi dasar keputusan, bukan klaim bahwa seluruh sistem telah berjalan sempurna.
```

### 18.1 Sudah Menjadi Arah atau Prinsip

- identitas usaha konstruksi berbasis sistem;
- positioning;
- visi dan misi;
- nilai inti dan DNA;
- pengembangan bertahap dan terukur;
- platform sebagai sarana pendukung.

### 18.2 Belum Ditampilkan sebagai Fakta Publik

- legalitas dan data resmi perusahaan;
- sejarah dan tahun berdiri;
- alamat, wilayah, dan kontak;
- struktur tim dan kapasitas;
- sertifikasi;
- layanan aktif dan detail komersial;
- klien, proyek, testimoni, dan statistik;
- klaim kesiapan platform penuh.

Visual:

- desktop dua kolom;
- mobile “Sudah Menjadi Arah” terlebih dahulu;
- tone established dan held dibedakan melalui surface, border, heading, dan icon;
- warna bukan satu-satunya pembeda;
- held bukan error;
- tidak menggunakan checklist hijau/merah sebagai satu-satunya indikator;
- tidak menampilkan source ID, URL Drive, atau status internal pada UI publik.

---

## 19. Closing CTA

Headline:

```text
Lihat bagaimana prinsip tersebut diterjemahkan menjadi tahapan kerja.
```

Supporting copy:

```text
Halaman Cara Kerja menjelaskan alur tingkat tinggi, titik pemeriksaan, tanggung jawab, dan batas proses tanpa menjanjikan harga, jadwal, atau penerimaan proyek.
```

Primary:

```text
Pelajari Cara Kerja
```

Target:

```text
/cara-kerja
```

Secondary:

```text
Kembali ke Beranda
```

Target:

```text
/
```

Dilarang:

- Hubungi Kami;
- Lihat Portofolio;
- Konsultasi Gratis;
- Mulai Sekarang;
- Ajukan Kebutuhan;
- route Kontak atau Proyek;
- CTA yang bergantung pada kanal belum tersedia.

---

## 20. Public Shell

PLAN-003 wajib memakai shell PLAN-001/PLAN-001A:

- `PublicAppShell`;
- `SkipLink`;
- `PublicHeader`;
- `MobileDrawer`;
- `PublicFooter`;
- `PublicContainer`;
- `PublicSection`;
- `SectionHeading`;
- `ActionLink`;
- komponen UI reusable yang relevan.

Jangan:

- membuat header atau footer khusus Tentang;
- mengubah menu;
- menambah Layanan, Kontak, atau Proyek ke nav;
- mengubah behavior drawer;
- menambah modal login;
- menambah role demo;
- merusak active state Tentang;
- mengubah Beranda hanya untuk menyamakan gaya secara berlebihan.

---

## 21. State Strategy

Semua konten PLAN-003 bersifat statis lokal pada tahap ini.

Keputusan:

- implementasikan default state;
- jangan menambahkan data fetching;
- jangan menambahkan skeleton runtime yang tidak pernah digunakan;
- jangan membuat error boundary khusus halaman tanpa kebutuhan;
- visual abstrak menjadi fallback aman;
- blok yang belum mempunyai sumber tidak dirender;
- batas informasi dijelaskan melalui Company Position, Platform Claim Boundary, dan Current State;
- shell global dan AppErrorBoundary tetap dipertahankan.

Komponen state konseptual ABT tetap menjadi referensi untuk tahap dinamis berikutnya, bukan kewajiban membuat seluruh state sekarang.

---

## 22. Visual Direction

Karakter:

```text
profesional
tenang
terstruktur
realistis
modern
ringan
tepercaya
tidak berlebihan
```

Gunakan:

- token PLAN-001/PLAN-001A;
- teal profesional;
- surface putih dan netral;
- border lembut;
- shadow tipis dan selektif;
- hierarchy typography jelas;
- whitespace cukup;
- split layout;
- diagram CSS;
- card dengan radius konsisten;
- motion minimal hanya pada interaction state.

Hindari:

- gradient keras;
- neon;
- glassmorphism berlebihan;
- foto stok;
- ilustrasi proyek palsu;
- floating particles;
- autoplay;
- carousel;
- hover scale;
- semua section menggunakan kartu identik;
- semua informasi dijadikan pill;
- icon library baru;
- dependency baru.

Halaman harus terasa satu sistem dengan Beranda, tetapi tidak boleh terlihat sebagai salinan Beranda dengan copy berbeda.

---

## 23. Reuse Baseline Legacy

Folder:

```text
client/**
```

Kedudukan:

```text
READ-ONLY REFERENCE
```

### 23.1 Matriks Keputusan

| Baseline Legacy | Keputusan | Boleh Dipakai | Wajib Ditolak |
|---|---|---|---|
| `Tentang.jsx` | Referensi composer | konsep halaman modular dan closing section | Framer Motion, CTA Kontak/Proyek, copy lama |
| `TentangIntro.jsx` | Refactor total | hierarchy hero dan section intro | ejaan salah, ekosistem terintegrasi, real-time, kualitas terjamin |
| `TentangVisi.jsx` | Refactor total | panel visi dengan priority visual | visi ekosistem, icon dependency, copy lama |
| `TentangMisi.jsx` | Refactor total | grid/list ringkas | platform aman sebagai klaim aktif, tenaga profesional, real-time, klaim skala Indonesia |
| `TentangNilai.jsx` | Refactor total | grid nilai | Terintegrasi/Terpantau/Profesional sebagai nilai, akses penuh, real-time |
| `TentangTim.jsx` | Tidak digunakan | tidak ada | nama, jabatan, foto, dan copy tim placeholder |
| `TimCard.jsx` | Tidak digunakan | tidak ada | seluruh implementasi |
| CTA legacy | Ganti | komposisi panel penutup | Hubungi Kami, Lihat Portfolio, tim profesional |

### 23.2 Aturan Reuse

- jangan menyalin source legacy utuh;
- jangan mengimpor dari `client/**`;
- jangan memindahkan Framer Motion;
- jangan memindahkan React Icons;
- jangan memindahkan Tailwind;
- jangan mengubah `client/**`;
- jangan menggunakan copy legacy;
- jangan menggunakan foto legacy;
- hanya pola hierarchy atau komposisi yang boleh diterjemahkan ke sistem aktif.

---

## 24. Struktur File yang Diizinkan

File baru yang disarankan:

```text
apps/web/src/pages/AboutPage.jsx
apps/web/src/content/about.js
apps/web/src/sections/about/AboutHero.jsx
apps/web/src/sections/about/AboutCompanyPosition.jsx
apps/web/src/sections/about/AboutProblems.jsx
apps/web/src/sections/about/AboutPositioning.jsx
apps/web/src/sections/about/AboutVision.jsx
apps/web/src/sections/about/AboutValues.jsx
apps/web/src/sections/about/AboutPlatform.jsx
apps/web/src/sections/about/AboutCurrentState.jsx
apps/web/src/sections/about/AboutClosingCTA.jsx
apps/web/src/components/ui/PageMeta.jsx          [opsional tetapi direkomendasikan]
apps/web/src/styles/about.css
docs/plan/PLAN-003_IMPLEMENTASI_HALAMAN_TENTANG_RUMAHKU_KONSTRUKSI.md
```

File yang diperkirakan dimodifikasi:

```text
apps/web/src/app/AppRouter.jsx
apps/web/src/main.jsx
apps/web/src/test/app.test.jsx
docs/plan/README.md
```

File UI reusable boleh dimodifikasi hanya jika benar-benar diperlukan:

```text
apps/web/src/components/ui/InfoCard.jsx
apps/web/src/components/ui/PublicSection.jsx
apps/web/src/components/ui/SectionHeading.jsx
apps/web/src/styles/globals.css
apps/web/src/styles/shell.css
```

Syarat perubahan komponen global:

- tidak merusak Beranda;
- backward compatible;
- mempunyai test;
- tidak dibuat khusus untuk satu copy;
- alasan dicatat dalam laporan.

Tidak perlu mengubah:

```text
apps/web/package.json
package-lock.json
```

Dependency baru dilarang.

---

## 25. Protected Area

Jangan mengubah:

```text
client/**
server/**
apps/backend/**
archive/**
database/**
.env*
README.md
FITUR.md
docs/plan/PLAN-000*
docs/plan/PLAN-001*
docs/plan/PLAN-001A*
docs/plan/PLAN-002*
```

Pengecualian dokumentasi hanya:

```text
docs/plan/README.md
docs/plan/PLAN-003_IMPLEMENTASI_HALAMAN_TENTANG_RUMAHKU_KONSTRUKSI.md
```

Jangan:

- membuat branch baru;
- switch branch;
- merge;
- rebase;
- cherry-pick;
- reset;
- amend;
- stash;
- clean;
- commit;
- push;
- membuat pull request;
- deployment.

---

## 26. Urutan Implementasi

### Task 1 — Baseline Gate

Jalankan:

```bash
git branch --show-current
git rev-parse HEAD
git status --short
git log -8 --oneline --decorate
```

Lanjutkan hanya jika:

- branch `refactor/plan-001-public-ui-home`;
- HEAD sama dengan base SHA final PLAN-003;
- working tree bersih.

Jika tidak sesuai, berhenti.

### Task 2 — Audit Source Aktif

Baca:

- PLAN-003 final;
- current `apps/web`;
- public shell;
- content layer;
- test;
- legacy Tentang hanya sebagai read-only reference.

Jangan membuat `implementation_plan.md` di repository.

### Task 3 — Content Layer

Buat `about.js` dan masukkan seluruh copy yang disetujui.

### Task 4 — Page Metadata

Buat atau gunakan mekanisme metadata tanpa dependency.

### Task 5 — Route

- buat `AboutPage`;
- ganti `/tentang` dari `UnavailablePage`;
- tambahkan `/about` redirect;
- pertahankan route lain.

### Task 6 — About Hero

Implementasikan copy, CTA, dan diagram enam tahap.

### Task 7 — Kedudukan RKK

Implementasikan dua panel dan boundary callout.

### Task 8 — Masalah

Implementasikan enam item bernomor.

### Task 9 — Positioning dan Nilai Pendekatan

Implementasikan quote dan tujuh item.

### Task 10 — Visi dan Arah

Implementasikan vision panel, empat pillar, dan empat mission group.

### Task 11 — Nilai Inti dan DNA

Implementasikan lima nilai dan tujuh DNA.

### Task 12 — Platform

Implementasikan relationship diagram, fungsi, dan claim boundary.

### Task 13 — Kondisi Aktual

Implementasikan established vs held.

### Task 14 — Closing CTA

Implementasikan CTA Cara Kerja dan Beranda.

### Task 15 — Styling

Tambahkan `about.css`, import melalui `main.jsx`, dan rapikan CSS.

### Task 16 — Test

Perbarui automated test tanpa menghapus test Beranda.

### Task 17 — Browser Verification

Periksa seluruh viewport dan route.

### Task 18 — Dokumentasi

Tambahkan PLAN-003 dan perbarui indeks plan.

### Task 19 — Final Validation

Jalankan seluruh validasi dan laporan.

---

## 27. Responsive Requirements

Viewport minimum:

```text
360 × 800
390 × 844
768 × 1024
1024 × 768
1440 × 900
```

Periksa:

- no horizontal overflow;
- header tidak menutupi H1;
- About Hero copy terbaca;
- CTA vertikal pada layar sempit;
- visual setelah CTA pada mobile;
- system diagram vertikal pada mobile;
- system diagram stabil pada desktop;
- position panels bertumpuk dengan urutan benar;
- problem cards satu kolom pada mobile;
- positioning values tidak terlalu sempit;
- vision quote tidak overflow;
- mission group mudah dipindai;
- lima nilai tidak menghasilkan satu card yatim dengan layout buruk;
- DNA tetap berurutan;
- platform diagram horizontal–vertikal dengan benar;
- Current State menampilkan established sebelum held;
- closing CTA tidak bertabrakan;
- footer tidak berubah;
- zoom 200%;
- tidak ada fixed height yang memotong copy.

---

## 28. Accessibility Requirements

Wajib:

- satu H1;
- heading hierarchy;
- `header`, `nav`, `main`, `section`, `footer`;
- SkipLink;
- `aria-current="page"` pada Tentang;
- CTA berupa link;
- card noninteraktif bukan button;
- ordered list untuk DNA;
- list semantik untuk fungsi dan status;
- focus visible;
- keyboard navigation;
- drawer behavior tidak regresi;
- touch target minimum 44 px;
- reduced motion;
- tidak ada autoplay;
- warna bukan satu-satunya pembeda;
- icon dekoratif memakai `aria-hidden="true"`;
- visual dekoratif disembunyikan;
- hubungan diagram tetap tersedia melalui teks;
- blockquote tetap terbaca tanpa dekorasi;
- alias redirect tidak menghasilkan loop;
- title dan description terpasang.

---

## 29. Automated Test Minimum

Pertahankan seluruh test PLAN-001/PLAN-001A.

Tambahkan test yang membuktikan:

1. `/tentang` merender AboutPage, bukan `UnavailablePage`;
2. H1 Tentang tepat;
3. hanya satu H1 pada halaman Tentang;
4. primary CTA menuju `/cara-kerja`;
5. secondary CTA menuju `/`;
6. `/about` redirect ke `/tentang`;
7. nav Tentang mempunyai `aria-current="page"`;
8. enam tahap Hero tampil dalam urutan;
9. positioning quote tampil;
10. visi verbatim tampil;
11. tepat lima nilai inti tampil;
12. `Profesionalisme` tidak tampil sebagai nilai keenam;
13. tepat tujuh DNA tampil;
14. relationship diagram mempunyai tiga lapisan;
15. Current State mempunyai dua heading yang benar;
16. section Tim tidak tampil;
17. tidak ada nama atau jabatan legacy;
18. tidak ada Hubungi Kami;
19. tidak ada Lihat Portfolio/Portofolio;
20. tidak ada route `/kontak` atau `/proyek` pada halaman;
21. tidak ada remote image;
22. tidak ada klaim `real-time`, `ekosistem hunian terintegrasi`, atau `kualitas terjamin`;
23. title dan meta description diperbarui;
24. route Beranda tetap lulus;
25. `/cara-kerja`, `/sign-in`, dan 404 tetap lulus;
26. drawer accessibility tetap lulus.

Test tidak boleh hanya memeriksa nama class. Test harus membuktikan output atau behavior.

---

## 30. Validasi Wajib

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
/about
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
- metadata;
- redirect;
- no horizontal overflow;
- no remote asset;
- no broken layout;
- no section Tim;
- no legacy CTA;
- no claim leakage.

Hentikan dev server.

Lanjutkan:

```bash
git diff --check
git status --short
git diff --stat
git diff --name-only
```

Pencarian minimum:

```bash
git grep -n "RumahKu Kontruksi" -- apps/web
git grep -n "RumahKuKontruksi" -- apps/web
git grep -n "Rumahku Kontruksi" -- apps/web
git grep -n "ekosistem hunian terintegrasi" -- apps/web
git grep -n "pengawasan proyek real-time" -- apps/web
git grep -n "kualitas terjamin" -- apps/web
git grep -n "tim profesional" -- apps/web
git grep -n "Founder & CEO" -- apps/web
git grep -n "TentangTim" -- apps/web
git grep -n "TimCard" -- apps/web
git grep -n "Hubungi Kami" -- apps/web
git grep -n "Lihat Portfolio" -- apps/web
git grep -n "Lihat Portofolio" -- apps/web
git grep -n 'to="/kontak"' -- apps/web
git grep -n 'to="/proyek"' -- apps/web
git grep -n "cloudinary" -- apps/web
git grep -n 'href="#"' -- apps/web
```

Kemunculan di test negatif atau dokumen plan harus dijelaskan. Tidak boleh muncul pada output implementasi aktif.

---

## 31. Acceptance Criteria

### Baseline dan Scope

- [ ] branch benar;
- [ ] base SHA benar;
- [ ] working tree awal bersih;
- [ ] tidak ada branch baru;
- [ ] PLAN-002 tidak disentuh;
- [ ] backend tidak disentuh;
- [ ] protected area tidak berubah;
- [ ] tidak ada dependency baru;
- [ ] perubahan hanya dalam scope PLAN-003.

### Route dan Metadata

- [ ] `/tentang` aktif;
- [ ] `/tentang` bukan UnavailablePage;
- [ ] `/about` redirect;
- [ ] tidak ada redirect loop;
- [ ] title benar;
- [ ] description benar;
- [ ] canonical menuju `/tentang`;
- [ ] route lain tidak berubah.

### Hero

- [ ] eyebrow benar;
- [ ] H1 benar;
- [ ] supporting copy benar;
- [ ] CTA Cara Kerja benar;
- [ ] CTA Beranda benar;
- [ ] enam tahap tampil;
- [ ] visual responsif;
- [ ] tidak ada foto atau dashboard palsu.

### Kedudukan

- [ ] usaha konstruksi menjadi identitas utama;
- [ ] platform dijelaskan sebagai pendukung;
- [ ] boundary callout tampil;
- [ ] tidak ada layanan aktif;
- [ ] tidak ada positioning terlarang.

### Masalah

- [ ] enam masalah tampil;
- [ ] marker 01–06;
- [ ] tidak ada statistik;
- [ ] tidak ada klaim riset;
- [ ] framing tidak menyalahkan pihak lain.

### Positioning

- [ ] quote positioning verbatim;
- [ ] tujuh nilai pendekatan;
- [ ] copy tidak menjadi jaminan;
- [ ] layout responsif;
- [ ] card noninteraktif.

### Visi dan Misi

- [ ] visi verbatim;
- [ ] visi dijelaskan sebagai arah;
- [ ] empat pillar;
- [ ] empat mission group;
- [ ] tidak ada target tahun;
- [ ] tidak ada persentase;
- [ ] tidak menyatakan visi telah tercapai.

### Nilai dan DNA

- [ ] lima nilai inti;
- [ ] definisi sesuai sumber;
- [ ] tidak ada nilai keenam;
- [ ] tujuh DNA;
- [ ] urutan DNA benar;
- [ ] list semantik;
- [ ] tidak ada carousel/tab.

### Platform

- [ ] hubungan tiga lapisan;
- [ ] urutan usaha → sistem → platform;
- [ ] fungsi memakai framing bertahap;
- [ ] claim boundary;
- [ ] tidak ada real-time/otomatis penuh;
- [ ] tidak ada screenshot dashboard.

### Kondisi Aktual

- [ ] intro kondisi aktual benar;
- [ ] established vs held;
- [ ] mobile established lebih dahulu;
- [ ] held bukan error;
- [ ] tidak ada fakta publik fiktif;
- [ ] tidak ada URL/sumber internal.

### Closing dan Shell

- [ ] CTA Cara Kerja;
- [ ] CTA Beranda;
- [ ] tidak ada Kontak/Portofolio;
- [ ] header tetap;
- [ ] drawer tidak regresi;
- [ ] footer tetap;
- [ ] active nav Tentang benar.

### Legacy

- [ ] `client/**` tidak berubah;
- [ ] tidak ada import legacy;
- [ ] tidak ada Framer Motion;
- [ ] tidak ada React Icons baru;
- [ ] Tim tidak tampil;
- [ ] copy legacy tidak masuk.

### Responsive dan Accessibility

- [ ] viewport minimum diperiksa;
- [ ] no horizontal overflow;
- [ ] zoom 200%;
- [ ] satu H1;
- [ ] heading hierarchy;
- [ ] landmarks;
- [ ] keyboard;
- [ ] focus;
- [ ] drawer;
- [ ] reduced motion;
- [ ] touch target;
- [ ] warna bukan satu-satunya pembeda;
- [ ] diagram mempunyai teks.

### Validasi

- [ ] test lulus;
- [ ] jumlah test dilaporkan;
- [ ] lint lulus;
- [ ] build lulus;
- [ ] dev server lulus;
- [ ] route manual lulus;
- [ ] grep terlarang diperiksa;
- [ ] `git diff --check` bersih;
- [ ] laporan lengkap;
- [ ] Gemini tidak commit/push/PR.

---

## 32. Format Laporan Gemini

### A. Baseline

- repository;
- branch;
- HEAD;
- working tree awal;
- base PLAN-003;
- status PLAN-001/001A;
- konfirmasi PLAN-002 tidak disentuh.

### B. Audit Baseline

- source aktif yang dibaca;
- file legacy yang dibaca;
- pola yang digunakan;
- pola yang ditolak;
- konfirmasi `client/**` read-only.

### C. Implementasi

- content layer;
- route;
- redirect;
- metadata;
- AboutPage;
- Hero;
- Kedudukan;
- Masalah;
- Positioning;
- Visi/Misi;
- Nilai/DNA;
- Platform;
- Current State;
- Closing CTA;
- styling;
- test;
- dokumentasi.

### D. Validasi

- test dan jumlah;
- lint;
- build;
- dev server;
- route;
- redirect;
- metadata;
- viewport;
- zoom;
- keyboard;
- focus;
- drawer;
- reduced motion;
- remote asset;
- grep;
- `git diff --check`.

### E. Temuan dan Batas

- blocker;
- deviasi;
- item belum selesai;
- risiko regresi;
- copy yang tidak diterapkan;
- acceptance criteria yang belum lulus;
- keputusan tambahan yang dibutuhkan.

### F. Kondisi Akhir

- status PLAN-003;
- `git status --short`;
- `git diff --stat`;
- daftar file berubah;
- protected area;
- PLAN-002;
- backend;
- konfirmasi tidak branch baru;
- konfirmasi tidak commit;
- konfirmasi tidak push;
- konfirmasi tidak merge/PR.

---

## 33. Status Setelah Eksekusi

Jika seluruh acceptance criteria lulus, status maksimum:

```text
PLAN-003 — SIAP AUDIT IMPLEMENTASI
```

Gemini tidak boleh menulis:

- selesai;
- final;
- terverifikasi;
- ditutup;
- production ready.

Status `IMPLEMENTASI TERVERIFIKASI` hanya ditetapkan setelah:

1. laporan Gemini diperiksa Room 3;
2. Pemilik melakukan commit dan push;
3. SHA terbaru diaudit;
4. koreksi audit diselesaikan bila ada;
5. hasil audit diterima.

---

## 34. Keputusan yang Disetujui Pemilik

- [x] judul PLAN-003;
- [x] branch tetap `refactor/plan-001-public-ui-home`;
- [x] base SHA final;
- [x] route kanonis `/tentang`;
- [x] `/about` redirect;
- [x] metadata halaman;
- [x] struktur sembilan section isi;
- [x] copy About Hero;
- [x] system visual enam tahap;
- [x] copy Kedudukan RKK;
- [x] enam problem cards;
- [x] positioning quote dan tujuh nilai pendekatan;
- [x] visi verbatim;
- [x] empat pillar;
- [x] empat mission group;
- [x] lima nilai inti sebagai card;
- [x] tujuh DNA sebagai ordered list;
- [x] platform relationship;
- [x] current state;
- [x] closing CTA;
- [x] section Tim tidak digunakan;
- [x] legacy reuse matrix;
- [x] scope file;
- [x] protected area;
- [x] acceptance criteria.

---

## 35. Keterlacakan Sumber untuk Pemilik dan Audit

Bagian ini bukan instruksi Gemini untuk membuka Drive.

### Paket Tentang

- ABT-01 — Spesifikasi Halaman Tentang RKK;
- ABT-02 — Pemetaan Data dan Konten Tentang RKK, dirujuk oleh paket halaman; PLAN-003 tidak membuat asumsi row-level yang tidak tertulis pada sumber lain;
- ABT-03 — Daftar Referensi Halaman Tentang RKK;
- ABT-04 — Wireframe Halaman Tentang RKK;
- ABT-05 — Spesifikasi Komponen UI Tentang RKK.

### Sumber Bisnis

- B01.2-F01 — Visi dan Misi Perusahaan RKK;
- B01.2-F02 — Nilai Inti dan DNA Perusahaan RKK;
- B02.1-F01 — Positioning Perusahaan RKK;
- B02.2-F01 — Analisis Pasar dan Pelanggan RKK;
- B02.3-F01 — Model Bisnis Rumahku Konstruksi.

### Sumber Produk

- P03-F01 — Arsitektur Informasi dan Area Produk;
- P03-F02 — Sitemap dan Hierarki Destinasi;
- P04-F03 — Spesifikasi Halaman Website Publik;
- P05.1-F01 — Spesifikasi Fitur dan Alur Website Publik;
- P07 global;
- P07.1;
- PLAN-001;
- PLAN-001A.

### Baseline GitHub

- current public branch;
- `apps/web`;
- legacy `client/**` sebagai referensi read-only.

---

## 36. Catatan Penutup

PLAN-003 harus menghasilkan halaman Tentang yang menjawab:

```text
RKK itu usaha apa?
Apa pembeda RKK?
Apa arah yang sedang dibangun?
Nilai apa yang menjadi fondasi?
Bagaimana kedudukan platform?
Apa yang belum boleh diklaim?
Ke mana pengguna mempelajari proses?
```

Prinsip penutup:

```text
jelaskan identitas tanpa membangun citra skala
jelaskan arah tanpa mengaku sudah mencapainya
jelaskan platform tanpa menjadikannya identitas utama
jelaskan keterbatasan tanpa membuat halaman defensif
gunakan sumber bisnis, bukan copy legacy
arahkan pengguna dari Tentang menuju Cara Kerja
```
