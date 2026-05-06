# Migration Plan - RumahKu Kontruksi

## Deskripsi
Rencana migrasi dari sistem lama ke struktur repository final.

## Sumber Repositori
1. **Frontend**: `RumahKuKontruksi-Dev/client` (Vite React)
2. **Backend**: `RumahKuKontruksi-Dev/server` (Express + Supabase)

> **Catatan**: Repository `rumahkukontruksi-frontend` (Next.js) tidak lagi digunakan.

## Tahapan Migrasi
- [x] Inisialisasi struktur repository final (client/, server/, docs/).
- [x] Reset frontend lama (Next.js) dan migrasi frontend Vite React dari Dev ke `client/`.
- [ ] Audit UI-UX dan penyatuan mock data terpusat.
- [ ] Migrasi backend dari `RumahKuKontruksi-Dev` ke folder `server/`.
- [ ] Integrasi integrasi client-server.
- [ ] Testing dan QA.
