import React, { useState } from "react";
import { FiX, FiCheckCircle, FiXCircle, FiInfo, FiFileText, FiUser, FiCreditCard, FiTarget, FiAlertTriangle, FiEdit3 } from "react-icons/fi";

const ForemanPaymentRequestReviewModal = ({ isOpen, onClose, requestData, onDecision }) => {
    const [adminNote, setAdminNote] = useState("");
    const [approvedAmount, setApprovedAmount] = useState("");
    const [processing, setProcessing] = useState(false);

    if (!isOpen || !requestData) return null;

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const handleAction = (status) => {
        if ((status === 'rejected' || status === 'correction_required') && !adminNote) {
            alert("Harap berikan catatan alasan.");
            return;
        }

        if (status === 'partial_approved' && (!approvedAmount || approvedAmount <= 0 || approvedAmount >= requestData.amount)) {
            alert("Harap masukkan nominal partial yang valid (kurang dari nominal diajukan).");
            return;
        }

        setProcessing(true);
        setTimeout(() => {
            onDecision(requestData.id, {
                status,
                adminNote,
                approvedAmount: status === 'partial_approved' ? parseFloat(approvedAmount) : (status === 'approved' ? requestData.amount : 0)
            });
            setProcessing(false);
            onClose();
        }, 1500);
    };

    const isSupervisorEligible = requestData.supervisorRecommendation === 'ELIGIBLE';

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
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Review Pengajuan Mandor</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ref: {requestData.code}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                        <FiX size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto max-h-[70vh]">
                    <div className="p-8 space-y-8">
                        {/* Mandor & Project Info */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiUser /> Mandor</p>
                                <p className="text-sm font-black text-slate-800">{requestData.foremanName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiTarget /> Proyek</p>
                                <p className="text-sm font-black text-slate-800">{requestData.projectName}</p>
                            </div>
                        </div>

                        {/* Request Details */}
                        <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 grid grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Basis / Target</p>
                                <p className="text-xs font-black text-slate-700 uppercase tracking-tight">{requestData.basis}: {requestData.targetItem}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nominal Diajukan</p>
                                <p className="text-lg font-black text-blue-600">{formatCurrency(requestData.amount)}</p>
                            </div>
                        </div>

                        {/* Supervisor Recommendation */}
                        <div className={`p-6 rounded-[2rem] border flex items-start gap-4 ${isSupervisorEligible ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                            <div className={`p-3 rounded-xl ${isSupervisorEligible ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                                <FiCheckCircle size={20} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Rekomendasi Kelayakan Pengawas</p>
                                <p className={`text-sm font-black ${isSupervisorEligible ? 'text-emerald-700' : 'text-amber-700'}`}>
                                    {requestData.supervisorRecommendation === 'ELIGIBLE' ? 'LAYAK DIBAYAR' : 'PARTIAL / PERLU TINJAUAN'}
                                </p>
                                <p className="text-[10px] font-bold text-slate-500 italic mt-1 leading-relaxed">
                                    "{requestData.supervisorNote || 'Progress fisik sesuai dengan nominal yang diajukan.'}"
                                </p>
                            </div>
                        </div>

                        {/* Destination Account */}
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Rekening Tujuan Mandor</p>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <FiCreditCard className="text-slate-400" />
                                    <div>
                                        <p className="text-xs font-black text-slate-800">{requestData.bankAccount?.bankName} - {requestData.bankAccount?.accountNumber}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">A.N. {requestData.bankAccount?.accountHolder}</p>
                                    </div>
                                </div>
                                <span className="text-[8px] font-black bg-white border border-slate-200 px-2 py-1 rounded-full text-slate-400 uppercase tracking-widest">Mandor Verified</span>
                            </div>
                        </div>

                        {/* Decision Inputs */}
                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Catatan Internal Admin / Alasan</label>
                                <textarea 
                                    className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                    placeholder="Berikan feedback untuk Mandor..."
                                    rows="3"
                                    value={adminNote}
                                    onChange={(e) => setAdminNote(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nominal Disetujui (Wajib jika Partial)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-black text-slate-400">Rp</span>
                                    <input 
                                        type="number" 
                                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                        placeholder="Kosongkan jika Approve Full"
                                        value={approvedAmount}
                                        onChange={(e) => setApprovedAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-8 bg-slate-50 border-t border-slate-100 space-y-4">
                        <div className="flex gap-4">
                            <button 
                                disabled={processing}
                                onClick={() => handleAction('rejected')}
                                className="flex-1 py-4 bg-white border border-rose-200 text-rose-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all flex items-center justify-center gap-2"
                            >
                                <FiXCircle /> Tolak
                            </button>
                            <button 
                                disabled={processing}
                                onClick={() => handleAction('correction_required')}
                                className="flex-1 py-4 bg-white border border-amber-200 text-amber-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-50 transition-all flex items-center justify-center gap-2"
                            >
                                <FiEdit3 /> Perlu Revisi
                            </button>
                        </div>
                        <div className="flex gap-4">
                            <button 
                                disabled={processing}
                                onClick={() => handleAction('partial_approved')}
                                className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                Partial Approve
                            </button>
                            <button 
                                disabled={processing}
                                onClick={() => handleAction('approved')}
                                className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <><FiCheckCircle /> Approve Full</>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForemanPaymentRequestReviewModal;
