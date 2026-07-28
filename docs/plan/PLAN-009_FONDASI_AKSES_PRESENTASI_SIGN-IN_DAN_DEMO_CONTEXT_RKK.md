# PLAN-009 — Fondasi Akses Presentasi, Sign-in, dan Demo Context RKK

## 0. Metadata Dokumen

| Elemen | Nilai |
|---|---|
| Kode plan | PLAN-009 |
| Judul | Fondasi Akses Presentasi, Sign-in, dan Demo Context RKK |
| Status | **IMPLEMENTASI SELESAI — MENUNGGU AUDIT ROOM 3** |
| Versi | 1.0 |
| Tanggal penyusunan | 29 Juli 2026 |
| Room penyusun | ROOM 3 — Refactor dan Implementasi Teknis RKK |
| Repository | `syahputrawork98-sketch/RKK-RumahKuKontruksi` |
| Branch acuan | `main` |
| Baseline acuan jarak jauh | `7648b62b2a004f67721be2aed63c3fba14fe59ea` |
| Pelaksana implementasi | Gemini Pro melalui Antigravity IDE |
| Pemilik keputusan | Pemilik RKK |
| Commit dan push | Hanya dilakukan Pemilik setelah audit dan persetujuan |

---

## Status Persetujuan

PLAN-009 versi 1.0 telah dibaca, diterima, dan disetujui Pemilik pada 29 Juli 2026. Implementasi dapat dimulai melalui Gemini Antigravity dengan baseline GitHub yang telah diverifikasi. Gemini tetap dilarang melakukan commit dan push.

## 1. Ringkasan Eksekutif

PLAN-009 membangun fondasi akses untuk tahap presentasi RKK tanpa berpura-pura bahwa autentikasi produksi telah tersedia.

Pekerjaan dibagi menjadi tiga sasaran yang saling berkaitan:

1. halaman `/demo` sebagai **Demo Access Gateway**;
2. halaman `/sign-in` sebagai struktur resmi antarmuka masuk RKK;
3. fondasi **Demo Context** sebagai konteks lokal, sementara, aman, dan terpisah dari autentikasi produksi.

PLAN-009 **tidak membangun Customer Portal**. Customer Portal Shell dan Beranda Konsumen akan dikerjakan secara terpisah dalam PLAN-010.

Hasil PLAN-009 harus menyediakan kontrak teknis yang cukup kuat agar PLAN-010 dapat menggunakan identitas demo, status demo, route boundary, dan data demo sintetis tanpa mencampurkannya dengan autentikasi asli.

---

## 2. Latar Belakang

Aplikasi publik RKK telah memiliki halaman publik dan struktur routing yang berjalan. Route `/sign-in` saat ini masih menampilkan halaman belum tersedia dan berada di dalam shell publik.

Sementara itu, dokumen produk telah menetapkan dua kebutuhan berbeda:

- kebutuhan presentasi melalui akses demo;
- kebutuhan struktur resmi halaman masuk RKK.

Kedua kebutuhan tersebut tidak boleh digabungkan menjadi satu mekanisme karena dapat menimbulkan kesan bahwa:

- akun produksi telah aktif;
- autentikasi backend telah tersedia;
- data demo adalah data pelanggan asli;
- penyimpanan lokal adalah sesi autentikasi resmi;
- pengguna bebas memilih role atau hak akses.

PLAN-009 menetapkan pemisahan tegas antara demo dan autentikasi resmi.

---

## 3. Keputusan Arsitektur Utama

### 3.1 Route `/demo`

`/demo` adalah pintu masuk presentasi.

Karakteristiknya:

- bukan halaman login;
- tidak meminta email, nomor telepon, atau password;
- tidak menghasilkan akun;
- tidak mengklaim adanya autentikasi;
- hanya membuat konteks demo lokal dan sementara;
- menampilkan penanda bahwa pengguna sedang berada dalam mode demo;
- menggunakan data sintetis yang aman;
- dapat direset dan diakhiri oleh pengguna.

### 3.2 Route `/sign-in`

`/sign-in` adalah struktur resmi antarmuka masuk RKK.

Karakteristiknya:

- form identifier dan password;
- tombol masuk dengan Google sesuai rancangan produk;
- tidak menyediakan pemilihan role manual;
- tidak menyediakan demo persona;
- tidak menyediakan pendaftaran bebas;
- tidak menyediakan OTP atau magic link pada PLAN-009;
- belum menghasilkan autentikasi sukses sebelum backend resmi tersedia;
- memberikan pesan jujur apabila layanan autentikasi belum terhubung.

