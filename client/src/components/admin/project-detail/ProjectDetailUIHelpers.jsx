import React from "react";
import StatusBadgeGlobal from "../../common/StatusBadge";

export const InfoItem = ({ label, value, icon, isBadge, color, isBold, className }) => (
    <div className={`space-y-1.5 ${className}`}>
        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] flex items-center gap-2">
            {icon} {label}
        </p>
        {isBadge ? (
            <span className={`inline-block px-3 py-0.5 text-[10px] font-black uppercase rounded-full border ${color}`}>
                {value}
            </span>
        ) : (
            <p className={`text-sm ${isBold ? "font-black" : "font-bold"} ${color || "text-[var(--dashboard-text)]"}`}>
                {value || "-"}
            </p>
        )}
    </div>
);

export const TeamCard = ({ role, name, email, icon, color }) => {
    const colors = {
        blue: "bg-blue-500/10 text-blue-600 border-blue-500/20",
        purple: "bg-purple-500/10 text-purple-600 border-purple-500/20",
        orange: "bg-orange-500/10 text-orange-600 border-orange-500/20"
    };
    
    return (
        <div className="flex items-center gap-4 p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] hover:border-blue-500/30 transition-all group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${colors[color]}`}>
                {icon}
            </div>
            <div className="flex-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)]">{role}</p>
                <h4 className="text-sm font-black group-hover:text-blue-600 transition-colors">{name || "BELUM DITUGASKAN"}</h4>
                {email && <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)]">{email}</p>}
            </div>
        </div>
    );
};

export const StatusBadge = ({ status }) => {
    return <StatusBadgeGlobal type="project" status={status} />;
};

export const formatCurrency = (val) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(val || 0);
};

export const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
};

export const formatDateShort = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
    });
};
