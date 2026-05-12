import React, { useState, useEffect } from "react";
import { FiPlus, FiFileText, FiCloud, FiUsers, FiChevronRight, FiX, FiCheck } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import dailyReportService from "../../services/dailyReportService";
import projectService from "../../services/projectService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const LaporanHarianMandorPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [activeSubtab, setActiveSubtab] = useState("draft");
    const [reports, setReports] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        projectId: "",
        date: new Date().toISOString().split('T')[0],
        weatherSummary: "Cerah",
        workerCount: "",
        activitySummary: "",
        blockerSummary: ""
    });

    useEffect(() => {
        if (!selectedForemanId) {
            setLoading(false);
            return;
        }
        fetchData();
    }, [selectedForemanId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [reportsRes, projectsRes] = await Promise.all([
                dailyReportService.getAllReports({ foremanId: selectedForemanId }),
                projectService.getProjects({ foremanId: selectedForemanId })
            ]);
            setReports(reportsRes.data || []);
            setProjects(projectsRes.data || []);
            
            if (projectsRes.data?.length > 0) {
                setFormData(prev => ({ ...prev, projectId: projectsRes.data[0].id }));
            }
        } catch (err) {
            setError(err.message || "Gagal memuat data");
        } finally {
            setLoading(false);
        }
    };

    const handleCreateReport = async (e) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            await dailyReportService.createReport({
                ...formData,
                foremanId: selectedForemanId
            });
            setIsModalOpen(false);
            setFormData({
                ...formData,
                activitySummary: "",
                blockerSummary: "",
                workerCount: ""
            });
            fetchData();
        } catch (err) {
            alert("Gagal membuat laporan: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmitReport = async (id) => {
        if (!confirm("Kirim laporan ini ke Pengawas? Setelah dikirim, laporan tidak dapat diedit.")) return;
        try {
            await dailyReportService.submitReport(id);
            fetchData();
        } catch (err) {
            alert("Gagal mengirim laporan: " + err.message);
        }
    };

    if (!selectedForemanId && !loading) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Mandor"
                description="Pilih mandor untuk melihat daftar laporan harian."
            />
        );
    }

    if (loading && reports.length === 0 && !error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
            </div>
        );
    }

    if (error) {
        return <RoleDataState type="error" title={error} onRetry={() => fetchData()} />;
    }

    const filteredReports = reports.filter(report => {
        if (activeSubtab === "draft") return report.status === "draft";
        if (activeSubtab === "submitted") return report.status === "submitted" || report.status === "reviewed";
        if (activeSubtab === "needs_revision") return report.status === "rejected";
        return true;
    });

    const subtabs = [
        { id: "draft", label: "Draft" },
        { id: "submitted", label: "Dikirim / Direview" },
        { id: "needs_revision", label: "Perlu Revisi" }
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Laporan Harian / Logbook</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Pencatatan aktivitas, pemakaian sumber daya, dan kondisi lapangan harian.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all"
                >
                    <FiPlus /> Buat Laporan Hari Ini
                </button>
            </div>

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

            <div className="grid grid-cols-1 gap-4">
                {filteredReports.length === 0 ? (
                    <RoleDataState type="empty" title="Tidak ada laporan" description="Tidak ada laporan harian dengan status ini." />
                ) : filteredReports.map((report) => (
                    <div key={report.id} className="dashboard-card hover:border-[var(--dashboard-primary)]/30 transition-all">
                        <div className="flex flex-col md:flex-row justify-between gap-6">
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{report.projectId}</span>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[8px] font-black uppercase rounded tracking-tighter border border-slate-200">
                                            Logbook
                                        </span>
                                    </div>
                                    <span className="text-xs font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest">{new Date(report.date).toLocaleDateString("id-ID")}</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-tighter">Ringkasan Pekerjaan</p>
                                    <h4 className="text-sm font-bold leading-relaxed">"{report.activitySummary}"</h4>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-blue-500/10 text-blue-500 rounded-lg"><FiUsers size={12} /></div>
                                        <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">{report.workerCount} Pekerja</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-lg"><FiCloud size={12} /></div>
                                        <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">Cuaca: {report.weatherSummary}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="md:w-48 flex flex-col justify-center gap-2">
                                {report.status === "draft" ? (
                                    <>
                                        <button 
                                            onClick={() => handleSubmitReport(report.id)}
                                            className="w-full py-2 bg-emerald-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                                        >
                                            <FiCheck /> Kirim Sekarang
                                        </button>
                                        <button className="w-full py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all flex items-center justify-center gap-2">
                                            <FiFileText /> Edit Draft <FiChevronRight />
                                        </button>
                                    </>
                                ) : (
                                    <div className="w-full py-3 bg-slate-50 text-slate-400 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-center italic">
                                        {report.status.toUpperCase()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* QUICK CREATE MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-zoomIn">
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <h3 className="text-lg font-black uppercase tracking-tight">Buat Laporan Harian Baru</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
                                <FiX size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateReport} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pilih Proyek</label>
                                    <select 
                                        required
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold"
                                        value={formData.projectId}
                                        onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                                    >
                                        <option value="">-- Pilih Proyek --</option>
                                        {projects.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tanggal</label>
                                    <input 
                                        type="date"
                                        required
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold"
                                        value={formData.date}
                                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cuaca</label>
                                    <select 
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold"
                                        value={formData.weatherSummary}
                                        onChange={(e) => setFormData({...formData, weatherSummary: e.target.value})}
                                    >
                                        <option value="Cerah">Cerah</option>
                                        <option value="Berawan">Berawan</option>
                                        <option value="Hujan Ringan">Hujan Ringan</option>
                                        <option value="Hujan Lebat">Hujan Lebat</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Jumlah Pekerja</label>
                                    <input 
                                        type="number"
                                        placeholder="0"
                                        className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold"
                                        value={formData.workerCount}
                                        onChange={(e) => setFormData({...formData, workerCount: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ringkasan Pekerjaan</label>
                                <textarea 
                                    required
                                    rows="3"
                                    placeholder="Apa saja yang dikerjakan hari ini?"
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold resize-none"
                                    value={formData.activitySummary}
                                    onChange={(e) => setFormData({...formData, activitySummary: e.target.value})}
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kendala (Opsional)</label>
                                <textarea 
                                    rows="2"
                                    placeholder="Ada masalah atau hambatan?"
                                    className="w-full p-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold resize-none"
                                    value={formData.blockerSummary}
                                    onChange={(e) => setFormData({...formData, blockerSummary: e.target.value})}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 py-3 bg-[var(--dashboard-primary)] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-[var(--dashboard-primary)]/20 transition-all disabled:opacity-50"
                                >
                                    {isSubmitting ? "Menyimpan..." : "Simpan Laporan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LaporanHarianMandorPage;
