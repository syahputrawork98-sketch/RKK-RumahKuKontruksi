import React from 'react';

/**
 * Unified Status Badge for RKK System
 * Standardizes labels (Indonesia) and colors across all modules.
 */
const StatusBadge = ({ type, status }) => {
    const normalizeStatus = (s) => {
        if (!s) return '';
        // Replace underscore with space and capitalize words
        return s.toLowerCase()
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const getUserStatus = (s) => {
        switch (s?.toLowerCase()) {
            case 'active':
            case 'aktif':
                return { label: 'Aktif', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            case 'inactive':
            case 'nonaktif':
                return { label: 'Nonaktif', className: 'bg-slate-100 text-slate-500 border-slate-200' };
            case 'pending':
                return { label: 'Tertunda', className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'suspended':
                return { label: 'Ditangguhkan', className: 'bg-rose-100 text-rose-700 border-rose-200' };
            case 'deleted':
            case 'terhapus':
                return { label: 'Terhapus', className: 'bg-red-50 text-red-400 border-red-100 italic' };
            default:
                return { label: normalizeStatus(s) || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const getHelperDocStatus = (s) => {
        switch (s?.toLowerCase()) {
            case 'draft':
                return { label: 'Draft', className: 'bg-slate-100 text-slate-600 border-slate-200' };
            case 'reviewed':
                return { label: 'Sudah Direview', className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'released':
                return { label: 'Dirilis', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            default:
                return { label: normalizeStatus(s) || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const getProjectStatus = (s) => {
        switch (s?.toLowerCase()) {
            case 'active':
            case 'ongoing':
            case 'berjalan':
                return { label: 'Berjalan', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            case 'planning':
            case 'proposal':
            case 'perencanaan':
                return { label: 'Perencanaan', className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'completed':
            case 'finished':
            case 'selesai':
                return { label: 'Selesai', className: 'bg-blue-100 text-blue-700 border-blue-200' };
            case 'on_hold':
            case 'suspended':
                return { label: 'Ditangguhkan', className: 'bg-gray-100 text-gray-700 border-gray-200' };
            default:
                return { label: normalizeStatus(s) || s || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const getJournalStatus = (s) => {
        switch (s?.toLowerCase()) {
            case 'draft':
                return { label: 'Draft', className: 'bg-slate-100 text-slate-600 border-slate-200' };
            case 'submitted':
                return { label: 'Menunggu Review', className: 'bg-blue-100 text-blue-700 border-blue-200' };
            case 'under_review':
                return { label: 'Sedang Direview', className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'approved':
                return { label: 'Disetujui', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            case 'revision_requested':
                return { label: 'Revisi Diminta', className: 'bg-rose-100 text-rose-700 border-rose-200' };
            case 'rejected':
                return { label: 'Ditolak', className: 'bg-red-100 text-red-700 border-red-200' };
            default:
                return { label: normalizeStatus(s) || s || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const getReportStatus = (s) => {
        // Similar to journal but might have specific admin review states
        switch (s?.toLowerCase()) {
            case 'draft':
                return { label: 'Draft', className: 'bg-slate-100 text-slate-600 border-slate-200' };
            case 'submitted':
                return { label: 'Menunggu Review', className: 'bg-blue-100 text-blue-700 border-blue-200' };
            case 'under_admin_review':
            case 'start_admin_review':
                return { label: 'Review Admin', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
            case 'reviewed':
            case 'approved':
                return { label: 'Internal Reviewed', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            case 'published':
                return { label: 'Terbit ke Konsumen', className: 'bg-green-600 text-white border-green-700' };
            default:
                return getJournalStatus(s); // Fallback to journal mapping
        }
    };

    const getMaterialStatus = (s) => {
        switch (s?.toLowerCase()) {
            case 'draft':
                return { label: 'Draft', className: 'bg-slate-100 text-slate-600 border-slate-200' };
            case 'submitted':
                return { label: 'Antrean Pengawas', className: 'bg-blue-100 text-blue-700 border-blue-200' };
            case 'approved_by_supervisor':
                return { label: 'Perlu Approval Admin', className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'approved_by_admin':
                return { label: 'Disetujui Admin', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            case 'processing':
                return { label: 'Persiapan Distribusi', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
            case 'delivered':
                return { label: 'Dalam Pengiriman', className: 'bg-teal-600 text-white border-teal-700' };
            case 'received':
                return { label: 'Diterima Mandor', className: 'bg-emerald-600 text-white border-emerald-700' };
            case 'completed':
                return { label: 'Selesai (Arsip)', className: 'bg-slate-800 text-white border-slate-900' };
            case 'rejected':
                return { label: 'Ditolak', className: 'bg-red-100 text-red-700 border-red-200' };
            case 'cancelled':
                return { label: 'Dibatalkan', className: 'bg-gray-100 text-gray-500 border-gray-200' };
            default:
                return { label: normalizeStatus(s) || s || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const getPriorityStatus = (s) => {
        switch (s?.toLowerCase()) {
            case 'high':
            case 'urgent':
            case 'critical':
                return { label: normalizeStatus(s), className: 'bg-red-100 text-red-700 border-red-200' };
            case 'medium':
                return { label: normalizeStatus(s), className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'low':
                return { label: normalizeStatus(s), className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            default:
                return { label: normalizeStatus(s) || 'Normal', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const getIssueStatus = (s) => {
        switch (s?.toLowerCase()) {
            case 'open':
                return { label: 'Terbuka', className: 'bg-red-100 text-red-700 border-red-200' };
            case 'in_review':
                return { label: 'Ditinjau', className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'resolved':
                return { label: 'Terselesaikan', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            case 'closed':
                return { label: 'Diarsipkan', className: 'bg-slate-100 text-slate-600 border-slate-200' };
            case 'rejected':
                return { label: 'Ditolak', className: 'bg-gray-100 text-gray-500 border-gray-200' };
            default:
                return { label: normalizeStatus(s) || s || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const getDesignStatus = (s) => {
        switch (s?.toLowerCase()) {
            case 'draft':
                return { label: 'Draft', className: 'bg-slate-100 text-slate-600 border-slate-200' };
            case 'submitted':
                return { label: 'Diajukan', className: 'bg-blue-100 text-blue-700 border-blue-200' };
            case 'open':
                return { label: 'Tender Terbuka', className: 'bg-teal-100 text-teal-700 border-teal-200' };
            case 'assigned':
                return { label: 'Arsitek Terpilih', className: 'bg-indigo-100 text-indigo-700 border-indigo-200' };
            case 'revision_requested':
                return { label: 'Revisi Diminta', className: 'bg-rose-100 text-rose-700 border-rose-200' };
            case 'revised':
                return { label: 'Telah Direvisi', className: 'bg-purple-100 text-purple-700 border-purple-200' };
            case 'in_review':
                return { label: 'Proses Review', className: 'bg-amber-100 text-amber-700 border-amber-200' };
            case 'approved':
                return { label: 'Desain Disetujui', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
            case 'project_created':
                return { label: 'Proyek Dimulai', className: 'bg-indigo-600 text-white border-indigo-700' };
            case 'rejected':
                return { label: 'Ditolak', className: 'bg-red-100 text-red-700 border-red-200' };
            default:
                return { label: normalizeStatus(s) || s || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
        }
    };

    const getStageStatus = (s) => {
        const val = s?.toLowerCase();
        if (val?.includes('planning') || val?.includes('persiapan')) 
            return { label: 'Perencanaan', className: 'bg-blue-100 text-blue-700 border-blue-200' };
        if (val?.includes('ongoing') || val?.includes('active') || val?.includes('berjalan') || val?.includes('pengerjaan'))
            return { label: 'Pengerjaan', className: 'bg-emerald-100 text-emerald-700 border-emerald-200' };
        if (val?.includes('finish') || val?.includes('selesai') || val?.includes('completed'))
            return { label: 'Selesai', className: 'bg-purple-100 text-purple-700 border-purple-200' };
        if (val?.includes('verified'))
            return { label: 'Terverifikasi', className: 'bg-indigo-600 text-white border-indigo-700' };
        return { label: normalizeStatus(s) || s || 'Unknown', className: 'bg-gray-100 text-gray-700 border-gray-200' };
    };

    let config;
    switch (type) {
        case 'project':
            config = getProjectStatus(status);
            break;
        case 'design':
            config = getDesignStatus(status);
            break;
        case 'stage':
            config = getStageStatus(status);
            break;
        case 'journal':
            config = getJournalStatus(status);
            break;
        case 'report':
            config = getReportStatus(status);
            break;
        case 'material':
            config = getMaterialStatus(status);
            break;
        case 'priority':
            config = getPriorityStatus(status);
            break;
        case 'issue':
            config = getIssueStatus(status);
            break;
        case 'user':
            config = getUserStatus(status);
            break;
        case 'helper_document':
            config = getHelperDocStatus(status);
            break;
        default:
            config = { label: normalizeStatus(status) || status, className: 'bg-gray-100 text-gray-700 border-gray-200' };
    }

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all ${config.className}`}>
            {config.label}
        </span>
    );
};

export default StatusBadge;
