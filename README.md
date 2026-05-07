# RumahKu Kontruksi

Ini adalah repository final utama untuk proyek **RumahKu Kontruksi**. Repository ini menggabungkan frontend terbaik dan backend yang sudah dikembangkan ke dalam satu struktur yang rapi dan terorganisir.

## Struktur Repository

```text
RKK-RumahKuKontruksi/
├── client/         # Frontend Vite React
├── server/         # Backend Express API & Prisma Data Service
├── docs/           # Dokumentasi Terstruktur
├── README.md       # File ini
└── .gitignore      # Konfigurasi Git ignore root
```

## Dokumentasi Utama
Kami menggunakan sistem dokumentasi terstruktur untuk mengelola proyek ini:
- **[Pusat Dokumentasi](docs/README.md)** - Mulai dari sini.
- **[Overview Proyek](docs/project/overview.md)**
- **[Status Backend](docs/backend/README.md)** - Detail implementasi API v0.
- **[Rencana Kerja (Roadmap)](docs/project/roadmap.md)**

## Cara Menjalankan Aplikasi

### Frontend (Client)
1. `cd client`
2. `npm install`
3. `npm run dev`

### Backend (Server)
1. `cd server`
2. `npm install`
3. `cp .env.example .env` (Lalu sesuaikan konfigurasi DB)
4. `npx prisma migrate dev`
5. `npm run db:seed`
6. `npm run dev`

## Status Proyek
Saat ini proyek berada pada tahap **Refining Superadmin & Admin UI**.
- **Backend**: Implemented v0 (Core Data Service) - Menyediakan API riil untuk Customer & Proyek tanpa Autentikasi.
- **Frontend**: Role Superadmin telah dipoles (Theme & Navigation). Fokus berikutnya adalah pengembangan Role Admin dengan pendekatan *Mock-First*.
