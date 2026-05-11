import React from 'react';
import { FiMonitor, FiInfo } from "react-icons/fi";
import GovernanceNotice from "../common/GovernanceNotice";

const RoleGovernanceNoticePanel = ({ roleName, infoText }) => {
    return (
        <div className="dashboard-card space-y-6">
            <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                <FiMonitor className="text-[var(--dashboard-primary)]" size={20} />
                <h3 className="font-bold text-sm">Akses & Keamanan</h3>
            </div>
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
                <FiInfo className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-[10px] font-medium text-amber-700 leading-relaxed">
                    {infoText || "Fitur keamanan dan manajemen sesi sedang dalam pengembangan. Saat ini akses menggunakan mode **Database-Backed Persona (Dev Mode)**."}
                </p>
            </div>

            <GovernanceNotice roleName={roleName} />
        </div>
    );
};

export default RoleGovernanceNoticePanel;
