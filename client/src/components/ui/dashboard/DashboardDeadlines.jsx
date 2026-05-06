// client/src/components/ui/dashboard/DashboardDeadlines.jsx

import React from "react";
import { motion } from "framer-motion";

export const DashboardDeadlines = ({ deadlines }) => (
    <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-[#1A4D2E] mb-4">Deadline Terdekat</h2>

        <div className="space-y-4">
            {deadlines.map((d) => (
                <div key={d.id} className="p-4 bg-[#FAFAFA] rounded-lg border">
                    <p className="font-semibold text-gray-800">{d.name}</p>
                    <p className="text-xs text-gray-500">Tenggat: {d.due}</p>

                    <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${d.progress}%` }}
                            transition={{ duration: 0.6 }}
                            className={`h-2 ${d.colorClass}`}
                        />
                    </div>
                </div>
            ))}
        </div>
    </div>
);
