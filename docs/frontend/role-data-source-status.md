# Role Data Source Status

Panduan mengenai sumber data (Data Source) yang digunakan oleh setiap role di frontend selama fase transisi CRUD.

## Kebijakan Umum (Policy)
Sesuai dengan strategi pengembangan *Local CRUD Integration*:
1. **DB-Backed Roles**: Role yang sudah memiliki modul backend lengkap **dilarang** menggunakan mock data sebagai sumber data utama di UI.
2. **Mock-First Roles**: Role yang belum memiliki modul backend diperbolehkan tetap menggunakan mock data hingga tahap migrasi backend-nya dimulai.

---

## DB-Backed Roles (Database-Driven)

### 1. Pengawas / Supervisor
Status: **Database-Backed v1**
- **Context**: `SupervisorPersonaContext`
- **Services**: `supervisorService`, `projectService`
- **Dependency**: Membutuhkan seleksi persona melalui `SupervisorSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Projects**: Seluruh statistik dan daftar proyek ditarik dari database berdasarkan `supervisorId`.
- **No Fallback**: Jika database kosong, tampilkan *Empty State* proyek, jangan tampilkan data mock PRJ-001/002 lama.
- **Operational Status**: Operational pages seperti verifikasi progres, dokumentasi, laporan mingguan, dan request material belum dibuat backend operasionalnya. Halaman tersebut belum menjadi target CRUD sekarang dan akan dibahas setelah struktur Project/Progress/RAB stabil.

### 2. Mandor / Foreman
Status: **Database-Backed v1**
- **Context**: `ForemanPersonaContext`
- **Services**: `foremanService`, `projectService`
- **Dependency**: Membutuhkan seleksi persona melalui `ForemanSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Projects**: Seluruh statistik dan daftar proyek ditarik dari database berdasarkan `foremanId`.
- **Operational Data**: Bagian operasional (Tugas Harian, Laporan Harian) saat ini masih menggunakan tampilan statis karena backend modul tersebut sengaja ditunda.
- **Operational Status**: Operational pages seperti tugas harian, laporan harian, request material, dokumentasi, dan kendala lapangan belum dibuat backend operasionalnya. Halaman tersebut belum menjadi target CRUD sekarang dan akan dibahas setelah struktur Project/Progress/RAB stabil.

---

## Mock-First / Partial Roles (Development Stage)

Role-role berikut masih dalam tahap pengembangan UI shell dan diperbolehkan menggunakan mock data terpusat dari `client/src/data/mock/`:

- **Admin**
- **Superadmin**
- **Arsitek**
- **Konsumen**

*Catatan: Migrasi ke database untuk role ini akan dilakukan secara bertahap setelah modul operasional Pengawas & Mandor stabil.*

---

## Aturan Penggunaan Mock Data
Untuk menghindari kerancuan data selama pengembangan:

1. **Mock Data untuk Pengawas/Mandor**:
    - **BOLEH**: Digunakan untuk *Seeding* database lokal (`npm run db:seed`).
    - **BOLEH**: Digunakan sebagai referensi struktur objek data di komponen UI.
    - **TIDAK BOLEH**: Digunakan sebagai fallback data jika API backend kosong atau error.
    - **TIDAK BOLEH**: Membuat mock fallback untuk operational pages seolah-olah data sudah nyata. Jika backend belum ada, UI boleh menampilkan placeholder/0/belum tersedia dengan catatan TODO.

2. **Mock Data untuk Role Lain**:
    - **BOLEH**: Digunakan sebagai sumber data utama hingga modul backend terkait diimplementasikan.

## Error Handling Policy
- Jika API Backend mengembalikan error (misal: Server mati), UI harus menampilkan komponen `ErrorState` atau pesan error yang jelas, bukan kembali menampilkan mock data secara otomatis.
