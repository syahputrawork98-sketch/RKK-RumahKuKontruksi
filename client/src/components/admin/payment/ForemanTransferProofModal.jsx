import React, { useState } from "react";
import { FiX, FiCheckCircle, FiUpload, FiCamera, FiCreditCard, FiUser, FiCalendar, FiTarget } from "react-icons/fi";

const ForemanTransferProofModal = ({ isOpen, onClose, requestData, onSubmit }) => {
    if (!isOpen || !requestData) return null;

    const [transferDate, setTransferDate] = useState(new Date().toISOString().split('T')[0]);
    const [bankOrigin, setBankOrigin] = useState("Bank RKK - Mandiri");
    const [refNumber, setRefNumber] = useState("");
    const [amount, setAmount] = useState(requestData.approvedAmount || requestData.amount || "");
    const [selectedFile, setSelectedFile] = useState(null);
    const [processing, setProcessing] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedFile || !amount || !refNumber) {
            alert("Harap lengkapi No. Referensi, Nominal, dan Bukti Transfer.");
            return;
        }

        setProcessing(true);
        setTimeout(() => {
            onSubmit(requestData.id, {
                transferDate,
                bankOrigin,
                refNumber,
                amount: parseFloat(amount),
                fileName: selectedFile.name,
                status: 'paid'
            });
            setProcessing(false);
            onClose();
        }, 1500);
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col animate-slideUp">
                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <FiCamera size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Upload Bukti Transfer Mandor</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Ref Pengajuan: {requestData.code}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto max-h-[70vh]">
                    <div className="p-8 space-y-8">
                        {/* Summary */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Target Pembayaran</p>
                                <p className="text-sm font-black text-slate-800">{requestData.foremanName}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mt-1">{requestData.bankAccount?.bankName} - {requestData.bankAccount?.accountNumber}</p>
                            </div>
                            <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100">
                                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Nominal Disetujui</p>
                                <p className="text-lg font-black text-blue-900">{formatCurrency(requestData.approvedAmount || requestData.amount)}</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiCalendar /> Tanggal Transfer</label>
                                <input 
                                    type="date" 
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                    value={transferDate}
                                    onChange={(e) => setTransferDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiCreditCard /> Rekening Pengirim</label>
                                <input 
                                    type="text" 
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none"
                                    value={bankOrigin}
                                    onChange={(e) => setBankOrigin(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiTarget /> No. Referensi Transfer</label>
                                <input 
                                    type="text" 
                                    placeholder="Contoh: REF-12345678"
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={refNumber}
                                    onChange={(e) => setRefNumber(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Nominal Transfer (Rp)</label>
                                <input 
                                    type="number" 
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* File Upload Area */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Screenshot Bukti Transfer</label>
                            <div className={`relative h-40 border-2 border-dashed rounded-[2rem] transition-all flex flex-col items-center justify-center gap-3 ${selectedFile ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200 hover:border-blue-400 hover:bg-blue-50/30'}`}>
                                <input 
                                    type="file" 
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    onChange={handleFileChange}
                                    accept="image/*,application/pdf"
                                />
                                {selectedFile ? (
                                    <>
                                        <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                            <FiCheckCircle size={24} />
                                        </div>
                                        <p className="text-xs font-black text-emerald-700">{selectedFile.name}</p>
                                        <p className="text-[9px] font-bold text-emerald-500 uppercase">Klik untuk ganti file</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center">
                                            <FiUpload size={24} />
                                        </div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pilih Screenshot Bukti Transfer</p>
                                        <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter">Format: JPG, PNG, atau PDF (Max 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>
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
                            className={`flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {processing ? (
                                <>
                                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    <FiCheckCircle /> Konfirmasi Pembayaran
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForemanTransferProofModal;
