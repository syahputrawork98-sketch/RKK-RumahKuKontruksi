# FITUR – RKK RumahKu Konstruksi (Masa Transisi)

> **Status Saat Ini: Transisi Arsitektur dan Pengarsipan**
> 
> Seluruh dokumentasi mengenai fitur, role, modul bisnis, dan arsitektur legacy (sebelumnya berbasis Express dan Supabase) **tidak lagi dinyatakan sebagai keputusan aktif yang telah disahkan di GitHub**.
> 
> - **Sumber Keputusan Resmi (Source of Truth):** Dokumen perencanaan dan produk bisnis dikelola secara terpusat di **Google Drive**.
> - **Implementasi Aktual:** GitHub ini murni menunjukkan implementasi kode *(working tree)* yang sedang dibangun ulang dari awal (refactor).

## ⚠️ Peringatan Kondisi Sistem
- **`apps/web/`**: Sedang dipersiapkan sebagai frontend baru berbasis React + Vite.
- **`apps/backend/`**: Sedang dipersiapkan sebagai arsitektur target backend baru. (Tidak lagi menggunakan Express).
- **`client/` & `server/`**: Adalah *baseline legacy code* yang hanya dipertahankan sementara sebagai referensi, namun bukan sistem target yang berjalan.

## 🗄️ Arsip Historis (Sistem Lama)
Bagi tim developer yang membutuhkan informasi historis mengenai role, proses bisnis, atau skema API sistem lama yang belum direfactor, silakan merujuk pada direktori arsip:

- **Folder Utama Arsip:** `archive/docs-legacy/`
- [Arsip Dashboard Status Proyek](archive/docs-legacy/project/history/CURRENT_STATUS.md)
- [Arsip Riwayat Indeks Fitur](archive/docs-legacy/project/history/FEATURE_HISTORY.md)
- [Arsip Arsitektur Frontend](archive/docs-legacy/frontend/README.md)
- [Arsip Arsitektur Backend](archive/docs-legacy/backend/README.md)
- [Arsip Arsitektur Database](archive/docs-legacy/database/README.md)

Harap diingat bahwa sistem lama yang terdokumentasi dalam `archive/docs-legacy` berada dalam status *Hold* / *Deprecated*.
