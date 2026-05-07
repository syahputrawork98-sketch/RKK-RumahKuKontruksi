// client/src/components/ui/topbar/TopbarBase.jsx
import React, { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";

import ThemeToggle from "../theme/ThemeToggle";
import TopbarUserMenu from "./TopbarUserMenu";
import TopbarNotification from "./TopbarNotification";
import SupervisorSwitcher from "./SupervisorSwitcher";
import ForemanSwitcher from "./ForemanSwitcher";
import ArchitectSwitcher from "./ArchitectSwitcher";

const TopbarBase = ({
    title,
    user,
    notificationService,
    dummyNotifications,
    isCollapsed,
    theme,
    onToggleTheme,
    showSupervisorSwitcher = false,
    showForemanSwitcher = false,
    showArchitectSwitcher = false
}) => {

    const [openMenu, setOpenMenu] = useState(false);
    const [openNotif, setOpenNotif] = useState(false);
    const [notifList, setNotifList] = useState([]);

    useEffect(() => {
        setNotifList(dummyNotifications || []);

        if (notificationService) {
            const unsub = notificationService.subscribe((notif) =>
                setNotifList((prev) => [{ ...notif, read: false }, ...prev])
            );

            return () => unsub();
        }
    }, []);

    const unreadCount = notifList.filter((n) => !n.read).length;

    return (
        <header
            className="dashboard-topbar fixed top-0 right-0 h-16 z-40 transition-all duration-300 flex items-center justify-between"
            style={{
                width: `calc(100% - ${isCollapsed ? "5rem" : "18rem"})`
            }}
        >
            {/* TITLE & BREADCRUMB AREA */}
            <div className="flex items-center gap-6 ml-8">
                <div className="flex flex-col">
                    <h2 className="dashboard-title !text-lg leading-tight">
                        {title}
                    </h2>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-[var(--dashboard-primary)] font-bold uppercase tracking-widest">RKK Dashboard</span>
                        <span className="w-1 h-1 bg-[var(--dashboard-border)] rounded-full"></span>
                        <span className="text-[10px] text-[var(--dashboard-text-muted)] font-medium italic">Internal System</span>
                    </div>
                </div>

                {/* PERSONA SWITCHER (DEV ONLY) */}
                {showSupervisorSwitcher && <SupervisorSwitcher />}
                {showForemanSwitcher && <ForemanSwitcher />}
                {showArchitectSwitcher && <ArchitectSwitcher />}
            </div>

            <div className="flex items-center gap-4 mr-8">
                {/* THEME TOGGLE */}
                <ThemeToggle theme={theme} onToggle={onToggleTheme} />

                {/* NOTIFICATION */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setOpenNotif(!openNotif);
                            setOpenMenu(false);
                        }}
                        className={`
                            dashboard-icon-button relative
                            ${openNotif ? "bg-[var(--dashboard-primary-soft)] text-[var(--dashboard-primary)]" : ""}
                        `}
                    >
                        <FiBell className="text-xl" />

                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 bg-[var(--dashboard-danger)] w-2.5 h-2.5 rounded-full border-2 border-[var(--dashboard-surface)] animate-pulse" />
                        )}
                    </button>

                    {openNotif && (
                        <TopbarNotification notifList={notifList} />
                    )}
                </div>

                <div className="w-px h-8 bg-[var(--dashboard-border)] mx-2"></div>

                {/* USER MENU */}
                <TopbarUserMenu
                    user={user}
                    open={openMenu}
                    onToggle={() => {
                        setOpenMenu(!openMenu);
                        setOpenNotif(false);
                    }}
                />
            </div>
        </header>
    );
};

export default TopbarBase;
