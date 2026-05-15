import React, { useState } from "react";
import { FiX, FiSave, FiSend, FiFileText, FiUser, FiPackage, FiCreditCard, FiCalendar } from "react-icons/fi";

const InvoiceDraftModal = ({ isOpen, onClose, draftData, onSave, onSend }) => {
    const [adminNote, setAdminNote] = useState("");
    const [dueDate, setDueDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

    if (!isOpen || !draftData) return null;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const handleSave = () => {
        onSave({ ...draftData, adminNote, dueDate });
    };

    const handleSend = () => {
        onSend({ ...draftData, adminNote, dueDate });
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-slideUp">
                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <FiFileText size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Draft Tagihan (Helper)</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Status: PENDING DRAFT</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-300 hover:text-slate-600 shadow-sm border border-transparent hover:border-slate-100">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 space-y-8 overflow-y-auto max-h-[60vh]">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiUser /> Konsumen</p>
                                <p className="text-sm font-black text-slate-800">{draftData.customerName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiPackage /> Proyek</p>
                                <p className="text-sm font-black text-slate-800">{draftData.projectName}</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiCreditCard /> Metode & Item</p>
                                <p className="text-sm font-black text-slate-800">{draftData.mode} - {draftData.itemName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2"><FiCalendar /> Due Date</p>
                                <input 
                                    type="date" 
                                    className="w-full p-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-blue-50/50 rounded-[2rem] border border-blue-100/50 flex flex-col items-center text-center">
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Total Nominal Tagihan</p>
                        <h2 className="text-4xl font-black text-blue-900 tracking-tighter">{formatCurrency(draftData.amount)}</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Tujuan Pembayaran (Instruksi)</p>
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-black text-slate-800">Bank RKK - Manual Transfer</p>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Sesuai Setting Rekening Perusahaan</p>
                                </div>
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-200">Verified Pattern</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Catatan Admin (Opsional)</label>
                            <textarea 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                placeholder="Tambahkan catatan khusus untuk konsumen..."
                                rows="3"
                                value={adminNote}
                                onChange={(e) => setAdminNote(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                    <button 
                        onClick={handleSave}
                        className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
                    >
                        <FiSave /> Simpan Draft
                    </button>
                    <button 
                        onClick={handleSend}
                        className="flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                        <FiSend /> Rilis Tagihan
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDraftModal;