### 3.3 Demo Context

Demo Context adalah konteks lokal untuk kebutuhan presentasi.

Demo Context:

- bukan auth token;
- bukan session produksi;
- bukan sumber otorisasi produksi;
- tidak boleh digunakan untuk mengakses data asli;
- hanya berlaku pada browser atau tab presentasi;
- memiliki masa berlaku;
- dapat dihapus secara eksplisit;
- menggunakan data sintetis;
- memiliki schema version agar dapat dikembangkan secara terkendali.

### 3.4 Customer Portal

Customer Portal tidak dibangun dalam PLAN-009.

PLAN-009 hanya menyiapkan:

- target route;
- access boundary;
- kontrak Demo Context;
- adapter data demo;
- placeholder sementara bila diperlukan untuk pengujian alur.

Customer Portal Shell dan Beranda Konsumen menjadi ruang lingkup PLAN-010.

### 3.5 Portal Internal

Portal Internal tidak menjadi ruang lingkup wajib PLAN-009.

Akses demo internal tidak ditampilkan sampai:

- route Portal Internal ditetapkan;
- scope internal disetujui;
- data demo internal disetujui;
- kontrak akses internal telah diaudit.

---

## 4. Tujuan

### 4.1 Tujuan Utama

Menyediakan fondasi akses presentasi dan sign-in RKK yang:

- jujur terhadap status sistem;
- aman untuk dipresentasikan;
- terpisah dari autentikasi produksi;
- dapat digunakan sebagai dasar PLAN-010;
- tidak mengganggu halaman publik yang telah berjalan.

### 4.2 Tujuan Teknis

1. Memisahkan route publik, route akses, dan route portal.
2. Membuat `DemoAccessPage` pada `/demo`.
3. Membuat `SignInPage` pada `/sign-in`.
4. Membuat `AuthPageShell` yang tidak menggunakan navigasi portal.
5. Membuat penyimpanan Demo Context lokal dan sementara.
6. Membuat operasi create, read, validate, reset, expire, dan exit Demo Context.
7. Membuat route boundary untuk area portal.
8. Menyediakan adapter data demo sintetis.
9. Menambahkan pengujian route, form, context, state, dan accessibility.
10. Menjaga seluruh halaman publik tetap stabil.

---

## 5. Ruang Lingkup

### 5.1 Termasuk dalam PLAN-009

#### A. Fondasi routing

- pengelompokan public routes;
- pengelompokan access routes;
- fondasi portal routes;
- route `/demo`;
- route `/sign-in`;
- boundary untuk direct access menuju `/portal`;
- fallback yang jujur apabila portal belum dibangun.

#### B. Demo Access Gateway

- heading dan penjelasan singkat;
- tombol masuk ke Demo Portal Konsumen;
- label bahwa data bersifat demo;
- penjelasan bahwa demo bukan akun resmi;
- pembuatan Demo Context;
- navigasi menuju target portal;
- reset Demo Context;
- keluar dari mode demo;
- expired-state handling;
- unavailable-state handling.

#### C. Sign-in resmi

- identifier input;
- password input;
- show/hide password;
- validasi required;
- validasi format identifier secara proporsional;
- error summary atau field error yang dapat diakses;
- tombol masuk;
- tombol Google;
- loading state lokal;
- pesan autentikasi belum tersedia;
- jalur kembali ke halaman publik.

#### D. Auth Page Shell

- branding RKK;
- area form;
- navigasi kembali yang sederhana;
- tidak memakai header portal;
- tidak memakai sidebar portal;
- tidak memakai menu publik penuh apabila mengganggu fokus masuk;
- responsive desktop dan mobile;
- focus order yang benar.

#### E. Demo Context

- type dan schema;
- factory;
- validator;
- reader;
- writer;
- reset;
- exit;
- expiry;
- migration guard berdasarkan schema version;
- hook atau provider;
- unit tests.

#### F. Data demo sintetis

- identitas pelanggan demo;
- referensi proyek demo;
- metadata ringkas yang diperlukan PLAN-010;
- sumber data terpisah dari konten publik;
- penamaan yang jelas sebagai demo;
- larangan penggunaan data pelanggan nyata.

#### G. Pengujian dan dokumentasi

- route tests;
- form tests;
- context tests;
- boundary tests;
- keyboard tests;
- manual visual checklist;
- catatan implementasi;
- hasil audit sebelum commit.

### 5.2 Tidak termasuk dalam PLAN-009

