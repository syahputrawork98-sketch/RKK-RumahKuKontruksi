# RKK - RumahKu Konstruksi

RumahKu Konstruksi (RKK) adalah platform inovatif yang dirancang untuk membantu pengelolaan proyek konstruksi, menghubungkan konsumen, arsitek, admin, pengawas, dan mandor dalam satu ekosistem yang terintegrasi. Platform ini memastikan transparansi dan efisiensi dalam pembangunan rumah.

## Tujuan Project
Memudahkan pemantauan progres, kolaborasi antar peran, serta pelaporan setiap tahapan konstruksi proyek secara digital dan terstruktur.

## Struktur Repository
- `client/` - Berisi source code untuk frontend.
- `server/` - Berisi source code untuk backend API.
- `docs/plan/` - Pusat dokumentasi plan aktif.
- `archive/docs-legacy/` - Arsip dokumentasi teknis dan sistem kerja proyek lama.
> [!TIP]
> Untuk melihat ringkasan arsitektur, peran, dan status fungsional fitur secara cepat, silakan merujuk pada file [**FITUR.md**](FITUR.md).

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express
- **Database/Service**: Supabase

## Cara Menjalankan Aplikasi

### Frontend
```bash
cd client
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
npm run dev
```

## Catatan Penting
- Ringkasan fitur tersedia di [FITUR.md](FITUR.md).
- Dokumentasi teknis lama tersedia di folder `archive/docs-legacy/`, sedangkan plan aktif berada di `docs/plan/`.
- GitHub adalah *source of truth* utama untuk seluruh code dan dokumentasi.
- Perubahan pada project ini dilakukan secara bertahap menggunakan metode *batch kecil* untuk menjaga stabilitas.
- **Dilarang keras** menyimpan credential, token, API key, password, dan file `.env` di dalam repository. Selalu gunakan environment variables yang aman di lokal masing-masing.
