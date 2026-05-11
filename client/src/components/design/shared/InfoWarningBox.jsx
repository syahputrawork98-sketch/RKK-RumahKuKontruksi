import React from 'react';
import { FiInfo, FiAlertCircle } from "react-icons/fi";

const InfoWarningBox = ({ type = "info", title, message, children }) => {
    const isInfo = type === "info";
    const containerStyle = isInfo 
        ? "bg-white/60 border-emerald-100 text-emerald-800" 
        : "bg-white/5 rounded-2xl border border-white/10 text-white/60";
    const titleStyle = isInfo ? "text-emerald-600" : "text-amber-400";
    const Icon = isInfo ? FiInfo : FiAlertCircle;

    return (
        <div className={`p-4 rounded-2xl border ${containerStyle} space-y-3`}>
            {(title || Icon) && (
                <div className={`flex items-center gap-2 ${titleStyle}`}>
                    <Icon size={14} />
                    {title && <h5 className="text-[9px] font-black uppercase tracking-widest">{title}</h5>}
                </div>
            )}
            {message && <p className="text-[10px] leading-relaxed font-medium">{message}</p>}
            {children}
        </div>
    );
};

export default InfoWarningBox;
