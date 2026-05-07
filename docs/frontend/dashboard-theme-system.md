# Dashboard Theme System

Sistem desain terpusat untuk seluruh dashboard internal (Superadmin, Admin, Pengawas, Mandor, Arsitek, dan Konsumen Dashboard). Sistem ini memisahkan styling dashboard dari website publik untuk menjaga profesionalisme dan mendukung fitur mode terang/gelap.

## Struktur CSS

File styling dashboard terletak di `client/src/styles/`:

1.  **`dashboard-theme.css`**: Berisi CSS variables (tokens) untuk warna, background, dan border. Mendukung mode `.dark`.
2.  **`dashboard-components.css`**: Berisi class reusable seperti `.dashboard-card`, `.dashboard-sidebar`, dll.
3.  **`index.css`**: Entry point yang mengimpor kedua file di atas.

## Theme Tokens (CSS Variables)

Gunakan variabel berikut untuk menjaga konsistensi:

| Variabel | Deskripsi |
| :--- | :--- |
| `--dashboard-bg` | Background utama halaman dashboard. |
| `--dashboard-surface` | Background komponen (card, modal). |
| `--dashboard-text` | Warna teks utama. |
| `--dashboard-primary` | Warna brand utama (RKK Teal). |
| `--dashboard-border` | Warna garis pembatas standar. |

## Reusable Classes

| Class | Kegunaan |
| :--- | :--- |
| `.dashboard-shell` | Wrapper utama layout (sidebar + main). |
| `.dashboard-page` | Wrapper konten halaman (dengan padding & mt). |
| `.dashboard-card` | Kontainer card standar dengan rounded & shadow. |
| `.dashboard-title` | Style judul halaman/section. |
| `.dashboard-primary-button` | Tombol utama dashboard. |

## Mode Terang & Gelap

Sistem sudah menyiapkan token untuk dark mode. Untuk mengaktifkannya, tambahkan class `dark` pada elemen `html` atau `body`.

```css
/* Contoh penggunaan di dashboard-theme.css */
.dark {
  --dashboard-bg: #020617;
  --dashboard-surface: #0f172a;
  ...
}
```

## Implementasi di Superadmin

Superadmin saat ini menjadi **Lead Design Reference**. Seluruh frame Superadmin (Layout, Sidebar, Topbar) sudah menggunakan sistem ini. Role lain disarankan melakukan replikasi dari struktur Superadmin.
