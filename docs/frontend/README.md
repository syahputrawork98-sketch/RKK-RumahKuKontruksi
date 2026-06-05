# Catatan Teknis Frontend RKK

Folder ini dikhususkan untuk dokumentasi terkait pengembangan frontend proyek RKK.

## Arsitektur Utama
- Frontend RKK berada di direktori `client/`.
- Dibangun menggunakan **React** dan **Vite**.
- Styling menggunakan **Tailwind CSS**.
- Menerapkan sistem routing multi-role (konsumen, superadmin, admin, pengawas, mandor).

## Arsitektur Fitur & Policy
- **Developer Persona Switcher**: Saat ini menggunakan switcher persona (Dev Persona Switcher) untuk kemudahan pengujian berbagai role tanpa *real authentication* (selama mode pengembangan lokal).
- **Komponen Inti**: Menggunakan pendekatan komponen terpusat seperti `RoleDataState`, `StatusBadge`, dan `RolePersonaEmptyState` untuk menyeragamkan UI di berbagai modul. *(Catatan: Perlu diverifikasi kesesuaiannya dengan struktur komponen di codebase terbaru).*
- **Kebijakan Data (Data Source Policy)**: Dilarang menggunakan *mock fallback* (hardcoded data dummy) untuk fitur-fitur yang sudah terhubung (DB-backed) dengan Supabase/backend. Semua aliran data harus berasal dari API.

## Aturan Pengembangan
- **Dilarang keras** melakukan refactoring besar-besaran tanpa membuka *batch* khusus untuk Frontend.
- Hindari bypass alur komponen utama demi konsistensi *multi-role*.