- backend autentikasi;
- database user;
- password hashing;
- token JWT;
- refresh token;
- OAuth Google aktif;
- reset password produksi;
- registrasi akun;
- verifikasi email;
- OTP;
- magic link;
- role management;
- permission management produksi;
- Customer Portal Shell;
- Beranda Konsumen;
- Proyek Saya;
- Ruang Proyek;
- RAB;
- progres proyek;
- dokumentasi foto;
- Portal Internal;
- API produksi;
- data pelanggan asli;
- integrasi CMS;
- perubahan besar halaman publik;
- deployment production.

---

## 6. Ketergantungan Sebelum Implementasi

Implementasi PLAN-009 dimulai setelah kondisi berikut dipenuhi:

1. PLAN-008 dan PLAN-008D ditutup secara administratif.
2. SHA final PLAN-008D dicatat sebagai baseline.
3. `docs/plan/README.md` disinkronkan.
4. keputusan `/demo` dan `/sign-in` disetujui Pemilik.
5. dokumen presentasi teknis diperbarui agar tidak lagi menyamakan demo dengan sign-in.
6. dataset demo awal disetujui atau ditetapkan sebagai data sintetis sementara.
7. tidak ada pekerjaan lain yang sedang mengubah router atau shared shell secara bersamaan.

---

## 7. User Flow

### 7.1 Alur Demo Konsumen

```text
Halaman publik
    ↓
Klik "Lihat Demo"
    ↓
/demo
    ↓
Pengguna membaca label dan batasan demo
    ↓
Klik "Masuk ke Demo Portal Konsumen"
    ↓
Sistem membuat Demo Context lokal
    ↓
Sistem memvalidasi Demo Context
    ↓
Navigasi ke /portal
    ↓
PLAN-009:
placeholder akses portal yang jujur
atau boundary siap untuk PLAN-010

PLAN-010:
Customer Portal Shell dan Beranda Konsumen
```

### 7.2 Alur Sign-in

```text
Halaman publik
    ↓
Klik "Masuk"
    ↓
/sign-in
    ↓
Isi identifier dan password
    ↓
Validasi lokal
    ↓
Autentikasi backend belum tersedia
    ↓
Tampilkan pemberitahuan yang jujur
    ↓
Tidak membuat session produksi palsu
```

### 7.3 Direct Access ke `/portal`

```text
Pengguna membuka /portal secara langsung
    ↓
Periksa production auth context
    ↓
Periksa Demo Context
    ↓
Jika keduanya tidak tersedia:
arahkan ke /demo dengan return path
    ↓
Jika Demo Context valid:
izinkan masuk ke boundary portal
    ↓
Jika expired atau invalid:
hapus context dan kembali ke /demo
```

Catatan: production auth context pada PLAN-009 hanya berupa interface atau boundary. Tidak ada autentikasi produksi palsu.

---

## 8. Spesifikasi Halaman `/demo`

### 8.1 Tujuan Halaman

Memberikan jalur yang jelas dan aman untuk melihat pengalaman Portal Konsumen menggunakan data sintetis.

### 8.2 Struktur Isi

Urutan isi yang disarankan:

1. logo atau wordmark RKK;
2. label `Mode Demo`;
3. judul utama;
4. penjelasan satu paragraf;
5. kartu pilihan Demo Portal Konsumen;
6. daftar singkat batasan demo;
7. tombol masuk demo;
8. link kembali ke website publik;
9. catatan bahwa data tidak mewakili proyek pelanggan nyata.

### 8.3 Copy Awal

#### Label

`MODE DEMO`

#### Judul

`Lihat Pengalaman Portal Konsumen RKK`

#### Deskripsi

`Jelajahi contoh alur Portal Konsumen menggunakan data sintetis. Mode ini tidak membuat akun, tidak menggunakan data pelanggan asli, dan tidak terhubung ke proses transaksi produksi.`

#### Tombol utama

`Masuk ke Demo Portal Konsumen`

#### Tombol sekunder

`Kembali ke Website`

#### Catatan

`Data, nama, nilai, tanggal, progres, dan dokumentasi yang tampil dalam mode demo bersifat contoh.`

Copy dapat diperhalus tanpa mengubah makna dan batasan.

### 8.4 State Halaman

- default;
- loading context;
- context created;
- invalid context;
- expired context;
- storage unavailable;
- target portal unavailable;
- unexpected error.

### 8.5 Ketentuan Portal Internal

Tidak menampilkan tombol `Demo Portal Internal` pada PLAN-009.

Tombol tersebut hanya dapat ditambahkan dalam plan terpisah setelah route dan scope Portal Internal ditetapkan.

---

## 9. Spesifikasi Halaman `/sign-in`

### 9.1 Tujuan Halaman

