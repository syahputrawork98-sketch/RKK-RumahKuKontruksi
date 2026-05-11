import React from "react";
import { FiClock, FiCalendar, FiCheckCircle, FiInfo } from "react-icons/fi";

export const MandorInfoCard = ({ label, value, icon, color = "blue" }) => {
    const colors = {
        blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        emerald: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
        purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        orange: "bg-orange-500/10 text-orange-600 border-orange-500/20"
    };

    return (
        <div className="p-4 bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)] rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
                <div className={`p-1.5 rounded-lg border ${colors[color]}`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">{label}</span>
            </div>
            <p className="text-sm font-black truncate">{value || "-"}</p>
        </div>
    );
};

export const MandorProgressSection = ({ verifiedProgress, label = "Progres Fisik Terverifikasi" }) => (
    <div className="space-y-3">
        <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">{label}</span>
            <span className="text-2xl font-black text-[var(--dashboard-primary)]">{verifiedProgress ?? 0}%</span>
        </div>
        <div className="w-full h-3 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden border border-[var(--dashboard-border)] p-0.5 shadow-inner">
            <div 
                className="h-full bg-gradient-to-r from-[var(--dashboard-primary)] to-emerald-400 rounded-full transition-all duration-1000 shadow-sm shadow-blue-500/20" 
                style={{ width: `${verifiedProgress ?? 0}%` }}
            />
        </div>
    </div>
);

export const formatDateShort = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
    });
};

export const formatCurrency = (val) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(val || 0);
};
