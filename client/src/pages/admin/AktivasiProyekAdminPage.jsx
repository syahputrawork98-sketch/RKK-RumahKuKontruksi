import React, { useState, useEffect, useCallback } from "react";
import { 
    FiCheckCircle, 
    FiClock, 
    FiAlertCircle, 
    FiSearch, 
    FiFolder, 
    FiChevronRight,
    FiUser,
    FiUsers,
    FiFileText,
    FiCalendar,
    FiPlay,
    FiInfo,
    FiX,
    FiActivity,
    FiEdit2
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import projectService from "../../services/projectService";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";

const AktivasiProyekAdminPage = () => {
    const { selectedAdminId } = useAdminPersona();
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [projects, setProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all"); // all, pending, ready, active
    const [showConfirmModal, setShowConfirmModal] = useState({ show: false, project: null });

    const fetchData = useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const res = await projectService.getProjects({ adminId: selectedAdminId });
            setProjects(res.data || []);
        } catch (err) {
            console.error("Error fetching projects for activation:", err);
            setError("Gagal memuat daftar proyek. Pastikan koneksi backend aktif.");
        } finally {
            setLoading(false);
        }
    }, [selectedAdminId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    const getReadiness = (p) => {
        const checks = [
            { id: 'customer', label: 'Customer Terhubung', status: !!p.customerId },
            { id: 'admin', label: 'Admin Ditugaskan', status: !!p.adminId },
            { id: 'supervisor', label: 'Pengawas Ditugaskan', status: !!p.supervisorId },
            { id: 'foreman', label: 'Mandor Ditugaskan', status: !!p.foremanId },
            { id: 'stages', label: 'Tahapan (Stages) Dibuat', status: (p._count?.stages || 0) > 0 },
            { id: 'rab', label: 'RAB Plan Dibuat', status: (p._count?.rabPlans || 0) > 0 },
            { id: 'budget', label: 'Total RAB > 0', status: parseFloat(p.rabPlans?.[0]?.totalAmount || 0) > 0 },
            { id: 'start', label: 'Tanggal Mulai', status: !!p.startDate },
            { id: 'end', label: 'Estimasi Selesai', status: !!p.estimatedEndDate }
        ];
        
        const completed = checks.filter(c => c.status).length;
        const total = checks.length;
        const isReady = completed === total;
        const missing = checks.filter(c => !c.status).map(c => c.label);
        
        return { completed, total, isReady, missing, checks, score: Math.round((completed / total) * 100) };
    };

    const handleActivate = async () => {
        const project = showConfirmModal.project;
        if (!project) return;

        try {
            setSubmitting(true);
            await projectService.activateProject(project.id, { adminId: selectedAdminId });
            setShowConfirmModal({ show: false, project: null });
            fetchData();
            // Optional: Success toast logic could go here
        } catch (err) {
            console.error("Activation failed:", err);
            alert("Gagal mengaktifkan proyek: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    if (!selectedAdminId) {
        return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    }

    const processedProjects = projects.map(p => ({
        ...p,
        readiness: getReadiness(p)
    }));

    const filteredProjects = processedProjects.filter(p => {
        if (!p) return false;
        const matchesSearch = (p.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                             (p.projectCode?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                             (p.customer?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase());
        
        if (!matchesSearch) return false;
        
        if (activeTab === "pending") return !p.readiness.isReady && !['active', 'ongoing', 'Berjalan'].includes(p.status);
        if (activeTab === "ready") return p.readiness.isReady && !['active', 'ongoing', 'Berjalan'].includes(p.status);
        if (activeTab === "active") return ['active', 'ongoing', 'Berjalan'].includes(p.status);
        return true;
    });

    if (loading) return <RoleDataState type="loading" message="Menganalisis kesiapan proyek..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black tracking-tight">Gerbang Aktivasi Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic font-medium">Validasi akhir dan aktivasi administrasi sebelum proyek resmi dijalankan di lokasi.</p>
                </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-start gap-3 shadow-sm">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                    <FiPlay size={20} />
                </div>
                <div className="flex-1">
                    <h4 className="text-xs font-black text-emerald-800 uppercase tracking-tight">KONTROL AKTIVASI LOKAL</h4>
                    <p className="text-[10px] text-emerald-700 leading-relaxed font-bold mt-0.5">
                        Proses ini memindahkan status proyek dari <strong>Planning</strong> ke <strong>Active</strong>. Tim Lapangan (Pengawas & Mandor) akan segera menerima akses penuh untuk pelaporan dan logistik setelah tombol aktivasi ditekan.
                    </p>
                </div>
            </div>

            {/* FILTERS & SEARCH */}
            <div className="dashboard-card">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari berdasarkan kode, nama, atau customer..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 shadow-sm transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 p-1 bg-[var(--dashboard-surface-soft)] rounded-2xl w-fit mb-8">
                    {[
                        { id: 'all', label: 'Semua', count: processedProjects.length },
                        { id: 'pending', label: 'Perlu Dilengkapi', count: processedProjects.filter(p => !p.readiness.isReady && !['active', 'ongoing', 'Berjalan'].includes(p.status)).length },
                        { id: 'ready', label: 'Siap Aktivasi', count: processedProjects.filter(p => p.readiness.isReady && !['active', 'ongoing', 'Berjalan'].includes(p.status)).length },
                        { id: 'active', label: 'Sudah Aktif', count: processedProjects.filter(p => ['active', 'ongoing', 'Berjalan'].includes(p.status)).length }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                                activeTab === tab.id 
                                ? "bg-white text-[var(--dashboard-primary)] shadow-sm" 
                                : "text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-text)]"
                            }`}
                        >
                            {tab.label}
                            <span className={`px-1.5 py-0.5 rounded-md text-[8px] ${activeTab === tab.id ? 'bg-[var(--dashboard-primary)]/10 text-[var(--dashboard-primary)]' : 'bg-slate-200 text-slate-500'}`}>
                                {tab.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* PROJECT LIST */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredProjects.length === 0 ? (
                        <div className="col-span-full py-20 text-center">
                            <FiFolder className="mx-auto text-slate-200 mb-4" size={48} />
                            <p className="text-sm font-bold text-slate-400 italic">Tidak ada proyek dalam kategori ini.</p>
                        </div>
                    ) : (
                        filteredProjects.map((p) => (
                            <div 
                                key={p.id} 
                                className={`group bg-white border rounded-3xl p-6 transition-all relative overflow-hidden flex flex-col h-full ${
                                    ['active', 'ongoing', 'Berjalan'].includes(p.status)
                                    ? 'border-emerald-100 shadow-emerald-500/5'
                                    : p.readiness.isReady 
                                        ? 'border-blue-100 shadow-blue-500/5' 
                                        : 'border-[var(--dashboard-border)]'
                                }`}
                            >
                                {/* CARD HEADER */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${
                                            ['active', 'ongoing', 'Berjalan'].includes(p.status) ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                                        }`}>
                                            <FiFolder size={24} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-black text-[var(--dashboard-primary)]">{p.projectCode}</span>
                                                <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${
                                                    ['active', 'ongoing', 'Berjalan'].includes(p.status)
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                                                    : 'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                    {p.status}
                                                </span>
                                            </div>
                                            <h3 className="font-black text-slate-800 text-base leading-tight group-hover:text-[var(--dashboard-primary)] transition-colors">{p.name}</h3>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Kesiapan</div>
                                        <div className={`text-xl font-black ${p.readiness.isReady ? 'text-emerald-500' : 'text-amber-500'}`}>
                                            {p.readiness.score}%
                                        </div>
                                    </div>
                                </div>

                                {/* READINESS CHECKLIST GRID */}
                                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-8 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                                    {p.readiness.checks.map((check) => (
                                        <div key={check.id} className="flex items-center gap-2">
                                            {check.status ? (
                                                <FiCheckCircle className="text-emerald-500 flex-shrink-0" size={14} />
                                            ) : (
                                                <FiActivity className="text-slate-300 flex-shrink-0" size={14} />
                                            )}
                                            <span className={`text-[9px] font-bold uppercase tracking-tight ${check.status ? 'text-slate-700' : 'text-slate-400'}`}>
                                                {check.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* PROJECT DETAILS SUMMARY */}
                                <div className="grid grid-cols-2 gap-4 mb-8 text-[10px] font-bold">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <FiUser className="text-slate-400" />
                                        <span>Customer: <span className="text-slate-900">{p.customer?.name || "Belum ada"}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <FiUsers className="text-slate-400" />
                                        <span>Tim: <span className="text-slate-900">{p.supervisor?.name ? 'Lengkap' : 'Belum Lengkap'}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <FiFileText className="text-slate-400" />
                                        <span>Anggaran: <span className="text-emerald-600">{formatCurrency(p.budgetTotal)}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <FiCalendar className="text-slate-400" />
                                        <span>Mulai: <span className="text-slate-900">{formatDate(p.startDate)}</span></span>
                                    </div>
                                </div>

                                {/* CARD ACTIONS */}
                                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                                    {['active', 'ongoing', 'Berjalan'].includes(p.status) ? (
                                        <Link 
                                            to={`/admin/proyek/${p.id}`}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-[var(--dashboard-border)] text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all"
                                        >
                                            Lihat Operasional <FiChevronRight />
                                        </Link>
                                    ) : p.readiness.isReady ? (
                                        <button 
                                            onClick={() => setShowConfirmModal({ show: true, project: p })}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            <FiPlay /> Aktifkan Proyek
                                        </button>
                                    ) : (
                                        <Link 
                                            to={`/admin/proyek/${p.id}`}
                                            className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                                        >
                                            <FiEdit2 className="hidden" /> Lengkapi Data
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* CONFIRMATION MODAL */}
            {showConfirmModal.show && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-md rounded-[2rem] shadow-2xl overflow-hidden border border-[var(--dashboard-border)]">
                        <div className="p-6 border-b border-[var(--dashboard-border)] flex justify-between items-center bg-[var(--dashboard-surface-soft)]">
                            <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Konfirmasi Aktivasi</h3>
                            <button 
                                onClick={() => !submitting && setShowConfirmModal({ show: false, project: null })} 
                                className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"
                            >
                                <FiX />
                            </button>
                        </div>
                        <div className="p-8">
                            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6 mx-auto">
                                <FiPlay size={32} />
                            </div>
                            <div className="text-center space-y-4 mb-8">
                                <h4 className="text-lg font-black text-slate-800">Aktifkan Proyek {showConfirmModal.project?.projectCode}?</h4>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    Proyek akan berpindah status menjadi <b>AKTIF (Active)</b>. Tim lapangan (Pengawas & Mandor) akan mulai bisa mengerjakan operasional proyek ini.
                                </p>
                                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                    <p className="text-[10px] text-amber-700 font-bold leading-relaxed italic">
                                        Progress awal akan tetap 0%. Perubahan progress hanya terjadi melalui verifikasi laporan Pengawas.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button 
                                    onClick={() => setShowConfirmModal({ show: false, project: null })}
                                    disabled={submitting}
                                    className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button 
                                    onClick={handleActivate}
                                    disabled={submitting}
                                    className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {submitting ? "Memproses..." : "Ya, Aktifkan"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AktivasiProyekAdminPage;
