# Design Tender Minimal Planning — Peluang Desain RKK
**Status: DONE / Implemented (Local Development Phase)**

## 1. Latar Belakang
Dalam ekosistem RKK, Arsitek diposisikan sebagai mitra profesional (mirip dengan Mandor). Untuk menciptakan ekosistem yang sehat dan transparan, pemilihan Arsitek untuk sebuah `DesignRequest` idealnya dilakukan melalui mekanisme penawaran (tender), bukan penunjukan langsung oleh Admin secara permanen.

Dokumen ini merancang fitur **Peluang Desain (Design Tender) Minimal** yang memungkinkan Arsitek mengajukan minat dan harga pengerjaan berdasarkan budget yang disediakan platform.

## 2. Alur Bisnis (Workflow)
Alur ini tetap mengandalkan `DesignRequest` sebagai data sumber awal.

1.  **Submission**: Konsumen membuat `DesignRequest` (Status: `submitted`).
2.  **Review & Publish**: Admin meninjau brief. Jika layak, Admin mem-publish request tersebut sebagai **Peluang Desain**.
3.  **Tender Open**: Muncul entitas `DesignTender` dengan status `open`.
4.  **Bidding**: Arsitek mitra melihat daftar Peluang Desain dan mengajukan **Penawaran Harga** (`DesignTenderBid`).
5.  **Selection**: Admin melihat daftar penawaran, meninjau profil Arsitek, dan memilih satu penawaran terbaik.
6.  **Awarding**:
    *   Tender status berubah menjadi `awarded`.
    *   Bid terpilih status berubah menjadi `selected`.
    *   `DesignRequest.architectId` diisi dengan ID Arsitek terpilih.
    *   `DesignRequest.status` berubah menjadi `assigned`.
7.  **Execution**: Arsitek melanjutkan pengerjaan desain seperti alur yang sudah ada.

*Catatan: Fitur Assign Langsung tetap dipertahankan sebagai fallback/manual override Admin.*

## 3. Perhitungan Harga & Komisi
Untuk fase minimal, sistem menggunakan pembagian flat:
*   **Total Jasa Desain** (`baseDesignFee`): Nilai total yang dibayar konsumen (dicatat di sistem).
*   **Komisi RKK** (`platformFeePercent`): **30%** dari total.
*   **Budget Mitra** (`drafterBudgetPercent`): **70%** dari total.

**Aturan Validasi**:
*   Arsitek hanya melihat **Budget Mitra** (70%).
*   Harga penawaran Arsitek (`bidAmount`) **tidak boleh melebihi** Budget Mitra (Mode Ketat).

## 4. Perancangan Schema (Prisma)

### Model: DesignTender
Berfungsi sebagai kontainer peluang desain yang dipublish.
```prisma
model DesignTender {
  id                   String    @id @default(cuid())
  designRequestId      String    @unique @map("design_request_id")
  title                String
  description          String?
  status               String    @default("open") // draft, open, closed, awarded, cancelled

  baseDesignFee        Decimal   @map("base_design_fee") @db.Decimal(15, 2)
  platformFeePercent   Decimal   @default(30) @map("platform_fee_percent") @db.Decimal(5, 2)
  drafterBudgetPercent Decimal   @default(70) @map("drafter_budget_percent") @db.Decimal(5, 2)
  platformFeeAmount    Decimal   @map("platform_fee_amount") @db.Decimal(15, 2)
  drafterBudgetAmount  Decimal   @map("drafter_budget_amount") @db.Decimal(15, 2)

  publishedAt          DateTime? @map("published_at")
  closedAt             DateTime? @map("closed_at")
  awardedAt            DateTime? @map("awarded_at")

  selectedBidId        String?   @map("selected_bid_id")

  createdAt            DateTime  @default(now()) @map("created_at")
  updatedAt            DateTime  @updatedAt @map("updated_at")
  deletedAt            DateTime? @map("deleted_at")

  designRequest        DesignRequest     @relation(fields: [designRequestId], references: [id])
  bids                 DesignTenderBid[]

  @@map("design_tenders")
}
```

