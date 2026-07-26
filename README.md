# RKK - RumahKu Konstruksi

RumahKu Konstruksi (RKK) adalah platform inovatif yang dirancang untuk membantu pengelolaan proyek konstruksi, menghubungkan konsumen, arsitek, admin, pengawas, dan mandor dalam satu ekosistem yang terintegrasi. Platform ini memastikan transparansi dan efisiensi dalam pembangunan rumah.

> **Status Saat Ini: Masa Transisi Arsitektur**
> Repository ini sedang dalam masa refactor. Keputusan arsitektur dan bisnis yang bersifat resmi merujuk pada dokumen di **Google Drive**, sedangkan **GitHub** menunjukkan kondisi implementasi aktual dari kode sumber.

## Struktur Repository (Transisi)
- `apps/web/` - Direktori frontend baru (React + Vite) yang sedang disiapkan.
- `apps/backend/` - Direktori arsitektur target backend baru.
- `client/` - Baseline source code frontend *legacy* (dipertahankan sementara).
- `server/` - Baseline source code backend *legacy* (dipertahankan sementara).
- `docs/plan/` - Pusat dokumentasi plan aktif (refactor).
- `archive/docs-legacy/` - Arsip dokumentasi teknis dan sistem kerja proyek lama.

> [!TIP]
> Untuk melihat status masa transisi dan pengarsipan fungsionalitas, silakan merujuk pada file [**FITUR.md**](FITUR.md). Detail spesifik terkait sistem lama dapat ditemukan di `archive/docs-legacy/`.

## Tech Stack Target Aktif
- **Frontend**: React, Vite, Tailwind CSS
- *(Catatan: Arsitektur target backend tidak lagi menggunakan Express dan Supabase. Sistem lama yang menggunakan stack tersebut sedang dalam tahap pengarsipan/refactor.)*

## Cara Menjalankan Aplikasi

### Frontend Baru (Dalam Pengembangan)
```bash
npm install
npm run dev --workspace apps/web
```

### Menjalankan Sistem Legacy (Jika Diperlukan)
Untuk `client` dan `server` legacy, navigasi ke masing-masing folder dan jalankan `npm run dev`.

## Catatan Penting
- Ringkasan fitur tersedia di [FITUR.md](FITUR.md).
- Dokumentasi teknis lama tersedia di folder `archive/docs-legacy/`, sedangkan plan aktif berada di `docs/plan/`.
- Perubahan pada project ini dilakukan secara bertahap menggunakan metode *batch kecil* untuk menjaga stabilitas.
- **Dilarang keras** menyimpan credential, token, API key, password, dan file `.env` di dalam repository. Selalu gunakan environment variables yang aman di lokal masing-masing.
