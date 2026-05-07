import React from "react";

const WeeklyJournalStatusBadge = ({ status }) => {
  const statusConfig = {
    draft: {
      label: "Draft",
      className: "bg-slate-500/10 text-slate-500",
    },
    submitted: {
      label: "Dikirim",
      className: "bg-blue-500/10 text-blue-500",
    },
    under_review: {
      label: "Direview",
      className: "bg-amber-500/10 text-amber-500",
    },
    revision_requested: {
      label: "Butuh Revisi",
      className: "bg-red-500/10 text-red-500",
    },
    approved: {
      label: "Disetujui",
      className: "bg-emerald-500/10 text-emerald-500",
    },
    rejected: {
      label: "Ditolak",
      className: "bg-rose-500/10 text-rose-500",
    },
    locked: {
      label: "Terkunci",
      className: "bg-purple-500/10 text-purple-500",
    },
  };

  const config = statusConfig[status] || {
    label: status,
    className: "bg-gray-500/10 text-gray-500",
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${config.className}`}>
      {config.label}
    </span>
  );
};

export default WeeklyJournalStatusBadge;
