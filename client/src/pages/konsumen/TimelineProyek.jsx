import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import TLProyek from "../../components/konsumen/TLProyek";
import projectService from "../../services/projectService";
import { FiMapPin, FiCalendar, FiClock, FiDollarSign, FiCheckCircle, FiUser, FiInfo, FiPenTool, FiActivity, FiArrowRight } from "react-icons/fi";

const TimelineProyek = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryProjectId = queryParams.get("projectId");
  const stateProjectId = location.state?.projectId;
  
  const projectId = queryProjectId || stateProjectId;
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePhase, setActivePhase] = useState("construction"); // "design" or "construction"

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!projectId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await projectService.getProjectById(projectId);
        const raw = response.data;

        // Map backend data to frontend structure
        const mappedProject = {
          ...raw,
          startDate: raw.startDate ? new Date(raw.startDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
          estimatedEndDate: raw.estimatedEndDate ? new Date(raw.estimatedEndDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-',
          budget: {
            total: Number(raw.budgetTotal || 0),
            paid: Number(raw.paidAmount || 0),
            remaining: Number(raw.remainingAmount || 0)
          },
          // Map stages to timeline
          timeline: (raw.stages || []).map(s => ({
            id: s.id,
            code: s.code || "N/A",
            title: s.title,
            status: s.status === 'completed' || s.status === 'Selesai' || s.isVerified ? 'verified' : (['ongoing', 'active', 'Berjalan'].includes(s.status) ? 'in_progress' : 'pending'),
            date: s.startDate ? new Date(s.startDate).toLocaleDateString('id-ID', { month: 'short', year: 'numeric' }) : '-',
            startDate: s.startDate ? new Date(s.startDate).toLocaleDateString('id-ID') : '-',
            endDate: s.endDate ? new Date(s.endDate).toLocaleDateString('id-ID') : '-',
            durationDays: s.startDate && s.endDate ? Math.ceil((new Date(s.endDate) - new Date(s.startDate)) / (1000 * 60 * 60 * 24)) : 0,
            progress: s.progress || 0,
            isVerified: s.isVerified,
            verification: {
              isVerified: s.isVerified,
              verifiedBy: s.verifiedBy || "Pengawas"
            },
            evidenceCount: (s._count?.journalActivities || 0) + (s._count?.reportNotes || 0),
            hasEvidence: (s._count?.journalActivities || 0) > 0 || (s._count?.reportNotes || 0) > 0,
            note: s.note,
            description: s.description,
            tasks: (s.rabItems || []).map(item => item.description)
          })),
          verifiedProgress: raw.verifiedProgress || 0,
          // Using real team data from backend relations
          team: {
            admin: {
              name: raw.admin?.name || "Admin Belum Ditugaskan",
              role: "Administrator",
              avatar: raw.admin?.avatar || `https://ui-avatars.com/api/?name=${raw.admin?.name || 'Admin'}&background=0D9488&color=fff`,
              status: raw.admin ? "Online" : "N/A"
            },
            supervisor: {
              name: raw.supervisor?.name || "Pengawas Belum Ditugaskan",
              role: "Pengawas Lapangan",
              avatar: raw.supervisor?.avatar || `https://ui-avatars.com/api/?name=${raw.supervisor?.name || 'Supervisor'}&background=F59E0B&color=fff`,
              status: raw.supervisor ? "Di Lapangan" : "N/A"
            },
            foreman: {
              name: raw.foreman?.name || "Mandor Belum Ditugaskan",
              role: "Mandor Proyek",
              avatar: raw.foreman?.avatar || `https://ui-avatars.com/api/?name=${raw.foreman?.name || 'Mandor'}&background=3B82F6&color=fff`,
              status: raw.foreman ? "Aktif" : "N/A"
            }
          }
        };

        setProject(mappedProject);
        setError(null);
      } catch (err) {
        setError("Gagal memuat detail proyek.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  if (!projectId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-inner">
            🔍
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Pilih Proyek Terlebih Dahulu</h2>
          <p className="text-slate-500 mt-2">
            Silakan pilih salah satu proyek dari daftar proyek Anda untuk melihat timeline dan progres detailnya.
          </p>
          <Link to="/konsumen/proyek" className="btn bg-teal-600 hover:bg-teal-700 text-white mt-8 rounded-2xl px-8">
            Ke Daftar Proyek
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50">
        <span className="loading loading-spinner loading-lg text-teal-600"></span>
        <p className="mt-4 text-gray-500">Memuat detail proyek...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-gray-50">
        <div className="text-center max-w-md">
          <FiMapPin className="text-gray-300 mx-auto mb-4" size={48} />
          <h2 className="text-xl font-bold text-gray-700">{error || "Proyek tidak ditemukan"}</h2>
          <p className="text-gray-500 mt-2">Data proyek yang Anda cari tidak tersedia atau ID tidak valid.</p>
          <Link to="/konsumen/proyek" className="btn bg-teal-600 hover:bg-teal-700 text-white mt-6 rounded-2xl px-8">Kembali ke Daftar Proyek</Link>
        </div>
      </div>
    );
  }

  const hasTimeline = Array.isArray(project.timeline) && project.timeline.length > 0;


  const formatCurrency = (value) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <div className="min-h-screen bg-neutral-20 pb-20">
      {/* 1. Project Hero Section */}
      <section className="relative h-[480px] overflow-hidden rounded-b-[40px] md:rounded-b-[60px] shadow-2xl">
        <img 
          src={project.heroImage || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070"} 
          alt={project.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-neutral-100 via-neutral-100/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
          <div className="max-w-6xl mx-auto space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap items-center gap-3"
            >
              <span className={`px-4 py-1.5 text-white text-[10px] font-black rounded-full shadow-lg uppercase tracking-wider ${
                ['active', 'ongoing', 'Berjalan'].includes(project.status) ? "bg-emerald-600" :
                ['finished', 'Selesai'].includes(project.status) ? "bg-blue-600" : "bg-amber-500"
              }`}>
                {['active', 'ongoing', 'Berjalan'].includes(project.status) ? "Operasional Aktif" : 
                 ['finished', 'Selesai'].includes(project.status) ? "Proyek Selesai" : "Fase Persiapan"}
              </span>
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full border border-white/20 uppercase tracking-wider">
                {project.type || "Pembangunan"}
              </span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black leading-tight tracking-tighter"
            >
              {project.name}
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/90"
            >
              <div className="flex items-center gap-2">
                <FiMapPin className="text-teal-400" /> {project.location}
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-teal-400" /> Kontrak: {project.startDate}
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="text-teal-400" /> Estimasi: {project.estimatedEndDate}
              </div>
            </motion.div>

            {/* Overall Progress Bar */}
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="pt-6"
            >
              <div className="flex justify-between items-end mb-2">
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] opacity-80">Transparansi Progres</span>
                  <p className="text-sm font-black text-white uppercase tracking-widest">Progress Resmi (Verified Pengawas)</p>
                </div>
                <span className="text-4xl font-black text-teal-400">{project.verifiedProgress}%</span>
              </div>
              <div className="w-full h-5 bg-white/10 rounded-full overflow-hidden p-1 border border-white/20 backdrop-blur-sm shadow-inner">
                <motion.div 
                  className="h-full bg-teal-500 rounded-full shadow-[0_0_20px_rgba(20,184,166,0.6)] relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{ width: `${project.verifiedProgress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </motion.div>
              </div>
              <p className="text-[10px] text-white/60 italic font-medium mt-3 flex items-center gap-2">
                <FiInfo className="shrink-0" /> Progress resmi didasarkan pada verifikasi kualitas oleh Pengawas Lapangan.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PHASE SELECTOR */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-white p-2 rounded-3xl border border-neutral-30 shadow-sm flex items-center gap-2 w-full md:w-fit">
          <button 
            onClick={() => setActivePhase("design")}
            className={`flex-1 md:flex-none px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
              activePhase === "design" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" : "text-neutral-50 hover:bg-neutral-10"
            }`}
          >
            <FiPenTool size={16} /> Fase Desain
          </button>
          <button 
            onClick={() => setActivePhase("construction")}
            className={`flex-1 md:flex-none px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
              activePhase === "construction" ? "bg-teal-600 text-white shadow-lg shadow-teal-600/20" : "text-neutral-50 hover:bg-neutral-10"
            }`}
          >
            <FiActivity size={16} /> Fase Konstruksi
          </button>
        </div>
      </div>

      {activePhase === "design" ? (
        <div className="max-w-6xl mx-auto px-6 mt-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-[40px] border border-neutral-30 shadow-xl text-center space-y-6"
          >
            <div className="w-24 h-24 bg-indigo-50 rounded-[32px] flex items-center justify-center text-indigo-600 mx-auto border border-indigo-100">
              <FiPenTool size={48} />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-2xl font-black text-neutral-100 uppercase tracking-tight">Timeline & Kolaborasi Desain</h3>
              <p className="text-sm text-neutral-60 leading-relaxed">
                Pantau proses perancangan, revisi gambar kerja, hingga persetujuan draft RAB dalam satu alur kolaborasi terpadu.
              </p>
            </div>
            <div className="pt-6">
              <Link 
                to="/konsumen/design-request"
                className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all"
              >
                Buka Detail & Timeline Desain <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {project.status === 'Selesai' && (
            <div className="max-w-6xl mx-auto px-6 mt-8">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-linear-to-r from-blue-700 to-blue-500 text-white p-8 rounded-[40px] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-white/20"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-xl border border-white/30">
                    <FiCheckCircle size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight uppercase">Pekerjaan Selesai</h3>
                    <p className="text-sm font-bold opacity-80 uppercase tracking-widest mt-1">Fase Konstruksi Lapangan Berakhir</p>
                  </div>
                </div>
                <div className="md:text-right space-y-2 max-w-md">
                  <p className="text-xs font-bold leading-relaxed opacity-90 italic">
                    "Seluruh tahapan pembangunan dalam kontrak ini telah dinyatakan selesai secara operasional. Terima kasih telah mempercayakan impian hunian Anda kepada RumahKu Konstruksi."
                  </p>
                  <div className="pt-2">
                    <span className="px-4 py-1 bg-white text-blue-600 text-[10px] font-black uppercase rounded-full tracking-widest shadow-lg">
                      Local History Mode
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10 space-y-12">
        {/* 2. Summary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-primary-surface rounded-2xl flex items-center justify-center text-primary-main">
              <FiDollarSign size={28} />
            </div>
            <div>
              <p className="text-s-bold text-neutral-60 uppercase tracking-widest">Nilai Proyek</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.total)}</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-success-main/10 rounded-2xl flex items-center justify-center text-success-main">
              <FiCheckCircle size={28} />
            </div>
            <div>
              <p className="text-s-bold text-neutral-60 uppercase tracking-widest">Total Terbayar</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.paid)}</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5"
          >
            <div className="w-14 h-14 bg-error-main/10 rounded-2xl flex items-center justify-center text-error-main">
              <FiDollarSign size={28} />
            </div>
            <div>
              <p className="text-s-bold text-neutral-60 uppercase tracking-widest">Sisa Pembayaran</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.remaining)}</p>
            </div>
          </motion.div>
        </div>

        {/* 3. Team Cards Section */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <h2 className="text-heading-m-bold text-neutral-100 flex items-center gap-3">
              <FiUser className="text-primary-main" /> Tim Proyek Anda
            </h2>
            <p className="text-[10px] font-black text-neutral-40 uppercase tracking-tighter italic">Informasi representatif fase local development</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(project.team).map(([key, member]) => (
              <div key={key} className="bg-white p-6 rounded-[32px] shadow-md border border-neutral-30 flex items-center gap-4">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-primary-surface" />
                <div>
                  <p className="text-m-bold text-neutral-100">{member.name}</p>
                  <p className="text-s-regular text-neutral-60">{member.role}</p>
                  <span className="inline-flex items-center gap-1.5 mt-1 text-xs-bold text-success-main">
                    <span className="w-1.5 h-1.5 rounded-full bg-success-main"></span> {member.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Timeline Section */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-heading-m-bold text-neutral-100">Timeline Pelaksanaan</h2>
              <p className="text-m-regular text-neutral-60 mt-1">Pantau perkembangan pekerjaan tahap demi tahap.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-white border border-neutral-30 rounded-lg text-s-bold text-neutral-70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-success-main"></span> Verified
              </span>
              <span className="px-3 py-1 bg-white border border-neutral-30 rounded-lg text-s-bold text-neutral-70 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-main"></span> In Progress
              </span>
            </div>
          </div>
          
          {hasTimeline ? (
            <TLProyek timeline={project.timeline} />
          ) : (
            <div className="bg-white rounded-[40px] border-2 border-dashed border-neutral-30 p-20 text-center space-y-4">
              <div className="w-24 h-24 bg-neutral-20 rounded-3xl flex items-center justify-center mx-auto text-neutral-40">
                <FiCalendar size={40} />
              </div>
              <div className="space-y-2">
                <h3 className="text-heading-s-bold text-neutral-100">Timeline Belum Tersedia</h3>
                <p className="text-m-regular text-neutral-60 max-w-sm mx-auto">
                  Jadwal pelaksanaan proyek ini sedang dalam tahap penyusunan oleh tim admin dan pengawas lapangan.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )}
    </div>
  );
};

export default TimelineProyek;
