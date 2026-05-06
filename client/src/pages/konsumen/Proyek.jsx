// src/pages/konsumen/Proyek.jsx
import React from "react";

const Proyek = () => {
  const proyekList = [
    {
      id: "PRJ001",
      nama: "Renovasi Rumah Minimalis",
      status: "Aktif",
      progress: 45,
      tanggalMulai: "2025-09-01",
      tanggalSelesai: "2025-12-01",
      mandor: "Budi Santoso",
      pengawas: "Ahmad Fauzi",
      alamat: "Jl. Melati No. 12, Jakarta Selatan",
      nilaiProyek: 250_000_000,
      nilaiKeluar: 110_000_000,
      keteranganTerakhir: "Pengecatan dinding lantai 1 selesai",
      gambar: "https://rhdesainrumah.id/wp-content/uploads/2025/04/417-imron-part-3-desain-rumah-minimalis.jpg",
    },
    {
      id: "PRJ002",
      nama: "Pembangunan Ruko 2 Lantai",
      status: "Selesai",
      progress: 100,
      tanggalMulai: "2025-01-10",
      tanggalSelesai: "2025-06-15",
      mandor: "Andi Wijaya",
      pengawas: "Rina Maharani",
      alamat: "Jl. Kebon Jeruk No. 45, Jakarta Barat",
      nilaiProyek: 500_000_000,
      nilaiKeluar: 500_000_000,
      keteranganTerakhir: "Serah terima proyek selesai",
      gambar: "https://placehold.co/600x400" },
    {
      id: "PRJ003",
      nama: "Renovasi Kamar & Taman",
      status: "Ditunda",
      progress: 20,
      tanggalMulai: "2025-08-05",
      tanggalSelesai: "2025-11-20",
      mandor: "Siti Aminah",
      pengawas: "Fajar Nugroho",
      alamat: "Jl. Sudirman No. 78, Jakarta Pusat",
      nilaiProyek: 150_000_000,
      nilaiKeluar: 30_000_000,
      keteranganTerakhir: "Pekerjaan pondasi selesai",
      gambar: "https://placehold.co/600x400",
    },
    {
      id: "PRJ004",
      nama: "Perbaikan Atap & Plafon",
      status: "Aktif",
      progress: 10,
      tanggalMulai: "2025-10-01",
      tanggalSelesai: "2025-11-15",
      mandor: "Rahmat Hidayat",
      pengawas: "Dewi Lestari",
      alamat: "Jl. Mangga No. 99, Jakarta Timur",
      nilaiProyek: 75_000_000,
      nilaiKeluar: 10_000_000,
      keteranganTerakhir: "Pembongkaran atap lama selesai",
      gambar: "https://placehold.co/600x400",
    },
    {
      id: "PRJ005",
      nama: "Cat & Dekorasi Interior",
      status: "Aktif",
      progress: 5,
      tanggalMulai: "2025-10-10",
      tanggalSelesai: "2025-11-25",
      mandor: "Lina Marlina",
      pengawas: "Agus Saputra",
      alamat: "Jl. Melur No. 56, Jakarta Selatan",
      nilaiProyek: 50_000_000,
      nilaiKeluar: 2_500_000,
      keteranganTerakhir: "Persiapan cat dan peralatan",
      gambar: "https://placehold.co/600x400",
    },
  ];

  // Fungsi menghitung hari berjalan proyek aktif
  const hitungHariBerjalan = (tglMulai) => {
    const mulai = new Date(tglMulai);
    const sekarang = new Date();
    const diffTime = Math.max(sekarang - mulai, 0);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-teal-700">Daftar Proyek Saya</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {proyekList.map((proyek) => (
          <div
            key={proyek.id}
            className="card bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            {/* Gambar proyek */}
            <img
              src={proyek.gambar}
              alt={proyek.nama}
              className="w-full h-40 object-cover"
            />

            <div className="p-5 flex-1 flex flex-col justify-between">
              {/* Header proyek */}
              <div className="mb-3">
                <h2 className="text-xl font-semibold text-teal-600">{proyek.nama}</h2>
                <p className="text-sm text-gray-500">{proyek.alamat}</p>
              </div>

              {/* Detail proyek */}
              <div className="mb-3 space-y-1 text-sm text-gray-700">
                <p><span className="font-semibold">ID Proyek:</span> {proyek.id}</p>
                <p><span className="font-semibold">Mandor:</span> {proyek.mandor}</p>
                <p><span className="font-semibold">Pengawas:</span> {proyek.pengawas}</p>
                <p>
                  <span className="font-semibold">Tanggal:</span>{" "}
                  {proyek.tanggalMulai} - {proyek.tanggalSelesai}
                </p>
                {proyek.status === "Aktif" && (
                  <p>
                    <span className="font-semibold">Hari Berjalan:</span>{" "}
                    {hitungHariBerjalan(proyek.tanggalMulai)} hari
                  </p>
                )}
                <p><span className="font-semibold">Nilai Proyek:</span> Rp {proyek.nilaiProyek.toLocaleString()}</p>
                <p><span className="font-semibold">Pengeluaran:</span> Rp {proyek.nilaiKeluar.toLocaleString()}</p>
                <p><span className="font-semibold">Keterangan Terakhir:</span> {proyek.keteranganTerakhir}</p>

                {/* Progress bar */}
                <div className="mt-2">
                  <progress
                    className={`progress w-full ${proyek.status === "Selesai"
                      ? "progress-success"
                      : proyek.status === "Aktif"
                      ? "progress-primary"
                      : "progress-warning"
                    }`}
                    value={proyek.progress}
                    max="100"
                  ></progress>
                  <p className="text-right text-sm mt-1">{proyek.progress}%</p>
                </div>
              </div>

              {/* Footer card: status & button */}
              <div className="flex justify-between items-center mt-3">
                <span
                  className={`badge ${proyek.status === "Selesai"
                    ? "badge-success"
                    : proyek.status === "Aktif"
                      ? "badge-primary"
                      : "badge-warning"
                  }`}
                >
                  {proyek.status}
                </span>

                <button
                  className="btn btn-sm btn-outline btn-teal"
                  onClick={() => alert(`Lihat proses proyek: ${proyek.nama}`)}
                >
                  Lihat Proses
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card untuk pengajuan proyek baru */}
      <div
        className="card bg-teal-50 border-dashed border-2 border-teal-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:bg-teal-100 transition-all mt-6"
        onClick={() => alert("Buka form pengajuan proyek baru")}
      >
        <div className="text-4xl text-teal-600 mb-2">+</div>
        <h3 className="font-semibold text-teal-700 text-lg">Ajukan Proyek Baru</h3>
        <p className="text-sm text-teal-500 text-center mt-1">
          Tambahkan pembangunan baru atau pekerjaan tambahan
        </p>
      </div>
    </div>
  );
};

export default Proyek;
