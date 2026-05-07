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
                    ${open ? "bg-teal-50 ring-2 ring-teal-500/10" : "hover:bg-slate-100"}
                `}
            >
                <img
                    src={user.photo || "https://placehold.co/40"}
                    className="w-8 h-8 rounded-full border border-white shadow-sm object-cover"
                    alt="User"
                />
                <div className="flex items-center gap-2">
                    <div className="flex flex-col items-start">
                        <span className="text-xs font-bold text-slate-800 leading-none">{user.name}</span>
                        <span className="text-[10px] text-teal-600 font-bold uppercase tracking-wider mt-0.5">{user.role}</span>
                    </div>
                    <FiChevronDown className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </div>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-lg border border-teal-50 py-2 z-50">
                    <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-teal-50 transition">
                        <FiUser className="text-teal-700" />
                        Profil Saya
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-teal-50 transition">
                        <FiSettings className="text-teal-700" />
                        Pengaturan
                    </a>
                    <div className="border-t my-1" />

                    <a href="/logout" className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition">
                        <FiLogOut />
                        Logout
                    </a>
                </div>
            )}
        </div>
    );
};

export default TopbarUserMenu;
