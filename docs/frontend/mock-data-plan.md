# Mock Data Plan

Untuk mempercepat pengembangan UI/UX tanpa ketergantungan backend, aplikasi menggunakan sistem mock data terpusat sebagai *single source of truth*.

## Struktur Terimplementasi
Lokasi: `client/src/data/mock/`

| Mock Table | File | Status | Deskripsi |
|---|---|---|---|
| Users | `users.js` | **Updated** | Akun dasar semua role |
| Roles | `roles.js` | **Updated** | Definisi label dan permission role |
| Customers | `customers.js` | **Done** | Profil konsumen (Individual & Company) |
| Customer Members | `customerProjectMembers.js`| **Done** | Akun tambahan/viewer pihak konsumen |
| Project Comments | `projectComments.js` | **Done** | Komentar/diskusi pada proyek |
| Admins | `admins.js` | **Done** | Profil admin (Kapasitas: 3 proyek) |
| Supervisors | `supervisors.js` | **Done** | Profil pengawas (Kapasitas: 3 proyek) |
| Foremen | `foremen.js` | **Updated** | Mandor sebagai Vendor Lapangan (Kapasitas: 2) |
| Foreman Certs | `foremanCertificates.js` | **Done** | Sertifikat mandor terpisah |
| Projects | `projects.js` | **Updated** | Data proyek utama |
| Notifications | `notifications.js` | **Done** | Notifikasi tertarget |

## Konsep Mandor sebagai Vendor
*   **External Partner**: Mandor diposisikan sebagai pihak luar/vendor lapangan.
*   **No Worker Detail**: RKK tidak mengelola data tukang secara individu. Manajemen tukang adalah urusan internal Mandor.
*   **Team Summary**: Informasi tim lapangan cukup direpresentasikan melalui `teamSummary` (estimasi jumlah personil dan skill utama).

## Skema Kapasitas Staf
*   **Admin**: Maksimal **3 proyek aktif**.
*   **Pengawas**: Maksimal **3 proyek aktif**.
*   **Mandor**: Maksimal **2 proyek aktif**.

## Relasi Data Utama
*   `User` (1) <-> (1) `Profile` (Customer/Admin/Staff)
*   `Project` (1) <-> (N) `Project Stages`
*   `Project` (1) <-> (N) `Project Comments`
*   `Profile` (1) <-> (N) `Certificates` (Mandor & Pengawas)

---
*Terakhir diperbarui: 7 Mei 2026*
