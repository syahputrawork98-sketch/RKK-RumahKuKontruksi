import React from 'react';
import { FiEdit2 } from "react-icons/fi";

const CuratedInstructionPanel = ({ instruction, onInstructionChange, onSubmit, submitting }) => {
    return (
        <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-[2rem] space-y-4">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600 text-white rounded-lg"><FiEdit2 size={14} /></div>
                <h4 className="text-xs font-black uppercase tracking-widest text-indigo-900">Curated Instruction</h4>
            </div>
            <p className="text-[10px] text-indigo-700 font-bold leading-relaxed italic">
                Gunakan area ini untuk merangkum brief Konsumen menjadi instruksi teknis yang jelas bagi Arsitek.
            </p>
            <textarea
                className="w-full p-4 bg-white border border-indigo-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none min-h-[120px]"
                placeholder="Tulis instruksi untuk arsitek di sini..."
                value={instruction}
                onChange={(e) => onInstructionChange(e.target.value)}
            />
            <button
                onClick={onSubmit}
                disabled={submitting || !instruction.trim()}
                className="w-full py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
                {submitting ? "Menyimpan..." : "Update & Kirim ke Arsitek"}
            </button>
        </div>
    );
};

export default CuratedInstructionPanel;
