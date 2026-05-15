import React from "react";
import { FiClock, FiFileText, FiUpload, FiDownload, FiInfo, FiAlertTriangle, FiCheckCircle, FiXCircle } from "react-icons/fi";

const CustomerActiveBillsTab = ({ bills = [], onUploadClick }) => {
    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusConfig = (status) => {
        const s = status?.toLowerCase();
        switch (s) {
            case 'sent':
            case 'due':
                return { label: 'Menunggu Pembayaran', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <FiClock /> };
            case 'paid':
                return { label: 'Menunggu Verifikasi', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <FiInfo /> };
            case 'verified':
            case 'paid_simulated':
                return { label: 'Terverifikasi / Lunas', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <FiCheckCircle /> };
            case 'rejected':
                return { label: 'Ditolak / Perlu Perbaikan', color: 'bg-rose-100 text-rose-700 border-rose-200', icon: <FiXCircle /> };
            default:
                return { label: status || 'Unknown', color: 'bg-slate-100 text-slate-700 border-slate-200', icon: <FiInfo /> };
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Payment Instructions */}
            <div className="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                            <FiInfo size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black uppercase tracking-tight">Instruksi Pembayaran Resmi</h3>
                            <p className="text-xs font-bold text-blue-100 uppercase tracking-widest">Hanya transfer ke rekening perusahaan RKK</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Rekening Bank Mandiri</p>
                            <p className="text-xl font-black tracking-tight">123-00-9876543-21</p>
                            <p className="text-[10px] font-bold text-blue-200 mt-1 uppercase">A.N. PT. Rumah Ku Konstruksi</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                            <p className="text-[10px] font-black text-blue-100 uppercase tracking-widest mb-2">Rekening Bank BCA</p>
                            <p className="text-xl font-black tracking-tight">888-7766-5544</p>
                            <p className="text-[10px] font-bold text-blue-200 mt-1 uppercase">A.N. PT. Rumah Ku Konstruksi</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-amber-400 text-amber-950 rounded-2xl border border-amber-300/30">
                        <FiAlertTriangle className="shrink-0 mt-0.5" />
                        <p className="text-[10px] font-bold leading-relaxed">
                            HATI-HATI PENIPUAN. RKK tidak pernah meminta pembayaran ke rekening pribadi atau pihak ketiga. Selalu verifikasi bukti transfer Anda di dashboard ini.
                        </p>
                    </div>
                </div>
                {/* Decorative Circle */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            {/* Bill List */}
            <div className="space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Daftar Tagihan Aktif</h4>
                
                {bills.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center bg-white border border-slate-100 rounded-[2.5rem]">
                        <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6 border-2 border-dashed border-slate-100">
                            <FiCheckCircle size={64} />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Tidak Ada Tagihan Aktif</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Semua tagihan Anda saat ini sudah terbayar atau belum jatuh tempo.</p>
                    </div>
                ) : (
                    bills.map(bill => {
                        const config = getStatusConfig(bill.status);
                        const canUpload = bill.status === 'sent' || bill.status === 'waiting_payment' || bill.status === 'rejected';
                        
                        return (
                            <div key={bill.id} className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:border-blue-500/30 transition-all group">
                                <div className="flex flex-col md:flex-row justify-between gap-8">
                                    <div className="flex-1 space-y-6">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border group-hover:scale-110 transition-transform ${bill.status === 'verified' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' : 'bg-blue-50 text-blue-500 border-blue-100'}`}>
                                                <FiFileText />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">{bill.itemName || 'Item Tagihan'}</h3>
                                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border flex items-center gap-1.5 ${config.color}`}>
                                                        {config.icon} {config.label}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                                    {bill.projectName || 'Proyek RKK'} • Invoice: <span className="text-blue-600">{bill.code || 'INV-REF'}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Tagihan</p>
                                                <p className="text-2xl font-black text-slate-900 tracking-tighter">{formatCurrency(bill.amount)}</p>
                                            </div>
                                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Jatuh Tempo</p>
                                                <p className="text-sm font-black text-slate-700 uppercase">{bill.dueDate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:w-64 flex flex-col gap-3 justify-center">
                                        <button 
                                            disabled={!canUpload}
                                            onClick={() => onUploadClick(bill)}
                                            className={`w-full py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 ${canUpload ? 'bg-blue-600 text-white shadow-blue-500/20 hover:scale-[1.02]' : 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed'}`}
                                        >
                                            <FiUpload /> {bill.status === 'rejected' ? 'Upload Ulang Bukti' : 'Upload Bukti Bayar'}
                                        </button>
                                        <button className="w-full py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                            <FiDownload /> Lihat Invoice
                                        </button>
                                        {!canUpload && (
                                            <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-tighter mt-2">
                                                {bill.status === 'verified' || bill.status === 'paid_simulated' ? 'Tagihan sudah lunas' : 'Menunggu verifikasi admin'}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default CustomerActiveBillsTab;
