import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiMapPin, FiCalendar, FiDollarSign, FiType, FiFileText, FiClock, FiPenTool, FiZap, FiCheckCircle } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import designRequestService from "../../services/designRequestService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import DesignTimeline from "../../components/design/DesignTimeline";

const DetailPermintaanDesainArsitekPage = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    
    // Progress Update Form State
    const [progressForm, setProgressForm] = useState({
        stage: "Preliminary",
        progressPercent: "",
        note: "",
        issues: ""
    });

    const fetchRequest = async () => {
        try {
            setLoading(true);
            const res = await designRequestService.getDesignRequestById(requestId);
            setRequest(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching request detail:", err);
            setError("Data tidak ditemukan atau terjadi kesalahan server.");
            setLoading(false);
        }
    };
    
    const handleAddProgress = async (action = 'architect_progress_update') => {
        if (action === 'architect_progress_update' && !progressForm.note.trim()) {
            alert("Harap isi catatan progress.");
            return;
        }

        try {
            setSubmitting(true);
            
            let note = "";
            if (action === 'architect_started_work') {
                note = "Arsitek telah memulai pengerjaan desain.";
            } else if (action === 'architect_ready_for_review') {
                note = "Arsitek telah menandai desain ini SIAP UNTUK REVIEW.";
            } else {
                note = `[${progressForm.stage}] Progress: ${progressForm.progressPercent || '0'}%\nCatatan: ${progressForm.note}\nKendala: ${progressForm.issues || '-'}`;
            }

            await designRequestService.addHistory(requestId, {
                action,
                actorRole: 'architect',
                actorId: selectedArchitectId,
                actorName: 'Arsitek Mitra',
                note,
                metadata: action === 'architect_progress_update' ? {
                    stage: progressForm.stage,
                    progressPercent: progressForm.progressPercent
                } : {}
            });

            // If ready for review, update main status
            if (action === 'architect_ready_for_review') {
                await designRequestService.updateDesignRequest(requestId, { status: 'in_review' });
            }

            // Note: in_progress status removed as per Batch 8A-1 requirements.
            // Status remains 'assigned' while architect is working.

            alert("Update berhasil disimpan!");
            setProgressForm({
                stage: "Preliminary",
                progressPercent: "",
                note: "",
                issues: ""
            });
            fetchRequest();
        } catch (err) {
            console.error("Error adding progress:", err);
            alert("Gagal menyimpan update.");
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (selectedArchitectId) {
            fetchRequest();
        }
    }, [requestId, selectedArchitectId]);

    if (personaLoading || (loading && selectedArchitectId)) {
        return <RoleDataState type="loading" message="Memuat detail brief..." />;
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk melihat detail permintaan desain."
            />
        );
    }

    if (error || !request) {
        return (
            <div className="space-y-6">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-xs font-bold text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-primary)] transition-colors">
                    <FiArrowLeft /> Kembali
                </button>
                <RoleDataState type="error" message={error || "Data tidak ditemukan"} onRetry={fetchRequest} />
            </div>
        );
    }

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => navigate("/arsitek/permintaan-desain")}
                    className="p-2 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl transition-all"
                >
                    <FiArrowLeft size={20} />
                </button>
                <div>
                    <h2 className="text-2xl font-black tracking-tight">{request.title}</h2>
                    <p className="text-[10px] text-neutral-50 font-bold mt-0.5 uppercase tracking-widest italic">Simulasi Local Workflow — Detail Brief Proyek</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* BRIEF CONTENT */}
                    <div className="dashboard-card">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-1 h-4 bg-[var(--dashboard-primary)] rounded-full"></div>
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--dashboard-text-soft)]">Informasi Proyek</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FiType size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Tipe Bangunan</p>
                                        <p className="text-sm font-bold text-[var(--dashboard-text)]">{request.buildingType || "-"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><FiMapPin size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Lokasi</p>
                                        <p className="text-sm font-bold text-[var(--dashboard-text)]">{request.location || "-"}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><FiDollarSign size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Estimasi Budget</p>
                                        <p className="text-sm font-bold text-[var(--dashboard-text)]">
                                            {request.estimatedBudget ? `Rp ${Number(request.estimatedBudget).toLocaleString("id-ID")}` : "-"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><FiCalendar size={18} /></div>
                                    <div>
                                        <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest mb-1">Tanggal Masuk</p>
                                        <p className="text-sm font-bold text-[var(--dashboard-text)]">
                                            {new Date(request.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 pt-10 border-t border-[var(--dashboard-border-soft)]">
                            <div className="flex items-center gap-2 mb-4">
                                <FiFileText className="text-[var(--dashboard-primary)]" />
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">Deskripsi / Brief</h4>
                            </div>
                            <p className="text-sm text-[var(--dashboard-text)] leading-relaxed bg-[var(--dashboard-surface-soft)] p-6 rounded-2xl border border-[var(--dashboard-border-soft)] whitespace-pre-wrap">
                                {request.description || "Tidak ada deskripsi tambahan."}
                            </p>
                        </div>

                        {/* TIMELINE SECTION */}
                        <div className="dashboard-card">
                            <div className="flex items-center gap-2 mb-8">
                                <FiClock className="text-[var(--dashboard-primary)]" />
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--dashboard-text-soft)]">Timeline & Riwayat Desain</h3>
                            </div>
                            <DesignTimeline 
                                history={request.history || []}
                                majorCount={request.majorRevisionCount || 0}
                                minorCount={request.minorRevisionCount || 0}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* ADMIN CURATED INSTRUCTION (IMPORTANT) */}
                    <div className="dashboard-card bg-indigo-600 text-white border-none shadow-xl shadow-indigo-600/20">
                        <div className="flex items-center gap-2 mb-4">
                            <FiFileText className="text-indigo-200" />
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Instruksi Admin (Curated)</h3>
                        </div>
                        {request.history?.filter(h => h.action === 'admin_curated_instruction').length > 0 ? (
                            <div className="space-y-4">
                                <p className="text-sm font-medium leading-relaxed bg-white/10 p-4 rounded-xl border border-white/10 whitespace-pre-wrap italic">
                                    "{request.history.filter(h => h.action === 'admin_curated_instruction').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].note}"
                                </p>
                                <p className="text-[9px] font-bold text-indigo-200 uppercase tracking-tighter">
                                    Terakhir diperbarui: {new Date(request.history.filter(h => h.action === 'admin_curated_instruction').sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].createdAt).toLocaleString('id-ID')}
                                </p>
                            </div>
                        ) : (
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-xs font-bold text-indigo-200 italic">Belum ada instruksi teknis terkurasi dari Admin.</p>
                            </div>
                        )}
                    </div>
                    {/* CUSTOMER INFO */}
                    <div className="dashboard-card border-t-4 border-t-[var(--dashboard-primary)]">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-6">Informasi Konsumen</h3>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                {request.customer?.name?.[0] || request.customer?.companyName?.[0] || "?"}
                            </div>
                            <div>
                                <p className="text-sm font-bold text-[var(--dashboard-text)]">{request.customer?.name || request.customer?.companyName}</p>
                                <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold uppercase tracking-tight">{request.customer?.customerType}</p>
                            </div>
                        </div>
                    </div>

                    {/* STATUS TRACKING */}
                    <div className="dashboard-card">
                            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[var(--dashboard-border-soft)] shadow-sm">
                                <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest">Status Saat Ini</span>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                                    request.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                    request.status === 'in_review' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    request.status === 'assigned' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                    'bg-blue-50 text-blue-600 border-blue-100'
                                }`}>
                                    {request.status === 'assigned' && request.history?.some(h => h.action === 'architect_started_work') ? 'Dikerjakan' : request.status.replace('_', ' ')}
                                </span>
                            </div>

                            {/* REVISION COUNTER SUMMARY */}
                            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ringkasan Revisi Lokal</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Major</p>
                                        <p className={`text-sm font-black ${request.majorRevisionCount >= 3 ? 'text-red-500' : 'text-slate-700'}`}>
                                            {request.majorRevisionCount || 0} / 3
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">Minor</p>
                                        <p className={`text-sm font-black ${request.minorRevisionCount >= 5 ? 'text-red-500' : 'text-slate-700'}`}>
                                            {request.minorRevisionCount || 0} / 5
                                        </p>
                                    </div>
                                </div>
                                {(request.majorRevisionCount >= 3 || request.minorRevisionCount >= 5) && (
                                    <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                                        <p className="text-[9px] font-black text-red-600 uppercase leading-tight italic">
                                            Warning: Limit revisi tercapai. Hubungi Admin untuk instruksi lanjut.
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            <div className={`p-5 rounded-2xl space-y-3 ${request.status === 'converted' ? 'bg-purple-50 border border-purple-100' : 'bg-indigo-50 border border-indigo-100'}`}>
                                <h4 className={`text-[10px] font-black uppercase tracking-widest ${request.status === 'converted' ? 'text-purple-700' : 'text-indigo-700'}`}>
                                    {request.status === 'converted' ? 'Proyek Telah Dimulai' : 'Langkah Berikutnya'}
                                </h4>
                                <ul className="space-y-2">
                                    {request.status === 'converted' ? (
                                        <li className="text-[10px] font-bold text-purple-800 flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1"></div>
                                            Desain ini telah dikonversi menjadi Proyek Fisik. Seluruh aktivitas revisi desain dihentikan.
                                        </li>
                                    ) : (
                                        <>
                                            <li className="text-[10px] font-bold text-indigo-800 flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1"></div>
                                                Unggah progres desain secara manual ke timeline.
                                            </li>
                                            <li className="text-[10px] font-bold text-indigo-800 flex items-start gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1"></div>
                                                Tunggu review & revisi dari Konsumen.
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                    </div>

                    {/* PROGRESS UPDATE WORKSPACE (FOR ARCHITECT) */}
                    {!['approved', 'project_created', 'finished'].includes(request.status) && (
                        <div className="dashboard-card border-t-4 border-t-indigo-600 bg-indigo-50/20">
                            <div className="flex items-center gap-2 mb-6">
                                <FiPenTool className="text-indigo-600" />
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-900">Workspace Eksekusi Desain</h3>
                            </div>

                            <div className="space-y-6">
                                {/* ACTION BUTTONS */}
                                <div className="flex flex-wrap gap-3">
                                    {!request.history?.some(h => h.action === 'architect_started_work') && (
                                        <button 
                                            onClick={() => handleAddProgress('architect_started_work')}
                                            disabled={submitting}
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-indigo-600/10 hover:bg-indigo-700 transition-all"
                                        >
                                            <FiZap className="inline mr-2" /> Mulai Kerja
                                        </button>
                                    )}

                                    <button 
                                        onClick={() => handleAddProgress('architect_ready_for_review')}
                                        disabled={submitting || request.status === 'in_review'}
                                        className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-600/10 hover:bg-emerald-700 transition-all disabled:opacity-50"
                                    >
                                        <FiCheckCircle className="inline mr-2" /> Tandai Siap Review
                                    </button>
                                </div>

                                {/* PROGRESS FORM */}
                                <div className="p-6 bg-white rounded-[2rem] border border-indigo-100 shadow-sm space-y-4">
                                    <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest">Catat Progress Desain Lokal</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase">Tahapan / Stage</label>
                                            <select 
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                value={progressForm.stage}
                                                onChange={(e) => setProgressForm({...progressForm, stage: e.target.value})}
                                            >
                                                <option value="Preliminary">Preliminary Design</option>
                                                <option value="Schematic">Schematic Design</option>
                                                <option value="Design Development">Design Development</option>
                                                <option value="Final Detail">Final Detail / Finishing</option>
                                            </select>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold text-slate-400 uppercase">Progress (%)</label>
                                            <input 
                                                type="number"
                                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                                                placeholder="0-100"
                                                value={progressForm.progressPercent}
                                                onChange={(e) => setProgressForm({...progressForm, progressPercent: e.target.value})}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-slate-400 uppercase">Catatan Aktivitas</label>
                                        <textarea 
                                            rows="2"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                            placeholder="Apa yang dikerjakan hari ini?..."
                                            value={progressForm.note}
                                            onChange={(e) => setProgressForm({...progressForm, note: e.target.value})}
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[9px] font-bold text-slate-400 uppercase">Kendala (Opsional)</label>
                                        <textarea 
                                            rows="1"
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                            placeholder="Ada kendala teknis atau butuh klarifikasi?..."
                                            value={progressForm.issues}
                                            onChange={(e) => setProgressForm({...progressForm, issues: e.target.value})}
                                        />
                                    </div>

                                    <button 
                                        onClick={() => handleAddProgress()}
                                        disabled={submitting || !progressForm.note.trim()}
                                        className="w-full py-3 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-indigo-100 hover:bg-indigo-100 transition-all"
                                    >
                                        {submitting ? "Menyimpan..." : "Simpan Update Progress"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPermintaanDesainArsitekPage;
