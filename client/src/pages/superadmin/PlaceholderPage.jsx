import React from "react";
import { FiLayout } from "react-icons/fi";

const PlaceholderPage = ({ title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 mb-6">
                <FiLayout size={40} />
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-2">{title}</h1>
            <p className="text-slate-500 max-w-md mb-8">
                {description || "Halaman ini sedang dalam tahap pengembangan. Integrasi detail akan dikerjakan setelah standar UI Superadmin disepakati."}
            </p>
            <div className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-600/20">
                Coming Soon
            </div>
        </div>
    );
};

export default PlaceholderPage;
