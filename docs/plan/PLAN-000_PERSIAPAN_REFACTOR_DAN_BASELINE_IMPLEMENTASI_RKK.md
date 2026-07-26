# PLAN-000 — Persiapan Refactor dan Baseline Implementasi RKK

**Status:** DISETUJUI PEMILIK — Siap dieksekusi setelah pemeriksaan awal dinyatakan lulus  
**Tanggal persetujuan:** 27 Juli 2026  
**Pelaksana:** Gemini Antigravity  
**Repository:** `syahputrawork98-sketch/RKK-RumahKuKontruksi`  
**Branch eksekusi:** `main`  
**Base SHA:** `42e97c3313cdd2888025db4e2aa8e3cc01d18e8b`  
**Commit dan push:** dilakukan oleh pemilik, bukan Gemini Antigravity

---

## 1. Kedudukan Plan

PLAN-000 adalah pekerjaan persiapan teknis pertama sebelum implementasi website publik RKK dimulai.

Plan ini mempunyai dua pekerjaan besar:

1. memindahkan dokumentasi lama yang saat ini masih aktif di GitHub ke **Archive Hub di GitHub**; dan
2. membuat fondasi aplikasi web baru pada `apps/web`.

Archive Hub yang dimaksud berada di repository GitHub, yaitu struktur `archive/`. Plan ini tidak memindahkan, mengubah, mengarsipkan, atau menghapus dokumen apa pun di Google Drive.

PLAN-000 belum mengerjakan shell website publik, navigasi final, komponen UI final, ataupun halaman publik. Pekerjaan tersebut baru dimulai pada PLAN-001 setelah PLAN-000 selesai dan diperiksa.

---

## 2. Tujuan

PLAN-000 bertujuan:

- memisahkan dokumentasi GitHub lama dari dokumentasi teknis aktif;
- mencegah dokumentasi lama tetap terbaca sebagai keputusan yang berlaku;
- menyediakan satu Archive Hub GitHub yang jelas dan dapat ditelusuri;
- menyiapkan struktur dokumentasi plan yang baru;
- membuat scaffold `apps/web` yang bersih dan dapat dijalankan;
- mencatat baseline repository sebelum refactor substantif dimulai;
- memastikan PLAN-001 dapat langsung mengerjakan fondasi dan shell website publik tanpa mengulang pekerjaan persiapan repository.

---

## 3. Prinsip yang Mengikat

1. Google Drive adalah sumber keputusan resmi RKK.
2. GitHub adalah sumber kondisi implementasi aktual.
3. Untuk pekerjaan implementasi, keputusan R01 dan R02 yang relevan harus dibaca dan digunakan bersama:
   - R01 menetapkan kebenaran bisnis;
   - R02 menetapkan bentuk dan perilaku produk;
   - R03 menerjemahkannya menjadi rencana dan kendali teknis.
4. Arsip GitHub hanya berfungsi sebagai riwayat dan bahan pembanding. Arsip tidak menjadi sumber keputusan bisnis, produk, atau teknis aktif.
5. Kode dan dokumentasi lama tidak boleh dipindahkan ke struktur baru tanpa pemeriksaan.
6. Pola migrasi yang berlaku adalah:

   > buat pengganti → pindahkan bagian yang masih valid → uji → alihkan referensi → hapus versi lama.

7. Dalam PLAN-000, penghapusan hanya berlaku pada lokasi aktif dokumentasi lama setelah file tersebut berhasil dipindahkan ke Archive Hub dan seluruh rujukannya dialihkan.
8. `client/` dan `server/` tetap dipertahankan sebagai baseline. Keduanya tidak dipindahkan ke arsip dan tidak dihapus dalam plan ini.
9. Gemini Antigravity tidak boleh membuat keputusan bisnis atau produk baru.
10. Gemini Antigravity tidak melakukan commit, push, merge, deployment, atau perubahan di Google Drive.

---

## 4. Sumber Kerja

Gemini Antigravity menggunakan:

- file PLAN-000 versi final yang diberikan oleh pemilik;
- source code dan dokumentasi aktual di repository;
- keputusan arsitektur dan batas pekerjaan yang sudah dirangkum di dalam plan final;
- file kerja tambahan yang secara eksplisit disertakan bersama plan, apabila ada.

