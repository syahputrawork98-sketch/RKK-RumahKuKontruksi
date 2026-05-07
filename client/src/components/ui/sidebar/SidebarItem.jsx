import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon: Icon, label, href, collapsed }) => {
    return (
        <NavLink
            to={href}
            className={({ isActive }) => `
                dashboard-sidebar-item group relative
                ${isActive ? "dashboard-sidebar-item-active" : ""}
            `}
        >
            <div className="flex items-center justify-center">
                <Icon size={20} />
            </div>

            {!collapsed && <span className="font-semibold tracking-wide">{label}</span>}

            {collapsed && (
                <span className="absolute left-full ml-4 px-3 py-2 rounded-lg bg-[var(--dashboard-surface)] text-[var(--dashboard-text)] text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl border border-[var(--dashboard-border)] pointer-events-none whitespace-nowrap z-50">
                    {label}
                </span>
            )}
        </NavLink>
    );
};

export default SidebarItem;
