// client/src/components/ui/sidebar/SidebarItem.jsx
import React from "react";

const SidebarItem = ({ icon: Icon, label, href, active, collapsed }) => {
    return (
        <a
            href={href}
            className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-200 group relative
                ${active 
                    ? "bg-white/10 text-white shadow-xs border border-white/5" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
        >
            <div className={`
                flex items-center justify-center transition-colors
                ${active ? "text-teal-400" : "group-hover:text-teal-400"}
            `}>
                <Icon size={20} />
            </div>

            {!collapsed && <span className="font-medium text-sm tracking-wide">{label}</span>}

            {collapsed && (
                <span className="absolute left-full ml-4 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border border-white/10 pointer-events-none whitespace-nowrap z-50">
                    {label}
                </span>
            )}
        </a>
    );
};


export default SidebarItem;
