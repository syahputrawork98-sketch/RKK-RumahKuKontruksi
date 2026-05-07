import { NavLink, useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

const SidebarDropdown = ({ icon: Icon, label, items, collapsed }) => {
    const location = useLocation();
    const isChildActive = items.some(item => location.pathname === item.href);
    const [open, setOpen] = useState(isChildActive);

    return (
        <div className="select-none">
            {/* BUTTON UTAMA DROPDOWN */}
            <button
                onClick={() => setOpen(!open)}
                className={`
                    dashboard-sidebar-item w-full flex items-center justify-between border-none
                    ${isChildActive ? "dashboard-sidebar-item-active" : ""}
                `}
            >
                {/* ICON + LABEL */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center">
                        <Icon size={20} />
                    </div>
                    {!collapsed && <span className="font-semibold tracking-wide">{label}</span>}
                </div>

                {/* CHEVRON */}
                {!collapsed && (
                    <FiChevronDown
                        className={`text-lg transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                    />
                )}
            </button>

            {/* SUBMENU DROPDOWN */}
            {!collapsed && (
                <div
                    className={`
                        ml-6 mt-1 flex flex-col gap-1 overflow-hidden transition-all duration-300 border-l border-[var(--dashboard-sidebar-border)] pl-4
                        ${open ? "max-h-96 opacity-100 py-2" : "max-h-0 opacity-0"}
                    `}
                >
                    {items.map((item, idx) => (
                        <NavLink
                            key={idx}
                            to={item.href}
                            className={({ isActive }) => `
                                px-4 py-2.5 text-xs font-bold rounded-xl transition-all duration-200
                                ${isActive 
                                    ? "bg-[var(--dashboard-sidebar-active-bg)] text-[var(--dashboard-sidebar-active-text)]" 
                                    : "text-[var(--dashboard-sidebar-muted)] hover:bg-[var(--dashboard-sidebar-hover-bg)] hover:text-[var(--dashboard-sidebar-text)]"}
                            `}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarDropdown;
