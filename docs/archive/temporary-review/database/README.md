# Dokumentasi Database RumahKu Konstruksi (RKK)

Selamat datang di dokumentasi teknis database untuk proyek **RumahKu Konstruksi (RKK)**. Dokumentasi ini memberikan panduan mendalam mengenai struktur data, relasi antar tabel, dan prinsip *source of truth* yang digunakan dalam sistem.

## Teknologi Utama
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Schema Reference**: [schema.prisma](../../server/prisma/schema.prisma)

## Tujuan Dokumentasi
Dokumentasi ini dibuat untuk membantu pengembang memahami bagaimana data mengalir di dalam sistem RKK, terutama dalam membedakan antara klaim lapangan (*Mandor Claims*) dan progress resmi (*Verified Progress*).

Dokumentasi ini merupakan layer tersendiri yang sejajar dengan dokumentasi lainnya:
- `docs/alur/`: Fokus pada workflow bisnis dan proses manual.
- `docs/backend/`: Fokus pada implementasi API dan logika server.
- `docs/frontend/`: Fokus pada antarmuka pengguna dan konsumsi data.
- **`docs/database/`**: Fokus pada skema, relasi tabel, ERD, dan pemetaan data teknis.

---

## Daftar Isi

### [1. Ringkasan Skema (Schema Overview)](./schema-overview.md)
Ringkasan seluruh model/tabel yang dikelompokkan berdasarkan domain bisnis (Core Project, Role Master, RAB, dll).

### [2. Prinsip Sumber Data (Source of Truth)](./source-of-truth.md)
Penjelasan kritis mengenai mana data yang dianggap valid secara sistem, terutama terkait progress proyek dan verifikasi lapangan.

### [3. Konvensi & Standar (Conventions)](./conventions.md)
Aturan penamaan, tipe data khusus (Decimal, JSON), penanganan *soft delete*, dan audit logs.

### [4. Entity Relationship Diagrams (ERD)](./erd/README.md)
Visualisasi relasi antar tabel menggunakan diagram Mermaid, mulai dari gambaran umum hingga modul spesifik.

### [5. Detail Tabel (Tables Definition)](./tables/README.md)
Penjelasan mendalam untuk setiap tabel, kolom kunci, dan fungsinya dalam alur kerja aplikasi.

---

## Catatan Penting
> [!IMPORTANT]
> **Source of truth** teknis untuk struktur database tetap berada pada file `server/prisma/schema.prisma`. Dokumentasi ini berfungsi sebagai panduan visual dan kontekstual, bukan sebagai pengganti skema Prisma tersebut.
