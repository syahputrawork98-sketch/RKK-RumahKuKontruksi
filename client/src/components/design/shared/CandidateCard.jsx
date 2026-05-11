import React from 'react';
import { FiCheckCircle } from "react-icons/fi";

const CandidateCard = ({ 
    candidate, 
    isSelected, 
    onToggle, 
    typeColor = "emerald", 
    avatarLetter = "M" 
}) => {
    const activeBorder = typeColor === "emerald" ? "border-emerald-300 ring-emerald-500/10" : "border-blue-300 ring-blue-500/10";
    const activeBg = typeColor === "emerald" ? "bg-emerald-50" : "bg-blue-50";
    const activeIconBg = typeColor === "emerald" ? "bg-emerald-600" : "bg-blue-600";
    const activeCheck = typeColor === "emerald" ? "text-emerald-600" : "text-blue-600";
    const hoverBorder = typeColor === "emerald" ? "hover:border-emerald-200" : "hover:border-blue-200";

    return (
        <div 
            onClick={() => onToggle(candidate.id)}
            className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isSelected 
                ? `${activeBg} ${activeBorder} ring-2` 
                : `bg-gray-50 border-gray-100 ${hoverBorder}`
            }`}
        >
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-[10px] ${isSelected ? `${activeIconBg} text-white` : 'bg-gray-200 text-gray-500'}`}>
                    {candidate.name?.[0] || avatarLetter}
                </div>
                <div>
                    <p className="text-[11px] font-bold text-gray-800">{candidate.name}</p>
                    <p className="text-[9px] text-gray-500 font-medium">
                        {candidate.specialization || 'Umum'} • {candidate.city || candidate.experienceYears + ' thn'}
                    </p>
                </div>
            </div>
            {isSelected && <FiCheckCircle className={activeCheck} size={14} />}
        </div>
    );
};

export default CandidateCard;
