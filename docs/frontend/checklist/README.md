# Frontend Checklist (Reference)

> [!NOTE]
> **Dokumen ini bersifat reference.**
> Checklist ini berfungsi sebagai blueprint awal. Untuk status integrasi aktual, silakan merujuk ke [**docs/frontend/role-data-source-status.md**](../role-data-source-status.md) dan [**docs/frontend/route-inventory.md**](../route-inventory.md).


Checklist frontend adalah turunan dari [docs/alur](../../alur/README.md) ke kebutuhan UI/client.

Checklist ini belum berarti semua UI harus langsung dibuat. Checklist ini menjadi blueprint saat implementasi frontend dimulai.

## Tanggung Jawab Checklist
Setiap checklist harus menjawab:
- **Page/Route**: Alamat URL dan struktur halaman.
- **Components**: Komponen UI yang dibutuhkan.
- **User Actions**: Interaksi pengguna yang tersedia.
- **UI States**: Penanganan kondisi (Empty, Loading, Error, Success, Revision, Locked).
- **Role Visibility**: Kontrol tampilan elemen berdasarkan peran.
- **Data Display**: Informasi apa saja yang ditampilkan.
- **Form & Validation**: Aturan input di sisi client.
- **Integrasi API**: Service/API yang diperlukan.

## Standar Checklist Atomik

Setiap checklist frontend sebaiknya tidak hanya mencatat route dan component umum, tetapi juga menurunkan workflow menjadi kontrak UI yang lebih detail.

Tambahkan bagian berikut secara bertahap pada setiap checklist workflow:

### Page Contract
Menjelaskan halaman, route, actor, tujuan halaman, dan sumber data.

### Component Contract
Menjelaskan komponen, penggunaan, data/props, dan catatan perilaku.

### Service Mapping
Menjelaskan action UI ke service/API yang dipanggil.

### Role Visibility Matrix
Menjelaskan elemen UI yang terlihat/tersembunyi berdasarkan role.

### UI State Contract
Menjelaskan empty, loading, error, success, revision, locked, readonly state.

### Acceptance Criteria
Menjelaskan kondisi minimal agar UI dianggap selesai.

## Template Frontend Checklist Atomik

### Page Contract
| Page | Route | Actor | Purpose | Data Source |
|---|---|---|---|---|

### Component Contract
| Component | Used By | Data / Props | Notes |
|---|---|---|---|

### Service Mapping
| UI Action | Service/API | Success State | Error State |
|---|---|---|---|

### Role Visibility Matrix
| UI Element | Admin | Pengawas | Mandor | Konsumen | Notes |
|---|---|---|---|---|---|

### UI State Contract
| State | Trigger | UI Behavior |
|---|---|---|

### Acceptance Criteria
- [ ] ...

## Urutan Baca
1. [**Business Workflow**](../../alur/README.md)
2. [**Role Data Source Status**](../role-data-source-status.md)
3. [**Route Inventory**](../route-inventory.md)
4. [**Frontend Roles Documentation**](../roles/README.md)
5. [**Frontend Checklist (Pilih Workflow)**](./README.md)

## Daftar Checklist Workflow
- [Verifikasi Progres Proyek](./project-progress.md)
- [Jurnal Mingguan Mandor](./jurnal-mingguan-mandor.md)
- [Laporan Mingguan Pengawas](./laporan-mingguan-pengawas.md)
- [Pengajuan Material Mandor](./material-request.md)
- [Pengajuan Pembayaran Mandor](./payment-foreman.md)
- [Publikasi Progres ke Konsumen](./progress-to-customer.md)
- [Dev Sign-In & Persona Session](./dev-sign-in-persona-session.md)
