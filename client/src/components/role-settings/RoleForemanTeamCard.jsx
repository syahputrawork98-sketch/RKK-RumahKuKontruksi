import React from 'react';
import { FiUsers } from "react-icons/fi";

const RoleForemanTeamCard = () => {
    return (
        <div className="dashboard-card space-y-6">
            <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                <FiUsers className="text-[var(--dashboard-primary)]" size={20} />
                <h3 className="font-bold text-sm">Tim Binaan</h3>
            </div>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                    <span className="text-xs font-bold text-[var(--dashboard-text)]">Total Pekerja Terdaftar</span>
                    <span className="text-sm font-black text-[var(--dashboard-primary)]">0 Orang</span>
                </div>
                <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium leading-relaxed italic">
                    Data tukang dikelola secara mandiri oleh Mandor. Sistem hanya memantau ringkasan jumlah dan kehadiran di proyek.
                </p>
            </div>
        </div>
    );
};

export default RoleForemanTeamCard;