Menyediakan struktur resmi antarmuka masuk RKK tanpa mengaktifkan autentikasi palsu.

### 9.2 Field

#### Identifier

Label:

`Email atau nomor telepon`

Ketentuan:

- required;
- trim whitespace;
- autocomplete yang sesuai;
- tidak memaksa format email apabila nomor telepon didukung;
- tidak mengirim data ke backend pada PLAN-009.

#### Password

Label:

`Password`

Ketentuan:

- required;
- tombol tampilkan atau sembunyikan;
- autocomplete `current-password`;
- tidak menyimpan nilai;
- tidak menuliskan password ke log.

### 9.3 Tombol

#### Tombol utama

`Masuk`

Pada PLAN-009:

- menjalankan validasi lokal;
- tidak menghasilkan session auth;
- menampilkan pemberitahuan bahwa autentikasi resmi belum aktif;
- tidak mengarahkan ke portal seolah-olah berhasil.

#### Tombol Google

`Lanjutkan dengan Google`

Pada PLAN-009:

- ditampilkan sesuai struktur produk;
- berstatus disabled atau unavailable;
- memiliki penjelasan yang jujur;
- tidak membuka OAuth palsu.

### 9.4 Elemen yang Tidak Ditampilkan

- pemilih role;
- pemilih persona demo;
- daftar sebagai pengguna baru;
- daftar sebagai admin;
- OTP;
- magic link;
- akun contoh;
- kredensial demo;
- link bantuan dummy;
- link kebijakan yang belum tersedia.

### 9.5 Copy Pemberitahuan Awal

`Layanan masuk resmi RKK belum diaktifkan pada tahap presentasi ini. Gunakan halaman Demo untuk melihat pengalaman Portal Konsumen.`

Tersedia tombol:

- `Buka Demo`;
- `Kembali ke Website`.

---

## 10. Auth Page Shell

### 10.1 Prinsip

`AuthPageShell` berdiri terpisah dari:

- `PublicAppShell`;
- `CustomerPortalShell`;
- `InternalPortalShell`.

### 10.2 Tanggung Jawab

- branding;
- layout akses;
- area form;
- background;
- responsive layout;
- navigasi kembali;
- focus management;
- error boundary lokal;
- ruang untuk status layanan.

### 10.3 Larangan

- tidak menampilkan sidebar portal;
- tidak menampilkan menu internal;
- tidak menampilkan data proyek;
- tidak mengulang seluruh footer publik apabila membuat halaman terlalu padat;
- tidak memodifikasi `home.css` sebagai jalan pintas;
- tidak membuat selector global yang berpotensi bocor.

### 10.4 CSS Scoping

Semua style akses harus memiliki root yang jelas, misalnya:

```css
.access-page {}
.access-page__shell {}
.access-page__panel {}
.access-page__form {}
```

Nama final mengikuti konvensi repository setelah audit struktur.

---

## 11. Kontrak Demo Context

### 11.1 Bentuk Data Awal

```ts
type DemoMode = "customer";

type DemoContext = {
  schemaVersion: 1;
  mode: "demo";
  persona: DemoMode;
  sessionId: string;
  displayName: string;
  customerReference: string;
  projectReferences: string[];
  createdAt: string;
  expiresAt: string;
  returnPath: string;
};
```

Bentuk final boleh disesuaikan selama prinsip dasarnya tetap dipertahankan.

### 11.2 Nilai Sintetis Awal

Nilai berikut hanya contoh dan harus tetap diberi label demo:

```text
displayName: Pelanggan Demo RKK
customerReference: DEMO-CUSTOMER-001
projectReferences:
- DEMO-PROJECT-001
```

Tidak menggunakan:

- nama pelanggan asli;
- alamat proyek asli;
- nomor telepon asli;
- email asli;
- nomor kontrak asli;
- nilai RAB asli;
- foto proyek asli tanpa izin.

### 11.3 Penyimpanan

Rekomendasi tahap presentasi:

- memory state untuk runtime;
- `sessionStorage` untuk mempertahankan context selama tab aktif;
- bukan `localStorage`;
- bukan cookie auth;
- bukan database;
- bukan URL query yang berisi data sensitif.

### 11.4 Masa Berlaku

Ketentuan awal:

- kedaluwarsa setelah **4 jam** sejak context dibuat;
- kedaluwarsa saat nilai `expiresAt` terlewati;
- context invalid langsung dihapus;
- context schema lama yang tidak dapat dimigrasi langsung dihapus.

Durasi awal yang disetujui adalah **4 jam** dan harus didefinisikan sebagai konstanta agar mudah diubah.

