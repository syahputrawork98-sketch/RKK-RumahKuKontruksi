// client/src/components/ui/dashboard/DashboardWeeklySummary.jsx

import React from "react";
import { motion } from "framer-motion";
import { FolderPlus, CheckCircle2, Hammer, MessageSquare } from "lucide-react";

export const DashboardWeeklySummary = ({ summary }) => (
    <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-[#1A4D2E] mb-4">
            Ringkasan Mingguan
        </h2>

        <div className="grid grid-cols-1 gap-4">
            {summary.map((item, i) => {
                const Icon = item.icon;
                return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.08 }}
                        className="flex items-center gap-3 p-3 bg-[#F9FAFB] rounded-lg border border-gray-200"
                    >
                        <div
                            className="w-10 h-10 flex items-center justify-center rounded-lg"
                            style={{ background: `${item.color}22` }}
                        >
                            <Icon size={20} color={item.color} />
                        </div>

                        <div>
                            <p className="text-sm text-gray-600">{item.label}</p>
                            <p className="text-lg font-semibold">{item.value}</p>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    </div>
);
