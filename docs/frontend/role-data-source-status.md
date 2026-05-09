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
- **No Fallback**: Jika database kosong, tampilkan *Empty State* proyek, jangan tampilkan data mock.
- **Operational Status**: 
  - Verifikasi progres, laporan mingguan, jurnal mandor: **DB-Backed v1 / Integrated**.
  - Dokumentasi: **Shell / Backend Pending**.
  - Request material: **Local Stabilized / DB-Backed v1**.

### 2. Mandor / Foreman
Status: **Database-Backed v1**
- **Context**: `ForemanPersonaContext`
- **Services**: `foremanService`, `projectService`
- **Dependency**: Membutuhkan seleksi persona melalui `ForemanSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Projects**: Seluruh statistik dan daftar proyek ditarik dari database berdasarkan `foremanId`.
- **Operational Status**: 
  - Jurnal Mingguan: **DB-Backed v1 / Integrated**.
  - Tugas harian, laporan harian, dokumentasi, kendala: **Shell / Backend Pending**.
  - Request material: **Local Stabilized / DB-Backed v1**.

### 3. Arsitek / Architect
Status: **Database-Backed v1**
- **Context**: `ArchitectPersonaContext`
- **Services**: `architectService`
- **Dependency**: Membutuhkan seleksi persona melalui `ArchitectSwitcher` (Dev Mode).

**Behavior UI:**
- **No Persona Selected**: Menampilkan `RolePersonaEmptyState` (Wajib).
- **Dashboard & Profil**: Nama, email, spesialisasi, sertifikat, dan pengalaman ditarik dari database.
- **Design Workflow**: Halaman Permintaan Desain, File Desain, Revisi, dll: **Mock-First / Backend Pending**.
- **No Fallback**: Data profil utama dilarang fallback ke mock.

### 4. Admin
Status: **Database-Backed v1**
- **Services**: `projectService`, `customerService`, `supervisorService`, `foremanService`, `architectService`
- **Dependency**: Tidak membutuhkan persona context khusus (Global Admin role).

**Behavior UI:**
- **Dashboard**: Statistik rill dari database.
- **Manajemen Proyek**: CRUD Proyek (List, Detail, Create): **DB-Backed v1**.
- **RAB**: Data RAB (Read-First): **Partial**.
- **Penugasan Tim**: Data Pengawas dan Mandor: **DB-Backed v1**.
- **Operational Data**: 
  - Laporan Progress Terverifikasi, Review Laporan Pengawas: **DB-Backed v1 / Integrated**.
  - Pembayaran: **Shell / Backend Pending**.
  - Request Material: **Local Stabilized / DB-Backed v1**.

---

### 5. Superadmin
Status: **Partial / UI Shell**
- **Context**: `SuperadminPersonaContext`
- **Services**: `superadminService`
- **Behavior UI**: Entity API sudah ada (DB-Backed v1 untuk profil/list), namun alur kerja manajemen sistem secara penuh masih bersifat **Partial / UI Shell / Mock**.

### 6. Konsumen
Status: **Partial / Data Foundation Ready**
- **Services**: `customerService`, `designRequestService`, `projectService`
- **Dashboard & Monitoring**: Design Request dan monitoring proyek sudah memiliki jalur backend lokal, tetapi beberapa detail UI masih perlu verifikasi integrasi.
- **CRUD Profil**: Customer API (`GET /api/customers/:id`, `PATCH /api/customers/:id`) dan seed persona `customer-001` sampai `customer-003` siap untuk integrasi Gemini.
- **Hold**: Password, auth production, upload foto rill, dan RBAC production tetap ditunda.

---

## Aturan Penggunaan Mock Data
Untuk menghindari kerancuan data selama pengembangan:

1. **Role dengan Status DB-Backed v1**:
    - **TIDAK BOLEH**: Menggunakan mock data untuk halaman yang sudah ditandai DB-backed.
    - **ERROR HANDLING**: Jika API kosong atau error, tampilkan *Empty State* atau *Error State*, bukan fallback ke mock.
    - **MOCK EXCEPTION**: Hanya boleh digunakan untuk modul operasional yang memang belum memiliki backend final (ditandai *Experimental* atau *Backend Pending*).

1. **Mock Data untuk Pengawas/Mandor/Arsitek**:
    - **BOLEH**: Digunakan untuk *Seeding* database lokal (`npm run db:seed`).
    - **BOLEH**: Digunakan sebagai referensi struktur objek data di komponen UI.
    - **TIDAK BOLEH**: Digunakan sebagai fallback data jika API backend kosong atau error.
    - **TIDAK BOLEH**: Membuat mock fallback untuk operational pages seolah-olah data sudah nyata. Jika backend belum ada, UI boleh menampilkan placeholder/0/belum tersedia dengan catatan TODO.

2. **Mock Data untuk Role Lain**:
    - **BOLEH**: Digunakan sebagai sumber data utama hingga modul backend terkait diimplementasikan.

## Dev Sign-In & Persona Session

Selama local development, sistem menggunakan Dev Sign-In untuk memilih role dan persona dari database.

- **Dev Sign-In bukan auth produksi.**
- Tidak memakai password/JWT.
- Session disimpan di localStorage dengan key `rkk.devAuth`.
- **Legacy Persona Sync**: Persona yang dipilih disinkronkan ke key localStorage lama per role (misal: `rkk.dev.selectedSupervisorId`) agar context existing tetap bekerja.
- **Role Arsitek**: Wajib tersedia di pilihan Dev Sign-In dan menggunakan endpoint `/api/architects`.
- **Pola Utama**: Pengawas dan Mandor digunakan sebagai standar referensi implementasi.
- **Auth/JWT/RBAC tetap Postponed.**

## Error Handling Policy
- Jika API Backend mengembalikan error (misal: Server mati), UI harus menampilkan komponen `ErrorState` atau pesan error yang jelas, bukan kembali menampilkan mock data secara otomatis.
