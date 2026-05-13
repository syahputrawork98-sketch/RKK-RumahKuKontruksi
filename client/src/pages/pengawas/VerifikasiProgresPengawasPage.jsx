import React, { useState, useEffect } from "react";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import projectService from "../../services/projectService";
import rabService from "../../services/rabService";
import weeklyJournalService from "../../services/weeklyJournalService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";
import { FiCheckCircle, FiActivity, FiInfo, FiAlertCircle, FiArrowLeft, FiChevronDown, FiChevronUp, FiBriefcase, FiList, FiFileText, FiLayout } from "react-icons/fi";

const VerifikasiProgresPengawasPage = () => {
    const { selectedSupervisorId } = useSupervisorPersona();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    // Form states
    const [verifiedProgress, setVerifiedProgress] = useState(0);
    const [notes, setNotes] = useState("");
    const [selectedStageId, setSelectedStageId] = useState("");

    // Context states
    const [stages, setStages] = useState([]);
    const [rab, setRab] = useState(null);
    const [journals, setJournals] = useState([]);
    const [loadingContext, setLoadingContext] = useState(false);
    const [showContext, setShowContext] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!selectedSupervisorId) return;
            try {
                setLoading(true);
                const response = await projectService.getProjects({ supervisorId: selectedSupervisorId });
                if (response.success) {
                    setProjects(response.data || []);
                }
            } catch (err) {
                console.error(err);
                setError("Gagal memuat daftar proyek.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [selectedSupervisorId]);

    const handleSelectProject = async (project) => {
        setSelectedProject(project);
        setVerifiedProgress(project.verifiedProgress ?? 0);
        setNotes("");
        setSelectedStageId("");
        setSuccessMessage(null);
        setError(null);
        
        try {
            setLoadingContext(true);
            const [historyRes, stagesRes, rabRes, journalsRes] = await Promise.all([
                projectService.getProjectProgressHistory(project.id, {
                    actorRole: 'pengawas',
                    actorId: selectedSupervisorId
                }),
                projectService.getProjectStages(project.id),
                projectService.getProjectRab(project.id),
                weeklyJournalService.getWeeklyJournals({
                    projectId: project.id,
                    supervisorId: selectedSupervisorId
                })
            ]);

            if (historyRes.success) setHistory(historyRes.data?.history || []);
            if (stagesRes.success) setStages(stagesRes.data || []);
            if (rabRes.success) setRab(rabRes.data || null);
            if (journalsRes.success) setJournals(journalsRes.data || []);
        } catch (err) {
            console.error("Failed to fetch context:", err);
        } finally {
            setLoadingContext(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!selectedProject || !selectedSupervisorId) return;

        if (verifiedProgress < (selectedProject.verifiedProgress ?? 0)) {
            setError(`Progress tidak boleh turun. Progress saat ini: ${selectedProject.verifiedProgress ?? 0}%`);
            return;
        }

        if (notes.length < 10) {
            setError("Catatan verifikasi minimal 10 karakter.");
            return;
        }

        try {
            setSubmitting(true);
            setError(null);
            const response = await projectService.verifyProjectProgress(selectedProject.id, {
                actorRole: "pengawas",
                actorId: selectedSupervisorId,
                verifiedProgress: parseFloat(verifiedProgress),
                notes,
                stageId: selectedStageId || null
            });

            if (response.success) {
                setSuccessMessage("Progress berhasil diverifikasi!");
                // Update local state
                const updatedProject = response.data.project;
                setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
                setSelectedProject(updatedProject);
                // Refresh history
                const historyRes = await projectService.getProjectProgressHistory(selectedProject.id, {
                    actorRole: 'pengawas',
                    actorId: selectedSupervisorId
                });
                setHistory(historyRes.data?.history || []);
                setNotes("");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Gagal melakukan verifikasi.");
        } finally {
            setSubmitting(false);
        }
    };

    if (!selectedSupervisorId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Pengawas Terlebih Dahulu"
                description="Pilih akun Pengawas untuk mengelola verifikasi progress proyek."
            />
        );
    }

    if (loading && projects.length === 0) {
        return <RoleDataState type="loading" message="Memuat data proyek..." />;
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Verifikasi Progres Proyek</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic font-medium">
                        Progress resmi (Source of Truth) hanya berasal dari verifikasi Pengawas.
                    </p>
                </div>
                {selectedProject && (
                    <button 
                        onClick={() => setSelectedProject(null)}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-primary)] transition-all"
                    >
                        <FiArrowLeft /> Kembali ke Daftar
                    </button>
                )}
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                    <FiAlertCircle className="shrink-0" />
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold">
                    <FiCheckCircle className="shrink-0" />
                    {successMessage}
                </div>
            )}

            {selectedProject?.status === 'Selesai' && (
                <div className="bg-purple-600 text-white p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-purple-600/20 animate-slideDown">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <FiCheckCircle size={28} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black tracking-tight">Proyek Selesai Secara Lokal</h3>
                            <p className="text-xs font-bold opacity-80 uppercase tracking-widest mt-0.5">Seluruh Akses Operasional Ditahan</p>
                        </div>
                    </div>
                    <div className="text-right max-w-xs">
                        <p className="text-[10px] font-black uppercase tracking-tighter leading-relaxed">
                            Proyek telah ditutup oleh Admin. Data ini menjadi histori operasional lokal. Anda tidak dapat melakukan verifikasi progress baru.
                        </p>
                    </div>
                </div>
            )}

            {!selectedProject ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div 
                            key={project.id} 
                            className="dashboard-card group cursor-pointer hover:border-[var(--dashboard-primary)] transition-all"
                            onClick={() => handleSelectProject(project)}
                        >
                            <div className="space-y-4">
                                <div className="flex justify-between items-start">
                                    <span className="text-[10px] font-black text-[var(--dashboard-primary)] uppercase tracking-widest">{project.projectCode}</span>
                                    <span className="px-2 py-0.5 bg-[var(--dashboard-surface-soft)] rounded text-[8px] font-black uppercase tracking-tighter">
                                        {project.status}
                                    </span>
                                </div>
                                <h3 className="text-base font-black leading-tight group-hover:text-[var(--dashboard-primary)] transition-colors">{project.name}</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase">
                                        <span className="text-[var(--dashboard-text-soft)]">Verified Progress</span>
                                        <span className="text-[var(--dashboard-primary)]">{project.verifiedProgress ?? 0}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all duration-1000" 
                                            style={{ width: `${project.verifiedProgress ?? 0}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="pt-2 flex justify-between items-center">
                                    <p className="text-[9px] text-[var(--dashboard-text-soft)] font-bold uppercase">
                                        Update: {project.verifiedProgressUpdatedAt ? new Date(project.verifiedProgressUpdatedAt).toLocaleDateString() : 'Belum ada'}
                                    </p>
                                    <FiCheckCircle className="text-slate-200 group-hover:text-[var(--dashboard-primary)] transition-colors" />
                                </div>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && (
                        <div className="col-span-full py-10">
                            <RoleDataState 
                                type="empty"
                                title="Tidak Ada Proyek"
                                description="Tidak ada proyek yang ditugaskan kepada Anda sebagai Pengawas."
                            />
                        </div>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* VERIFICATION FORM */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="dashboard-card">
                            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
                                <FiCheckCircle className="text-emerald-500" /> 
                                Input Progres Fisik Terbaru
                            </h3>
                            <form onSubmit={handleVerify} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <label className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">
                                                Presentase Progres Fisik Terbaru
                                            </label>
                                            <span className="text-[8px] font-black text-blue-600 uppercase tracking-[0.2em] mt-1">Source of Truth (Project.verifiedProgress)</span>
                                        </div>
                                        <span className="text-3xl font-black text-blue-600">{verifiedProgress}%</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="100" 
                                        step="0.1"
                                        disabled={selectedProject.status === 'Selesai'}
                                        value={verifiedProgress}
                                        onChange={(e) => setVerifiedProgress(parseFloat(e.target.value))}
                                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-[var(--dashboard-primary)] ${
                                            selectedProject.status === 'Selesai' ? "bg-slate-200 opacity-50" : "bg-[var(--dashboard-surface-soft)]"
                                        }`}
                                    />
                                    <div className="flex justify-between text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase">
                                        <span>Progres Sebelumnya: {selectedProject.verifiedProgress ?? 0}%</span>
                                        <span>Target: 100%</span>
                                    </div>
                                </div>

                                {stages.length > 0 && (
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">
                                            Tahapan Pekerjaan Terkait (Opsional)
                                        </label>
                                        <select 
                                            value={selectedStageId}
                                            onChange={(e) => setSelectedStageId(e.target.value)}
                                            className="w-full p-4 rounded-2xl bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] text-sm font-medium focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                            disabled={selectedProject.status === 'Selesai'}
                                        >
                                            <option value="">-- Pilih Tahapan (Opsional) --</option>
                                            {stages.map(stage => (
                                                <option key={stage.id} value={stage.id}>
                                                    {stage.title} (Progress: {stage.progress || 0}%)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">
                                        Catatan Verifikasi Lapangan
                                    </label>
                                    <textarea 
                                         value={notes}
                                         disabled={selectedProject.status === 'Selesai'}
                                         onChange={(e) => setNotes(e.target.value)}
                                         placeholder={selectedProject.status === 'Selesai' ? "Proyek sudah selesai. Tidak dapat menambah catatan." : "Tuliskan temuan atau bukti fisik yang mendasari kenaikan progres ini..."}
                                         className={`w-full p-4 rounded-2xl border border-[var(--dashboard-border)] text-sm font-medium focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 focus:outline-none min-h-[120px] transition-all ${
                                            selectedProject.status === 'Selesai' ? "bg-slate-100 opacity-50 italic" : "bg-[var(--dashboard-surface-soft)]"
                                         }`}
                                         required
                                     />
                                     <div className="flex justify-between items-center">
                                         <p className="text-[10px] text-[var(--dashboard-text-soft)] italic">Minimal 10 karakter.</p>
                                         <p className="text-[9px] font-black text-amber-600 uppercase tracking-tighter flex items-center gap-1">
                                             <FiAlertCircle size={12} /> Progress tidak dapat diturunkan setelah diverifikasi
                                         </p>
                                     </div>
                                 </div>

                                 <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                                     <p className="text-[10px] font-bold text-emerald-800 leading-relaxed uppercase tracking-widest">
                                         Catatan: Nilai ini akan menjadi "Official Progress" yang tampil di Dashboard Admin dan Konsumen.
                                     </p>
                                 </div>

                                <div className="pt-4 flex gap-4">
                                    <button 
                                        type="submit"
                                        disabled={submitting || verifiedProgress < selectedProject.verifiedProgress || notes.length < 10 || selectedProject.status === 'Selesai'}
                                        className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                                            submitting || verifiedProgress < selectedProject.verifiedProgress || notes.length < 10 || selectedProject.status === 'Selesai'
                                            ? "bg-slate-200 text-slate-400 cursor-not-allowed shadow-none"
                                            : "bg-[var(--dashboard-primary)] text-white hover:scale-[1.02] shadow-[var(--dashboard-primary)]/20"
                                        }`}
                                    >
                                        {submitting ? "Memproses..." : selectedProject.status === 'Selesai' ? "Read-Only: Selesai" : <><FiCheckCircle /> Verifikasi Sekarang</>}
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setSelectedProject(null)}
                                        className="px-8 py-4 rounded-2xl border border-[var(--dashboard-border)] font-black uppercase tracking-widest text-xs hover:bg-[var(--dashboard-surface-soft)] transition-all"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="dashboard-card">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-black flex items-center gap-2">
                                    <FiLayout className="text-[var(--dashboard-primary)]" /> 
                                    Konteks Pendukung Verifikasi
                                </h3>
                                <button 
                                    onClick={() => setShowContext(!showContext)}
                                    className="p-2 bg-[var(--dashboard-surface-soft)] rounded-xl text-[var(--dashboard-text-soft)]"
                                >
                                    {showContext ? <FiChevronUp /> : <FiChevronDown />}
                                </button>
                            </div>

                            {showContext && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="p-4 bg-slate-100/50 border border-slate-200 rounded-2xl flex gap-3">
                                        <FiInfo className="text-slate-400 mt-1 flex-shrink-0" size={18} />
                                        <div className="text-[10px] font-medium leading-relaxed italic text-slate-500">
                                            <p className="font-black uppercase tracking-widest text-[9px] mb-1">Technical Reference Panel (Read-Only)</p>
                                            <p>Data di bawah ini disinkronkan dari perencanaan (Stages/RAB) dan laporan lapangan (Jurnal Mandor) untuk membantu validasi fisik Anda. <strong>Data ini bersifat referensi dan tidak dapat diubah di sini.</strong></p>
                                        </div>
                                    </div>

                                    {loadingContext ? (
                                        <div className="py-8 flex justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--dashboard-primary)]"></div>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* STAGES CONTEXT */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">
                                                    <FiList size={12} /> Tahapan Pekerjaan
                                                </div>
                                                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-hide">
                                                    {stages.length > 0 ? stages.map(stage => (
                                                        <div key={stage.id} className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <span className="text-[11px] font-black">{stage.title}</span>
                                                                <span className="text-[10px] font-black text-[var(--dashboard-primary)]">{stage.progress || 0}%</span>
                                                            </div>
                                                            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                                                                <div className="h-full bg-[var(--dashboard-primary)]" style={{ width: `${stage.progress || 0}%` }} />
                                                            </div>
                                                            {stage.estimatedEndDate && (
                                                                <p className="text-[8px] font-bold text-[var(--dashboard-text-soft)] mt-1 uppercase">Deadline: {new Date(stage.estimatedEndDate).toLocaleDateString()}</p>
                                                            )}
                                                        </div>
                                                    )) : <p className="text-[10px] italic text-slate-400">Tidak ada data tahapan.</p>}
                                                </div>
                                            </div>

                                            {/* RAB CONTEXT */}
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">
                                                    <FiBriefcase size={12} /> Ringkasan RAB
                                                </div>
                                                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 scrollbar-hide">
                                                    {rab?.categories?.map(cat => (
                                                        <div key={cat.id} className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                                            <p className="text-[10px] font-black uppercase text-[var(--dashboard-primary)] mb-1">{cat.name}</p>
                                                            <div className="space-y-1">
                                                                {cat.items?.slice(0, 3).map(item => (
                                                                    <div key={item.id} className="flex justify-between text-[9px] font-bold">
                                                                        <span className="truncate pr-2">{item.description}</span>
                                                                        <span className="shrink-0">{item.volume} {item.unit}</span>
                                                                    </div>
                                                                ))}
                                                                {cat.items?.length > 3 && <p className="text-[8px] italic text-slate-400">+{cat.items.length - 3} item lainnya</p>}
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {!rab && <p className="text-[10px] italic text-slate-400">RAB belum disetujui atau tidak ditemukan.</p>}
                                                </div>
                                            </div>

                                            {/* JOURNALS CONTEXT */}
                                            <div className="col-span-full space-y-3 pt-2 border-t border-[var(--dashboard-border)]">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">
                                                        <FiFileText size={12} /> Jurnal Mandor Terakhir
                                                    </div>
                                                    <span className="text-[8px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Referensi Non-Resmi</span>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    {journals.slice(0, 3).map(journal => (
                                                        <div key={journal.id} className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)] group hover:border-[var(--dashboard-primary)]/50 transition-all">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[9px] font-black text-amber-600 uppercase tracking-tighter">Klaim Mandor</span>
                                                                    <span className="text-sm font-black text-amber-600">{journal.claimedProgress || 0}%</span>
                                                                </div>
                                                                <StatusBadge type="journal" status={journal.status} />
                                                            </div>
                                                            <p className="text-[10px] font-black truncate">{new Date(journal.weekStartDate).toLocaleDateString()} - {new Date(journal.weekEndDate).toLocaleDateString()}</p>
                                                            <p className="text-[8px] font-bold text-[var(--dashboard-text-soft)] mt-1 uppercase">Dibuat: {new Date(journal.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    ))}
                                                    {journals.length === 0 && <p className="text-[10px] italic text-slate-400">Belum ada jurnal mingguan dari mandor.</p>}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* HISTORY PANEL */}
                    <div className="space-y-6">
                        <div className="dashboard-card">
                            <h3 className="text-sm font-black mb-6 uppercase tracking-widest flex items-center gap-2">
                                <FiActivity /> Riwayat Verifikasi
                            </h3>
                            <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--dashboard-border)]">
                                {history.map((log, idx) => (
                                    <div key={log.id} className="relative pl-8 group">
                                        <div className={`absolute left-0 top-1 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-sm z-10 ${
                                            idx === 0 ? "bg-[var(--dashboard-primary)]" : "bg-slate-200"
                                        }`}>
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-black text-[var(--dashboard-primary)]">{log.newProgress}%</span>
                                                <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)]">{new Date(log.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-xs font-bold leading-tight">{log.notes}</p>
                                            <p className="text-[9px] font-black text-[var(--dashboard-text-soft)] uppercase">Oleh: {log.supervisor?.name || 'Pengawas'}</p>
                                        </div>
                                    </div>
                                ))}
                                {history.length === 0 && (
                                    <div className="pl-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                                        Belum ada riwayat verifikasi.
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="dashboard-card bg-linear-to-br from-[var(--dashboard-primary)] to-emerald-800 text-white p-6">
                            <h4 className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Informasi Proyek</h4>
                            <p className="text-sm font-black mb-4">{selectedProject.name}</p>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-[10px] font-bold border-b border-white/10 pb-2">
                                    <span className="opacity-70 uppercase">Customer</span>
                                    <span>{selectedProject.customer?.name}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold border-b border-white/10 pb-2">
                                    <span className="opacity-70 uppercase">Mulai</span>
                                    <span>{selectedProject.startDate ? new Date(selectedProject.startDate).toLocaleDateString() : '-'}</span>
                                </div>
                                <div className="flex justify-between items-center text-[10px] font-bold">
                                    <span className="opacity-70 uppercase">Status</span>
                                    <span className="uppercase">{selectedProject.status}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerifikasiProgresPengawasPage;
