# Struktur Ruang Kerja RKK

**Proyek:** Rumahku Konstruksi (RKK)  
**Versi:** 1.0  
**Tanggal penetapan awal:** 23 Juli 2026  
**Status:** Struktur kerja disetujui untuk penataan bertahap

## 1. Tujuan

Dokumen ini menetapkan pemisahan ruang kerja RKK agar dokumen bisnis, perencanaan produk digital, dan implementasi teknis tidak tercampur.

Struktur RKK dibagi menjadi tiga lapisan:

1. **Bisnis Rumahku Konstruksi** — menjelaskan perusahaan, layanan, proses operasional, proyek, keuangan, brand, dan legalitas.
2. **Produk Digital dan Platform Web RKK** — menjelaskan apa yang harus dilakukan platform untuk mendukung bisnis dan penggunanya.
3. **Teknologi** — menjelaskan bagaimana kebutuhan produk diterapkan melalui frontend, backend, database, integrasi, pengujian, dan deployment.

Penempatannya adalah:

```text
Google Drive
├── Lapisan 1 — Bisnis Rumahku Konstruksi
└── Lapisan 2 — Produk Digital dan Platform Web RKK

GitHub
└── Lapisan 3 — Implementasi Teknis Platform
```

## 2. Struktur Utama Google Drive

```text
RKK — RUMAHKU KONSTRUKSI
├── 00 — PUSAT INFORMASI RKK
├── 01 — BISNIS RUMAHKU KONSTRUKSI
├── 02 — PRODUK DIGITAL DAN PLATFORM WEB RKK
└── 99 — ARSIP RKK
```

### 2.1 00 — Pusat Informasi RKK

```text
00 — PUSAT INFORMASI RKK
├── 00 — Indeks Dokumen RKK
├── 01 — Panduan Struktur Google Drive RKK
├── 02 — Standar Format Google Docs RKK
├── 03 — Standar Format Google Sheets RKK
├── 04 — Standar Penamaan File dan Folder
├── 05 — Standar Versi dan Status Dokumen
└── 06 — Hubungan Google Drive dan GitHub
```

### 2.2 01 — Bisnis Rumahku Konstruksi

```text
01 — BISNIS RUMAHKU KONSTRUKSI
├── 01 — IDENTITAS DAN TATA KELOLA
├── 02 — STRATEGI DAN MODEL BISNIS
├── 03 — LAYANAN DAN PROSES BISNIS
├── 04 — SOP DAN TEMPLATE OPERASIONAL
├── 05 — PROYEK KONSTRUKSI
├── 06 — KEUANGAN PERUSAHAAN
├── 07 — BRAND DAN PEMASARAN
└── 08 — LEGALITAS DAN DOKUMEN RESMI
```

#### 01 — Identitas dan Tata Kelola

```text
01 — IDENTITAS DAN TATA KELOLA
├── 01 — Identitas dan Profil Perusahaan
├── 02 — Visi, Misi, Nilai, dan DNA Perusahaan
├── 03 — Struktur Organisasi
├── 04 — Pembagian Peran dan Tanggung Jawab
├── 05 — Tata Kelola Perusahaan
├── 06 — Data Resmi Perusahaan
└── 07 — Keputusan Manajemen
```

#### 02 — Strategi dan Model Bisnis

```text
02 — STRATEGI DAN MODEL BISNIS
├── 01 — Positioning Perusahaan
├── 02 — Analisis Pasar dan Pelanggan
├── 03 — Model Bisnis
├── 04 — Sumber Pendapatan
├── 05 — Struktur Biaya dan Margin
├── 06 — Manajemen Risiko Bisnis
├── 07 — Strategi Pertumbuhan
├── 08 — Roadmap Perusahaan
└── 09 — Evaluasi Strategis
```

#### 03 — Layanan dan Proses Bisnis

```text
03 — LAYANAN DAN PROSES BISNIS
├── 01 — Daftar Layanan RKK
├── 02 — Konsultasi Awal
├── 03 — Survei Lokasi
├── 04 — Desain dan Gambar Kerja
├── 05 — Penyusunan RAB
├── 06 — Penawaran dan Kontrak
├── 07 — Pelaksanaan Konstruksi
├── 08 — Pengawasan dan Quality Control
├── 09 — Pelaporan Progres
└── 10 — Serah Terima dan Garansi
```

#### 04 — SOP dan Template Operasional

