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
                    <p className="dashboard-subtitle text-lg italic font-medium text-amber-600 underline decoration-amber-200">Local Governance Monitoring — Simulasi Audit Lintas Role</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-neutral-100 p-1 rounded-2xl border border-neutral-200">
                        <button 
                            onClick={() => { setActiveTab("audit"); setExpandedLog(null); }}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'audit' ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            Log Aktivitas Lokal
                        </button>
                        <button 
                            onClick={() => { setActiveTab("approval"); setExpandedLog(null); }}
                            className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'approval' ? 'bg-white text-neutral-800 shadow-sm' : 'text-neutral-400 hover:text-neutral-600'}`}
                        >
                            Persetujuan Profil
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-amber-50 border border-amber-100 p-6 rounded-[32px] flex items-start gap-5 mb-8 shadow-sm">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm border border-amber-200 shrink-0">
                    <FiLock size={24} />
                </div>
                <div>
                    <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest mb-1">Local Governance Audit Policy</h4>
                    <p className="text-xs text-amber-700 font-bold leading-relaxed italic uppercase tracking-tighter">
                        Seluruh aktivitas di bawah ini adalah rekaman simulasi operasional pada environment localhost. Jejak audit ini digunakan untuk memastikan integritas alur kerja (SOT) selama fase pengembangan. Ini <strong>bukan merupakan audit keamanan production</strong> atau compliance security internasional.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center bg-white rounded-[40px] border border-neutral-100 shadow-xl">
                    <div className="w-16 h-16 border-4 border-neutral-100 border-t-amber-500 rounded-full animate-spin mb-6"></div>
                    <p className="text-xs font-black text-neutral-400 uppercase tracking-widest animate-pulse">Menyelaraskan Jejak Audit Lokal...</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {activeTab === "audit" ? (
                        <div className="dashboard-table-card overflow-hidden !rounded-[40px] shadow-2xl shadow-neutral-200/50">
                            <div className="p-8 border-b border-neutral-100 flex flex-col md:flex-row md:items-center justify-between bg-neutral-50/30 gap-4">
                                <div className="relative w-full md:w-80">
                                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                                    <input 
                                        type="text"
                                        placeholder="Cari aksi, entitas, atau aktor..."
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-2xl text-xs font-bold focus:ring-4 focus:ring-amber-500/10 transition-all outline-none"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                                    />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="px-5 py-2 bg-white rounded-xl border border-neutral-200 text-[10px] font-black text-neutral-500 uppercase tracking-widest flex items-center gap-2">
                                        <FiActivity className="text-amber-500" />
                                        <span>Local Trace Logs</span>
                                    </div>
                                    <button 
                                        onClick={fetchData}
                                        className="p-3 bg-white text-neutral-400 hover:text-amber-600 rounded-xl border border-neutral-200 transition-all hover:bg-amber-50"
                                    >
                                        <FiClock />
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-neutral-50/80 border-b border-neutral-100">
                                            <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Waktu & Stempel</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest text-center">Aksi Operasional</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Aktor / Persona</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Entitas Data</th>
                                            <th className="px-8 py-5 text-[10px] font-black text-neutral-400 uppercase tracking-widest">Ringkasan Audit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-50 bg-white">
                                        {logs.length > 0 ? logs.map((log) => (
                                            <React.Fragment key={log.id}>
                                                <tr 
                                                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                                    className={`hover:bg-neutral-50/50 transition-all cursor-pointer group ${expandedLog === log.id ? 'bg-amber-50/30' : ''}`}
                                                >
                                                    <td className="px-8 py-5 whitespace-nowrap">
                                                        <div className="flex flex-col">
                                                            <span className="text-[11px] font-black text-neutral-800 tracking-tight">{format(new Date(log.createdAt), "dd MMM yyyy")}</span>
                                                            <span className="text-[9px] font-bold text-neutral-400 uppercase">{format(new Date(log.createdAt), "HH:mm:ss")}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-center">
                                                        <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border shadow-sm transition-transform group-hover:scale-105 ${
                                                            isSensitive(log.action) 
                                                            ? 'bg-rose-50 text-rose-600 border-rose-200' 
                                                            : 'bg-indigo-50 text-indigo-600 border-indigo-200'
                                                        }`}>
                                                            {log.action}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400 border border-neutral-200 group-hover:bg-white group-hover:border-amber-200 transition-colors">
                                                                <FiUser size={14} />
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-[11px] font-black text-neutral-700 leading-none">{log.actorName || log.actorId}</span>
                                                                <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mt-1 bg-neutral-100 px-1.5 py-0.5 rounded w-fit">{log.actorRole}</span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-5 text-[11px] font-black text-neutral-500 italic uppercase tracking-tighter">
                                                        {log.entityType}
                                                    </td>
                                                    <td className="px-8 py-5 text-[11px] font-bold text-neutral-600 max-w-xs truncate italic">
                                                        "{log.summary}"
                                                    </td>
                                                </tr>
                                                {expandedLog === log.id && (
                                                    <tr className="bg-amber-50/10 border-b border-amber-100 animate-fadeIn">
                                                        <td colSpan="5" className="px-12 py-8">
                                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                                                <div>
                                                                    <h4 className="text-[10px] font-black text-amber-800 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                                        <FiInfo size={14} /> Audit Trail Detail (Metadata)
                                                                    </h4>
                                                                    <div className="space-y-4">
                                                                        <div className="p-5 bg-white border border-amber-100 rounded-[24px] shadow-inner">
                                                                            <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest mb-3">Local Payload Sync</p>
                                                                            <pre className="text-[10px] font-mono text-neutral-600 bg-neutral-50/50 p-4 rounded-xl overflow-x-auto border border-neutral-100">
                                                                                {JSON.stringify(log.metadata || {}, null, 2)}
                                                                            </pre>
                                                                        </div>
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <div className="p-4 bg-white border border-neutral-100 rounded-2xl">
                                                                                <p className="text-[8px] font-black text-neutral-400 uppercase mb-1 tracking-widest">Entity UUID</p>
                                                                                <p className="text-[9px] font-mono font-bold text-neutral-700 break-all">{log.entityId}</p>
                                                                            </div>
                                                                            <div className="p-4 bg-white border border-neutral-100 rounded-2xl">
                                                                                <p className="text-[8px] font-black text-neutral-400 uppercase mb-1 tracking-widest">Actor UUID</p>
                                                                                <p className="text-[9px] font-mono font-bold text-neutral-700 break-all">{log.actorId}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-col justify-center text-center p-10 bg-white rounded-[32px] border-2 border-dashed border-neutral-200">
                                                                    <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center border-2 ${isSensitive(log.action) ? 'bg-rose-50 border-rose-100 text-rose-500' : 'bg-neutral-50 border-neutral-100 text-neutral-300'}`}>
                                                                        <FiLock size={32} />
                                                                    </div>
                                                                    <h5 className="text-[11px] font-black text-neutral-800 uppercase tracking-widest mb-2">Sensitivity Classification</h5>
                                                                    <p className="text-[10px] text-neutral-500 font-bold leading-relaxed italic uppercase tracking-tighter">
                                                                        {isSensitive(log.action) 
                                                                            ? "Aksi ini terklasifikasi SENSITIF karena memodifikasi integritas data inti (Audit/Financial/SOT) dalam simulasi ini." 
                                                                            : "Aksi ini terklasifikasi STANDAR sebagai bagian dari log operasional harian simulasi RKK."}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-8 py-32 text-center bg-neutral-50/30">
                                                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-neutral-200 mx-auto mb-6 border-2 border-dashed border-neutral-200 shadow-sm">
                                                        <FiActivity size={40} />
                                                    </div>
                                                    <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest">Audit Trail Kosong</h3>
                                                    <p className="text-[10px] text-neutral-400 italic mt-2 uppercase font-bold tracking-tighter">Belum ada jejak aktivitas lokal yang tercatat dalam database sesi ini.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-8 animate-fadeIn">
                            {requests.length > 0 ? requests.map((req) => (
                                <div key={req.id} className="bg-white rounded-[40px] p-8 border border-neutral-100 shadow-xl border-l-8 border-l-amber-500 group hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-50 rounded-full opacity-50 blur-3xl group-hover:bg-amber-100 transition-colors"></div>
                                    
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                                        <div className="flex gap-6">
                                            <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner border border-amber-100 shrink-0">
                                                <FiUser size={32} />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-xl font-black text-neutral-800 uppercase tracking-tighter">Pengajuan Profil: {req.fieldName}</h3>
                                                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border shadow-sm ${
                                                        req.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                                                        req.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 
                                                        'bg-rose-50 text-rose-600 border-rose-200'
                                                    }`}>
                                                        {req.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <span className="text-[9px] font-black text-neutral-400 bg-neutral-100 px-3 py-1 rounded-full uppercase tracking-widest border border-neutral-200">ID: {req.targetId}</span>
                                                    <span className="text-[9px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest border border-amber-100">Role: {req.targetRole}</span>
                                                </div>
                                                
                                                <div className="flex flex-col md:flex-row gap-6 p-6 bg-neutral-50/50 rounded-[32px] border border-neutral-100 shadow-inner">
                                                    <div className="flex-1">
                                                        <span className="block text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-2 italic">Current Value (Lama)</span>
                                                        <div className="p-4 bg-white rounded-2xl border border-neutral-100 text-xs font-bold text-neutral-400 line-through decoration-rose-300 decoration-2">
                                                            {req.oldValue || "(Kosong)"}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-center">
                                                        <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20 rotate-90 md:rotate-0">
                                                            <FiCheckCircle size={20} />
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="block text-[9px] font-black text-emerald-600 uppercase tracking-widest mb-2 italic">Proposed Value (Baru)</span>
                                                        <div className="p-4 bg-white rounded-2xl border border-emerald-100 text-xs font-black text-neutral-800 shadow-sm">
                                                            {req.newValue}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center gap-4 pt-2">
                                                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase tracking-tighter bg-white px-4 py-2 rounded-xl border border-neutral-100">
                                                        <FiClock className="text-amber-500" />
                                                        <span>{format(new Date(req.createdAt), "dd MMM yyyy, HH:mm")}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase tracking-tighter bg-white px-4 py-2 rounded-xl border border-neutral-100">
                                                        <FiInfo className="text-indigo-500" />
                                                        <span>Request by {req.requestedByRole}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {req.status === 'pending' && (
                                            <div className="flex flex-row lg:flex-col gap-4">
                                                <button 
                                                    onClick={() => handleReview(req.id, 'approved')}
                                                    className="flex-1 lg:flex-none p-5 bg-emerald-600 text-white rounded-[24px] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 active:scale-95 flex items-center justify-center group/btn"
                                                    title="Setujui Perubahan"
                                                >
                                                    <FiCheckCircle size={28} className="group-hover/btn:rotate-12 transition-transform" />
                                                </button>
                                                <button 
                                                    onClick={() => handleReview(req.id, 'rejected')}
                                                    className="flex-1 lg:flex-none p-5 bg-rose-50 text-rose-600 rounded-[24px] hover:bg-rose-100 transition-all border border-rose-200 shadow-xl shadow-rose-600/5 active:scale-95 flex items-center justify-center group/btn"
                                                    title="Tolak Perubahan"
                                                >
                                                    <FiXCircle size={28} className="group-hover/btn:rotate-12 transition-transform" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {req.status !== 'pending' && (
                                        <div className="mt-8 p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${req.status === 'approved' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                                                {req.status === 'approved' ? <FiCheckCircle /> : <FiXCircle />}
                                            </div>
                                            <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest italic">
                                                Review: {req.note || "Sudah diproses melalui dashboard superadmin."}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )) : (
                                <div className="bg-white rounded-[40px] flex flex-col items-center justify-center py-32 text-center border-dashed border-2 border-neutral-200 shadow-sm">
                                    <div className="w-24 h-24 bg-neutral-50 rounded-[32px] flex items-center justify-center text-neutral-200 mb-8 border border-neutral-100">
                                        <FiAlertCircle size={48} />
                                    </div>
                                    <h3 className="text-lg font-black text-neutral-300 uppercase tracking-[0.2em]">Antrean Bersih</h3>
                                    <p className="text-[10px] text-neutral-400 italic mt-2 uppercase font-bold tracking-tighter">Tidak ada pengajuan perubahan profil yang memerlukan persetujuan saat ini.</p>
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
