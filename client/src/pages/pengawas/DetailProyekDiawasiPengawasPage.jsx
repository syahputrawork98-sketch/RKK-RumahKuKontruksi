import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiInfo, 
    FiLayers, 
    FiCheckCircle, 
    FiCamera, 
    FiShoppingCart,
    FiAlertCircle,
    FiUser,
    FiMapPin,
    FiClock
} from "react-icons/fi";

const DetailProyekDiawasiPengawasPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    const projectData = {
        id: projectId || "PRJ-001",
        name: "Renovasi Rumah Budi Santoso",
        customer: "Bpk. Budi Santoso",
        location: "Jl. Merdeka No. 12, Bandung",
        status: "active",
        progress: 65,
        currentStage: "Pemasangan Keramik Lantai Utama",
        mandor: "Ahmad Jailani",
        deadline: "20 Mei 2026",
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "tahapan", label: "Tahapan", icon: FiLayers },
        { id: "checklist", label: "Checklist", icon: FiCheckCircle },
        { id: "dokumentasi", label: "Dokumentasi", icon: FiCamera },
        { id: "material", label: "Material", icon: FiShoppingCart },
        { id: "catatan", label: "Catatan Lapangan", icon: FiAlertCircle },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/pengawas/proyek")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black tracking-tight">{projectData.id}</h2>
                            <span className="px-3 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">
                                Proyek Aktif
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{projectData.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 bg-amber-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all">Verifikasi Progress</button>
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
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Info Lokasi & Mandor</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <FiMapPin className="text-[var(--dashboard-text-soft)] mt-0.5" />
                                                <span className="text-sm font-bold leading-relaxed">{projectData.location}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <FiUser className="text-[var(--dashboard-primary)]" />
                                                <span className="text-sm font-black uppercase tracking-tighter">Mandor: {projectData.mandor}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Status Pengerjaan</h4>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Tahapan Berjalan</p>
                                            <p className="text-sm font-black text-emerald-600">{projectData.currentStage}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Deadline Terdekat</p>
                                            <p className="text-sm font-black text-red-500">{projectData.deadline}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Progres Keseluruhan</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-black uppercase">
                                            <span>Selesai</span>
                                            <span>{projectData.progress}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden p-0.5 border border-[var(--dashboard-border)]">
                                            <div className="h-full bg-linear-to-r from-[var(--dashboard-primary)] to-emerald-400 rounded-full" style={{ width: `${projectData.progress}%` }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex gap-3">
                                    <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                                    <p className="text-[10px] font-medium leading-relaxed italic text-blue-800">
                                        "Minggu ini fokus pada penyelesaian pemasangan keramik lantai 1 dan persiapan instalasi kelistrikan plafon."
                                    </p>
                                </div>
                            </div>
                        )}
                        {activeTab !== "overview" && (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-[var(--dashboard-text-soft)] italic opacity-50">
                                <p className="text-sm font-bold">Modul {activeTab.toUpperCase()} sedang disiapkan...</p>
                                <p className="text-[10px] mt-2 tracking-widest">Site Supervisor Role Dashboard v1.0</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Verifikasi Mendatang</h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <div className="flex items-center gap-2 mb-2">
                                    <FiClock className="text-amber-500" />
                                    <span className="text-[10px] font-black uppercase">Tahap 3: Plafon</span>
                                </div>
                                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)]">Estimasi Pengajuan:</p>
                                <p className="text-xs font-black">12 Mei 2026</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dashboard-card">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Tim Terlibat</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[var(--dashboard-primary)]/10 flex items-center justify-center text-[var(--dashboard-primary)] font-black text-[10px]">A</div>
                                <div>
                                    <p className="text-xs font-bold">Ahmad Jailani</p>
                                    <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Mandor Utama</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-500 font-black text-[10px]">B</div>
                                <div>
                                    <p className="text-xs font-bold">Budi Santoso</p>
                                    <p className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)]">Admin Proyek</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProyekDiawasiPengawasPage;
