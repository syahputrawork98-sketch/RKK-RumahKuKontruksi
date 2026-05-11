import React from 'react';
import { FiAlertCircle } from "react-icons/fi";
import { Modal, Input, SubmitButton } from "./RabUIAtoms";
import { formatCurrency } from "./rabUtils";

const RabItemModal = ({ 
    isOpen, 
    onClose, 
    isEditing, 
    itemForm, 
    setItemForm, 
    onSubmit, 
    submitting, 
    formError 
}) => {
    if (!isOpen) return null;

    return (
        <Modal title={isEditing ? "Edit Item" : "Tambah Item Pekerjaan"} onClose={() => !submitting && onClose()}>
            {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase flex items-center gap-2 animate-shake">
                    <FiAlertCircle /> {formError}
                </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
                <Input label="Deskripsi Pekerjaan" value={itemForm.description} onChange={e => setItemForm({...itemForm, description: e.target.value})} placeholder="Pemasangan Bowplank" required disabled={submitting} />
                <div className="grid grid-cols-2 gap-4">
                    <Input label="Volume" type="number" step="0.01" value={itemForm.volume} onChange={e => setItemForm({...itemForm, volume: e.target.value})} required disabled={submitting} />
                    <Input label="Satuan" value={itemForm.unit} onChange={e => setItemForm({...itemForm, unit: e.target.value})} placeholder="m2" required disabled={submitting} />
                </div>
                <Input label="Lokasi Pekerjaan (Lantai/Ruang)" value={itemForm.location} onChange={e => setItemForm({...itemForm, location: e.target.value})} placeholder="Contoh: Lantai 1 / Kamar Utama" disabled={submitting} />
                <Input label="Harga Satuan (Rp)" type="number" value={itemForm.unitPrice} onChange={e => setItemForm({...itemForm, unitPrice: e.target.value})} required disabled={submitting} />
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex justify-between items-center">
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Estimasi Total</span>
                    <span className="text-sm font-black text-emerald-700">{formatCurrency(itemForm.volume * itemForm.unitPrice)}</span>
                </div>
                <SubmitButton label={submitting ? "Menyimpan..." : (isEditing ? "Perbarui Item" : "Tambahkan Item")} disabled={submitting} />
            </form>
        </Modal>
    );
};

export default RabItemModal;
