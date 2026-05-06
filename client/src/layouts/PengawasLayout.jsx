// client/src/layouts/SuperAdminLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import SidebarBase from "@client/components/ui/sidebar/SidebarBase";
import TopbarBase from "@client/components/ui/topbar/TopbarBase";

import pengawasSidebar from "@client/components/ui/sidebar/sidebar-data/pengawas";
import pengawasTopbar from "@client/components/ui/topbar/topbar-data/pengawas";

import notificationService from "@server/services/NotificationService";
import { dummyNotifications } from "@server/data/dummyNotifications";

const PengawasLayout = () => {
  // ➜ STATE DIPAKAI BERSAMA (Sidebar & Topbar)
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <SidebarBase
        menu={pengawasSidebar}
        user={pengawasTopbar.user}
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
          title={pengawasTopbar.title}
          user={pengawasTopbar.user}
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

export default PengawasLayout;
