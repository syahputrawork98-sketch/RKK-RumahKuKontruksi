// components/common/ProfileSection.jsx

import React from "react";

export default function ProfileSection({ foto, nama, role }) {
  return (
    <div className="flex flex-col items-center mb-8">
      <img
        src={foto}
        alt="Foto"
        className="w-28 h-28 rounded-full object-cover shadow-md"
      />
      <h3 className="mt-4 text-l-bold text-primary-main">{nama}</h3>
      <span
        className={`mt-1 text-sm px-3 py-1 rounded-full text-white ${
          role === "superadmin" ? "bg-emerald-600" : "bg-slate-600"
        }`}
      >
        {role === "superadmin" ? "Superadmin" : "Admin"}
      </span>
    </div>
  );
}