Gemini Antigravity tidak diminta mencari atau menafsirkan dokumen Google Drive secara mandiri. Jika ditemukan kebutuhan keputusan yang belum tersedia di dalam plan atau repository, pekerjaan pada bagian tersebut dihentikan dan dilaporkan.

---

## 5. Pemeriksaan Awal Wajib

Sebelum mengubah file:

1. pastikan repository yang dibuka adalah `syahputrawork98-sketch/RKK-RumahKuKontruksi`;
2. jalankan dan catat:
   - branch aktif;
   - `HEAD` aktual;
   - status working tree;
   - struktur folder tingkat atas;
   - package manager dan lockfile yang aktif;
   - perintah build, lint, dan test yang tersedia;
3. bandingkan `HEAD` dengan baseline yang dikunci pada plan final;
4. pastikan working tree bersih;
5. inventarisasi seluruh file dokumentasi lama dan seluruh referensi yang mengarah kepadanya;
6. inventarisasi konfigurasi frontend lama yang relevan untuk menentukan scaffold kompatibel, tanpa menyalin struktur lama secara otomatis.

### Gerbang berhenti

Gemini Antigravity wajib berhenti dan melaporkan kepada pemilik apabila:

- repository atau branch tidak sesuai;
- `HEAD` berbeda dari base SHA pada plan final;
- working tree tidak bersih;
- terdapat perubahan lokal yang bukan bagian dari PLAN-000;
- target Archive Hub bertabrakan dengan struktur yang sudah ada;
- package manager atau arsitektur aktual tidak dapat ditentukan secara aman;
- pemindahan dokumentasi berpotensi memutus referensi yang belum dapat dialihkan;
- pengerjaan memerlukan keputusan bisnis, produk, atau arsitektur baru.

---

## 6. TASK-000A — Memindahkan Dokumentasi Lama ke Archive Hub GitHub

### 6.1 Tujuan

Memisahkan dokumentasi lama dari dokumentasi aktif tanpa menghilangkan riwayat dan tanpa menjadikan arsip sebagai sumber keputusan baru.

### 6.2 Struktur target

Struktur minimum yang disiapkan:

```text
archive/
├── README.md
└── docs-legacy/

docs/
└── plan/
    └── README.md
```

File PLAN-000 final ditempatkan di:

```text
docs/plan/PLAN-000_PERSIAPAN_REFACTOR_DAN_BASELINE_IMPLEMENTASI_RKK.md
```

### 6.3 Langkah kerja

1. Buat daftar seluruh dokumentasi GitHub lama yang masih berada di lokasi aktif.
2. Klasifikasikan setiap file menjadi:
   - dokumentasi legacy yang dipindahkan ke `archive/docs-legacy/`;
   - dokumentasi yang masih diperlukan sebagai dokumentasi teknis aktif;
   - dokumentasi duplikat atau tidak relevan yang memerlukan keputusan pemilik sebelum tindakan lebih lanjut.
3. Pindahkan dokumentasi legacy dengan mekanisme yang menjaga keterlacakan riwayat Git.
4. Jangan memindahkan seluruh `docs/` secara buta. Pastikan setiap file telah diklasifikasikan.
5. Buat `archive/README.md` yang menjelaskan:
   - fungsi Archive Hub;
   - bahwa isinya merupakan dokumentasi historis;
   - bahwa arsip bukan sumber keputusan aktif;
   - bahwa keputusan resmi berada di Drive dan implementasi aktual berada di source code GitHub.
6. Buat `docs/plan/README.md` sebagai indeks plan aktif yang sekurang-kurangnya mencatat:
   - nomor dan judul plan;
   - status plan;
   - ruang lingkup ringkas;
   - base SHA;
   - hasil eksekusi atau tautan ke catatan hasil setelah tersedia.
7. Cari dan alihkan seluruh tautan atau rujukan internal yang masih menunjuk ke lokasi lama.
8. Pastikan tidak ada tautan aktif yang rusak akibat pemindahan.
9. Jangan mengubah dokumen di Drive.

### 6.4 Hasil minimum

- `archive/README.md` tersedia;
- `archive/docs-legacy/` tersedia;
- dokumentasi legacy yang telah terverifikasi berada di Archive Hub;
- `docs/plan/README.md` tersedia;
- PLAN-000 final tercatat di indeks plan;
- rujukan internal telah diselaraskan;
- lokasi aktif lama sudah bersih untuk file yang telah berhasil dipindahkan;
- tidak ada file bisnis atau produk baru yang dibuat berdasarkan dokumentasi legacy.

