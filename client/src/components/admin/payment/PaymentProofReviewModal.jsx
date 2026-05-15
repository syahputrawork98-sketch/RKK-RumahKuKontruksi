import React, { useState } from "react";
import { FiX, FiCheckCircle, FiXCircle, FiInfo, FiFileText, FiUser, FiCreditCard, FiCalendar, FiAlertTriangle } from "react-icons/fi";

const PaymentProofReviewModal = ({ isOpen, onClose, paymentData, onVerify, onReject }) => {
    const [adminNote, setAdminNote] = useState("");
    const [processing, setProcessing] = useState(false);

    if (!isOpen || !paymentData) return null;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const isNominalMatch = Math.abs(paymentData.amount - (paymentData.billAmount || paymentData.amount)) < 1;

    const handleVerify = () => {
        setProcessing(true);
        setTimeout(() => {
            onVerify(paymentData.id, adminNote);
            setProcessing(false);
            onClose();
        }, 1500);
    };

    const handleReject = () => {
        if (!adminNote) {
            alert("Harap berikan catatan alasan penolakan.");
            return;
        }
        setProcessing(true);
        setTimeout(() => {
            onReject(paymentData.id, adminNote);
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
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Review Bukti Bayar</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ref: {paymentData.code}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                        <FiX size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[70vh]">
                    <div className="p-8 space-y-8">
                        {/* Comparison Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nominal Tagihan</p>
                                <p className="text-lg font-black text-slate-900">{formatCurrency(paymentData.billAmount || paymentData.amount)}</p>
                            </div>
                            <div className={`p-6 rounded-3xl border ${isNominalMatch ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                                <p className={`text-[9px] font-black uppercase tracking-widest mb-1 ${isNominalMatch ? 'text-emerald-500' : 'text-rose-500'}`}>Nominal Transfer</p>
                                <p className={`text-lg font-black ${isNominalMatch ? 'text-emerald-900' : 'text-rose-900'}`}>{formatCurrency(paymentData.amount)}</p>
                            </div>
                        </div>

                        {!isNominalMatch && (
                            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-3">
                                <FiAlertTriangle className="text-amber-500 shrink-0 mt-0.5" />
                                <p className="text-[10px] font-bold text-amber-700 leading-relaxed uppercase italic">
                                    Peringatan: Nominal transfer berbeda dari nominal tagihan. Verifikasi manual diperlukan.
                                </p>
                            </div>
                        )}

                        {/* Transfer Details */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiUser /> Pengirim</p>
                                    <p className="text-sm font-black text-slate-800">{paymentData.senderName}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiCreditCard /> Bank Asal</p>
                                    <p className="text-sm font-black text-slate-800">{paymentData.originBank}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiCalendar /> Tanggal Transfer</p>
                                    <p className="text-sm font-black text-slate-800">{paymentData.transferDate}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiInfo /> Catatan Konsumen</p>
                                    <p className="text-[11px] font-bold text-slate-600 leading-relaxed">{paymentData.notes || "-"}</p>
                                </div>
                            </div>

                            {/* Proof Image Placeholder */}
                            <div className="space-y-2 pt-4">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Bukti Transfer (Preview)</p>
                                <div className="aspect-video bg-slate-900 rounded-[2rem] flex items-center justify-center border border-slate-800 overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                                    <div className="relative z-10 flex flex-col items-center">
                                        <FiFileText size={48} className="text-slate-600 mb-2" />
                                        <p className="text-xs font-black text-white uppercase tracking-widest">{paymentData.fileName}</p>
                                    </div>
                                    <button className="absolute bottom-6 right-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white/20 transition-all">Lihat Fullscreen</button>
                                </div>
                            </div>
                        </div>

                        {/* Admin Action Field */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Catatan Verifikasi Admin</label>
                            <textarea 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                placeholder="Tambahkan catatan untuk konsumen (Wajib jika ditolak)..."
                                rows="3"
                                value={adminNote}
                                onChange={(e) => setAdminNote(e.target.value)}
                            ></textarea>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-4">
                        <button 
                            disabled={processing}
                            onClick={handleReject}
                            className={`flex-1 py-4 bg-white border border-rose-200 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <FiXCircle /> Tolak Pembayaran
                        </button>
                        <button 
                            disabled={processing}
                            onClick={handleVerify}
                            className={`flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {processing ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <FiCheckCircle /> Verifikasi & Lunas
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentProofReviewModal;
