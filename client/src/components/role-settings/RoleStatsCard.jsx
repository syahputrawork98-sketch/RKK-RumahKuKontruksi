import React from 'react';

const RoleStatsCard = ({ stats, config }) => {
    return (
        <div className={`grid grid-cols-2 md:grid-cols-${config.length} gap-4 mb-8`}>
            {config.map((item, index) => (
                <div key={index} className="p-4 bg-[var(--dashboard-surface-soft)] rounded-2xl border border-[var(--dashboard-border)] text-center">
                    <p className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase mb-1">{item.label}</p>
                    <p className="text-lg font-black">{item.getValue(stats)}</p>
                </div>
            ))}
        </div>
    );
};

export default RoleStatsCard;
