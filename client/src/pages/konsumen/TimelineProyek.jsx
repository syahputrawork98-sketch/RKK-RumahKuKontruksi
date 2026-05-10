import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import TLProyek from "../../components/konsumen/TLProyek";
import projectService from "../../services/projectService";
import { FiMapPin, FiCalendar, FiClock, FiDollarSign, FiCheckCircle, FiUser, FiInfo, FiPenTool, FiActivity, FiArrowRight, FiLayers, FiBox, FiChevronDown, FiEye, FiLock } from "react-icons/fi";

const TimelineProyek = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryProjectId = queryParams.get("projectId");
  const stateProjectId = location.state?.projectId;
  
  const projectId = queryProjectId || stateProjectId;
  const [rabData, setRabData] = useState(null);
  const [selectedRabId, setSelectedRabId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      if (!projectId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [projectRes, rabRes] = await Promise.all([
          projectService.getProjectById(projectId),
          projectService.getProjectRab(projectId)
        ]);

        const raw = projectRes.data;
        const rabRaw = rabRes.data;

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
            week: s.week,
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
            tasks: (s.rabItems || []).map(item => item.description),
            categoryId: s.categoryId,
            rabPlanId: s.rabPlanId
          })),
          verifiedProgress: raw.verifiedProgress || 0,
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
        setRabData(rabRaw);
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
  const filteredTimeline = (selectedCategoryId || selectedRabId)
    ? project.timeline.filter(item =>
        (selectedCategoryId && item.categoryId === selectedCategoryId) ||
        (selectedRabId && (project.stages?.find(s => s.id === item.id)?.rabItems?.some(ri => ri.id === selectedRabId)))
      )
    : project.timeline;


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
        {/* 2. Summary Cards Grid - LOCAL SIMULATION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5 relative overflow-hidden group"
          >
            <div className="absolute top-2 right-4 opacity-5 group-hover:opacity-10 transition-all">
                <FiDollarSign size={40} />
            </div>
            <div className="w-14 h-14 bg-primary-surface rounded-2xl flex items-center justify-center text-primary-main">
              <FiDollarSign size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-40 uppercase tracking-widest mb-0.5">Nilai Proyek (Local)</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.total)}</p>
              <p className="text-[8px] font-bold text-neutral-40 uppercase tracking-tighter mt-1 italic">Sesuai Kontrak RAB</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5 relative overflow-hidden group"
          >
            <div className="absolute top-2 right-4 opacity-5 group-hover:opacity-10 transition-all text-success-main">
                <FiCheckCircle size={40} />
            </div>
            <div className="w-14 h-14 bg-success-main/10 rounded-2xl flex items-center justify-center text-success-main">
              <FiCheckCircle size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-40 uppercase tracking-widest mb-0.5">Terbayar (Demo)</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.paid)}</p>
              <p className="text-[8px] font-bold text-success-main uppercase tracking-tighter mt-1 italic">Verified Local Sync</p>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-[32px] shadow-lg border border-neutral-30 flex items-center gap-5 relative overflow-hidden group"
          >
            <div className="absolute top-2 right-4 opacity-5 group-hover:opacity-10 transition-all text-error-main">
                <FiDollarSign size={40} />
            </div>
            <div className="w-14 h-14 bg-error-main/10 rounded-2xl flex items-center justify-center text-error-main">
              <FiDollarSign size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-neutral-40 uppercase tracking-widest mb-0.5">Sisa (Simulasi)</p>
              <p className="text-heading-s-bold text-neutral-100">{formatCurrency(project.budget.remaining)}</p>
              <p className="text-[8px] font-bold text-error-main uppercase tracking-tighter mt-1 italic">Mode: Local Hold State</p>
            </div>
          </motion.div>
        </div>

        {/* DISCLAIMER LOCAL FINANCE */}
        <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-3">
            <FiInfo className="text-blue-400" size={16} />
            <p className="text-[10px] font-black text-blue-700 uppercase leading-relaxed tracking-tighter">
                Seluruh data keuangan di atas adalah <span className="text-[var(--dashboard-primary)]">Simulasi Local Workflow</span>. Fitur pembayaran real (Gateway/Legal) tidak dibuka pada tahap local development ini.
            </p>
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

        {/* 4. Timeline Section - Two Panel Layout */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-heading-m-bold text-neutral-100">Timeline Pelaksanaan</h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <p className="text-m-regular text-neutral-60 flex items-center gap-2">
                  Pantau perkembangan pekerjaan berdasarkan struktur RAB.
                </p>
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-tighter">
                  Customer-visible summary
                </span>
                <span className="text-[9px] font-black text-neutral-40 uppercase bg-neutral-20 px-2 py-0.5 rounded border border-neutral-30 tracking-tighter">
                  Local Sync Thread
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { setSelectedCategoryId(null); setSelectedRabId(null); }}
                className={`px-3 py-1 border rounded-lg text-xs font-bold transition-all ${!selectedCategoryId && !selectedRabId ? 'bg-primary-main text-white border-primary-main' : 'bg-white text-neutral-60 border-neutral-30 hover:bg-neutral-10'}`}
              >
                Semua Update
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* LEFT PANEL: RAB TREE */}
            <div className="w-full lg:w-1/3 sticky top-24">
              <div className="bg-white rounded-[32px] border border-neutral-30 shadow-xl overflow-hidden">
                <div className="p-6 border-b border-neutral-20 bg-neutral-10/50">
                  <h3 className="text-[10px] font-black text-neutral-100 uppercase tracking-[0.2em] flex items-center gap-2">
                    <FiLayers className="text-primary-main" /> Struktur Pekerjaan (RAB)
                  </h3>
                  <p className="text-[10px] text-neutral-50 mt-1 italic leading-tight">
                    Klik kategori atau item untuk memfilter timeline pelaksanaan.
                  </p>
                </div>

                <div className="p-4 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {rabData?.categories?.length > 0 ? (
                    <div className="space-y-3">
                      {rabData.categories.map((cat) => (
                        <div key={cat.id} className="space-y-1">
                          <button
                            onClick={() => {
                              setSelectedCategoryId(selectedCategoryId === cat.id ? null : cat.id);
                              setSelectedRabId(null);
                            }}
                            className={`w-full flex items-center justify-between p-3 rounded-2xl text-left transition-all group ${
                              selectedCategoryId === cat.id
                                ? "bg-primary-surface text-primary-main border border-primary-main/20"
                                : "hover:bg-neutral-10 text-neutral-80 border border-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                selectedCategoryId === cat.id ? "bg-primary-main text-white" : "bg-neutral-20 text-neutral-50 group-hover:bg-neutral-30"
                              }`}>
                                <FiBox size={14} />
                              </div>
                              <div className="overflow-hidden">
                                <p className="text-xs font-black uppercase tracking-tight truncate">{cat.name}</p>
                                <p className="text-[9px] text-neutral-50 font-bold uppercase tracking-tighter">
                                  {cat.items?.length || 0} Item Pekerjaan
                                </p>
                              </div>
                            </div>
                            <FiChevronDown className={`transition-transform ${selectedCategoryId === cat.id ? "rotate-180" : ""}`} />
                          </button>

                          {/* RAB ITEMS */}
                          {(selectedCategoryId === cat.id || selectedRabId) && cat.items?.map((item) => {
                            const isSelected = selectedRabId === item.id;
                            const hasUpdate = project.stages?.some(s => s.rabItems?.some(ri => ri.id === item.id));

                            // If we're filtering by item, only show items in the selected category OR the selected item itself
                            if (selectedCategoryId && item.categoryId !== selectedCategoryId) return null;

                            return (
                              <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={item.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRabId(isSelected ? null : item.id);
                                  setSelectedCategoryId(null);
                                }}
                                className={`w-full flex items-center gap-3 pl-12 pr-4 py-2.5 rounded-xl text-left transition-all ${
                                  isSelected ? "bg-teal-50 text-teal-700 font-bold" : "hover:bg-neutral-10 text-neutral-60"
                                }`}
                              >
                                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                  item.progress === 100 ? "bg-success-main shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                                  item.progress > 0 ? "bg-primary-main" : "bg-neutral-30"
                                }`} />
                                <div className="flex-1 overflow-hidden">
                                  <p className="text-[11px] leading-tight truncate">{item.description}</p>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[8px] font-black uppercase tracking-tighter opacity-70">{item.progress}% Selesai</span>
                                    {hasUpdate && (
                                      <span className="flex items-center gap-1 text-[8px] font-black text-emerald-600 uppercase tracking-tighter">
                                        <FiEye size={8} /> Ada Update
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-12 text-center space-y-3">
                      <div className="w-12 h-12 bg-neutral-10 rounded-2xl flex items-center justify-center mx-auto text-neutral-30">
                        <FiLock size={20} />
                      </div>
                      <p className="text-[10px] text-neutral-50 font-bold uppercase tracking-widest italic">Data RAB Belum Dimuat</p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-neutral-10 border-t border-neutral-20">
                  <div className="flex items-center gap-2 text-[9px] text-neutral-40 font-medium italic">
                    <FiInfo className="shrink-0" />
                    <span>Hanya item pekerjaan yang relevan dengan pengerjaan rill yang ditampilkan di struktur ini.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL: EXECUTION TIMELINE */}
            <div className="w-full lg:w-2/3">
              {(selectedCategoryId || selectedRabId) && (
                <div className="mb-6 flex items-center justify-between p-4 bg-white border border-primary-main/20 rounded-3xl shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-surface rounded-xl flex items-center justify-center text-primary-main">
                        <FiActivity size={16} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-neutral-100 uppercase tracking-widest">Memfilter Timeline:</p>
                        <p className="text-xs font-bold text-primary-main">
                          {selectedCategoryId ? rabData.categories.find(c => c.id === selectedCategoryId)?.name :
                           rabData.categories.flatMap(c => c.items).find(i => i.id === selectedRabId)?.description}
                        </p>
                      </div>
                   </div>
                   <button
                    onClick={() => { setSelectedCategoryId(null); setSelectedRabId(null); }}
                    className="text-[10px] font-black text-neutral-40 uppercase hover:text-error-main transition-colors"
                   >
                     Hapus Filter
                   </button>
                </div>
              )}

              {filteredTimeline.length > 0 ? (
                <TLProyek timeline={filteredTimeline} />
              ) : (
                <div className="bg-white rounded-[40px] border-2 border-dashed border-neutral-30 p-20 text-center space-y-4">
                  <div className="w-24 h-24 bg-neutral-20 rounded-3xl flex items-center justify-center mx-auto text-neutral-40">
                    <FiCalendar size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-heading-s-bold text-neutral-100">
                      {selectedCategoryId || selectedRabId ? "Tidak Ada Update Terkurasi" : "Timeline Belum Tersedia"}
                    </h3>
                    <p className="text-m-regular text-neutral-60 max-w-sm mx-auto leading-relaxed font-bold">
                      {selectedCategoryId || selectedRabId
                        ? "Belum ada laporan lapangan atau review pengawas yang dipublikasikan untuk kategori/item ini."
                        : "Jadwal pelaksanaan proyek ini sedang dalam tahap penyusunan oleh tim admin dan pengawas lapangan."}
                    </p>
                    {(selectedCategoryId || selectedRabId) && (
                      <button
                        onClick={() => { setSelectedCategoryId(null); setSelectedRabId(null); }}
                        className="text-xs font-black text-primary-main uppercase mt-4 underline"
                      >
                        Lihat Semua Update Proyek
                      </button>
                    )}
                  </div>
                </div>
              )}
              <p className="text-[10px] text-neutral-40 italic text-center pt-8">
                * Catatan internal teknis Mandor/Pengawas tidak ditampilkan pada timeline publik Konsumen demi menjaga fokus transparansi hasil kerja.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )}
    </div>
  );
};

export default TimelineProyek;
