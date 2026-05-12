import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiUser, FiInfo, FiActivity, FiPlus } from "react-icons/fi";
import projectService from "../../services/projectService";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

const Proyek = () => {
  const navigate = useNavigate();
  const { selectedCustomerId } = useCustomerPersona();
  const [proyekList, setProyekList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    if (!selectedCustomerId) {
      setProyekList([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await projectService.getProjects({ customerId: selectedCustomerId });
      if (response.success) {
        setProyekList(response.data || []);
      } else {
        setError(response.message || "Gagal mengambil data proyek.");
      }
    } catch (err) {
      setError("Gagal mengambil data proyek dari server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCustomerId]);

  // Status mapping logic removed in favor of StatusBadge component

  if (!selectedCustomerId && !loading) {
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

  if (loading && proyekList.length === 0) return <RoleDataState type="loading" message="Memuat proyek konstruksi Anda..." />;

  if (error) {
    return (
      <div className="container mx-auto px-6 py-10">
        <RoleDataState 
          type="error"
          title="Gagal Memuat Proyek"
          description={error}
          onRetry={fetchProjects}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">Proyek Saya</h1>
          <p className="text-slate-500 mt-2 font-medium">Monitoring transparansi pembangunan hunian Anda.</p>
        </div>
        <div className="bg-teal-50 border border-teal-100 px-4 py-2 rounded-2xl flex items-center gap-2">
            <FiInfo className="text-teal-600" />
            <p className="text-[10px] font-black text-teal-700 uppercase tracking-widest">Official Source of Truth</p>
        </div>
      </div>

      {proyekList.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[40px] p-20 text-center flex flex-col items-center shadow-inner">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-4xl mb-6 shadow-sm">🏠</div>
          <h3 className="text-xl font-bold text-slate-700">Belum Ada Proyek Aktif</h3>
          <p className="text-slate-500 max-w-sm mt-2 leading-relaxed">
            Anda belum memiliki proyek konstruksi yang sedang berjalan. Hubungi Admin RKK untuk aktivasi proyek atau pengajuan baru.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyekList.map((proyek) => {
            const verifiedProgress = proyek.verifiedProgress || 0;
            
            return (
              <motion.div
                key={proyek.id}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-[40px] shadow-sm hover:shadow-2xl border border-slate-100 overflow-hidden flex flex-col transition-all duration-500"
              >
                {/* Gambar proyek */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={proyek.heroImage || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070"}
                    alt={proyek.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-6 right-6">
                    <StatusBadge type="project" status={proyek.status} />
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col space-y-6">
                  {/* Header proyek */}
                  <div>
                    <h2 className="text-xl font-black text-slate-800 line-clamp-1 group-hover:text-teal-600 transition-colors uppercase tracking-tight">{proyek.name || "Proyek Tanpa Nama"}</h2>
                    <div className="flex items-center gap-2 mt-2 text-slate-400">
                        <FiMapPin size={12} className="text-teal-500" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{proyek.location || "Lokasi Lapangan"}</span>
                    </div>
                  </div>

                  {/* Detail proyek */}
                  <div className="space-y-3 pt-4 border-t border-slate-50">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID Proyek</span> 
                      <span className="font-mono text-[10px] font-black text-slate-700 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 uppercase">{proyek.projectCode || "N/A"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><FiUser size={10} /> Mandor</span> 
                      <span className="text-xs font-black text-slate-800 uppercase tracking-tighter">{proyek.foreman?.name || "-"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><FiActivity size={10} /> Pengawas</span> 
                      <span className="text-xs font-black text-slate-800 uppercase tracking-tighter">{proyek.supervisor?.name || "-"}</span>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="pt-4 space-y-2">
                      <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                            <span className="font-black text-slate-800 uppercase tracking-widest text-[9px]">Progres Resmi</span>
                            <p className="text-[8px] text-slate-400 italic font-medium leading-none">Verified by RKK</p>
                        </div>
                        <span className="font-black text-teal-600 text-lg">{verifiedProgress}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${verifiedProgress}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={`h-full rounded-full shadow-lg shadow-teal-500/20 ${['selesai', 'completed'].includes(proyek.status?.toLowerCase()) ? 'bg-emerald-500' : 'bg-teal-500'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 mt-auto">
                    <button
                      className="w-full py-4 bg-slate-900 hover:bg-teal-600 text-white border-none rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 transition-all duration-300 active:scale-95"
                      onClick={() => navigate(`/konsumen/timeline-proyek?projectId=${proyek.id}`)}
                    >
                      Buka Timeline & Diskusi
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Card untuk pengajuan proyek baru */}
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="mt-16 p-12 bg-gradient-to-br from-slate-50 to-teal-50/30 border-2 border-dashed border-teal-200 rounded-[40px] flex flex-col items-center justify-center cursor-pointer group hover:bg-white hover:border-teal-400 transition-all shadow-inner"
        onClick={() => alert("Fitur pengajuan proyek baru (New Project Brief) sedang disiapkan di fase Local CRUD berikutnya.")}
      >
        <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-teal-600 text-2xl shadow-md mb-6 group-hover:bg-teal-500 group-hover:text-white transition-colors">
          <FiPlus />
        </div>
        <h3 className="font-black text-slate-800 text-xl uppercase tracking-tight">Ajukan Proyek Baru</h3>
        <p className="text-sm text-slate-500 text-center mt-2 max-w-sm font-medium">
          Mulai pembangunan baru atau ajukan renovasi tambahan dengan transparansi dan standar kualitas RKK.
        </p>
      </motion.div>
    </div>
  );
};

export default Proyek;
