# PLAN-002 — Fondasi Backend RKK

**Status**: DIEKSEKUSI — PERLU REVISI
**Author**: Syahputrawork98
**Tanggal disetujui:** 27 Juli 2026
**Pelaksana saat dieksekusi:** Gemini Antigravity
**Repository:** `syahputrawork98-sketch/RKK-RumahKuKontruksi`
**Model repository:** npm monorepo
**Branch sasaran:** `refactor/plan-002-backend-foundation` — disetujui; diverifikasi sebelum eksekusi
**Base SHA:** `6a011bb98150d3492b7d24999a4eb72ba3eec174`
**Catatan Implementasi:** Gemini hanya mengimplementasikan dan memvalidasi. Commit dan push dilakukan pemilik setelah hasil diperiksa. Pull Request hanya dibuat setelah audit SHA dinyatakan diterima. PLAN-002 belum dinyatakan selesai atau diterima.

---

## 1. Kedudukan Plan

PLAN-002 membangun fondasi backend baru Rumahku Konstruksi pada:

```text
apps/backend
```

Backend baru menggunakan:

- NestJS;
- TypeScript;
- platform HTTP Express bawaan NestJS;
- REST API;
- OpenAPI/Swagger;
- Prisma ORM;
- PostgreSQL dengan target layanan Neon;
- target deployment Railway;
- npm workspace di repository RKK yang sama;
- pola modular monolith;
- tanpa Docker.

PLAN-002 hanya menyiapkan fondasi teknis. Plan ini belum membangun modul bisnis, belum mengaktifkan integrasi produksi, dan belum melakukan deployment.

Folder lama `server/` tetap dipertahankan sebagai baseline. PLAN-002 tidak memindahkan, menghapus, menyalin utuh, atau menggantikan `server/`.

---

## 2. Status Eksekusi dan Prasyarat

PLAN-002 telah disetujui dan diizinkan dieksekusi tanpa menunggu selesainya PLAN-001 berdasarkan keputusan pemilik. Kebutuhan Base SHA diisi secara manual menggunakan SHA aktual pada waktu keputusan diambil.

PLAN-002 difinalkan dan dijalankan dengan prasyarat:

1. PLAN-000 telah ditutup dan dinyatakan terverifikasi;
2. hasil pekerjaan PLAN-001 telah selesai, diperiksa, dan mempunyai checkpoint Git yang jelas;
3. koreksi metadata plan, indeks plan, root workspace, dan dokumentasi aktif yang masih tertinggal telah diselesaikan;
4. branch sasaran PLAN-002 telah ditetapkan;
5. base SHA PLAN-002 telah diisi dengan SHA checkpoint final setelah PLAN-001;
6. working tree bersih;
7. tidak ada pekerjaan paralel lain yang mengubah:
   - `package.json`;
   - `package-lock.json`;
   - `.gitignore`;
   - konfigurasi workspace;
   - `docs/plan/`;
8. versi Node.js dan npm aktif telah diperiksa;
9. pemilik telah membaca dan menyetujui versi final PLAN-002.

*(Catatan: Prasyarat nomor 1, 2, dan 5 telah dianulir secara eksplisit oleh pemilik saat sesi eksekusi, sehingga Gemini Antigravity berhak menjalankan PLAN-002 secara langsung dari Base SHA 6a011bb98150d3492b7d24999a4eb72ba3eec174).*

SHA `6a011bb98150d3492b7d24999a4eb72ba3eec174` digunakan sebagai base SHA eksekusi PLAN-002.

### Gerbang berhenti sebelum eksekusi

Gemini Antigravity wajib berhenti tanpa membuat perubahan apabila:

- repository atau branch berbeda dari parameter final;
- working tree tidak bersih;
- ada perubahan lokal yang tidak termasuk PLAN-002;
- root workspace sedang diubah oleh pekerjaan lain;
- `apps/backend` telah tersedia dengan isi yang tidak tercakup dalam baseline final;
- versi Node.js tidak memenuhi kebutuhan NestJS yang dipilih;
- konfigurasi npm workspace tidak dapat ditentukan secara aman;
- implementasi memerlukan keputusan bisnis, produk, skema data, autentikasi, atau deployment yang belum tersedia;
- diperlukan kredensial Neon, Railway, Vercel, atau layanan lain untuk menyelesaikan fondasi;
- pekerjaan hanya dapat diselesaikan dengan mengubah area yang dilindungi.

Temuan tersebut dilaporkan kepada pemilik. Jangan mencoba mengatasi blocker dengan mengubah scope atau membuat keputusan baru.

---

## 3. Sumber Keputusan

### 3.1 Google Drive RKK

