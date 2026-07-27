# RKK Backend

Backend untuk Rumahku Konstruksi menggunakan NestJS.

## Prasyarat

- Node.js (v20+)
- npm
- PostgreSQL (dapat menggunakan Neon)

## Instalasi

Dari root workspace:

```bash
npm install
```

Atau dari direktori `apps/backend`:

```bash
npm install
```

## Konfigurasi Environment

1. Salin file `.env.example` menjadi `.env`.
2. Sesuaikan variabel environment, khususnya `DATABASE_URL` untuk koneksi lokal.

```bash
cp .env.example .env
```

## Menjalankan Aplikasi

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Prisma ORM

Backend ini menggunakan Prisma. Karena saat ini belum ada model bisnis, Anda hanya perlu memvalidasi schema:

```bash
npm run prisma:validate
```

## Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Linting dan Formatting

```bash
npm run lint
npm run format
```

## Swagger UI

Dokumentasi API tersedia di:
`http://localhost:3001/api/docs`
