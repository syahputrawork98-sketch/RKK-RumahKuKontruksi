// client/src/components/ui/dashboard/DashboardCharts.jsx

import React from "react";
import { TrendingUp, DollarSign } from "lucide-react";

export const DashboardCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* === CHART PROGRESS === */}
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1A4D2E]">Progress Proyek (Ringkasan)</h2>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4" />
                    Live
                </div>
            </div>

            <div className="h-[260px] rounded-lg border border-dashed border-gray-200 bg-gray-100 flex items-center justify-center">
                Chart Placeholder
            </div>
        </div>

        {/* === CHART KEUANGAN === */}
        <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1A4D2E]">Pemasukan & Pengeluaran</h2>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <DollarSign className="w-4 h-4" />
                    Bulanan
                </div>
            </div>

            <div className="h-[260px] rounded-lg border border-dashed border-gray-200 bg-gray-100 flex items-center justify-center">
                Chart Placeholder
            </div>
        </div>
    </div>
);
