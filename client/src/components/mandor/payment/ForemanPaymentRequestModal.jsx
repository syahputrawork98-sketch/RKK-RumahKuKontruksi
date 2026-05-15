import React, { useState } from "react";
import { FiX, FiCheckCircle, FiInfo, FiFileText, FiLayers, FiCalendar, FiTarget } from "react-icons/fi";

const ForemanPaymentRequestModal = ({ isOpen, onClose, projects = [], onSubmit, bankAccount }) => {
    if (!isOpen) return null;

    const [projectId, setProjectId] = useState("");
    const [basis, setBasis] = useState("WEEKLY"); // WEEKLY, CATEGORY, ITEM
    const [period, setPeriod] = useState("");
    const [targetItem, setTargetItem] = useState("");
    const [amount, setAmount] = useState("");
    const [notes, setNotes] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!projectId || !amount || (basis === 'WEEKLY' && !period) || (basis !== 'WEEKLY' && !targetItem)) {
            alert("Harap lengkapi semua data pengajuan.");
            return;
        }

        if (!bankAccount) {
            alert("Harap lengkapi data rekening di dashboard terlebih dahulu.");
            return;
        }

        setProcessing(true);
        setTimeout(() => {
            const project = projects.find(p => p.id === projectId);
            onSubmit({
                projectId,
                projectName: project?.name,
                basis,
                period: basis === 'WEEKLY' ? period : null,
                targetItem: basis !== 'WEEKLY' ? targetItem : period,
                amount: parseFloat(amount),
                notes,
                bankAccount,
                status: 'submitted',
                createdAt: new Date().toISOString()
            });
            setProcessing(false);
            onClose();
        }, 1500);
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
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Buat Pengajuan Baru</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pembayaran Operasional / Opname</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto max-h-[70vh]">
                    <div className="p-8 space-y-8">
                        {/* Project Selection */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiTarget /> Pilih Proyek</label>
                                <select 
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={projectId}
                                    onChange={(e) => setProjectId(e.target.value)}
                                >
                                    <option value="">-- Pilih Proyek --</option>
                                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiLayers /> Basis Pengajuan</label>
                                <select 
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={basis}
                                    onChange={(e) => setBasis(e.target.value)}
                                >
                                    <option value="WEEKLY">Mingguan / Periode</option>
                                    <option value="CATEGORY">Kategori RAB</option>
                                    <option value="ITEM">Item Pekerjaan Spesifik</option>
                                </select>
                            </div>
                        </div>

                        {/* Basis Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {basis === 'WEEKLY' ? (
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiCalendar /> Periode / Minggu Ke</label>
                                    <input 
                                        type="text" 
                                        placeholder="Contoh: Minggu 14 (10-17 Mei)"
                                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                        value={period}
                                        onChange={(e) => setPeriod(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiLayers /> Nama Kategori / Item</label>
                                    <input 
                                        type="text" 
                                        placeholder="Contoh: Pekerjaan Atap / Pasang Bata"
                                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                        value={targetItem}
                                        onChange={(e) => setTargetItem(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Nominal Diajukan (Rp)</label>
                                <input 
                                    type="number" 
                                    placeholder="Masukkan nominal..."
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Info Section */}
                        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                            <FiInfo className="text-amber-500 shrink-0 mt-0.5" size={14} />
                            <div>
                                <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest mb-1">Rekomendasi Kelayakan</p>
                                <p className="text-[10px] font-bold text-amber-600 leading-relaxed italic">
                                    Pengajuan Anda akan divalidasi berdasarkan progress riil di lapangan dan rekomendasi Pengawas sebelum disetujui Admin.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Catatan Mandor (Rincian Singkat)</label>
                            <textarea 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                placeholder="Contoh: Upah tukang 4 orang + pembelian material minor..."
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Destination Account Preview */}
                        {bankAccount && (
                            <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-3">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Tujuan Transfer</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
                                        <FiTarget />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800">{bankAccount.bankName} - {bankAccount.accountNumber}</p>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">A.N. {bankAccount.accountHolder}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-slate-600"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit"
                            disabled={processing}
                            className={`flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {processing ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <FiCheckCircle /> Submit Pengajuan
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForemanPaymentRequestModal;
