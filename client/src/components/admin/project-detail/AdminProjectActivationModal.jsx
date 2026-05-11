import React from "react";
import { FiX, FiPlay, FiInfo } from "react-icons/fi";

const AdminProjectActivationModal = ({ 
    isOpen, 
    onClose, 
    project, 
    onActivate, 
    isActivating 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-100 animate-slideUp">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-emerald-50/50">
                    <div>
                        <h3 className="text-xl font-black text-emerald-900">Konfirmasi Aktivasi</h3>
                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mt-1">Local Project Activation</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-emerald-300">
                        <FiX size={24} />
                    </button>
                </div>
                
                <div className="p-8 space-y-6">
                    <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto shadow-lg shadow-emerald-500/10">
                        <FiPlay size={40} />
                    </div>

                    <div className="text-center space-y-2">
                        <h4 className="text-lg font-black text-slate-800">Aktifkan Proyek {project?.projectCode}?</h4>
                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                            Tindakan ini akan mengubah status proyek menjadi <b>BERJALAN (Active)</b>. Tim lapangan akan mendapatkan akses penuh untuk pelaporan operasional.
                        </p>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                        <FiInfo className="text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase italic">
                            "Aktivasi ini bersifat lokal. Tidak ada kontrak legal atau transaksi keuangan riil yang dipicu oleh tindakan ini."
                        </p>
                    </div>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
                    <button 
                        onClick={onActivate}
                        disabled={isActivating}
                        className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isActivating ? "MENGAKTIFKAN..." : "YA, AKTIFKAN PROYEK"}
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

export default AdminProjectActivationModal;
