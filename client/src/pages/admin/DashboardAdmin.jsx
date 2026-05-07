import React, { useState, useEffect } from "react";
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

const DashboardAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const res = await adminService.getDashboardStats();
            setStats(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            setError("Gagal memuat data dashboard. Pastikan server backend berjalan.");
            setLoading(false);
        }
    };

    if (loading) {
        return <RoleDataState type="loading" message="Memuat data dashboard..." />;
    }

    if (error) {
        return <RoleDataState type="error" message={error} onRetry={fetchDashboardData} />;
    }

    if (!stats) return <RoleDataState type="empty" message="Data dashboard tidak tersedia." />;

    const { projects, customers, financials, recentProjects, reports, materialRequests } = stats;

    // Calculate derived stats
    const totalProjects = projects.reduce((sum, p) => sum + (p._count?._all || p._count || 0), 0);
    const activeProjects = projects.find(p => p.status === "active")?._count?._all || 0;
    
    // Reports stats
    const pendingReports = reports?.find(r => r.status === "submitted")?._count?._all || 0;
    const underReviewReports = reports?.find(r => r.status === "under_admin_review")?._count?._all || 0;
    
    // Material stats
    const pendingMaterials = materialRequests?.find(m => m.status === "approved_by_supervisor")?._count?._all || 0;

    const dashboardStats = [
        { label: "Total Proyek", value: totalProjects, icon: FiLayers, color: "#1A4D2E" },
        { label: "Laporan Baru", value: pendingReports + underReviewReports, icon: FiFileText, color: "#0EA5E9" },
        { label: "Request Material", value: pendingMaterials, icon: FiPackage, color: "#F59E0B" },
        { label: "Total Konsumen", value: customers, icon: FiUser, color: "#7C3AED" },
    ];

    const recentActivities = [
        { id: 1, text: "Monitoring Progress resmi dari Pengawas aktif.", time: "Fase 3" },
        { id: 2, text: "Review Laporan Mingguan Pengawas terintegrasi.", time: "Baru saja" },
        { id: 3, text: "Publikasi ke Timeline Konsumen sudah siap.", time: "Update" },
    ];

    // Format projects for table
    const formattedProjects = recentProjects.map(p => ({
        kode: p.projectCode || "PRJ-???",
        name: p.name,
        progress: p.progress || 0,
        status: p.status,
        nilai: p.budgetTotal ? `Rp ${(parseFloat(p.budgetTotal) / 1000000).toFixed(0)}jt` : "-"
    }));

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader />
            
            <DashboardStats stats={dashboardStats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                                    <a href="/admin/laporan-mingguan-pengawas" className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                                        <FiActivity />
                                    </a>
                                </div>
                            )}
                            {pendingMaterials > 0 && (
                                <div className="bg-amber-500 p-4 rounded-2xl text-white shadow-lg shadow-amber-500/20 flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Logistik</p>
                                        <h4 className="text-xl font-black">{pendingMaterials} Request Material</h4>
                                    </div>
                                    <a href="/admin/request-material" className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-all">
                                        <FiPackage />
                                    </a>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Proyek Terbaru</h3>
                            <a href="/admin/proyek" className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</a>
                        </div>
                        {formattedProjects.length > 0 ? (
                            <DashboardProjectsTable projects={formattedProjects} />
                        ) : (
                            <RoleDataState type="empty" message="Belum ada proyek yang terdaftar." />
                        )}
                    </div>
                </div>

                <div className="space-y-6">
                    <DashboardActivity activities={recentActivities} title="Monitoring Operasional" />
                    
                    <div className="dashboard-card bg-slate-900 text-white">
                        <h3 className="font-bold mb-2 flex items-center gap-2">
                            <FiCheckCircle className="text-emerald-400" /> Fase 3 — Aktif
                        </h3>
                        <p className="text-xs opacity-70 mb-4 leading-relaxed">
                            Fokus Monitoring:
                            <br />• Progress Terverifikasi (SOT)
                            <br />• Review Laporan Pengawas
                            <br />• Publikasi Ringkasan Konsumen
                        </p>
                        <div className="p-3 bg-white/10 rounded-xl border border-white/10">
                            <p className="text-[10px] font-medium italic opacity-90">
                                "Admin memegang kendali publikasi informasi ke Konsumen untuk menjaga integritas data operasional."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
