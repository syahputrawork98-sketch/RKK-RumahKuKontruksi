import React, { useState } from "react";
import { FiEye, FiCheckCircle, FiClock, FiXCircle, FiFilter, FiSearch, FiAlertCircle, FiEdit3, FiFileText } from "react-icons/fi";
import ForemanPaymentRequestReviewModal from "./ForemanPaymentRequestReviewModal";

const ForemanPaymentRequestAdminTab = ({ requests = [], onDecision }) => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showReview, setShowReview] = useState(false);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'submitted': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'partial_approved': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'rejected': return 'bg-rose-100 text-rose-700 border-rose-200';
            case 'correction_required': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'paid': return 'bg-slate-900 text-white border-transparent';
            default: return 'bg-slate-100 text-slate-500 border-slate-200';
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                    <div>
                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Daftar Pengajuan Mandor</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Review Kelayakan & Kelola Approval</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                            <input type="text" placeholder="Cari Mandor..." className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold focus:outline-none w-48" />
                        </div>
                        <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition-all"><FiFilter size={16} /></button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-50">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Mandor & Proyek</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Kategori / Item</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Nominal Diajukan</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rekomendasi</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <FiClock size={48} className="text-slate-100 mb-4" />
                                            <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">Belum ada pengajuan mandor masuk</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => { setSelectedRequest(req); setShowReview(true); }}>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-slate-800">{req.foremanName}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">{req.projectName} • {req.code}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black text-slate-600 uppercase tracking-tight">
                                                {req.basis}: {req.targetItem}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right font-black text-slate-900 text-sm">
                                            {formatCurrency(req.amount)}
                                        </td>
                                        <td className="px-8 py-6">
                                            {req.supervisorRecommendation?.toLowerCase() === 'eligible' ? (
                                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1.5">
                                                    <FiCheckCircle /> Layak Dibayar
                                                </span>
                                            ) : req.supervisorRecommendation?.toLowerCase() === 'partial' ? (
                                                <span className="text-[9px] font-black text-amber-600 uppercase tracking-widest flex items-center gap-1.5">
                                                    <FiAlertCircle /> Partial / Tinjau
                                                </span>
                                            ) : (
                                                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Menunggu Review</span>
                                            )}
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${getStatusStyle(req.status)}`}>
                                                {req.status?.toLowerCase() === 'eligible' || req.status?.toLowerCase() === 'paid_simulated' ? <FiCheckCircle /> : req.status?.toLowerCase() === 'hold' ? <FiXCircle /> : req.status?.toLowerCase() === 'correction_required' ? <FiEdit3 /> : <FiClock />}
                                                {getStatusLabel(req.status)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <button className="p-2 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all group-hover:bg-white shadow-sm border border-transparent group-hover:border-slate-100">
                                                <FiEye size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Review Modal */}
            <ForemanPaymentRequestReviewModal 
                isOpen={showReview}
                onClose={() => setShowReview(false)}
                requestData={selectedRequest}
                onDecision={onDecision}
            />
        </div>
    );
};

export default ForemanPaymentRequestAdminTab;
