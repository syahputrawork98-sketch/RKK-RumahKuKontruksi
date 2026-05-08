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
                {description || "Halaman ini sedang dalam tahap pengembangan. Integrasi detail akan dikerjakan setelah standar UI Superadmin disepakati."}
            </p>
            <div className="dashboard-primary-button mb-4">
                Modul Dalam Pengembangan
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg border border-amber-100">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">Status: Hold (Fase Local CRUD)</span>
            </div>
        </div>
    );
};

export default PlaceholderPage;
