// client/src/components/ui/dashboard/DashboardStats.jsx

import React from "react";
import { motion } from "framer-motion";

export const DashboardStats = ({ stats }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((item, i) => {
            const Icon = item.icon;
            return (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
                    className="dashboard-card group hover:scale-[1.02] active:scale-[0.98] cursor-pointer relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <div
                                className="flex items-center justify-center w-12 h-12 rounded-2xl shadow-inner transition-transform group-hover:rotate-12"
                                style={{ background: `${item.color}15` }}
                            >
                                <Icon className="w-6 h-6" style={{ color: item.color }} />
                            </div>
                            <span className="text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest bg-[var(--dashboard-surface-soft)] px-2 py-1 rounded-md">
                                Live Data
                            </span>
                        </div>
                        
                        <p className="dashboard-subtitle font-bold text-xs uppercase tracking-tight">{item.label}</p>
                        <div className="flex items-baseline gap-2 mt-1">
                            <h2 className="dashboard-title text-3xl font-extrabold">{item.value}</h2>
                            <span className="text-[10px] text-emerald-500 font-bold">+12%</span>
                        </div>
                    </div>

                    {/* Decorative Background Icon */}
                    <Icon 
                        className="absolute -right-4 -bottom-4 w-24 h-24 text-[var(--dashboard-text-soft)] opacity-5 transition-transform group-hover:scale-110" 
                        style={{ color: item.color }}
                    />
                </motion.div>
            );
        })}
    </div>
);
