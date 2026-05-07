# Peran: Admin

**Status**: Implemented (DB-backed Persona)

## Deskripsi
Admin adalah entitas internal RKK yang bertanggung jawab penuh atas manajemen administratif proyek yang ditugaskan kepadanya.

**Catatan Penting**:
- Admin adalah **satu role tunggal**. Tidak ada pembagian sub-role seperti Admin Proyek, Admin Keuangan, atau Admin Operasional.
- Admin adalah orang/individu yang tercatat di database (`admins`).

## Batasan & Tanggung Jawab
1. **Kapasitas Maksimal**: Satu Admin hanya boleh bertanggung jawab atas maksimal **3 proyek aktif** secara bersamaan.
2. **Cakupan Administrasi**:
   - Manajemen data konsumen dan pengajuan.
   - Pembuatan dan pengelolaan data proyek.
   - Pengelolaan Gambar Kerja dan RAB.
   - Monitoring pembayaran (Invoice/Tagihan).
   - Koordinasi administratif dengan tim lapangan (Pengawas/Mandor).
   - Update status administratif proyek.

## Alur Kerja (Local Development)
- Admin dipilih melalui **Admin Switcher** di Topbar.
- Data identitas (Nama, Foto, Email) diambil langsung dari database lokal.
- Saat membuat proyek baru, Admin harus ditugaskan (adminId). Sistem akan memvalidasi apakah Admin tersebut masih memiliki kapasitas ( < 3 proyek aktif).