1. `[T00-F00] — PANDUAN ROOM 3 TEKNIS DAN GITHUB RKK.md`
2. `[T00-F01] — STATUS DAN PETA KERJA TEKNIS RKK.md`
3. `[T00-F02] — INDEKS FILE ROOM 3 TEKNIS DAN GITHUB RKK.csv`
4. `[T00-F03] — TATA KERJA REFACTOR DAN IMPLEMENTASI TEKNIS RKK.md`
5. `[T01-F00] — AUDIT BASELINE DAN KEPUTUSAN ARSITEKTUR AWAL RKK.md`
6. `[P01-F01] — VISI PRINSIP DAN BATAS PRODUK DIGITAL RKK.md`
7. dokumen PLAN-000 dan PLAN-001 yang telah disetujui dan diaudit.

### 3.2 GitHub RKK

Repository:

```text
syahputrawork98-sketch/RKK-RumahKuKontruksi
```

GitHub digunakan sebagai sumber kondisi teknis aktual:

- struktur monorepo;
- workspace npm;
- aplikasi `apps/web`;
- source code legacy `client/` dan `server/`;
- konfigurasi root;
- dokumentasi teknis aktif;
- plan yang tersimpan di `docs/plan/`;
- branch dan SHA aktual;
- build, lint, test, dan status working tree.

### 3.3 Dokumentasi teknis resmi

Jika versi atau pola konfigurasi teknis perlu diverifikasi saat eksekusi, gunakan hanya dokumentasi resmi:

- NestJS: <https://docs.nestjs.com/>
- NestJS OpenAPI: <https://docs.nestjs.com/openapi/introduction>
- NestJS Configuration: <https://docs.nestjs.com/techniques/configuration>
- Prisma untuk NestJS: <https://www.prisma.io/docs/guides/frameworks/nestjs>
- Prisma PostgreSQL: <https://www.prisma.io/docs/prisma-orm/quickstart/postgresql>
- Neon connection pooling: <https://neon.com/docs/connect/connection-pooling>
- Railway NestJS: <https://railway.com/docs/guides/nest>
- Railway healthchecks: <https://railway.com/docs/deployments/healthchecks>

Dokumentasi internet hanya digunakan untuk memastikan kompatibilitas teknis. Internet tidak menjadi sumber keputusan bisnis atau produk RKK.

---

## 4. Latar Belakang

Keputusan arsitektur awal R03 menetapkan:

| Lapisan | Keputusan |
|---|---|
| Frontend baru | React + Vite + JavaScript |
| Lokasi frontend | `apps/web` |
| Backend baru | NestJS + TypeScript |
| Lokasi backend | `apps/backend` |
| Bentuk backend | Modular monolith |
| API | REST |
| Dokumentasi API | OpenAPI/Swagger |
| ORM | Prisma |
| Database | PostgreSQL di Neon |
| Deployment backend | Railway |
| Repository | npm monorepo |
| Docker | Tidak digunakan |
| Backend lama | `server/` dipertahankan sementara |

Frontend baru tidak boleh mengakses database secara langsung. Pada tahap berikutnya, akses data, validasi server, otorisasi, dan proses bisnis harus melewati backend.

PLAN-002 belum membuat proses bisnis tersebut. Fondasi disiapkan agar modul berikutnya dapat ditambahkan secara terstruktur setelah keputusan bisnis, produk, data, dan akses telah disetujui.

---

## 5. Tujuan

PLAN-002 bertujuan:

1. membuat aplikasi NestJS + TypeScript yang bersih pada `apps/backend`;
2. mengintegrasikan backend ke npm workspace yang sudah digunakan repository;
3. menetapkan struktur dasar modular monolith;
4. menyiapkan konfigurasi environment tanpa menyimpan rahasia;
5. menetapkan prefix REST API `/api/v1`;
6. menyediakan endpoint kesehatan `GET /api/v1/health`;
7. menyediakan dokumentasi OpenAPI/Swagger pada `/api/docs`;
8. menyiapkan Prisma untuk PostgreSQL tanpa membuat model bisnis atau migration produksi;
9. menyiapkan CORS berbasis allowlist environment;
10. menyiapkan validasi request global;
11. memastikan backend membaca `PORT` dari environment dan kompatibel dengan Railway;
12. menyediakan build, lint, unit test, dan end-to-end test dasar;
13. menyediakan dokumentasi development lokal;
14. membuktikan fondasi dapat dijalankan tanpa koneksi ke layanan eksternal;
15. menjaga `apps/web`, `client/`, dan `server/` dari perubahan di luar kebutuhan minimum.

---

## 6. Keputusan Teknis yang Mengikat

1. Backend berada di `apps/backend`.
2. Backend menggunakan NestJS dengan TypeScript strict.
3. Platform HTTP menggunakan Express bawaan NestJS.
4. Backend menggunakan pola modular monolith, bukan microservices.
5. API menggunakan REST, bukan GraphQL.
6. Prefix API adalah:

   ```text
   /api/v1
   ```

7. Endpoint liveness awal adalah:

   ```text
   GET /api/v1/health
   ```

8. Swagger UI berada di:

   ```text
   /api/docs
   ```

9. Database target adalah PostgreSQL di Neon.
10. ORM adalah Prisma.
11. Prisma ditempatkan di:

    ```text
    apps/backend/prisma
    ```