---

## 7. TASK-000B — Membuat Fondasi `apps/web`

### 7.1 Tujuan

Membuat aplikasi web baru yang bersih, minimal, kompatibel dengan arsitektur target, dan dapat digunakan sebagai fondasi PLAN-001.

### 7.2 Batas scaffold

Scaffold minimum harus:

- berada di `apps/web`;
- memakai package manager dan pola konfigurasi yang dikunci setelah pemeriksaan repository;
- dapat dijalankan dalam mode pengembangan;
- dapat menghasilkan build produksi;
- mempunyai lint dasar apabila lint menjadi standar repository;
- menampilkan halaman placeholder netral yang hanya membuktikan aplikasi berjalan;
- tidak menggunakan fakta bisnis, klaim layanan, kontak, harga, proyek, atau konten publik yang belum disahkan;
- belum mengimplementasikan design system P07 secara final;
- belum memigrasikan halaman lama;
- belum terhubung ke backend produksi.

### 7.3 Langkah kerja

1. Periksa stack, package manager, lockfile, dan konfigurasi frontend aktual.
2. Gunakan keputusan arsitektur yang sudah dikunci dalam versi final plan; jangan menentukan framework baru di luar plan.
3. Buat struktur minimum `apps/web`.
4. Tambahkan atau sesuaikan konfigurasi workspace tingkat root hanya jika diperlukan agar `apps/web` dapat dipasang, dijalankan, di-lint, dan di-build.
5. Buat entry point dan placeholder minimum.
6. Pastikan tidak ada import langsung dari `apps/web` ke source internal `server/`.
7. Jangan menyalin seluruh `client/` ke `apps/web`.
8. Jangan memindahkan komponen, route, aset, mock data, autentikasi demo, atau halaman lama pada plan ini.
9. Jangan menghapus atau mengarsipkan `client/` maupun `server/`.
10. Catat konfigurasi yang dibuat dan alasan teknisnya dalam laporan hasil.

### 7.4 Hasil minimum

- folder `apps/web` tersedia;
- dependensi dapat dipasang dengan package manager repository;
- aplikasi dapat dijalankan;
- build produksi berhasil;
- lint dasar berhasil atau tidak menambah error baru dari baseline yang telah dicatat;
- placeholder tidak memuat klaim atau fitur publik yang belum disahkan;
- `client/` dan `server/` tetap tersedia dan tidak berubah secara substantif;
- belum ada shell, navigasi final, komponen UI final, atau halaman publik.

---

## 8. File dan Area yang Boleh Diubah

Area yang boleh dibuat atau diubah hanya jika diperlukan oleh PLAN-000:

```text
archive/
docs/plan/
apps/web/
```

File konfigurasi root yang berkaitan langsung dengan workspace, dependency, build, lint, atau ignore boleh diubah secara minimum setelah diinventarisasi, misalnya:

```text
package.json
lockfile package manager yang aktif
konfigurasi workspace
konfigurasi lint/format yang digunakan bersama
.gitignore
README.md tingkat root
```

Perubahan di luar daftar tersebut harus dihentikan dan dilaporkan, kecuali versi final PLAN-000 secara eksplisit menambahkannya.

---

## 9. File dan Area yang Dilindungi

Dalam PLAN-000, Gemini Antigravity tidak boleh:

- menghapus, memindahkan, atau mengarsipkan `client/`;
- menghapus, memindahkan, atau mengarsipkan `server/`;
- mengubah logika bisnis atau API lama;
- membuat `apps/backend`;
- membuat package bersama yang belum diputuskan;
- memigrasikan halaman publik lama;
- mengaktifkan formulir, autentikasi, portal, database, atau integrasi eksternal;
- memasukkan konten bisnis dari mock, seed, README lama, atau arsip;
- mengubah Google Drive;
- menghapus riwayat atau melakukan operasi Git destruktif;
- melakukan commit, push, merge, atau deployment.

---

## 10. Validasi Wajib

Setelah pekerjaan selesai, jalankan dan catat:

