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
        <div className="flex min-h-screen bg-slate-50">

            {/* SIDEBAR */}
            <SidebarBase
                menu={superadminSidebar}
                user={superadminTopbar.user}
                isCollapsed={isCollapsed}
                setIsCollapsed={setIsCollapsed}
            />

            {/* MAIN CONTENT AREA */}
            <div
                className="flex-1 flex flex-col transition-all duration-300"
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
                <main className="flex-1 p-8 mt-16 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;
                