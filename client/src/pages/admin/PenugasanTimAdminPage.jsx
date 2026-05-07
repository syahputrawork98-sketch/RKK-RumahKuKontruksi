import React, { useState, useEffect } from "react";
import { 
    FiUsers, 
    FiSearch, 
    FiSave, 
    FiCheckCircle, 
    FiAlertCircle, 
    FiUser, 
    FiFilter,
    FiExternalLink
} from "react-icons/fi";
import { Link } from "react-router-dom";
import projectService from "../../services/projectService";
import adminService from "../../services/adminService";
import supervisorService from "../../services/supervisorService";
import foremanService from "../../services/foremanService";
import RoleDataState from "../../components/common/RoleDataState";
import { useAdminPersona } from "../../context/AdminPersonaContext";

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

    // Assignment State
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [assignment, setAssignment] = useState({
        adminId: "",
        supervisorId: "",
        foremanId: ""
    });

    useEffect(() => {
        if (selectedAdminId) {
            fetchInitialData();
        }
    }, [selectedAdminId]);

    const fetchInitialData = async () => {
        try {
            setLoading(true);
            const [projRes, admRes, supRes, forRes] = await Promise.all([
                projectService.getProjects({ adminId: selectedAdminId }),
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
    };

    const handleProjectSelect = (id) => {
        const project = projects.find(p => p.id === id);
        setSelectedProjectId(id);
        if (project) {
            setAssignment({
                adminId: project.adminId || "",
                supervisorId: project.supervisorId || "",
                foremanId: project.foremanId || ""
            });
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

    const filteredProjects = projects.filter(p => 
        p.projectCode?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    <p className="text-xs text-[var(--dashboard-text-soft)] mt-1 italic">Alokasikan personil Admin, Pengawas, dan Mandor ke proyek aktif.</p>
                </div>
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
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-[var(--dashboard-border)]">
                                            <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Proyek</th>
                                            <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Admin / Pengawas / Mandor</th>
                                            <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProjects.map((p) => (
                                            <tr 
                                                key={p.id} 
                                                onClick={() => handleProjectSelect(p.id)}
                                                className={`
                                                    border-b border-[var(--dashboard-border)] cursor-pointer transition-all
                                                    ${selectedProjectId === p.id ? "bg-blue-50/50" : "hover:bg-[var(--dashboard-surface-soft)]/50"}
                                                `}
                                            >
                                                <td className="py-4 px-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-black text-[var(--dashboard-primary)]">{p.projectCode}</span>
                                                        <span className="text-sm font-bold truncate max-w-[200px]">{p.name}</span>
                                                        <span className="text-[10px] text-[var(--dashboard-text-soft)] font-bold">{p.customer?.name}</span>
                                                    </div>
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
                                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                                                selectedProjectId === p.id ? "bg-[var(--dashboard-primary)] text-white" : "bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-text-soft)]"
                                                            }`}
                                                        >
                                                            Pilih
                                                        </button>
                                                        <Link to={`/admin/proyek/${p.id}`} className="p-2 text-[var(--dashboard-text-soft)] hover:text-[var(--dashboard-primary)]">
                                                            <FiExternalLink size={14} />
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <RoleDataState type="empty" message="Tidak ada proyek ditemukan." />
                            )}
                        </div>
                    </div>
                </div>

                {/* RIGHT: ASSIGNMENT FORM */}
                <div className="space-y-6">
                    <div className="dashboard-card sticky top-6">
                        <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)] mb-6">Panel Penugasan</h3>
                        
                        {selectedProjectId ? (
                            <form onSubmit={handleSaveAssignment} className="space-y-6 animate-fadeIn">
                                <div className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] mb-4">
                                    <p className="text-[10px] font-black uppercase text-[var(--dashboard-text-soft)] mb-1">Proyek Terpilih</p>
                                    <h4 className="text-sm font-black text-[var(--dashboard-primary)]">
                                        {projects.find(p => p.id === selectedProjectId)?.projectCode} - {projects.find(p => p.id === selectedProjectId)?.name}
                                    </h4>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiUser /> Admin Penanggung Jawab
                                        </label>
                                        <select 
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                            value={assignment.adminId}
                                            onChange={(e) => setAssignment({...assignment, adminId: e.target.value})}
                                        >
                                            <option value="">Belum Ditugaskan</option>
                                            {options.admins.map(a => (
                                                <option key={a.id} value={a.id}>{a.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiUsers /> Pengawas (Supervisor)
                                        </label>
                                        <select 
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                            value={assignment.supervisorId}
                                            onChange={(e) => setAssignment({...assignment, supervisorId: e.target.value})}
                                        >
                                            <option value="">Belum Ditugaskan</option>
                                            {options.supervisors.map(s => (
                                                <option key={s.id} value={s.id}>{s.name} ({s.status})</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                                            <FiUsers /> Mandor (Foreman)
                                        </label>
                                        <select 
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                            value={assignment.foremanId}
                                            onChange={(e) => setAssignment({...assignment, foremanId: e.target.value})}
                                        >
                                            <option value="">Belum Ditugaskan</option>
                                            {options.foremen.map(f => (
                                                <option key={f.id} value={f.id}>{f.name} ({f.status})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={submitting}
                                    className={`
                                        w-full py-4 bg-[var(--dashboard-primary)] text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2
                                        ${submitting ? "opacity-50 cursor-not-allowed" : ""}
                                    `}
                                >
                                    <FiSave />
                                    {submitting ? "Menyimpan..." : "Simpan Penugasan"}
                                </button>
                            </form>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center opacity-50 grayscale">
                                <FiUsers size={48} className="mb-4" />
                                <p className="text-xs font-bold leading-relaxed px-6 text-[var(--dashboard-text-soft)] uppercase tracking-widest">
                                    Pilih proyek dari daftar di sebelah kiri untuk mengelola penugasan tim.
                                </p>
                            </div>
                        )}
                        
                        <div className="mt-8 pt-6 border-t border-[var(--dashboard-border)] space-y-4">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 mb-2">
                                <FiAlertCircle /> Panduan Peran
                            </h4>
                            <div className="space-y-3">
                                <div className="text-[10px] text-amber-700 leading-relaxed font-medium">
                                    <b className="block">Admin Penanggung Jawab</b>
                                    Pemilik proyek di sistem. Proyek hanya muncul di dashboard Admin yang ditugaskan.
                                </div>
                                <div className="text-[10px] text-amber-700 leading-relaxed font-medium">
                                    <b className="block">Pengawas (Supervisor)</b>
                                    Bertanggung jawab melakukan verifikasi progress lapangan dan membuat laporan mingguan.
                                </div>
                                <div className="text-[10px] text-amber-700 leading-relaxed font-medium">
                                    <b className="block">Mandor (Foreman)</b>
                                    Bertanggung jawab mengisi jurnal harian dan request material di lapangan.
                                </div>
                            </div>
                        </div>
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
        <div className={`inline-flex items-center gap-2 px-2 py-0.5 rounded-lg border text-[10px] font-bold ${colors[color]}`}>
            <span className="opacity-50">{role}:</span>
            <span className="truncate max-w-[100px]">{name || "-"}</span>
        </div>
    );
};

export default PenugasanTimAdminPage;
