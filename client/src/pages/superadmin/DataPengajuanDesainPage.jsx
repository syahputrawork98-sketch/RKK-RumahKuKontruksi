import React, { useState, useEffect } from "react";
import { 
    FiSearch, 
    FiUser, 
    FiMapPin, 
    FiClock, 
    FiCheckCircle, 
    FiInfo,
    FiZap,
    FiList,
    FiAward,
    FiDollarSign,
    FiCalendar,
    FiX,
    FiEye
} from "react-icons/fi";
import designRequestService from "../../services/designRequestService";
import designTenderService from "../../services/designTenderService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

const DataPengajuanDesainPage = () => {
    const [activeTab, setActiveTab] = useState("requests"); // "requests" or "tenders"
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [requests, setRequests] = useState([]);
    const [tenders, setTenders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const { selectedSuperadminId } = useSuperadminPersona();

    useEffect(() => {
        if (selectedSuperadminId) {
            fetchData();
        }
    }, [activeTab, selectedSuperadminId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            if (activeTab === "requests") {
                const res = await designRequestService.getAllDesignRequests();
                setRequests(res.data || []);
            } else {
                const res = await designTenderService.getDesignTenders();
                setTenders(res.data || []);
            }
        } catch (err) {
            console.error("DataPengajuanDesainPage: Error fetching data:", err);
            setError("Gagal memuat data monitoring desain.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDetail = (item) => {
        setSelectedItem(item);
        setIsDetailOpen(true);
    };

    const filteredRequests = (requests || []).filter(r => 
        (r.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.customer?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.customer?.companyName || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredTenders = (tenders || []).filter(t => 
        (t.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.designRequest?.customer?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusBadge = (status) => {
        const styles = {
            submitted: "bg-blue-50 text-blue-600 border-blue-100",
            open: "bg-teal-50 text-teal-600 border-teal-100",
            assigned: "bg-indigo-50 text-indigo-600 border-indigo-100",
            awarded: "bg-indigo-50 text-indigo-600 border-indigo-100",
            in_review: "bg-amber-50 text-amber-600 border-amber-100",
            approved: "bg-emerald-50 text-emerald-600 border-emerald-100",
            rejected: "bg-rose-50 text-rose-600 border-rose-100",
            draft: "bg-gray-50 text-gray-600 border-gray-100",
            cancelled: "bg-gray-100 text-gray-500 border-gray-200"
        };
        const labels = {
            assigned: "Arsitek Terpilih",
            open: "Tender Aktif",
            approved: "Siap Convert"
        };
        return { style: styles[status] || styles.draft, label: labels[status] || status.replace('_', ' ') };
    };

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk memonitor data pengajuan desain." />;
    }

    if (loading) return <RoleDataState type="loading" message="Memuat data monitoring..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        MONITORING <span className="text-blue-600 uppercase">Proyek Desain (Lokal)</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Pusat audit dan monitoring status pengajuan desain arsitektur secara global dalam fase **Local Development Governance**.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Local Audit Mode</span>
                </div>
            </div>

            {/* TABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)]">
                <button 
                    onClick={() => setActiveTab("requests")}
                    className={`px-6 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "requests" ? "border-blue-600 text-blue-600" : "border-transparent text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-text)]"}`}
                >
                    <FiList className="inline mr-2" />
                    Permintaan Masuk
                </button>
                <button 
                    onClick={() => setActiveTab("tenders")}
                    className={`px-6 py-3 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === "tenders" ? "border-blue-600 text-blue-600" : "border-transparent text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-text)]"}`}
                >
                    <FiZap className="inline mr-2" />
                    Peluang Desain
                </button>
            </div>

            <div className="dashboard-card">
                <div className="mb-6 relative max-w-md">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                    <input 
                        type="text" 
                        placeholder={activeTab === "requests" ? "Cari judul atau konsumen..." : "Cari peluang desain..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div className="overflow-x-auto">
                    {activeTab === "requests" ? (
                        filteredRequests.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)]">
                                        <th className="pb-4 px-2">Project / Brief</th>
                                        <th className="pb-4 px-2">Konsumen</th>
                                        <th className="pb-4 px-2">Status</th>
                                        <th className="pb-4 px-2">Arsitek Terpilih</th>
                                        <th className="pb-4 px-2 text-right">Detail</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredRequests.map((r) => (
                                        <tr key={r.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                            <td className="py-4 px-2">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[var(--dashboard-text)]">{r.title}</span>
                                                    <div className="flex items-center gap-2 mt-1 text-[10px] text-[var(--dashboard-text-soft)] font-medium">
                                                        <FiMapPin className="shrink-0" />
                                                        <span className="truncate max-w-[150px]">{r.location || "-"}</span>
                                                        <span className="mx-1">•</span>
                                                        <span>{r.buildingType || "-"}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
                                                        <FiUser size={12} />
                                                    </div>
                                                    <span className="text-xs font-semibold">
                                                        {r.customer?.name || r.customer?.companyName || "N/A"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getStatusBadge(r.status).style}`}>
                                                    {getStatusBadge(r.status).label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2">
                                                {r.architect ? (
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                                            <FiCheckCircle size={12} />
                                                        </div>
                                                        <span className="text-xs font-medium text-indigo-700">{r.architect.name}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[10px] text-gray-400 italic">Belum ditentukan</span>
                                                )}
                                                {r.projectId && (
                                                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 w-fit">
                                                        <FiCheckCircle size={10} />
                                                        Proyek: {r.project?.projectCode || "AKTIF"}
                                                    </div>
                                                )}
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <button 
                                                    onClick={() => handleOpenDetail(r)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Lihat Detail Monitoring"
                                                >
                                                    <FiEye size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <RoleDataState type="empty" message="Tidak ada permintaan desain ditemukan." />
                        )
                    ) : (
                        /* TENDER TABLE */
                        filteredTenders.length > 0 ? (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)]">
                                        <th className="pb-4 px-2">Peluang Desain</th>
                                        <th className="pb-4 px-2">Fee Total</th>
                                        <th className="pb-4 px-2">Budget Arsitek</th>
                                        <th className="pb-4 px-2">Status</th>
                                        <th className="pb-4 px-2">Penawaran</th>
                                        <th className="pb-4 px-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTenders.map((t) => (
                                        <tr key={t.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                            <td className="py-4 px-2">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold text-[var(--dashboard-text)]">{t.title}</span>
                                                    <span className="text-[10px] text-[var(--dashboard-text-soft)] mt-0.5">Ref: {t.designRequest?.customer?.name || "N/A"}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2 font-medium text-xs">
                                                Rp {Number(t.baseDesignFee || 0).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-4 px-2 font-bold text-xs text-teal-600">
                                                Rp {Number(t.drafterBudgetAmount || 0).toLocaleString('id-ID')}
                                            </td>
                                            <td className="py-4 px-2">
                                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getStatusBadge(t.status).style}`}>
                                                    {getStatusBadge(t.status).label}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2">
                                                <span className="px-2 py-1 bg-gray-100 rounded-lg text-[10px] font-black">{t.bids?.length || 0} Bid</span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <button 
                                                    onClick={() => handleOpenDetail(t)}
                                                    className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black border border-blue-100 hover:bg-blue-100 transition-all uppercase tracking-widest"
                                                >
                                                    Cek Progres
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <RoleDataState type="empty" message="Tidak ada peluang desain ditemukan." />
                        )
                    )}
                </div>
            </div>

            {/* DETAIL MONITORING MODAL (READ-ONLY) */}
            {isDetailOpen && selectedItem && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDetailOpen(false)}></div>
                    <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl animate-scaleIn">
                        <div className="sticky top-0 bg-white px-8 py-6 border-b border-gray-100 flex justify-between items-center z-10">
                            <div>
                                <h3 className="text-xl font-extrabold tracking-tight">Detail Monitoring</h3>
                                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest mt-1 italic">Mode Audit Read-Only</p>
                            </div>
                            <button onClick={() => setIsDetailOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><FiX size={24} /></button>
                        </div>
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Judul Request</label>
                                    <p className="text-sm font-bold text-gray-800">{selectedItem.title || "-"}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status Sistem</label>
                                    <div className="pt-1">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border ${getStatusBadge(selectedItem.status).style}`}>
                                            {getStatusBadge(selectedItem.status).label}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Konsumen</label>
                                    <p className="text-sm font-bold text-gray-800">{selectedItem.customer?.name || selectedItem.designRequest?.customer?.name || "-"}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tipe Bangunan</label>
                                    <p className="text-sm font-bold text-gray-800">{selectedItem.buildingType || selectedItem.designRequest?.buildingType || "-"}</p>
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Lokasi</label>
                                    <p className="text-sm font-bold text-gray-800">{selectedItem.location || selectedItem.designRequest?.location || "-"}</p>
                                </div>
                                <div className="col-span-2 space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Deskripsi Brief</label>
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs text-gray-600 leading-relaxed italic">
                                        "{selectedItem.description || selectedItem.designRequest?.description || "Tidak ada deskripsi."}"
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Estimasi Budget</label>
                                    <p className="text-sm font-black text-blue-600">Rp {Number(selectedItem.estimatedBudget || selectedItem.baseDesignFee || 0).toLocaleString('id-ID')}</p>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Arsitek Terkait</label>
                                    <p className="text-sm font-bold text-purple-600">{selectedItem.architect?.name || "Belum ditunjuk"}</p>
                                </div>
                            </div>

                            {/* AUDIT NOTICE */}
                             <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-3">
                                <FiInfo className="text-blue-500 shrink-0 mt-0.5" size={16} />
                                <p className="text-[10px] text-blue-700 font-medium leading-relaxed uppercase">
                                    DATA LOKAL: Dashboard monitoring global untuk fase **Local Development**. Segala perubahan operasional dilakukan oleh persona **Admin** melalui sinkronisasi `localhost`.
                                </p>
                            </div>

                            <div className="pt-4">
                                <button 
                                    onClick={() => setIsDetailOpen(false)} 
                                    className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-200 transition-all"
                                >
                                    Tutup Detail
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataPengajuanDesainPage;
