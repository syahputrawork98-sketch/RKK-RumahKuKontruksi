import React, { useState } from "react";
import { FiX, FiUpload, FiCheckCircle, FiInfo, FiCamera, FiUser, FiCreditCard, FiCalendar } from "react-icons/fi";

const PaymentProofUploadModal = ({ isOpen, onClose, billData, onSubmit }) => {
    if (!isOpen || !billData) return null;

    const [senderName, setSenderName] = useState("");
    const [originBank, setOriginBank] = useState("");
    const [transferDate, setTransferDate] = useState(new Date().toISOString().split('T')[0]);
    const [amount, setAmount] = useState(billData.amount || "");
    const [notes, setNotes] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!senderName || !originBank || !selectedFile || !amount) {
            alert("Harap lengkapi Nama Pengirim, Bank Asal, Nominal, dan Bukti Transfer.");
            return;
        }

        setUploading(true);
        // Simulate upload delay
        setTimeout(() => {
            const submission = {
                ...billData,
                senderName,
                originBank,
                transferDate,
                amount: parseFloat(amount),
                notes,
                fileName: selectedFile.name,
                uploadDate: new Date().toISOString().split('T')[0],
                status: 'paid_uploaded'
            };
            onSubmit(submission);
            setUploading(false);
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
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Upload Bukti Transfer</h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Invoice: {billData.code}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto max-h-[70vh]">
                    <div className="p-8 space-y-8">
                        {/* Bill Info Summary */}
                        <div className="p-6 bg-blue-50 rounded-[2rem] border border-blue-100 flex justify-between items-center">
                            <div>
                                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Tagihan Untuk</p>
                                <p className="text-sm font-black text-blue-900">{billData.itemName}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">Nominal Tagihan</p>
                                <p className="text-lg font-black text-blue-900">{formatCurrency(billData.amount)}</p>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiUser /> Nama Pengirim</label>
                                <input 
                                    type="text" 
                                    placeholder="Nama di rekening Anda..."
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={senderName}
                                    onChange={(e) => setSenderName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2"><FiCreditCard /> Bank Asal</label>
                                <input 
                                    type="text" 
                                    placeholder="Contoh: BCA, Mandiri, BRI..."
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={originBank}
                                    onChange={(e) => setOriginBank(e.target.value)}
                                />
                            </div>
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
                                <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">Nominal Transfer (Rp)</label>
                                <input 
                                    type="number" 
                                    placeholder="Nominal yang Anda transfer..."
                                    className="w-full p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* File Upload Area */}
                        <div className="space-y-2">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Bukti Transfer (Image/PDF)</label>
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
                                        <p className="text-[9px] font-bold text-emerald-500 uppercase">Klik atau drop untuk ganti file</p>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-12 h-12 bg-slate-200 text-slate-400 rounded-2xl flex items-center justify-center">
                                            <FiUpload size={24} />
                                        </div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Pilih File Bukti Transfer</p>
                                        <p className="text-[9px] font-bold text-slate-300 uppercase">JPG, PNG, atau PDF (Max 5MB)</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Catatan Tambahan (Opsional)</label>
                            <textarea 
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                                placeholder="Contoh: Transfer untuk Termin II Proyek Villa Canggu..."
                                rows="3"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            ></textarea>
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
                            disabled={uploading}
                            className={`flex-1 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 ${uploading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {uploading ? (
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

export default PaymentProofUploadModal;
