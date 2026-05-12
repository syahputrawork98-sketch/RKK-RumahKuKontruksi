# Dashboard Theme System

Dokumentasi ini menjelaskan sistem tema terpusat (Light/Dark mode) yang digunakan pada layout internal/dashboard RKK.

## 1. Fondasi Tema
Sistem tema menggunakan CSS Variables yang didefinisikan di `client/src/styles/dashboard-theme.css`. Tema dikontrol melalui atribut `data-theme` pada elemen root dashboard atau `document.documentElement`.

### Konfigurasi
- **Light Mode**: Default atau `data-theme="light"`
- **Dark Mode**: `data-theme="dark"`
- **Persistence**: Status tema disimpan di `localStorage` dengan key `rkk-dashboard-theme`.

## 2. Variabel Utama (Tokens)
Gunakan variabel berikut untuk memastikan komponen mendukung Light & Dark mode secara otomatis:

| Variabel | Deskripsi |
| --- | --- |
| `--dashboard-bg` | Background utama halaman |
| `--dashboard-surface` | Background card / komponen |
| `--dashboard-surface-soft` | Background komponen sekunder / hover |
| `--dashboard-text` | Warna teks utama |
| `--dashboard-muted` | Warna teks sekunder / redup |
| `--dashboard-border` | Warna border standar |
| `--dashboard-primary` | Warna brand utama (Teal/Emerald) |

## 3. Komponen Utama
- **ThemeToggle**: Komponen untuk mengganti tema yang diletakkan di Topbar.
- **SuperAdminLayout**: Mengelola state tema dan menerapkan class shell.

## 4. Cara Penggunaan pada Komponen Baru
Hindari penggunaan class utility Tailwind untuk warna yang bersifat absolut (seperti `bg-white` atau `text-slate-900`). Gunakan variabel CSS:

```jsx
// Bagus (Mendukung Light/Dark Mode)
<div className="bg-[var(--dashboard-surface)] text-[var(--dashboard-text)] border border-[var(--dashboard-border)]">
  ...
</div>

// Atau gunakan class reusable
<div className="dashboard-card">
  ...
</div>
```

## 5. Struktur Layout
Layout dashboard terdiri dari:
- `.dashboard-shell`: Wrapper utama (flex).
- `.dashboard-sidebar`: Sidebar navigasi (fixed).
- `.dashboard-main`: Area konten utama (transition-all).
- `.dashboard-topbar`: Topbar navigasi (fixed).
- `.dashboard-page`: Area konten per halaman (padding).
