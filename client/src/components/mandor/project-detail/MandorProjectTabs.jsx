import React from "react";

const MandorProjectTabs = ({ tabs, activeTab, onTabChange }) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-2 border-b border-[var(--dashboard-border)]">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-t-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap
                        ${activeTab === tab.id 
                            ? "bg-[var(--dashboard-primary)] text-white shadow-lg shadow-[var(--dashboard-primary)]/20 translate-y-0.5 scale-105" 
                            : "text-[var(--dashboard-text-soft)] hover:bg-[var(--dashboard-surface-soft)] hover:text-[var(--dashboard-text)]"}
                    `}
                >
                    <tab.icon size={14} />
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default MandorProjectTabs;
