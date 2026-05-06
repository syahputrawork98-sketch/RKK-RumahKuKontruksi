import React from "react";

/**
 * DetailPekerjaanProyek
 * Props:
 *  - data: {
 *      minggu, kode, judul, pekerjaan[], tanggalMulai, tanggalSelesai,
 *      durasiHari, foto[], biaya: { harusDibayar, terbayar },
 *      verifikasi, catatan
 *    }
 */
const DetailPekerjaanProyek = ({ data, onBack }) => {
  if (!data) return <p>Tidak ada data pekerjaan untuk ditampilkan.</p>;

  const {
    minggu,
    kode,
    judul,
    pekerjaan,
    tanggalMulai,
    tanggalSelesai,
    durasiHari,
    foto,
    biaya,
    verifikasi,
    catatan,
  } = data;

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-teal-700">
          Detail Pekerjaan — {judul}
        </h2>
        <button
          onClick={onBack}
          className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-700"
        >
          ← Kembali
        </button>
      </div>

      <div className="border-l-4 border-teal-600 pl-4 mb-4">
        <p className="text-sm text-gray-700">
          <strong>Kode:</strong> {kode}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Minggu ke-{minggu}</strong>
        </p>
        <p className="text-sm text-gray-700">
          <strong>Tanggal:</strong> {tanggalMulai} → {tanggalSelesai}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Durasi:</strong> {durasiHari} hari
        </p>
      </div>

      {/* Daftar Pekerjaan */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-teal-600 mb-2">
          Daftar Pekerjaan
        </h3>
        <ul className="list-disc list-inside space-y-1">
          {pekerjaan.map((p, i) => (
            <li key={i} className="text-sm text-gray-700">
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Foto Dokumentasi */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-teal-600 mb-2">
          Dokumentasi Pekerjaan
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {foto.slice(0, 10).map((f, i) => (
            <img
              key={i}
              src={f}
              alt={`Dokumentasi ${judul} #${i + 1}`}
              className="w-full h-32 object-cover rounded-xl shadow-md"
            />
          ))}
        </div>
      </div>

      {/* Biaya */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-teal-600 mb-1">
          Rincian Biaya
        </h3>
        <p className="text-sm text-gray-700">
          Harus dibayar:{" "}
          <strong>Rp {biaya.harusDibayar.toLocaleString()}</strong>
        </p>
        <p className="text-sm text-gray-700">
          Sudah terbayar:{" "}
          <strong className="text-green-600">
            Rp {biaya.terbayar.toLocaleString()}
          </strong>
        </p>
      </div>

      {/* Status & Catatan */}
      <div className="mb-4">
        <p
          className={`text-sm font-semibold ${
            verifikasi ? "text-green-600" : "text-red-600"
          }`}
        >
          {verifikasi
            ? "✅ Telah diverifikasi oleh pengawas"
            : "❌ Belum diverifikasi"}
        </p>
        <p className="text-sm text-gray-600 mt-1 italic">
          Catatan: {catatan || "Tidak ada catatan tambahan."}
        </p>
      </div>
    </div>
  );
};

export default DetailPekerjaanProyek;
