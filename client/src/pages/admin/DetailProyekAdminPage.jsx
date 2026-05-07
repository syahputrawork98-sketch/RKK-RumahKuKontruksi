import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiInfo, 
    FiUsers, 
    FiFileText, 
    FiActivity, 
    FiCreditCard,
    FiMoreVertical
} from "react-icons/fi";

const DetailProyekAdminPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    const projectData = {
        kode: projectId || "PRJ-001",
        name: "Renovasi Rumah Tinggal - Bpk. Budi",
        customer: "Bpk. Budi Santoso",
        status: "Pengerjaan",
        progress: 65,
        location: "Jl. Melati No. 12, Jakarta Selatan",
        budget: "Rp 750.000.000",
        startDate: "2026-03-10",
        endDate: "2026-09-10",
        manager: "Andi Wijaya (Admin)",
        supervisor: "Budi (Pengawas)",
        foreman: "Ahmad (Mandor)"
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "customer", label: "Customer", icon: FiUsers },
        { id: "rab", label: "RAB", icon: FiFileText },
        { id: "progress", label: "Progress", icon: FiActivity },
        { id: "tim", label: "Tim", icon: FiUsers },
        { id: "pembayaran", label: "Pembayaran", icon: FiCreditCard },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/admin/proyek")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black tracking-tight">{projectData.kode}</h2>
                            <span className="px-3 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">
                                {projectData.status}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{projectData.name}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold hover:bg-[var(--dashboard-border)] transition-all">Edit Proyek</button>
                    <button className="p-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl hover:bg-[var(--dashboard-border)] transition-all">
                        <FiMoreVertical />
                    </button>
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
                            <div className="space-y-6 animate-fadeIn">
                                <h3 className="font-black text-sm uppercase tracking-widest text-[var(--dashboard-primary)] border-b border-[var(--dashboard-border)] pb-2">Informasi Umum</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Lokasi Proyek</p>
                                        <p className="text-sm font-bold leading-relaxed">{projectData.location}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Budget Proyek</p>
                                        <p className="text-sm font-black text-emerald-600">{projectData.budget}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Tanggal Mulai</p>
                                        <p className="text-sm font-bold">{projectData.startDate}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Estimasi Selesai</p>
                                        <p className="text-sm font-bold">{projectData.endDate}</p>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h3 className="font-black text-sm uppercase tracking-widest text-[var(--dashboard-primary)] border-b border-[var(--dashboard-border)] pb-2 mb-4">Statistik Progres</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-black uppercase tracking-widest">Total Progres Keseluruhan</span>
                                            <span className="text-lg font-black text-[var(--dashboard-primary)]">{projectData.progress}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden p-0.5 border border-[var(--dashboard-border)]">
                                            <div 
                                                className="h-full bg-gradient-to-r from-[var(--dashboard-primary)] to-emerald-400 rounded-full transition-all duration-1000" 
                                                style={{ width: `${projectData.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab !== "overview" && (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-[var(--dashboard-text-soft)] italic opacity-50">
                                <p className="text-sm font-bold">Modul {activeTab.toUpperCase()} sedang disiapkan...</p>
                                <p className="text-[10px] mt-2">Data placeholder admin role v0.1</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Penanggung Jawab</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                    <FiUsers size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter leading-none">Admin Proyek</p>
                                    <p className="text-xs font-black mt-1">{projectData.manager}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                    <FiActivity size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter leading-none">Pengawas Lapangan</p>
                                    <p className="text-xs font-black mt-1">{projectData.supervisor}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                    <FiUsers size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter leading-none">Mandor Utama</p>
                                    <p className="text-xs font-black mt-1">{projectData.foreman}</p>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2.5 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Kelola Penugasan</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProyekAdminPage;
