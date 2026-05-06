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
const SidebarBase = ({ menu, user, isCollapsed, setIsCollapsed }) => {

    const location = useLocation();

    return (
        <aside
            className={`${isCollapsed ? "w-20" : "w-72"}
                fixed top-0 left-0 h-screen bg-teal-900 text-white 
                border-r border-teal-700 flex flex-col 
                transition-all duration-300 z-50`}
        >

            {/* HEADER */}
            <div className="flex items-center justify-between px-4 py-5 border-b border-teal-700">

                {/* Tampilkan text hanya ketika tidak collapsed */}
                {!isCollapsed && (
                    <h1 className="text-xl font-bold">Dashboard</h1>
                )}

                {/* BUTTON COLLAPSE */}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-teal-700 rounded-lg transition"
                >
                    {isCollapsed ? <FiChevronsRight /> : <FiChevronsLeft />}
                </button>
            </div>

            {/* MENU LIST */}
            <div className="flex-1 px-3 py-4 space-y-3 overflow-y-auto">
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
                        return (
                            <SidebarDropdown
                                key={index}
                                icon={item.icon}
                                label={item.label}
                                items={item.items}
                                collapsed={isCollapsed}
                                active={location.pathname.startsWith(item.activeStartsWith)}
                            />
                        );
                    }

                    return null;
                })}
            </div>

            {/* USER INFO */}
            <div className="border-t border-teal-700 p-4 flex items-center gap-3">
                <img
                    src={user?.photo ?? "https://placehold.co/200x200"}
                    className="w-10 h-10 rounded-full object-cover"
                />

                {/* Tampilkan info hanya kalau sidebar tidak collapse */}
                {!isCollapsed && (
                    <div>
                        <p className="font-semibold">{user?.name ?? "User"}</p>
                        <p className="text-xs text-teal-300">{user?.role ?? "Role"}</p>
                    </div>
                )}
            </div>

        </aside>
    );
};

export default SidebarBase;
