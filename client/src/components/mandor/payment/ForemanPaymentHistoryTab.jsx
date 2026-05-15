import React from "react";
import { FiCheckCircle, FiClock, FiCreditCard, FiDownload, FiInfo, FiEye, FiActivity } from "react-icons/fi";

const ForemanPaymentHistoryTab = ({ payments = [] }) => {
    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaksi</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Proyek & Kategori</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Nominal</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Bukti Transfer</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4 border-2 border-dashed border-slate-100">
                                                <FiCreditCard size={40} />
                                            </div>
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Belum ada riwayat pembayaran diterima.</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                payments.map((pay) => {
                                    const isPaid = pay.status === 'verified' || pay.status === 'released' || pay.status === 'paid' || pay.status === 'paid_simulated';
                                    return (
                                        <tr key={pay.id} className="hover:bg-slate-50/50 transition-all group">
                                            <td className="px-8 py-6">
                                                <p className="text-[10px] font-black text-blue-600 mb-1 uppercase tracking-widest">{pay.paymentCode || pay.documentCode || (pay.id ? pay.id.substring(0,8).toUpperCase() : 'PAY-REF')}</p>
                                                <p className="text-sm font-black text-slate-800">{pay.paymentDate ? new Date(pay.paymentDate).toLocaleDateString('id-ID') : (pay.createdAt ? new Date(pay.createdAt).toLocaleDateString('id-ID') : '-')}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-slate-800">{pay.title || pay.itemName || 'Pembayaran Operasional'}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5 tracking-tighter">{pay.project?.name || pay.projectName || 'Project RKK'}</p>
                                            </td>
                                            <td className="px-8 py-6 text-base font-black text-slate-900 tracking-tight text-right">
                                                {formatCurrency(pay.amount)}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${isPaid ? 'bg-slate-900 text-white border-transparent' : 'bg-amber-100 text-amber-700 border-amber-200'}`}>
                                                    <FiCheckCircle size={12} /> {isPaid ? 'Sudah Dibayar' : 'Proses'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                {isPaid ? (
                                                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2 ml-auto">
                                                        <FiEye /> Lihat Bukti
                                                    </button>
                                                ) : (
                                                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Sedang Diproses</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-500 shadow-sm border border-slate-100">
                    <FiActivity />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] max-w-sm leading-relaxed">
                    Hubungi Admin jika terdapat ketidaksesuaian nominal pada bukti transfer yang Anda terima melalui dashboard ini.
                </p>
            </div>
        </div>
    );
};

export default ForemanPaymentHistoryTab;
