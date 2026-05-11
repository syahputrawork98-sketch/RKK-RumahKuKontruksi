import React, { useState, useEffect } from "react";
import { 
    FiCreditCard, 
    FiPlus, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiInfo, 
    FiSettings, 
    FiArrowRight,
    FiFileText,
    FiClock,
    FiCheck,
    FiActivity
} from "react-icons/fi";
import customerPaymentPlanService from "../../../services/customerPaymentPlanService";
import RoleDataState from "../../common/RoleDataState";

const ProjectPaymentPlanTab = ({ projectId, actorRole, budgetTotal }) => {
    const [loading, setLoading] = useState(true);
    const [plan, setPlan] = useState(null);
    const [initData, setInitData] = useState(null);
    const [isSettingUp, setIsSettingUp] = useState(false);
    const [selectedType, setSelectedType] = useState("PROGRESS_BASED");
    const [customMilestones, setCustomMilestones] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchPlan();
    }, [projectId]);

    const fetchPlan = async () => {
        try {
            setLoading(true);
            const response = await customerPaymentPlanService.getPaymentPlan(projectId);
            setPlan(response.data);
            
            if (!response.data) {
                const initRes = await customerPaymentPlanService.getInitializationData(projectId);
                setInitData(initRes.data);
                setCustomMilestones(initRes.data.defaults.PROGRESS_BASED);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching payment plan:", error);
            setLoading(false);
        }
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
        setCustomMilestones(initData.defaults[type]);
    };

    const handleSetup = async () => {
        try {
            setSubmitting(true);
            const payload = {
                projectId,
                type: selectedType,
                milestones: customMilestones.map(m => ({
                    label: m.label,
                    percentage: m.percentage,
                    amount: m.amount,
                    categoryId: m.categoryId,
                    dueOrder: m.dueOrder
                })),
                actorRole
            };
            await customerPaymentPlanService.setupPaymentPlan(payload);
            await fetchPlan();
            setIsSettingUp(false);
        } catch (error) {
            alert("Gagal setup payment plan: " + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateStatus = async (milestoneId, status) => {
        if (!window.confirm(`Update status milestone ini menjadi ${status}? (Simulasi Lokal)`)) return;
        try {
            await customerPaymentPlanService.updateMilestoneStatus(milestoneId, { status, actorRole });
            await fetchPlan();
        } catch (error) {
            alert("Gagal update status: " + (error.response?.data?.message || error.message));
        }
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    if (loading) return <div className="py-10 text-center"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat Billing Plan...</p></div>;

    if (!plan && !isSettingUp) {
        return (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fadeIn">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                    <FiCreditCard size={40} />
                </div>
                <div className="max-w-md">
                    <h3 className="text-xl font-black text-slate-800">Local Billing Plan</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Belum Ada Skema Pembayaran</p>
                    <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                        Atur skema pembayaran untuk proyek ini agar Konsumen mendapatkan transparansi mengenai termin penagihan.
                    </p>
                </div>
                <button 
                    onClick={() => setIsSettingUp(true)}
                    className="px-8 py-3 bg-[var(--dashboard-primary)] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
                >
                    Setup Payment Plan
                </button>
            </div>
        );
    }

    if (isSettingUp) {
        return (
            <div className="space-y-8 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Konfigurasi Penagihan Lokal</h3>
                    <button onClick={() => setIsSettingUp(false)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-all">Batal</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">Pilih Mode Pembayaran</label>
                            <div className="grid grid-cols-1 gap-3">
                                <button 
                                    onClick={() => handleTypeChange("PROGRESS_BASED")}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedType === "PROGRESS_BASED" ? "border-[var(--dashboard-primary)] bg-blue-50" : "border-slate-100 hover:border-slate-200"}`}
                                >
                                    <h4 className="text-sm font-black flex items-center gap-2">
                                        <FiActivity className={selectedType === "PROGRESS_BASED" ? "text-[var(--dashboard-primary)]" : "text-slate-400"} />
                                        Berdasarkan Progres (%)
                                    </h4>
                                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Pembayaran dibagi menjadi termin persentase (Contoh: 30% + 30% + 30% + 10%)</p>
                                </button>
                                <button 
                                    onClick={() => handleTypeChange("CATEGORY_BASED")}
                                    className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedType === "CATEGORY_BASED" ? "border-[var(--dashboard-primary)] bg-blue-50" : "border-slate-100 hover:border-slate-200"}`}
                                >
                                    <h4 className="text-sm font-black flex items-center gap-2">
                                        <FiFileText className={selectedType === "CATEGORY_BASED" ? "text-[var(--dashboard-primary)]" : "text-slate-400"} />
                                        Berdasarkan Kategori RAB
                                    </h4>
                                    <p className="text-[10px] text-slate-500 mt-1 font-medium">Pembayaran ditagihkan saat kategori pekerjaan tertentu selesai diverifikasi.</p>
                                </button>
                            </div>
                        </div>

                        <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                            <h5 className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-2 mb-2">
                                <FiAlertCircle /> Disclaimer Local Billing
                            </h5>
                            <p className="text-[10px] text-amber-600 leading-relaxed font-bold italic">
                                "Sistem ini hanya simulasi administratif lokal. RKK tidak menggunakan payment gateway atau invoice legal dalam fase pengembangan ini."
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Preview Milestone</h4>
                        <div className="space-y-3">
                            {customMilestones.map((m, idx) => (
                                <div key={idx} className="p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400 border border-slate-100">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black">{m.label}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase">
                                                {m.percentage ? `${m.percentage}% dari total` : "Berdasarkan RAB Subtotal"}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs font-black text-[var(--dashboard-primary)]">{formatCurrency(m.amount)}</p>
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={handleSetup}
                            disabled={submitting}
                            className="w-full py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                        >
                            {submitting ? "Menyimpan..." : "Simpan Skema Pembayaran"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50 p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[var(--dashboard-primary)] shadow-sm border border-slate-100">
                        <FiSettings size={28} />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-slate-800">Skema {plan.type === "PROGRESS_BASED" ? "Per Progres" : "Per Kategori"}</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status Billing: {plan.status}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsSettingUp(true)}
                        className="px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"
                    >
                        Ubah Skema
                    </button>
                    <div className="px-5 py-2.5 bg-[var(--dashboard-primary)]/10 text-[var(--dashboard-primary)] rounded-xl text-[10px] font-black uppercase tracking-widest border border-[var(--dashboard-primary)]/20">
                        Local Billing Plan
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 ml-2">Milestone Pembayaran</h4>
                <div className="grid grid-cols-1 gap-4">
                    {plan.milestones?.map((m) => (
                        <div key={m.id} className="group relative overflow-hidden bg-white border border-slate-100 rounded-3xl p-6 transition-all hover:border-[var(--dashboard-primary)]/30 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-5">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black shadow-sm border ${
                                    m.status === 'paid_simulated' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' :
                                    m.status === 'due' ? 'bg-amber-50 text-amber-500 border-amber-100' :
                                    'bg-slate-50 text-slate-400 border-slate-100'
                                }`}>
                                    {m.status === 'paid_simulated' ? <FiCheck /> : m.dueOrder}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="text-base font-black text-slate-800">{m.label}</h4>
                                        {m.category && (
                                            <span className="px-2 py-0.5 bg-blue-50 text-blue-500 border border-blue-100 rounded-full text-[8px] font-black uppercase tracking-tighter">
                                                {m.category.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wide text-slate-400">
                                        <span className="flex items-center gap-1"><FiClock /> {m.status.replace(/_/g, ' ')}</span>
                                        {m.percentage > 0 && (
                                            <>
                                                <span>•</span>
                                                <span>{m.percentage}% Weight</span>
                                            </>
                                        )}
                                        {m.paidAt && (
                                            <>
                                                <span>•</span>
                                                <span className="text-emerald-500">Dibayar {new Date(m.paidAt).toLocaleDateString('id-ID')}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col md:items-end gap-3">
                                <span className="text-xl font-black text-slate-900">{formatCurrency(m.amount)}</span>
                                <div className="flex gap-2">
                                    {m.status === 'planned' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(m.id, 'due')}
                                            className="px-4 py-2 bg-amber-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-500/20"
                                        >
                                            Tandai Jatuh Tempo
                                        </button>
                                    )}
                                    {m.status === 'due' && (
                                        <button 
                                            onClick={() => handleUpdateStatus(m.id, 'paid_simulated')}
                                            className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                                        >
                                            Simulasi Bayar
                                        </button>
                                    )}
                                    {m.status === 'paid_simulated' && (
                                        <div className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100">
                                            <FiCheckCircle /> Lunas (Simulasi)
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] flex gap-4 items-start shadow-sm">
                <FiInfo className="text-blue-500 shrink-0 mt-1" size={24} />
                <div className="space-y-1">
                    <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">Informasi Billing Konsumen</h4>
                    <p className="text-[10px] text-blue-600 leading-relaxed font-bold uppercase italic">
                        Data ini adalah rencana penagihan RKK ke Konsumen. Status 'Lunas' hanya bersifat simulasi administratif. Konsumen dapat melihat rencana ini secara read-only di dashboard mereka.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProjectPaymentPlanTab;
