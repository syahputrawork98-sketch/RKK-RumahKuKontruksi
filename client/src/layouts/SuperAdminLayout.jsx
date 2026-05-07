// client/src/layouts/SuperAdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import SidebarBase from "@client/components/ui/sidebar/SidebarBase";
import TopbarBase from "@client/components/ui/topbar/TopbarBase";

import superadminSidebar from "@client/components/ui/sidebar/sidebar-data/superadmin";
import superadminTopbar from "@client/components/ui/topbar/topbar-data/superadmin";

import notificationService from "@client/services/mockNotificationService";
import { dummyNotifications } from "@client/data/mock";

const SuperAdminLayout = () => {

    // ➜ STATE DIPAKAI BERSAMA (Sidebar & Topbar)
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="dashboard-shell">

            {/* SIDEBAR */}
            <SidebarBase
                menu={superadminSidebar}
                user={superadminTopbar.user}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* MAIN CONTENT AREA */}
            <div
                className="dashboard-main"
                style={{
                    marginLeft: isCollapsed ? "5rem" : "18rem",
                }}
            >

                {/* TOPBAR */}
                <TopbarBase
                    title={superadminTopbar.title}
                    user={superadminTopbar.user}
                    isCollapsed={isCollapsed}
                    notificationService={notificationService}
                    dummyNotifications={dummyNotifications}
                />

                {/* PAGE CONTENT VIA OUTLET */}
                <main className="dashboard-page">
                    <div className="dashboard-container">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;
                