import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useArchitectPersona } from "../../context/ArchitectPersonaContext";
import designRequestService from "../../services/designRequestService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";

const RiwayatDesainArsitekPage = () => {
    const { selectedArchitectId, loading: personaLoading } = useArchitectPersona();
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = async () => {
        if (!selectedArchitectId) return;
        try {
            setLoading(true);
            setError(null);
            const res = await designRequestService.getAssignedRequests(selectedArchitectId);
            if (res.success) {
                // Filter finished/rejected ones
                const historyData = (res.data || []).filter(d => ["approved", "rejected"].includes(d.status));
                setHistory(historyData);
            }
        } catch (err) {
            console.error("Failed to fetch design history:", err);
            setError("Gagal memuat riwayat desain.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedArchitectId]);

    const filteredHistory = history.filter(h => 
        h.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.id?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (personaLoading || loading) {
        return <RoleDataState type="loading" message="Membuka arsip desain..." />;
    }

    if (!selectedArchitectId) {
        return (
            <RolePersonaEmptyState 
                title="Pilih Persona Arsitek Terlebih Dahulu"
                description="Pilih akun Arsitek untuk melihat riwayat desain."
            />
        );
    }

    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Riwayat Desain</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic uppercase tracking-widest">Daftar desain yang telah selesai atau dibatalkan.</p>
                </div>
            </div>

            <div className="dashboard-card min-h-[400px] flex flex-col">
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="flex-1 relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                        <input 
                            type="text" 
                            placeholder="Cari riwayat desain..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                        />
                    </div>
                </div>

                {filteredHistory.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-[var(--dashboard-border)] text-[10px] uppercase font-black tracking-widest text-[var(--dashboard-text-soft)] bg-gray-50/50">
                                    <th className="py-4 px-6">Identitas Desain</th>
                                    <th className="py-4 px-6">Customer</th>
                                    <th className="py-4 px-6">Status Akhir</th>
                                    <th className="py-4 px-6 text-right">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredHistory.map((h) => (
                                    <tr key={h.id} className="border-b border-[var(--dashboard-border)] hover:bg-gray-50/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black uppercase text-slate-400 mb-1">#{h.id.slice(-8).toUpperCase()}</span>
                                                <span className="text-sm font-bold text-[var(--dashboard-text)]">{h.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="text-[10px] font-bold text-[var(--dashboard-text)]">{h.customer?.name || "N/A"}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                                                h.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                                            }`}>
                                                {h.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right text-[10px] font-bold text-[var(--dashboard-text-soft)]">
                                            {new Date(h.updatedAt).toLocaleDateString("id-ID")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-center p-8">
                        <RoleDataState 
                            type="empty"
                            title="Riwayat Kosong"
                            description="Belum ada data riwayat pengerjaan desain di database."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RiwayatDesainArsitekPage;
