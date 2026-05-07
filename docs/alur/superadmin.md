# Peran: Superadmin

**Status**: Implemented (DB-backed Persona)

## Deskripsi
Superadmin adalah peran di level sistem/global yang memiliki akses ke seluruh data master dan log aktivitas sistem.

## Tanggung Jawab
- Manajemen data master (Admin, Pengawas, Mandor, Arsitek).
- Monitoring aktivitas sistem melalui Log Aktivitas.
- Pengaturan parameter global sistem.
- Backup dan manajemen integritas data.

## Alur Kerja (Local Development)
- Superadmin dipilih melalui **Superadmin Switcher** di Topbar.
- Data identitas diambil dari database lokal (`superadmins`).
- Belum menggunakan sistem autentikasi produksi (Auth/JWT).
