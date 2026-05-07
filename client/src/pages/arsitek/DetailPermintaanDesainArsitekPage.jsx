import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiInfo, 
    FiCalendar, 
    FiFileText, 
    FiRepeat, 
    FiMessageSquare,
    FiCheckCircle,
    FiUser,
    FiMapPin
} from "react-icons/fi";

const DetailPermintaanDesainArsitekPage = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");

    const requestData = {
        id: requestId || "DR-005",
        customer: "Ibu Siti Aminah",
        type: "Rumah Minimalis Modern",
        location: "Jl. Merdeka No. 12, Bandung",
        buildingArea: "150 m2",
        budget: "Rp 500.000.000 - 700.000.000",
        status: "in_design",
        progress: 45,
        deadline: "12 Mei 2026",
        brief: "Rumah tinggal 2 lantai dengan konsep open space dan pencahayaan alami maksimal. Membutuhkan 3 kamar tidur dan 1 ruang kerja.",
    };

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "timeline", label: "Timeline Desain", icon: FiCalendar },
        { id: "files", label: "File Desain", icon: FiFileText },
        { id: "revisions", label: "Revisi", icon: FiRepeat },
        { id: "comments", label: "Komentar", icon: FiMessageSquare },
        { id: "handover", label: "Handover", icon: FiCheckCircle },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/arsitek/permintaan-desain")}
                        className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl font-black tracking-tight">{requestData.id}</h2>
                            <span className="px-3 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase rounded-full border border-emerald-500/20">
                                Dalam Desain
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{requestData.customer} - {requestData.type}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all">Upload Progres Desain</button>
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
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Informasi Proyek</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <FiUser className="text-[var(--dashboard-text-soft)]" />
                                                <span className="text-sm font-bold">{requestData.customer}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <FiMapPin className="text-[var(--dashboard-text-soft)] mt-0.5" />
                                                <span className="text-sm font-bold leading-relaxed">{requestData.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Spesifikasi Bangunan</h4>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Luas Bangunan</p>
                                            <p className="text-sm font-black">{requestData.buildingArea}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Estimasi Budget</p>
                                            <p className="text-sm font-black text-emerald-600">{requestData.budget}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Brief Desain</h4>
                                    <p className="text-sm font-medium leading-relaxed bg-[var(--dashboard-surface-soft)] p-4 rounded-xl border border-[var(--dashboard-border)]">
                                        "{requestData.brief}"
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Progres Desain</h4>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-black uppercase">
                                            <span>Penyelesaian Konsep</span>
                                            <span>{requestData.progress}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden p-0.5 border border-[var(--dashboard-border)]">
                                            <div className="h-full bg-linear-to-r from-[var(--dashboard-primary)] to-emerald-400 rounded-full" style={{ width: `${requestData.progress}%` }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab !== "overview" && (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-[var(--dashboard-text-soft)] italic opacity-50">
                                <p className="text-sm font-bold">Modul {activeTab.toUpperCase()} sedang disiapkan...</p>
                                <p className="text-[10px] mt-2 tracking-widest">Architect Role Dashboard v1.0</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Timeline & Deadline</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <span className="text-xs font-bold">Deadline Final</span>
                                <span className="text-xs font-black text-red-500">{requestData.deadline}</span>
                            </div>
                            <div className="space-y-4 pt-2">
                                <div className="relative pl-6 border-l-2 border-[var(--dashboard-border)] space-y-6 pb-2">
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                                        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-tighter">Selesai</p>
                                        <p className="text-xs font-bold mt-0.5">Brief & Konsultasi</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[var(--dashboard-primary)] border-2 border-white shadow-sm animate-pulse" />
                                        <p className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-tighter">Berjalan</p>
                                        <p className="text-xs font-bold mt-0.5">Konsep Denah 2D</p>
                                    </div>
                                    <div className="relative opacity-50">
                                        <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-slate-300 border-2 border-white shadow-sm" />
                                        <p className="text-[10px] font-black uppercase tracking-tighter">Mendatang</p>
                                        <p className="text-xs font-bold mt-0.5">Visualisasi 3D</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPermintaanDesainArsitekPage;
