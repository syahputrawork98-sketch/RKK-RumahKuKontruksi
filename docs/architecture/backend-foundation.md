# Arsitektur Fondasi Backend Rumahku Konstruksi

Dokumen ini menjelaskan rancangan arsitektur awal dan fondasi backend untuk Rumahku Konstruksi (RKK) yang dibangun di atas NestJS.

## 1. Posisi dalam Monorepo

Backend Rumahku Konstruksi diletakkan di direktori `apps/backend` dan diintegrasikan sebagai workspace NPM ke dalam monorepo root. Frontend publik berada di `apps/web`.
Semua konfigurasi `build`, `lint`, dan `test` untuk backend dapat dieksekusi secara terpusat melalui root monorepo.

## 2. Alur Akses Data

```
apps/web (Frontend) -> REST API (apps/backend) -> Prisma ORM -> PostgreSQL
```

Frontend (`apps/web`) **DILARANG KERAS** mengakses database PostgreSQL secara langsung. Seluruh operasi pengaksesan dan manipulasi data harus melalui antarmuka REST API yang disediakan oleh backend (`apps/backend`). Backend bertanggung jawab penuh terhadap validasi request, logika bisnis, keamanan, serta koneksi ke PostgreSQL via Prisma.

## 3. Modular Monolith

Arsitektur backend mengadopsi pola **Modular Monolith**. Kami tidak menggunakan microservices untuk menghindari kompleksitas infrastruktur di fase awal. Seluruh fitur akan dikembangkan di dalam satu aplikasi NestJS dengan membagi logika ke dalam modul-modul (*domain-driven*) yang jelas batasannya. 

## 4. REST API & Prefix

Setiap endpoint HTTP dilayani melalui arsitektur REST.
Secara global, aplikasi memberlakukan prefix:
`/api/v1`
Contoh: endpoint `health` diakses pada `/api/v1/health`.

## 5. Manajemen Environment & Konfigurasi

Semua kredensial dan preferensi environment dibaca dari variabel environment (atau `.env` di lokal) menggunakan `ConfigModule` dengan Joi Validation untuk memastikan ketersediaannya sebelum backend melakukan *booting*. Keamanan (CORS, PORT, Swagger Enable/Disable, dan Database URL) tidak akan berjalan jika environment tidak divalidasi dengan benar.

## 6. Prisma ORM & Database Target

PostgreSQL dipilih sebagai RDBMS utama dengan Prisma sebagai ORM. 
Pada `PLAN-002`, hanya schema standar yang dikonfigurasi, dan **tidak ada** implementasi model bisnis maupun migration. Koneksi diinisialisasi melalui `prisma.config.ts` sesuai standar Prisma 7.

## 7. Health Endpoint

Endpoint `GET /api/v1/health` dibangun pada module khusus `HealthModule` untuk memberikan indikasi *liveness* aplikasi ke layanan monitoring eksternal (seperti Railway) tanpa memerlukan koneksi ke layanan *third-party* atau database.

## 8. Batas PLAN-002

Fondasi ini disiapkan secara terbatas:
- Tidak membuat modul bisnis atau skema autentikasi
- Tidak ada *Dockerfile* atau mekanisme kontainerisasi
- Penggabungan ke `main` diisolasi hingga integrasi penuh disetujui.
