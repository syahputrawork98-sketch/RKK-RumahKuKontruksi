// client/src/components/ui/topbar/TopbarUserMenu.jsx
import React from "react";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";

const TopbarUserMenu = ({ user, open, onToggle }) => {
    return (
        <div className="relative">
            {/* BUTTON */}
            <button onClick={onToggle} className="flex items-center gap-3">
                <img
                    src={user.photo || "https://placehold.co/40"}
                    className="w-10 h-10 rounded-full border border-teal-200 shadow-sm"
                />
                <div className="flex items-center gap-1 text-teal-700">
                    <span className="font-medium tracking-wide">{user.name}</span>
                    <FiChevronDown />
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