```text
04 — SOP DAN TEMPLATE OPERASIONAL
├── 00 — Master Alur Operasional RKK
├── 01 — SOP Pra-Konstruksi
├── 02 — SOP Survei dan Perencanaan
├── 03 — SOP Desain dan Gambar Kerja
├── 04 — SOP RAB dan Penawaran
├── 05 — SOP Kontrak
├── 06 — SOP Pelaksanaan Lapangan
├── 07 — SOP Pengawasan dan Quality Control
├── 08 — SOP Material dan Pengadaan
├── 09 — SOP Keuangan Proyek
├── 10 — SOP Pelaporan dan Dokumentasi
├── 11 — SOP Serah Terima dan Garansi
├── 12 — SOP Manajemen Risiko
├── 13 — SOP Audit dan Evaluasi
└── 14 — TEMPLATE FORMULIR
```

Template formulir dibuat berdasarkan kebutuhan nyata, bukan diwajibkan ada di setiap bagian.

#### 05 — Proyek Konstruksi

```text
05 — PROYEK KONSTRUKSI
├── 00 — Template Folder Proyek
├── 01 — Prospek dan Pra-Proyek
├── 02 — Proyek Aktif
├── 03 — Proyek Selesai
└── 04 — Proyek Dibatalkan
```

Struktur standar setiap proyek:

```text
RKK-[TAHUN]-[NOMOR] — [NAMA PROYEK] — [NAMA KLIEN]
├── 00 — Ringkasan Proyek
├── 01 — Data Klien dan Lokasi
├── 02 — Konsultasi dan Kebutuhan
├── 03 — Survei Lokasi
├── 04 — Desain dan Gambar Kerja
├── 05 — RAB dan Perubahan Biaya
├── 06 — Penawaran dan Kontrak
├── 07 — Jadwal dan Tahapan Proyek
├── 08 — Laporan Lapangan
├── 09 — Material dan Pengadaan
├── 10 — Keuangan dan Termin
├── 11 — Pengawasan dan Quality Control
├── 12 — Isu dan Perubahan Pekerjaan
├── 13 — Foto dan Dokumentasi
└── 14 — Serah Terima dan Garansi
```

#### 06 — Keuangan Perusahaan

```text
06 — KEUANGAN PERUSAHAAN
├── 01 — Anggaran Perusahaan
├── 02 — Pemasukan
├── 03 — Pengeluaran
├── 04 — Arus Kas
├── 05 — Laporan Bulanan
├── 06 — Laporan Tahunan
├── 07 — Pajak
├── 08 — Gaji dan Operasional
├── 09 — Audit Keuangan
└── 10 — Dokumen Pendukung
```

#### 07 — Brand dan Pemasaran

```text
07 — BRAND DAN PEMASARAN
├── 01 — Logo dan Identitas Visual
├── 02 — Panduan Brand
├── 03 — Company Profile
├── 04 — Proposal Perusahaan
├── 05 — Materi Promosi
├── 06 — Media Sosial
├── 07 — Portofolio Proyek
├── 08 — Konten Website
├── 09 — Database Prospek
└── 10 — Testimoni dan Dokumentasi Publik
```

#### 08 — Legalitas dan Dokumen Resmi

```text
08 — LEGALITAS DAN DOKUMEN RESMI
├── 01 — Dokumen Badan Usaha
├── 02 — Perizinan
├── 03 — Perpajakan
├── 04 — Kontrak Standar
├── 05 — Surat Resmi
├── 06 — Dokumen Kerja Sama
├── 07 — Dokumen Tenaga Ahli
└── 08 — Dokumen Legal Lainnya
```

### 2.3 02 — Produk Digital dan Platform Web RKK

```text
02 — PRODUK DIGITAL DAN PLATFORM WEB RKK
├── 00 — PUSAT INFORMASI PRODUK DIGITAL
├── 01 — VISI PRODUK DAN RUANG LINGKUP
├── 02 — PENGGUNA, PERAN, DAN HAK AKSES
├── 03 — STRUKTUR HALAMAN DAN NAVIGASI
├── 04 — KEBUTUHAN FITUR
├── 05 — ALUR PENGGUNA DAN PROSES SISTEM
├── 06 — KONTEN DAN DATA WEBSITE
├── 07 — UI, UX, DAN IDENTITAS VISUAL
├── 08 — RENCANA PENGEMBANGAN
├── 09 — PENGUJIAN DAN EVALUASI
├── 10 — RILIS DAN PERUBAHAN PRODUK
└── 11 — HUBUNGAN DRIVE DAN GITHUB
```

#### 00 — Pusat Informasi Produk Digital

```text
00 — PUSAT INFORMASI PRODUK DIGITAL
├── 00 — Indeks Produk Digital
├── 01 — Ringkasan Platform RKK
├── 02 — Status Pengembangan
├── 03 — Daftar Dokumen Produk
└── 04 — Tautan Penting GitHub
```

