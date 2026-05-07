// client/src/components/ui/topbar/TopbarUserMenu.jsx
import React from "react";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

const TopbarUserMenu = ({ user, open, onToggle }) => {
    return (
        <div className="relative">
            {/* BUTTON */}
            <button 
                onClick={onToggle} 
                className={`
                    flex items-center gap-3 p-1 pr-4 rounded-full transition-all duration-200
                    ${open ? "bg-[var(--dashboard-primary-soft)] ring-2 ring-[var(--dashboard-primary)]/10" : "hover:bg-[var(--dashboard-surface-soft)]"}
                `}
            >
                <img
                    src={user.photo || "https://placehold.co/40"}
                    className="w-8 h-8 rounded-full border border-white shadow-sm object-cover"
                    alt="User"
                />
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-bold text-[var(--dashboard-text)] leading-none">{user.name}</span>
                        <span className="text-[10px] text-[var(--dashboard-primary)] font-bold uppercase tracking-wider mt-0.5">{user.role}</span>
                    </div>
                    <FiChevronDown className={`text-[var(--dashboard-text-soft)] transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </div>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-3 w-48 bg-[var(--dashboard-surface)] rounded-2xl shadow-xl border border-[var(--dashboard-border)] py-2 z-50">
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-soft)] transition">
                        <FiUser className="text-[var(--dashboard-primary)]" />
                        Profil Saya
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dashboard-text)] hover:bg-[var(--dashboard-surface-soft)] transition">
                        <FiSettings className="text-[var(--dashboard-primary)]" />
                        Pengaturan
                    </a>
                    <div className="border-t border-[var(--dashboard-border)] my-1" />

                    <a href="/logout" className="flex items-center gap-3 px-4 py-2 text-sm text-[var(--dashboard-danger)] hover:bg-[var(--dashboard-danger)]/5 transition">
                        <FiLogOut />
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
};

export default TopbarUserMenu;
