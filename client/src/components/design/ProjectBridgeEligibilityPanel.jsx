import React from 'react';
import { 
    FiCheckCircle, 
    FiXCircle, 
    FiInfo, 
    FiAlertCircle, 
    FiArrowRight, 
    FiActivity 
} from "react-icons/fi";
import { getProjectBridgeReadiness } from "../../utils/designRequestHistory";

/**
 * ProjectBridgeEligibilityPanel
 * Displays the eligibility of a Design Request to be converted into a Project Draft.
 * Transparency for Admin, Customer, and Architect roles.
 */
const ProjectBridgeEligibilityPanel = ({ request, role = 'admin' }) => {
    if (!request) return null;

    const { isReady, reasons, isApproved, customerWantsConstruction, hasFinalReview } = getProjectBridgeReadiness(request);

    // Styling configurations based on eligibility
    const config = isReady 
        ? {
            bg: "bg-emerald-50",
            border: "border-emerald-100",
            titleColor: "text-emerald-800",
            icon: <FiCheckCircle className="text-emerald-600" size={20} />,
            statusText: "SIAP LANJUT PERENCANAAN",
            description: "Tahap desain dan review transisi telah selesai. Pengajuan ini layak dikonversi menjadi draft perencanaan proyek."
        }
        : {
            bg: "bg-amber-50",
            border: "border-amber-100",
            titleColor: "text-amber-800",
            icon: <FiAlertCircle className="text-amber-600" size={20} />,
            statusText: "PENDING - BELUM LAYAK KONVERSI",
            description: "Beberapa prasyarat operasional belum terpenuhi untuk melanjutkan ke perencanaan proyek konstruksi."
        };

    return (
        <div className={`p-6 rounded-[2rem] border ${config.bg} ${config.border} space-y-4`}>
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    {config.icon}
                </div>
                <div className="flex-1">
                    <h4 className={`text-[10px] font-black uppercase tracking-widest ${config.titleColor}`}>
                        Project Bridge Eligibility
                    </h4>
                    <p className="text-xs font-black text-gray-800 mt-1 uppercase tracking-tight">
                        {config.statusText}
                    </p>
                    <p className="text-[10px] text-gray-600 font-medium mt-2 leading-relaxed italic">
                        {config.description}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-2 border-t border-black/5">
                <EligibilityItem 
                    label="Status Desain Approved" 
                    isDone={isApproved} 
                    role={role}
                    adminNote="Admin harus memberikan status Approved pada desain."
                    customerNote="Tunggu Admin memberikan status Approved pada desain akhir."
                    architectNote="Selesaikan revisi dan tunggu status Approved dari Admin."
                />
                <EligibilityItem 
                    label="Keputusan Lanjut Konstruksi" 
                    isDone={customerWantsConstruction} 
                    role={role}
                    adminNote="Konsumen harus memilih opsi 'Lanjut Konstruksi'."
                    customerNote="Pilih 'Lanjut Konstruksi' pada panel keputusan setelah desain disetujui."
                    architectNote="Tunggu keputusan Konsumen untuk lanjut ke pembangunan."
                />
                <EligibilityItem 
                    label="Review Transisi Admin" 
                    isDone={hasFinalReview} 
                    role={role}
                    adminNote="Admin harus melakukan Review Transisi Final."
                    customerNote="Tahap evaluasi internal Admin RKK sedang berlangsung."
                    architectNote="Tahap evaluasi internal Admin RKK sedang berlangsung."
                />
            </div>

            {role === 'admin' && !isReady && reasons.length > 0 && (
                <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl">
                    <p className="text-[9px] font-black text-rose-700 uppercase tracking-widest mb-2">Blocking Reasons:</p>
                    <div className="space-y-1">
                        {reasons.map((r, i) => (
                            <div key={i} className="flex items-start gap-2 text-[10px] text-rose-600 font-bold leading-tight">
                                <FiXCircle className="mt-0.5 shrink-0" size={10} />
                                <span>{r}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isReady && role === 'admin' && (
                <div className="flex items-center gap-2 p-3 bg-white/60 border border-emerald-100 rounded-xl text-emerald-700">
                    <FiActivity size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Tombol 'Draft Proyek' Kini Aktif</span>
                </div>
            )}
        </div>
    );
};

const EligibilityItem = ({ label, isDone, role, adminNote, customerNote, architectNote }) => {
    let note = adminNote;
    if (role === 'customer') note = customerNote;
    if (role === 'architect') note = architectNote;

    return (
        <div className="flex flex-col gap-1 p-2">
            <div className="flex items-center gap-2">
                {isDone ? (
                    <FiCheckCircle className="text-emerald-500 shrink-0" size={14} />
                ) : (
                    <FiClock className="text-amber-400 shrink-0" size={14} />
                )}
                <span className={`text-[10px] font-bold ${isDone ? 'text-gray-800' : 'text-gray-400'}`}>
                    {label}
                </span>
            </div>
            {!isDone && (
                <p className="pl-6 text-[9px] text-gray-400 font-medium italic leading-tight">
                    {note}
                </p>
            )}
        </div>
    );
};

export default ProjectBridgeEligibilityPanel;
