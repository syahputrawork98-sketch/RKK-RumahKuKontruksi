// client/src/components/ui/dashboard/DashboardActivity.jsx

import React from "react";

export const DashboardActivity = ({ activities }) => (
    <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-[#1A4D2E] mb-4">Aktivitas Terbaru</h2>

        <div className="relative pl-4">
            <div className="absolute left-2 top-0 bottom-0 w-[2px] bg-[#E6E6E6]" />

            <div className="space-y-6">
                {activities.map((a) => (
                    <div key={a.id} className="flex items-start gap-4">
                        <div className="w-3 h-3 bg-[#1A4D2E] rounded-full translate-y-1"></div>

                        <div>
                            <p className="text-sm font-medium text-gray-700">{a.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{a.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
