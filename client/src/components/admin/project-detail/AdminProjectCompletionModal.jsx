import React from "react";
import { FiX, FiAlertCircle } from "react-icons/fi";

const AdminProjectCompletionModal = ({ 
    isOpen, 
    onClose, 
    completionNote, 
    onNoteChange, 
    onConfirm, 
    isCompleting 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-purple-100 animate-slideUp">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-purple-50/50">
                    <div>
                        <h3 className="text-xl font-black text-purple-900">Konfirmasi Penyelesaian</h3>
                        <p className="text-[10px] font-black text-purple-400 uppercase tracking-widest mt-1">Local Project Closeout</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-purple-300">
                        <FiX size={24} />
                    </button>
                </div>
                
                <div className="p-8 space-y-6">
                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3">
                        <FiAlertCircle className="text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-[11px] font-bold text-amber-800 leading-relaxed uppercase italic">
                            "Tindakan ini akan mengunci proyek. Mandor dan Pengawas tidak akan bisa membuat laporan baru. Tindakan ini BUKAN BAST/Handover resmi dan tidak mengubah Progress SOT."
                        </p>
                    </div>

                    <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Catatan Closeout (Opsional)</label>
                        <textarea 
                            value={completionNote}
                            onChange={(e) => onNoteChange(e.target.value)}
                            placeholder="Tuliskan alasan atau catatan penyelesaian proyek..."
                            className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-medium focus:ring-2 focus:ring-purple-500/20 focus:outline-none min-h-[100px] transition-all"
                        />
                    </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
                    <button 
                        onClick={onConfirm}
                        disabled={isCompleting}
                        className="flex-1 py-4 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isCompleting ? "MEMPROSES..." : "KONFIRMASI SELESAI"}
                    </button>
                    <button 
                        onClick={onClose}
                        className="px-6 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all"
                    >
                        BATAL
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminProjectCompletionModal;
