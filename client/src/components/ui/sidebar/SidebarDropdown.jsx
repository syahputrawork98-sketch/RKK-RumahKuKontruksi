// client/src/components/ui/sidebar/SidebarDropdown.jsx
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const SidebarDropdown = ({ icon: Icon, label, items, active, collapsed }) => {
    const [open, setOpen] = useState(active);

    return (
        <div className="select-none">
            {/* BUTTON UTAMA DROPDOWN */}
            <button
                onClick={() => setOpen(!open)}
                className={`
                    flex items-center justify-between w-full p-3.5 rounded-xl 
                    transition-all duration-200 group
                    ${active 
                        ? "bg-white/5 text-white border border-white/5 shadow-xs" 
                        : "text-slate-400 hover:bg-white/5 hover:text-white"}
                `}
            >
                {/* ICON + LABEL */}
                <div className="flex items-center gap-3">
                    <div className={`
                        flex items-center justify-center transition-colors
                        ${active ? "text-teal-400" : "group-hover:text-teal-400"}
                    `}>
                        <Icon size={20} />
                    </div>
                    {!collapsed && <span className="font-medium text-sm tracking-wide">{label}</span>}
                </div>

                {/* CHEVRON */}
                {!collapsed && (
                    <FiChevronDown
                        className={`text-lg transition-transform duration-300 ${open ? "rotate-180" : ""
                            }`}
                    />
                )}
            </button>

            {/* SUBMENU DROPDOWN */}
            {!collapsed && (
                <div
                    className={`
                        ml-4 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-300 border-l border-white/10 pl-6
                        ${open ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"}
                    `}
                >
                    {items.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="p-2.5 text-xs font-medium rounded-lg text-slate-400 hover:bg-white/5 hover:text-white transition-all duration-200"
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarDropdown;
