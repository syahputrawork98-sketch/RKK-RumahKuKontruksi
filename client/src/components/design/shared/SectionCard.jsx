import React from 'react';

const SectionCard = ({ children, className = "", title, icon: Icon, badge }) => {
    return (
        <div className={`p-6 border rounded-[2rem] shadow-sm space-y-4 ${className}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {Icon && (
                        <div className="p-2 rounded-lg bg-gray-100 text-gray-600">
                            <Icon size={14} />
                        </div>
                    )}
                    <h4 className="text-xs font-black uppercase tracking-widest text-gray-900">
                        {title}
                    </h4>
                </div>
                {badge && (
                    <span className="px-2 py-0.5 text-[8px] font-black uppercase rounded bg-gray-200 text-gray-700">
                        {badge}
                    </span>
                )}
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

export default SectionCard;
