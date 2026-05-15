import React from "react";
import { FiCheckCircle, FiClock, FiXCircle, FiCreditCard, FiInfo, FiEye } from "react-icons/fi";

const CustomerPaymentHistoryTab = ({ payments = [] }) => {
    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'verified': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'paid_uploaded': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaksi</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Metode & Bukti</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Nominal</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Catatan Admin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <FiCreditCard size={48} className="text-slate-100 mb-4" />
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Belum ada riwayat pembayaran</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                payments.map((pay) => (
                                    <tr key={pay.id} className="hover:bg-slate-50/50 transition-all group">
                                        <td className="px-8 py-6">
                                            <p className="text-[10px] font-black text-blue-600 mb-1 uppercase tracking-widest">{pay.code}</p>
                                            <p className="text-sm font-black text-slate-800">{pay.itemName}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{pay.uploadDate}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                                                    <FiCreditCard size={14} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-800">{pay.originBank}</p>
                                                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline mt-0.5 flex items-center gap-1">
                                                        <FiEye /> {pay.fileName}
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-base font-black text-slate-900 tracking-tight">
                                            {formatCurrency(pay.amount)}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${getStatusStyle(pay.status)}`}>
                                                {pay.status === 'verified' ? <FiCheckCircle /> : pay.status === 'rejected' ? <FiXCircle /> : <FiClock />}
                                                {pay.status === 'verified' ? 'Verified / Lunas' : pay.status === 'rejected' ? 'Rejected' : 'Menunggu Verifikasi'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            {pay.adminNote ? (
                                                <p className="text-[10px] font-bold text-slate-500 leading-relaxed italic max-w-[200px] ml-auto">
                                                    "{pay.adminNote}"
                                                </p>
                                            ) : (
                                                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Tidak ada catatan</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
                    <FiInfo />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                    Riwayat di atas hanya menampilkan pembayaran yang telah di-upload ke sistem administrasi RKK.
                </p>
            </div>
        </div>
    );
};

export default CustomerPaymentHistoryTab;
