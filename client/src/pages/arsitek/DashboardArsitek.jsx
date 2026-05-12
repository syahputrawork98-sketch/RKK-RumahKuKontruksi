import React, { useState, useEffect } from "react";
import { 
    FiSend, 
    FiEdit3, 
    FiClock, 
    FiCheckCircle,
    FiActivity,
    FiFileText
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
} from "@client/components/ui/dashboard";
import { Link, useNavigate } from "react-router-dom";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import architectService from "../../services/architectService";
import designRequestService from "../../services/designRequestService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DashboardArsitek = () => {
    const { selectedArchitect, selectedArchitectId, loading: personaLoading, error: personaError } = useArchitectPersona();
    const [statsData, setStatsData] = useState(null);
    const [recentRequests, setRecentRequests] = useState([]);
    const [loadingData, setLoadingData] = useState(false);
    const [dataError, setDataError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!selectedArchitectId) return;
            try {
                setLoadingData(true);
                setDataError(null);
                
                const [statsRes, requestsRes] = await Promise.all([
                    architectService.getArchitectStats(selectedArchitectId),
                    designRequestService.getAssignedRequests(selectedArchitectId)
                ]);

                if (statsRes.success) {
                    setStatsData(statsRes.data);
                }
                if (requestsRes.success) {
                    setRecentRequests(requestsRes.data || []);
                }
            } catch (err) {
                console.error("Failed to fetch architect dashboard data:", err);
                setDataError("Gagal memuat data dashboard.");
            } finally {
                setLoadingData(false);
            }
        };

        fetchDashboardData();
    }, [selectedArchitectId]);

    if (personaLoading) {
        return <RoleDataState type="loading" message="Menyiapkan data arsitek..." />;
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk melihat data dashboard, permintaan desain, dan manajemen kapasitas Anda."
                actionLabel="Pilih Arsitek"
                onAction={() => {}}
            />
        );
    }

    if (personaError || dataError) {
        return (
            <RoleDataState 
                type="error"
                title={personaError || dataError}
                onRetry={() => window.location.reload()}
            />
        );
    }

    const trueActiveDesigns = recentRequests.filter(r => !["approved", "rejected"].includes(r.status)).length;
    const trueNewRequests = recentRequests.filter(r => r.status === "assigned").length;

    const stats = [
        { label: "Antrean Baru", value: trueNewRequests, icon: FiSend, color: "#0EA5E9" },
        { label: "Proses Desain", value: trueActiveDesigns, icon: FiEdit3, color: "#1A4D2E" },
        { label: "Menunggu Review", value: statsData?.waitingReview || 0, icon: FiActivity, color: "#F59E0B" },
        { label: "Revisi Diminta", value: statsData?.revisionRequested || 0, icon: FiClock, color: "#E11428" },
        { label: "Kapasitas Desain", value: statsData?.maxDesignCapacity || selectedArchitect?.maxDesignCapacity || 0, icon: FiCheckCircle, color: "#16A34A" },
    ];

    const capacityPercentage = statsData?.maxDesignCapacity > 0 
        ? Math.round((trueActiveDesigns / statsData.maxDesignCapacity) * 100) 
        : 0;

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader 
                title={`Halo, ${selectedArchitect?.name || 'Arsitek'}`}
                subtitle="Selamat datang di panel manajemen desain RKK."
            />
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Permintaan Desain Terbaru</h3>
                            <Link to="/arsitek/brief-desain" className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-primary)] hover:underline">Lihat Semua</Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[var(--dashboard-border)]">
                                        <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">ID</th>
                                        <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Customer / Tipe</th>
                                        <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                        <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentRequests.length > 0 ? (
                                        recentRequests.map(req => (
                                            <tr key={req.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)] transition-colors">
                                                <td className="py-4 px-2 text-[10px] font-black uppercase text-[var(--dashboard-text-soft)]">{req.id.substring(0, 8)}</td>
                                                <td className="py-4 px-2">
                                                    <p className="text-sm font-bold">{req.title}</p>
                                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] font-medium">{req.customer?.name || "N/A"} • {req.buildingType || "N/A"}</p>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${
                                                        req.status === 'approved' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 
                                                        'bg-blue-50 text-blue-500 border-blue-100'
                                                    }`}>
                                                        {req.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2 text-right">
                                                    <Link to={`/arsitek/permintaan-desain/${req.id}`} className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)] hover:underline">Buka</Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-2">
                                                    <FiActivity className="text-slate-200 w-12 h-12 mb-2" />
                                                    <p className="text-slate-400 font-medium italic text-sm">Belum ada permintaan desain yang ditugaskan.</p>
                                                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter italic">Cek menu 'Peluang Desain' untuk tawaran baru.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="dashboard-card bg-linear-to-br from-[var(--dashboard-primary)] to-emerald-800 text-white p-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-sm uppercase tracking-widest opacity-80 mb-2">Kapasitas Desain</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black">{capacityPercentage}%</span>
                                    <span className="text-xs mb-1 opacity-80">Terpakai ({trueActiveDesigns}/{statsData?.maxDesignCapacity || selectedArchitect?.maxDesignCapacity || 0} Slot)</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-white transition-all duration-1000" style={{ width: `${capacityPercentage}%` }} />
                                </div>
                            </div>
                            <FiFileText className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
                        </div>
                        <div className="dashboard-card flex flex-col justify-center items-center text-center p-6 border-dashed border-2">
                            <p className="text-xs text-[var(--dashboard-text-soft)] font-medium mb-4 italic uppercase tracking-widest">Referensi Standar Desain RKK</p>
                            <button disabled className="px-6 py-2.5 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest cursor-not-allowed border border-slate-200">Katalog Belum Tersedia</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card h-fit">
                        <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-[var(--dashboard-primary)]">Aktivitas Terbaru</h3>
                        <div className="py-10 text-center space-y-2">
                            <FiActivity className="mx-auto text-slate-200 w-8 h-8" />
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Belum ada aktivitas desain</p>
                        </div>
                    </div>
                    
                    <div className="dashboard-card">
                        <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-[var(--dashboard-primary)]">Deadline Terdekat</h3>
                        <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-2 border-dashed border-slate-50 rounded-2xl">
                            Tidak ada deadline terdekat
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardArsitek;
