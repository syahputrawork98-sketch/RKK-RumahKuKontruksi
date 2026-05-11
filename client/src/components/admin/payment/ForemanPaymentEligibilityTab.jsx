import React, { useState, useEffect } from "react";
import { 
    FiUser, 
    FiCalendar, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiInfo, 
    FiClock, 
    FiDollarSign,
    FiFileText,
    FiSearch,
    FiPlus,
    FiCheck,
    FiX,
    FiEdit3,
    FiExternalLink
} from "react-icons/fi";
import foremanPaymentEligibilityService from "../../../services/foremanPaymentEligibilityService";
import weeklyJournalService from "../../../services/weeklyJournalService";
import { useAdminPersona } from "../../../context/AdminPersonaContext";

const ForemanPaymentEligibilityTab = ({ projectId }) => {
    const { admin } = useAdminPersona();
    const [loading, setLoading] = useState(true);
    const [eligibilities, setEligibilities] = useState([]);
    const [pendingJournals, setPendingJournals] = useState([]);
    const [selectedEligibility, setSelectedEligibility] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        fetchData();
    }, [projectId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [eligRes, journalsRes] = await Promise.all([
                foremanPaymentEligibilityService.getAll({ projectId }),
                weeklyJournalService.getJournalsByProject(projectId)
            ]);
            
            setEligibilities(eligRes.data || []);
            
            // Filter journals that don't have eligibility yet
            const existingJournalIds = (eligRes.data || []).map(e => e.weeklyJournalId);
            const pending = (journalsRes.data || []).filter(j => 
                j.status === 'approved' && !existingJournalIds.includes(j.id)
            );
            setPendingJournals(pending);
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleInitialize = async (journalId) => {
        try {
            setUpdating(true);
            await foremanPaymentEligibilityService.initializeFromJournal({
                journalId,
                actorRole: 'admin'
            });
            await fetchData();
            setUpdating(false);
        } catch (error) {
            alert("Gagal inisialisasi: " + error.message);
            setUpdating(false);
        }
    };

    const handleUpdateStatus = async (eligibilityId, status) => {
        if (!window.confirm(`Update status menjadi ${status}? (Simulasi Lokal)`)) return;
        try {
            setUpdating(true);
            await foremanPaymentEligibilityService.updateStatus(eligibilityId, {
                status,
                actorRole: 'admin',
                actorId: admin?.id
            });
            await fetchData();
            if (selectedEligibility?.id === eligibilityId) {
                const res = await foremanPaymentEligibilityService.getById(eligibilityId);
                setSelectedEligibility(res.data);
            }
            setUpdating(false);
        } catch (error) {
            alert("Gagal update status: " + error.message);
            setUpdating(false);
        }
    };

    const formatCurrency = (val) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    const getStatusColor = (status) => {
        const colors = {
            pending_review: "bg-amber-100 text-amber-700 border-amber-200",
            eligible: "bg-emerald-100 text-emerald-700 border-emerald-200",
            partial: "bg-blue-100 text-blue-700 border-blue-200",
            hold: "bg-slate-100 text-slate-700 border-slate-200",
            correction_required: "bg-rose-100 text-rose-700 border-rose-200",
            paid_simulated: "bg-purple-100 text-purple-700 border-purple-200"
        };
        return colors[status] || "bg-slate-100 text-slate-500 border-slate-200";
    };

    if (loading) return <div className="py-10 text-center"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Memuat Eligibility...</p></div>;

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Summary / Disclaimer */}
            <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] flex gap-4 items-start shadow-sm">
                <FiInfo className="text-blue-500 shrink-0 mt-1" size={24} />
                <div className="space-y-1">
                    <h4 className="text-xs font-black text-blue-700 uppercase tracking-widest">Informasi Pembayaran Mandor</h4>
                    <p className="text-[10px] text-blue-600 leading-relaxed font-bold uppercase italic tracking-tighter">
                        Data ini adalah simulasi kelayakan pembayaran Mandor berdasarkan pekerjaan rill mingguan. Ini BUKAN sistem payroll otomatis dan TIDAK terhubung ke disbursement bank. RKK tetap menjadi penentu kelayakan akhir.
                    </p>
                </div>
            </div>

            {/* Pending Journals Section */}
            {pendingJournals.length > 0 && (
                <div className="space-y-4">
                    <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-amber-600 ml-2 flex items-center gap-2">
                        <FiAlertCircle /> Jurnal Menunggu Inisialisasi Eligibility ({pendingJournals.length})
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {pendingJournals.map(j => (
                            <div key={j.id} className="p-4 bg-white border border-amber-100 rounded-2xl flex items-center justify-between shadow-sm border-l-4 border-l-amber-400">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Minggu Ke-{j.weekNumber || '-'}</p>
                                    <h4 className="text-sm font-black text-slate-800">{new Date(j.weekStartDate).toLocaleDateString('id-ID')} - {new Date(j.weekEndDate).toLocaleDateString('id-ID')}</h4>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-1">Status Jurnal: {j.status}</p>
                                </div>
                                <button 
                                    onClick={() => handleInitialize(j.id)}
                                    disabled={updating}
                                    className="px-4 py-2 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/20 hover:scale-105 transition-all disabled:opacity-50"
                                >
                                    Setup Eligibility
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Eligibility List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Daftar Kelayakan Pembayaran</h3>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-slate-50 text-[8px] font-black uppercase tracking-tighter text-slate-400 rounded-full border border-slate-100">Total: {eligibilities.length}</span>
                    </div>
                </div>

                {eligibilities.length === 0 ? (
                    <div className="py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <FiFileText size={48} className="mx-auto text-slate-200 mb-4" />
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Belum ada data eligibility.</p>
                        <p className="text-[10px] text-slate-300 uppercase mt-1">Inisialisasi jurnal di atas untuk memulai.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {eligibilities.map(e => (
                            <div key={e.id} className="group bg-white border border-slate-100 rounded-[2rem] p-6 transition-all hover:border-blue-500/30 hover:shadow-xl hover:shadow-slate-200/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black border ${
                                        e.status === 'paid_simulated' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                        e.status === 'eligible' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                        'bg-slate-50 text-slate-400 border-slate-100'
                                    }`}>
                                        <FiUser />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="text-base font-black text-slate-800">Minggu {e.weekNumber}</h4>
                                            <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${getStatusColor(e.status)}`}>
                                                {e.status.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <FiCalendar /> {new Date(e.periodStart).toLocaleDateString('id-ID')} - {new Date(e.periodEnd).toLocaleDateString('id-ID')}
                                        </p>
                                        <p className="text-[9px] font-black text-blue-500 uppercase mt-1">Mandor: {e.foreman?.name || 'N/A'}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col md:items-end gap-3">
                                    <div className="text-right">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Approved Amount</p>
                                        <p className="text-xl font-black text-slate-900">{formatCurrency(e.approvedAmount || e.estimatedAmount)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => { setSelectedEligibility(e); setShowDetailModal(true); }}
                                            className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2"
                                        >
                                            <FiSearch /> Detail & Review
                                        </button>
                                        {e.status === 'eligible' && (
                                            <button 
                                                onClick={() => handleUpdateStatus(e.id, 'paid_simulated')}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-purple-600/20 hover:scale-105 transition-all"
                                            >
                                                Tandai Dibayar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* DETAIL MODAL */}
            {showDetailModal && selectedEligibility && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
                        <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Eligibility Detail</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Review Pembayaran Mandor</p>
                            </div>
                            <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-white rounded-xl transition-all text-slate-300">
                                <FiX size={24} />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Status Saat Ini</p>
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border inline-block ${getStatusColor(selectedEligibility.status)}`}>
                                        {selectedEligibility.status.replace(/_/g, ' ')}
                                    </span>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimasi (Berdasarkan RAB)</p>
                                    <p className="text-lg font-black text-slate-800">{formatCurrency(selectedEligibility.estimatedAmount)}</p>
                                </div>
                                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Approved Amount</p>
                                    <p className="text-lg font-black text-blue-600">{formatCurrency(selectedEligibility.approvedAmount || selectedEligibility.estimatedAmount)}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 ml-2">Item Pekerjaan Terkait</h4>
                                <div className="space-y-3">
                                    {selectedEligibility.items?.map((item, idx) => (
                                        <div key={item.id} className="p-5 bg-white border border-slate-100 rounded-3xl flex items-center justify-between shadow-sm">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xs font-black text-slate-400">
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <h5 className="text-sm font-black text-slate-800">{item.description}</h5>
                                                    <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">
                                                        RAB Item: {item.rabItem?.description || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-slate-800">{formatCurrency(item.estimatedAmount)}</p>
                                                <span className="text-[8px] font-black uppercase tracking-tighter text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Verified by Journal</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl">
                                <h5 className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-2 mb-3">
                                    <FiEdit3 /> Aksi Admin & Catatan
                                </h5>
                                <textarea 
                                    className="w-full p-4 bg-white border border-amber-100 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:outline-none min-h-[80px]"
                                    placeholder="Tambahkan catatan untuk Mandor mengenai kelayakan pembayaran ini..."
                                    defaultValue={selectedEligibility.adminNote}
                                    onBlur={(e) => {
                                        // Update local state or trigger API if needed
                                    }}
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex gap-3">
                            <button 
                                onClick={() => handleUpdateStatus(selectedEligibility.id, 'eligible')}
                                className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-[1.02] transition-all"
                            >
                                Setujui (Eligible)
                            </button>
                            <button 
                                onClick={() => handleUpdateStatus(selectedEligibility.id, 'hold')}
                                className="flex-1 py-4 bg-slate-800 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-slate-800/20 hover:scale-[1.02] transition-all"
                            >
                                Tahan (Hold)
                            </button>
                            <button 
                                onClick={() => handleUpdateStatus(selectedEligibility.id, 'correction_required')}
                                className="flex-1 py-4 bg-rose-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-rose-600/20 hover:scale-[1.02] transition-all"
                            >
                                Perlu Koreksi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ForemanPaymentEligibilityTab;
