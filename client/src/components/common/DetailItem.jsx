import React from "react";

export default function DetailItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-3 border rounded-lg bg-slate-50">
            <div className="text-slate-600">{icon}</div>
            <div>
                <p className="text-xs uppercase text-slate-500 font-semibold">{label}</p>
                <p className="text-sm text-slate-700 mt-0.5">{value}</p>
            </div>
        </div>
    );
}
