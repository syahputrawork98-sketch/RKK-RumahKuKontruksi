import React from 'react';
import { FiZap, FiActivity } from "react-icons/fi";
import { getConstructionTransitionFlags, getLatestCustomerPostDesignDecision, getLatestMandorPreparation, getLatestConstructionReadiness } from "../../../utils/designRequestHistory";
import InfoWarningBox from "../shared/InfoWarningBox";

const ConstructionTransitionSummaryPanel = ({ history }) => {
    const flags = getConstructionTransitionFlags(history);
    const latestDecision = getLatestCustomerPostDesignDecision(history);
    const latestMandorPrep = getLatestMandorPreparation(history);
    const latestReadiness = getLatestConstructionReadiness(history);

    const decision = latestDecision?.metadata?.decision;

    if (!decision && !latestMandorPrep && !latestReadiness) return null;

    return (
        <div className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-xl space-y-6 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <FiZap size={120} />
            </div>

            <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-indigo-500 rounded-lg"><FiActivity size={14} /></div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-100">Transition Summary</h4>
                </div>
                <span className="px-2 py-0.5 bg-white/10 text-white/60 text-[8px] font-black uppercase rounded">Read-Only</span>
            </div>

            <div className="space-y-4 relative z-10">
                {/* Decision Status */}
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Customer Intent</span>
                    <span className={`text-[10px] font-bold ${flags.hasConstructionIntent ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {flags.hasConstructionIntent ? 'Continue to Construction' :
                         decision === 'design_only_completed' ? 'Design Only (Completed)' : 'Pending Decision'}
                    </span>
                </div>

                {decision === 'continue_to_construction_preparation' && (
                    <>
                        {/* Mandor Prep Status */}
                        <div className="flex justify-between items-center pb-3 border-b border-white/10">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Mandor Shortlist</span>
                            <div className="text-right">
                                <span className={`text-[10px] font-bold ${flags.isMandorReady ? 'text-emerald-400' : 'text-white/40'}`}>
                                    {flags.isMandorReady ? 'Shortlist Prepared' : 'Not Started'}
                                </span>
                                {latestMandorPrep?.metadata?.selectedCandidateIds && (
                                    <span className="block text-[8px] font-black text-white/20 uppercase mt-0.5">
                                        {latestMandorPrep.metadata.selectedCandidateIds.length} Kandidat Terpilih
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Supervisor Prep Status */}
                        <div className="flex justify-between items-center pb-3 border-b border-white/10">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Readiness Prep</span>
                            <div className="text-right">
                                <span className={`text-[10px] font-bold ${flags.isReadinessReady ? 'text-emerald-400' : 'text-white/40'}`}>
                                    {flags.isReadinessReady ? 'Readiness Ready' : 'Not Started'}
                                </span>
                                {latestReadiness?.metadata?.selectedSupervisorCandidateIds && (
                                    <span className="block text-[8px] font-black text-white/20 uppercase mt-0.5">
                                        {latestReadiness.metadata.selectedSupervisorCandidateIds.length} Pengawas Disiapkan
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Planning Status */}
                        <div className="flex justify-between items-center pb-3 border-b border-white/10">
                            <span className="text-[9px] font-black text-white/40 uppercase tracking-widest">Project Planning</span>
                            <span className={`text-[10px] font-bold ${flags.hasPlanning ? 'text-emerald-400' : 'text-white/40'}`}>
                                {flags.hasPlanning ? 'Instruction Ready' : 'No Planning Found'}
                            </span>
                        </div>
                    </>
                )}
            </div>

            <InfoWarningBox type="warning" title="Critical Information">
                <ul className="space-y-1.5 list-disc list-inside">
                    <li className="text-[9px] text-white/60 font-medium">Project belum active construction.</li>
                    <li className="text-[9px] text-white/60 font-medium">Mandor/Pengawas belum assigned final.</li>
                    <li className="text-[9px] text-white/60 font-medium">Progress SOT belum berjalan.</li>
                </ul>
            </InfoWarningBox>

            <button disabled className="w-full py-3 bg-white/10 text-white/30 rounded-2xl font-black text-[10px] uppercase tracking-widest cursor-not-allowed">
                Activation Logic Locked
            </button>
        </div>
    );
};

export default ConstructionTransitionSummaryPanel;
