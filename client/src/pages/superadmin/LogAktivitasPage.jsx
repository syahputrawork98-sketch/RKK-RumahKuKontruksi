import React, { useState, useEffect } from "react";
import { FiSearch, FiFilter, FiDownload, FiInfo, FiUser, FiClock, FiActivity, FiLock, FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";
import RoleDataState from "../../components/common/RoleDataState";
import * as governanceService from "../../services/governanceService";
import { format } from "date-fns";

const LogAktivitasPage = () => {
    const { selectedSuperadminId } = useSuperadminPersona();
    const [activeTab, setActiveTab] = useState("audit"); // audit, approval
    const [logs, setLogs] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [expandedLog, setExpandedLog] = useState(null);

    const isSensitive = (action) => {
        const sensitiveKeywords = ['delete', 'remove', 'rejected', 'verified_progress', 'payment'];
        return sensitiveKeywords.some(key => action.toLowerCase().includes(key));
    };

    useEffect(() => {
        if (selectedSuperadminId) {
            fetchData();
        }
    }, [selectedSuperadminId, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (activeTab === "audit") {
                const res = await governanceService.getAuditLogs({ search });
                setLogs(res.data);
            } else {
                const res = await governanceService.getProfileChangeRequests();
                setRequests(res.data);
            }
        } catch (error) {
            console.error("Error fetching governance data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleReview = async (id, status) => {
        try {
            await governanceService.reviewProfileChangeRequest(id, {
                status,
                reviewedByRole: 'superadmin',
                reviewedById: selectedSuperadminId,
                note: status === 'approved' ? 'Disetujui secara administratif (Local Governance)' : 'Ditolak secara administratif (Local Governance)'
            });
            fetchData();
        } catch (error) {
            console.error("Error reviewing request:", error);
        }
    };

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk mengakses log aktivitas." />;
    }

    return (
        <div className="animate-fadeIn pb-20">
            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="dashboard-title text-4xl font-black tracking-tighter uppercase text-neutral-800">Governance & Audit Center</h1>
                    <p className="dashboard-subtitle text-lg italic font-medium text-amber-600 underline decoration-amber-200">Local Governance Foundation v1 — Local Persona & Activity Audit</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
                        <button 
                            onClick={() => { setActiveTab("audit"); setExpandedLog(null); }}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'audit' ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            Jejak Aktivitas
                        </button>
                        <button 
                            onClick={() => { setActiveTab("approval"); setExpandedLog(null); }}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'approval' ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            Antrean Persetujuan
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-4 mb-8">
                <FiInfo className="text-amber-600 shrink-0 mt-1" />
                <div>
                    <p className="text-[10px] font-black text-amber-800 uppercase tracking-widest">Local Simulation Governance</p>
                    <p className="text-[10px] text-amber-700 font-bold mt-1 leading-relaxed italic uppercase tracking-tighter">
                        Audit ini mencatat aktivitas simulasi operasional pada environment localhost. Seluruh jejak audit disimpan dalam database PostgreSQL lokal untuk pemantauan integritas data selama fase pengembangan.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-neutral-200 border-t-amber-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Memuat Jejak Aktivitas Lokal...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {activeTab === "audit" ? (
                        <div className="dashboard-table-card overflow-hidden">
                            <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                                <div className="relative w-64">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <input 
                                        type="text"
                                        placeholder="Cari aksi atau aktor..."
                                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-amber-500/20 transition-all"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                                    />
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-100 text-[10px] font-black text-amber-600 uppercase tracking-widest">
                                    <FiActivity />
                                    <span>Database Activity Logs</span>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-neutral-50/80 border-b border-neutral-100">
                                            <th className="px-6 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Waktu</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Aksi</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Aktor</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Entitas</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Ringkasan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-50">
                                        {logs.length > 0 ? logs.map((log) => (
                                            <React.Fragment key={log.id}>
                                                <tr 
                                                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                                    className={`hover:bg-neutral-50/30 transition-colors cursor-pointer ${expandedLog === log.id ? 'bg-amber-50/30' : ''}`}
                                                >
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex flex-col">
                                                            <span className="text-[11px] font-black text-neutral-800 tracking-tight">{format(new Date(log.createdAt), "dd MMM yyyy")}</span>
                                                            <span className="text-[9px] font-bold text-neutral-400">{format(new Date(log.createdAt), "HH:mm:ss")}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-md border ${
                                                            isSensitive(log.action) 
                                                            ? 'bg-rose-50 text-rose-600 border-rose-100' 
                                                            : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                                                        }`}>
                                                            {log.action}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-500">
                                                                <FiUser size={12} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[11px] font-bold text-neutral-700 leading-none">{log.actorName || log.actorId}</span>
                                                                <span className="text-[9px] font-black text-neutral-400 uppercase tracking-tighter">{log.actorRole}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 text-[11px] font-bold text-neutral-500 italic">
                                                        {log.entityType}
                                                    </td>
                                                    <td className="px-6 py-4 text-[11px] font-medium text-neutral-600 max-w-xs truncate">
                                                        {log.summary}
                                                    </td>
                                                </tr>
                                                {expandedLog === log.id && (
                                                    <tr className="bg-amber-50/20 border-b border-amber-100">
                                                        <td colSpan="5" className="px-10 py-6">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                <div>
                                                                    <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                                        <FiInfo size={12} /> Data Audit Lengkap
                                                                    </h4>
                                                                    <div className="space-y-4">
                                                                        <div className="p-4 bg-white border border-amber-100 rounded-2xl shadow-sm">
                                                                            <p className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-2">Metadata JSON</p>
                                                                            <pre className="text-[10px] font-mono text-neutral-600 bg-neutral-50 p-3 rounded-xl overflow-x-auto">
                                                                                {JSON.stringify(log.metadata || {}, null, 2)}
                                                                            </pre>
                                                                        </div>
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <div className="p-3 bg-white border border-neutral-100 rounded-xl">
                                                                                <p className="text-[8px] font-black text-neutral-400 uppercase mb-1">Entity ID</p>
                                                                                <p className="text-[10px] font-bold text-neutral-700 break-all">{log.entityId}</p>
                                                                            </div>
                                                                            <div className="p-3 bg-white border border-neutral-100 rounded-xl">
                                                                                <p className="text-[8px] font-black text-neutral-400 uppercase mb-1">Actor ID</p>
                                                                                <p className="text-[10px] font-bold text-neutral-700 break-all">{log.actorId}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col justify-center text-center p-8 bg-neutral-50/50 rounded-3xl border border-dashed border-neutral-200">
                                                                    <FiLock className="mx-auto text-neutral-300 mb-4" size={32} />
                                                                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Sensitive Action Insight</p>
                                                                    <p className="text-[10px] text-neutral-500 font-medium mt-2 italic">
                                                                        {isSensitive(log.action) 
                                                                            ? "Aksi ini bersifat sensitif karena mempengaruhi integritas data utama (Penghapusan/Keuangan/Progres)." 
                                                                            : "Aksi ini bersifat operasional standar."}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-20 text-center">
                                                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Belum ada jejak aktivitas lokal tercatat.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {requests.length > 0 ? requests.map((req) => (
                                <div key={req.id} className="dashboard-card p-6 border-l-4 border-l-amber-400 group hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                                                <FiUser size={24} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-sm font-black text-neutral-800 uppercase tracking-tight">Perubahan {req.fieldName}</h3>
                                                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                                                        req.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                                                        req.status === 'approved' ? 'bg-green-50 text-green-600 border-green-200' : 
                                                        'bg-red-50 text-red-600 border-red-200'
                                                    }`}>
                                                        {req.status}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] text-neutral-400 font-bold mb-4 uppercase tracking-widest">Target: {req.targetRole} ({req.targetId})</p>
                                                
                                                <div className="grid grid-cols-2 gap-8 mb-4 bg-neutral-50 p-4 rounded-2xl border border-neutral-100">
                                                    <div>
                                                        <span className="block text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-1">Nilai Lama</span>
                                                        <span className="text-xs font-bold text-neutral-500 line-through decoration-red-300/50">{req.oldValue || "-"}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-[8px] font-black text-green-600 uppercase tracking-widest mb-1">Nilai Baru</span>
                                                        <span className="text-xs font-bold text-neutral-800">{req.newValue}</span>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-3 text-[10px] text-neutral-400">
                                                    <FiClock />
                                                    <span>Diajukan pada {format(new Date(req.createdAt), "dd MMM yyyy, HH:mm")}</span>
                                                    <span className="w-1 h-1 bg-neutral-300 rounded-full"></span>
                                                    <span>Oleh: {req.requestedByRole}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {req.status === 'pending' && (
                                            <div className="flex gap-2">
                                                <button 
                                                    onClick={() => handleReview(req.id, 'rejected')}
                                                    className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
                                                >
                                                    <FiXCircle size={20} />
                                                </button>
                                                <button 
                                                    onClick={() => handleReview(req.id, 'approved')}
                                                    className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors border border-green-100 shadow-sm"
                                                >
                                                    <FiCheckCircle size={20} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )) : (
                                <div className="dashboard-card flex flex-col items-center justify-center py-20 text-center border-dashed border-2 border-neutral-200 bg-neutral-50/30">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-neutral-200 mb-6 shadow-sm border border-neutral-100">
                                        <FiAlertCircle size={32} />
                                    </div>
                                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">Tidak ada antrean persetujuan profil lokal.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default LogAktivitasPage;
