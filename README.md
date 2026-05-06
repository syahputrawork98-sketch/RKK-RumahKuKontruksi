# RumahKu Kontruksi

Ini adalah repository final utama untuk proyek **RumahKu Kontruksi**. Repository ini menggabungkan frontend terbaik dan backend yang sudah dikembangkan ke dalam satu struktur yang rapi dan terorganisir.

## Struktur Repository

```text
RKK-RumahKuKontruksi/
├── client/         # Frontend Vite React (Dari RumahKuKontruksi-Dev)
├── server/         # Backend Express (Placeholder untuk migrasi)
├── docs/           # Dokumentasi Terstruktur
├── README.md       # File ini
└── .gitignore      # Konfigurasi Git ignore root
```

## Dokumentasi Utama
Kami menggunakan sistem dokumentasi terstruktur untuk mengelola proyek ini:
- **[Pusat Dokumentasi](docs/README.md)** - Mulai dari sini.
- **[Overview Proyek](docs/project/overview.md)**
- **[Status Frontend](docs/frontend/current-state.md)**
- **[Audit UI/UX](docs/frontend/ui-ux-audit.md)**
- **[Rencana Kerja (Roadmap)](docs/project/roadmap.md)**
- **[Perencanaan Backend](docs/backend/README.md)**

## Cara Menjalankan Frontend

1. Pindah ke direktori client:
   ```bash
   cd client
   ```
2. Install dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan (Vite):
   ```bash
   npm run dev
   ```

## Status Proyek
Saat ini tim sedang fokus pada **Audit UI/UX** dan **Inventarisasi Komponen** pada sisi frontend. Seluruh kode sumber frontend berasal dari `RumahKuKontruksi-Dev/client`.
