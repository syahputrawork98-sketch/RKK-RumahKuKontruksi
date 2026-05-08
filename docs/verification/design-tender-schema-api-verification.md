# Design Tender Schema & API Verification — ✅ COMPLETED

## 1. Ringkasan Implementasi
Fondasi backend untuk fitur **Design Tender (Peluang Desain)** telah diimplementasikan. Tahap ini mencakup pembaruan schema database, pembuatan modul API (Routes, Controller, Repository), dan validasi logic bisnis inti (Pembagian Fee 30/70 & Bidding Cap).

## 2. Perubahan Prisma Schema
- **Model `DesignTender`**: Ditambahkan sebagai kontainer peluang desain.
  - Relasi `@unique` ke `DesignRequest` (1 request = 1 tender aktif).
  - Field finansial menggunakan `Decimal` (baseDesignFee, platformFee, drafterBudget).
- **Model `DesignTenderBid`**: Ditambahkan untuk mencatat penawaran arsitek.
  - Relasi `@@unique([designTenderId, architectId])` untuk mencegah bid ganda dari arsitek yang sama pada tender yang sama.
- **Relasi Terkait**: Model `DesignRequest` dan `Architect` diperbarui untuk mendukung hubungan ke Tender dan Bid.

## 3. Backend API Module
- **Endpoint Admin/Superadmin**:
  - `POST /api/design-tenders/publish`: Membuat tender dari DesignRequest.
  - `GET /api/design-tenders`: List semua tender.
  - `POST /api/design-tenders/:id/award/:bidId`: Memilih pemenang bid (Transaction-safe).
- **Endpoint Arsitek**:
  - `GET /api/design-tenders/open`: List tender berstatus `open`.
  - `POST /api/design-tenders/:id/bids`: Mengajukan penawaran.

## 4. Logic Bisnis Inti
- **Fee Calculation**: Otomatis menghitung `platformFeeAmount` (30%) dan `drafterBudgetAmount` (70%) saat publish.
- **Bid Validation**: Menolak penawaran arsitek yang melebihi `drafterBudgetAmount`.
- **Awarding Transaction**: 
  - Mengubah status tender menjadi `awarded`.
  - Mengubah status bid terpilih menjadi `selected`.
  - Mengubah status bid lain menjadi `rejected`.
  - Menugaskan `architectId` ke `DesignRequest` asal.
  - Mengubah status `DesignRequest` menjadi `assigned`.

## 5. Scope Guard (Sengaja Tidak Dibuat)
- ❌ **UI Components**: Tidak ada perubahan pada sisi frontend.
- ❌ **Payment & Invoices**: Tidak ada alur finansial riil.
- ❌ **File Storage**: Tidak ada sistem unggah proposal.
- ❌ **Auth Production**: Tetap menggunakan Persona Switcher.

## 6. Konfirmasi Scope
Implementasi tetap berada dalam fase **Local Development CRUD Integration**. Design Tender pada tahap ini hanya schema/API untuk publish peluang, submit bid, dan award bid. Belum ada payment, marketplace production, upload file, Project Flow bridge, atau auth production.
