import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    FiArrowLeft, 
    FiInfo, 
    FiUsers, 
    FiFileText, 
    FiActivity, 
    FiCreditCard,
    FiMoreVertical,
    FiUser
} from "react-icons/fi";
import projectService from "../../services/projectService";
import RoleDataState from "../../components/common/RoleDataState";

const DetailProyekAdminPage = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("overview");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);

    useEffect(() => {
        if (projectId) {
            fetchProjectDetail();
        }
    }, [projectId]);

    const fetchProjectDetail = async () => {
        try {
            setLoading(true);
            const res = await projectService.getProjectById(projectId);
            setProject(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching project detail:", err);
            setError("Gagal memuat detail proyek. Proyek mungkin tidak ditemukan.");
            setLoading(false);
        }
    };

    if (loading) return <RoleDataState type="loading" message="Memuat detail proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchProjectDetail} />;
    if (!project) return <RoleDataState type="empty" message="Data proyek tidak tersedia." />;

    const tabs = [
        { id: "overview", label: "Overview", icon: FiInfo },
        { id: "customer", label: "Customer", icon: FiUsers },
        { id: "rab", label: "RAB", icon: FiFileText },
        { id: "progress", label: "Progress", icon: FiActivity },
        { id: "tim", label: "Tim", icon: FiUsers },
        { id: "pembayaran", label: "Pembayaran", icon: FiCreditCard },
    ];

    const getStatusColor = (status) => {
        const s = status?.toLowerCase();
        if (s?.includes("active") || s?.includes("ongoing") || s?.includes("pengerjaan")) return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
        if (s?.includes("persiapan") || s?.includes("plan")) return "bg-blue-500/10 text-blue-500 border-blue-500/20";
        if (s?.includes("finish") || s?.includes("selesai")) return "bg-purple-500/10 text-purple-500 border-purple-500/20";
        if (s?.includes("stop") || s?.includes("terhenti")) return "bg-red-500/10 text-red-500 border-red-500/20";
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

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
                            <h2 className="text-2xl font-black tracking-tight">{project.projectCode}</h2>
                            <span className={`px-3 py-0.5 text-[10px] font-black uppercase rounded-full border ${getStatusColor(project.status)}`}>
                                {project.status}
                            </span>
                        </div>
                        <p className="text-xs text-[var(--dashboard-text-soft)] font-bold mt-0.5 uppercase tracking-wide">{project.name}</p>
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
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Nama Proyek</p>
                                        <p className="text-sm font-bold leading-relaxed">{project.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Budget Proyek</p>
                                        <p className="text-sm font-black text-emerald-600">
                                            {project.budget ? `Rp ${project.budget.toLocaleString("id-ID")}` : "-"}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Tanggal Mulai</p>
                                        <p className="text-sm font-bold">{formatDate(project.startDate)}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Estimasi Selesai</p>
                                        <p className="text-sm font-bold">{formatDate(project.endDate)}</p>
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <h3 className="font-black text-sm uppercase tracking-widest text-[var(--dashboard-primary)] border-b border-[var(--dashboard-border)] pb-2 mb-4">Statistik Progres</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <span className="text-xs font-black uppercase tracking-widest">Total Progres Keseluruhan</span>
                                            <span className="text-lg font-black text-[var(--dashboard-primary)]">{project.progress}%</span>
                                        </div>
                                        <div className="w-full h-3 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden p-0.5 border border-[var(--dashboard-border)]">
                                            <div 
                                                className="h-full bg-gradient-to-r from-[var(--dashboard-primary)] to-emerald-400 rounded-full transition-all duration-1000" 
                                                style={{ width: `${project.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab !== "overview" && (
                            <div className="flex flex-col items-center justify-center h-full py-12 text-[var(--dashboard-text-soft)] italic opacity-50">
                                <p className="text-sm font-bold text-center">Modul {activeTab.toUpperCase()} sedang dalam pengembangan...</p>
                                <p className="text-[10px] mt-2 text-center uppercase tracking-widest font-black">Backend Operational Postponed</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <h3 className="font-black text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Penanggung Jawab</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                                    <FiUser size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter leading-none">Customer / Owner</p>
                                    <p className="text-xs font-black mt-1">{project.customer?.name || "Tidak ditentukan"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 border border-purple-500/20">
                                    <FiUsers size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter leading-none">Pengawas Lapangan</p>
                                    <p className="text-xs font-black mt-1">{project.supervisor?.name || "Belum ditugaskan"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
                                    <FiUsers size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter leading-none">Mandor Utama</p>
                                    <p className="text-xs font-black mt-1">{project.foreman?.name || "Belum ditugaskan"}</p>
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => navigate("/admin/penugasan-tim")}
                            className="w-full mt-6 py-2.5 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                        >
                            Kelola Penugasan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProyekAdminPage;
