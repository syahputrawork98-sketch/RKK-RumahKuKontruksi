# Module: Superadmin - RKK RumahKu Konstruksi

Role Superadmin berfungsi sebagai pengawas sistem global dan pengelola direktori persona lokal.

## 🏗️ Fitur Utama
- **Persona Directory**: CRUD entitas persona lintas role (Admin, Mandor, Pengawas, Arsitek, Konsumen).
- **Global Monitoring**: Memantau statistik proyek secara global dan log aktivitas database.
- **Audit Center**: Melihat antrian persetujuan profil dan aktivitas sensitif lainnya.

## 🛡️ Batasan
- **Bukan Operator**: Superadmin tidak menjalankan workflow harian (seperti assign arsitek atau update progress).
- **No Production Auth**: Pengelolaan user tetap dalam konteks persona lokal tanpa sistem autentikasi rill.

---
*Status: Database-Backed Local CRUD / Monitoring Polish Stabilized.*
