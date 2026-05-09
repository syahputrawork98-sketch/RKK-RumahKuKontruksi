import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    FiActivity, FiCheckCircle, FiClock, 
    FiArrowRight, FiInfo, FiCalendar, FiMapPin,
    FiPackage, FiFileText, FiEdit3
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import projectService from "../../services/projectService";
import designRequestService from "../../services/designRequestService";
import RoleDataState from "../../components/common/RoleDataState";

const DashboardKonsumen = () => {
    const navigate = useNavigate();
    const { selectedCustomerId, selectedCustomer } = useCustomerPersona();
    const [projects, setProjects] = useState([]);
    const [designRequests, setDesignRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDashboardData = async () => {
        if (!selectedCustomerId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            const [projRes, drRes] = await Promise.all([
                projectService.getProjects({ customerId: selectedCustomerId }),
                designRequestService.getAllDesignRequests({ customerId: selectedCustomerId })
            ]);

            if (projRes.success) {
                setProjects(projRes.data || []);
            }
            if (drRes.success) {
                setDesignRequests(drRes.data || []);
            }
            setError(null);
        } catch (err) {
            console.error("Dashboard fetch error:", err);
            setError("Gagal memuat data dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [selectedCustomerId]);

    if (loading && projects.length === 0) return <RoleDataState type="loading" message="Menyiapkan dashboard Anda..." />;

    const activeProjects = projects.filter(p => 
        ['active', 'ongoing', 'Berjalan'].includes(p.status)
    );
    const completedProjects = projects.filter(p => 
        ['completed', 'Selesai'].includes(p.status)
    );

    return (
        <div className="space-y-8 animate-fadeIn pb-10">
            {/* 1. WELCOME HERO */}
            <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-teal-800 to-teal-950 text-white p-10 md:p-14 shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                    <div className="space-y-6 max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 text-[10px] font-black uppercase tracking-[0.2em]"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_10px_rgba(45,212,191,0.5)]" />
                            Official Customer Portal
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black leading-tight tracking-tighter"
                        >
                            Halo, <br/>
                            <span className="text-teal-400">{selectedCustomer?.name || "Konsumen"}</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-teal-50/70 text-sm md:text-lg leading-relaxed max-w-xl font-medium"
                        >
                            Pantau transparansi progres pembangunan Anda secara real-time. Seluruh data yang Anda lihat telah divalidasi oleh tim pengawas RKK.
                        </motion.p>
                    </div>

                    <div className="flex gap-4">
                        <Link 
                            to="/konsumen/proyek"
                            className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-teal-500/20 flex items-center gap-3 group active:scale-95"
                        >
                            Proyek Saya <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-teal-300/5 rounded-full blur-[100px]" />
            </section>

            {/* 2. STATS OVERVIEW */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-lg transition-all duration-500">
                    <div className="w-16 h-16 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-600 shadow-inner">
                        <FiPackage size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Proyek</p>
                        <p className="text-3xl font-black text-slate-800">{projects.length}</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-lg transition-all duration-500">
                    <div className="w-16 h-16 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-600 shadow-inner">
                        <FiActivity size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Sedang Berjalan</p>
                        <p className="text-3xl font-black text-slate-800">{activeProjects.length}</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-6 hover:shadow-lg transition-all duration-500">
                    <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 shadow-inner">
                        <FiCheckCircle size={32} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Telah Selesai</p>
                        <p className="text-3xl font-black text-slate-800">{completedProjects.length}</p>
                    </div>
                </div>
            </section>

            {/* 3. MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* LEFT: ACTIVE PROJECTS LIST */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight uppercase">
                            <FiActivity className="text-teal-600" /> Proyek Aktif
                        </h2>
                        <Link to="/konsumen/proyek" className="text-[10px] font-black text-teal-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Semua Proyek &rarr;</Link>
                    </div>

                    {activeProjects.length > 0 ? (
                        <div className="space-y-6">
                            {activeProjects.map(project => (
                                <Link 
                                    key={project.id}
                                    to={`/konsumen/timeline-proyek?projectId=${project.id}`}
                                    className="block bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:border-teal-100 transition-all duration-500 group relative overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                                        <div className="flex gap-6">
                                            <div className="w-24 h-24 rounded-3xl overflow-hidden bg-slate-50 flex-shrink-0 shadow-inner">
                                                <img 
                                                    src={project.heroImage || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070"} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    alt={project.name}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">{project.projectCode}</p>
                                                <h3 className="text-xl font-black text-slate-800 group-hover:text-teal-700 transition-colors tracking-tight uppercase">{project.name || "Unnamed Project"}</h3>
                                                <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><FiMapPin className="text-teal-500" /> {project.location || "Lokasi Lapangan"}</span>
                                                    <span className="flex items-center gap-1.5"><FiCalendar className="text-teal-500" /> {project.startDate ? new Date(project.startDate).toLocaleDateString('id-ID') : '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-56 space-y-3">
                                            <div className="flex justify-between items-end">
                                                <div className="space-y-0.5">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Official Progress</span>
                                                    <p className="text-[8px] text-slate-300 italic font-medium leading-none">Verified by RKK</p>
                                                </div>
                                                <span className="text-2xl font-black text-teal-600">{project.verifiedProgress ?? 0}%</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-slate-50 rounded-full overflow-hidden p-0.5 border border-slate-100 shadow-inner">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${project.verifiedProgress ?? 0}%` }}
                                                    className="h-full bg-teal-500 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/30 rounded-full -mt-16 -mr-16 blur-3xl group-hover:bg-teal-100/50 transition-colors" />
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px] p-20 text-center shadow-inner">
                            <FiPackage className="mx-auto text-slate-200 mb-6" size={64} />
                            <h3 className="text-xl font-bold text-slate-700">Belum Ada Proyek Aktif</h3>
                            <p className="text-sm text-slate-500 mt-2 font-medium max-w-xs mx-auto leading-relaxed">Saat ini Anda tidak memiliki proyek konstruksi yang sedang berjalan.</p>
                        </div>
                    )}

                    {/* DESIGN REQUESTS SECTION */}
                    {designRequests.length > 0 && (
                        <div className="space-y-8 pt-8">
                            <div className="flex items-center justify-between px-2">
                                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3 tracking-tight uppercase">
                                    <FiEdit3 className="text-indigo-600" /> Permintaan Desain
                                </h2>
                                <Link to="/konsumen/permintaan-desain" className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Semua Pengajuan &rarr;</Link>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {designRequests.slice(0, 4).map(dr => (
                                    <div 
                                        key={dr.id} 
                                        onClick={() => alert("Fitur detail & diskusi arsitek sedang disiapkan (Phase Local CRUD). Silakan hubungi Admin RKK.")}
                                        className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 cursor-pointer group"
                                    >
                                        <div className="flex items-start justify-between mb-4">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                                                dr.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                                dr.status === 'submitted' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                                                'bg-slate-50 text-slate-600 border-slate-100'
                                            }`}>
                                                {dr.status}
                                            </span>
                                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{new Date(dr.createdAt).toLocaleDateString('id-ID')}</p>
                                        </div>
                                        <h4 className="text-base font-black text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{dr.title}</h4>
                                        <p className="text-xs text-slate-400 mt-2 line-clamp-2 font-medium leading-relaxed italic">"{dr.description || "Tidak ada deskripsi."}"</p>
                                        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                                                <FiMapPin size={12} className="text-indigo-400" /> {dr.location || "N/A"}
                                            </div>
                                            <span className="text-[9px] font-black text-indigo-600 uppercase tracking-[0.2em] group-hover:translate-x-1 transition-transform">Detail &rarr;</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT: INFO & QUICK LINKS */}
                <div className="space-y-10">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 relative overflow-hidden">
                        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3 tracking-tight uppercase relative z-10">
                            <FiInfo className="text-teal-600" /> Informasi Portal
                        </h3>
                        <div className="space-y-6 relative z-10">
                            <div className="flex gap-5">
                                <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0 shadow-inner">
                                    <FiCheckCircle size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Source of Truth</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium mt-1">Seluruh angka progress berasal dari verifikasi fisik oleh Pengawas RKK di lapangan.</p>
                                </div>
                            </div>
                            <div className="flex gap-5">
                                <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0 shadow-inner">
                                    <FiFileText size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Dokumen Digital</h4>
                                    <p className="text-xs text-slate-400 leading-relaxed font-medium mt-1">Akses arsip kontrak, gambar kerja, dan BAST secara digital kapan saja (Coming Soon).</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-50 relative z-10">
                            <p className="text-[10px] text-slate-300 leading-relaxed italic font-medium">
                                * Fitur pembayaran sedang dalam pengembangan (Hold Phase).
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50/30 rounded-full -mt-16 -mr-16 blur-3xl" />
                    </div>

                    <div className="bg-slate-900 p-10 rounded-[3rem] text-white space-y-8 shadow-2xl shadow-slate-900/20 relative overflow-hidden border border-slate-800">
                        <div className="space-y-2 relative z-10">
                            <h3 className="text-xl font-black flex items-center gap-3 tracking-tight uppercase">
                                <FiClock className="text-teal-400" /> Status Layanan
                            </h3>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Sistem Monitoring Aktif</p>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pusat Bantuan</span>
                                <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-teal-500/20">Aktif</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Update Harian</span>
                                <span className="px-3 py-1 bg-teal-500/10 text-teal-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-teal-500/20">Aktif</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">E-Payment</span>
                                <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-500/20">Holding</span>
                            </div>
                        </div>
                        <button 
                            onClick={() => alert("Menghubungkan ke Admin RKK via WhatsApp/Email...")}
                            className="w-full py-5 bg-white/10 hover:bg-teal-500 hover:text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/10 relative z-10 shadow-lg active:scale-95"
                        >
                            Hubungi Admin RKK
                        </button>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px]" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardKonsumen;
