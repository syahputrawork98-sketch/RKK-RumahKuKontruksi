# Database Conventions

Daftar konvensi yang digunakan dalam perancangan database RKK melalui Prisma ORM.

## 1. Naming Convention
- **Prisma Models**: Menggunakan `PascalCase` (Contoh: `WeeklyJournal`).
- **PostgreSQL Tables**: Menggunakan `snake_case` dan bentuk jamak (*plural*). Dipetakan menggunakan atribut `@@map` (Contoh: `@@map("weekly_journals")`).
- **Fields/Columns**: Menggunakan `camelCase` di level Prisma dan `snake_case` di level database melalui atribut `@map` (Contoh: `createdAt DateTime @map("created_at")`).

## 2. Primary Keys & Identifiers
- Semua tabel utama menggunakan tipe data `String` dengan format **CUID** (`cuid()`) sebagai primary key.
- Penggunaan CUID dipilih untuk skalabilitas dan keamanan (tidak mudah ditebak seperti auto-increment integer).

## 3. Timestamps & Audit
- `createdAt`: Mencatat waktu pembuatan data (`@default(now())`).
- `updatedAt`: Mencatat waktu perubahan data terakhir (`@updatedAt`).
- `deletedAt`: Digunakan untuk mekanisme **Soft Delete**. Jika kolom ini berisi timestamp, data dianggap terhapus secara logis namun tetap ada secara fisik untuk kebutuhan audit/histori.

## 4. Formal Relations vs Reference Fields
Sistem membedakan dua cara menghubungkan data:
- **Formal Relation**: Didefinisikan di level Prisma dengan foreign key (Contoh: `Project.customerId`). Memungkinkan query relasional (`include`).
- **Reference Field**: Hanya menyimpan String ID dari tabel lain tanpa relasi formal di Prisma (Contoh: `Project.verifiedProgressById`). Digunakan untuk snapshot historis atau audit trail ringan tanpa menambah kompleksitas join query.

## 5. Tipe Data Khusus
- **Decimal**: Digunakan untuk nilai uang, volume, dan kuantitas material (`Decimal` di Prisma, `Decimal(15,2)` atau `Decimal(12,3)` di PostgreSQL). Ini untuk menghindari *rounding error* yang biasa terjadi pada tipe data Float/Double.
- **Json**: Digunakan untuk data yang bersifat dinamis seperti `skillTags` atau `teamSummary` yang tidak memerlukan struktur relasional kaku.
- **Boolean**: Digunakan untuk flags sederhana seperti `isVerified` atau `isAdditionalMaterial`.

## 5. History & Logs Table
Sistem RKK menggunakan tabel log/history untuk setiap workflow kritikal:
- `MaterialRequestHistory`: Melacak setiap perubahan status permintaan material.
- `WeeklyJournalReviewLog`: Melacak interaksi Pengawas terhadap jurnal Mandor.
- `SupervisorWeeklyReportReviewLog`: Melacak interaksi Admin terhadap laporan Pengawas.
- `ProgressVerificationLog`: Melacak riwayat perubahan progress fisik proyek.

## 6. Referensi ID Non-Eksplisit
Beberapa field merujuk ke ID dari tabel lain namun tidak didefinisikan sebagai relasi formal di Prisma (untuk performa atau karena sifat data yang bersifat snapshot), contoh: `verifiedProgressById` yang menyimpan ID Pengawas.
