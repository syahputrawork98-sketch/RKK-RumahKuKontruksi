// client/src/components/ui/dashboard/DashboardHeader.jsx

import React from "react";
import { Calendar, Clock } from "lucide-react";

export const DashboardHeader = () => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
            <h1 className="dashboard-title text-4xl tracking-tight">Dashboard Superadmin</h1>
            <p className="dashboard-subtitle text-lg">Monitoring operasional, finansial, dan aktivitas tim RKK secara real-time.</p>
        </div>

        <div className="flex items-center gap-4">
            {/* Box tanggal */}
            <div className="hidden md:flex items-center bg-[var(--dashboard-surface)] px-5 py-3 rounded-2xl shadow-sm border border-[var(--dashboard-border)]">
                <div className="w-10 h-10 bg-[var(--dashboard-primary-soft)] rounded-xl flex items-center justify-center text-[var(--dashboard-primary)] mr-4">
                    <Calendar size={20} />
                </div>
                <div>
                    <p className="text-[10px] text-[var(--dashboard-text-muted)] font-bold uppercase tracking-widest leading-none mb-1">Hari Ini</p>
                    <p className="text-sm font-extrabold text-[var(--dashboard-text)]">
                        {new Date().toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Button laporan */}
            <button className="dashboard-primary-button flex items-center gap-3 !px-6 !py-3.5">
                <Clock size={18} />
                <span>Buat Laporan</span>
            </button>
        </div>
    </div>
);
