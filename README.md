# RumahKu Konstruksi (RKK)

> **Status Repository:** Konsolidasi Monorepo Single-Branch (`main`) Selesai.

RKK menggunakan arsitektur monorepo dengan pnpm/npm workspaces:
- `apps/web`: Frontend React (Vite) publik
- `apps/backend`: Backend API (NestJS + Prisma)
- `docs/`: Dokumentasi teknis dan plan
- `archive/`: Arsip aplikasi lama (legacy client/server)

Branch lama telah diamankan dalam tag `archive/*`.
