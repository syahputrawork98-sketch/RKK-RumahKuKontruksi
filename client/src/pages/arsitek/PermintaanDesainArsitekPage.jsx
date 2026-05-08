import React, { useState, useEffect } from "react";
import { 
    FiSearch, 
    FiFilter, 
    FiChevronRight, 
    FiClock, 
    FiCheckCircle, 
    FiZap, 
    FiDollarSign, 
    FiCalendar, 
    FiSend,
    FiX,
    FiInfo
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import designRequestService from "../../services/designRequestService";
import designTenderService from "../../services/designTenderService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const PermintaanDesainArsitekPage = () => {
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const [activeSubtab, setActiveSubtab] = useState("aktif"); // "aktif", "riwayat", "peluang"
    const [requests, setRequests] = useState([]);
    const [tenders, setTenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    // Bid Modal State
    const [isBidModalOpen, setIsBidModalOpen] = useState(false);
    const [selectedTender, setSelectedTender] = useState(null);
    const [bidSubmitting, setBidSubmitting] = useState(false);
    const [bidData, setBidData] = useState({
        bidAmount: "",
        estimatedDurationDays: "",
        message: ""
    });

    const subtabs = [
        { id: "aktif", label: "Antrean Saya" },
        { id: "peluang", label: "Peluang Desain" },
        { id: "riwayat", label: "Riwayat" },
    ];

    const fetchData = async () => {
        if (!selectedArchitectId) return;
        try {
            setLoading(true);
            if (activeSubtab === "peluang") {
                const res = await designTenderService.getOpenDesignTenders();
                setTenders(res.data || []);
            } else {
                const res = await designRequestService.getAssignedRequests(selectedArchitectId);
                setRequests(res.data || []);
            }
            setLoading(false);
        } catch (err) {
            console.error("Error fetching architect data:", err);
            setError("Gagal memuat data.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedArchitectId, activeSubtab]);

    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await designRequestService.updateDesignRequest(id, { status: newStatus });
            fetchData();
        } catch (err) {
            alert("Gagal memperbarui status.");
        }
    };

    const handleOpenBidModal = (tender) => {
        setSelectedTender(tender);
        setBidData({
            bidAmount: tender.drafterBudgetAmount || "",
            estimatedDurationDays: "",
            message: ""
        });
        setIsBidModalOpen(true);
    };

    const handleSubmitBid = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (Number(bidData.bidAmount) > Number(selectedTender.drafterBudgetAmount)) {
            alert(`Harga penawaran tidak boleh melebihi budget mitra (Rp ${Number(selectedTender.drafterBudgetAmount).toLocaleString('id-ID')})`);
            return;
        }

        try {
            setBidSubmitting(true);
            await designTenderService.submitBid(selectedTender.id, {
                architectId: selectedArchitectId,
                bidAmount: bidData.bidAmount,
                estimatedDurationDays: bidData.estimatedDurationDays,
                message: bidData.message
            });
            setIsBidModalOpen(false);
            fetchData();
            alert("Penawaran berhasil diajukan!");
        } catch (err) {
            alert(err.response?.data?.message || "Gagal mengajukan penawaran.");
        } finally {
            setBidSubmitting(false);
        }
    };

    const filteredRequests = requests.filter(r => {
        const matchesSearch = r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        
        if (activeSubtab === "aktif") {
            return matchesSearch && !["approved", "rejected"].includes(r.status);
        } else {
            return matchesSearch && ["approved", "rejected"].includes(r.status);
        }
    });

    const filteredTenders = tenders.filter(t => 
        t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (personaLoading || (loading && selectedArchitectId && !isBidModalOpen)) {
        return <RoleDataState type="loading" message="Memuat data..." />;
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk mengelola permintaan desain atau mencari peluang baru."
            />
        );
    }

    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Kemitraan Arsitek</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Kelola penugasan dan cari peluang desain baru.</p>
                </div>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0 overflow-x-auto scrollbar-hide">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 whitespace-nowrap ${
                            activeSubtab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="dashboard-card min-h-[400px]">
                {/* SEARCH */}
                <div className="mb-8">
                    <div className="relative max-w-md">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder={activeSubtab === 'peluang' ? "Cari peluang desain..." : "Cari ID atau customer..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                </div>

                {activeSubtab === 'peluang' ? (
                    /* TENDER LIST FOR ARCHITECT */
                    filteredTenders.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredTenders.map((t) => {
                                const myBid = t.bids?.find(b => b.architectId === selectedArchitectId);
                                return (
                                    <div key={t.id} className="p-6 border border-[var(--dashboard-border)] rounded-3xl hover:border-teal-400 transition-all group bg-white shadow-sm flex flex-col relative overflow-hidden">
                                        {myBid && (
                                            <div className="absolute top-0 right-0 px-4 py-1 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-bl-xl shadow-lg">
                                                Sudah Bid
                                            </div>
                                        )}
                                        <div className="mb-4">
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-teal-600 mb-1 block">Peluang Desain Baru</span>
                                            <h3 className="font-bold text-[var(--dashboard-text)] text-lg leading-tight">{t.title}</h3>
                                            <p className="text-xs text-[var(--dashboard-text-soft)] mt-2 line-clamp-2 italic">
                                                {t.description || "Tidak ada deskripsi tambahan."}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-6 mt-auto">
                                            <div className="p-3 bg-teal-50 rounded-2xl border border-teal-100/50">
                                                <span className="text-[9px] font-black text-teal-700 uppercase tracking-widest block mb-1">Budget Mitra (Max)</span>
                                                <span className="text-sm font-black text-teal-800">Rp {Number(t.drafterBudgetAmount).toLocaleString('id-ID')}</span>
                                            </div>
                                            <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block mb-1">Lokasi / Tipe</span>
                                                <span className="text-[10px] font-bold text-gray-700 truncate block">
                                                    {t.designRequest?.buildingType || "-"} • {t.designRequest?.location || "-"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                                            {myBid ? (
                                                <div className="flex-1 flex flex-col gap-1">
                                                    <span className="text-[9px] font-black uppercase text-gray-400">Status Penawaran Anda:</span>
                                                    <span className={`text-xs font-bold ${
                                                        myBid.status === 'selected' ? 'text-emerald-600' : 
                                                        myBid.status === 'rejected' ? 'text-rose-600' : 'text-blue-600'
                                                    }`}>
                                                        {myBid.status === 'submitted' ? 'Menunggu Review Admin' : 
                                                         myBid.status === 'selected' ? 'Selamat! Anda Terpilih' : 'Belum Berhasil'}
                                                    </span>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => handleOpenBidModal(t)}
                                                    className="w-full flex items-center justify-center gap-2 py-3 bg-teal-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/10"
                                                >
                                                    <FiSend size={14} />
                                                    Ajukan Penawaran
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center opacity-60">
                            <FiZap size={64} className="text-teal-200 mb-4" />
                            <h4 className="font-bold text-gray-400">Belum ada peluang desain terbuka.</h4>
                            <p className="text-xs text-gray-400 italic">Cek kembali nanti untuk proyek baru.</p>
                        </div>
                    )
                ) : (
                    /* ASSIGNED REQUESTS LIST (EXISTING) */
                    filteredRequests.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {filteredRequests.map((r) => (
                                <div key={r.id} className="p-5 border border-[var(--dashboard-border)] rounded-2xl hover:border-[var(--dashboard-primary)]/50 transition-all group bg-white shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <span className="text-[10px] font-black uppercase tracking-tighter text-[var(--dashboard-text-soft)] mb-1 block">ID: {r.id.slice(-8)}</span>
                                            <h3 className="font-bold text-[var(--dashboard-text)] group-hover:text-[var(--dashboard-primary)] transition-colors">{r.title}</h3>
                                        </div>
                                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                                            r.status === 'assigned' ? "bg-purple-50 text-purple-600 border-purple-100" :
                                            r.status === 'in_review' ? "bg-amber-50 text-amber-600 border-amber-100" :
                                            r.status === 'approved' ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                            "bg-gray-50 text-gray-600 border-gray-100"
                                        }`}>
                                            {r.status.replace('_', ' ')}
                                        </span>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center gap-2 text-xs text-[var(--dashboard-text-soft)]">
                                            <FiCheckCircle className="shrink-0" />
                                            <span>Customer: <strong className="text-[var(--dashboard-text)]">{r.customer?.name || r.customer?.companyName}</strong></span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[var(--dashboard-text-soft)]">
                                            <FiClock className="shrink-0" />
                                            <span>Masuk: {new Date(r.createdAt).toLocaleDateString("id-ID")}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 pt-4 border-t border-[var(--dashboard-border-soft)]">
                                        <Link 
                                            to={`/arsitek/permintaan-desain/${r.id}`}
                                            className="flex-1 flex items-center justify-center gap-2 py-2 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-border-soft)] transition-all"
                                        >
                                            Detail Brief
                                            <FiChevronRight />
                                        </Link>
                                        
                                        {r.status === 'assigned' && (
                                            <button 
                                                onClick={() => handleUpdateStatus(r.id, 'in_review')}
                                                className="flex-1 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/10"
                                            >
                                                Proses Review
                                            </button>
                                        )}

                                        {r.status === 'in_review' && (
                                            <button 
                                                onClick={() => handleUpdateStatus(r.id, 'approved')}
                                                className="flex-1 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/10"
                                            >
                                                Approve Design
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <RoleDataState 
                                type="empty"
                                title="Tidak Ada Permintaan"
                                description="Belum ada permintaan desain yang ditugaskan secara langsung kepada Anda."
                            />
                        </div>
                    )
                )}
            </div>

            {/* BID MODAL */}
            {isBidModalOpen && selectedTender && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsBidModalOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-md relative z-10 shadow-2xl animate-scaleIn overflow-hidden">
                        <div className="bg-teal-600 px-8 py-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-extrabold uppercase tracking-tight">Kirim Penawaran</h3>
                                <p className="text-[10px] text-teal-100 font-bold opacity-80 mt-1 uppercase tracking-widest">Peluang: {selectedTender.title}</p>
                            </div>
                            <button onClick={() => setIsBidModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full text-white"><FiX size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmitBid} className="p-8 space-y-5">
                            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
                                <div className="flex items-start gap-3">
                                    <FiInfo className="text-teal-600 mt-1 shrink-0" />
                                    <p className="text-[10px] font-bold text-teal-800 leading-tight">
                                        Budget Maksimal Mitra: <br/>
                                        <span className="text-sm font-black tracking-tight">Rp {Number(selectedTender.drafterBudgetAmount).toLocaleString('id-ID')}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Harga Penawaran Anda</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">Rp</div>
                                    <input 
                                        required 
                                        type="number" 
                                        className="dashboard-input pl-12 border-teal-100 focus:ring-teal-500/20" 
                                        placeholder="0"
                                        value={bidData.bidAmount} 
                                        onChange={(e) => setBidData({...bidData, bidAmount: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Estimasi Durasi (Hari)</label>
                                <div className="relative">
                                    <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        required 
                                        type="number" 
                                        className="dashboard-input pl-11" 
                                        placeholder="Misal: 14"
                                        value={bidData.estimatedDurationDays} 
                                        onChange={(e) => setBidData({...bidData, estimatedDurationDays: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Pesan / Pendekatan Desain</label>
                                <textarea 
                                    rows="3" 
                                    className="dashboard-input text-xs" 
                                    placeholder="Jelaskan secara singkat rencana Anda untuk proyek ini..."
                                    value={bidData.message} 
                                    onChange={(e) => setBidData({...bidData, message: e.target.value})}
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsBidModalOpen(false)} className="px-6 py-3 border border-gray-100 text-gray-400 rounded-2xl font-bold text-[10px] uppercase tracking-widest">Batal</button>
                                <button type="submit" disabled={bidSubmitting} className="px-8 py-3 bg-teal-600 text-white rounded-2xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-teal-600/20 hover:scale-[1.02] transition-all">
                                    {bidSubmitting ? "Mengirim..." : "Kirim Penawaran"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PermintaanDesainArsitekPage;
