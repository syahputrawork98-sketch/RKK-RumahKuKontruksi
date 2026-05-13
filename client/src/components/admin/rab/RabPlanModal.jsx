import React from 'react';
import { FiInfo, FiAlertCircle } from "react-icons/fi";
import { Modal, Input, TextArea, SubmitButton } from "./RabUIAtoms";

const RabPlanModal = ({ 
    isOpen, 
    onClose, 
    planForm, 
    setPlanForm, 
    onSubmit, 
    submitting, 
    formError,
    project
}) => {
    if (!isOpen) return null;

    const { customer, foreman, supervisor } = project || {};

    return (
        <Modal title="Buat RAB Plan Baru" onClose={() => !submitting && onClose()}>
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <h4 className="text-[10px] font-black text-amber-700 uppercase tracking-widest flex items-center gap-2">
                    <FiInfo /> Panduan Pengisian
                </h4>
                <ul className="text-[10px] text-amber-800 space-y-1 list-disc pl-4 font-bold leading-relaxed">
                    <li>RAB Plan adalah basis data anggaran utama proyek.</li>
                    <li>Judul minimal 5 karakter, Tipe (misal: Pembangunan/Renovasi).</li>
                    <li>Data ini akan mensinkronkan budgetTotal proyek secara real-time.</li>
                </ul>
            </div>

            {/* Konteks Proyek */}
            <div className="mb-6 grid grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Konsumen</p>
                    <p className="text-[10px] font-extrabold text-slate-700 truncate">{customer?.name || "-"}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Mandor / Petugas</p>
                    <p className="text-[10px] font-extrabold text-slate-700 truncate">{foreman?.name || "-"}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Pengawas</p>
                    <p className="text-[10px] font-extrabold text-slate-700 truncate">{supervisor?.name || "-"}</p>
                </div>
            </div>

            {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase flex items-center gap-2 animate-shake">
                    <FiAlertCircle /> {formError}
                </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
                <Input 
                    label="Judul RAB" 
                    value={planForm.title} 
                    onChange={e => setPlanForm({...planForm, title: e.target.value})} 
                    placeholder={`Contoh: RAB Pembangunan - ${project?.name}`} 
                    required 
                    disabled={submitting}
                />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Tipe" value={planForm.type} onChange={e => setPlanForm({...planForm, type: e.target.value})} placeholder="Pembangunan" required disabled={submitting} />
                    <Input label="Versi" value={planForm.version} onChange={e => setPlanForm({...planForm, version: e.target.value})} placeholder="1.0" disabled={submitting} />
                </div>
                <TextArea label="Catatan (Opsional)" value={planForm.notes} onChange={e => setPlanForm({...planForm, notes: e.target.value})} placeholder="Tambahkan catatan jika diperlukan..." disabled={submitting} />
                <SubmitButton label={submitting ? "Memproses..." : "Buat Plan Sekarang"} disabled={submitting} />
            </form>
        </Modal>
    );
};

export default RabPlanModal;