1. `git status --short`;
2. daftar file yang dibuat, dipindahkan, diubah, dan dihapus dari lokasi aktif;
3. pemeriksaan seluruh referensi dokumentasi lama;
4. pemeriksaan bahwa `client/` dan `server/` masih tersedia;
5. instalasi dependensi sesuai package manager;
6. perintah menjalankan `apps/web`;
7. build produksi `apps/web`;
8. lint yang relevan;
9. test yang tersedia dan relevan;
10. pemeriksaan bahwa `apps/web` tidak mengimpor source internal `server/`;
11. pemeriksaan bahwa tidak ada konten atau fitur PLAN-001 yang masuk lebih awal.

Jika repository mempunyai error lama, laporan wajib memisahkan:

- error baseline yang sudah ada sebelum PLAN-000;
- error baru akibat PLAN-000.

PLAN-000 tidak boleh dianggap selesai apabila menambah error baru.

---

## 11. Laporan Hasil Gemini Antigravity

Setelah eksekusi, Gemini Antigravity memberikan laporan ringkas dengan format:

### A. Baseline

- repository;
- branch;
- base SHA;
- kondisi working tree sebelum perubahan;
- package manager;
- hasil build/lint/test sebelum perubahan.

### B. Perubahan

- file dibuat;
- file dipindahkan;
- file diubah;
- file dihapus dari lokasi aktif;
- file yang sengaja dipertahankan;
- keputusan teknis minimum yang diambil dalam batas plan.

### C. Validasi

- perintah yang dijalankan;
- hasil setiap perintah;
- error baseline;
- error baru;
- pemeriksaan tautan dokumentasi;
- pemeriksaan `apps/web`.

### D. Batas dan Temuan

- bagian yang belum dikerjakan;
- blocker;
- ketidaksesuaian repository;
- kebutuhan keputusan pemilik;
- rekomendasi awal untuk PLAN-001 tanpa mengerjakannya.

Gemini Antigravity berhenti setelah laporan. Jangan melakukan commit atau push.

---

## 12. Acceptance Criteria PLAN-000

PLAN-000 dinyatakan berhasil hanya apabila seluruh kondisi berikut terpenuhi:

- [x] repository, branch, dan base SHA telah diverifikasi sebelum perubahan;
- [x] working tree awal bersih;
- [x] dokumentasi legacy telah diklasifikasikan, bukan dipindahkan secara buta;
- [x] dokumentasi legacy terverifikasi telah dipindahkan ke Archive Hub GitHub;
- [x] `archive/README.md` tersedia dan menjelaskan kedudukan arsip;
- [x] `docs/plan/README.md` tersedia;
- [x] PLAN-000 final tercatat sebagai plan aktif;
- [x] seluruh rujukan ke lokasi dokumentasi lama telah diperiksa dan dialihkan;
- [x] arsip Google Drive tidak disentuh;
- [x] `apps/web` tersedia sebagai scaffold minimum;
- [x] `apps/web` dapat dijalankan;
- [x] build produksi `apps/web` berhasil;
- [x] lint/test yang relevan tidak menunjukkan error baru;
- [x] tidak ada import langsung dari `apps/web` ke source internal `server/`;
- [x] `client/` dan `server/` tetap tersedia;
- [x] belum ada migrasi halaman, shell publik, UI final, backend, formulir, autentikasi, atau deployment;
- [x] laporan hasil eksekusi telah diberikan;
- [x] Gemini Antigravity tidak melakukan commit atau push.

---

## 13. Definition of Done

PLAN-000 selesai ketika repository memiliki:

1. Archive Hub GitHub yang jelas untuk dokumentasi legacy;
2. struktur dokumentasi plan aktif;
3. scaffold `apps/web` yang dapat dijalankan dan di-build;
4. baseline serta laporan validasi yang dapat digunakan untuk audit;
5. tidak ada perubahan di luar scope;
6. kondisi yang cukup untuk menyusun dan menjalankan PLAN-001.

Setelah hasil diperiksa dan disetujui pemilik:

1. pemilik melakukan commit dan push;
2. SHA hasil commit dicatat dan diverifikasi;
3. R03 dan kontrol konteks aktif diperbarui;
4. PLAN-001 disusun berdasarkan SHA baru serta keputusan R01 dan R02/P07 yang sudah siap.

---

## 14. Batas PLAN-001

PLAN-001 direncanakan untuk:

> **Fondasi dan shell website publik RKK pada `apps/web`.**

