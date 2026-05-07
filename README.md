# RumahKu Konstruksi

Ini adalah repository utama untuk proyek **RumahKu Konstruksi**. Repository ini menggabungkan frontend modern dan backend Express berbasis Prisma ke dalam satu struktur yang terorganisir untuk pengembangan lokal.

## Struktur Repository

```text
RKK-RumahKuKontruksi/
├── client/         # Frontend Vite React
├── server/         # Backend Express API & Prisma Data Service
├── docs/           # Dokumentasi Terstruktur (Roadmap, API, UI Status)
├── README.md       # Panduan cepat repository
└── .gitignore      # Konfigurasi Git ignore root
```

## Cara Menjalankan Lokal

Pastikan Anda sudah menginstal Node.js dan PostgreSQL di sistem lokal Anda.

### 1. Backend (Server)
```bash
cd server
npm install
cp .env.example .env # Sesuaikan DATABASE_URL di file .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

### 2. Frontend (Client)
```bash
cd client
npm install
npm run dev
```

## Status Proyek: Local Development CRUD Integration Phase

Proyek saat ini sedang dalam fase integrasi CRUD database lokal untuk mendukung fungsionalitas role utama.

**Penting:**
- **Local Development Only**: Proyek ini belum *production-ready*.
- **No Real Auth**: Sistem autentikasi (Login/JWT/Session) asli belum dibuat.
- **Backend Service**: Menggunakan Express + Prisma sebagai penyedia data CRUD lokal.
- **Role Integration**:
  - **Pengawas & Mandor**: Sudah mulai beralih ke *Database-Backed* (tidak menggunakan mock data sebagai fallback utama).
  - **Role Lain**: (Admin, Arsitek, Konsumen) masih menggunakan pendekatan *Mock-First* atau parsial.

## Kebijakan Sumber Data (Data Source Policy)
Untuk role **Pengawas** dan **Mandor**:
1. Source of truth wajib berasal dari backend/database.
2. Jika persona belum dipilih, UI wajib menampilkan *Empty State* pilih persona.
3. Mock data hanya digunakan untuk keperluan seed database atau referensi struktur, bukan sebagai data operasional di UI.

Untuk role lain yang belum memiliki backend lengkap, penggunaan mock data masih diperbolehkan untuk keperluan pengembangan UI.

## Dokumentasi Terstruktur
- [**Pusat Dokumentasi**](docs/README.md) - Indeks seluruh dokumen proyek.
- [**Status Proyek Terbaru**](docs/project/current-status.md) - Snapshot kondisi pengembangan.
- [**Status API Lokal**](docs/backend/api-status.md) - Referensi endpoint yang tersedia.
- [**Rencana Migrasi**](docs/project/migration-plan.md) - Roadmap teknis integrasi.
