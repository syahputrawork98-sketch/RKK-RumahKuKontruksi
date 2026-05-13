import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiCheckCircle, FiChevronRight, FiClock, FiUser, FiInfo, FiX } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import fieldIssueService from "../../services/fieldIssues.service";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";

// Status mapping — Pengawas-friendly wording
const STATUS_MAP = {
    open:      { label: "Dilaporkan Mandor",      color: "bg-amber-50 text-amber-600 border-amber-200" },
    in_review: { label: "Dalam Review",           color: "bg-blue-50 text-blue-600 border-blue-200" },
    resolved:  { label: "Resolved oleh Pengawas", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    closed:    { label: "Closed Administratif",   color: "bg-slate-100 text-slate-500 border-slate-200" },
    rejected:  { label: "Ditolak",                color: "bg-red-50 text-red-500 border-red-200" },
};

const getStatusDisplay = (status) =>
    STATUS_MAP[status?.toLowerCase()] || { label: status || "Tidak Diketahui", color: "bg-slate-100 text-slate-500 border-slate-200" };

// Resolve modal component
const ResolveModal = ({ issue, onClose, onResolve, isLoading }) => {
    const [note, setNote] = useState("");
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-zoomIn">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="text-lg font-black uppercase tracking-tight text-emerald-700">Tandai Resolved</h3>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><FiX size={20} /></button>
                </div>
                <div className="p-6 space-y-4">
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                        <p className="text-[10px] font-black text-emerald-700 uppercase tracking-tighter mb-1">Kendala yang akan di-resolved:</p>
                        <p className="text-sm font-bold text-emerald-900">{issue.title}</p>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">
                            Arahan Teknis / Catatan Resolusi <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            required
                            value={note}
                            onChange={e => setNote(e.target.value)}
                            rows={3}
                            placeholder="Jelaskan solusi teknis, arahan tindak lanjut, atau hasil penanganan kendala ini..."
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
                        />
                    </div>
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-2">
                        <FiInfo className="text-amber-500 shrink-0 mt-0.5" size={14} />
                        <p className="text-[9px] font-medium italic text-amber-700 leading-relaxed">
                            <strong>Resolved</strong> berarti kendala teknis lapangan sudah Anda tangani/arahkan. Penutupan administratif (<strong>closed</strong>) dilakukan oleh Admin setelahnya. Aksi ini <strong>tidak mengubah progres resmi proyek</strong>.
                        </p>
                    </div>
                </div>
                <div className="p-6 border-t border-slate-100 flex gap-3">
                    <button
                        onClick={() => note.trim() && onResolve(issue.id, 'resolved', note)}
                        disabled={isLoading || !note.trim()}
                        className="flex-1 py-3.5 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                    >
                        <FiCheckCircle /> {isLoading ? "Menyimpan..." : "Konfirmasi Resolved"}
                    </button>
                    <button onClick={onClose} disabled={isLoading} className="px-6 py-3.5 bg-white border border-slate-200 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                        Batal
                    </button>
                </div>
            </div>
        </div>
    );
};

const KendalaLapanganPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("all");
    const [resolveTarget, setResolveTarget] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchData = async () => {
        if (!selectedSupervisorId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const data = await fieldIssueService.getFieldIssues({ supervisorId: selectedSupervisorId });
            setIssues(data.data || []);
        } catch (err) {
            setError(err.message || "Gagal memuat data kendala lapangan. Coba muat ulang atau cek koneksi backend lokal.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedSupervisorId]);

    const handleResolve = async (id, status, resolutionNote) => {
        try {
            setActionLoading(true);
            await fieldIssueService.updateFieldIssueStatus(id, { status, resolutionNote });
            setIssues(issues.map(issue => issue.id === id ? { ...issue, status, resolutionNote } : issue));
            setResolveTarget(null);
        } catch (err) {
            alert("Gagal memperbarui status kendala: " + err.message);
        } finally {
            setActionLoading(false);
        }
    };

    if (!selectedSupervisorId && !loading) {
        return (
            <RolePersonaEmptyState
                title="Pilih Persona Pengawas"
                description="Pilih pengawas untuk melihat dan meninjau kendala lapangan dari proyek yang diawasi."
            />
        );
    }

    if (loading && issues.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return <RoleDataState type="error" title="Gagal Memuat Kendala" description={error} onRetry={() => fetchData()} />;
    }

    const filteredIssues = issues.filter(issue => {
        if (activeTab === "open")     return issue.status === "open";
        if (activeTab === "in_review")return issue.status === "in_review";
        if (activeTab === "resolved") return issue.status === "resolved";
        return true;
    });

    const tabs = [
        { id: "all",       label: "Semua Kendala" },
        { id: "open",      label: "Perlu Ditinjau" },
        { id: "in_review", label: "Dalam Review" },
        { id: "resolved",  label: "Resolved" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Tinjau Kendala Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">
                        Pantau kendala yang dilaporkan Mandor, berikan arahan teknis, dan tandai resolved jika masalah sudah ditangani.
                    </p>
                </div>
                <div className="px-4 py-2 bg-amber-50 text-amber-700 rounded-xl border border-amber-100 flex items-center gap-2">
                    <FiInfo size={14} />
                    <span className="text-[10px] font-black uppercase tracking-tighter italic">Resolve ≠ Perubahan Progres SOT</span>
                </div>
            </div>

            {/* Role Guard Banner */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                <div className="text-[10px] font-medium leading-relaxed italic text-blue-800">
                    <strong>Peran Pengawas:</strong> Tinjau kendala teknis lapangan dan berikan arahan. Gunakan <strong>"Tandai Resolved"</strong> setelah masalah lapangan ditangani. Penutupan administratif (<strong>closed</strong>) dilakukan oleh Admin. Menyelesaikan kendala <strong>tidak mengubah progres resmi proyek (SOT)</strong>.
                </div>
            </div>

            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeTab === tab.id
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]"
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filteredIssues.length > 0 ? (
                    filteredIssues.map((issue) => {
                        const statusDisplay = getStatusDisplay(issue.status);
                        const canResolve = issue.status === 'open' || issue.status === 'in_review';
                        return (
                            <div key={issue.id} className="dashboard-card group hover:border-[var(--dashboard-primary)]/30 transition-all">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center flex-wrap gap-2">
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{issue.project?.projectCode || 'PROYEK'}</span>
                                            <StatusBadge type="priority" status={issue.priority} />
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded border border-slate-200">
                                                {issue.category}
                                            </span>
                                        </div>
                                        <h4 className="text-base font-bold">{issue.title}</h4>
                                        <p className="text-xs font-medium text-[var(--dashboard-text-soft)] leading-relaxed italic border-l-2 border-red-100 pl-3">
                                            "{issue.description}"
                                        </p>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">
                                                <FiUser size={12} className="text-[var(--dashboard-primary)]" />
                                                <span>Pelapor: {issue.foreman?.name || 'Mandor'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">
                                                <FiClock size={12} className="text-[var(--dashboard-primary)]" />
                                                <span>Dilaporkan: {new Date(issue.createdAt).toLocaleDateString('id-ID')}</span>
                                            </div>
                                            <div className={`px-2 py-1 rounded border text-[8px] font-black uppercase w-fit ${statusDisplay.color}`}>
                                                {statusDisplay.label}
                                            </div>
                                        </div>

                                        {issue.resolutionNote && (
                                            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100">
                                                <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Catatan Resolusi / Arahan Teknis:</p>
                                                <p className="text-xs font-medium text-emerald-800">"{issue.resolutionNote}"</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="md:w-56 flex flex-col justify-center gap-2">
                                        {canResolve ? (
                                            <button
                                                onClick={() => setResolveTarget(issue)}
                                                className="w-full py-2.5 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                                            >
                                                <FiCheckCircle /> Tandai Resolved
                                            </button>
                                        ) : (
                                            <div className="w-full py-2.5 bg-slate-100 text-slate-400 border border-slate-200 rounded-xl text-[9px] font-black uppercase tracking-widest text-center cursor-not-allowed">
                                                {issue.status === 'resolved' ? 'Sudah Resolved' : 'Sudah Closed'}
                                            </div>
                                        )}
                                        <div className="w-full py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[9px] font-black uppercase tracking-widest text-center text-[var(--dashboard-text-soft)] italic cursor-default">
                                            Penutupan administratif → Admin
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <RoleDataState
                        type="empty"
                        title="Tidak Ada Kendala"
                        description={
                            activeTab === "all"
                                ? "Belum ada laporan kendala lapangan dari Mandor. Kendala akan muncul setelah Mandor melaporkan masalah di proyek."
                                : `Tidak ada kendala dengan status "${tabs.find(t => t.id === activeTab)?.label}".`
                        }
                    />
                )}
            </div>

            {/* Footer SOT Guard */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-medium leading-relaxed italic text-blue-800">
                    <strong>Catatan:</strong> Menandai kendala sebagai <strong>resolved</strong> berarti masalah teknis lapangan sudah Anda tangani/arahkan. Ini <strong>tidak otomatis mengubah progres resmi proyek</strong>. Progres resmi tetap diubah melalui menu <strong>Verifikasi Progres</strong>.
                </p>
            </div>

            {/* Resolve Modal */}
            {resolveTarget && (
                <ResolveModal
                    issue={resolveTarget}
                    onClose={() => setResolveTarget(null)}
                    onResolve={handleResolve}
                    isLoading={actionLoading}
                />
            )}
        </div>
    );
};

export default KendalaLapanganPengawasPage;