### 11.5 Operasi Wajib

```text
createDemoContext()
readDemoContext()
validateDemoContext()
isDemoContextExpired()
clearDemoContext()
resetDemoContext()
exitDemoMode()
```

### 11.6 Keamanan

- context tidak memiliki token auth;
- context tidak memiliki permission produksi;
- context tidak boleh dipakai sebagai bukti identitas;
- context tidak boleh membuka data selain adapter demo;
- semua consumer harus memeriksa `mode === "demo"`;
- mode demo harus terlihat pada antarmuka portal;
- error tidak boleh membocorkan isi context sensitif;
- tidak ada credential demo.

---

## 12. Fondasi Data Demo

### 12.1 Tujuan

Menyediakan satu sumber data sintetis yang dapat digunakan PLAN-010 tanpa menyisipkan hardcoded data ke banyak komponen.

### 12.2 Struktur yang Disarankan

```text
demo/
├── demo-context.ts
├── demo-context-storage.ts
├── demo-context-provider.tsx
├── demo-data.ts
├── demo-data-adapter.ts
├── demo-types.ts
└── __tests__/
```

Lokasi final menyesuaikan struktur repository.

### 12.3 Prinsip Adapter

UI portal tidak langsung membaca objek hardcoded.

UI membaca interface, misalnya:

```ts
interface CustomerPortalDataSource {
  getCustomerSummary(): CustomerSummary;
  getPriorityItems(): PriorityItem[];
  getProjectSummaries(): ProjectSummary[];
  getRecentActivities(): CustomerVisibleActivity[];
}
```

Pada PLAN-009:

- interface dapat dibuat;
- demo adapter dapat dibuat;
- data minimal dapat disiapkan;
- UI penuh belum dibangun.

Pada masa produksi:

- adapter API dapat menggantikan demo adapter;
- komponen portal tidak perlu dirombak total.

---

## 13. Struktur Routing Target

Struktur konseptual:

```tsx
<AppErrorBoundary>
  <Routes>
    <Route element={<PublicAppShell />}>
      {/* seluruh route publik */}
    </Route>

    <Route element={<AuthPageShell />}>
      <Route path="/demo" element={<DemoAccessPage />} />
      <Route path="/sign-in" element={<SignInPage />} />
    </Route>

    <Route element={<PortalAccessBoundary />}>
      <Route path="/portal" element={<PortalPlan009Placeholder />} />
    </Route>

    <Route path="*" element={<NotFoundPage />} />
  </Routes>
</AppErrorBoundary>
```

Catatan:

- kode final mengikuti API router yang telah digunakan repository;
- placeholder `/portal` bukan Customer Portal Shell;
- placeholder harus minimal dan mudah dihapus pada PLAN-010;
- route publik yang ada tidak boleh berubah perilakunya.

---

## 14. Struktur File Kandidat

Struktur berikut bersifat rancangan awal, bukan perintah mutlak:

```text
apps/web/src/
├── app/
│   ├── AppRouter.tsx
│   └── routes/
├── features/
│   └── access/
│       ├── components/
│       │   ├── AuthPageShell.tsx
│       │   ├── IdentifierField.tsx
│       │   ├── PasswordField.tsx
│       │   ├── DemoModeNotice.tsx
│       │   └── AccessStatusMessage.tsx
│       ├── context/
│       │   ├── demo-context.ts
│       │   ├── demo-context-provider.tsx
│       │   ├── demo-context-storage.ts
│       │   └── demo-context-validator.ts
│       ├── data/
│       │   ├── demo-data.ts
│       │   └── demo-data-adapter.ts
│       ├── pages/
│       │   ├── DemoAccessPage.tsx
│       │   ├── SignInPage.tsx
│       │   └── PortalPlan009Placeholder.tsx
│       ├── routes/
│       │   └── PortalAccessBoundary.tsx
│       ├── styles/
│       │   └── access.css
│       └── __tests__/
└── ...
```

Gemini wajib menyesuaikan rancangan dengan struktur aktual repository dan menjelaskan setiap penyimpangan.

---

## 15. Komponen yang Digunakan Ulang

Gunakan komponen bersama yang telah tersedia apabila sesuai:

- `ActionLink`;
- button primitives;
- typography tokens;
- spacing tokens;
- container;
- icon system;
- status atau feedback primitives.

Tidak membuat komponen baru apabila komponen yang sudah ada memenuhi kebutuhan.

Tidak mengubah komponen bersama hanya untuk memenuhi satu halaman tanpa audit dampak ke halaman publik.

---