12. PLAN-002 belum membuat model data bisnis.
13. PLAN-002 belum membuat atau menjalankan migration database produksi.
14. Backend harus dapat boot dan endpoint health harus lulus tanpa koneksi database eksternal.
15. Prisma tidak melakukan query database saat proses boot hanya untuk membuktikan fondasi berjalan.
16. `DATABASE_URL` tidak boleh ditanam dalam source code.
17. File `.env` tidak boleh di-commit.
18. Hanya `.env.example` tanpa kredensial nyata yang boleh disimpan.
19. CORS tidak menggunakan wildcard untuk konfigurasi produksi.
20. Backend membaca port dari `process.env.PORT` dengan fallback lokal `3001`.
21. Server mendengarkan host `0.0.0.0` agar kompatibel dengan runtime Railway.
22. Tidak menggunakan Docker.
23. Tidak membuat package bersama baru.
24. Tidak mengimpor source internal dari `server/`.
25. Tidak menyalin struktur atau logika lama secara otomatis.
26. Versi dependensi harus kompatibel satu sama lain, dikunci dalam `package-lock.json`, dan dicatat dalam laporan.
27. Jika pola konfigurasi Prisma berbeda karena major version yang aktif, gunakan pola resmi untuk versi yang dipasang; jangan mencampur pola dari major version berbeda.

---

## 7. Ruang Lingkup

PLAN-002 mencakup:

- scaffold NestJS + TypeScript;
- struktur module dasar;
- konfigurasi application bootstrap;
- konfigurasi environment;
- CORS allowlist;
- `ValidationPipe` global;
- security header dasar menggunakan `helmet`;
- API prefix;
- Swagger/OpenAPI;
- health module;
- Prisma schema minimum tanpa model bisnis;
- Prisma service dan database module minimum;
- scripts workspace;
- unit test dan end-to-end test fondasi;
- dokumentasi lokal;
- penyesuaian minimum root workspace;
- pembaruan indeks plan;
- dokumentasi teknis fondasi backend.

---

## 8. Di Luar Ruang Lingkup

PLAN-002 tidak mencakup:

- autentikasi;
- otorisasi;
- role;
- permission;
- pengguna;
- calon pelanggan atau lead;
- pelanggan;
- proyek;
- layanan;
- kontak atau formulir publik aktif;
- dokumen;
- upload file;
- media storage;
- pembayaran;
- invoice;
- notifikasi;
- WhatsApp;
- email;
- audit log bisnis;
- dashboard;
- portal konsumen;
- portal tim;
- panel administrasi;
- tabel atau enum bisnis;
- seed data;
- mock data bisnis;
- migration database produksi;
- pembuatan project Neon;
- pengisian kredensial Neon;
- pembuatan project Railway;
- konfigurasi domain;
- deployment;
- CI/CD;
- monitoring produksi;
- logging eksternal;
- rate limiting produksi;
- caching;
- queue;
- cron job;
- WebSocket;
- GraphQL;
- microservices;
- Docker;
- perubahan frontend PLAN-001;
- refactor `server/`;
- penghapusan `client/` atau `server/`;
- perubahan Google Drive.

Nama module bisnis seperti `auth`, `users`, `leads`, `projects`, `documents`, dan `payments` tidak boleh dibuat sebagai placeholder. Module hanya dibuat setelah kebutuhan dan kontraknya disetujui.

---

## 9. Struktur Target

Struktur minimum yang dituju:

