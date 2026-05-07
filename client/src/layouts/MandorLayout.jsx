import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import SidebarBase from "@client/components/ui/sidebar/SidebarBase";
import TopbarBase from "@client/components/ui/topbar/TopbarBase";

import mandorSidebar from "@client/components/ui/sidebar/sidebar-data/mandor";
import mandorTopbar from "@client/components/ui/topbar/topbar-data/mandor";

import notificationService from "@client/services/mockNotificationService";
import { dummyNotifications } from "@client/data/mock";

import { useForemanPersona } from "@client/context/ForemanPersonaContext";

const MandorLayout = () => {
    const { selectedForeman } = useForemanPersona();
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

    const userData = selectedForeman ? {
        name: selectedForeman.name,
        role: "Foreman / Mandor",
        photo: selectedForeman.avatar || "https://i.pravatar.cc/150?u=placeholder"
    } : mandorTopbar.user;

    return (
        <div className="dashboard-shell flex min-h-screen">
            {/* SIDEBAR */}
            <SidebarBase
                menu={mandorSidebar}
                user={userData}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
                panelLabel="Mandor Panel"
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
                    title={mandorTopbar.title}
                    user={userData}
                    isCollapsed={isCollapsed}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    notificationService={notificationService}
                    dummyNotifications={dummyNotifications}
                    showForemanSwitcher={true}
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

export default MandorLayout;
