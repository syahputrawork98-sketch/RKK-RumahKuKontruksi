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
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import architectService from "../../services/architectService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DashboardArsitek = () => {
    const { selectedArchitect, selectedArchitectId, loading: personaLoading, error: personaError } = useArchitectPersona();
    const [statsData, setStatsData] = useState(null);
    const [loadingStats, setLoadingStats] = useState(false);
    const [statsError, setStatsError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            if (!selectedArchitectId) return;
            try {
                setLoadingStats(true);
                setStatsError(null);
                const response = await architectService.getArchitectStats(selectedArchitectId);
                if (response.success) {
                    setStatsData(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch architect stats:", err);
                setStatsError("Gagal memuat statistik operasional.");
            } finally {
                setLoadingStats(false);
            }
        };

        fetchStats();
    }, [selectedArchitectId]);

    if (personaLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
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

    if (personaError || statsError) {
        return (
            <RoleDataState 
                type="error"
                title={personaError || statsError}
                onRetry={() => window.location.reload()}
            />
        );
    }

    const stats = [
        { label: "Permintaan Baru", value: statsData?.newRequests || 0, icon: FiSend, color: "#0EA5E9" },
        { label: "Desain Aktif", value: statsData?.activeDesigns || 0, icon: FiEdit3, color: "#1A4D2E" },
        { label: "Menunggu Review", value: statsData?.waitingReview || 0, icon: FiActivity, color: "#F59E0B" },
        { label: "Revisi Diminta", value: statsData?.revisionRequested || 0, icon: FiClock, color: "#E11428" },
        { label: "Kapasitas Desain", value: statsData?.maxDesignCapacity || selectedArchitect?.maxDesignCapacity || 0, icon: FiCheckCircle, color: "#16A34A" },
    ];

    const capacityPercentage = statsData?.maxDesignCapacity > 0 
        ? Math.round((statsData.activeDesigns / statsData.maxDesignCapacity) * 100) 
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
                            <button className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
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
                                    <tr>
                                        <td colSpan="4" className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <p className="text-slate-400 font-medium italic text-sm">Belum ada permintaan desain yang ditugaskan.</p>
                                                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-tighter">Fase Local Development: Alur permintaan desain belum aktif.</p>
                                            </div>
                                        </td>
                                    </tr>
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
                                    <span className="text-xs mb-1 opacity-80">Terpakai ({statsData?.activeDesigns || 0}/{statsData?.maxDesignCapacity || selectedArchitect?.maxDesignCapacity || 0} Slot)</span>
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
