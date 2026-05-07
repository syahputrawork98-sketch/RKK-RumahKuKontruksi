import React, { useState, useEffect } from "react";
import { 
    FiLayers, 
    FiActivity, 
    FiClock, 
    FiCreditCard, 
    FiCheckCircle,
    FiTrendingUp,
    FiUsers,
    FiUser
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
    DashboardProjectsTable,
} from "@client/components/ui/dashboard";
import projectService from "../../services/projectService";
import customerService from "../../services/customerService";
import supervisorService from "../../services/supervisorService";
import foremanService from "../../services/foremanService";
import architectService from "../../services/architectService";
import RoleDataState from "../../components/common/RoleDataState";

const DashboardAdmin = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState({
        projects: [],
        customers: [],
        supervisors: [],
        foremen: [],
        architects: []
    });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const [projectsRes, customersRes, supervisorsRes, foremenRes, architectsRes] = await Promise.all([
                projectService.getProjects(),
                customerService.getAllCustomers(),
                supervisorService.getAllSupervisors(),
                foremanService.getAllForemen(),
                architectService.getAllArchitects()
            ]);

            setData({
                projects: projectsRes.data || [],
                customers: customersRes.data || [],
                supervisors: supervisorsRes.data || [],
                foremen: foremenRes.data || [],
                architects: architectsRes.data || []
            });
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

    const { projects, customers, supervisors, foremen, architects } = data;

    // Calculate Stats
    const totalProjects = projects.length;
    const ongoingProjects = projects.filter(p => p.status === "active" || p.status === "ongoing" || p.status === "in_progress" || (p.progress > 0 && p.progress < 100)).length;
    const avgProgress = totalProjects > 0 
        ? Math.round(projects.reduce((sum, p) => sum + (p.progress || 0), 0) / totalProjects) 
        : 0;
    
    const totalPeople = customers.length + supervisors.length + foremen.length + architects.length;

    const stats = [
        { label: "Total Proyek", value: totalProjects, icon: FiLayers, color: "#1A4D2E" },
        { label: "Proyek Berjalan", value: ongoingProjects, icon: FiTrendingUp, color: "#16A34A" },
        { label: "Total Konsumen", value: customers.length, icon: FiUser, color: "#F59E0B" },
        { label: "Total Tim Lab.", value: supervisors.length + foremen.length, icon: FiUsers, color: "#0EA5E9" },
        { label: "Rata-rata Progress", value: `${avgProgress}%`, icon: FiCheckCircle, color: "#7C3AED" },
    ];

    const recentActivities = [
        { id: 1, text: "Sistem siap digunakan untuk manajemen proyek lokal.", time: "Baru saja" },
        { id: 2, text: "Database terhubung dengan modul Pengawas & Mandor.", time: "Hari ini" },
        { id: 3, text: "Modul Arsitek (Profil) telah beralih ke Database.", time: "Kemarin" },
    ];

    // Format projects for table
    const formattedProjects = projects.slice(0, 5).map(p => ({
        kode: p.projectCode || "PRJ-???",
        name: p.name,
        progress: p.progress || 0,
        status: p.status,
        nilai: p.budget ? `Rp ${(p.budget / 1000000).toFixed(0)}jt` : "-"
    }));

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader />
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
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
                    <DashboardActivity activities={recentActivities} title="Aktivitas Sistem" />
                    
                    <div className="dashboard-card bg-[var(--dashboard-primary)] text-white">
                        <h3 className="font-bold mb-2">Manajemen Lokal</h3>
                        <p className="text-xs opacity-90 mb-4">Anda sedang dalam mode integrasi database lokal. Seluruh data ditarik dari PostgreSQL.</p>
                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all">Pelajari Alur CRUD</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
