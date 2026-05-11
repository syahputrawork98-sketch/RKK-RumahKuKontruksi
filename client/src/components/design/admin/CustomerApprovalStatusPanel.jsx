import React from 'react';
import { FiCheckCircle, FiClock } from "react-icons/fi";
import { hasHistoryAction } from "../../../utils/designRequestHistory";

const CustomerApprovalStatusPanel = ({ history }) => {
    const isApprovedByCustomer = hasHistoryAction(history, 'customer_design_approved');

    return (
        <div className={`p-6 rounded-[2rem] border ${isApprovedByCustomer ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
            <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-lg ${isApprovedByCustomer ? 'bg-emerald-600' : 'bg-amber-500'} text-white`}>
                    {isApprovedByCustomer ? <FiCheckCircle size={14} /> : <FiClock size={14} />}
                </div>
                <h4 className={`text-xs font-black uppercase tracking-widest ${isApprovedByCustomer ? 'text-emerald-900' : 'text-amber-900'}`}>
                    Customer Approval Status
                </h4>
            </div>
            <p className={`text-[10px] font-bold ${isApprovedByCustomer ? 'text-emerald-700' : 'text-amber-700'} leading-relaxed italic`}>
                {isApprovedByCustomer 
                    ? "Konsumen telah menyetujui desain dan RAB final ini secara lokal." 
                    : "Menunggu persetujuan desain/RAB dari Konsumen."}
            </p>
        </div>
    );
};

export default CustomerApprovalStatusPanel;
