// client/src/components/ui/topbar/TopbarNotification.jsx
import React from "react";
import LogNotifikasi from "./LogNotifikasi";

const TopbarNotification = ({ notifList }) => {
    return (
        <div className="absolute right-0 mt-3 z-50">
            <LogNotifikasi notifList={notifList} />
        </div>
    );
};

export default TopbarNotification;
