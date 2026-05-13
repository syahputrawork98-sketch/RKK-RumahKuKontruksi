import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiPlus, FiClock, FiCheckCircle, FiChevronRight, FiX, FiInfo, FiEye } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import fieldIssueService from "../../services/fieldIssues.service";
import projectService from "../../services/projectService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

// Status mapping — Mandor-friendly wording
const STATUS_MAP = {
    open:      { label: "Dilaporkan",             color: "bg-amber-50 text-amber-600 border-amber-200" },
    in_review: { label: "Dalam Review Pengawas",  color: "bg-blue-50 text-blue-600 border-blue-200" },
    resolved:  { label: "Resolved oleh Pengawas", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    closed:    { label: "Closed Administratif",   color: "bg-slate-100 text-slate-500 border-slate-200" },
    rejected:  { label: "Ditolak",                color: "bg-red-50 text-red-500 border-red-200" },
};

const getStatusDisplay = (status) =>
    STATUS_MAP[status?.toLowerCase()] || { label: status || "Tidak Diketahui", color: "bg-slate-100 text-slate-500 border-slate-200" };

const KendalaLapanganMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("active");
    const [issues, setIssues] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newIssue, setNewIssue] = useState({
        title: "",
        projectId: "",
        category: "Logistik",
        description: "",
        priority: "medium"
    });

    const handleNewIssueChange = (e) => {
        setNewIssue({ ...newIssue, [e.target.name]: e.target.value });
    };

    const fetchData = async () => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }
        try {
            setLoading(true);
            setError(null);
            const [issuesRes, projectsRes] = await Promise.all([
                fieldIssueService.getFieldIssues({ foremanId: selectedForemanId }),
                projectService.getProjects({ foremanId: selectedForemanId })
            ]);
            setIssues(issuesRes.data || []);
            setProjects(projectsRes.data || []);

            if (projectsRes.data?.length > 0) {
                setNewIssue(prev => ({ ...prev, projectId: projectsRes.data[0].id }));
            }
        } catch (err) {
            setError(err.message || "Gagal memuat data kendala lapangan. Coba muat ulang atau cek koneksi backend lokal.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedForemanId]);

    const handleSubmitNewIssue = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const data = await fieldIssueService.createFieldIssue({ ...newIssue, foremanId: selectedForemanId });
            setIssues([data.data, ...issues]);
            setIsFormOpen(false);
            setNewIssue({
                title: "",
                projectId: projects.length > 0 ? projects[0].id : "",
                category: "Logistik",
                description: "",
                priority: "medium"
            });
            fetchData();
        } catch (err) {
            alert("Gagal membuat laporan kendala: " + (err.response?.data?.error || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState
                title="Pilih Persona Mandor"
                description="Pilih mandor untuk melihat daftar kendala lapangan."
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
        const status = issue.status?.toLowerCase();
        if (activeSubtab === "active")    return status === "open";
        if (activeSubtab === "follow_up") return status === "in_review";
        if (activeSubtab === "resolved")  return status === "resolved";
        if (activeSubtab === "archive")   return status === "closed" || status === "rejected";
        return true;
    });

    const subtabs = [
        { id: "active",    label: "Dilaporkan" },
        { id: "follow_up", label: "Dalam Review" },
        { id: "resolved",  label: "Resolved" },
        { id: "archive",   label: "Riwayat" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Laporan Kendala Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">
                        Laporkan hambatan atau masalah teknis kepada Pengawas untuk mendapatkan bantuan dan arahan segera.
                    </p>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg transition-all ${
                        isFormOpen ? "bg-slate-500 text-white shadow-slate-500/20" : "bg-red-500 text-white shadow-red-500/20 hover:scale-[1.02]"
                    }`}
                >
                    {isFormOpen ? <FiX /> : <FiPlus />} {isFormOpen ? "Batal" : "Lapor Kendala Baru"}
                </button>
            </div>

            {/* Role Guard Banner */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                <div className="text-[10px] font-medium leading-relaxed italic text-blue-800">
                    <strong>Peran Mandor:</strong> Anda bertugas <strong>melaporkan kendala lapangan</strong>. Pengawas akan meninjau dan memberikan arahan teknis. Admin melakukan penutupan administratif. Penyelesaian kendala <strong>tidak mengubah progres resmi proyek</strong>.
                </div>
            </div>

            {/* FORM */}
            {isFormOpen && (
                <div className="dashboard-card border-2 border-red-100 bg-red-50/10">
                    <h3 className="text-lg font-bold text-red-600 mb-4 flex items-center gap-2">
                        <FiAlertTriangle /> Lapor Kendala Baru
                    </h3>
                    <form onSubmit={handleSubmitNewIssue} className="space-y-4">
                        <div>
                            <label className="block text-xs font-black text-[var(--dashboard-text)] uppercase tracking-widest mb-1">Judul Kendala</label>
                            <input
                                required
                                type="text"
                                name="title"
                                value={newIssue.title}
                                onChange={handleNewIssueChange}
                                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-[var(--dashboard-border)] rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500/20"
                                placeholder="Misal: Material Semen Telat atau Kerusakan Alat"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-black text-[var(--dashboard-text)] uppercase tracking-widest mb-1">Pilih Proyek</label>
                                <select
                                    required
                                    name="projectId"
                                    value={newIssue.projectId}
                                    onChange={handleNewIssueChange}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-[var(--dashboard-border)] rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500/20"
                                >
                                    {projects.length === 0 && <option value="">Tidak ada proyek aktif</option>}
                                    {projects.map(p => {
                                        const isActive = ['active', 'ongoing', 'Berjalan'].includes(p.status);
                                        const isFinished = p.status === 'Selesai';
                                        return (
                                            <option key={p.id} value={p.id} disabled={isFinished || !isActive}>
                                                {p.projectCode} - {p.name} {isFinished ? '(SELESAI)' : (!isActive ? `(${p.status?.toUpperCase()})` : '')}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-[var(--dashboard-text)] uppercase tracking-widest mb-1">Kategori</label>
                                <select
                                    name="category"
                                    value={newIssue.category}
                                    onChange={handleNewIssueChange}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-[var(--dashboard-border)] rounded-xl text-sm font-bold focus:ring-2 focus:ring-red-500/20"
                                >
                                    <option value="Logistik">Logistik / Material</option>
                                    <option value="Alam">Alam / Cuaca</option>
                                    <option value="Teknis">Teknis / Lapangan</option>
                                    <option value="SDM">SDM / Pekerja</option>
                                    <option value="Lainnya">Lainnya</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-black text-[var(--dashboard-text)] uppercase tracking-widest mb-1">Prioritas</label>
                            <div className="flex gap-4 p-1 bg-white dark:bg-slate-800 rounded-xl border border-[var(--dashboard-border)]">
                                {['low', 'medium', 'high'].map(p => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setNewIssue({...newIssue, priority: p})}
                                        className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
                                            newIssue.priority === p
                                            ? (p === 'high' ? 'bg-red-500 text-white' : p === 'medium' ? 'bg-amber-500 text-white' : 'bg-blue-500 text-white')
                                            : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                        }`}
                                    >
                                        {p === 'low' ? 'Rendah' : p === 'medium' ? 'Sedang' : 'Tinggi'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-black text-[var(--dashboard-text)] uppercase tracking-widest mb-1">Deskripsi & Catatan</label>
                            <textarea
                                required
                                name="description"
                                value={newIssue.description}
                                onChange={handleNewIssueChange}
                                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-[var(--dashboard-border)] rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500/20 min-h-[100px]"
                                placeholder="Jelaskan detail kendala, apa yang terdampak, dan bantuan apa yang diperlukan..."
                            ></textarea>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={submitting || projects.length === 0}
                                className="px-8 py-3 bg-red-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all disabled:opacity-50"
                            >
                                {submitting ? "Mengirim Laporan..." : "Kirim Laporan Kendala"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeSubtab === tab.id
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
                        return (
                            <div key={issue.id} className="dashboard-card group">
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1 space-y-3">
                                        <div className="flex items-center flex-wrap gap-2">
                                            <div className={`w-2 h-2 rounded-full shrink-0 ${
                                                issue.priority === 'high' ? 'bg-red-500 animate-pulse' : issue.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
                                            }`} />
                                            <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{issue.project?.projectCode || 'PROYEK'}</span>
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                                issue.priority === "high" ? "bg-red-500/10 text-red-500" : issue.priority === "medium" ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                                            }`}>
                                                {issue.priority === 'high' ? 'Prioritas Tinggi' : issue.priority === 'medium' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
                                            </span>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded border border-slate-200">
                                                {issue.category}
                                            </span>
                                        </div>
                                        <h4 className="text-base font-bold group-hover:text-red-600 transition-colors">{issue.title}</h4>
                                        <p className="text-xs font-medium text-[var(--dashboard-text-soft)] leading-relaxed italic border-l-2 border-red-100 pl-3">
                                            "{issue.description}"
                                        </p>
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">
                                            <div className="flex items-center gap-1">
                                                <FiClock /> Dilaporkan: {new Date(issue.createdAt).toLocaleDateString('id-ID')}
                                            </div>
                                            <div className={`px-2 py-0.5 rounded border text-[8px] font-black uppercase ${statusDisplay.color}`}>
                                                {statusDisplay.label}
                                            </div>
                                        </div>
                                        {issue.resolutionNote && (
                                            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-100 dark:border-emerald-900/20">
                                                <p className="text-[10px] font-black text-emerald-600 uppercase mb-1">Arahan / Catatan Pengawas:</p>
                                                <p className="text-xs font-medium text-emerald-800 dark:text-emerald-300">"{issue.resolutionNote}"</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="md:w-48 flex flex-col justify-center gap-2">
                                        {/* Mandor hanya bisa melihat status dan detail — tidak bisa resolve/close */}
                                        <button
                                            onClick={() => setSelectedIssue(issue)}
                                            className="w-full py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all flex items-center justify-center gap-2"
                                        >
                                            <FiEye /> Lihat Detail <FiChevronRight />
                                        </button>
                                        {(issue.status === 'in_review') && (
                                            <div className="w-full py-2 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-center italic">
                                                Pengawas sedang meninjau
                                            </div>
                                        )}
                                        {(issue.status === 'resolved') && (
                                            <div className="w-full py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-center italic">
                                                Kendala telah resolved
                                            </div>
                                        )}
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
                            activeSubtab === "active"
                                ? "Belum ada kendala lapangan yang dilaporkan. Kendala akan muncul di sini setelah Anda melaporkan masalah di proyek."
                                : `Tidak ada data kendala dengan status "${subtabs.find(t => t.id === activeSubtab)?.label}".`
                        }
                    />
                )}
            </div>

            {/* DETAIL MODAL — Read-only for Mandor */}
            {selectedIssue && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-zoomIn flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-lg font-black uppercase tracking-tight">Detail Kendala Lapangan</h3>
                            <button onClick={() => setSelectedIssue(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                <FiX size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-5 overflow-y-auto max-h-[70vh]">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                                <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest bg-[var(--dashboard-primary)]/10 px-2 py-1 rounded">
                                    {selectedIssue.project?.projectCode || 'PRJ-??'}
                                </span>
                                <div className={`px-2 py-1 rounded border text-[8px] font-black uppercase ${getStatusDisplay(selectedIssue.status).color}`}>
                                    {getStatusDisplay(selectedIssue.status).label}
                                </div>
                            </div>
                            <h4 className="text-xl font-black text-slate-800 dark:text-white leading-tight">{selectedIssue.title}</h4>
                            <div className="flex flex-wrap gap-3">
                                <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Kategori</p>
                                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{selectedIssue.category}</p>
                                </div>
                                <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Prioritas</p>
                                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300 uppercase">
                                        {selectedIssue.priority === 'high' ? 'Tinggi' : selectedIssue.priority === 'medium' ? 'Sedang' : 'Rendah'}
                                    </p>
                                </div>
                                <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg">
                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Dilaporkan</p>
                                    <p className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{new Date(selectedIssue.createdAt).toLocaleDateString('id-ID')}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Deskripsi Kendala</p>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 italic text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                                    "{selectedIssue.description}"
                                </div>
                            </div>
                            {selectedIssue.resolutionNote && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Arahan / Catatan dari Pengawas</p>
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 text-xs font-bold text-emerald-800 dark:text-emerald-300 leading-relaxed">
                                        "{selectedIssue.resolutionNote}"
                                    </div>
                                </div>
                            )}
                            {/* Mandor Role Guard — no action CTA */}
                            <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-2">
                                <FiInfo className="text-blue-500 shrink-0 mt-0.5" size={14} />
                                <p className="text-[9px] font-medium italic text-blue-700 leading-relaxed">
                                    Kendala akan ditutup oleh Pengawas (resolved) dan Admin (closed administratif). Anda tidak perlu melakukan aksi tambahan.
                                </p>
                            </div>
                        </div>
                        <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => setSelectedIssue(null)}
                                className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-200 transition-all"
                            >
                                Tutup Detail
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default KendalaLapanganMandorPage;
