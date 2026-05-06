// client/src/components/ui/sidebar/SidebarItem.jsx
import React from "react";

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }) => {
    return (
        <a
            href={href}
            className={`flex items-center gap-3 p-3 rounded-lg transition group relative
                ${active ? "bg-teal-700 shadow-inner" : "hover:bg-teal-800"}`}
        >
            <Icon className="text-xl" />

            {!collapsed && <span>{label}</span>}

            {collapsed && (
                <span className="absolute left-full ml-3 px-3 py-1 rounded bg-black text-xs opacity-0 group-hover:opacity-100 transition">
                    {label}
                </span>
            )}
        </a>
    );
};


export default SidebarItem;
