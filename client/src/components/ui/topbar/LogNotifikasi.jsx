// client/src/components/ui/topbar/LogNotifikasi.jsx
import React from "react";
import { FiCheckCircle } from "react-icons/fi";

const categoryColor = {
    pembayaran: "bg-blue-100 text-blue-700",
    proyek: "bg-green-100 text-green-700",
    user: "bg-purple-100 text-purple-700",
    sistem: "bg-orange-100 text-orange-700",
};

const LogNotifikasi = ({ notifList = [] }) => {
    return (
        <div className="w-80 bg-white rounded-xl shadow-xl border border-teal-100 py-3 z-50 animate-fadeIn">
            <h3 className="px-4 pb-2 text-sm font-semibold text-teal-700 border-b border-teal-50">
                Notifikasi
            </h3>

            {notifList.length === 0 ? (
                <p className="text-center py-4 text-gray-500 text-sm">
                    Tidak ada notifikasi
                </p>
            ) : (
                <div className="max-h-80 overflow-y-auto">
                    {notifList.map((item, i) => (
                        <div
                            key={i}
                            className={`px-4 py-3 border-b border-teal-50 cursor-pointer hover:bg-teal-50 transition ${!item.read ? "bg-teal-50/50" : ""
                                }`}
                        >
                            <div className="flex items-start gap-3">

                                {/* STATUS READ */}
                                <div className="pt-1">
                                    {item.read ? (
                                        <FiCheckCircle className="text-teal-500" />
                                    ) : (
                                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full inline-block"></span>
                                    )}
                                </div>

                                {/* CONTENT */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`text-xs px-2 py-0.5 rounded-full capitalize ${categoryColor[item.category] || "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {item.category}
                                        </span>
                                    </div>

                                    <p className="text-sm text-gray-700 font-medium mt-1">
                                        {item.title}
                                    </p>

                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {item.time}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LogNotifikasi;
