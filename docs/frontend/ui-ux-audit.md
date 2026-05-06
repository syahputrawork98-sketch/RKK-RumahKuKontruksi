# UI/UX Audit - RumahKu Kontruksi

## Tujuan
Dokumen ini digunakan untuk mengontrol proses audit dan perapihan UI/UX frontend RumahKu Kontruksi secara bertahap.

## Status Umum
Frontend menggunakan Vite React dari `RumahKuKontruksi-Dev/client`. Audit dilakukan untuk memastikan standar premium dan fungsionalitas yang tepat.

## Daftar Temuan Audit (Initial Check: 2026-05-06)

| Route | Role | Status | Catatan | Prioritas |
|---|---|---|---|---|
| / | Guest | **KEEP** | Landing page utama. *Issue*: Hamburger menu muncul di desktop. | high |
| /about | Guest | **KEEP** | Tentang perusahaan. | medium |
| /contact | Guest | **KEEP** | Kontak perusahaan. | medium |
| /konsumen/TimelineProyek | Konsumen | **KEEP** | Timeline proyek (Budi Santoso, Ahmad Fauzi). | high |
| /konsumen/proyek | Konsumen | **KEEP** | Data proyek konsumen. | high |
| /konsumen/profil | Konsumen | **KEEP** | Profil konsumen. | medium |
| /superadmin/dashboard | Superadmin | **IMPROVE** | Dashboard utama. Perlu data real/lebih detail. | high |
| /superadmin/data-admin | Superadmin | **IMPROVE** | Kelola admin. *Status*: Empty state. | high |
| /superadmin/data-pengawas | Superadmin | **IMPROVE** | Kelola pengawas. *Status*: Empty state. | high |
| /superadmin/data-mandor | Superadmin | **IMPROVE** | Kelola mandor. *Status*: Empty state. | high |
| /admin/dashboard | Admin | **REDESIGN** | Dashboard admin. *Status*: Masih berupa shell kosong. | high |
| /pengawas/dashboard | Pengawas | **REDESIGN** | Dashboard pengawas. *Status*: Masih berupa shell kosong. | high |
| /mandor/dashboard | Mandor | **REDESIGN** | Dashboard mandor. *Status*: Masih berupa shell kosong. | high |

## Temuan Teknis Global
1. **Responsive**: Navbar guest perlu perbaikan breakpoint agar tidak selalu menampilkan hamburger menu.
2. **Missing Imports**: Menambahkan mock `@server/services/NotificationService` dan `@server/data/dummyNotifications` agar dashboard bisa berjalan.
3. **Empty States**: Halaman manajemen data superadmin perlu diisi mock data awal agar UI terlihat utuh.

## Aturan Perubahan UI
- Ubah satu halaman atau satu kelompok role per tahap.
- Jangan ubah flow besar tanpa catatan.
- Gunakan mock data terlebih dahulu sebelum integrasi backend.
