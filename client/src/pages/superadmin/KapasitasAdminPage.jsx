import React, { useState, useEffect } from "react";
import { 
    FiSearch, 
    FiBarChart2, 
    FiUser, 
    FiShield, 
    FiActivity,
    FiInfo,
    FiAlertCircle,
    FiCheckCircle
} from "react-icons/fi";
import projectService from "../../services/projectService";
import adminService from "../../services/adminService";
import RoleDataState from "../../components/common/RoleDataState";
import { useSuperadminPersona } from "../../context/SuperadminPersonaContext";

const KapasitasAdminPage = () => {
    const { selectedSuperadminId } = useSuperadminPersona();
    const [admins, setAdmins] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const MAX_CAPACITY = 3;

    useEffect(() => {
        if (selectedSuperadminId) {
            fetchData();
        }
    }, [selectedSuperadminId]);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [adminRes, projectRes] = await Promise.all([
                adminService.getAdmins(),
                projectService.getProjects()
            ]);

            if (adminRes.success && projectRes.success) {
                setAdmins(adminRes.data || []);
                setProjects(projectRes.data || []);
            }
        } catch (err) {
            console.error("KapasitasAdminPage: Error fetching data:", err);
            setError("Gagal memuat data kapasitas admin.");
        } finally {
            setLoading(false);
        }
    };

    const getActiveProjectCount = (adminId) => {
        return projects.filter(p => 
            p.adminId === adminId && 
            ["active", "ongoing", "berjalan"].includes((p.status || "").toLowerCase())
        ).length;
    };

    const filteredAdmins = (admins || []).filter(a => 
        (a.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (a.email || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getCapacityStatus = (count) => {
        if (count === 0) return { label: "Tersedia", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100" };
        if (count < MAX_CAPACITY) return { label: "Parsial", color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-100" };
        return { label: "Penuh", color: "text-rose-500", bg: "bg-rose-50", border: "border-rose-100" };
    };

    if (!selectedSuperadminId) {
        return <RoleDataState type="empty" message="Pilih persona Superadmin untuk memonitor kapasitas." />;
    }

    if (loading) return <RoleDataState type="loading" message="Menganalisis beban kerja Admin..." />;
    if (error) return <RoleDataState type="error" message={error} onRetry={fetchData} />;

    return (
        <div className="animate-fadeIn space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        KAPASITAS <span className="text-blue-600 uppercase">Admin Operasional</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Monitoring beban kerja Admin (Maksimal {MAX_CAPACITY} proyek aktif per Admin).
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200">
                    <FiCheckCircle className="text-blue-500" size={14} />
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Live Tracking</span>
                </div>
            </div>

            {/* SEARCH */}
            <div className="relative max-w-md">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]" />
                <input 
                    type="text" 
                    placeholder="Cari nama admin..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-[var(--dashboard-border)] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
            </div>

            {/* CAPACITY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAdmins.length > 0 ? (
                    filteredAdmins.map((admin) => {
                        const count = getActiveProjectCount(admin.id);
                        const status = getCapacityStatus(count);
                        const percentage = (count / MAX_CAPACITY) * 100;

                        return (
                            <div key={admin.id} className="dashboard-card group">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                            <FiShield size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black text-[var(--dashboard-text)]">{admin.name}</h3>
                                            <p className="text-[10px] text-[var(--dashboard-text-soft)] font-bold">{admin.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${status.bg} ${status.color} ${status.border}`}>
                                        {status.label}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-tighter">
                                        <span className="text-slate-400">Utilisasi Beban Kerja</span>
                                        <span className={status.color}>{count} / {MAX_CAPACITY} Proyek</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-50">
                                        <div 
                                            className={`h-full transition-all duration-1000 ${count >= MAX_CAPACITY ? "bg-rose-500" : "bg-blue-500"}`}
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] italic leading-relaxed">
                                        {count >= MAX_CAPACITY 
                                            ? "Batas maksimal tercapai. Admin tidak dapat menerima penugasan baru." 
                                            : `Tersedia slot untuk ${MAX_CAPACITY - count} proyek konstruksi baru.`}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="col-span-full p-20 text-center flex flex-col items-center justify-center dashboard-card border-dashed">
                        <FiUser size={40} className="text-gray-200 mb-4" />
                        <h3 className="text-lg font-black text-[var(--dashboard-text)] mb-2">Admin Tidak Ditemukan</h3>
                        <p className="text-sm text-[var(--dashboard-text-soft)] italic">
                            Belum ada data admin operasional yang terdaftar di sistem.
                        </p>
                    </div>
                )}
            </div>

            {/* INFO */}
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-xl flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <FiBarChart2 className="text-blue-400" size={24} />
                </div>
                <div className="flex-1">
                    <h4 className="font-black text-lg tracking-tight mb-1">Manajemen Kapasitas & Efisiensi</h4>
                    <p className="text-xs text-white/60 leading-relaxed font-medium">
                        Sistem RKK membatasi penugasan maksimal <strong>3 proyek aktif</strong> per Admin untuk menjaga kualitas pengawasan dan akurasi data. Superadmin memantau beban kerja ini untuk mencegah kelelahan tim (overload) dan memastikan setiap proyek mendapatkan perhatian administratif yang optimal.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KapasitasAdminPage;
