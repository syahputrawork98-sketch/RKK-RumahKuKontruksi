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

## 6. Pending Files & Commit Grouping Rules

Aturan ini ditambahkan untuk memastikan histori commit tetap bersih dan terorganisir berdasarkan logical scope.

1. **Wajib Cek Status**: Sebelum membuat commit, wajib menjalankan:
   ```bash
   git status
   ```

2. **Hindari `git add .`**: Jangan langsung menggunakan `git add .` kecuali seluruh file pending benar-benar berasal dari satu scope pekerjaan yang sama.

3. **Logical Grouping**: Semua file pending harus diperiksa dan dikelompokkan dulu berdasarkan logical scope.
   *Contoh scope:*
   - `client - pengawas`
   - `client - admin`
   - `server - pengawas`
   - `server - projects`
   - `prisma - schema`
   - `docs - project`
   - `config - local`
   - `assets - ui`

4. **Satu Commit, Satu Logical Unit**: Satu commit hanya boleh berisi satu logical unit perubahan.
   *Contoh yang benar:*
   - Perubahan UI halaman Pengawas -> `client - pengawas`
   - Perubahan endpoint backend Pengawas -> `server - pengawas`
   - Perubahan Prisma schema -> `prisma - schema`
   - Perubahan dokumentasi commit rules -> `docs - project`

5. **Jangan Mencampur Area**: Jangan mencampur file berbeda area dalam satu commit besar. Pisahkan sesuai scope masing-masing.

6. **Buat Commit Plan**: Sebelum commit, buat commit plan singkat berdasarkan file pending.
   *Format commit plan:*
   ```text
   Pending files:
   - path/file-1
   - path/file-2
   - path/file-3

   Commit groups:
   1. feat(client - pengawas): ...
      Files:
      - ...
   2. feat(server - pengawas): ...
      Files:
      - ...
   3. docs(project - global): ...
      Files:
      - ...
   ```

7. **Spesifik `git add`**: Setelah menentukan commit group, gunakan `git add` secara spesifik.
   ```bash
   git add client/src/pages/pengawas/PengaturanPengawasPage.jsx
   git commit -m "feat(client - pengawas): add certificate management form"
   ```

8. **Verifikasi Post-Commit**: Setelah setiap commit, wajib cek ulang `git status` untuk memastikan masih ada file pending lain yang harus dikomit terpisah.

9. **Format Message**: Commit message tetap mengikuti format: `type(area - role/domain): description`
   *Contoh:*
   - `feat(client - pengawas): add supervisor certificate crud ui`
   - `feat(server - pengawas): add supervisor experience crud endpoint`
   - `docs(project - global): update commit grouping rules`
   - `chore(config - local): update local development env example`

10. **Berlaku ke Depan**: Aturan ini berlaku untuk semua pekerjaan ke depan. Jangan memperbaiki atau mengubah commit lama hanya karena belum mengikuti aturan ini.

11. **Dependensi Layer**: Jika ada perubahan yang saling bergantung, pisahkan commit berdasarkan layer:
    - `prisma/schema` (Database)
    - `server endpoint/controller` (Backend)
    - `client UI/service` (Frontend)
    - `docs` (Dokumentasi)

12. **Hindari Pesan Umum**: Hindari commit besar dengan pesan umum seperti `update project`, `fix all`, `changes`, `progress`, atau `wip besar`. Gunakan commit kecil, jelas, dan bisa ditelusuri.

---
*Aturan ini mulai berlaku efektif sejak: 7 Mei 2026*
