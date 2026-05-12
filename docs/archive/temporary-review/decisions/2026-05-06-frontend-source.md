# Architecture Decision: Frontend Source Selection

**Tanggal**: 2026-05-06
**Status**: Accepted

## Konteks
Terdapat dua sumber frontend awal:
1. `rumahkukontruksi-frontend` (Next.js 16)
2. `RumahKuKontruksi-Dev/client` (Vite React 18)

## Keputusan
Memilih `RumahKuKontruksi-Dev/client` sebagai basis utama frontend untuk repository final **RKK-RumahKuKontruksi**.

## Alasan
1. **Kematangan Fitur**: Versi Dev memiliki implementasi fitur role-based (Superadmin, Pengawas, Mandor) yang lebih lengkap meskipun masih menggunakan mock data.
2. **Performa**: Penggunaan Vite memberikan pengalaman pengembangan yang lebih cepat (HMR cepat) dan bundle yang ringan.
3. **Kemudahan Migrasi**: Struktur React murni di versi Dev memudahkan porting komponen dan integrasi dengan backend Express yang sudah ada di repository Dev.

## Konsekuensi
- Repository `rumahkukontruksi-frontend` (Next.js) ditinggalkan dan tidak digunakan lagi.
- Tim akan fokus pada pemantapan UI/UX di atas framework Vite React.
- Perlu penyesuaian beberapa konfigurasi (seperti alias path) agar sesuai dengan struktur repository baru.
