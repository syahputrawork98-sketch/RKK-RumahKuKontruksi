// client/src/data/mockTimelineProyekKonsumen.js

// 📅 Tanggal mulai proyek (acuan)
const startDate = new Date("2025-09-01");

// ⏱️ Durasi (hari) untuk tiap tahapan
const durasiHari = [5, 5, 7, 7, 6, 5, 5, 6, 7, 5, 4, 3, 3];

// 💰 Nilai biaya tiap tahapan (diambil dari RAB)
const tahapanBiaya = [
  3496999.95,   // I
  5673183.88,   // II
  3663700.0,    // III
  13274324.71,  // IV
  17109405.25,  // V
  10085055.59,  // VI
  6448224.27,   // VII
  6742546.94,   // VIII
  7807936.50,   // IX
  22990710.45,  // X
  1236058.00,   // XI
  1823001.00,   // XII
  5431999.94    // XIII
];

// 🔧 Helper: menambah hari ke tanggal
const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// 📋 Daftar tahapan pekerjaan (13 tahap)
const timelineBase = [
  { kode: "I", judul: "PEKERJAAN PERSIAPAN", pekerjaan: ["Pembersihan Lokasi Manual", "Pas bouwplank Kayu Alba", "Koordinasi lapangan"], biayaTotal: tahapanBiaya[0] },
  { kode: "II", judul: "PEKERJAAN TANAH", pekerjaan: ["Pekerjaan galian tanah untuk pondasi", "Urugan tanah kembali pondasi", "Urugan tanah peninggian lantai"], biayaTotal: tahapanBiaya[1] },
  { kode: "III", judul: "PEKERJAAN PONDASI", pekerjaan: ["Aanstamping batu kali", "Pondasi batu kali 1:5", "Rolagh bata"], biayaTotal: tahapanBiaya[2] },
  { kode: "IV", judul: "PEKERJAAN BETON", pekerjaan: ["Sloof beton", "Kolom utama & kolom praktis", "Ringbalk, balok, plat"], biayaTotal: tahapanBiaya[3] },
  { kode: "V", judul: "PEKERJAAN PASANGAN DINDING", pekerjaan: ["Dinding Bata Ringan / Hebel", "Plesteran + Aci 1:5"], biayaTotal: tahapanBiaya[4] },
  { kode: "VI", judul: "RANGKA ATAP & PENUTUP", pekerjaan: ["Rangka atap baja ringan", "Pemasangan genteng beton", "Lisplank & tumpangsari GRC"], biayaTotal: tahapanBiaya[5] },
  { kode: "VII", judul: "PEKERJAAN PLAFOND", pekerjaan: ["Plafond GRC teras", "Plafond gypsum", "List plafond"], biayaTotal: tahapanBiaya[6] },
  { kode: "VIII", judul: "LANTAI & DINDING KERAMIK", pekerjaan: ["Lantai keramik ruang utama", "Lantai teras & KM", "Dinding keramik KM"], biayaTotal: tahapanBiaya[7] },
  { kode: "IX", judul: "KUSEN, PINTU & FINISHING INTERIOR (A–C)", pekerjaan: ["Kusen/pintu (bahan & finishing)", "Engsel, kunci & aksesori", "Finishing cat furniture & melamik"], biayaTotal: tahapanBiaya[8] },
  { kode: "X", judul: "PEKERJAAN PENGECATAN & WATERPROOFING", pekerjaan: ["Pengecatan dinding", "Pengecatan plafon", "Waterproofing"], biayaTotal: tahapanBiaya[9] },
  { kode: "XI", judul: "PLUMBING – AIR BERSIH & INSTALASI", pekerjaan: ["Instalasi air bersih PVC", "Peralatan & fitting", "Instalasi air kotor / septic"], biayaTotal: tahapanBiaya[10] },
  { kode: "XII", judul: "SANITASI & PERLENGKAPAN KM", pekerjaan: ["Perlengkapan KM (kran, floor drain, roof drain)", "Bak & fitting"], biayaTotal: tahapanBiaya[11] },
  { kode: "XIII", judul: "INSTALASI LISTRIK", pekerjaan: ["Panel, titik lampu & stop kontak", "Instalasi panel MCB & pentanahan"], biayaTotal: tahapanBiaya[12] }
];

// 🔄 Bangun data timeline lengkap
let cursorDate = new Date(startDate);
const mockTimelineProyekKonsumen = timelineBase.map((t, i) => {
  const dur = durasiHari[i] || 7;
  const tanggalMulai = addDays(cursorDate, 0);
  const tanggalSelesai = addDays(cursorDate, dur - 1);

  // simulasi pembayaran & verifikasi
  const terbayar = Math.round(t.biayaTotal * (i < 3 ? 0.6 : 0.2));
  const fotoCount = Math.min(10, Math.max(3, Math.floor(3 + Math.random() * 6)));
  const foto = Array.from({ length: fotoCount }, () => "https://placehold.co/600x400");

  // maju ke tanggal berikutnya
  cursorDate = new Date(tanggalSelesai);
  cursorDate.setDate(cursorDate.getDate() + 1);

  return {
    minggu: i + 1,
    kode: t.kode,
    judul: t.judul,
    pekerjaan: t.pekerjaan,
    tanggalMulai,
    tanggalSelesai,
    durasiHari: dur,
    foto,
    biaya: {
      harusDibayar: Math.round(t.biayaTotal),
      terbayar
    },
    verifikasi: i < 3,
    catatan: i < 3 ? "Pekerjaan sesuai rencana" : "Menunggu realisasi di lapangan"
  };
});

// 💵 Ringkasan total proyek
const nilaiProyek = Math.round(tahapanBiaya.reduce((a, b) => a + b, 0));
const totalTerbayar = mockTimelineProyekKonsumen.reduce((a, b) => a + b.biaya.terbayar, 0);
const sisaUang = nilaiProyek - totalTerbayar;

// Export semua data
export {
  mockTimelineProyekKonsumen,
  nilaiProyek,
  totalTerbayar,
  sisaUang
};