### Model: DesignTenderBid
Berfungsi mencatat setiap penawaran dari Arsitek.
```prisma
model DesignTenderBid {
  id                    String    @id @default(cuid())
  designTenderId        String    @map("design_tender_id")
  architectId           String    @map("architect_id")

  bidAmount             Decimal   @map("bid_amount") @db.Decimal(15, 2)
  message               String?
  estimatedDurationDays Int?      @map("estimated_duration_days")
  status                String    @default("submitted") // submitted, selected, rejected, withdrawn

  createdAt             DateTime  @default(now()) @map("created_at")
  updatedAt             DateTime  @updatedAt @map("updated_at")
  deletedAt             DateTime? @map("deleted_at")

  designTender          DesignTender @relation(fields: [designTenderId], references: [id])
  architect             Architect    @relation(fields: [architectId], references: [id])

  @@map("design_tender_bids")
}
```

## 5. Rencana Endpoint API

### Admin / Superadmin
*   `GET /api/design-tenders`: List semua tender.
*   `POST /api/design-tenders`: Create tender (Publish dari DesignRequest).
*   `GET /api/design-tenders/:id/bids`: Lihat semua penawaran untuk tender tertentu.
*   `POST /api/design-tenders/:id/award/:bidId`: Memilih pemenang dan menutup tender.

### Arsitek
*   `GET /api/design-tenders?status=open`: Melihat peluang yang tersedia.
*   `POST /api/design-tender-bids`: Mengajukan penawaran.
*   `GET /api/design-tender-bids/my`: Melihat riwayat penawaran sendiri.

## 6. Rencana Perubahan UI

### Admin Dashboard
*   Tab baru: **Peluang Desain**.
*   Pada Detail `DesignRequest`, tambahkan tombol **"Publish ke Peluang Desain"**.
*   Modal publish dengan input `Total Jasa Desain`, otomatis kalkulasi 30/70.

### Arsitek Dashboard
*   Tab baru: **Peluang Desain**.
*   Card list untuk tender yang open.
*   Modal **Ajukan Penawaran** dengan input harga dan durasi.

### Konsumen Dashboard
*   Hanya update label status (e.g., "Mencari Arsitek", "Arsitek Terpilih").
*   **Tidak menampilkan** pembagian komisi atau harga bid Arsitek.

## 7. Batasan Scope (Scope Guard)
*   ❌ Tidak ada sistem pembayaran (Payment Gateway).
*   ❌ Tidak ada invoice atau faktur otomatis.
*   ❌ Tidak ada chat atau negosiasi harga di dalam sistem.
*   ❌ Tidak ada upload file portofolio/proposal di dalam bid (Gunakan profil arsitek).
*   ❌ Tidak ada sistem rating otomatis berdasarkan tender.
*   ❌ Tetap menggunakan **Persona Switcher** (Tanpa Auth Production).

## 9. Final Status & Implementation Summary
Seluruh fitur yang direncanakan dalam dokumen ini telah berhasil diimplementasikan:
- ✅ **Schema**: Model `DesignTender` dan `DesignTenderBid` sudah tersedia.
- ✅ **Backend Logic**: Kalkulasi 30/70 komisi platform otomatis saat publish.
- ✅ **Bidding**: Arsitek dapat submit penawaran dengan validasi budget ketat (max 70%).
- ✅ **Awarding**: Admin dapat memilih bid, yang otomatis menugaskan arsitek ke `DesignRequest` dan menutup tender.
- ✅ **UI Integration**: Tersedia di Dashboard Admin dan Dashboard Arsitek.

Fitur ini tetap dalam fase **Local Development CRUD Integration** tanpa sistem pembayaran asli atau auth production.
