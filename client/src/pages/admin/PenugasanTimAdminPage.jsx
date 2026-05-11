import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
    FiUsers, 
    FiSearch, 
    FiSave, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiUser, 
    FiFilter,
    FiExternalLink,
    FiInfo,
    FiClock
} from "react-icons/fi";
import { Link } from "react-router-dom";
import projectService from "../../services/projectService";
import adminService from "../../services/adminService";
import supervisorService from "../../services/supervisorService";
import foremanService from "../../services/foremanService";
import RoleDataState from "../../components/common/RoleDataState";
import { useAdminPersona } from "../../context/AdminPersonaContext";
import { 
    getLatestMandorPreparation, 
    getLatestConstructionReadiness 
} from "../../utils/designRequestHistory";

const PenugasanTimAdminPage = () => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const { selectedAdminId } = useAdminPersona();
    
    const [projects, setProjects] = useState([]);
    const [options, setOptions] = useState({
        admins: [],
        supervisors: [],
        foremen: []
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("planning"); // planning, active, all

    // Assignment State
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [assignment, setAssignment] = useState({
        adminId: "",
        supervisorId: "",
        foremanId: ""
    });

    const fetchInitialData = useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            // We fetch all projects to allow assigning unassigned projects to the current admin
            const [projRes, admRes, supRes, forRes] = await Promise.all([
                projectService.getProjects(), 
                adminService.getAdmins(),
                supervisorService.getAllSupervisors(),
                foremanService.getAllForemen()
            ]);

            setProjects(projRes.data || []);
            setOptions({
                admins: admRes.data || [],
                supervisors: supRes.data || [],
                foremen: forRes.data || []
            });
            setLoading(false);
        } catch (err) {
            console.error("Error fetching assignment data:", err);
            setError("Gagal memuat data penugasan. Pastikan server backend berjalan.");
            setLoading(false);
        }
    }, [selectedAdminId]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const handleProjectSelect = async (id) => {
        try {
            setSelectedProjectId(id);
            const res = await projectService.getProjectById(id);
            const project = res.data;
            
            setAssignment({
                adminId: project.adminId || "",
                supervisorId: project.supervisorId || "",
                foremanId: project.foremanId || ""
            });
        } catch (err) {
            console.error("Error fetching project detail:", err);
            alert("Gagal memuat detail proyek.");
        }
    };

    const handleSaveAssignment = async (e) => {
        e.preventDefault();
        if (!selectedProjectId) {
            alert("Pilih proyek terlebih dahulu.");
            return;
        }

        try {
            setSubmitting(true);
            const payload = {
                adminId: assignment.adminId || null,
                supervisorId: assignment.supervisorId || null,
                foremanId: assignment.foremanId || null
            };

            await projectService.updateProjectAssignment(selectedProjectId, payload);
            alert("Penugasan Berhasil Diperbarui!");
            
            // Refresh local projects data
            fetchInitialData();
        } catch (err) {
            console.error("Error saving assignment:", err);
            alert("Gagal memperbarui penugasan: " + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    const filteredProjects = useMemo(() => {
        return projects.filter(p => {
            const matchesSearch = 
                p.projectCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase());
            
            const isPlanning = p.status === 'planning' || p.status === 'Persiapan';
            const isOngoing = p.status === 'Berjalan' || p.status === 'active' || p.status === 'ongoing';

            if (activeTab === 'planning') return matchesSearch && isPlanning;
            if (activeTab === 'active') return matchesSearch && isOngoing;
            return matchesSearch;
        });
    }, [projects, searchQuery, activeTab]);

    const selectedProject = useMemo(() => 
        projects.find(p => p.id === selectedProjectId), 
    [projects, selectedProjectId]);

    // Get shortlist references from design request history
    const shortlistRef = useMemo(() => {
        if (!selectedProject || !selectedProject.designRequests || selectedProject.designRequests.length === 0) return null;
        
        const dr = selectedProject.designRequests[0];
        const history = dr.history || [];
        
        const mandorPrep = getLatestMandorPreparation(history);
        const readinessPrep = getLatestConstructionReadiness(history);
        
        return {
            mandorIds: mandorPrep?.metadata?.selectedCandidateIds || [],
            mandorNote: mandorPrep?.note || "",
            supervisorIds: readinessPrep?.metadata?.selectedSupervisorCandidateIds || [],
            readinessNote: readinessPrep?.note || ""
        };
    }, [selectedProject]);

    if (!selectedAdminId) {
        return <RoleDataState type="empty" message="Pilih Admin persona terlebih dahulu di Topbar." />;
    }

    if (loading) return <RoleDataState type="loading" message="Memuat modul penugasan..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchInitialData} />;

    return (
        <div className="animate-fadeIn space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-extrabold tracking-tight">Penugasan Tim Proyek</h2>
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Tugaskan personil Admin, Pengawas, dan Mandor secara final.</p>
                </div>
            </div>

            {/* TAB FILTER */}
            <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
                {[
                    { id: 'planning', label: 'Perlu Penugasan (Planning)', icon: FiClock },
                    { id: 'active', label: 'Proyek Berjalan', icon: FiCheckCircle },
                    { id: 'all', label: 'Semua Proyek', icon: FiFilter }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-widest transition-all border-b-2 ${
                            activeTab === tab.id 
                            ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50' 
                            : 'border-transparent text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <tab.icon size={14} />
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT: PROJECT LIST */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex-1 relative">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                                <input 
                                    type="text" 
                                    placeholder="Cari kode proyek, nama, atau customer..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--dashboard-primary)]/20"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            {filteredProjects.length > 0 ? (
                                <table className="w-full text-left border-collapse text-[11px]">
                                    <thead>
                                        <tr className="border-b border-[var(--dashboard-border)]">
                                            <th className="pb-4 font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                            <th className="pb-4 font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                            <th className="pb-4 font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Alokasi Tim</th>
                                            <th className="pb-4 font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProjects.map((p) => (
                                            <tr 
                                                key={p.id} 
                                                onClick={() => handleProjectSelect(p.id)}
                                                className={`
                                                    border-b border-[var(--dashboard-border)] cursor-pointer transition-all
                                                    ${selectedProjectId === p.id ? "bg-indigo-50/50" : "hover:bg-[var(--dashboard-surface-soft)]/50"}
                                                `}
                                            >
                                                <td className="py-4 px-2">
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-indigo-600 uppercase tracking-tighter">{p.projectCode}</span>
                                                        <span className="font-bold truncate max-w-[150px]">{p.name}</span>
                                                        <span className="text-[9px] text-[var(--dashboard-text-soft)] font-bold italic">{p.customer?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase border ${
                                                        p.status === 'planning' || p.status === 'Persiapan'
                                                        ? 'bg-amber-50 border-amber-200 text-amber-600'
                                                        : 'bg-emerald-50 border-emerald-200 text-emerald-600'
                                                    }`}>
                                                        {p.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-2">
                                                    <div className="flex flex-col gap-1">
                                                        <AssignmentBadge role="ADM" name={options.admins.find(a => a.id === p.adminId)?.name} color="blue" />
                                                        <AssignmentBadge role="SUP" name={options.supervisors.find(s => s.id === p.supervisorId)?.name} color="purple" />
                                                        <AssignmentBadge role="FOR" name={options.foremen.find(f => f.id === p.foremanId)?.name} color="orange" />
                                                    </div>
                                                </td>
                                                <td className="py-4 px-2 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                                                                selectedProjectId === p.id ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"
                                                            }`}
                                                        >
                                                            Pilih
                                                        </button>
                                                        <Link to={`/admin/proyek/${p.id}`} className="p-2 text-gray-300 hover:text-indigo-600 transition-all">
                                                            <FiExternalLink size={14} />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <RoleDataState type="empty" message={`Tidak ada proyek ${activeTab === 'all' ? '' : activeTab} ditemukan.`} />
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT: ASSIGNMENT FORM */}
                <div className="space-y-6">
                    <div className="dashboard-card sticky top-6">
                        <div className="flex items-center gap-2 mb-6">
                            <FiUsers className="text-indigo-600" />
                            <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-800">Panel Penugasan Final</h3>
                        </div>
                        
                        {selectedProjectId ? (
                            <form onSubmit={handleSaveAssignment} className="space-y-6 animate-fadeIn">
                                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl mb-4">
                                    <p className="text-[9px] font-black uppercase text-indigo-400 tracking-widest mb-1">Target Project</p>
                                    <h4 className="text-xs font-black text-indigo-700">
                                        {selectedProject?.projectCode} - {selectedProject?.name}
                                    </h4>
                                </div>

                                {/* SHORTLIST REFERENCES */}
                                {shortlistRef && (
                                    <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-2xl space-y-3">
                                        <div className="flex items-center gap-2 text-amber-700">
                                            <FiInfo size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-widest">Referensi Persiapan Desain</span>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="text-[9px] text-amber-800 font-medium leading-relaxed">
                                                <b className="block uppercase text-[8px] opacity-70">Shortlist Mandor:</b>
                                                {shortlistRef.mandorIds.length > 0 
                                                    ? shortlistRef.mandorIds.map(id => options.foremen.find(f => f.id === id)?.name).filter(Boolean).join(", ")
                                                    : "Belum ada shortlist."}
                                            </div>
                                            <div className="text-[9px] text-amber-800 font-medium leading-relaxed">
                                                <b className="block uppercase text-[8px] opacity-70">Shortlist Pengawas:</b>
                                                {shortlistRef.supervisorIds.length > 0 
                                                    ? shortlistRef.supervisorIds.map(id => options.supervisors.find(s => s.id === id)?.name).filter(Boolean).join(", ")
                                                    : "Belum ada shortlist."}
                                            </div>
                                            <p className="text-[8px] italic text-amber-600">* Persiapan desain hanya referensi, pilih personil final di bawah.</p>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiUser /> Admin Penanggung Jawab
                                        </label>
                                        <select 
                                            className="dashboard-input text-xs"
                                            value={assignment.adminId}
                                            onChange={(e) => setAssignment({...assignment, adminId: e.target.value})}
                                        >
                                            <option value="">-- Pilih Admin --</option>
                                            {options.admins.map(a => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiUsers className="text-purple-600" /> Pengawas Final
                                        </label>
                                        <select 
                                            className="dashboard-input text-xs border-purple-100"
                                            value={assignment.supervisorId}
                                            onChange={(e) => setAssignment({...assignment, supervisorId: e.target.value})}
                                        >
                                            <option value="">-- Pilih Pengawas --</option>
                                            {options.supervisors.map(s => (
                                                <option key={s.id} value={s.id}>{s.name} ({s.city || 'Nasional'})</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiUsers className="text-orange-600" /> Mandor Final
                                        </label>
                                        <select 
                                            className="dashboard-input text-xs border-orange-100"
                                            value={assignment.foremanId}
                                            onChange={(e) => setAssignment({...assignment, foremanId: e.target.value})}
                                        >
                                            <option value="">-- Pilih Mandor --</option>
                                            {options.foremen.map(f => (
                                                <option key={f.id} value={f.id}>{f.name} ({f.specialization || 'Umum'})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="p-3 bg-gray-50 border border-gray-100 rounded-xl space-y-2">
                                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Governance Notice:</p>
                                    <div className="flex items-start gap-2 text-[9px] text-gray-500 font-medium">
                                        <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-500" />
                                        <span>Penugasan ini tidak mengaktifkan proyek.</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-[9px] text-gray-500 font-medium">
                                        <FiCheckCircle className="mt-0.5 shrink-0 text-emerald-500" />
                                        <span>Status proyek tetap 'planning' hingga aktivasi manual.</span>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className={`
                                        w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-600/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2
                                        ${submitting ? "opacity-50 cursor-not-allowed" : ""}
                                    `}
                                >
                                    <FiSave />
                                    {submitting ? "Menyimpan..." : "Simpan Penugasan Tim"}
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center opacity-30">
                                <FiUsers size={48} className="mb-4" />
                                <p className="text-[10px] font-black leading-relaxed px-6 uppercase tracking-widest">
                                    Pilih proyek dari daftar untuk mengelola penugasan tim lapangan.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AssignmentBadge = ({ role, name, color }) => {
    const colors = {
        blue: "text-blue-600 bg-blue-50 border-blue-100",
        purple: "text-purple-600 bg-purple-50 border-purple-100",
        orange: "text-orange-600 bg-orange-50 border-orange-100"
    };

    return (
        <div className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-lg border text-[9px] font-bold ${colors[color]}`}>
            <span className="opacity-50 font-black">{role}:</span>
            <span className="truncate max-w-[80px]">{name || "-"}</span>
        </div>
    );
};

export default PenugasanTimAdminPage;
