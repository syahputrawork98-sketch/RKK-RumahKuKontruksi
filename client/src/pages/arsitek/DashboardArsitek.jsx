import React from "react";
import { 
    FiSend, 
    FiEdit3, 
    FiClock, 
    FiCheckCircle,
    FiActivity,
    FiFileText
} from "react-icons/fi";
import {
    DashboardHeader,
    DashboardStats,
    DashboardActivity,
} from "@client/components/ui/dashboard";

const DashboardArsitek = () => {
    const stats = [
        { label: "Permintaan Baru", value: 4, icon: FiSend, color: "#0EA5E9" },
        { label: "Desain Aktif", value: 6, icon: FiEdit3, color: "#1A4D2E" },
        { label: "Menunggu Review", value: 3, icon: FiActivity, color: "#F59E0B" },
        { label: "Revisi Diminta", value: 2, icon: FiClock, color: "#E11428" },
        { label: "Siap Handover", value: 1, icon: FiCheckCircle, color: "#16A34A" },
    ];

    const recentRequests = [
        { id: "DR-005", customer: "Ibu Siti Aminah", type: "Rumah Minimalis", status: "assigned", date: "2 jam lalu" },
        { id: "DR-004", customer: "Bpk. Heru", type: "Ruko 3 Lantai", status: "in_design", date: "5 jam lalu" },
        { id: "DR-003", customer: "PT. Global Jaya", type: "Interior Kantor", status: "revision_requested", date: "1 hari lalu" },
    ];

    const recentActivities = [
        { id: 1, text: "Customer Bpk. Heru mengomentari konsep desain PRJ-DES-004", time: "15 menit lalu" },
        { id: 2, text: "Admin memvalidasi permintaan desain baru DR-005", time: "1 jam lalu" },
        { id: 3, text: "Anda mengunggah revisi ke-2 untuk DR-003", time: "3 jam lalu" },
    ];

    const getStatusLabel = (status) => {
        const mapping = {
            assigned: { text: "Ditugaskan", color: "bg-blue-500/10 text-blue-500" },
            in_design: { text: "Dalam Desain", color: "bg-emerald-500/10 text-emerald-500" },
            waiting_customer_review: { text: "Menunggu Review", color: "bg-amber-500/10 text-amber-500" },
            revision_requested: { text: "Revisi Diminta", color: "bg-red-500/10 text-red-500" },
            ready_to_convert: { text: "Siap Handover", color: "bg-purple-500/10 text-purple-500" },
        };
        return mapping[status] || { text: status, color: "bg-slate-500/10 text-slate-500" };
    };

    return (
        <div className="animate-fadeIn space-y-6">
            <DashboardHeader />
            
            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="dashboard-card">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold">Permintaan Desain Terbaru</h3>
                            <button className="text-xs font-bold text-[var(--dashboard-primary)] hover:underline">Lihat Semua</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-[var(--dashboard-border)]">
                                        <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">ID</th>
                                        <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Customer / Tipe</th>
                                        <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2">Status</th>
                                        <th className="pb-4 text-xs font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] px-2 text-right">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentRequests.map((req) => (
                                        <tr key={req.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/50 transition-colors">
                                            <td className="py-4 px-2 text-sm font-black text-[var(--dashboard-primary)]">{req.id}</td>
                                            <td className="py-4 px-2">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-bold">{req.customer}</span>
                                                    <span className="text-[10px] text-[var(--dashboard-text-soft)] font-medium uppercase tracking-tighter">{req.type}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-2">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getStatusLabel(req.status).color}`}>
                                                    {getStatusLabel(req.status).text}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-right">
                                                <button className="text-[10px] font-black text-[var(--dashboard-primary)] hover:underline uppercase">Detail</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="dashboard-card bg-linear-to-br from-[var(--dashboard-primary)] to-emerald-800 text-white p-6 relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-bold text-sm uppercase tracking-widest opacity-80 mb-2">Kapasitas Desain</h3>
                                <div className="flex items-end gap-2">
                                    <span className="text-4xl font-black">75%</span>
                                    <span className="text-xs mb-1 opacity-80">Terpakai (6/8 Slot)</span>
                                </div>
                                <div className="w-full h-1.5 bg-white/20 rounded-full mt-4 overflow-hidden">
                                    <div className="h-full bg-white transition-all duration-1000" style={{ width: "75%" }} />
                                </div>
                            </div>
                            <FiFileText className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 rotate-12" />
                        </div>
                        <div className="dashboard-card flex flex-col justify-center items-center text-center p-6 border-dashed border-2">
                            <p className="text-xs text-[var(--dashboard-text-soft)] font-medium mb-4 italic">Butuh referensi standar desain RKK?</p>
                            <button className="px-6 py-2.5 bg-[var(--dashboard-surface-soft)] hover:bg-[var(--dashboard-border)] rounded-xl text-xs font-bold transition-all border border-[var(--dashboard-border)]">Buka Katalog Desain</button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <DashboardActivity activities={recentActivities} title="Aktivitas Desain" />
                    
                    <div className="dashboard-card">
                        <h3 className="font-bold text-sm mb-4 uppercase tracking-widest text-[var(--dashboard-primary)]">Deadline Terdekat</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 p-3 bg-red-500/5 rounded-xl border border-red-500/10">
                                <div className="p-2 bg-red-500 text-white rounded-lg"><FiClock /></div>
                                <div>
                                    <p className="text-xs font-bold">DR-003: Revisi Denah</p>
                                    <p className="text-[10px] text-red-500 font-bold uppercase mt-0.5">Hari Ini - 17:00</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-amber-500/5 rounded-xl border border-amber-500/10">
                                <div className="p-2 bg-amber-500 text-white rounded-lg"><FiClock /></div>
                                <div>
                                    <p className="text-xs font-bold">DR-004: Konsep 3D</p>
                                    <p className="text-[10px] text-amber-500 font-bold uppercase mt-0.5">Besok, 09 Mei</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardArsitek;
