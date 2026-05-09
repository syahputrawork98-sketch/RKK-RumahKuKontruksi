import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";

const Proyek = () => {
  const navigate = useNavigate();
  const { selectedCustomerId } = useCustomerPersona();
  const [proyekList, setProyekList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!selectedCustomerId) {
        setProyekList([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await projectService.getProjects({ customerId: selectedCustomerId });
        setProyekList(response.data || []);
        setError(null);
      } catch (err) {
        setError("Gagal mengambil data proyek. Pastikan server backend sudah jalan.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedCustomerId]);

  // Status mapping for visual consistency
  const getStatusConfig = (status) => {
    switch (status) {
      case "Selesai":
      case "completed":
        return { badge: "badge-success", progress: "progress-success" };
      case "Berjalan":
      case "ongoing":
      case "active":
        return { badge: "badge-primary", progress: "progress-primary" };
      case "Ditunda":
      case "Perencanaan":
      case "planning":
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

  if (!selectedCustomerId) {
    return (
      <div className="container mx-auto px-6 py-10">
        <RolePersonaEmptyState 
          title="Daftar Proyek Anda"
          description="Silakan pilih persona Konsumen terlebih dahulu menggunakan Persona Switcher untuk melihat daftar proyek yang Anda miliki."
          icon="🏗️"
        />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10 flex flex-col items-center justify-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-teal-600"></span>
        <p className="mt-4 text-gray-500">Memuat data proyek...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <div className="bg-red-50 p-6 rounded-lg border border-red-100 inline-block">
          <h2 className="text-xl font-bold text-red-700 mb-2">Error</h2>
          <p className="text-red-600">{error}</p>
          <button 
            className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none mt-4"
            onClick={() => window.location.reload()}
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Daftar Proyek Saya</h1>
          <p className="text-slate-500 mt-1">Monitoring seluruh pembangunan properti Anda secara real-time.</p>
        </div>
      </div>

      {proyekList.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-3xl mb-4">🏠</div>
          <h3 className="text-lg font-bold text-slate-700">Belum Ada Proyek Aktif</h3>
          <p className="text-slate-500 max-w-sm mt-2">Anda belum memiliki proyek konstruksi yang sedang berjalan di sistem kami.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyekList.map((proyek) => {
            const config = getStatusConfig(proyek.status);
            
            return (
              <div
                key={proyek.id}
                className="group bg-white rounded-[32px] shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-1"
              >
                {/* Gambar proyek */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={proyek.heroImage || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070"}
                    alt={proyek.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`badge px-4 py-3 border-none text-white font-bold text-[10px] uppercase tracking-widest shadow-lg ${config.badge}`}>
                      {proyek.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  {/* Header proyek */}
                  <div className="mb-6">
                    <h2 className="text-xl font-bold text-slate-800 line-clamp-1 group-hover:text-teal-600 transition-colors">{proyek.name}</h2>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-1">{proyek.location || "Lokasi belum ditentukan"}</p>
                  </div>

                  {/* Detail proyek */}
                  <div className="flex-1 space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Kode Proyek</span> 
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-50 px-2 py-1 rounded-lg">{proyek.projectCode}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Mandor</span> 
                      <span className="font-semibold text-slate-700">{proyek.foreman?.name || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Pengawas</span> 
                      <span className="font-semibold text-slate-700">{proyek.supervisor?.name || "-"}</span>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-slate-50">
                      <div className="flex justify-between mb-1">
                        <span className="text-slate-400">Nilai Proyek</span> 
                        <span className="font-bold text-slate-800">Rp {Number(proyek.budgetTotal || 0).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="pt-4">
                      <div className="flex justify-between text-xs mb-2">
                        <span className="font-bold text-slate-600 uppercase tracking-widest text-[10px]">Progres Lapangan</span>
                        <span className="font-black text-teal-600">{proyek.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${proyek.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${config.progress}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-8">
                    <button
                      className="btn btn-block bg-slate-800 hover:bg-teal-600 text-white border-none rounded-2xl shadow-lg shadow-slate-100 group-hover:shadow-teal-100 transition-all duration-300"
                      onClick={() => navigate(`/konsumen/timeline-proyek?projectId=${proyek.id}`, { state: { projectId: proyek.id } })}
                    >
                      Lihat Detail Timeline
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Card untuk pengajuan proyek baru */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="mt-12 p-8 bg-teal-50 border-2 border-dashed border-teal-200 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-teal-100/50 transition-all"
        onClick={() => alert("Fitur pengajuan proyek baru sedang disiapkan.")}
      >
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 text-2xl shadow-sm mb-4">
          +
        </div>
        <h3 className="font-bold text-teal-800 text-lg">Ajukan Proyek Baru</h3>
        <p className="text-sm text-teal-600/70 text-center mt-1 max-w-sm">
          Mulai pembangunan baru atau ajukan renovasi tambahan dengan standar kualitas RKK.
        </p>
      </motion.div>
    </div>
  );
};

export default Proyek;
