// client/src/components/ui/dashboard/DashboardCharts.jsx

import React from "react";
import { TrendingUp, DollarSign } from "lucide-react";

export const DashboardCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

        {/* === CHART PROGRESS === */}
        <div className="bg-white p-6 rounded-xl shadow relative group">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1A4D2E]">Progress Proyek (Ringkasan)</h2>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Hold</span>
                </div>
            </div>

            <div className="h-[260px] rounded-lg border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                    <TrendingUp size={20} />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Chart Monitoring Progress</p>
                <p className="text-[10px] text-gray-400 italic mt-1">Integrasi visualisasi progres global dalam antrian pengembangan.</p>
            </div>
        </div>

        {/* === CHART KEUANGAN === */}
        <div className="bg-white p-6 rounded-xl shadow relative group">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#1A4D2E]">Pemasukan & Pengeluaran</h2>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-500 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">Hold</span>
                </div>
            </div>

            <div className="h-[260px] rounded-lg border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3 text-gray-400">
                    <DollarSign size={20} />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Statistik Finansial Global</p>
                <p className="text-[10px] text-gray-400 italic mt-1">Monitoring arus kas terpusat akan tersedia setelah modul Payment aktif.</p>
            </div>
        </div>
    </div>
);
