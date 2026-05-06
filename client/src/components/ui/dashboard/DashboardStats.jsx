// client/src/components/ui/dashboard/DashboardStats.jsx

import React from "react";
import { motion } from "framer-motion";

export const DashboardStats = ({ stats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((item, i) => {
            const Icon = item.icon;
            return (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="bg-white shadow-sm hover:shadow-md transition p-5 rounded-xl border border-gray-100 flex items-center justify-between"
                >
                    <div>
                        <p className="text-sm text-gray-500">{item.label}</p>
                        <h2 className="text-2xl font-bold text-[#1A4D2E] mt-1">{item.value}</h2>
                    </div>

                    <div
                        className="flex items-center justify-center w-14 h-14 rounded-lg"
                        style={{ background: `${item.color}22` }}
                    >
                        <Icon className="w-7 h-7" style={{ color: item.color }} />
                    </div>
                </motion.div>
            );
        })}
    </div>
);
