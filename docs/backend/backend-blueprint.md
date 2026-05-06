# Backend Blueprint - RumahKu Kontruksi

## Gambaran Umum
Backend RumahKu Kontruksi dirancang untuk menjadi tulang punggung platform jasa konstruksi dan manajemen proyek yang profesional, transparan, dan akuntabel.

## Stack Teknologi Terencana
- **Runtime**: Node.js
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma ORM
- **Auth**: JWT / Supabase Auth

## Arsitektur
- **Modular Monolith**: Struktur kode dipisahkan per modul fungsional agar mudah dipahami dan dikembangkan.
- **Microservices Ready**: Desain modular memungkinkan pemisahan menjadi microservices di masa depan jika beban sistem meningkat.
- **Clean Architecture**: Memastikan logika bisnis terpisah dari infrastruktur luar.

## Prinsip Utama
1. **Role-Based Access Control (RBAC)**: Akses data dibatasi ketat berdasarkan peran pengguna.
2. **Workflow-Based System**: Setiap perubahan status proyek harus melalui tahapan yang telah ditentukan.
3. **Approval-Based Process**: Pekerjaan kritis (seperti perubahan RAB atau termin pembayaran) memerlukan persetujuan dari pihak terkait.
4. **Audit Trail**: Seluruh aktivitas penting dicatat untuk kebutuhan audit dan transparansi.
5. **No Data Loss**: Histori penting tidak boleh dihapus secara permanen (Soft Delete).
6. **No Status Jumping**: Status proyek harus mengikuti urutan logis.
7. **Change Order Transparency**: Setiap perubahan scope pekerjaan di lapangan harus terdokumentasi (Variation Order).

## Fungsi Utama
- **Auth & Session**: Manajemen login, logout, dan profil.
- **User & Role**: Manajemen data pengguna dan hak akses.
- **Manajemen Proyek**: Database proyek dari kontrak hingga serah terima.
- **Estimasi/RAB**: Pengelolaan anggaran dan biaya material/tenaga kerja.
- **Laporan Progres**: Pencatatan progres harian dan mingguan dari lapangan.
- **Manajemen Material**: Permintaan dan pengadaan material proyek.
- **Approval Engine**: Sistem persetujuan berjenjang.
- **Payment & Termin**: Manajemen tagihan dan termin pembayaran konsumen.
- **Dokumen & File**: Penyimpanan file kontrak, gambar kerja, dan foto progres.
- **Notifikasi**: Pemberitahuan real-time terkait progres dan approval.
- **Audit Log**: Pencatatan jejak aktivitas sistem.
