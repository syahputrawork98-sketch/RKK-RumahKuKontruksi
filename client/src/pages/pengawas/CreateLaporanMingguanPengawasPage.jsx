import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiSave, FiAlertCircle, FiInfo, FiCheck, FiPlus, FiTrash2 } from "react-icons/fi";
import { useSupervisorPersona } from "../../context/SupervisorPersonaContext";
import supervisorWeeklyReportService from "../../services/supervisorWeeklyReportService";
import projectService from "../../services/projectService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const CreateLaporanMingguanPengawasPage = () => {
    const navigate = useNavigate();
    const { selectedSupervisorId } = useSupervisorPersona();
    
    // Form States
    const [projects, setProjects] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [weekStartDate, setWeekStartDate] = useState("");
    const [weekEndDate, setWeekEndDate] = useState("");
    
    const [summary, setSummary] = useState("");
    const [qualityNotes, setQualityNotes] = useState("");
    const [safetyNotes, setSafetyNotes] = useState("");
    const [blockerNotes, setBlockerNotes] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [customerSummaryDraft, setCustomerSummaryDraft] = useState("");
    
    const [notes, setNotes] = useState([]);
    const [journalIds, setJournalIds] = useState([]);
    
    // UI States
    const [loading, setLoading] = useState(false);
    const [contextLoading, setContextLoading] = useState(false);
    const [contextData, setContextData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            if (!selectedSupervisorId) return;
            try {
                const response = await projectService.getProjects({ supervisorId: selectedSupervisorId });
                if (response.success) {
                    setProjects(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
            }
        };
        fetchProjects();
    }, [selectedSupervisorId]);

    const handleLoadContext = async () => {
        if (!selectedProjectId || !weekStartDate || !weekEndDate) {
            setError("Pilih proyek dan periode terlebih dahulu.");
            return;
        }

        setError(null);
        setContextLoading(true);
        try {
            const response = await supervisorWeeklyReportService.getReportContext({
                actorRole: "pengawas",
                actorId: selectedSupervisorId,
                projectId: selectedProjectId,
                weekStartDate,
                weekEndDate
            });
            if (response.success) {
                setContextData(response.data);
                // Auto-select all journals by default
                setJournalIds(response.data.approvedJournals.map(j => j.id));
            }
        } catch (err) {
            console.error("Failed to load context:", err);
            setError(err.message || "Gagal memuat data pendukung.");
        } finally {
            setContextLoading(false);
        }
    };

    const handleAddNote = () => {
        setNotes([...notes, { type: "quality", content: "", severity: "low", projectStageId: "", progress: null }]);
    };

    const handleRemoveNote = (index) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    const handleNoteChange = (index, field, value) => {
        const newNotes = [...notes];
        newNotes[index][field] = value;
        setNotes(newNotes);
    };

    const toggleJournal = (id) => {
        if (journalIds.includes(id)) {
            setJournalIds(journalIds.filter(jid => jid !== id));
        } else {
            setJournalIds([...journalIds, id]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProjectId || !weekStartDate || !weekEndDate) {
            setError("Data proyek dan periode wajib diisi.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const payload = {
                actorRole: "pengawas",
                actorId: selectedSupervisorId,
                projectId: selectedProjectId,
                weekStartDate,
                weekEndDate,
                summary,
                qualityNotes,
                safetyNotes,
                blockerNotes,
                recommendation,
                customerSummaryDraft,
                journalIds,
                notes
            };

            const response = await supervisorWeeklyReportService.createSupervisorWeeklyReport(payload);
            if (response.success) {
                navigate(`/pengawas/laporan-mingguan/${response.data.id}`);
            }
        } catch (err) {
            console.error("Failed to create report:", err);
            setError(err.message || "Gagal membuat draf laporan.");
        } finally {
            setLoading(false);
        }
    };

    if (!selectedSupervisorId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Pengawas"
                description="Silakan pilih persona Pengawas melalui Persona Switcher untuk mulai menyusun laporan mingguan."
            />
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/pengawas/laporan-mingguan")}
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <FiArrowLeft className="text-xl" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-extrabold tracking-tight">Buat Laporan Mingguan</h2>
                        <p className="text-xs text-[var(--dashboard-text-soft)] italic mt-1">
                            Menyusun evaluasi mingguan berdasarkan data lapangan.
                        </p>
                    </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3 items-center">
                    <FiAlertCircle className="text-red-500 flex-shrink-0" />
                    <p className="text-xs font-bold text-red-700">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Section 1: Project & Period */}
                <div className="dashboard-card p-6 space-y-4">
                    <h3 className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 mb-4">
                        1. Informasi Proyek & Periode
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Proyek</label>
                            <select 
                                value={selectedProjectId}
                                onChange={(e) => setSelectedProjectId(e.target.value)}
                                className="w-full bg-slate-50 border border-[var(--dashboard-border)] rounded-xl px-4 py-2.5 text-sm font-bold focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none transition-all"
                                required
                            >
                                <option value="">Pilih Proyek</option>
                                {projects.map(p => (
                                    <option key={p.id} value={p.id}>{p.projectCode} - {p.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Dari Tanggal</label>
                            <input 
                                type="date"
                                value={weekStartDate}
                                onChange={(e) => setWeekStartDate(e.target.value)}
                                className="w-full bg-slate-50 border border-[var(--dashboard-border)] rounded-xl px-4 py-2.5 text-sm font-bold outline-none"
                                required
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Sampai Tanggal</label>
                            <input 
                                type="date"
                                value={weekEndDate}
                                onChange={(e) => setWeekEndDate(e.target.value)}
                                className="w-full bg-slate-50 border border-[var(--dashboard-border)] rounded-xl px-4 py-2.5 text-sm font-bold outline-none"
                                required
                            />
                        </div>
                    </div>
                    <button 
                        type="button"
                        onClick={handleLoadContext}
                        disabled={contextLoading || !selectedProjectId || !weekStartDate || !weekEndDate}
                        className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                    >
                        {contextLoading ? (
                            <>
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Memuat Data...
                            </>
                        ) : "Load Data Konteks (Jurnal & Progres)"}
                    </button>
                </div>

                {contextData && (
                    <>
                        {/* Section 2: Progress SOT */}
                        <div className="dashboard-card p-6 bg-blue-50/30 border-blue-100">
                            <h3 className="text-sm font-black uppercase tracking-widest text-blue-800 border-b border-blue-100 pb-3 mb-4">
                                2. Snapshot Progres Terverifikasi (SOT)
                            </h3>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase text-blue-600">Verified Progress Terakhir</p>
                                    <p className="text-3xl font-black text-blue-900">{contextData.verifiedProgressSnapshot}%</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-blue-600 uppercase italic">Sumber: Project Progress SOT</p>
                                    <p className="text-[10px] text-blue-500 mt-1">
                                        Update terakhir: {contextData.project?.verifiedProgressUpdatedAt ? new Date(contextData.project.verifiedProgressUpdatedAt).toLocaleString('id-ID') : 'Belum ada data'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Approved Journals */}
                        <div className="dashboard-card p-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 mb-4">
                                3. Jurnal Mandor Terverifikasi (Approved)
                            </h3>
                            {contextData.approvedJournals.length === 0 ? (
                                <p className="text-xs text-amber-600 italic bg-amber-50 p-3 rounded-xl border border-amber-100">
                                    Tidak ditemukan jurnal Mandor yang berstatus 'Approved' untuk periode ini. Laporan tetap bisa dibuat namun tanpa rekap aktivitas otomatis.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] italic mb-2">Pilih jurnal yang akan dijadikan bahan evaluasi:</p>
                                    {contextData.approvedJournals.map(journal => (
                                        <div 
                                            key={journal.id}
                                            onClick={() => toggleJournal(journal.id)}
                                            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                                                journalIds.includes(journal.id) 
                                                ? "bg-emerald-50 border-emerald-200" 
                                                : "bg-white border-slate-200"
                                            }`}
                                        >
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold">Jurnal: {journal.foreman?.name}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)]">
                                                    {new Date(journal.weekStartDate).toLocaleDateString()} - {new Date(journal.weekEndDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                            {journalIds.includes(journal.id) && <FiCheck className="text-emerald-500" />}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section 4: Main Evaluation */}
                        <div className="dashboard-card p-6 space-y-4">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] border-b pb-3 mb-4">
                                4. Narasi Evaluasi & Ringkasan
                            </h3>
                            
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Ringkasan Umum (Summary)</label>
                                <textarea 
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    className="w-full bg-slate-50 border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-medium h-24 outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                    placeholder="Tuliskan ringkasan capaian dan kondisi proyek minggu ini..."
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1 text-emerald-600">Catatan Kualitas (Quality)</label>
                                    <textarea 
                                        value={qualityNotes}
                                        onChange={(e) => setQualityNotes(e.target.value)}
                                        className="w-full bg-slate-50 border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-xs font-medium h-20 outline-none"
                                        placeholder="Evaluasi kualitas pekerjaan mandor..."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1 text-amber-600">Catatan Keselamatan (Safety)</label>
                                    <textarea 
                                        value={safetyNotes}
                                        onChange={(e) => setSafetyNotes(e.target.value)}
                                        className="w-full bg-slate-50 border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-xs font-medium h-20 outline-none"
                                        placeholder="Catatan K3 dan keselamatan di lapangan..."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1 text-red-600">Kendala Lapangan (Blockers)</label>
                                    <textarea 
                                        value={blockerNotes}
                                        onChange={(e) => setBlockerNotes(e.target.value)}
                                        className="w-full bg-slate-50 border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-xs font-medium h-20 outline-none"
                                        placeholder="Hambatan rill yang menghambat pekerjaan..."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1 text-indigo-600">Rekomendasi / Rencana Kerja</label>
                                    <textarea 
                                        value={recommendation}
                                        onChange={(e) => setRecommendation(e.target.value)}
                                        className="w-full bg-slate-50 border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-xs font-medium h-20 outline-none"
                                        placeholder="Saran tindakan atau rencana minggu depan..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 5: Specific Notes (Optional) */}
                        <div className="dashboard-card p-6 space-y-4">
                            <div className="flex items-center justify-between border-b pb-3 mb-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">
                                    5. Catatan Detail Tambahan
                                </h3>
                                <button 
                                    type="button"
                                    onClick={handleAddNote}
                                    className="flex items-center gap-1 text-[10px] font-black text-[var(--dashboard-primary)] hover:underline tracking-widest"
                                >
                                    <FiPlus /> TAMBAH CATATAN
                                </button>
                            </div>
                            
                            {notes.length === 0 ? (
                                <p className="text-[10px] text-[var(--dashboard-text-soft)] italic text-center py-4">Belum ada catatan detail tambahan.</p>
                            ) : (
                                <div className="space-y-4">
                                    {notes.map((note, idx) => (
                                        <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group">
                                            <button 
                                                type="button"
                                                onClick={() => handleRemoveNote(idx)}
                                                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <FiTrash2 />
                                            </button>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Tipe</label>
                                                        <select 
                                                            value={note.type}
                                                            onChange={(e) => handleNoteChange(idx, 'type', e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold outline-none"
                                                        >
                                                            <option value="quality">Quality</option>
                                                            <option value="safety">Safety</option>
                                                            <option value="blocker">Blocker</option>
                                                            <option value="recommendation">Recommendation</option>
                                                            <option value="material">Material</option>
                                                            <option value="schedule">Schedule</option>
                                                            <option value="progress">Progress Update</option>
                                                            <option value="other">Other</option>
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Urgensi</label>
                                                        <select 
                                                            value={note.severity}
                                                            onChange={(e) => handleNoteChange(idx, 'severity', e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold outline-none"
                                                        >
                                                            <option value="low">Low</option>
                                                            <option value="medium">Medium</option>
                                                            <option value="high">High</option>
                                                            <option value="critical">Critical</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Link Tahap (Opsional)</label>
                                                        <select 
                                                            value={note.projectStageId || ""}
                                                            onChange={(e) => handleNoteChange(idx, 'projectStageId', e.target.value)}
                                                            className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-bold outline-none"
                                                        >
                                                            <option value="">- Tanpa Link -</option>
                                                            {contextData.project?.stages?.map(s => (
                                                                <option key={s.id} value={s.id}>{s.title} ({s.progress}%)</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-1">
                                                         <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Link Item RAB (Thread)</label>
                                                         <select
                                                             value={note.rabItemId || ""}
                                                             onChange={(e) => handleNoteChange(idx, 'rabItemId', e.target.value)}
                                                             className={`w-full bg-white border rounded-lg px-2 py-1 text-[11px] font-bold outline-none ${note.rabItemId ? 'border-indigo-200 bg-indigo-50' : 'border-slate-200'}`}
                                                         >
                                                             <option value="">- Pilih Item (Untuk Thread) -</option>
                                                             {Object.values((contextData.rabItems || []).reduce((acc, item) => {
                                                                 const catName = item.categoryName || 'Lainnya';
                                                                 if (!acc[catName]) acc[catName] = { name: catName, code: item.categoryCode, items: [] };
                                                                 acc[catName].items.push(item);
                                                                 return acc;
                                                             }, {})).map(group => (
                                                                 <optgroup key={group.name} label={`${group.code ? `[${group.code}] ` : ''}${group.name}`}>
                                                                     {group.items.map(item => (
                                                                         <option key={item.id} value={item.id}>
                                                                             {item.description}
                                                                         </option>
                                                                     ))}
                                                                 </optgroup>
                                                             ))}
                                                         </select>
                                                     </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black uppercase text-blue-600 ml-1">Update Progres Lapangan (Reporting Only)</label>
                                                        <input 
                                                            type="number"
                                                            min="0"
                                                            max="100"
                                                            value={note.progress === null ? "" : note.progress}
                                                            onChange={(e) => handleNoteChange(idx, 'progress', e.target.value === "" ? null : parseFloat(e.target.value))}
                                                            className="w-full bg-blue-50 border border-blue-200 rounded-lg px-2 py-1 text-[11px] font-bold outline-none text-blue-700"
                                                            placeholder="0-100"
                                                            disabled={!note.projectStageId}
                                                        />
                                                        <p className="text-[8px] text-blue-500 italic mt-0.5 ml-1 leading-tight">
                                                            *Data snapshot administratif, tidak mengubah Progres Resmi (SOT).
                                                        </p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        {/* Spacer for alignment */}
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 space-y-1">
                                                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] ml-1">Isi Catatan / Justifikasi</label>
                                                    <input 
                                                        type="text"
                                                        value={note.content}
                                                        onChange={(e) => handleNoteChange(idx, 'content', e.target.value)}
                                                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1 text-xs font-medium outline-none"
                                                        placeholder="Ketik detail catatan atau alasan update progres..."
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section 6: Customer Summary */}
                        <div className="dashboard-card p-6 border-dashed border-2">
                            <div className="flex items-center gap-2 border-b pb-3 mb-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">
                                    6. Draf Ringkasan untuk Konsumen
                                </h3>
                                <span className="bg-amber-100 text-amber-700 text-[9px] font-black px-2 py-0.5 rounded uppercase">Draft</span>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100 space-y-2">
                                <div className="flex gap-2 items-start text-[11px] text-amber-700 italic">
                                    <FiInfo className="flex-shrink-0 mt-0.5" />
                                    <p>Tuliskan ringkasan yang lebih sopan dan mudah dimengerti oleh Konsumen. Draft ini akan ditinjau Admin sebelum dipublish.</p>
                                </div>
                                <textarea 
                                    value={customerSummaryDraft}
                                    onChange={(e) => setCustomerSummaryDraft(e.target.value)}
                                    className="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-sm font-medium h-24 outline-none focus:ring-2 focus:ring-amber-500/20"
                                    placeholder="Contoh: Pekerjaan pondasi sudah selesai 100%, saat ini sedang persiapan pemasangan dinding bata..."
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <button 
                                type="button"
                                onClick={() => navigate("/pengawas/laporan-mingguan")}
                                className="px-8 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-sm text-slate-600 hover:bg-slate-50 transition-all"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 px-10 py-3 bg-[var(--dashboard-primary)] text-white rounded-2xl font-bold text-sm shadow-xl shadow-[var(--dashboard-primary)]/30 hover:scale-[1.02] disabled:opacity-50 transition-all"
                            >
                                {loading ? "Menyimpan..." : <><FiSave /> Simpan Draf Laporan</>}
                            </button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default CreateLaporanMingguanPengawasPage;
