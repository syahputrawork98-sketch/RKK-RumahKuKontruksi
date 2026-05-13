import React, { useState, useEffect } from "react";
import { 
    FiSearch, 
    FiTruck, 
    FiUser, 
    FiUserCheck, 
    FiShield, 
    FiActivity,
    FiInfo,
    FiPackage,
    FiClock
} from "react-icons/fi";
import materialRequestService from "../../services/materialRequestService";
import RoleDataState from "../../components/common/RoleDataState";
import StatusBadge from "../../components/common/StatusBadge";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

const MonitoringMaterialGlobalPage = () => {
    const { selectedSuperadminId } = useSuperadminPersona();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (selectedSuperadminId) {
            fetchData();
        }
    }, [selectedSuperadminId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await materialRequestService.getAllRequests();
            if (response.success) {
                setRequests(response.data || []);
            }
        } catch (err) {
            console.error("MonitoringMaterialGlobalPage: Error fetching requests:", err);
            setError("Gagal memuat data monitoring material.");
        } finally {
            setLoading(false);
        }
    };

    const filteredRequests = (requests || []).filter(r => 
        (r.requestCode || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.project?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.foreman?.name || "").toLowerCase().includes(searchQuery.toLowerCase())
    );


    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk memonitor material." />;
    }

    if (loading) return <RoleDataState type="loading" message="Menganalisis arus material global..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        MONITORING <span className="text-blue-600 uppercase">Material Request</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Log monitoring permintaan material dari seluruh proyek aktif (Read-Only).
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <FiPackage className="text-blue-500" size={14} />
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Monitoring Flow</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                <input 
                    type="text" 
                    placeholder="Cari kode request, proyek, atau mandor..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
            </div>

            {/* TABLE */}
            <div className="dashboard-card overflow-hidden">
                {filteredRequests.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)] bg-gray-50/50">
                                    <th className="py-4 px-6">Identitas Request</th>
                                    <th className="py-4 px-6">Proyek & Lokasi</th>
                                    <th className="py-4 px-6">Pihak Terlibat</th>
                                    <th className="py-4 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRequests.map((r) => (
                                    <tr key={r.id} className="border-b border-[var(--dashboard-border)] hover:bg-blue-50/20 transition-colors">
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs font-black text-blue-600 tracking-tighter">
                                                    #{r.requestCode || "REQ-???"}
                                                </span>
                                                <div className="flex items-center gap-2 text-[10px] text-[var(--dashboard-text-soft)] font-bold">
                                                    <FiClock size={10} />
                                                    <span>{new Date(r.createdAt).toLocaleDateString("id-ID")}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-[var(--dashboard-text)]">{r.project?.name || "N/A"}</span>
                                                <span className="text-[10px] text-[var(--dashboard-text-soft)] truncate max-w-[150px]">
                                                    {r.project?.location || "-"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-1.5 text-[10px]">
                                                    <FiUserCheck className="text-amber-500" size={12} />
                                                    <span className="font-bold">{r.foreman?.name || "-"}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px]">
                                                    <FiShield className="text-emerald-500" size={12} />
                                                    <span className="font-bold">{r.supervisor?.name || "-"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-6 px-6">
                                            <StatusBadge type="material" status={r.status} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <RoleDataState 
                        type="empty" 
                        title="Tidak Ada Data Material" 
                        message="Belum ada pengajuan material yang terdeteksi di sistem lokal." 
                    />
                )}
            </div>

            {/* INFO */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FiInfo className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="font-black text-lg tracking-tight mb-1">Integritas Rantai Pasok</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">
                        Superadmin memonitor arus material untuk mendeteksi anomali permintaan yang melebihi estimasi RAB. Otorisasi persetujuan tetap berada di bawah kendali <strong>Pengawas</strong> dan <strong>Admin Operasional</strong> untuk menjaga kecepatan distribusi di lapangan.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MonitoringMaterialGlobalPage;
