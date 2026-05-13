import React, { useState, useEffect } from "react";
import { FiInfo, FiLayers, FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useForemanPersona } from "../../context/ForemanPersonaContext";
import projectService from "../../services/projectService";
import projectStageService from "../../services/projectStageService";
import RolePersonaEmptyState from "../../components/common/RolePersonaEmptyState";
import RoleDataState from "../../components/common/RoleDataState";
import { motion, AnimatePresence } from "framer-motion";

const MandorRabInfoPage = () => {
    const { selectedForemanId } = useForemanPersona();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [project, setProject] = useState(null);
    const [stages, setStages] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (selectedForemanId) {
            fetchRabData();
        }
    }, [selectedForemanId]);

    const fetchRabData = async () => {
        try {
            setLoading(true);
            // Fetch projects for this mandor
            const projRes = await projectService.getProjects({ foremanId: selectedForemanId });
            const activeProj = projRes.data?.find(p => p.status === "Berjalan") || projRes.data?.[0];
            
            if (activeProj) {
                setProject(activeProj);
                const stagesRes = await projectStageService.getStagesByProject(activeProj.id);
                setStages(stagesRes.data || []);
            }
            setLoading(false);
        } catch (err) {
            setError(err.message || "Gagal memuat data RAB");
            setLoading(false);
        }
    };

    const toggleCategory = (id) => {
        setExpandedCategory(expandedCategory === id ? null : id);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    if (!selectedForemanId) {
        return <RolePersonaEmptyState title="Pilih Persona Mandor" description="Pilih mandor untuk melihat data RAB Proyek." />;
    }

    if (loading) return <RoleDataState type="loading" message="Memuat data RAB..." />;
    if (error) return <RoleDataState type="error" title={error} onRetry={fetchRabData} />;
    if (!project) return <RoleDataState type="empty" title="Tidak Ada Proyek Aktif" description="Anda tidak memiliki proyek aktif yang ditugaskan saat ini." />;

    const filteredStages = stages.filter(stg => 
        stg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stg.rabItems?.some(item => item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalRab = stages.reduce((sum, stg) => {
        const stageTotal = stg.rabItems?.reduce((s, item) => s + Number(item.total || 0), 0) || 0;
        return sum + stageTotal;
    }, 0);

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">RAB & Scope Mandor</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Daftar volume dan uraian pekerjaan resmi sesuai kontrak proyek.</p>
                </div>
                <div className="bg-white px-6 py-3 rounded-2xl border border-[var(--dashboard-border)] shadow-sm">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Nilai RAB</p>
                    <p className="text-lg font-black text-[var(--dashboard-primary)]">{formatCurrency(totalRab)}</p>
                </div>
            </div>

            <div className="dashboard-card bg-blue-50/30 border-blue-100 flex items-start gap-4">
                <FiInfo className="text-blue-500 mt-1 shrink-0" />
                <div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-700 mb-1">Mode Baca (Read-only)</h4>
                    <p className="text-[11px] text-blue-600 font-medium leading-relaxed italic">
                        Halaman ini menampilkan data acuan volume untuk pelaksanaan di lapangan. Perubahan volume atau uraian pekerjaan hanya dapat dilakukan oleh Admin melalui mekanisme Addendum/Change Order.
                    </p>
                </div>
            </div>

            <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Cari uraian pekerjaan atau kategori..." 
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:ring-2 focus:ring-[var(--dashboard-primary)]/20 outline-none transition-all shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="space-y-4">
                {filteredStages.map((stg) => {
                    const isExpanded = expandedCategory === stg.id;
                    const items = stg.rabItems || [];
                    const stageSubtotal = items.reduce((sum, item) => sum + Number(item.total || 0), 0);

                    return (
                        <div key={stg.id} className="bg-white rounded-[2.5rem] border border-[var(--dashboard-border)] shadow-sm overflow-hidden">
                            <div 
                                className={`p-6 flex items-center justify-between cursor-pointer transition-colors ${isExpanded ? 'bg-slate-50' : 'hover:bg-slate-50/50'}`}
                                onClick={() => toggleCategory(stg.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 shadow-sm">
                                        <FiLayers size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black text-slate-800">{stg.title}</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{items.length} Item Pekerjaan • Subtotal: {formatCurrency(stageSubtotal)}</p>
                                    </div>
                                </div>
                                {isExpanded ? <FiChevronUp className="text-slate-400" /> : <FiChevronDown className="text-slate-400" />}
                            </div>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-slate-50"
                                    >
                                        <div className="p-6 overflow-x-auto">
                                            <table className="w-full text-left border-collapse">
                                                <thead>
                                                    <tr className="border-b border-slate-100">
                                                        <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">Uraian</th>
                                                        <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center px-2">Sat</th>
                                                        <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center px-2">Vol</th>
                                                        <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right px-2">Harga</th>
                                                        <th className="pb-4 text-[9px] font-black text-slate-400 uppercase tracking-widest text-right px-2">Jumlah</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-slate-50">
                                                    {items.map((item) => (
                                                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                                            <td className="py-4 px-2">
                                                                <p className="text-xs font-bold text-slate-700">{item.description}</p>
                                                            </td>
                                                            <td className="py-4 px-2 text-center">
                                                                <span className="text-[10px] font-black text-slate-500 uppercase">{item.unit}</span>
                                                            </td>
                                                            <td className="py-4 px-2 text-center">
                                                                <span className="text-xs font-black text-slate-800">{Number(item.volume)}</span>
                                                            </td>
                                                            <td className="py-4 px-2 text-right">
                                                                <span className="text-[11px] font-bold text-slate-500">{formatCurrency(Number(item.unitPrice))}</span>
                                                            </td>
                                                            <td className="py-4 px-2 text-right">
                                                                <span className="text-xs font-black text-slate-800">{formatCurrency(Number(item.total))}</span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}

                {filteredStages.length === 0 && (
                    <div className="py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
                        <p className="text-sm font-bold text-slate-400 italic">Tidak ada data RAB yang cocok dengan pencarian.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MandorRabInfoPage;
