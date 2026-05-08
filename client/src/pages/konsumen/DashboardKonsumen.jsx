import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    FiHome, FiActivity, FiCheckCircle, FiClock, 
    FiArrowRight, FiInfo, FiCalendar, FiMapPin,
    FiPackage, FiFileText
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useCustomerPersona } from "../../context/CustomerPersonaContext";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";

const DashboardKonsumen = () => {
    const navigate = useNavigate();
    const { selectedCustomerId, selectedCustomer } = useCustomerPersona();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!selectedCustomerId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await projectService.getProjects({ customerId: selectedCustomerId });
                if (response.success) {
                    setProjects(response.data || []);
                }
                setError(null);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                setError("Gagal memuat ringkasan proyek.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [selectedCustomerId]);

    if (loading) return <RoleDataState type="loading" message="Menyiapkan dashboard Anda..." />;

    const activeProjects = projects.filter(p => p.status === 'active' || p.status === 'ongoing');
    const completedProjects = projects.filter(p => p.status === 'completed');
    const planningProjects = projects.filter(p => p.status === 'planning' || p.status === 'proposal');

    return (
        <div className="space-y-8">
            {/* 1. WELCOME HERO */}
            <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-teal-700 to-teal-900 text-white p-8 md:p-12 shadow-2xl">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="space-y-4 max-w-2xl">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest"
                        >
                            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                            Customer Portal Active
                        </motion.div>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-black leading-tight"
                        >
                            Selamat Datang, <br/>
                            <span className="text-teal-300">{selectedCustomer?.name || "Konsumen"}</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-teal-50/80 text-sm md:text-base leading-relaxed"
                        >
                            Pantau transparansi progres pembangunan Anda secara real-time. Data yang Anda lihat adalah data resmi yang telah divalidasi oleh tim pengawas lapangan RKK.
                        </motion.p>
                    </div>

                    <div className="flex gap-4">
                        <Link 
                            to="/konsumen/proyek"
                            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white rounded-2xl font-bold transition-all shadow-lg flex items-center gap-2 group"
                        >
                            Lihat Proyek Saya <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal-300/10 rounded-full blur-3xl" />
            </section>

            {/* 2. STATS OVERVIEW */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600">
                        <FiPackage size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Proyek</p>
                        <p className="text-2xl font-black text-gray-800">{projects.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                        <FiActivity size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sedang Berjalan</p>
                        <p className="text-2xl font-black text-gray-800">{activeProjects.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-5">
                    <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                        <FiCheckCircle size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Telah Selesai</p>
                        <p className="text-2xl font-black text-gray-800">{completedProjects.length}</p>
                    </div>
                </div>
            </section>

            {/* 3. MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* LEFT: ACTIVE PROJECTS LIST */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-black text-gray-800 flex items-center gap-2">
                            <FiActivity className="text-teal-600" /> Proyek Aktif
                        </h2>
                        <Link to="/konsumen/proyek" className="text-xs font-bold text-teal-600 hover:underline">Semua Proyek</Link>
                    </div>

                    {activeProjects.length > 0 ? (
                        <div className="space-y-4">
                            {activeProjects.map(project => (
                                <Link 
                                    key={project.id}
                                    to={`/konsumen/timeline-proyek?projectId=${project.id}`}
                                    className="block bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-6">
                                        <div className="flex gap-5">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                                                <img 
                                                    src={project.heroImage || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=2070"} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    alt={project.name}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-teal-600 uppercase tracking-widest">{project.projectCode}</p>
                                                <h3 className="text-lg font-black text-gray-800 group-hover:text-teal-700 transition-colors">{project.name}</h3>
                                                <div className="flex items-center gap-3 text-xs text-gray-400 font-bold">
                                                    <span className="flex items-center gap-1"><FiMapPin /> {project.location}</span>
                                                    <span className="flex items-center gap-1"><FiCalendar /> {project.startDate ? new Date(project.startDate).toLocaleDateString('id-ID') : '-'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full md:w-48 space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Official Progress</span>
                                                <span className="text-lg font-black text-teal-600">{project.verifiedProgress || 0}%</span>
                                            </div>
                                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${project.verifiedProgress || 0}%` }}
                                                    className="h-full bg-teal-500"
                                                />
                                            </div>
                                            <p className="text-[9px] text-gray-400 text-right italic font-medium">Verified by Pengawas</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[32px] p-12 text-center">
                            <FiPackage className="mx-auto text-gray-300 mb-4" size={48} />
                            <h3 className="text-lg font-bold text-gray-700">Belum Ada Proyek Aktif</h3>
                            <p className="text-sm text-gray-500 mt-1">Saat ini Anda tidak memiliki proyek konstruksi yang sedang berjalan.</p>
                        </div>
                    )}
                </div>

                {/* RIGHT: INFO & QUICK LINKS */}
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
                            <FiInfo className="text-teal-600" /> Informasi Portal
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                                    <FiCheckCircle />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Source of Truth</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">Seluruh angka progress berasal dari verifikasi fisik oleh Pengawas, bukan sekadar klaim Mandor.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0">
                                    <FiFileText />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-800">Dokumen Digital</h4>
                                    <p className="text-xs text-gray-500 leading-relaxed">Anda dapat mengakses arsip dokumen kontrak dan gambar kerja secara digital kapan saja.</p>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                            <p className="text-[10px] text-gray-400 leading-relaxed italic">
                                * Fitur pembayaran dan termin sedang dalam pengembangan (Hold Phase Local CRUD).
                            </p>
                        </div>
                    </div>

                    <div className="bg-slate-800 p-8 rounded-[32px] text-white space-y-6 shadow-xl">
                        <h3 className="text-lg font-black flex items-center gap-2">
                            <FiClock className="text-teal-400" /> Status Layanan
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Pusat Bantuan</span>
                                <span className="font-bold text-teal-400">Aktif</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Update Harian</span>
                                <span className="font-bold text-teal-400">Aktif</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">E-Payment</span>
                                <span className="font-bold text-amber-400">Holding</span>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold transition-all border border-white/10">
                            Hubungi Admin RKK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardKonsumen;
