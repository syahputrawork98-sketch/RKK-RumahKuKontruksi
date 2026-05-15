import React, { useState } from "react";
import { FiEye, FiCheckCircle, FiClock, FiXCircle, FiFilter, FiSearch, FiAlertTriangle } from "react-icons/fi";
import PaymentProofReviewModal from "./PaymentProofReviewModal";

const CustomerPaymentVerificationTab = ({ payments = [], onVerify, onReject }) => {
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showReview, setShowReview] = useState(false);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusStyle = (status) => {
        const s = status?.toLowerCase() || 'pending';
        switch (s) {
            case 'verified': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'paid': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Review Bukti Bayar Masuk</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verifikasi Pembayaran Manual Konsumen</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                            <input type="text" placeholder="Cari konsumen..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold focus:outline-none w-48" />
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all"><FiFilter size={16} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Transaksi & Ref</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Konsumen & Proyek</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Nominal Tagihan</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Nominal Transfer</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Review</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {payments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <FiClock size={48} className="text-slate-100 mb-4" />
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Belum ada bukti bayar masuk</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                payments.map((pay) => {
                                    const isMatch = Math.abs(pay.amount - (pay.billAmount || pay.amount)) < 1;
                                    return (
                                        <tr key={pay.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => { setSelectedPayment(pay); setShowReview(true); }}>
                                            <td className="px-8 py-6">
                                                <p className="text-[10px] font-black text-blue-600 mb-1 uppercase tracking-widest">{pay.code}</p>
                                                <p className="text-sm font-black text-slate-800">{pay.itemName}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{pay.uploadDate}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="text-sm font-black text-slate-800">{pay.customerName}</p>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{pay.projectName}</p>
                                            </td>
                                            <td className="px-8 py-6 text-right font-black text-slate-500 text-sm">
                                                {formatCurrency(pay.billAmount || pay.amount)}
                                            </td>
                                            <td className="px-8 py-6 text-right font-black text-slate-900 text-sm">
                                                <div className="flex flex-col items-end">
                                                    {formatCurrency(pay.amount)}
                                                    {!isMatch && (
                                                        <span className="text-[8px] font-black text-rose-500 uppercase tracking-tighter flex items-center gap-1 mt-0.5 animate-pulse">
                                                            <FiAlertTriangle /> Selisih
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${getStatusStyle(pay.status)}`}>
                                                    {pay.status === 'verified' ? <FiCheckCircle /> : pay.status === 'rejected' ? <FiXCircle /> : <FiClock />}
                                                    {pay.status === 'verified' ? 'Terverifikasi' : pay.status === 'rejected' ? 'Ditolak' : 'Review Bukti'}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all group-hover:bg-white shadow-sm border border-transparent group-hover:border-slate-100">
                                                    <FiEye size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Review Modal */}
            <PaymentProofReviewModal 
                isOpen={showReview}
                onClose={() => setShowReview(false)}
                paymentData={selectedPayment}
                onVerify={onVerify}
                onReject={onReject}
            />
        </div>
    );
};

export default CustomerPaymentVerificationTab;
