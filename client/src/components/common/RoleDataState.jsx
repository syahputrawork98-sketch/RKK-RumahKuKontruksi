import React from "react";
import { FiAlertCircle, FiInbox } from "react-icons/fi";

/**
 * Component to display data-related states (Error or Empty)
 * for role-specific dashboards/pages.
 */
const RoleDataState = ({ 
    type = "empty", // "empty", "error", or "loading"
    title, 
    description, 
    icon: Icon,
    onRetry,
    retryLabel = "Coba Lagi",
    message // backwards compatibility for some usages
}) => {
    const isError = type === "error";
    const isLoading = type === "loading";
    const DefaultIcon = isError ? FiAlertCircle : FiInbox;
    const finalIcon = Icon || DefaultIcon;

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-20 text-center animate-fadeIn gap-4">
                <div className="w-10 h-10 border-4 border-[var(--dashboard-primary)] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                    {message || description || "Sedang memuat data..."}
                </p>
            </div>
        );
    }

    const defaultTitle = isError 
        ? "Gagal Mengambil Data" 
        : "Data Tidak Ditemukan";
    
    const defaultDescription = isError
        ? "Terjadi kesalahan saat menghubungi server database lokal. Pastikan backend sudah menyala."
        : "Belum ada data yang tersedia untuk ditampilkan saat ini.";

    return (
        <div className="flex flex-col items-center justify-center p-12 text-center animate-fadeIn">
            <div className={`p-4 rounded-full mb-4 ${isError ? "bg-red-500/10 text-red-500" : "bg-slate-500/10 text-slate-400"}`}>
                {React.createElement(finalIcon, { size: 40 })}
            </div>
            <h3 className="text-lg font-bold text-[var(--dashboard-text)] mb-2">
                {title || defaultTitle}
            </h3>
            <p className="text-sm text-[var(--dashboard-text-soft)] max-w-md mb-6 font-medium italic">
                {description || defaultDescription}
            </p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                        isError 
                        ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20" 
                        : "bg-[var(--dashboard-primary)] text-white hover:bg-[var(--dashboard-primary)]/90 shadow-lg shadow-[var(--dashboard-primary)]/20"
                    }`}
                >
                    {retryLabel}
                </button>
            )}
        </div>
    );
};

export default RoleDataState;
