# Frontend Documentation - RumahKu Konstruksi (RKK)

Selamat datang di dokumentasi teknis frontend project RKK. Dokumentasi ini bertujuan untuk memberikan gambaran menyeluruh tentang arsitektur, status implementasi, dan rencana pengembangan antarmuka pengguna.

## Struktur Dokumentasi

* [Current State](./current-state.md): Ringkasan kondisi aktual frontend saat ini.
* [Route Inventory](./route-inventory.md): Daftar lengkap semua route dan halaman yang tersedia.
* [Checklist](./checklist.md): Status pekerjaan per modul/fitur.
* [Dashboard Theme System](./dashboard-theme-system.md): Standar desain dashboard internal (Light/Dark).
* [Next Actions](./next-actions.md): Prioritas pengembangan berikutnya.
* [Roles Documentation](./roles/README.md): Detail implementasi untuk setiap role pengguna.

## Teknologi Utama

* **Framework**: React (Vite)
* **Styling**: Tailwind CSS (v4 compatible)
* **Animation**: Framer Motion
* **Icons**: React Icons (Lucide, Feather, Fi)
* **State Management**: React Hooks (useState, useEffect)

## Status Implementasi

Saat ini frontend RKK beroperasi dalam mode **UI-Only / Prototype** dengan data mock yang terpusat. 

**Update 7 Mei 2026**:
- **Superadmin**: Refined (Theme & Navigation Done).
- **Admin**: Next Target (Shell/Mock-First).
- **Integrasi API**: Aktif untuk modul Proyek & Customer (Read-Only).

Pengembangan role Admin akan dilakukan dengan pendekatan **Mock-First**, sehingga tidak bergantung pada ketersediaan API atau sistem Autentikasi/Login di backend.

---
*Terakhir diperbarui: 7 Mei 2026*
