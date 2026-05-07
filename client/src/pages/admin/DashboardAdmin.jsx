import React from "react";
import { 
    FiLayers, 
    FiActivity, 
    FiClock, 
    FiCreditCard, 
    FiCheckCircle,
    FiTrendingUp
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
    DashboardProjectsTable,
} from "@client/components/ui/dashboard";

const DashboardAdmin = () => {
    const stats = [
        { label: "Total Proyek", value: 24, icon: FiLayers, color: "#1A4D2E" },
        { label: "Proyek Berjalan", value: 18, icon: FiTrendingUp, color: "#16A34A" },
        { label: "Menunggu Approval", value: 5, icon: FiClock, color: "#F59E0B" },
        { label: "Pembayaran Validasi", value: 3, icon: FiCreditCard, color: "#0EA5E9" },
        { label: "Rata-rata Progress", value: "62%", icon: FiCheckCircle, color: "#7C3AED" },
    ];

    const recentActivities = [
        { id: 1, text: "Mandor Ahmad mengunggah laporan harian PRJ-001", time: "15 menit lalu" },
        { id: 2, text: "Admin memvalidasi pembayaran termin 1 PRJ-005", time: "1 jam lalu" },
        { id: 3, text: "Pengawas Budi menyetujui tahap Pondasi PRJ-002", time: "3 jam lalu" },
    ];

    const recentProjects = [
        { kode: "PRJ-015", name: "Renovasi Rumah - Ibu Sari", progress: 15, status: "Persiapan", nilai: "Rp 120jt" },
        { kode: "PRJ-012", name: "Ruko Niaga - Bpk Hendra", progress: 45, status: "Pengerjaan", nilai: "Rp 850jt" },
        { kode: "PRJ-010", name: "Villa Tropis - Mr. Smith", progress: 85, status: "Finishing", nilai: "Rp 2.4M" },
    ];

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader />
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Proyek Terbaru</h3>
                            <button className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
                        </div>
                        <DashboardProjectsTable projects={recentProjects} />
                    </div>
                </div>

                <div className="space-y-6">
                    <DashboardActivity activities={recentActivities} title="Aktivitas Operasional" />
                    
                    <div className="dashboard-card bg-[var(--dashboard-primary)] text-white">
                        <h3 className="font-bold mb-2">Butuh Bantuan?</h3>
                        <p className="text-xs opacity-90 mb-4">Akses panduan operasional admin untuk pengelolaan proyek yang lebih efisien.</p>
                        <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all">Buka Knowledge Base</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;
