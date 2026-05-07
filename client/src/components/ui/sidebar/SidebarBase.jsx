// client/src/components/ui/sidebar/SidebarBase.jsx

import React from "react";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import SidebarDropdown from "./SidebarDropdown";


/*
    ➤ PERUBAHAN BESAR:
    - HAPUS state internal: const [isCollapsed, setIsCollapsed] = useState(false)
    - GANTI dengan state shared dari Layout (props):
        isCollapsed
        setIsCollapsed
*/
const SidebarBase = ({ menu, user, isCollapsed, setIsCollapsed, panelLabel = "Superadmin Panel" }) => {
    const location = useLocation();

    return (
        <aside
            className={`dashboard-sidebar fixed top-0 left-0 h-screen z-50 transition-all duration-300 flex flex-col ${isCollapsed ? "w-20" : "w-72"}`}
        >
            {/* BRAND HEADER */}
            <div className="dashboard-sidebar-header flex items-center justify-between px-4 py-6 mb-2">
                {!isCollapsed ? (
                    <div className="flex items-center gap-3 pl-2">
                        <div className="w-10 h-10 bg-[var(--dashboard-primary)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--dashboard-primary)]/20">
                            <span className="text-xl font-bold text-white tracking-tighter">RK</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-lg font-extrabold leading-none tracking-tight">RKK</h1>
                            <span className="text-[10px] text-[var(--dashboard-primary)] font-bold uppercase tracking-widest mt-1">{panelLabel}</span>
                        </div>
                    </div>
                ) : (
                    <div className="w-10 h-10 bg-[var(--dashboard-primary)] rounded-xl flex items-center justify-center shadow-lg shadow-[var(--dashboard-primary)]/20 mx-auto">
                        <span className="text-lg font-bold text-white">R</span>
                    </div>
                )}

                {!isCollapsed && (
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="dashboard-icon-button !w-8 !h-8 !bg-transparent border-none hover:!bg-[var(--dashboard-sidebar-hover-bg)]"
                    >
                        <FiChevronsLeft size={18} />
                    </button>
                )}
            </div>

            {/* BUTTON COLLAPSE (VISIBLE ON COLLAPSED) */}
            {isCollapsed && (
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="dashboard-icon-button !w-8 !h-8 !bg-transparent border-none hover:!bg-[var(--dashboard-sidebar-hover-bg)]"
                    >
                        <FiChevronsRight size={18} />
                    </button>
                </div>
            )}

            {/* MENU LIST */}
            <div className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-hide py-2">
                {menu.map((item, index) => {
                    if (item.type === "item") {
                        return (
                            <SidebarItem
                                key={index}
                                icon={item.icon}
                                label={item.label}
                                href={item.href}
                                active={location.pathname === item.href}
                                collapsed={isCollapsed}
                            />
                        );
                    }

                    if (item.type === "dropdown") {
                        const isChildActive = item.items.some(child => location.pathname === child.href);
                        return (
                            <SidebarDropdown
                                key={index}
                                icon={item.icon}
                                label={item.label}
                                items={item.items}
                                collapsed={isCollapsed}
                                active={isChildActive || location.pathname.startsWith(item.activeStartsWith)}
                            />
                        );
                    }

                    return null;
                })}
            </div>

            {/* USER PROFILE CARD */}
            <div className="p-4 border-t border-[var(--dashboard-sidebar-border)]">
                <div className={`
                    flex items-center gap-3 p-3 rounded-2xl transition-all
                    ${isCollapsed ? "justify-center" : "bg-[var(--dashboard-surface-soft)] border border-[var(--dashboard-border)]"}
                `}>
                    <img
                        src={user?.photo ?? "https://placehold.co/200x200"}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-[var(--dashboard-primary)]/20"
                        alt="User"
                    />

                    {!isCollapsed && (
                        <div className="flex-1 overflow-hidden">
                            <p className="font-bold text-sm truncate text-[var(--dashboard-text)]">{user?.name ?? "User Profile"}</p>
                            <p className="text-[10px] text-[var(--dashboard-primary)] font-bold uppercase tracking-wider truncate">
                                {user?.role ?? "Role"}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
};

export default SidebarBase;
