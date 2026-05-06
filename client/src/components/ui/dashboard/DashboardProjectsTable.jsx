// client/src/components/ui/dashboard/DashboardProjectsTable.jsx

import React from "react";

export const DashboardProjectsTable = ({ projects }) => (
    <div className="mt-8 bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold text-[#1A4D2E] mb-4">Ringkasan Proyek Terbaru</h2>

        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-gray-500 border-b">
                        <th className="pb-3 pr-4">Kode</th>
                        <th className="pb-3 pr-4">Nama Proyek</th>
                        <th className="pb-3 pr-4">Progress</th>
                        <th className="pb-3 pr-4">Status</th>
                        <th className="pb-3 pr-4">Nilai</th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((p) => (
                        <tr key={p.kode} className="hover:bg-gray-50">
                            <td className="py-3 pr-4 font-mono text-xs">{p.kode}</td>
                            <td className="py-3 pr-4">{p.name}</td>

                            <td className="py-3 pr-4">
                                <div className="w-40 bg-gray-200 h-2 rounded-full">
                                    <div
                                        className="bg-[#1A4D2E] h-2"
                                        style={{ width: `${p.progress}%` }}
                                    />
                                </div>
                            </td>

                            <td className="py-3 pr-4">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                                    {p.status}
                                </span>
                            </td>

                            <td className="py-3 pr-4">{p.nilai}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
