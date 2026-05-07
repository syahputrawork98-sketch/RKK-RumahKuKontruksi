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
                h-16 bg-white/80 backdrop-blur-md border-b border-teal-500/10 shadow-sm 
                flex items-center justify-between px-8 
                fixed top-0 right-0 z-40
                transition-all duration-300
            "
            style={{
                marginLeft: isCollapsed ? "5rem" : "18rem",
                width: `calc(100% - ${isCollapsed ? "5rem" : "18rem"})`
            }}
        >
            {/* TITLE & BREADCRUMB AREA */}
            <div className="flex flex-col">
                <h2 className="text-lg font-bold text-slate-800 tracking-tight leading-tight">
                    {title}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">RKK Dashboard</span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-[10px] text-slate-400 font-medium italic">Internal System</span>
                </div>
            </div>

            <div className="flex items-center gap-4">

                {/* NOTIFICATION */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setOpenNotif(!openNotif);
                            setOpenMenu(false);
                        }}
                        className={`
                            relative p-2.5 rounded-full transition-all duration-200
                            ${openNotif ? "bg-teal-50 text-teal-600" : "text-slate-500 hover:bg-slate-100"}
                        `}
                    >
                        <FiBell className="text-xl" />

                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 bg-red-500 w-2.5 h-2.5 rounded-full border-2 border-white animate-pulse" />
                        )}
                    </button>

                    {openNotif && (
                        <TopbarNotification notifList={notifList} />
                    )}
                </div>

                <div className="w-px h-8 bg-slate-200 mx-2"></div>

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
