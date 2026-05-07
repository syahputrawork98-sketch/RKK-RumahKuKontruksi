import React, { useState } from "react";
import { FiUsers, FiUserPlus, FiActivity, FiTool } from "react-icons/fi";

import React, { useState, useEffect } from "react";
import { FiUsers, FiUserPlus, FiActivity, FiTool, FiCheckCircle, FiClock } from "react-icons/fi";
import projectService from "../../services/projectService";
import supervisorService from "../../services/supervisorService";
import foremanService from "../../services/foremanService";
import RoleDataState from "../../components/common/RoleDataState";

const PenugasanTimAdminPage = () => {
    const [activeSubtab, setActiveSubtab] = useState("semua");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        projects: [],
        supervisors: [],
        foremen: []
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [prjRes, supRes, forRes] = await Promise.all([
                projectService.getProjects(),
                supervisorService.getAllSupervisors(),
                foremanService.getAllForemen()
            ]);

            setData({
                projects: prjRes.data || [],
                supervisors: supRes.data || [],
                foremen: forRes.data || []
            });
            setLoading(false);
        } catch (err) {
            console.error("Error fetching team assignment data:", err);
            setError("Gagal memuat data penugasan tim.");
            setLoading(false);
        }
    };

    const subtabs = [
        { id: "semua", label: "Semua Proyek" },
        { id: "belum-ditugaskan", label: "Belum Lengkap" },
        { id: "sudah-ditugaskan", label: "Lengkap" },
    ];

    if (loading) return <RoleDataState type="loading" message="Memuat data penugasan tim..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    const { projects, supervisors, foremen } = data;

    // Filter projects based on active subtab
    const filteredProjects = projects.filter(p => {
        if (activeSubtab === "semua") return true;
        const isComplete = p.supervisorId && p.foremanId;
        if (activeSubtab === "belum-ditugaskan") return !isComplete;
        if (activeSubtab === "sudah-ditugaskan") return isComplete;
        return true;
    });

    // Capacity Stats
    const assignedSupervisors = new Set(projects.map(p => p.supervisorId).filter(id => id)).size;
    const assignedForemen = new Set(projects.map(p => p.foremanId).filter(id => id)).size;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Penugasan Tim</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Manajemen penugasan Pengawas dan Mandor pada setiap proyek.</p>
                </div>
            </div>

            {/* SUBTABS */}
            <div className="flex items-center gap-2 border-b border-[var(--dashboard-border)] pb-0">
                {subtabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSubtab(tab.id)}
                        className={`px-6 py-3 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
                            activeSubtab === tab.id 
                            ? "text-[var(--dashboard-primary)] border-[var(--dashboard-primary)]" 
                            : "text-[var(--dashboard-text-soft)] border-transparent hover:text-[var(--dashboard-text)] hover:border-[var(--dashboard-border)]"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-sm">Status Penugasan Proyek</h3>
                        </div>
                        <div className="overflow-x-auto">
                            {filteredProjects.length > 0 ? (
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-[var(--dashboard-border)]">
                                            <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                            <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Pengawas</th>
                                            <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Mandor</th>
                                            <th className="pb-4 font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProjects.map(p => (
                                            <tr key={p.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                                <td className="py-4 px-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black">{p.projectCode}</span>
                                                        <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold">{p.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2">
                                                    {p.supervisor ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded bg-purple-500/10 flex items-center justify-center text-purple-500"><FiActivity size={12} /></div>
                                                            <span className="text-xs font-bold">{p.supervisor.name}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter">Belum Ditugaskan</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-2">
                                                    {p.foreman ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded bg-orange-500/10 flex items-center justify-center text-orange-500"><FiTool size={12} /></div>
                                                            <span className="text-xs font-bold">{p.foreman.name}</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-[10px] font-bold text-amber-500 uppercase tracking-tighter">Belum Ditugaskan</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-2 text-right">
                                                    <a href={`/admin/proyek/${p.id}`} className="text-[10px] font-black text-[var(--dashboard-primary)] hover:underline uppercase">Edit</a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <RoleDataState type="empty" message="Tidak ada proyek untuk kriteria ini." />
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="dashboard-card">
                        <h3 className="font-bold text-xs uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-4">Availability</h3>
                        <div className="space-y-4">
                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-2">Pengawas ({assignedSupervisors}/{supervisors.length} Terpakai)</p>
                                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500" style={{ width: `${(assignedSupervisors/supervisors.length)*100}%` }} />
                                </div>
                            </div>
                            <div className="p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                                <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-2">Mandor ({assignedForemen}/{foremen.length} Terpakai)</p>
                                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500" style={{ width: `${(assignedForemen/foremen.length)*100}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="dashboard-card bg-emerald-500 text-white">
                        <div className="flex gap-3">
                            <FiCheckCircle size={24} className="shrink-0" />
                            <div>
                                <h4 className="text-xs font-bold uppercase">Database Terhubung</h4>
                                <p className="text-[10px] mt-1 opacity-90 leading-relaxed">Seluruh penugasan tim disinkronkan secara real-time dengan data master Pengawas & Mandor.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PenugasanTimAdminPage;
