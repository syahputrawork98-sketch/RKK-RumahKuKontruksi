import React from "react";
import { FiX, FiSave } from "react-icons/fi";

const AdminProjectStageModal = ({ 
    isOpen, 
    onClose, 
    isEditing, 
    stageForm, 
    onFormChange, 
    onSubmit 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-[var(--dashboard-border)]">
                <div className="p-8 border-b border-[var(--dashboard-border)] flex justify-between items-center bg-[var(--dashboard-surface-soft)]">
                    <h3 className="font-black text-sm uppercase tracking-widest text-[var(--dashboard-primary)]">
                        {isEditing ? "Edit Stage" : "Tambah Stage Proyek"}
                    </h3>
                    <button onClick={onClose} className="p-2.5 hover:bg-white rounded-2xl transition-all shadow-sm"><FiX /></button>
                </div>
                <form onSubmit={onSubmit} className="p-8 space-y-5">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Kode</label>
                            <input type="text" value={stageForm.code} onChange={e => onFormChange({...stageForm, code: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-black uppercase shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="P01" required />
                        </div>
                        <div className="col-span-2 space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Judul Stage</label>
                            <input type="text" value={stageForm.title} onChange={e => onFormChange({...stageForm, title: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Pekerjaan Pondasi" required />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Urutan (Order)</label>
                            <input type="number" value={stageForm.order} onChange={e => onFormChange({...stageForm, order: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" required />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Minggu Ke (Week)</label>
                            <input type="number" value={stageForm.week} onChange={e => onFormChange({...stageForm, week: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Status Rencana</label>
                            <select value={stageForm.status} onChange={e => onFormChange({...stageForm, status: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                <option value="planning">Planning</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="finished">Finished</option>
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Durasi (Hari)</label>
                            <input type="number" value={stageForm.durationDays} onChange={e => onFormChange({...stageForm, durationDays: parseInt(e.target.value)})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Rencana Mulai</label>
                            <input type="date" value={stageForm.startDate ? stageForm.startDate.split('T')[0] : ""} onChange={e => onFormChange({...stageForm, startDate: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Rencana Selesai</label>
                            <input type="date" value={stageForm.endDate ? stageForm.endDate.split('T')[0] : ""} onChange={e => onFormChange({...stageForm, endDate: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Deskripsi Tahapan</label>
                        <textarea value={stageForm.description} onChange={e => onFormChange({...stageForm, description: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[80px]" placeholder="Penjelasan singkat mengenai tahapan ini..." />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-1">Catatan Tambahan</label>
                        <textarea value={stageForm.note} onChange={e => onFormChange({...stageForm, note: e.target.value})} className="w-full px-4 py-3 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl text-xs font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Catatan untuk Pengawas/Mandor..." />
                    </div>

                    <button type="submit" className="w-full py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 mt-4">
                        <FiSave /> {isEditing ? "Perbarui Tahapan" : "Simpan Tahapan"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminProjectStageModal;
