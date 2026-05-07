import React from "react";
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
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const DashboardArsitek = () => {
    const { selectedArchitect, selectedArchitectId, loading, error } = useArchitectPersona();

    if (loading) {
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

    if (error) {
        return (
            <RoleDataState 
                type="error"
                title={error}
                onRetry={() => window.location.reload()}
            />
        );
    }

    const stats = [
        // TODO: replace with database data after design request backend is implemented
        { label: "Permintaan Baru", value: 0, icon: FiSend, color: "#0EA5E9" },
        { label: "Desain Aktif", value: 0, icon: FiEdit3, color: "#1A4D2E" },
        { label: "Menunggu Review", value: 0, icon: FiActivity, color: "#F59E0B" },
        { label: "Revisi Diminta", value: 0, icon: FiClock, color: "#E11428" },
        { label: "Kapasitas Desain", value: selectedArchitect?.maxDesignCapacity || 0, icon: FiCheckCircle, color: "#16A34A" },
    ];

    const getStatusLabel = (status) => {
        const mapping = {
            assigned: { text: "Ditugaskan", color: "bg-blue-500/10 text-blue-500" },
            in_design: { text: "Dalam Desain", color: "bg-emerald-500/10 text-emerald-500" },
            waiting_customer_review: { text: "Menunggu Review", color: "bg-amber-500/10 text-amber-500" },
            revision_requested: { text: "Revisi Diminta", color: "bg-red-500/10 text-red-500" },
            ready_to_convert: { text: "Siap Handover", color: "bg-purple-500/10 text-purple-500" },
        };
        return mapping[status] || { text: status, color: "bg-slate-500/10 text-slate-500" };
    };

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
                            <button className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
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
                                        <td colSpan="4" className="py-12 text-center text-slate-400 font-medium border-2 border-dashed border-slate-100 rounded-2xl">
                                            {/* TODO: fetch from design requests API */}
                                            Belum ada permintaan desain yang ditugaskan.
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
                                    <span className="text-4xl font-black">0%</span>
                                    {/* TODO: sync with active design requests from DB */}
                                    <span className="text-xs mb-1 opacity-80">Terpakai (0/{selectedArchitect?.maxDesignCapacity || 0} Slot)</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-white transition-all duration-1000" style={{ width: "0%" }} />
                                </div>
                            </div>
                            <FiFileText className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
                        </div>
                        <div className="dashboard-card flex flex-col justify-center items-center text-center p-6 border-dashed border-2">
                            <p className="text-xs text-[var(--dashboard-text-soft)] font-medium mb-4 italic">Butuh referensi standar desain RKK?</p>
                            <button className="px-6 py-2.5 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl text-xs font-bold transition-all border border-[var(--dashboard-border)]">Buka Katalog Desain</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* TODO: fetch from audit log API */}
                    <DashboardActivity activities={[]} title="Aktivitas Desain" />
                    
                    <div className="dashboard-card">
                        <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-[var(--dashboard-primary)]">Deadline Terdekat</h3>
                        <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-2xl">
                            {/* TODO: fetch from tasks/design deadlines API */}
                            Tidak ada deadline terdekat
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardArsitek;
