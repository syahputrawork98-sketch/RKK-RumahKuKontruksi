import React from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiTag } from "react-icons/fi";
import { formatCurrency } from "./rabUtils";
import RabItemTable from "./RabItemTable";

const RabCategorySection = ({ 
    categories, 
    onEditCategory, 
    onDeleteCategory, 
    onAddItem, 
    onEditItem, 
    onDeleteItem,
    onAddCategoryFirst
}) => {
    if (!categories || categories.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2.5rem] border border-[var(--dashboard-border)] shadow-sm">
                <FiTag size={48} className="text-[var(--dashboard-text-soft)] opacity-20 mb-4" />
                <p className="text-sm font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest">Daftar kategori kosong</p>
                <button 
                    onClick={onAddCategoryFirst}
                    className="mt-4 px-6 py-3 bg-[var(--dashboard-surface-soft)] text-[var(--dashboard-primary)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[var(--dashboard-border)] transition-all"
                >
                    Tambah Kategori Pertama
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {categories.map((cat) => (
                <div key={cat.id} className="dashboard-card p-0 overflow-hidden border-[var(--dashboard-border)] shadow-sm">
                    <div className="p-6 bg-[var(--dashboard-surface-soft)] border-b border-[var(--dashboard-border)] flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white border border-[var(--dashboard-border)] flex items-center justify-center text-[var(--dashboard-primary)] font-black text-xs shadow-sm">
                                {cat.code}
                            </div>
                            <div>
                                <h4 className="text-sm font-black uppercase tracking-tight">{cat.name}</h4>
                                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{formatCurrency(cat.subtotal)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => onEditCategory(cat)}
                                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm border border-transparent hover:border-blue-100"
                            >
                                <FiEdit2 size={14} />
                            </button>
                            <button 
                                onClick={() => onDeleteCategory(cat.id)}
                                className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-red-600 transition-all shadow-sm border border-transparent hover:border-red-100"
                            >
                                <FiTrash2 size={14} />
                            </button>
                            <button 
                                onClick={() => onAddItem(cat.id)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[var(--dashboard-border)] rounded-xl text-[8px] font-black uppercase tracking-widest text-[var(--dashboard-primary)] hover:bg-[var(--dashboard-primary)] hover:text-white transition-all shadow-sm"
                            >
                                <FiPlus /> Item
                            </button>
                        </div>
                    </div>

                    <RabItemTable 
                        items={cat.items} 
                        onEditItem={(item) => onEditItem(item, cat.id)} 
                        onDeleteItem={onDeleteItem} 
                    />
                </div>
            ))}
        </div>
    );
};

export default RabCategorySection;
