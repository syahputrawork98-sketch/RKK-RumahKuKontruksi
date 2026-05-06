// client/src/components/ui/dashboard/DashboardHeader.jsx

import React from "react";
import { Calendar, Clock } from "lucide-react";

export const DashboardHeader = () => (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
            <h1 className="text-3xl font-bold text-[#1A4D2E]">Dashboard Superadmin</h1>
            <p className="text-gray-600 mt-1">Monitoring proyek, keuangan, dan aktivitas tim</p>
        </div>

        <div className="flex items-center gap-3">

            {/* Box tanggal */}
            <div className="hidden md:flex items-center bg-white px-4 py-2 rounded-lg shadow border border-gray-200">
                <Calendar className="w-5 h-5 text-gray-500 mr-2" />
                <div>
                    <p className="text-xs text-gray-500">Tanggal</p>
                    <p className="text-sm font-medium">
                        {new Date().toLocaleDateString("id-ID")}
                    </p>
                </div>
            </div>

            {/* Button laporan */}
            <button className="flex items-center gap-2 bg-[#1A4D2E] text-white px-4 py-2 rounded-lg shadow hover:opacity-95">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Buat Laporan</span>
            </button>

        </div>
    </div>
);