## 16. Responsive Behaviour

### 16.1 Desktop

- panel akses memiliki lebar baca yang nyaman;
- branding dan form dapat memakai dua kolom bila sesuai;
- tombol tidak terlalu lebar;
- hierarchy tetap sederhana.

### 16.2 Tablet

- layout dapat beralih menjadi satu kolom;
- spacing tidak terlalu besar;
- tidak ada overflow horizontal.

### 16.3 Mobile

- satu kolom;
- form full width;
- target sentuh memadai;
- pesan error tidak terpotong;
- tombol Google dan tombol utama mudah dibedakan;
- show/hide password dapat dioperasikan;
- tidak ada content shift besar saat error muncul.

---

## 17. Accessibility

PLAN-009 wajib memenuhi:

- label terhubung ke input;
- error menggunakan hubungan `aria-describedby`;
- status dinamis menggunakan `aria-live`;
- tombol memiliki nama yang jelas;
- ikon dekoratif tidak mengganggu screen reader;
- urutan fokus logis;
- fokus kembali ke lokasi yang benar setelah status berubah;
- keyboard dapat mengoperasikan semua kontrol;
- focus indicator terlihat;
- heading hierarchy benar;
- warna bukan satu-satunya indikator;
- contrast memadai;
- reduced motion dihormati;
- pesan expired dapat dipahami tanpa hanya mengandalkan warna.

---

## 18. Error Handling

### 18.1 Demo Context Error

Jika context rusak:

1. jangan mencoba membaca data portal;
2. hapus context;
3. tampilkan pesan;
4. arahkan ke `/demo`;
5. sediakan tindakan membuat context baru.

### 18.2 Storage Error

Jika `sessionStorage` tidak tersedia:

- mode demo dapat berjalan in-memory untuk sesi saat ini bila aman;
- tampilkan catatan bahwa refresh akan mengakhiri demo;
- jangan gagal secara diam-diam.

### 18.3 Sign-in Error

Karena backend belum aktif:

- error harus menjelaskan status layanan;
- jangan menampilkan pesan seperti `email atau password salah`;
- jangan membuat loading tanpa akhir;
- jangan membuat redirect sukses palsu.

### 18.4 Unexpected Error

- tangkap melalui error boundary;
- tampilkan pemulihan sederhana;
- jangan menampilkan stack trace kepada pengguna;
- error teknis dapat dicatat tanpa data credential.

---

## 19. Perlindungan Area yang Sudah Stabil

Gemini tidak boleh mengubah area berikut kecuali benar-benar diperlukan dan dijelaskan:

- konten halaman publik;
- struktur publik yang telah disetujui;
- `home.css` sebagai benchmark;
- header publik;
- footer publik;
- halaman 404;
- katalog layanan;
- data publikasi;
- publication gates;
- `apps/backend`;
- client/server lama;
- arsip;
- plan lama selain pembaruan administratif yang disetujui;
- konfigurasi deployment;
- shared component behavior yang digunakan halaman publik.

Setiap perubahan shared component harus disertai daftar halaman terdampak dan hasil regression test.

---

## 20. Skenario Pengujian Wajib

### 20.1 Routing

- `/demo` dapat dibuka langsung;
- `/sign-in` dapat dibuka langsung;
- route publik tetap berjalan;
- alias publik tetap berjalan;
- unknown route tetap menampilkan 404;
- `/portal` tanpa context diarahkan sesuai boundary;
- `/portal` dengan context valid melewati boundary;
- `/portal` dengan context expired kembali ke `/demo`.

### 20.2 Demo Access

- tombol demo membuat context;
- context memiliki schema version;
- context memiliki expiry;
- context tidak memiliki auth token;
- reset membuat context baru;
- exit menghapus context;
- invalid context dihapus;
- storage failure ditangani;
- label demo tampil;
- data asli tidak digunakan.

### 20.3 Sign-in

- identifier required;
- password required;
- whitespace ditangani;
- show/hide password bekerja;
- submit tidak memanggil backend palsu;
- submit tidak membuat session;
- Google button tidak menjalankan OAuth palsu;
- pesan unavailable dapat dibaca screen reader;
- link ke demo bekerja;
- Enter key bekerja secara benar.

### 20.4 Shell Separation

- access route tidak memakai `PublicAppShell`;
- access route tidak memakai portal shell;
- header publik tidak muncul ganda;
- footer publik tidak muncul ganda;
- style access tidak mengubah halaman publik.

### 20.5 Regression

- seluruh test lama tetap lulus;
- build web lulus;
- lint web lulus;
- test web lulus;
- tidak ada TypeScript error;
- `git diff --check` lulus;
- tidak ada file di luar scope yang berubah tanpa alasan.

