# Planning: Timeline Consumer Communication Panel

## 1. Konsep Utama
Menyediakan panel komunikasi resmi di halaman Timeline Konsumen untuk menjembatani informasi dari lapangan yang telah dikurasi oleh Admin. Fitur ini memastikan Konsumen mendapatkan informasi yang akurat tanpa terpapar kerumitan teknis atau diskusi internal tim lapangan (Mandor/Pengawas).

## 2. Alur Informasi (Admin as Proxy)
1. **Internal Data**: Mandor/Pengawas membuat laporan teknis internal (Jurnal/Laporan Mingguan).
2. **Curation**: Admin meninjau data internal tersebut.
3. **Official Update**: Admin mempublikasikan ringkasan resmi ke Timeline Publik via `ProjectStagePublicComment` dengan flag `isOfficial: true`.
4. **Interaction**: Konsumen membaca update tersebut dan memberikan **Tanggapan (Reply)** jika diperlukan.
5. **Admin Response**: Admin membalas tanggapan Konsumen untuk menutup loop komunikasi.

## 3. Aturan Visibilitas & Keamanan
- **No Direct Access**: Konsumen **TIDAK** memiliki akses ke jurnal internal Mandor atau laporan teknis Pengawas.
- **Controlled Discussion**: Diskusi hanya bisa dimulai oleh Admin (Official Update). Konsumen hanya bisa membalas.
- **Persona Validation**: Penulisan komentar divalidasi berdasarkan `authorRole` (admin/customer) dan `authorId` yang aktif di Persona Switcher.
- **Threaded View**: Komentar disusun dalam struktur *Parent-Child* sederhana untuk menjaga konteks diskusi per tahapan (`ProjectStage`).

## 4. Implementasi Teknis
### Database Model (Prisma)
```prisma
model ProjectStagePublicComment {
  id          String   @id @default(uuid())
  projectId   String
  project     Project  @relation(fields: [projectId], references: [id])
  stageId     String
  stage       ProjectStage @relation(fields: [stageId], references: [id])
  
  authorRole  String   // 'admin', 'customer'
  authorId    String
  authorName  String?
  
  message     String   @db.Text
  isOfficial  Boolean  @default(false)
  
  parentId    String?
  parent      ProjectStagePublicComment? @relation("Thread", fields: [parentId], references: [id])
  replies     ProjectStagePublicComment[] @relation("Thread")
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Endpoints
- `GET /api/project-stage-comments/stage/:stageId`: Mengambil thread diskusi per tahap.
- `POST /api/project-stage-comments/stage/:stageId`: Membuat update baru atau balasan.
- `PATCH /api/project-stage-comments/:id`: Mengupdate isi pesan (Admin only).
- `DELETE /api/project-stage-comments/:id`: Menghapus komentar (Admin only).

## 5. UI Layout
- **Consumer**: Split layout (2/3 Progress Detail, 1/3 Communication Panel).
- **Admin**: Modal Sidebar di halaman Detail Proyek (Akses via ikon pesan pada tabel Stage).

## 6. Status & Roadmap
- **Status**: DONE (Local Development CRUD Integration).
- **Polish**: UI/UX Polished (premium aesthetics, mobile responsive).
- **Verified**: Threading, role validation, and empty/loading states verified.
