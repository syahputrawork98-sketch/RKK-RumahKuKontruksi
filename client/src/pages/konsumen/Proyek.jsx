import React from "react";
import { useNavigate } from "react-router-dom";
import { getCustomerProjects } from "../../data/mock/helpers";

const Proyek = () => {
  const navigate = useNavigate();
  // Assume customer-001 is logged in
  const proyekList = getCustomerProjects("customer-001");

  // Status mapping for visual consistency
  const getStatusConfig = (status) => {
    switch (status) {
      case "Selesai":
        return { badge: "badge-success", progress: "progress-success" };
      case "Berjalan":
        return { badge: "badge-primary", progress: "progress-primary" };
      case "Ditunda":
      case "Perencanaan":
      case "Penawaran":
        return { badge: "badge-warning", progress: "progress-warning" };
      default:
        return { badge: "badge-ghost", progress: "progress-ghost" };
    }
  };

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
        {proyekList.map((proyek) => {
          const config = getStatusConfig(proyek.status);
          
          return (
            <div
              key={proyek.id}
              className="card bg-white shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
            >
              {/* Gambar proyek */}
              <img
                src={proyek.heroImage}
                alt={proyek.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 flex-1 flex flex-col justify-between">
                {/* Header proyek */}
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-teal-700 line-clamp-1">{proyek.name}</h2>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <span className="truncate">{proyek.location}</span>
                  </p>
                </div>

                {/* Detail proyek */}
                <div className="mb-4 space-y-2 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">Kode:</span> 
                    <span className="font-mono bg-gray-100 px-1 rounded">{proyek.projectCode}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Mandor:</span> 
                    <span>{proyek.foremanName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Pengawas:</span> 
                    <span>{proyek.supervisorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Periode:</span> 
                    <span className="text-xs">{proyek.startDate} - {proyek.estimatedEndDate}</span>
                  </div>
                  
                  {proyek.status === "Berjalan" && (
                    <div className="flex justify-between text-teal-600">
                      <span className="font-semibold">Hari Berjalan:</span> 
                      <span>{hitungHariBerjalan(proyek.startDate)} hari</span>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex justify-between mb-1">
                      <span className="font-semibold">Nilai Proyek:</span> 
                      <span className="font-bold text-teal-700">Rp {proyek.budgetTotal?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Terbayar:</span> 
                      <span>Rp {proyek.paidAmount?.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Progres Lapangan</span>
                      <span className="font-bold">{proyek.progress}%</span>
                    </div>
                    <progress
                      className={`progress w-full h-2 ${config.progress}`}
                      value={proyek.progress}
                      max="100"
                    ></progress>
                  </div>
                </div>

                {/* Footer card: status & button */}
                <div className="flex justify-between items-center mt-auto pt-4">
                  <span className={`badge px-3 py-3 border-none text-white ${config.badge}`}>
                    {proyek.status}
                  </span>

                  <button
                    className="btn btn-sm bg-teal-600 hover:bg-teal-700 text-white border-none"
                    onClick={() => navigate(`/konsumen/TimelineProyek?projectId=${proyek.id}`, { state: { projectId: proyek.id } })}
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
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