---

## 21. Pemeriksaan Visual Manual

Wajib diperiksa pada:

- desktop lebar;
- laptop;
- tablet portrait;
- mobile sempit;
- keyboard-only;
- zoom 200%;
- dark browser preference bila aplikasi merespons preferensi;
- reduced motion;
- refresh halaman;
- direct route;
- expired context;
- storage blocked.

Hal yang diperiksa:

- hierarchy;
- spacing;
- alignment;
- focus;
- error placement;
- button consistency;
- tidak ada overflow;
- tidak ada flash shell publik;
- tidak ada style bocor;
- label demo terlihat jelas.

---

## 22. Definition of Done

PLAN-009 dinyatakan selesai apabila:

### A. Route

- `/demo` aktif;
- `/sign-in` aktif;
- access routes tidak berada dalam shell portal;
- struktur public routes tetap stabil;
- portal boundary tersedia.

### B. Demo

- Demo Access Gateway dapat digunakan;
- hanya Demo Portal Konsumen yang aktif;
- Demo Context dibuat, divalidasi, direset, diakhiri, dan kedaluwarsa;
- data demo sintetis;
- mode demo terlihat;
- tidak ada credential demo.

### C. Sign-in

- struktur form resmi tersedia;
- validasi aksesibel;
- Google entry tampil secara jujur;
- tidak ada autentikasi sukses palsu;
- tidak ada role selector;
- tidak ada registrasi bebas.

### D. Arsitektur

- Demo Context terpisah dari auth context;
- adapter data demo tersedia;
- CSS scoped;
- komponen bersama digunakan secara aman;
- tidak ada data produksi.

### E. Kualitas

- seluruh build, lint, dan test lulus;
- regression halaman publik lulus;
- responsive manual audit lulus;
- accessibility audit dasar lulus;
- `git diff --check` lulus;
- tidak ada commit atau push oleh Gemini.

### F. Dokumentasi

- daftar file berubah tersedia;
- keputusan teknis dicatat;
- hasil test dicatat;
- risiko tersisa dicatat;
- screenshot atau bukti visual tersedia;
- owner audit selesai;
- SHA commit akhir dicatat setelah Pemilik melakukan commit.

---

## 23. Urutan Implementasi

### Tahap 1 — Persiapan

1. verifikasi branch dan SHA;
2. verifikasi working tree bersih;
3. baca AppRouter;
4. baca shared UI;
5. baca style imports;
6. identifikasi semua route publik;
7. identifikasi test routing yang sudah ada.

### Tahap 2 — Fondasi Context

1. buat types;
2. buat schema;
3. buat storage;
4. buat validator;
5. buat provider atau hook;
6. buat expiry;
7. buat reset dan exit;
8. buat unit tests.

### Tahap 3 — Auth Page Shell

1. buat shell;
2. buat scoped CSS;
3. buat responsive layout;
4. buat focus behaviour;
5. buat tests.

### Tahap 4 — Demo Access

1. buat halaman;
2. buat copy;
3. buat context creation;
4. buat error states;
5. buat navigation;
6. buat tests.

### Tahap 5 — Sign-in

1. buat form;
2. buat field validation;
3. buat password visibility;
4. buat unavailable state;
5. buat Google unavailable state;
6. buat tests.

### Tahap 6 — Routing Boundary

1. refactor AppRouter secara minimal;
2. kelompokkan access routes;
3. buat portal boundary;
4. buat placeholder sementara;
5. regression test seluruh route.

### Tahap 7 — Audit

1. build;
2. lint;
3. tests;
4. diff check;
5. visual desktop;
6. visual mobile;
7. keyboard;
8. storage and expiry;
9. owner review.

---

## 24. Instruksi Pelaksanaan untuk Gemini

Instruksi implementasi final baru dibuat setelah PLAN-009 disetujui Pemilik.

Instruksi tersebut wajib:

- menyebut baseline SHA;
- menyebut file dan dokumen sumber;
- membatasi scope;
- melarang commit dan push;
- melarang backend auth palsu;
- melarang data asli;
- melarang perubahan halaman publik tanpa kebutuhan;
- meminta laporan file berubah;
- meminta laporan test;
- meminta screenshot;
- meminta rekomendasi commit message tanpa melakukan commit.

---

## 25. Format Laporan Hasil Gemini

Gemini wajib memberikan:

