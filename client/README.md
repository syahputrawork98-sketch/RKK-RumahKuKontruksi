# RumahkuKonstruksi Frontend

Frontend platform RumahkuKonstruksi dengan arsitektur modular, design system terstandar, dan kesiapan integrasi API berbasis kontrak.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS v4

## Struktur Utama

- `app/`: routing dan halaman.
- `src/components/`: komponen UI dan layout reusable.
- `src/features/`: domain logic per modul.
- `src/services/`: layer API client dan service endpoint.
- `src/store/`: global state dan slices/store per domain.
- `src/types/`: shared types dan DTO frontend.
- `src/constants/`: konstanta route, role, config key.
- `src/configs/`: konfigurasi environment dan site.
- `src/styles/`: global style dan design tokens.

## Checklist Implementasi Teknis per Fase

### Phase 1 - Foundation & Design System

- [x] Struktur folder modular selesai dan konsisten.
- [x] Semantic design token (light/dark) diterapkan.
- [x] Komponen base (`Button`, `Input`, `Card`, `Modal`) sesuai standar state.
- [x] Typography, spacing, radius, shadow mengikuti UI foundation.
- [x] Aksesibilitas dasar: kontras, focus ring, keyboard interaction.

### Phase 2 - Landing & Public Pages

- [x] Landing page dan auth pages siap.
- [x] Layout publik konsisten dan responsive.
- [x] Metadata SEO dasar per halaman.

### Phase 3 - Dashboard Structure

- [x] Dashboard layout (`sidebar`, `header`, `content`) siap.
- [x] Role-based navigation dan route guard dasar siap.
- [x] State list/detail: loading, empty, error, normal.

### Phase 4 - Modul Estimasi Biaya

- [x] Form estimasi modular dan tervalidasi.
- [x] Summary + breakdown hasil estimasi.
- [x] Submit flow dengan state feedback lengkap.

### Phase 5 - Auth UI & API Ready

- [x] Login/register/logout terintegrasi service API. (register endpoint backend opsional: jika belum tersedia, frontend mengembalikan NOT_IMPLEMENTED secara terstruktur)
- [x] Session flow (token + refresh + me endpoint) siap.
- [x] Error mapping HTTP + error code konsisten.

### Phase 6 - Marketplace Module

- [x] Listing, detail, filter, dan proposal UI siap.
- [x] State list/detail lengkap untuk semua skenario.

### Phase 7 - Admin Panel

- [x] User management, monitoring, approval flow siap.
- [x] Permission enforcement konsisten di semua action.

### Phase 8 - AI Integration

- [x] AI estimation/recommendation scaffold terintegrasi (`/api/ai/estimasi` + UI mode badge).
- [x] Ada fallback non-AI dan human validation checkpoint.
- [ ] Report summary AI lintas modul (dashboard/proyek) masih pending.

## Checklist Integrasi API (Lintas Fase)

- [ ] Semua response pakai envelope: `success`, `message`, `data`, `meta`, `error`, `trace_id`.
- [ ] Mapping status code UI diterapkan (`401`, `403`, `422`, `500/503`).
- [ ] Endpoint list mendukung pagination + filter + search.
- [ ] Workflow entity mengembalikan `process_state` + `allowed_actions`.
- [ ] Reference endpoint dipakai untuk dropdown/filter (tanpa hardcode).

## Definition of Done

- [x] Reusable components tanpa duplikasi style liar.
- [x] TypeScript strict dan lint lulus.
- [ ] Tidak ada console error signifikan.
- [x] Responsive desktop/mobile.
- [ ] Kontrak API sesuai dokumen OpenAPI/DTO.
- [x] Admin endpoint enforcement punya test otomatis (`401/403/409/404`).
