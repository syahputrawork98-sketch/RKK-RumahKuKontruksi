import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
    FiCreditCard, 
    FiCheckCircle, 
    FiClock, 
    FiInfo, 
    FiDollarSign,
    FiCheck
} from "react-icons/fi";
import customerPaymentPlanService from "../../services/customerPaymentPlanService";

const CustomerPaymentPlanView = ({ projectId }) => {
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState(null);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                setLoading(true);
                const response = await customerPaymentPlanService.getPaymentPlan(projectId);
                setPlan(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching payment plan:", error);
                setLoading(false);
            }
        };

        if (projectId) fetchPlan();
    }, [projectId]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    if (loading) {
        return (
            <div className="py-20 text-center">
                <span className="loading loading-spinner loading-lg text-teal-600"></span>
                <p className="mt-4 text-xs font-black text-neutral-50 uppercase tracking-widest">Memuat Billing Plan...</p>
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="py-20 text-center bg-white rounded-[40px] border-2 border-dashed border-neutral-30">
                <div className="w-20 h-20 bg-neutral-20 rounded-3xl flex items-center justify-center text-neutral-40 mx-auto mb-6">
                    <FiCreditCard size={40} />
                </div>
                <h3 className="text-xl font-black text-neutral-100 uppercase tracking-tight">Billing Plan Belum Tersedia</h3>
                <p className="text-sm text-neutral-50 mt-2 max-w-sm mx-auto font-bold">
                    Rencana pembayaran sedang disusun oleh Admin RKK dan akan segera tampil di sini untuk transparansi Anda.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-12 animate-fadeIn">
            {/* Header / Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-[40px] border border-neutral-30 shadow-lg relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                        <FiDollarSign size={80} />
                    </div>
                    <p className="text-[10px] font-black text-neutral-40 uppercase tracking-widest mb-1">Total Kontrak</p>
                    <h4 className="text-2xl font-black text-neutral-100">{formatCurrency(plan.project?.budgetTotal)}</h4>
                </div>
                <div className="bg-emerald-600 p-8 rounded-[40px] shadow-lg shadow-emerald-600/20 text-white relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform text-white">
                        <FiCheckCircle size={80} />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">Status Pembayaran</p>
                    <h4 className="text-2xl font-black">{plan.milestones?.filter(m => m.status === 'paid_simulated').length} / {plan.milestones?.length} Selesai</h4>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-neutral-30 shadow-lg relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                        <FiClock size={80} />
                    </div>
                    <p className="text-[10px] font-black text-neutral-40 uppercase tracking-widest mb-1">Skema Penagihan</p>
                    <h4 className="text-lg font-black text-neutral-100 uppercase tracking-tighter">
                        {plan.type === 'PROGRESS_BASED' ? 'Milestone Progres' : 'Kategori Pekerjaan'}
                    </h4>
                </div>
            </div>

            {/* Milestones List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-neutral-100 flex items-center gap-3">
                        <FiCreditCard className="text-teal-600" /> Rincian Termin Penagihan
                    </h3>
                    <div className="px-4 py-1 bg-neutral-10 border border-neutral-30 rounded-full text-[9px] font-black text-neutral-50 uppercase tracking-widest">
                        Local Billing Plan
                    </div>
                </div>

                <div className="space-y-4">
                    {plan.milestones?.map((m, index) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={m.id} 
                            className={`p-6 rounded-[32px] border transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 ${
                                m.status === 'paid_simulated' 
                                ? "bg-emerald-50 border-emerald-100 shadow-sm shadow-emerald-500/5" 
                                : "bg-white border-neutral-30 shadow-md hover:border-teal-500/30"
                            }`}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border ${
                                    m.status === 'paid_simulated' 
                                    ? "bg-white text-emerald-500 border-emerald-100 shadow-sm" 
                                    : "bg-neutral-10 text-neutral-40 border-neutral-20"
                                }`}>
                                    {m.status === 'paid_simulated' ? <FiCheck /> : m.dueOrder}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h4 className="text-lg font-black text-neutral-100">{m.label}</h4>
                                        {m.status === 'paid_simulated' && (
                                            <span className="px-3 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase rounded-full shadow-lg shadow-emerald-500/20 tracking-widest">Lunas</span>
                                        )}
                                        {m.status === 'due' && (
                                            <span className="px-3 py-0.5 bg-amber-500 text-white text-[8px] font-black uppercase rounded-full shadow-lg shadow-amber-500/20 tracking-widest">Jatuh Tempo</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 mt-1 text-xs font-bold text-neutral-50">
                                        {m.percentage > 0 && <span>{m.percentage}% dari Proyek</span>}
                                        {m.category && (
                                            <span className="flex items-center gap-1">
                                                <span className="w-1 h-1 bg-neutral-30 rounded-full"></span>
                                                Kategori: {m.category.name}
                                            </span>
                                        )}
                                        {m.paidAt && (
                                            <span className="flex items-center gap-1 text-emerald-600">
                                                <span className="w-1 h-1 bg-emerald-300 rounded-full"></span>
                                                Selesai Administrasi: {new Date(m.paidAt).toLocaleDateString('id-ID')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-black text-neutral-100">{formatCurrency(m.amount)}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Disclaimer */}
            <div className="p-8 bg-neutral-10 border border-neutral-30 rounded-[40px] flex gap-6 items-start">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-teal-600 shadow-sm border border-neutral-20 shrink-0">
                    <FiInfo size={24} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-neutral-100 uppercase tracking-widest mb-2">PENTING: Transparansi Pembayaran Lokal</h4>
                    <p className="text-xs text-neutral-50 leading-relaxed font-bold uppercase italic tracking-tighter">
                        Seluruh data penagihan di atas bersifat <span className="text-teal-600">Simulasi Administrasi Lokal</span> untuk tujuan transparansi workflow selama fase pengembangan. RKK tidak menyediakan payment gateway atau invoice legal secara otomatis melalui sistem ini. Silakan hubungi Admin RKK untuk konfirmasi pembayaran resmi di luar sistem.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerPaymentPlanView;
