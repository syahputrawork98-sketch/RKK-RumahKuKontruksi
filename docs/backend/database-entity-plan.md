## Implemented Entities (Baseline v0)
Berikut adalah entitas yang sudah diimplementasikan dalam skema Prisma:

| Entity | Purpose | Status |
|---|---|---|
| **Customer** | Data profil pelanggan (Individual/Company). | Implemented |
| **Project** | Inti data proyek konstruksi. | Implemented |
| **ProjectStage** | Tahapan/Timeline dalam sebuah proyek. | Implemented |
| **RabPlan** | Header Rencana Anggaran Biaya. | Implemented |
| **RabCategory** | Kategori pekerjaan dalam RAB. | Implemented |
| **RabItem** | Detail item pekerjaan, volume, dan harga. | Implemented |

## Planned Entities (Future Phases)
- **User & Role**: Identitas login dan RBAC.
- **DailyReport**: Laporan harian aktivitas fisik.
- **MaterialRequest**: Pengadaan material lapangan.
- **Payment & Invoice**: History transaksi keuangan.

> [!IMPORTANT]
> Skema database saat ini dikelola melalui **Prisma Migrations**. Struktur database lama (33 tabel) telah dibersihkan dan dimulai ulang dari baseline migrasi `init_core_data_service`.
