import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import SidebarBase from "@client/components/ui/sidebar/SidebarBase";
import TopbarBase from "@client/components/ui/topbar/TopbarBase";

import pengawasSidebar from "@client/components/ui/sidebar/sidebar-data/pengawas";
import pengawasTopbar from "@client/components/ui/topbar/topbar-data/pengawas";

import notificationService from "@client/services/mockNotificationService";
import { dummyNotifications } from "@client/data/mock";

import { useSupervisorPersona } from "@client/context/SupervisorPersonaContext";

const PengawasLayout = () => {
    const { selectedSupervisor } = useSupervisorPersona();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("rkk-dashboard-theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("rkk-dashboard-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    const userData = selectedSupervisor ? {
        name: selectedSupervisor.name,
        role: "Site Supervisor",
        photo: selectedSupervisor.avatar || "https://i.pravatar.cc/150?u=placeholder"
    } : pengawasTopbar.user;

    return (
        <div className="dashboard-shell flex min-h-screen">
            {/* SIDEBAR */}
            <SidebarBase
                menu={pengawasSidebar}
                user={userData}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                panelLabel="Pengawas Panel"
            />

            {/* MAIN CONTENT AREA */}
            <div 
                className="dashboard-main flex-1 flex flex-col transition-all duration-300"
                style={{
                    marginLeft: isCollapsed ? "5rem" : "18rem",
                }}
            >
                {/* TOPBAR */}
                <TopbarBase
                    title={pengawasTopbar.title}
                    user={userData}
                    isCollapsed={isCollapsed}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    notificationService={notificationService}
                    dummyNotifications={dummyNotifications}
                    showSupervisorSwitcher={true}
                />

                {/* PAGE CONTENT VIA OUTLET */}
                <main className="dashboard-page flex-1 mt-16 p-6 overflow-y-auto">
                    <div className="dashboard-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PengawasLayout;
