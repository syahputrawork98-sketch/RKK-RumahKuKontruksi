import React from 'react';
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { formatCurrency } from "./rabUtils";

const RabItemTable = ({ 
    items, 
    onEditItem, 
    onDeleteItem 
}) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-soft)] bg-slate-50/50">
                        <th className="py-3 px-6">Item Pekerjaan</th>
                        <th className="py-3 px-2 text-center">Vol</th>
                        <th className="py-3 px-2 text-center">Sat</th>
                        <th className="py-3 px-6 text-right">Harga Satuan</th>
                        <th className="py-3 px-6 text-right">Subtotal</th>
                        <th className="py-3 px-6 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items?.map((item) => (
                        <tr key={item.id} className="border-b border-[var(--dashboard-border)] hover:bg-[var(--dashboard-surface-soft)]/30 transition-all group">
                            <td className="py-4 px-6 text-xs font-bold leading-relaxed text-slate-800">{item.description}</td>
                            <td className="py-4 px-2 text-xs text-center font-black text-slate-800">{parseFloat(item.volume)}</td>
                            <td className="py-4 px-2 text-xs text-center uppercase font-bold text-[var(--dashboard-text-soft)]">{item.unit}</td>
                            <td className="py-4 px-6 text-xs text-right font-medium text-slate-800">{formatCurrency(item.unitPrice)}</td>
                            <td className="py-4 px-6 text-xs text-right font-black text-emerald-700">{formatCurrency(item.total)}</td>
                            <td className="py-4 px-6 text-right">
                                <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button 
                                        onClick={() => onEditItem(item)}
                                        className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                                    >
                                        <FiEdit2 size={12} />
                                    </button>
                                    <button 
                                        onClick={() => onDeleteItem(item.id)}
                                        className="p-1.5 hover:bg-white rounded-lg text-slate-400 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                                    >
                                        <FiTrash2 size={12} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {(!items || items.length === 0) && (
                        <tr>
                            <td colSpan="6" className="py-8 text-center text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest italic">Belum ada item di kategori ini.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RabItemTable;
