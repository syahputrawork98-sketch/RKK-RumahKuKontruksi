# Tables Definition

Dokumen ini berisi detail teknis untuk setiap tabel yang ada di database RKK, mencakup fungsi tabel, relasi utama, dan keterkaitannya dengan workflow aplikasi.

## Daftar Domain Tabel

### [1. Core Project Tables](./core-project.md)
Tabel: `customers`, `projects`, `project_stages`.

### [2. Role Master (Persona) Tables](./role-master.md)
Tabel: `superadmins`, `admins`, `supervisors`, `foremen`, `architects`, serta tabel Certificate dan Experience pendukung.

### [3. RAB Tables](./rab.md)
Tabel: `rab_plans`, `rab_categories`, `rab_items`.

### [4. Material Request Tables](./material-request.md)
Tabel: `material_requests`, `material_request_items`, `material_request_history`.

### [5. Weekly Journal Tables](./weekly-journal.md)
Tabel: `weekly_journals`, `weekly_journal_activities`, `weekly_journal_photos`, `weekly_journal_review_logs`.

### [6. Supervisor Weekly Report Tables](./supervisor-weekly-report.md)
Tabel: `supervisor_weekly_reports`, `supervisor_weekly_report_journals`, `supervisor_weekly_report_notes`, `supervisor_weekly_report_review_logs`.

### [7. Progress Verification Tables](./progress-verification.md)
Tabel: `progress_verification_logs` dan atribut verified progress pada tabel utama.

---
**Status**: Draft / Generated from Prisma Schema
**Note**: Penamaan tabel di sini merujuk pada nama fisik di database PostgreSQL (hasil dari `@map` dan `@@map`).