```text
apps/backend/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── config/
│   │   ├── env.validation.ts
│   │   └── configuration.ts
│   ├── database/
│   │   ├── database.module.ts
│   │   └── prisma.service.ts
│   └── health/
│       ├── health.controller.ts
│       ├── health.controller.spec.ts
│       ├── health.module.ts
│       └── health.service.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

Apabila major version Prisma yang dipilih secara resmi memerlukan file konfigurasi tambahan, file berikut boleh dibuat:

```text
apps/backend/prisma.config.ts
```

Nama dan lokasi output Prisma Client mengikuti pola resmi major version yang digunakan. Jangan membuat dua pola Prisma sekaligus.

Dokumentasi teknis aktif:

```text
docs/architecture/backend-foundation.md
```

Plan final tetap berada di:

```text
docs/plan/PLAN-002_FONDASI_BACKEND_RKK.md
```

Jangan membuat file plan duplikat.

---

## 10. TASK-002A — Pemeriksaan dan Integrasi Workspace

### 10.1 Tujuan

Memastikan backend baru ditambahkan ke monorepo tanpa merusak workspace atau aplikasi yang sudah ada.

### 10.2 Langkah

1. Verifikasi repository, branch, base SHA, dan working tree.
2. Inventarisasi:
   - `package.json` root;
   - `package-lock.json`;
   - daftar workspace;
   - scripts root;
   - versi Node.js dan npm;
   - konfigurasi lint/format bersama;
   - struktur `apps/web`;
   - keberadaan `apps/backend`;
   - status `client/` dan `server/`.
3. Jalankan validasi baseline yang tersedia sebelum perubahan.
4. Pastikan `apps/*` telah tercakup sebagai workspace atau tambahkan secara minimum bila baseline final berbeda.
5. Gunakan nama package:

   ```json
   {
     "name": "@rkk/backend",
     "private": true
   }
   ```

6. Tambahkan root scripts khusus backend hanya apabila tidak berbenturan:

   ```text
   dev:backend
   build:backend
   lint:backend
   test:backend
   test:e2e:backend
   prisma:validate:backend
   prisma:generate:backend
   ```

7. Jangan mengubah perilaku scripts aplikasi lain.
8. Jangan menggunakan PLAN-002 untuk memperbaiki error baseline yang tidak berkaitan.

### 10.3 Hasil minimum

- `@rkk/backend` terdeteksi sebagai npm workspace;
- instalasi root tetap berhasil;
- lockfile tetap tunggal dan konsisten;
- scripts backend dapat dipanggil dari root;
- workspace lain tidak rusak;
- tidak ada perubahan substantif pada aplikasi lain.

---

## 11. TASK-002B — Scaffold NestJS dan Bootstrap Aplikasi

### 11.1 Scaffold

1. Buat aplikasi NestJS TypeScript dengan strict mode.
2. Gunakan platform Express bawaan.
3. Hapus contoh `Hello World`, controller generik, dan service generik yang tidak diperlukan.
4. Jangan menyimpan boilerplate yang tidak digunakan.
5. Gunakan nama service teknis:

   ```text
   rkk-backend
   ```

6. Tambahkan `engines.node` yang kompatibel dengan versi NestJS yang dipakai dan baseline Node repository.
7. Gunakan versi stabil yang saling kompatibel pada saat eksekusi.
8. Kunci versi aktual melalui `package-lock.json`.

### 11.2 Bootstrap `main.ts`

Bootstrap minimum harus:

- membaca environment melalui konfigurasi NestJS;
- menggunakan port environment dengan fallback `3001`;
- mendengarkan `0.0.0.0`;
- mengaktifkan global prefix `api/v1`;
- mengaktifkan global `ValidationPipe` dengan:
  - `whitelist: true`;
  - `forbidNonWhitelisted: true`;
  - `transform: true`;
- mengaktifkan CORS berbasis daftar origin dari environment;
- mengaktifkan `helmet`;
- mengaktifkan shutdown hooks;
- menginisialisasi Swagger pada `/api/docs`;
- tidak melakukan query eksternal pada boot;
- tidak mencetak secret pada log.

### 11.3 Swagger

Metadata minimum:

- title: `RKK Backend API`;
- description: fondasi API teknis Rumahku Konstruksi;
- version: `1.0`;
- tag awal: `health`.

Swagger harus mendokumentasikan endpoint health.

Swagger dapat dikendalikan dengan environment agar dapat dinonaktifkan pada lingkungan produksi nanti. PLAN-002 belum menetapkan kebijakan final publikasi Swagger produksi.

---

## 12. TASK-002C — Konfigurasi Environment

### 12.1 Variabel minimum

`.env.example` sekurang-kurangnya memuat:

```dotenv
NODE_ENV=development
PORT=3001
CORS_ORIGINS=http://localhost:5173
SWAGGER_ENABLED=true
DATABASE_URL=postgresql://user:password@localhost:5432/rkk?schema=public
```

Jika major version Prisma yang digunakan membedakan URL runtime dan URL migration, tambahkan variabel contoh sesuai dokumentasi resmi, misalnya:

```dotenv
DIRECT_URL=postgresql://user:password@localhost:5432/rkk?schema=public
```

Variabel contoh bukan kredensial nyata.

### 12.2 Aturan

1. `.env` harus diabaikan Git.
2. `.env.example` boleh di-commit.
3. Validasi environment harus:
   - memeriksa `NODE_ENV`;
   - memeriksa port;
   - memeriksa daftar origin;
   - memeriksa format dasar URL database;
   - memberikan pesan error yang jelas;
   - tidak menampilkan password.
4. `CORS_ORIGINS` diparsing sebagai daftar dipisahkan koma.
5. Origin kosong dibuang.
6. Fallback lokal hanya:

   ```text
   http://localhost:5173
   ```

7. Jangan memasukkan URL Vercel, Railway, atau Neon yang belum diverifikasi.
8. Jangan menggunakan `*` sebagai origin produksi.

---

## 13. TASK-002D — Fondasi Prisma dan PostgreSQL

### 13.1 Tujuan

Menyiapkan jalur teknis Prisma–PostgreSQL tanpa menetapkan skema data bisnis.

### 13.2 Langkah

1. Pasang Prisma CLI dan Prisma Client yang kompatibel.
2. Gunakan provider PostgreSQL.
3. Gunakan konfigurasi environment, bukan URL hardcoded.
4. Buat `schema.prisma` minimum:
   - generator client;
   - datasource PostgreSQL;
   - tanpa model bisnis;
   - tanpa enum bisnis.
5. Buat `PrismaService` mengikuti lifecycle NestJS.
6. Buat `DatabaseModule` minimum.
7. Jangan melakukan eager query atau pemeriksaan database pada boot.
8. Jangan menjalankan:
   - introspection terhadap database lama;
   - `db pull`;
   - `db push`;
   - migration produksi;
   - seed;
   - reset database.
9. Jalankan validasi schema dan generate client dengan konfigurasi contoh yang aman.
10. Catat apabila major version Prisma menghasilkan warning karena belum ada model; pisahkan warning yang wajar dari error.

### 13.3 Batas koneksi Neon

PLAN-002 hanya menyiapkan kompatibilitas.

Tidak boleh:

- membuat akun atau project Neon;
- membuat branch database;
- mengisi connection string nyata;
- menyimpan credential;
- menjalankan query ke Neon;
- memutuskan region;
- memutuskan pooling produksi;
- membuat migration.

Penggunaan pooled connection untuk runtime dan direct connection untuk migration, jika diperlukan, ditetapkan pada plan deployment/database berikutnya setelah environment nyata tersedia.

### 13.4 Hasil minimum

- Prisma terpasang;
- schema dapat divalidasi;
- Prisma Client dapat di-generate;
- tidak ada model atau migration bisnis;
- aplikasi dapat boot tanpa database eksternal;
- tidak ada secret di repository.

---

## 14. TASK-002E — Health Module

### 14.1 Endpoint

Endpoint:

```text
GET /api/v1/health
```

Status HTTP:

```text
200
```

Respons minimum:

```json
{
  "status": "ok",
  "service": "rkk-backend",
  "timestamp": "ISO-8601"
}
```

### 14.2 Ketentuan

1. Endpoint hanya membuktikan proses backend hidup.
2. Endpoint tidak membaca database.
3. Endpoint tidak menampilkan:
   - environment variables;
   - version dependency;
   - path server;
   - secret;
   - detail internal sensitif.
4. Timestamp menggunakan format ISO-8601.
5. Endpoint didokumentasikan di Swagger.
6. Unit test memeriksa service/controller health.
7. End-to-end test memeriksa:
   - status 200;
   - `status = ok`;
   - `service = rkk-backend`;
   - timestamp valid;
   - endpoint berada di `/api/v1/health`.
8. Test tidak memerlukan jaringan atau database eksternal.

Endpoint ini dapat digunakan sebagai dasar healthcheck Railway pada plan deployment berikutnya, tetapi PLAN-002 belum mengonfigurasi Railway.

---

## 15. TASK-002F — Dokumentasi dan Quality Gate

### 15.1 `apps/backend/README.md`

README minimum menjelaskan:

- fungsi `apps/backend`;
- stack;
- prasyarat Node.js dan npm;
- cara menyiapkan `.env` dari `.env.example`;
- cara instalasi;
- cara development;
- cara build;
- cara lint;
- cara unit test;
- cara end-to-end test;
- cara validasi dan generate Prisma;
- endpoint health;
- lokasi Swagger;
- batas bahwa belum ada module bisnis dan belum terhubung ke produksi.

### 15.2 Dokumentasi arsitektur

Buat:

```text
docs/architecture/backend-foundation.md
```

Isinya minimum:

- kedudukan backend dalam monorepo;
- hubungan `apps/web → apps/backend → PostgreSQL`;
- modular monolith;
- struktur module;
- API prefix;
- environment;
- Prisma;
- health endpoint;
- batas PLAN-002;
- pekerjaan lanjutan yang belum dikerjakan;
- larangan frontend terhubung langsung ke database.

### 15.3 Indeks plan

Perbarui:

```text
docs/plan/README.md
```

Catat PLAN-002 dengan:

- judul;
- status eksekusi aktual;
- branch;
- base SHA;
- ruang lingkup;
- hasil ringkas setelah tersedia.

Jangan mengubah status PLAN-000 atau PLAN-001 tanpa bukti audit yang telah diberikan pemilik.

---

## 16. File dan Area yang Boleh Dibuat atau Diubah

Area utama:

```text
apps/backend/**
docs/architecture/backend-foundation.md
docs/plan/PLAN-002_FONDASI_BACKEND_RKK.md
docs/plan/README.md
```

Konfigurasi root yang boleh diubah secara minimum:

```text
package.json
package-lock.json
.gitignore
README.md
```

Ketentuan:

- `README.md` root hanya boleh diubah untuk menyelaraskan struktur dan perintah backend apabila dokumentasi aktif final memang memerlukannya;
- jangan menulis ulang bagian lain yang tidak berkaitan;
- perubahan root harus dijelaskan satu per satu dalam laporan;
- file tambahan di luar daftar hanya boleh dibuat apabila diwajibkan secara langsung oleh scaffold NestJS, TypeScript, ESLint, Jest, atau Prisma dan tetap berada di `apps/backend`.

---

## 17. Area yang Dilindungi

Gemini Antigravity tidak boleh mengubah secara substantif:

```text
apps/web/**
client/**
server/**
archive/**
```

Juga tidak boleh:

- mengubah Google Drive;
- memindahkan atau menghapus source legacy;
- mengubah UI/UX atau konten website publik;
- mengubah route frontend;
- mengubah API atau logika di `server/`;
- membaca atau menyalin credential dari file lokal;
- mengubah file environment nyata;
- membuat atau menghapus database;
- melakukan operasi Git destruktif;
- melakukan commit;
- melakukan push;
- melakukan merge;
- membuat pull request;
- melakukan deployment.

Perubahan tak disengaja pada area dilindungi harus dibatalkan secara aman sebelum laporan. Jika tidak dapat dibatalkan tanpa risiko, hentikan pekerjaan dan laporkan.

---

## 18. Urutan Implementasi

1. Baca PLAN-002 versi final seluruhnya.
2. Verifikasi repository.
3. Verifikasi branch.
4. Verifikasi `HEAD` sama dengan base SHA.
5. Verifikasi working tree bersih.
6. Catat baseline build, lint, dan test yang tersedia.
7. Inventarisasi root workspace dan lockfile.
8. Pastikan tidak ada konflik pada `apps/backend`.
9. Buat scaffold NestJS TypeScript strict.
10. Bersihkan boilerplate.
11. Integrasikan package ke npm workspace.
12. Siapkan konfigurasi environment.
13. Siapkan bootstrap, prefix, validation, CORS, helmet, dan Swagger.
14. Buat health module.
15. Buat unit test dan end-to-end test.
16. Siapkan Prisma minimum tanpa model bisnis.
17. Buat dokumentasi lokal dan arsitektur.
18. Perbarui indeks plan.
19. Jalankan seluruh validasi.
20. Periksa secret dan perubahan di luar scope.
21. Pisahkan error baseline dan error baru.
22. Berikan laporan.
23. Berhenti tanpa commit, push, PR, atau deployment.

---

## 19. Validasi Wajib

Gunakan perintah aktual yang sesuai dengan scripts final. Minimum:

```text
npm install
npm run build --workspace @rkk/backend
npm run lint --workspace @rkk/backend
npm run test --workspace @rkk/backend
npm run test:e2e --workspace @rkk/backend
npm run prisma:validate --workspace @rkk/backend
npm run prisma:generate --workspace @rkk/backend
git diff --check
git status --short
```

Lakukan smoke test lokal:

1. jalankan backend dengan environment contoh yang aman;
2. pastikan proses membaca `PORT`;
3. periksa:

   ```text
   GET /api/v1/health
   ```

4. pastikan respons 200;
5. pastikan Swagger tersedia di `/api/docs` saat `SWAGGER_ENABLED=true`;
6. hentikan proses secara normal.

Pemeriksaan tambahan:

- tidak ada file `.env` ter-track;
- tidak ada connection string nyata;
- tidak ada token, password, API key, atau credential;
- tidak ada model atau migration bisnis;
- tidak ada import dari `apps/backend` ke source internal `server/`;
- tidak ada import dari `apps/web` ke database;
- tidak ada perubahan substantif di `apps/web`, `client`, atau `server`;
- tidak ada Dockerfile atau konfigurasi Docker baru;
- tidak ada deployment config yang mengaktifkan layanan eksternal;
- root workspace lain tetap dapat dibaca dan dipasang;
- build/lint/test PLAN-001 tidak rusak oleh perubahan workspace, sejauh command baseline tersedia.

Jika baseline mempunyai error lama, laporan harus memisahkan:

- error baseline;
- warning baseline;
- error baru;
- warning baru.

PLAN-002 tidak boleh diterima jika menambah error baru.

---

## 20. Acceptance Criteria

PLAN-002 dinyatakan berhasil hanya apabila:

- [ ] PLAN-000 dan PLAN-001 telah ditutup sebelum eksekusi;
- [ ] branch dan base SHA final telah diverifikasi;
- [ ] working tree awal bersih;
- [ ] `apps/backend` tersedia;
- [ ] package bernama `@rkk/backend`;
- [ ] NestJS + TypeScript strict digunakan;
- [ ] Express bawaan NestJS digunakan;
- [ ] backend terdaftar sebagai npm workspace;
- [ ] instalasi dependensi berhasil;
- [ ] lockfile konsisten;
- [ ] aplikasi dapat berjalan pada port environment;
- [ ] aplikasi mendengarkan `0.0.0.0`;
- [ ] global prefix `/api/v1` aktif;
- [ ] CORS menggunakan allowlist environment;
- [ ] `ValidationPipe` global aktif;
- [ ] `helmet` aktif;
- [ ] Swagger tersedia di `/api/docs` ketika diaktifkan;
- [ ] `GET /api/v1/health` menghasilkan HTTP 200;
- [ ] respons health sesuai kontrak minimum;
- [ ] health tidak bergantung pada database eksternal;
- [ ] Prisma menggunakan provider PostgreSQL;
- [ ] Prisma schema dapat divalidasi;
- [ ] Prisma Client dapat di-generate;
- [ ] tidak ada model bisnis;
- [ ] tidak ada migration atau seed;
- [ ] tidak ada credential nyata;
- [ ] `.env` tidak ter-track;
- [ ] `.env.example` tersedia;
- [ ] build backend berhasil;
- [ ] lint backend berhasil;
- [ ] unit test berhasil;
- [ ] end-to-end test berhasil;
- [ ] `git diff --check` berhasil;
- [ ] tidak ada error baru;
- [ ] dokumentasi backend tersedia;
- [ ] dokumentasi arsitektur tersedia;
- [ ] indeks plan diperbarui berdasarkan status nyata;
- [ ] `apps/web` tidak berubah secara substantif;
- [ ] `client/` dan `server/` tetap tersedia;
- [ ] tidak ada Docker;
- [ ] tidak ada deployment;
- [ ] tidak ada perubahan Google Drive;
- [ ] laporan hasil lengkap diberikan;
- [ ] Skrip `npm run build`, `npm run lint`, dan `npm run test:e2e` dari root workspace selesai tanpa error;
- [ ] Smoke test lokal berhasil (Health mengembalikan HTTP 200 dengan format `{ status: 'ok', service: 'rkk-backend', timestamp: '...' }`);
- [ ] Dokumentasi `docs/architecture/backend-foundation.md` telah disetujui;
- [ ] Validasi Prisma lulus: skema tidak mengandung model bisnis nyata, database URL membaca env tanpa hardcoding di skema;
- [ ] Commit dilakukan manual oleh pemilik sesuai hasil validasi;
- [ ] Commit dan PR **hanya dilakukan oleh pemilik repository** (agen tidak diizinkan commit/push).

---

## 21. Risiko dan Tindakan Pencegahan

| Risiko | Pencegahan |
|---|---|
| Benturan dengan PLAN-001 pada root workspace | PLAN-002 dijalankan hanya setelah checkpoint PLAN-001 |
| Base SHA kedaluwarsa | SHA dikunci sebelum eksekusi dan diperiksa sebelum perubahan |
| Scaffold menambah boilerplate tidak diperlukan | Hapus controller/service contoh dan file tidak digunakan |
| Versi NestJS dan Prisma tidak kompatibel | Gunakan dokumentasi resmi, versi stabil kompatibel, dan lockfile |
| Pola Prisma lintas major tercampur | Pilih satu pola resmi sesuai major version |
| Backend gagal boot tanpa Neon | Jangan melakukan query database saat boot |
| Credential masuk ke Git | Hanya `.env.example`, secret scan, dan pemeriksaan diff |
| CORS terlalu terbuka | Gunakan allowlist environment, tanpa wildcard produksi |
| Fondasi berubah menjadi pembangunan fitur | Lindungi scope dan larang module bisnis |
| Backend baru menyalin legacy | Legacy hanya diperiksa, tidak disalin otomatis |
| Test palsu atau klaim validasi berlebihan | Jalankan command nyata dan laporkan N/A jika memang tidak tersedia |
| PR tidak mempunyai jalur karena bekerja di `main` | Gunakan feature branch khusus setelah disetujui |
| Dokumentasi tidak sesuai implementasi | Audit diff dan perbarui dokumentasi berdasarkan hasil aktual |

---

## 22. Format Laporan Gemini Antigravity

### A. Baseline

- repository;
- branch;
- base SHA;
- HEAD sebelum perubahan;
- status working tree;
- versi Node.js;
- versi npm;
- daftar workspace;
- scripts root;
- hasil build/lint/test baseline yang relevan.

### B. Perubahan

- file dibuat;
- file diubah;
- file dihapus;
- dependensi ditambahkan;
- scripts ditambahkan;
- konfigurasi root yang diubah;
- file dan area yang sengaja dipertahankan;
- keputusan teknis minimum terkait kompatibilitas versi.

### C. Backend Foundation

- versi NestJS;
- versi TypeScript;
- versi Prisma;
- platform HTTP;
- struktur module;
- API prefix;
- health endpoint;
- Swagger path;
- environment variables contoh;
- status Prisma;
- konfirmasi tidak ada model bisnis.

### D. Validasi

- seluruh command yang dijalankan;
- hasil setiap command;
- hasil smoke test;
- hasil health endpoint;
- hasil Swagger;
- error baseline;
- warning baseline;
- error baru;
- warning baru;
- hasil secret check;
- hasil pemeriksaan protected files.

### E. Batas dan Temuan

- bagian yang belum dikerjakan;
- blocker;
- penyimpangan;
- perubahan di luar scope;
- kebutuhan keputusan pemilik;
- rekomendasi pekerjaan berikutnya tanpa mengerjakannya.

### F. Status Akhir

Nyatakan salah satu:

- `Selesai — seluruh acceptance criteria terpenuhi`;
- `Parsial — sebutkan acceptance criteria yang belum terpenuhi`;
- `Terblokir — sebutkan blocker`;
- `Gagal — sebutkan error baru atau pelanggaran scope`.

Setelah laporan, berhenti.

---

## 23. Pengujian oleh Pemilik

Setelah laporan diterima, pemilik atau pemeriksa menjalankan:

1. pemeriksaan `git status`;
2. pemeriksaan `git diff`;
3. pemeriksaan daftar file;
4. instalasi dependensi;
5. build backend;
6. lint backend;
7. unit test;
8. end-to-end test;
9. Prisma validate dan generate;
10. smoke test health endpoint;
11. pemeriksaan Swagger;
12. pemeriksaan secret;
13. pemeriksaan area dilindungi;
14. pemeriksaan bahwa PLAN-001 tidak mengalami regresi;
15. pemeriksaan bahwa tidak ada keputusan bisnis atau skema data baru.

Commit, push, dan pull request hanya dilakukan setelah hasil aktual diterima.

---

## 24. Data yang Dikembalikan untuk Audit SHA

Setelah pemilik melakukan commit dan push sesuai keputusan, berikan kepada ChatGPT:

- nama branch;
- base SHA;
- SHA hasil commit;
- commit message aktual;
- URL pull request jika dibuat;
- daftar file berubah;
- ringkasan diff;
- hasil build;
- hasil lint;
- hasil unit test;
- hasil end-to-end test;
- hasil Prisma validate/generate;
- blocker atau penyimpangan;
- status working tree setelah commit.

ChatGPT kemudian membandingkan hasil dengan PLAN-002 dan menetapkan:

- Diterima;
- Diterima dengan catatan;
- Perlu revisi;
- Terblokir;
- Dibatalkan.

---

## 25. Definition of Done

PLAN-002 selesai ketika repository mempunyai fondasi backend aktif pada `apps/backend` yang:

1. terintegrasi dengan npm monorepo;
2. `apps/backend/package.json` package name menjadi `@rkk/backend`
3. Konfigurasi `prisma.config.ts` untuk versi 7.
4. Arsitektur modular dengan `HealthModule`.
5. Endpoint `GET /api/v1/health`.
6. Swagger di `/api/docs` yang dilindungi environment variable.
7. Konfigurasi env menggunakan `ConfigModule` dan Joi.
8. menggunakan NestJS + TypeScript;
9. dapat dijalankan dan di-build;
10. lulus lint dan test dasar;
11. mempunyai REST prefix `/api/v1`;
12. mempunyai endpoint health yang stabil;
13. mempunyai Swagger;
14. mempunyai konfigurasi environment yang aman;
15. mempunyai fondasi Prisma PostgreSQL tanpa model bisnis;
16. mempunyai dokumentasi development dan arsitektur;
17. tidak membutuhkan database atau layanan eksternal untuk lulus fondasi;
18. tidak mengubah frontend atau legacy secara substantif;
19. tidak menambah error baru;
20. telah diperiksa berdasarkan commit dan SHA aktual;
21. telah dinyatakan diterima oleh pemilik.

PLAN-002 bukan selesai hanya karena folder `apps/backend` berhasil dibuat.

---

## 26. Parameter yang Harus Dikunci Sebelum Eksekusi

Sebelum PLAN-002 dieksekusi, parameter berikut telah dikunci sesuai identitas dokumen:

1. branch sasaran final: `refactor/plan-002-backend-foundation`;
2. base SHA final dikunci sebelum eksekusi;
3. kondisi working tree harus bersih sebelum modifikasi.

Jika repository berubah setelah parameter dikunci, PLAN-002 harus diselaraskan kembali.

---

## 27. Catatan Status Persetujuan

PLAN-002 telah disetujui secara substansi dan menetapkan:

- tujuan fondasi backend;
- stack dan lokasi backend;
- batas modular monolith;
- struktur minimum;
- environment;
- health endpoint;
- Swagger;
- Prisma tanpa model bisnis;
- quality gate;
- protected files;
- acceptance criteria;
- format laporan dan audit.

Status eksekusi saat ini: **DIEKSEKUSI — PERLU REVISI**.
Penerimaan final baru ditentukan setelah audit SHA berikutnya. PLAN-002 belum dinyatakan selesai atau diterima secara final.

Bagian tersebut sengaja menunggu checkpoint aktual agar PLAN-002 tidak dijalankan di atas baseline yang salah.

---

## Persetujuan Pemilik

Disetujui oleh pemilik pada 27 Juli 2026.

- [x] Judul dan kedudukan PLAN-002 disetujui.
- [x] Stack NestJS + TypeScript disetujui.
- [x] Modular monolith disetujui.
- [x] REST + Swagger disetujui.
- [x] Prisma + PostgreSQL/Neon disetujui.
- [x] Target Railway tanpa deployment pada PLAN-002 disetujui.
- [x] Struktur `apps/backend` disetujui.
- [x] Endpoint health disetujui.
- [x] Scope dan di luar scope disetujui.
- [x] Area dilindungi disetujui.
- [x] Acceptance criteria disetujui.
- [x] Feature branch untuk pull request disetujui.
- [x] PLAN-002 dapat dilengkapi dengan base SHA final setelah checkpoint PLAN-001 tersedia.

**Koreksi/catatan pemilik:**

> Diterima dan disetujui tanpa koreksi substansi pada 27 Juli 2026.
