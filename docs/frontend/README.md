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

Saat ini frontend RKK beroperasi dalam mode **Local Development Feature Completion with production-minded quality** dengan mayoritas role operasional (Mandor, Pengawas, Admin, Arsitek, Konsumen) sudah terintegrasi ke database (DB-Backed). Pengembang menggunakan **Developer Persona Switcher** untuk simulasi peran tanpa bergantung pada sistem Autentikasi/Login rill.

**Update 7 Mei 2026**:
- **Superadmin**: Refined (Theme & Navigation Done).
- **Admin/Arsitek/Pengawas/Mandor**: Shell Expanded (Navigasi & Dashboard Shell Done).
- **Integrasi API**: Aktif untuk modul Proyek & Customer (Read-Only) pada backend v0.

---
*Terakhir diperbarui: 7 Mei 2026*
