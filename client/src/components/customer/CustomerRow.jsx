import React from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { FiUser, FiBriefcase } from "react-icons/fi";

export default function CustomerRow({ customer, onEdit, onDelete, onDetail }) {
  const isCorporate = customer.customerType === "Corporate";

  return (
    <tr className="hover:bg-[var(--dashboard-surface-soft)] transition-colors group">
      <td className="px-6 py-4">
        <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 font-bold shadow-sm group-hover:scale-110 transition-transform">
          {isCorporate ? <FiBriefcase size={18} /> : <FiUser size={18} />}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-[var(--dashboard-text-soft)] uppercase tracking-tighter mb-1">
            {customer.id?.slice(0, 8)}...
          </span>
          <span className="font-bold text-[var(--dashboard-text)] leading-none">
            {isCorporate ? customer.companyName : customer.name}
          </span>
          {isCorporate && (
            <span className="text-[10px] text-[var(--dashboard-text-soft)] mt-1">
              PIC: {customer.picName || "-"}
            </span>
          )}
        </div>
      </td>

      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
          isCorporate ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-blue-50 text-blue-600 border border-blue-100"
        }`}>
          {customer.customerType}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-[var(--dashboard-text)]">
            <span className="text-xs font-bold">{customer.phone || "-"}</span>
          </div>
          <span className="text-[10px] text-[var(--dashboard-text-muted)] font-medium italic">
            {customer.email || "-"}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 max-w-xs">
        <p className="text-xs text-[var(--dashboard-text-muted)] truncate" title={customer.address}>
          {customer.address || "-"}
        </p>
      </td>

      <td className="px-6 py-4 text-center">
        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
          customer.status === 'active' 
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
            : "bg-slate-50 text-slate-400 border border-slate-100"
        }`}>
          {customer.status === 'active' ? "Aktif" : "Nonaktif"}
        </span>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-2">
          <button
            title="Detail"
            onClick={() => onDetail(customer)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-teal-600"
          >
            <Eye size={16} />
          </button>

          <button
            title="Edit"
            onClick={() => onEdit(customer)}
            className="dashboard-icon-button !p-2 bg-[var(--dashboard-surface-soft)] text-indigo-600 hover:bg-indigo-50 transition-colors"
          >
            <Edit2 size={16} />
          </button>

          <button
            title="Nonaktifkan"
            onClick={() => onDelete(customer)}
            className="dashboard-icon-button !p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
