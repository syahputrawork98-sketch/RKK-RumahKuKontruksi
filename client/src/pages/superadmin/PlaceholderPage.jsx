import React from "react";
import { FiLayout } from "react-icons/fi";

const PlaceholderPage = ({ title, description }) => {
    return (
        <div className="dashboard-card flex flex-col items-center justify-center min-h-[60vh] text-center p-12">
            <div className="w-24 h-24 bg-[var(--dashboard-primary-soft)] rounded-3xl flex items-center justify-center text-[var(--dashboard-primary)] mb-8 shadow-inner">
                <FiLayout size={48} />
            </div>
            <h1 className="dashboard-title text-3xl mb-3">{title}</h1>
            <p className="dashboard-subtitle text-base max-w-md mb-10">
                {description || "Modul ini tidak tersedia dalam simulasi pengembangan lokal saat ini. Detail integrasi akan ditambahkan pada fase pengembangan selanjutnya."}
            </p>
            <div className="dashboard-primary-button mb-4">
                Fitur Non-Scope Lokal
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-neutral-50 rounded-lg border border-neutral-100">
                <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></span>
                <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest uppercase">Scope: Pengembangan Lanjutan</span>
            </div>
        </div>
    );
};

export default PlaceholderPage;
