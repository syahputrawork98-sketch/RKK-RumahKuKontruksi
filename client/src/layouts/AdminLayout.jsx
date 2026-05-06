// client/src/layouts/SuperAdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import SidebarBase from "@client/components/ui/sidebar/SidebarBase";
import TopbarBase from "@client/components/ui/topbar/TopbarBase";

import adminSidebar from "@client/components/ui/sidebar/sidebar-data/admin";
import adminTopbar from "@client/components/ui/topbar/topbar-data/admin";

import notificationService from "@server/services/NotificationService";
import { dummyNotifications } from "@server/data/dummyNotifications";

const AdminLayout = () => {
  // ➜ STATE DIPAKAI BERSAMA (Sidebar & Topbar)
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <SidebarBase
        menu={adminSidebar}
        user={adminTopbar.user}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* MAIN CONTENT AREA */}
      <div
        className={`flex-1 transition-all duration-300`}
        style={{
          marginLeft: isCollapsed ? "5rem" : "18rem",
        }}
      >
        {/* TOPBAR */}
        <TopbarBase
          title={adminTopbar.title}
          user={adminTopbar.user}
          isCollapsed={isCollapsed}
          notificationService={notificationService}
          dummyNotifications={dummyNotifications}
        />

        {/* PAGE CONTENT VIA OUTLET */}
        <main className="p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
