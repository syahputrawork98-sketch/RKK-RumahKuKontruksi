import React, { useState, useEffect } from "react";
import { FiAlertTriangle, FiPlus, FiClock, FiCheckCircle, FiChevronRight } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import { getFieldIssues, updateFieldIssueStatus, createFieldIssue } from "../../services/fieldIssues.service";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const KendalaLapanganMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("active");
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const handleSubmitNewIssue = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const data = await createFieldIssue({ ...newIssue, foremanId: selectedForemanId });
            setIssues([data.data, ...issues]);
            setIsFormOpen(false);
            setNewIssue({ title: "", projectId: "", category: "Logistik", description: "", priority: "medium" });
        } catch (err) {
            alert("Gagal membuat kendala: " + (err.response?.data?.error || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }
        const fetchIssues = async () => {
            try {
                setLoading(true);
                const data = await getFieldIssues({ foremanId: selectedForemanId });
                setIssues(data.data || []);
            } catch (err) {
                setError(err.message || "Gagal memuat data kendala");
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, [selectedForemanId]);

    const handleMarkResolved = async (id) => {
        try {
            await updateFieldIssueStatus(id, { status: "resolved" });
            setIssues(issues.map(issue => issue.id === id ? { ...issue, status: "resolved" } : issue));
        } catch (err) {
            alert("Gagal memperbarui status kendala: " + err.message);
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
        return <RoleDataState type="error" title={error} onRetry={() => window.location.reload()} />;
    }

    const filteredIssues = issues.filter(issue => {
        if (activeSubtab === "active") return issue.status === "open";
        if (activeSubtab === "follow_up") return issue.status === "in_review";
        if (activeSubtab === "resolved") return issue.status === "resolved";
        if (activeSubtab === "archive") return issue.status === "closed" || issue.status === "rejected";
        return true;
    });

    const subtabs = [
        { id: "active", label: "Aktif" },
        { id: "follow_up", label: "Menunggu Tindak Lanjut" },
        { id: "resolved", label: "Selesai" },
        { id: "archive", label: "Riwayat" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Kendala Lapangan</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Laporkan hambatan atau masalah teknis untuk mendapatkan bantuan segera.</p>
                </div>
                <button 
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-2xl font-bold text-sm shadow-lg shadow-red-500/20 hover:scale-[1.02] transition-all"
                >
                    <FiPlus /> {isFormOpen ? "Batal" : "Lapor Kendala Baru"}
                </button>
            </div>

            {isFormOpen && (
                <div className="dashboard-card border border-red-200">
                    <h3 className="text-lg font-bold text-red-600 mb-4">Lapor Kendala Baru</h3>
                    <form onSubmit={handleSubmitNewIssue} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-[var(--dashboard-text)] uppercase tracking-wide mb-1">Judul Kendala</label>
                            <input 
                                required
                                type="text"
                                name="title"
                                value={newIssue.title}
                                onChange={handleNewIssueChange}
                                className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500/20"
                                placeholder="Misal: Material Semen Telat"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-[var(--dashboard-text)] uppercase tracking-wide mb-1">ID Proyek</label>
                                <input 
                                    required
                                    type="text"
                                    name="projectId"
                                    value={newIssue.projectId}
                                    onChange={handleNewIssueChange}
                                    className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500/20"
                                    placeholder="ID Proyek (cuid)"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-[var(--dashboard-text)] uppercase tracking-wide mb-1">Kategori</label>
                                <select 
                                    name="category"
                                    value={newIssue.category}
                                    onChange={handleNewIssueChange}
                                    className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500/20"
                                >
                                    <option value="Logistik">Logistik</option>
                                    <option value="Alam">Alam</option>
                                    <option value="Teknis">Teknis</option>
                                    <option value="SDM">SDM</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[var(--dashboard-text)] uppercase tracking-wide mb-1">Deskripsi & Catatan</label>
                            <textarea 
                                required
                                name="description"
                                value={newIssue.description}
                                onChange={handleNewIssueChange}
                                className="w-full px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm font-medium focus:ring-2 focus:ring-red-500/20 min-h-[80px]"
                                placeholder="Jelaskan detail kendala..."
                            ></textarea>
                        </div>
                        <div className="flex justify-end pt-2">
                            <button 
                                type="submit"
                                disabled={submitting}
                                className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-50"
                            >
                                {submitting ? "Mengirim..." : "Kirim Laporan"}
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
                    filteredIssues.map((issue) => (
                        <div key={issue.id} className="dashboard-card border-l-4 border-l-red-500">
                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{issue.project?.projectCode}</span>
                                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                            issue.priority === "high" ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"
                                        }`}>
                                            {issue.priority} Priority
                                        </span>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded border border-slate-200">
                                            {issue.category}
                                        </span>
                                    </div>
                                    <h4 className="text-base font-bold text-red-600">{issue.title}</h4>
                                    <p className="text-xs font-medium text-[var(--dashboard-text-soft)] leading-relaxed italic">
                                        "{issue.description}"
                                    </p>
                                    <div className="flex items-center gap-4 text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter">
                                        <div className="flex items-center gap-1">
                                            <FiClock /> Dilaporkan: {new Date(issue.createdAt).toLocaleDateString('id-ID')}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiCheckCircle /> Status: {issue.status}
                                        </div>
                                    </div>
                                </div>
                                <div className="md:w-48 flex flex-col justify-center gap-2">
                                    <button className="w-full py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all flex items-center justify-center gap-2">
                                        Detail Kendala <FiChevronRight />
                                    </button>
                                    {issue.status !== "resolved" && issue.status !== "closed" && (
                                        <button 
                                            onClick={() => handleMarkResolved(issue.id)}
                                            className="w-full py-2 bg-emerald-500/10 text-emerald-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                                            Tandai Selesai
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <RoleDataState 
                        type="empty"
                        title="Tidak Ada Kendala"
                        description={`Tidak ada data kendala lapangan untuk status ${subtabs.find(t => t.id === activeSubtab)?.label}.`}
                    />
                )}
            </div>
        </div>
    );
};

export default KendalaLapanganMandorPage;
