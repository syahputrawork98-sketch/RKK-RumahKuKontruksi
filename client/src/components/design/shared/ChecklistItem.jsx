import React from 'react';
import { FiCheckCircle, FiClock } from "react-icons/fi";

const ChecklistItem = ({ isDone, label }) => {
    return (
        <div className="flex items-center gap-2 text-[10px] font-bold text-blue-700">
            {isDone ? (
                <FiCheckCircle className="text-emerald-500" size={12} />
            ) : (
                <FiClock className="text-blue-400" size={12} />
            )}
            <span>{label}</span>
        </div>
    );
};

export default ChecklistItem;
