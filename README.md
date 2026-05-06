# RumahKu Kontruksi

Ini adalah repository final utama untuk proyek **RumahKu Kontruksi**. Repository ini menggabungkan frontend terbaik dan backend yang sudah dikembangkan ke dalam satu struktur yang rapi dan terorganisir.

## Struktur Repository

```text
RKK-RumahKuKontruksi/
├── client/         # Frontend Vite React (Dari RumahKuKontruksi-Dev)
├── server/         # Backend Express (Placeholder untuk migrasi)
├── docs/           # Dokumentasi Proyek & Rencana Migrasi
├── README.md       # File ini
└── .gitignore      # Konfigurasi Git ignore root
```

## Status Proyek
Saat ini fokus pada **Frontend/UI**. Seluruh kode frontend dari repository `RumahKuKontruksi-Dev/client` telah dipindahkan ke folder `client/`. Repository `rumahkukontruksi-frontend` (Next.js) sudah tidak digunakan lagi.

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

## Dokumentasi
Detail mengenai rencana migrasi dan catatan teknis dapat ditemukan di folder `docs/`:
- [Rencana Migrasi](docs/migration-plan.md)
- [Catatan Frontend](docs/frontend-notes.md)
- [Catatan Backend](docs/backend-notes.md)
- [Roadmap](docs/roadmap.md)
