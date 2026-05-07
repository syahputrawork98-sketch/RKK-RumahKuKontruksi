import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiInfo, 
    FiList, 
    FiActivity, 
    FiUsers, 
    FiShoppingCart,
    FiCamera,
    FiAlertTriangle,
    FiClock,
    FiMapPin
} from "react-icons/fi";

const DetailProyekAktifMandorPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    const projectData = {
        id: projectId || "PRJ-001",
        name: "Renovasi Rumah Budi Santoso",
        customer: "Bpk. Budi Santoso",
        location: "Bandung, Jawa Barat",
        status: "active",
        progress: 65,
        currentStage: "Pemasangan Keramik",
        targetToday: "Selesai KM Utama & Persiapan Ruang Tamu",
        deadline: "20 Mei 2026",
        pengawas: "Fauzi",
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "tugas", label: "Tugas Hari Ini", icon: FiList },
        { id: "progress", label: "Progress", icon: FiActivity },
        { id: "tim", label: "Tim Lapangan", icon: FiUsers },
        { id: "material", label: "Material", icon: FiShoppingCart },
        { id: "dokumentasi", label: "Dokumentasi", icon: FiCamera },
        { id: "kendala", label: "Kendala", icon: FiAlertTriangle },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/mandor/proyek-aktif")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black tracking-tight">{projectData.id}</h2>
                            <span className="px-3 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">
                                Eksekusi Lapangan
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{projectData.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">Lapor Progres</button>
                    <button className="px-5 py-2.5 bg-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-all">Lapor Kendala</button>
                </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 border-b border-[var(--dashboard-border)]">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                            flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                            ${activeTab === tab.id 
                                ? "bg-[var(--dashboard-primary)] text-white shadow-lg shadow-[var(--dashboard-primary)]/20 translate-y-0.5" 
                                : "text-[var(--dashboard-text-soft)] hover:bg-[var(--dashboard-surface-soft)] hover:text-[var(--dashboard-text)]"}
                        `}
                    >
                        <tab.icon />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* TAB CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card min-h-[400px]">
                        {activeTab === "overview" && (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Info Lapangan</h4>
                                            <div className="flex items-center gap-3">
                                                <FiMapPin className="text-[var(--dashboard-text-soft)]" />
                                                <span className="text-sm font-bold">{projectData.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FiUsers className="text-[var(--dashboard-primary)]" />
                                                <span className="text-sm font-black uppercase tracking-tighter">Pengawas: {projectData.pengawas}</span>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <FiClock className="text-amber-500" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Target Hari Ini</span>
                                            </div>
                                            <p className="text-xs font-bold leading-relaxed italic">"{projectData.targetToday}"</p>
                                        </div>
                                    </div>
                                    <div className="space-y-6 text-right">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Deadline Proyek</p>
                                            <p className="text-lg font-black text-red-500">{projectData.deadline}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Tahapan Berjalan</p>
                                            <p className="text-sm font-black text-[var(--dashboard-primary)] uppercase">{projectData.currentStage}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-[var(--dashboard-border)]">
                                    <div className="flex justify-between items-end mb-2">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Progress Akumulatif</h4>
                                        <span className="text-2xl font-black">{projectData.progress}%</span>
                                    </div>
                                    <div className="w-full h-4 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden p-1 border border-[var(--dashboard-border)] shadow-inner">
                                        <div className="h-full bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000" style={{ width: `${projectData.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab !== "overview" && (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-[var(--dashboard-text-soft)] italic opacity-50">
                                <p className="text-sm font-bold">Modul {activeTab.toUpperCase()} sedang disiapkan...</p>
                                <p className="text-[10px] mt-2 tracking-widest">Foreman Role Dashboard v1.0</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Tim Aktif (12 Orang)</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <span className="text-[10px] font-black uppercase">Tukang Batu</span>
                                <span className="text-xs font-black">5</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <span className="text-[10px] font-black uppercase">Tukang Kayu</span>
                                <span className="text-xs font-black">3</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <span className="text-[10px] font-black uppercase">Ladang</span>
                                <span className="text-xs font-black">4</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dashboard-card bg-[var(--dashboard-primary)] text-white">
                        <h3 className="font-black text-xs uppercase tracking-widest mb-4 opacity-80">Checklist Logbook</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded border-2 border-white/30 flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 bg-white rounded-sm" />
                                </div>
                                <span className="text-xs font-bold">Absensi Tim Selesai</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="w-5 h-5 rounded border-2 border-white/30" />
                                <span className="text-xs font-bold">Laporan Foto Siang</span>
                            </div>
                            <div className="flex items-center gap-3 opacity-50">
                                <div className="w-5 h-5 rounded border-2 border-white/30" />
                                <span className="text-xs font-bold">Submit Logbook Harian</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProyekAktifMandorPage;
