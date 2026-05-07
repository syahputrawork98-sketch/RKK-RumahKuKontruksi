import React from "react";
import { FiLayout, FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

/**
 * Enhanced PlaceholderPage for RKK Dashboard
 * 
 * Props:
 * - title: Page title
 * - description: Brief description of the page function
 * - status: DB-Backed / Partial / Planned / Postponed / Experimental / Do Not Build Yet
 * - dos: Array of strings for what the role can do
 * - donts: Array of strings for what the role cannot do
 */
const PlaceholderPage = ({ 
    title = "Halaman Placeholder", 
    description = "Fitur ini sedang dalam tahap perencanaan atau pengembangan.",
    status = "Planned",
    dos = [],
    donts = []
}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "DB-Backed": return "bg-green-100 text-green-700 border-green-200";
            case "Partial": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Planned": return "bg-amber-100 text-amber-700 border-amber-200";
            case "Postponed": return "bg-gray-100 text-gray-700 border-gray-200";
            case "Experimental": return "bg-purple-100 text-purple-700 border-purple-200";
            case "Do Not Build Yet": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    return (
        <div className="dashboard-container max-w-5xl mx-auto py-8 px-4">
            {/* HERO SECTION */}
            <div className="dashboard-card mb-8 p-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-[var(--dashboard-surface)] to-[var(--dashboard-surface-soft)]">
                <div className="w-24 h-24 bg-[var(--dashboard-primary-soft)] rounded-3xl flex items-center justify-center text-[var(--dashboard-primary)] shadow-lg shrink-0">
                    <FiLayout size={44} />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                        <h1 className="dashboard-title text-3xl mb-0">{title}</h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(status)}`}>
                            {status}
                        </span>
                    </div>
                    <p className="dashboard-subtitle text-lg opacity-80 leading-relaxed mb-0">
                        {description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DO's */}
                <div className="dashboard-card p-6 border-l-4 border-green-500">
                    <div className="flex items-center gap-3 mb-4 text-green-600">
                        <FiCheckCircle size={20} className="shrink-0" />
                        <h3 className="font-bold text-lg">Akses & Wewenang</h3>
                    </div>
                    <ul className="space-y-3">
                        {dos.length > 0 ? dos.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm text-[var(--dashboard-text)] opacity-80">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                                {item}
                            </li>
                        )) : (
                            <li className="text-sm italic opacity-50">Belum ada data wewenang yang spesifik.</li>
                        )}
                    </ul>
                </div>

                {/* DON'Ts */}
                <div className="dashboard-card p-6 border-l-4 border-red-500">
                    <div className="flex items-center gap-3 mb-4 text-red-600">
                        <FiXCircle size={20} className="shrink-0" />
                        <h3 className="font-bold text-lg">Batasan / Larangan</h3>
                    </div>
                    <ul className="space-y-3">
                        {donts.length > 0 ? donts.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm text-[var(--dashboard-text)] opacity-80">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                                {item}
                            </li>
                        )) : (
                            <li className="text-sm italic opacity-50">Belum ada data batasan yang spesifik.</li>
                        )}
                    </ul>
                </div>
            </div>

            {/* INFO PANEL */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4 items-start">
                <FiInfo size={24} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-bold text-blue-800 mb-1">Catatan Implementasi</h4>
                    <p className="text-sm text-blue-700 opacity-90 leading-relaxed">
                        Halaman ini adalah representasi alur kerja (workflow) yang sedang direncanakan. UI ini membantu tim memahami struktur navigasi dan tanggung jawab role sebelum integrasi database dilakukan sepenuhnya.
                    </p>
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <button 
                    disabled 
                    className="px-8 py-3 bg-[var(--dashboard-primary)] text-white rounded-xl font-bold opacity-50 cursor-not-allowed shadow-lg shadow-[var(--dashboard-primary)]/20"
                >
                    Modul Sedang Disiapkan
                </button>
            </div>
        </div>
    );
};

export default PlaceholderPage;