PLAN-001 baru boleh mengerjakan bagian seperti:

- shell aplikasi;
- layout dasar;
- routing publik;
- header;
- navigasi;
- footer;
- design token yang sudah disetujui dari P07;
- komponen dasar;
- struktur awal halaman publik yang sumber R01 dan R02-nya telah siap.

Bagian tersebut tidak boleh dikerjakan dalam PLAN-000.

---

## 15. Parameter Eksekusi yang Dikunci

Parameter berikut telah dikunci untuk pelaksanaan PLAN-000:

1. repository: `syahputrawork98-sketch/RKK-RumahKuKontruksi`;
2. branch: `main`;
3. base SHA: `42e97c3313cdd2888025db4e2aa8e3cc01d18e8b`;
4. cakupan kandidat dokumentasi legacy: seluruh isi lama di bawah `docs/`, termasuk `docs/_legacy/`, `docs/backend/`, `docs/database/`, `docs/frontend/`, dan `docs/project/`;
5. target Archive Hub: `archive/docs-legacy/`;
6. lokasi plan aktif: `docs/plan/`;
7. nama file plan:

   ```text
   docs/plan/PLAN-000_PERSIAPAN_REFACTOR_DAN_BASELINE_IMPLEMENTASI_RKK.md
   ```

8. stack `apps/web`: React, Vite, dan JavaScript;
9. package manager: npm, mengikuti lockfile yang tersedia;
10. validasi minimum aplikasi baru: instalasi dependensi, mode development, build produksi, dan lint;
11. `client/` dan `server/` tetap dipertahankan serta tidak dihapus, dipindahkan, atau diarsipkan dalam PLAN-000.

Daftar kandidat pada butir 4 tetap wajib diklasifikasikan sebelum dipindahkan. Jika terdapat dokumen yang masih dibutuhkan sebagai dokumentasi teknis aktif, dokumen tersebut tidak boleh dipindahkan secara otomatis. Temuan itu harus dilaporkan sesuai gerbang berhenti dan batas PLAN-000.

Sebelum perubahan dilakukan, Gemini Antigravity wajib memverifikasi ulang branch, `HEAD`, dan working tree. Perbedaan terhadap parameter di atas membatalkan eksekusi otomatis dan harus dilaporkan kepada pemilik.

---

## Persetujuan Pemilik

Dokumen PLAN-000 telah dibaca dan disetujui oleh pemilik pada 27 Juli 2026.

- [x] Dua task utama PLAN-000 disetujui.
- [x] Archive Hub yang dimaksud adalah Archive Hub di GitHub, bukan arsip Google Drive.
- [x] Pemindahan dokumentasi legacy dilakukan selektif dan tetap menjaga keterlacakan.
- [x] Scaffold minimum `apps/web` disetujui.
- [x] `client/` dan `server/` dilindungi dalam PLAN-000.
- [x] Shell dan halaman publik tetap menjadi ruang lingkup PLAN-001.
- [x] Gemini Antigravity tidak melakukan commit atau push.

---

## 16. Hasil Penutupan PLAN-000

Audit akhir penutupan PLAN-000 telah dilaksanakan dengan hasil sebagai berikut:

- Referensi dokumentasi usang yang masih merujuk ke folder `docs/` telah diperbaiki dan dialihkan secara tepat ke `archive/docs-legacy/` (termasuk referensi di dalam file `README.md`, `FITUR.md`, dan komponen legacy seperti `SuperadminHoldStatePage.jsx`).
- `README.md` dan `FITUR.md` root repositori telah diselaraskan penuh untuk mencerminkan status masa transisi arsitektur, dan tidak mengklaim fitur sistem legacy sebagai kondisi aktif.
- Validasi terhadap scaffold `apps/web` (build produksi, lint, dan development server) telah berhasil tanpa error baru setelah dependensi diinstal secara normal.
- Pemeriksaan git status dan diff membuktikan tidak ada intervensi yang keluar dari batasan PLAN-000.
- Semua persyaratan untuk menyelesaikan fase transisi struktural dan administratif PLAN-000 telah terpenuhi secara utuh.

**Status:** SELESAI DAN TERVERIFIKASI

*Catatan Audit: Audit substansi dan validasi PLAN-000 diterima berdasarkan SHA `e031dc50801f67901fa181e99fae8dbefe461599`.*