```text
1. Branch dan SHA awal
2. Ringkasan implementasi
3. Keputusan arsitektur
4. Daftar file dibuat
5. Daftar file diubah
6. Daftar file dihapus
7. Route sebelum dan sesudah
8. Demo Context contract
9. Dataset demo yang digunakan
10. Test baru
11. Hasil build
12. Hasil lint
13. Hasil test
14. Hasil git diff --check
15. Pemeriksaan responsive
16. Pemeriksaan accessibility
17. Risiko dan keterbatasan
18. Git status
19. Rekomendasi commit message
20. Konfirmasi tidak commit dan tidak push
```

---

## 26. Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Demo dianggap autentikasi asli | Salah persepsi produk | Label demo permanen dan context terpisah |
| Penyimpanan lokal dianggap session auth | Risiko arsitektur | Gunakan session context tanpa token |
| Direct `/portal` melewati boundary | Akses tidak terkontrol | Guard di tingkat route |
| Data asli masuk ke demo | Kebocoran informasi | Dataset sintetis dan review owner |
| CSS access bocor ke publik | Regresi visual | Root scoping dan regression test |
| Shared component berubah | Regresi lintas halaman | Audit penggunaan sebelum perubahan |
| Google button tampak aktif | Klaim fitur palsu | Disabled atau unavailable state |
| Sign-in berpura-pura berhasil | Klaim sistem palsu | Tidak membuat session dan tidak redirect |
| Demo context tidak kedaluwarsa | State membingungkan | `expiresAt`, reset, dan exit |
| Internal portal ikut terbuka | Scope melebar | Internal demo tidak ditampilkan |
| Placeholder PLAN-009 menjadi permanen | Hutang UI | Ditandai untuk diganti PLAN-010 |
| Dokumentasi dan kode tidak sinkron | Kebingungan audit | Update status setelah owner approval |

---

## 27. Keputusan yang Digunakan dalam Draft

Draft ini menggunakan keputusan kerja berikut:

1. PLAN-009 berdiri sendiri, tanpa PLAN-009A dan PLAN-009B.
2. PLAN-010 menangani Customer Portal Shell dan Beranda Konsumen.
3. `/demo` berbeda dari `/sign-in`.
4. demo pertama hanya untuk Portal Konsumen.
5. Portal Internal dikeluarkan dari PLAN-009.
6. sign-in belum terhubung backend.
7. Google sign-in belum aktif.
8. data demo wajib sintetis.
9. Demo Context bukan autentikasi.
10. Gemini tidak melakukan commit atau push.

---

## 28. Keputusan Final Pemilik

Pemilik menyetujui PLAN-009 untuk dieksekusi dengan keputusan final berikut:

- judul dan ruang lingkup PLAN-009 disetujui;
- route `/demo` digunakan sebagai Demo Access Gateway;
- route `/sign-in` digunakan sebagai halaman masuk resmi yang belum terhubung backend;
- demo pada PLAN-009 hanya untuk Portal Konsumen;
- Demo Context menggunakan `sessionStorage` dengan fallback in-memory;
- masa berlaku awal Demo Context ditetapkan **4 jam**;
- `/portal` pada PLAN-009 menggunakan placeholder minimal di balik access boundary;
- copy utama mengikuti dokumen ini dan dapat dipoles tanpa mengubah makna;
- dataset awal wajib sintetis;
- tombol Google ditampilkan dalam status disabled atau unavailable yang jujur;
- registrasi bebas tidak tersedia;
- Customer Portal Shell dan Beranda Konsumen dikerjakan pada PLAN-010;
- Gemini tidak boleh melakukan commit atau push.

---

## 29. Rencana Lanjutan

Setelah PLAN-009 selesai dan diaudit:

### PLAN-010

`Customer Portal Shell dan Beranda Konsumen RKK`

Fokus:

- `CustomerPortalShell`;
- `/portal`;
- sidebar;
- drawer mobile;
- topbar;
- identity context;
- perhatian utama;
- ringkasan permintaan;
- ringkasan proyek;
- aktivitas customer-visible;
- jalur cepat;
- responsive;
- accessibility;
- adapter Demo Context.

PLAN-010 tidak mengubah kontrak PLAN-009 kecuali ditemukan masalah melalui audit dan disetujui Pemilik.

---

## 30. Status Draft

```yaml
plan_code: PLAN-009
plan_title: Fondasi Akses Presentasi, Sign-in, dan Demo Context RKK
version: 1.0
status: DISETUJUI_PEMILIK_SIAP_IMPLEMENTASI
implementation_allowed: true
gemini_instruction_ready: true
commit_allowed_for_gemini: false
push_allowed_for_gemini: false
next_plan: PLAN-010
```
