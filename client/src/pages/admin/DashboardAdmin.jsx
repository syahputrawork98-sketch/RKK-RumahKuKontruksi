import React, { useState, useEffect, useCallback } from "react";
import { 
    FiLayers, 
    FiActivity, 
    FiClock, 
    FiCreditCard, 
    FiCheckCircle,
    FiTrendingUp,
    FiUsers,
    FiUser,
    FiFileText,
    FiPackage,
    FiAlertCircle
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
    DashboardProjectsTable,
} from "@client/components/ui/dashboard";
import adminService from "../../services/adminService";
import RoleDataState from "../../components/common/RoleDataState";
import { useAdminPersona } from "../../context/AdminPersonaContext";

const DashboardAdmin = () => {
    const { selectedAdminId } = useAdminPersona();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    const fetchStats = React.useCallback(async () => {
        if (!selectedAdminId) {
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await adminService.getDashboardStats({ adminId: selectedAdminId });
            if (response.success) {
                setStats(response.data);
            }
        } catch (err) {
            console.error("Failed to fetch dashboard stats:", err);
            setError("Gagal memuat data statistik.");
        } finally {
            setLoading(false);
        }
    }, [selectedAdminId]);

    React.useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (loading) return <RoleDataState type="loading" message="Menganalisis data dashboard..." />;
    
    if (!selectedAdminId) {
        return (
            <div className="p-8">
                <RoleDataState 
                    type="empty" 
                    title="Persona Admin Belum Dipilih"
                    message="Silakan pilih persona Admin di Topbar untuk melihat ringkasan operasional." 
                />
            </div>
        );
    }

    if (error) return <RoleDataState type="error" message={error} onRetry={fetchStats} />;

    if (!stats || !stats.projects) return <RoleDataState type="empty" message="Data dashboard tidak tersedia atau masih kosong." />;

    const { projects, customers, financials, recentProjects, reports, materialRequests } = stats;

    // Calculate derived stats
    const totalProjects = Array.isArray(projects) 
        ? projects.reduce((sum, p) => sum + (p._count?._all || p._count || 0), 0)
        : 0;

    const activeProjects = Array.isArray(projects) 
        ? projects.find(p => {
            const s = p.status?.toLowerCase();
            return s === "active" || s === "ongoing" || s === "berjalan";
        })?._count?._all || 0
        : 0;

    const planningProjects = Array.isArray(projects)
        ? projects.find(p => {
            const s = p.status?.toLowerCase();
            return s === "planning" || s === "draft" || s === "persiapan";
        })?._count?._all || 0
        : 0;

    const finishedProjects = Array.isArray(projects)
        ? projects.find(p => {
            const s = p.status?.toLowerCase();
            return s === "finished" || s === "selesai";
        })?._count?._all || 0
        : 0;
    
    // Reports stats
    const pendingReports = reports?.filter(r => {
        const s = r.status?.toLowerCase();
        return s === "submitted" || s === "pending";
    }).reduce((sum, r) => sum + (r._count?._all || 0), 0) || 0;

    const underReviewReports = reports?.find(r => {
        const s = r.status?.toLowerCase();
        return s === "under_admin_review" || s === "start_admin_review";
    })?._count?._all || 0;
    
    // Material stats
    const pendingMaterials = materialRequests?.find(m => {
        const s = m.status?.toLowerCase();
        return s === "approved_by_supervisor" || s === "submitted";
    })?._count?._all || 0;

    const dashboardStats = [
        { label: "Proyek Aktif", value: activeProjects, icon: FiActivity, color: "#10B981" },
        { label: "Dalam Persiapan", value: planningProjects, icon: FiLayers, color: "#0EA5E9" },
        { label: "Request Material", value: pendingMaterials, icon: FiPackage, color: "#F59E0B" },
        { label: "Review Laporan", value: pendingReports + underReviewReports, icon: FiFileText, color: "#7C3AED" },
    ];

    const recentActivities = [
        ...(stats.recentProjects || []).map(p => ({
            id: `proj-${p.id}`,
            type: 'project',
            title: `Proyek Baru: ${p.name}`,
            subtitle: `Kode: ${p.projectCode} | Customer: ${p.customer?.name}`,
            timestamp: new Date(p.createdAt),
            icon: FiActivity,
            color: '#10B981'
        })),
        ...(stats.recentReports || []).map(r => ({
            id: `rep-${r.id}`,
            type: 'report',
            title: `Laporan Mingguan: ${r.project?.projectCode}`,
            subtitle: `Status: ${r.status} | Menunggu Review Admin`,
            timestamp: new Date(r.createdAt),
            icon: FiFileText,
            color: '#7C3AED'
        })),
        ...(stats.recentMaterialRequests || []).map(m => ({
            id: `mat-${m.id}`,
            type: 'material',
            title: `Request Material: ${m.requestCode}`,
            subtitle: `Proyek: ${m.project?.projectCode} | Status: ${m.status}`,
            timestamp: new Date(m.createdAt),
            icon: FiPackage,
            color: '#F59E0B'
        }))
    ].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);

    return (
        <div className="animate-fadeIn space-y-8 pb-20">
            {/* Header section with disclaimer */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-[var(--dashboard-text)]">
                        ADMIN <span className="text-[var(--dashboard-primary)] uppercase">Dashboard</span>
                    </h1>
                    <p className="text-sm text-[var(--dashboard-text-soft)] max-w-2xl leading-relaxed mt-1 italic">
                        Ringkasan operasional proyek di bawah pengawasan Anda. Data disinkronkan dari database lokal.
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl border border-blue-200 shadow-sm">
                    <FiInfo className="text-blue-500" size={14} />
                    <span className="text-[10px] font-black text-blue-700 uppercase tracking-[0.2em]">Local Operational Summary</span>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardStats.map((stat, idx) => (
                    <div key={idx} className="dashboard-card group hover:border-[var(--dashboard-primary)]/30 transition-all cursor-default">
                        <div className="flex items-center justify-between mb-4">
                            <div 
                                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110"
                                style={{ backgroundColor: stat.color, boxShadow: `0 8px 20px ${stat.color}33` }}
                            >
                                <stat.icon size={24} />
                            </div>
                            <span className="text-[10px] font-black text-[var(--dashboard-text-soft)] uppercase tracking-widest opacity-50">Live Sync</span>
                        </div>
                        <h4 className="text-3xl font-black text-[var(--dashboard-text)] mb-1">{stat.value}</h4>
                        <p className="text-xs font-bold text-[var(--dashboard-text-soft)] uppercase tracking-wide">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Projects Table */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Operational Alerts */}
                    {(pendingReports > 0 || pendingMaterials > 0) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {pendingReports > 0 && (
                                <div className="bg-blue-600 p-4 rounded-2xl text-white shadow-lg shadow-blue-600/20 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Laporan Menunggu</p>
                                        <h4 className="text-xl font-black">{pendingReports} Laporan Baru</h4>
                                    </div>
                                    <Link to="/admin/laporan-mingguan-pengawas" className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                                        <FiActivity />
                                    </Link>
                                </div>
                            )}
                            {pendingMaterials > 0 && (
                                <div className="bg-amber-500 p-4 rounded-2xl text-white shadow-lg shadow-amber-500/20 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Logistik</p>
                                        <h4 className="text-xl font-black">{pendingMaterials} Request Material</h4>
                                    </div>
                                    <Link to="/admin/request-material" className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                                        <FiPackage />
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Proyek Terbaru</h3>
                            <Link to="/admin/proyek" className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</Link>
                        </div>
                        {stats.recentProjects?.length > 0 ? (
                            <DashboardProjectsTable projects={stats.recentProjects} />
                        ) : (
                            <RoleDataState type="empty" message="Belum ada proyek yang terdaftar." />
                        )}
                    </div>
                </div>

                {/* Local Activity Summary */}
                <div className="space-y-6">
                    <div className="dashboard-card p-6 border border-slate-100 shadow-sm bg-white">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[14px] font-black uppercase tracking-tight text-[var(--dashboard-text)]">Monitoring Operasional</h3>
                            <span className="text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100 tracking-tighter">
                                Activity Source: Local DB
                            </span>
                        </div>
                        
                        {recentActivities.length > 0 ? (
                            <DashboardActivity activities={recentActivities} />
                        ) : (
                            <div className="py-12 text-center space-y-3 bg-[var(--dashboard-surface-soft)] rounded-[32px] border border-dashed border-[var(--dashboard-border)]">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto text-[var(--dashboard-text-soft)] shadow-sm">
                                    <FiActivity size={24} className="opacity-20" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase text-[var(--dashboard-text-soft)] tracking-widest">Belum Ada Aktivitas</p>
                                    <p className="text-[10px] text-[var(--dashboard-text-soft)] mt-1 px-8">Seluruh riwayat operasional akan muncul di sini setelah sinkronisasi data lapangan.</p>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                            <p className="text-[10px] text-blue-600 leading-relaxed font-medium italic">
                                <FiInfo className="inline-block mr-1" />
                                Monitoring ini bersifat satu arah (local polling). Komunikasi langsung dengan tim lapangan dilakukan melalui kanal Stage Communication di Detail Proyek.
                            </p>
                        </div>
                    </div>

                    <div className="dashboard-card bg-slate-900 text-white border-none shadow-xl">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-400" /> Progres Resmi (SOT)
                        </h3>
                        <p className="text-xs opacity-70 mb-4 leading-relaxed">
                            Pastikan angka progres pada dashboard konsumen sesuai dengan verifikasi fisik di lapangan oleh Pengawas.
                        </p>
                        <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                            <p className="text-[10px] font-medium italic opacity-90">
                                "Integritas data operasional adalah prioritas utama transparansi RKK."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
