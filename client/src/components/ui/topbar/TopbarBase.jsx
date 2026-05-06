// client/src/components/ui/topbar/TopbarBase.jsx
import React, { useState, useEffect } from "react";
import { FiBell } from "react-icons/fi";

import TopbarUserMenu from "./TopbarUserMenu";
import TopbarNotification from "./TopbarNotification";

/*
    ➤ PERUBAHAN PENTING:
    - Tambahkan prop: isCollapsed 
      agar topbar tahu kapan sidebar mengecil/melebar
*/
const TopbarBase = ({
    title,
    user,
    notificationService,
    dummyNotifications,
    isCollapsed   // ← TAMBAHAN PROP
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
            className="
                h-16 bg-white border-b border-teal-100 shadow-sm 
                flex items-center justify-between px-6 
                fixed top-0 right-0 z-40
                transition-all duration-300
            "
            /* 
                ➤ LOGIC UTAMA POSISI TOPBAR:
                - marginLeft mengikuti besar Sidebar:
                  collapsed = 5rem (w-20)
                  expanded = 18rem (w-72)
                - Width topbar dihitung otomatis agar penuh
            */
            style={{
                marginLeft: isCollapsed ? "5rem" : "18rem",
                width: `calc(100% - ${isCollapsed ? "5rem" : "18rem"})`
            }}
        >
            {/* TITLE */}
            <div className="text-lg font-semibold text-teal-700 tracking-wide">
                {title}
            </div>

            <div className="flex items-center gap-6">

                {/* NOTIFICATION */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setOpenNotif(!openNotif);
                            setOpenMenu(false);
                        }}
                        className="relative"
                    >
                        <FiBell className="text-teal-700 text-xl hover:text-teal-900 transition" />

                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 w-2.5 h-2.5 rounded-full border border-white" />
                        )}
                    </button>

                    {openNotif && (
                        <TopbarNotification notifList={notifList} />
                    )}
                </div>

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
