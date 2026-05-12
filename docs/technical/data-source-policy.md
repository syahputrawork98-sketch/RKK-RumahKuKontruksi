# Technical: Data Source Policy - RKK RumahKu Konstruksi

Dokumen ini mengatur kebijakan penggunaan data (Database vs Mock) untuk menjaga integritas sistem selama transisi integrasi.

## 🛡️ Kebijakan DB-Backed (Database)
- **Role Operasional (Mandor/Pengawas)**: **Wajib** menggunakan data dari database rill untuk seluruh fitur pelaporan (Jurnal, Laporan, Verifikasi, Material Request).
- **No Mock Fallback**: Jika API mengembalikan data kosong atau server mati, UI harus menampilkan **Empty State** atau **Error State**, dilarang keras menampilkan data mock/dummy sebagai pengganti.

## 🏗️ Kebijakan Mock Data
- **Legacy Components**: Komponen lama yang belum disentuh batch integrasi diperbolehkan menggunakan mock data sementara.
- **UI Prototyping**: Fitur baru yang belum memiliki skema backend boleh menggunakan mock data selama fase draf UI.
- **Seeding**: Mock data digunakan sebagai referensi untuk sistem **Modular Seed** guna mengisi database lokal.

## 🛡️ Error Handling Policy
- Jika API Backend mengembalikan error (misal: Server mati), UI harus menampilkan komponen `ErrorState` atau pesan error yang jelas, bukan kembali menampilkan mock data secara otomatis.

## 👤 Role Authority & Profile Governance
- **Superadmin**: Pengelola direktori persona lokal (CRUD entitas simulasi).
- **Admin**: Operator proyek; hanya dapat mengubah profil sendiri.
- **Role Lain**: Hanya dapat mengubah profil sendiri dengan batasan field penting yang memerlukan validasi di masa depan.
- **Profile Change Approval**: Perubahan data sensitif (Email, HP, NIK) diarahkan ke antrian persetujuan Admin/Superadmin.

---
*Status: Mandor, Pengawas, Admin, Arsitek, dan Konsumen Dashboard sudah sepenuhnya DB-Backed.*
