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
                    flex items-center justify-between w-full p-3 rounded-lg 
                    transition-all duration-200
                    ${active ? "bg-teal-700 text-white shadow-inner" : "hover:bg-teal-800"}
                `}
            >
                {/* ICON + LABEL */}
                <div className="flex items-center gap-3">
                    <Icon className="text-xl transition-transform group-hover:scale-110" />
                    {!collapsed && <span className="font-medium">{label}</span>}
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
                        ml-12 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-300
                        ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
                    `}
                >
                    {items.map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="p-2 text-sm rounded-md hover:bg-teal-800 transition-all duration-200"
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
