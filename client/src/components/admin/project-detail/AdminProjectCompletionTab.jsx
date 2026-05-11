import React from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

const AdminProjectCompletionTab = ({ 
    project, 
    isCompletionReady, 
    completionChecks, 
    onCompleteClick 
}) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Kesiapan Penyelesaian Lokal</h3>
                <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${isCompletionReady ? "bg-purple-500 text-white shadow-lg shadow-purple-500/30" : "bg-amber-500 text-white shadow-lg shadow-amber-500/30"}`}>
                    {isCompletionReady ? "SIAP DISELESAIKAN" : "BELUM LENGKAP"}
                </div>
            </div>

            {project.status === 'Selesai' ? (
                <div className="p-12 text-center bg-purple-50 rounded-[3rem] border border-purple-100 space-y-4">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-purple-500 mx-auto shadow-lg shadow-purple-500/10 border border-purple-100">
                        <FiCheckCircle size={40} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-purple-900">Proyek Telah Selesai</h4>
                        <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mt-1">Status: Selesai Lokal</p>
                    </div>
                    <p className="text-sm text-purple-700 max-w-sm mx-auto leading-relaxed">
                        Proyek ini sudah ditutup secara lokal oleh Admin. Seluruh aktivitas lapangan telah dihentikan dan data tersimpan sebagai riwayat.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4">
                        {completionChecks.map((check, i) => (
                            <div key={i} className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${check.status ? "bg-white border-emerald-100 shadow-sm shadow-emerald-500/5" : "bg-slate-50 border-slate-200 opacity-70"}`}>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${check.status ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400"}`}>
                                    {check.status ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
                                </div>
                                <div>
                                    <h4 className={`text-sm font-black uppercase tracking-tight ${check.status ? "text-emerald-700" : "text-slate-500"}`}>{check.label}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 leading-relaxed">{check.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex gap-4 items-start">
                        <FiInfo className="text-amber-500 shrink-0 mt-1" size={24} />
                        <div>
                            <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest">PENTING: Penyelesaian Lokal</h4>
                            <p className="text-[10px] text-amber-600 mt-2 leading-relaxed font-bold uppercase">
                                Penyelesaian ini bersifat operasional untuk mengunci project di dashboard Mandor/Pengawas. Ini BUKAN merupakan BAST (Berita Acara Serah Terima) legal atau handover resmi ke konsumen.
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-center">
                        {isCompletionReady ? (
                            <button 
                                onClick={onCompleteClick}
                                className="px-10 py-4 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-purple-600/20 hover:scale-105 transition-all animate-bounce"
                            >
                                Tandai Proyek Selesai Lokal
                            </button>
                        ) : (
                            <div className="text-center space-y-2 opacity-50">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">Tombol Penyelesaian Terkunci</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase">Lengkapi kriteria di atas untuk mengaktifkan fungsi closeout.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminProjectCompletionTab;
