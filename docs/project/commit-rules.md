# Panduan Commit Message Project RKK

Aturan ini bersifat **PATEN** dan wajib diikuti untuk setiap perubahan dalam repositori RumahKu Konstruksi.

## 1. Format Dasar
`type(area - role/domain): keterangan detail`

*Contoh:*
- `style(client - superadmin): polish sidebar and topbar with dashboard theme`
- `feat(server - admin): add project summary endpoint for admin dashboard`

## 2. Tipe Perubahan (Type)
- `feat`: Penambahan fitur baru
- `fix`: Perbaikan bug/error
- `style`: Perubahan UI/CSS (tanpa mengubah logic)
- `refactor`: Perapihan struktur kode
- `docs`: Perubahan dokumentasi
- `chore`: Konfigurasi, cleanup, dependency
- `test`: Testing
- `perf`: Performa
- `build`: Build system/package
- `ci`: CI/CD workflow

## 3. Area Project
- `client`: Frontend (React/Vite)
- `server`: Backend (Express/API)
- `prisma`: Database (Schema, Migration, Seed)
- `docs`: Dokumentasi umum
- `frontend`: Khusus docs frontend
- `backend`: Khusus docs backend
- `project`: Roadmap, progress, roadmap umum
- `config`: Konfigurasi
- `global`: Perubahan lintas area

## 4. Role / Domain
- **Role**: `superadmin`, `admin`, `pengawas`, `mandor`, `arsitek`, `konsumen`, `public`
- **Domain**: `auth`, `project`, `customer`, `rab`, `payment`, `timeline`, `theme`
- **Global**: `global` (untuk perubahan lintas role/domain)

## 5. Aturan Tambahan
- **Bahasa**: Wajib menggunakan Bahasa Inggris yang singkat dan jelas.
- **Granularitas**: Satu commit per bagian yang logis (jangan mencampur banyak area).
- **Push**: Segera lakukan push setelah commit yang aman dan selesai.

---
*Aturan ini mulai berlaku efektif sejak: 7 Mei 2026*
