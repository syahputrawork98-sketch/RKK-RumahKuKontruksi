import React from 'react';
import { FiClock } from "react-icons/fi";

const HoldStateCard = ({ title, icon: Icon, message }) => {
    return (
        <div className="p-6 bg-gray-50 border border-gray-200 rounded-[2rem] opacity-60">
            <div className="flex items-center gap-2 mb-2">
                {Icon ? <Icon className="text-gray-400" size={16} /> : <FiClock className="text-gray-400" size={16} />}
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{title} (Hold)</h4>
            </div>
            <p className="text-[9px] text-gray-400 font-bold italic leading-relaxed">
                {message}
            </p>
        </div>
    );
};

export default HoldStateCard;
