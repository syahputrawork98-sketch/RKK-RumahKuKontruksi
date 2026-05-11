import React from 'react';

const RevisionMonitoringPanel = ({ majorCount, minorCount }) => {
    const isLimitReached = majorCount >= 3 || minorCount >= 5;

    return (
        <div className={`p-6 rounded-[2rem] border space-y-4 ${isLimitReached ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
            <div className="flex items-center justify-between">
                <h4 className={`text-[10px] font-black uppercase tracking-widest ${isLimitReached ? 'text-red-700' : 'text-slate-500'}`}>
                    Revision Monitoring
                </h4>
                {isLimitReached && (
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-black uppercase rounded-md">LIMIT REACHED</span>
                )}
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">Major</p>
                    <p className={`text-lg font-black ${majorCount >= 3 ? 'text-red-600' : 'text-slate-800'}`}>
                        {majorCount || 0} / 3
                    </p>
                </div>
                <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase">Minor</p>
                    <p className={`text-lg font-black ${minorCount >= 5 ? 'text-red-600' : 'text-slate-800'}`}>
                        {minorCount || 0} / 5
                    </p>
                </div>
            </div>
            {isLimitReached && (
                <div className="pt-2 border-t border-red-100">
                    <p className="text-[10px] font-bold text-red-700 leading-relaxed uppercase italic">
                        Admin Action Required: Revision limit reached. Consider placing on "Hold" or initiating project conversion.
                    </p>
                </div>
            )}
        </div>
    );
};

export default RevisionMonitoringPanel;
