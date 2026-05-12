import React, { useState, useEffect } from "react";
import { FiArrowLeft, FiSave, FiPlus, FiTrash2, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import weeklyJournalService from "../../services/weeklyJournalService";
import projectService from "../../services/projectService";
import rabService from "../../services/rabService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";

const CreateJurnalMingguanMandorPage = () => {
    const navigate = useNavigate();
    const { selectedForemanId } = useForemanPersona();
    const [projects, setProjects] = useState([]);
    const [projectStages, setProjectStages] = useState([]);
    const [rabItems, setRabItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingContext, setLoadingContext] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [contextStatus, setContextStatus] = useState({
        stages: 'idle', // idle, loading, success, empty, error
        rab: 'idle'
    });

    const [formData, setFormData] = useState({
        projectId: "",
        weekStartDate: "",
        weekEndDate: "",
        summary: "",
        claimedProgress: 0,
        blockerNote: "",
        activities: [
            { 
                workTitle: "", 
                description: "", 
                location: "", 
                progressClaim: 0, 
                notes: "",
                projectStageId: "",
                rabItemId: ""
            }
        ],
        photos: []
    });

    useEffect(() => {
        const fetchProjects = async () => {
            if (!selectedForemanId) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await projectService.getProjects({ foremanId: selectedForemanId });
                if (response.success) {
                    setProjects(response.data);
                }
            } catch (err) {
                console.error("Failed to fetch projects:", err);
                setError("Gagal memuat daftar proyek assigned.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [selectedForemanId]);

    useEffect(() => {
        const fetchProjectContext = async () => {
            if (!formData.projectId) {
                setProjectStages([]);
                setRabItems([]);
                return;
            }

            try {
                setLoadingContext(true);
                setContextStatus({ stages: 'loading', rab: 'loading' });
                
                const [stagesRes, rabRes] = await Promise.allSettled([
                    projectService.getProjectStages(formData.projectId),
                    projectService.getProjectRab(formData.projectId)
                ]);

                // Process stages
                if (stagesRes.status === 'fulfilled' && stagesRes.value.success) {
                    setProjectStages(stagesRes.value.data);
                    setContextStatus(prev => ({ ...prev, stages: stagesRes.value.data.length > 0 ? 'success' : 'empty' }));
                } else {
                    console.error("Failed to fetch stages:", stagesRes.reason || stagesRes.value?.message);
                    setProjectStages([]);
                    setContextStatus(prev => ({ ...prev, stages: 'error' }));
                }
                
                // Process RAB
                if (rabRes.status === 'fulfilled' && rabRes.value.success && rabRes.value.data) {
                    // Flatten RAB items from categories for easy selection
                    const items = [];
                    rabRes.value.data.categories?.forEach(cat => {
                        cat.items?.forEach(item => {
                            items.push({
                                ...item,
                                categoryName: cat.name,
                                categoryCode: cat.code
                            });
                        });
                    });
                    setRabItems(items);
                    setContextStatus(prev => ({ ...prev, rab: items.length > 0 ? 'success' : 'empty' }));
                } else {
                    console.error("Failed to fetch RAB:", rabRes.reason || rabRes.value?.message);
                    setRabItems([]);
                    setContextStatus(prev => ({ ...prev, rab: 'error' }));
                }
            } catch (err) {
                console.error("Failed to fetch project context:", err);
                setContextStatus({ stages: 'error', rab: 'error' });
            } finally {
                setLoadingContext(false);
            }
        };

        fetchProjectContext();
    }, [formData.projectId]);

    const handleAddActivity = () => {
        setFormData({
            ...formData,
            activities: [
                ...formData.activities, 
                { 
                    workTitle: "", 
                    description: "", 
                    location: "", 
                    progressClaim: 0, 
                    notes: "",
                    projectStageId: "",
                    rabItemId: ""
                }
            ]
        });
    };

    const handleRemoveActivity = (index) => {
        const newActivities = [...formData.activities];
        newActivities.splice(index, 1);
        setFormData({ ...formData, activities: newActivities });
    };

    const handleActivityChange = (index, field, value) => {
        const newActivities = [...formData.activities];
        newActivities[index][field] = value;

        // Auto-fill logic for RabItem
        if (field === 'rabItemId' && value) {
            const selectedItem = rabItems.find(item => item.id === value);
            if (selectedItem) {
                // Only fill if current field is empty
                if (!newActivities[index].workTitle) newActivities[index].workTitle = selectedItem.description;
                if (!newActivities[index].location && selectedItem.location) newActivities[index].location = selectedItem.location;
                if (!newActivities[index].description) newActivities[index].description = `Pengerjaan item ${selectedItem.description} (${selectedItem.volume} ${selectedItem.unit})`;
            }
        }

        setFormData({ ...formData, activities: newActivities });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedForemanId) return;

        if (!formData.projectId || !formData.weekStartDate || !formData.weekEndDate) {
            alert("Harap isi proyek dan periode minggu.");
            return;
        }

        try {
            setSubmitting(true);
            const response = await weeklyJournalService.createWeeklyJournal({
                ...formData,
                actorRole: "mandor",
                actorId: selectedForemanId,
                claimedProgress: parseFloat(formData.claimedProgress),
                activities: formData.activities.map(act => ({
                    ...act,
                    progressClaim: parseFloat(act.progressClaim),
                    // Ensure empty strings are null for backend IDs
                    projectStageId: act.projectStageId || null,
                    rabItemId: act.rabItemId || null
                }))
            });

            if (response.success) {
                navigate(`/mandor/jurnal-mingguan/${response.data.id}`);
            }
        } catch (err) {
            console.error("Failed to create journal:", err);
            alert(err.response?.data?.message || "Gagal membuat jurnal mingguan.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--dashboard-primary)] border-t-transparent"></div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat data proyek...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-10">
                <RoleDataState 
                    type="error"
                    title="Gagal Memuat Data"
                    description={error}
                    onRetry={() => window.location.reload()}
                />
            </div>
        );
    }

    if (!selectedForemanId) {
        return <RolePersonaEmptyState description="Pilih akun Mandor untuk membuat jurnal mingguan." />;
    }

    if (projects.length === 0) {
        return (
            <div className="p-10">
                <RoleDataState 
                    type="empty"
                    title="Tidak Ada Proyek assigned"
                    description="Anda belum memiliki proyek yang ditugaskan. Hubungi Admin atau Pengawas untuk penugasan proyek."
                />
                <div className="mt-6 flex justify-center">
                    <button 
                        onClick={() => navigate("/mandor/jurnal-mingguan")}
                        className="px-6 py-2 bg-slate-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                    >
                        Kembali ke Daftar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate("/mandor/jurnal-mingguan")}
                    className="p-2 hover:bg-[var(--dashboard-surface-soft)] rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Buat Jurnal Baru</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 uppercase font-bold tracking-widest">Input Aktivitas Lapangan Mingguan</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* HEADER INFO */}
                <div className="dashboard-card p-6 space-y-6">
                    <div className="flex items-center gap-2 text-[var(--dashboard-primary)] border-b border-[var(--dashboard-border)] pb-3 mb-4">
                        <FiInfo size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">Informasi Utama</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Pilih Proyek</label>
                            <select 
                                required
                                value={formData.projectId}
                                onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                                className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                            >
                                <option value="">Pilih Proyek</option>
                                {projects.map(p => (
                                    <option 
                                        key={p.id} 
                                        value={p.id} 
                                        disabled={p.status === 'Selesai'}
                                    >
                                        {p.projectCode} - {p.name} {p.status === 'Selesai' ? '(Selesai - Read Only)' : ''}
                                    </option>
                                ))}
                            </select>
                            {formData.projectId && projects.find(p => p.id === formData.projectId)?.status === 'Selesai' && (
                                <div className="mt-2 p-3 bg-purple-50 border border-purple-100 rounded-xl flex items-center gap-2">
                                    <FiInfo className="text-purple-600" size={14} />
                                    <p className="text-[10px] font-black text-purple-700 uppercase tracking-tighter italic">
                                        Proyek ini sudah selesai. Anda tidak dapat membuat jurnal baru untuk proyek ini.
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Mulai Minggu</label>
                                <input 
                                    type="date" 
                                    required
                                    value={formData.weekStartDate}
                                    onChange={(e) => setFormData({...formData, weekStartDate: e.target.value})}
                                    className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Akhir Minggu</label>
                                <input 
                                    type="date" 
                                    required
                                    value={formData.weekEndDate}
                                    onChange={(e) => setFormData({...formData, weekEndDate: e.target.value})}
                                    className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Ringkasan Pekerjaan (Summary)</label>
                            <textarea 
                                placeholder="Apa saja garis besar pekerjaan minggu ini?"
                                value={formData.summary}
                                onChange={(e) => setFormData({...formData, summary: e.target.value})}
                                className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Klaim Progres Mandor (%)</label>
                            <input 
                                type="number" 
                                min="0" max="100"
                                value={formData.claimedProgress}
                                onChange={(e) => setFormData({...formData, claimedProgress: e.target.value})}
                                className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                            />
                            <p className="text-[9px] text-amber-600 font-bold italic mt-1">* Klaim non-resmi berdasarkan aktivitas lapangan Anda.</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Kendala (Jika ada)</label>
                            <input 
                                type="text" 
                                placeholder="Catatan kendala / blocker..."
                                value={formData.blockerNote}
                                onChange={(e) => setFormData({...formData, blockerNote: e.target.value})}
                                className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* ACTIVITIES */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Detail Aktivitas</h3>
                        <button 
                            type="button"
                            onClick={handleAddActivity}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-[var(--dashboard-primary)] transition-all"
                        >
                            <FiPlus /> Tambah Aktivitas
                        </button>
                    </div>

                    {formData.activities.map((activity, index) => (
                        <div key={index} className="dashboard-card p-6 space-y-6 relative group border-2 border-transparent hover:border-[var(--dashboard-primary)]/10 transition-all">
                            <button 
                                type="button"
                                onClick={() => handleRemoveActivity(index)}
                                className="absolute top-4 right-4 p-2 text-rose-400 hover:bg-rose-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            >
                                <FiTrash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* CONTEXT SELECTS */}
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest flex justify-between">
                                        Referensi Tahapan (Opsional)
                                        {loadingContext && <span className="animate-pulse text-[var(--dashboard-primary)]">Loading...</span>}
                                    </label>
                                    <select 
                                        value={activity.projectStageId}
                                        onChange={(e) => handleActivityChange(index, 'projectStageId', e.target.value)}
                                        className={`w-full bg-white border rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all ${
                                            contextStatus.stages === 'error' ? 'border-rose-200 bg-rose-50' : 'border-[var(--dashboard-border)]'
                                        }`}
                                    >
                                        <option value="">
                                            {contextStatus.stages === 'loading' ? 'Memuat tahapan...' : 
                                             contextStatus.stages === 'empty' ? '-- Stage belum tersedia, aktivitas tetap bisa diisi manual --' :
                                             contextStatus.stages === 'error' ? '-- Gagal memuat konteks Stage, isi aktivitas manual --' :
                                             '-- Pilih Tahapan (Opsional) --'}
                                        </option>
                                        {projectStages.map(s => (
                                            <option key={s.id} value={s.id}>{s.name} ({s.status})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest flex justify-between items-center">
                                        <span>Referensi Item RAB (Disarankan)</span>
                                        {loadingContext && <span className="animate-pulse text-[var(--dashboard-primary)]">Loading...</span>}
                                        {!activity.rabItemId && !loadingContext && contextStatus.rab === 'success' && (
                                            <span className="text-[8px] bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded border border-amber-200 animate-pulse">Mapping Disarankan</span>
                                        )}
                                    </label>
                                    <select 
                                        value={activity.rabItemId}
                                        onChange={(e) => handleActivityChange(index, 'rabItemId', e.target.value)}
                                        className={`w-full bg-white border-2 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all ${
                                            activity.rabItemId ? 'border-emerald-200 bg-emerald-50/30' :
                                            contextStatus.rab === 'error' ? 'border-rose-200 bg-rose-50' : 'border-[var(--dashboard-border)]'
                                        }`}
                                    >
                                        <option value="">
                                            {contextStatus.rab === 'loading' ? 'Memuat item RAB...' : 
                                             contextStatus.rab === 'empty' ? '-- RAB item belum tersedia --' :
                                             contextStatus.rab === 'error' ? '-- Gagal memuat konteks RAB --' :
                                             '-- Pilih Item RAB dari Rencana --'}
                                        </option>
                                        {/* Group by category */}
                                        {Object.values(rabItems.reduce((acc, item) => {
                                            const catName = item.categoryName || 'Lainnya';
                                            if (!acc[catName]) acc[catName] = { name: catName, code: item.categoryCode, items: [] };
                                            acc[catName].items.push(item);
                                            return acc;
                                        }, {})).map(group => (
                                            <optgroup key={group.name} label={`${group.code ? `[${group.code}] ` : ''}${group.name}`}>
                                                {group.items.map(item => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.description} — {item.volume} {item.unit}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        ))}
                                    </select>
                                    {!activity.rabItemId && (
                                        <p className="text-[8px] text-amber-600 font-bold italic">
                                            * Aktivitas tanpa item RAB mungkin tidak muncul di filter detail konsumen.
                                        </p>
                                    )}
                                    {activity.rabItemId && (
                                        <p className="text-[8px] text-emerald-600 font-bold italic">
                                            * Terhubung ke RAB: Auto-fill aktif.
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Judul Pekerjaan</label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Contoh: Pekerjaan Pondasi"
                                        value={activity.workTitle}
                                        onChange={(e) => handleActivityChange(index, 'workTitle', e.target.value)}
                                        className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Lokasi/Area</label>
                                    <input 
                                        type="text" 
                                        placeholder="Contoh: Lantai 1 / Area Depan"
                                        value={activity.location}
                                        onChange={(e) => handleActivityChange(index, 'location', e.target.value)}
                                        className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Deskripsi Pekerjaan</label>
                                    <textarea 
                                        required
                                        placeholder="Jelaskan detail yang dikerjakan..."
                                        value={activity.description}
                                        onChange={(e) => handleActivityChange(index, 'description', e.target.value)}
                                        className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all min-h-[60px]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Klaim Item (%)</label>
                                    <input 
                                        type="number" 
                                        min="0" max="100"
                                        value={activity.progressClaim}
                                        onChange={(e) => handleActivityChange(index, 'progressClaim', e.target.value)}
                                        className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Catatan Tambahan</label>
                                    <input 
                                        type="text" 
                                        placeholder="Catatan tambahan untuk item ini..."
                                        value={activity.notes}
                                        onChange={(e) => handleActivityChange(index, 'notes', e.target.value)}
                                        className="w-full bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none focus:border-[var(--dashboard-primary)] transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* PHOTOS (PLACEHOLDER) */}
                <div className="dashboard-card p-6 space-y-4">
                    <div className="flex items-center gap-2 text-[var(--dashboard-primary)] border-b border-[var(--dashboard-border)] pb-3 mb-4">
                        <span className="text-xs font-black uppercase tracking-widest">Lampiran Foto (Placeholder)</span>
                    </div>
                    <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold italic">Fitur upload fisik dalam pengembangan. Gunakan URL foto placeholder untuk simulasi.</p>
                    <div className="p-4 border-2 border-dashed border-[var(--dashboard-border)] rounded-2xl flex flex-col items-center justify-center py-10 text-slate-300">
                        <FiInfo size={32} className="mb-2" />
                        <p className="text-xs font-bold uppercase tracking-widest">Sistem Upload Belum Tersedia</p>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 pt-6 pb-12">
                    <button 
                        type="button"
                        onClick={() => navigate("/mandor/jurnal-mingguan")}
                        className="px-8 py-3 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-text)] transition-all"
                    >
                        Batal
                    </button>
                    <button 
                        type="submit"
                        disabled={submitting || (formData.projectId && projects.find(p => p.id === formData.projectId)?.status === 'Selesai')}
                        className={`flex items-center gap-2 px-10 py-4 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-xl ${
                            submitting || (formData.projectId && projects.find(p => p.id === formData.projectId)?.status === 'Selesai')
                            ? "bg-slate-300 shadow-none cursor-not-allowed"
                            : "bg-[var(--dashboard-primary)] hover:opacity-90 shadow-[var(--dashboard-primary)]/20"
                        }`}
                    >
                        <FiSave size={18} /> {submitting ? "Menyimpan..." : (formData.projectId && projects.find(p => p.id === formData.projectId)?.status === 'Selesai') ? "Mode Read-Only" : "Simpan Draft Jurnal"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateJurnalMingguanMandorPage;
