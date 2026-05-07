import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import SidebarBase from "@client/components/ui/sidebar/SidebarBase";
import TopbarBase from "@client/components/ui/topbar/TopbarBase";

import superadminSidebar from "@client/components/ui/sidebar/sidebar-data/superadmin";
import superadminTopbar from "@client/components/ui/topbar/topbar-data/superadmin";

import notificationService from "@client/services/mockNotificationService";
import { dummyNotifications } from "@client/data/mock";
import { useSuperadminPersona } from "@client/context/SuperadminPersonaContext";

const SuperAdminLayout = () => {
    const { selectedSuperadmin } = useSuperadminPersona();
    // ➜ THEME STATE
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("rkk-dashboard-theme") || "light";
    });

    useEffect(() => {
        localStorage.setItem("rkk-dashboard-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    };

    // ➜ SIDEBAR COLLAPSE STATE
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="dashboard-shell" data-theme={theme}>
            {/* SIDEBAR */}
            <SidebarBase
                menu={superadminSidebar}
                user={selectedSuperadmin}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* MAIN CONTENT AREA */}
            <div
                className="dashboard-main flex-1 flex flex-col"
                style={{
                    marginLeft: isCollapsed ? "5rem" : "18rem",
                }}
            >
                {/* TOPBAR */}
                <TopbarBase
                    title={superadminTopbar.title}
                    user={selectedSuperadmin}
                    isCollapsed={isCollapsed}
                    notificationService={notificationService}
                    dummyNotifications={dummyNotifications}
                    theme={theme}
                    onToggleTheme={handleToggleTheme}
                    showSuperadminSwitcher={true}
                />

                {/* PAGE CONTENT VIA OUTLET */}
                <main className="dashboard-page flex-1 mt-16">
                    <div className="dashboard-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;
                