#### 01 — Visi Produk dan Ruang Lingkup

```text
01 — VISI PRODUK DAN RUANG LINGKUP
├── 01 — Tujuan Platform
├── 02 — Masalah yang Diselesaikan
├── 03 — Ruang Lingkup Platform
├── 04 — Batasan Platform
├── 05 — Fitur Inti
├── 06 — Fitur Masa Depan
└── 07 — Roadmap Produk
```

#### 02 — Pengguna, Peran, dan Hak Akses

```text
02 — PENGGUNA, PERAN, DAN HAK AKSES
├── 01 — Pengguna Publik
├── 02 — Konsumen
├── 03 — Arsitek
├── 04 — Mandor
├── 05 — Pengawas
├── 06 — Admin
├── 07 — Superadmin
└── 08 — Matriks Hak Akses
```

#### 03 — Struktur Halaman dan Navigasi

```text
03 — STRUKTUR HALAMAN DAN NAVIGASI
├── 01 — Halaman Publik
├── 02 — Dashboard Konsumen
├── 03 — Dashboard Arsitek
├── 04 — Dashboard Mandor
├── 05 — Dashboard Pengawas
├── 06 — Dashboard Admin
├── 07 — Dashboard Superadmin
└── 08 — Sitemap dan Navigasi
```

#### 04 — Kebutuhan Fitur

```text
04 — KEBUTUHAN FITUR
├── 01 — Sistem Pengguna dan Login
├── 02 — Sistem Permintaan Desain
├── 03 — Sistem Proyek
├── 04 — Sistem Desain
├── 05 — Sistem RAB
├── 06 — Sistem Kontrak
├── 07 — Sistem Progres Proyek
├── 08 — Sistem Jurnal Lapangan
├── 09 — Sistem Permintaan Material
├── 10 — Sistem Pengawasan
├── 11 — Sistem Pembayaran
├── 12 — Sistem Laporan
├── 13 — Sistem Notifikasi
├── 14 — Sistem Audit
└── 15 — Sistem Pengaturan
```

#### 05 — Alur Pengguna dan Proses Sistem

```text
05 — ALUR PENGGUNA DAN PROSES SISTEM
├── 01 — Alur Pengguna Publik
├── 02 — Alur Permintaan Desain
├── 03 — Alur Pembuatan Proyek
├── 04 — Alur Penyusunan RAB
├── 05 — Alur Persetujuan Konsumen
├── 06 — Alur Pelaksanaan Proyek
├── 07 — Alur Laporan Mandor
├── 08 — Alur Verifikasi Pengawas
├── 09 — Alur Permintaan Material
├── 10 — Alur Pembayaran
├── 11 — Alur Serah Terima
└── 12 — Alur Penanganan Masalah
```

#### 06 — Konten dan Data Website

```text
06 — KONTEN DAN DATA WEBSITE
├── 01 — Konten Beranda
├── 02 — Konten Tentang Kami
├── 03 — Konten Layanan
├── 04 — Konten Portofolio
├── 05 — Konten Kontak
├── 06 — FAQ
├── 07 — Pesan Sistem
├── 08 — Istilah Tombol dan Menu
├── 09 — Data Contoh
└── 10 — Data yang Perlu Diverifikasi
```

#### 07 — UI, UX, dan Identitas Visual

```text
07 — UI, UX, DAN IDENTITAS VISUAL
├── 01 — Arah Visual
├── 02 — Warna dan Tipografi
├── 03 — Komponen Tampilan
├── 04 — Wireframe
├── 05 — Referensi Desain
├── 06 — Desain Halaman Publik
├── 07 — Desain Dashboard
├── 08 — Aset Gambar dan Ikon
└── 09 — Evaluasi Tampilan
```

#### 08 — Rencana Pengembangan

```text
08 — RENCANA PENGEMBANGAN
├── 00 — Indeks Plan
├── 01 — Plan Aktif
├── 02 — Plan Selesai
├── 03 — Plan Ditunda
└── 04 — Plan Dibatalkan
```

#### 09 — Pengujian dan Evaluasi

```text
09 — PENGUJIAN DAN EVALUASI
├── 01 — Skenario Pengujian
├── 02 — User Acceptance Test
├── 03 — Daftar Temuan
├── 04 — Screenshot dan Bukti
├── 05 — Masukan Pengguna
├── 06 — Perbaikan yang Diperlukan
└── 07 — Hasil Verifikasi
```

#### 10 — Rilis dan Perubahan Produk

```text
10 — RILIS DAN PERUBAHAN PRODUK
├── 01 — Catatan Versi
├── 02 — Fitur Baru
├── 03 — Perubahan Fitur
├── 04 — Perbaikan Masalah
├── 05 — Fitur yang Ditunda
└── 06 — Riwayat Rilis
```

