# Role: Guest / Public

## Status Umum
Role Guest saat ini berstatus **Done / Stable UI**. Semua halaman publik telah dipoles menggunakan sistem desain premium dan responsif, berfungsi sebagai wajah utama RKK.

## Halaman / Route

| Halaman | Route | File/Component | Status | Catatan |
|---|---|---|---|---|
| Home | `/` | `modules/guest/pages/Home.jsx` | **Done** | Hero section dengan animasi. |
| Layanan | `/layanan` | `modules/guest/pages/Layanan.jsx` | **Done** | Grid layanan dengan hover effect. |
| Cara Kerja | `/cara-kerja` | `modules/guest/pages/CaraKerja.jsx` | **Done** | Timeline vertikal alur proyek. |
| Proyek | `/proyek` | `modules/guest/pages/Proyek.jsx` | **Done** | Portfolio dengan filter status. |
| Tentang | `/tentang` | `modules/guest/pages/Tentang.jsx` | **Done** | Penggunaan `public-hero-title`. |
| Kontak | `/kontak` | `modules/guest/Contact.jsx` | **Done** | Integrasi peta lokasi (dummy). |

## Komponen Terkait
- `Navbar.jsx`: Navigasi utama dengan modal login demo.
- `Footer.jsx`: Informasi kontak dan link cepat.
- `Public CSS System`: Terdefinisi di `index.css`.

## Data / Mock Data
- Portfolio proyek publik di-hardcode dalam komponen `Proyek.jsx`.
- Daftar layanan di-hardcode dalam `Layanan.jsx`.

## Sudah Dikerjakan
- [x] Standarisasi CSS reusable (`public-section`, `public-card`, dll).
- [x] Perbaikan readability hero di halaman Tentang.
- [x] Shortcut akses demo role di modal login.
- [x] Optimasi responsive layout.

## Belum Dikerjakan
- [ ] Integrasi form kontak dengan email service (dummy).
- [ ] Animasi transisi antar halaman yang lebih halus.

## Prioritas Berikutnya
1. Pembersihan komponen yang tidak terpakai (legacy components).
2. Optimasi ukuran gambar portfolio.
