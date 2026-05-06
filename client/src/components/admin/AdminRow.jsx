// client/src/components/admin/AdminRow.jsx
import { Eye, Edit2, Trash2 } from "lucide-react";

// IconButton kecil untuk aksi
function IconButton({ children, onClick, title = "", className = "" }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border hover:bg-slate-50 transition ${className}`}
    >
      {children}
    </button>
  );
}

export default function AdminRow({ admin, onEdit, onDelete, onDetail }) {
  return (
    <tr className="hover:bg-slate-50 transition">
      <td className="pl-4 py-3">
        <img
          src={admin.foto !== "NULL" ? admin.foto : `https://placehold.co/200`}
          alt="avatar"
          className="w-10 rounded-full object-cover text-m-regular text-primary-main"
        />
      </td>

      <td className="px-4 py-3 text-m-bold text-primary-main">
        {admin.id_admin}
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-m-bold text-primary-main">
            {admin.nama_lengkap}
          </span>
          <span
            className={`text-xs px-2 py-0.5 w-fit rounded-md mt-1 text-white ${
              admin.role === "superadmin" ? "bg-emerald-600" : "bg-slate-600"
            }`}
          >
            {admin.role === "superadmin" ? "Superadmin" : "Admin"}
          </span>
        </div>
      </td>

      {/* <td className="px-4 py-3">{admin.email}</td> */}
      <td className="px-4 py-3 text-m-regular text-primary-main">
        {admin.no_telp}
      </td>

      <td
        className="text-m-regular text-primary-main px-4 py-3 max-w-xs truncate"
        title={admin.alamat}
      >
        {admin.alamat}
      </td>

      <td className="px-4 py-3 text-m-regular text-primary-main">
        {new Date(admin.tanggal_bergabung).toLocaleDateString()}
      </td>

      <td className="px-4 py-3 text-m-regular text-primary-main">
        <div className="flex items-center gap-2">
          <IconButton title="Detail" onClick={() => onDetail(admin)}>
            <Eye size={14} />
          </IconButton>

          <IconButton title="Edit" onClick={() => onEdit(admin)}>
            <Edit2 size={14} />
          </IconButton>

          <IconButton
            title="Hapus"
            onClick={() => onDelete(admin)}
            className="border-red-300 hover:bg-red-50 text-red-600"
          >
            <Trash2 size={14} />
          </IconButton>
        </div>
      </td>
    </tr>
  );
}
