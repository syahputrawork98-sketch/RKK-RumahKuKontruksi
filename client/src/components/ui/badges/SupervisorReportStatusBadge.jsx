import React from 'react';

const SupervisorReportStatusBadge = ({ status }) => {
    const getStatusConfig = (status) => {
        switch (status?.toLowerCase()) {
            case 'draft':
                return { label: 'Draft', className: 'bg-gray-100 text-gray-700 border-gray-200' };
            case 'submitted':
                return { label: 'Menunggu Review', className: 'bg-blue-100 text-blue-700 border-blue-200' };
            case 'under_admin_review':
                return { label: 'Sedang Direview', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
            case 'revision_requested':
                return { label: 'Revisi Diminta', className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'approved':
                return { label: 'Disetujui', className: 'bg-green-100 text-green-700 border-green-200' };
            case 'rejected':
                return { label: 'Ditolak', className: 'bg-red-100 text-red-700 border-red-200' };
            case 'locked':
                return { label: 'Dikunci', className: 'bg-purple-100 text-purple-700 border-purple-200' };
            default:
                return { label: status || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const config = getStatusConfig(status);

    return (
        <span className={`px-2 py-1 text-xs font-medium border rounded-full ${config.className}`}>
            {config.label}
        </span>
    );
};

export default SupervisorReportStatusBadge;
