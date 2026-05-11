import React from 'react';
import { FiUserPlus } from "react-icons/fi";
import { hasConstructionIntent } from "../../../utils/designRequestHistory";
import CandidateCard from "../shared/CandidateCard";
import HoldStateCard from "../shared/HoldStateCard";

const MandorSelectionPreparationPanel = ({ 
    history, 
    foremen, 
    selectedMandorIds, 
    toggleMandorSelection, 
    mandorNote, 
    setMandorNote, 
    onSubmit, 
    submitting 
}) => {
    const isConstructionPrep = hasConstructionIntent(history);

    if (!isConstructionPrep) {
        return (
            <HoldStateCard 
                title="Mandor Prep" 
                icon={FiUserPlus} 
                message="Tersedia setelah Konsumen memilih 'Continue to Construction Preparation'." 
            />
        );
    }

    return (
        <div className="p-6 bg-white border border-emerald-200 rounded-[2rem] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-emerald-600 text-white rounded-lg"><FiUserPlus size={14} /></div>
                    <h4 className="text-xs font-black uppercase tracking-widest text-emerald-900">Mandor Selection Prep</h4>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[8px] font-black uppercase rounded">Preparation Layer</span>
            </div>

            <p className="text-[10px] text-emerald-700 font-bold leading-relaxed italic">
                Shortlist kandidat Mandor lokal untuk persiapan konstruksi.
            </p>

            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {foremen.length > 0 ? foremen.map(f => (
                    <CandidateCard 
                        key={f.id}
                        candidate={f}
                        isSelected={selectedMandorIds.includes(f.id)}
                        onToggle={toggleMandorSelection}
                    />
                )) : (
                    <p className="text-[10px] text-gray-400 italic text-center py-4">Memuat data Mandor...</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-gray-400">Catatan Persiapan</label>
                <textarea
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none min-h-[80px]"
                    placeholder="Tulis catatan kriteria atau alasan pemilihan shortlist..."
                    value={mandorNote}
                    onChange={(e) => setMandorNote(e.target.value)}
                />
            </div>

            <button
                onClick={onSubmit}
                disabled={submitting || (selectedMandorIds.length === 0 && !mandorNote.trim())}
                className="w-full py-3 bg-emerald-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-600/20 hover:scale-[1.01] transition-all disabled:opacity-50"
            >
                {submitting ? "Menyimpan..." : "Simpan Shortlist Prep"}
            </button>
        </div>
    );
};

export default MandorSelectionPreparationPanel;
