import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import SidebarBase from "@client/components/ui/sidebar/SidebarBase";
import TopbarBase from "@client/components/ui/topbar/TopbarBase";

import arsitekSidebar from "@client/components/ui/sidebar/sidebar-data/arsitek";
import arsitekTopbar from "@client/components/ui/topbar/topbar-data/arsitek";

import notificationService from "@client/services/mockNotificationService";
import { dummyNotifications } from "@client/data/mock";
import { useArchitectPersona } from "../context/ArchitectPersonaContext";

const ArsitekLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("rkk-dashboard-theme") || "light";
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("rkk-dashboard-theme", theme);
    }, [theme]);

    const { selectedArchitect } = useArchitectPersona();

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    // Use selected architect data if available, otherwise fallback to mock
    const currentUser = selectedArchitect ? {
        name: selectedArchitect.name,
        role: "Arsitek / Architect",
        photo: selectedArchitect.avatar || arsitekTopbar.user.photo
    } : arsitekTopbar.user;

    return (
        <div className="dashboard-shell flex min-h-screen">
            {/* SIDEBAR */}
            <SidebarBase
                menu={arsitekSidebar}
                user={currentUser}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                panelLabel="Arsitek Panel"
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
                    title={arsitekTopbar.title}
                    user={currentUser}
                    isCollapsed={isCollapsed}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    notificationService={notificationService}
                    dummyNotifications={dummyNotifications}
                    showArchitectSwitcher={true}
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

export default ArsitekLayout;