#### 11 — Hubungan Drive dan GitHub

```text
11 — HUBUNGAN DRIVE DAN GITHUB
├── 01 — Peta Dokumen dan Kode
├── 02 — Daftar Tautan GitHub
├── 03 — Aturan Sinkronisasi
├── 04 — Status Implementasi Fitur
└── 05 — Catatan Perbedaan Drive dan GitHub
```

## 3. Ruang Lingkup GitHub

GitHub digunakan untuk implementasi teknis platform, bukan sebagai tempat utama dokumen bisnis perusahaan.

```text
RKK-RumahKuKontruksi
├── client
├── server
├── database atau prisma
├── docs
├── tests
├── scripts
├── README.md
└── FITUR.md
```

### 3.1 Client / Frontend

Client adalah bagian yang dilihat dan digunakan pengguna.

```text
client
├── public
└── src
    ├── assets
    ├── components
    ├── pages
    ├── layouts
    ├── routes
    ├── services
    ├── hooks
    ├── context
    ├── utils
    ├── constants
    └── styles
```

### 3.2 Server / Backend

Server memproses aturan, permintaan, validasi, otorisasi, dan komunikasi dengan database.

```text
server
└── src
    ├── routes
    ├── controllers
    ├── services
    ├── middleware
    ├── validators
    ├── repositories
    ├── utils
    ├── config
    ├── constants
    └── jobs
```

### 3.3 Database

Database menyimpan data aplikasi secara terstruktur.

```text
database atau server/prisma
├── schema
├── migrations
├── seed
└── documentation
```

### 3.4 Dokumentasi Teknis

```text
docs
├── project
├── frontend
├── backend
├── database
├── authentication
├── api
├── testing
├── deployment
├── security
└── history
```

Dokumentasi GitHub harus berfokus pada arsitektur, status implementasi, cara menjalankan aplikasi, integrasi, pengujian, deployment, dan riwayat teknis.

## 4. Batas Sumber Informasi

| Jenis informasi | Sumber utama |
|---|---|
| Identitas, strategi, SOP, proyek, keuangan, brand, legalitas | Google Drive — Bisnis |
| Tujuan produk, pengguna, halaman, kebutuhan fitur, alur, konten, UX, UAT | Google Drive — Produk Digital |
| Source code, API, database schema, authentication, testing, deployment | GitHub |
| Status teknis dan riwayat implementasi | GitHub |
| Status persetujuan bisnis dan produk | Google Drive |

## 5. Aturan Dasar

1. Satu informasi memiliki satu sumber utama.
2. Dokumen bisnis tidak disalin penuh ke GitHub.
3. Dokumentasi teknis tidak disalin penuh ke Google Drive.
4. Google Drive boleh menyimpan tautan menuju file atau bagian GitHub.
5. GitHub boleh menyimpan tautan menuju dokumen kebutuhan di Google Drive.
6. Google Sheets hanya dibuat untuk data berbentuk tabel, perhitungan, rekap, atau database kerja.
7. Google Docs digunakan untuk profil, kebijakan, SOP, penjelasan, keputusan, dan rencana.
8. Folder turunan dibuat berdasarkan kebutuhan nyata; struktur tidak harus diisi sekaligus.
9. Dokumen aktif tidak ditempatkan di folder arsip.
10. Ejaan merek yang digunakan dalam dokumen adalah **Rumahku Konstruksi**.

## 6. Urutan Implementasi

Penataan dilakukan bertahap:

1. Menetapkan dokumen master struktur ruang kerja.
2. Membuat empat folder utama Google Drive.
3. Membuat folder tingkat pertama untuk Bisnis dan Produk Digital.
4. Menginventarisasi isi arsip dan GitHub.
5. Memetakan setiap dokumen lama ke tujuan baru.
6. Memisahkan fakta, rumusan kerja, konflik, dan keputusan yang belum ditetapkan.
7. Memindahkan atau menyusun ulang dokumen secara bertahap.
8. Membuat folder turunan hanya ketika akan digunakan.
9. Menyusun indeks dokumen dan tautan silang Drive–GitHub.
10. Melakukan pemeriksaan akhir terhadap duplikasi dan sumber kebenaran.

## 7. Prinsip Pelaksanaan

Struktur ini adalah peta tujuan, bukan perintah untuk membuat seluruh folder kosong sekaligus. Penataan harus dimulai dari folder utama dan bagian yang sedang dikerjakan agar Drive tetap ringkas, mudah dipahami, dan tidak dipenuhi folder tanpa isi.
