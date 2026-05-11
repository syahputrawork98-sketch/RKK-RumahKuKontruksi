import React from 'react';
import { FiAlertCircle } from "react-icons/fi";
import { Modal, Input, TextArea, SubmitButton } from "./RabUIAtoms";

const RabCategoryModal = ({ 
    isOpen, 
    onClose, 
    isEditing, 
    categoryForm, 
    setCategoryForm, 
    onSubmit, 
    submitting, 
    formError 
}) => {
    if (!isOpen) return null;

    return (
        <Modal title={isEditing ? "Edit Kategori" : "Tambah Kategori"} onClose={() => !submitting && onClose()}>
            {formError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] font-black text-red-600 uppercase flex items-center gap-2 animate-shake">
                    <FiAlertCircle /> {formError}
                </div>
            )}
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <Input label="Kode" value={categoryForm.code} onChange={e => setCategoryForm({...categoryForm, code: e.target.value})} placeholder="01" required disabled={submitting} />
                    <div className="col-span-2">
                        <Input label="Nama Kategori" value={categoryForm.name} onChange={e => setCategoryForm({...categoryForm, name: e.target.value})} placeholder="Pekerjaan Persiapan" required disabled={submitting} />
                    </div>
                </div>
                <TextArea label="Deskripsi (Opsional)" value={categoryForm.description} onChange={e => setCategoryForm({...categoryForm, description: e.target.value})} disabled={submitting} />
                <SubmitButton label={submitting ? "Menyimpan..." : (isEditing ? "Perbarui" : "Simpan Kategori")} disabled={submitting} />
            </form>
        </Modal>
    );
};

export default RabCategoryModal;
