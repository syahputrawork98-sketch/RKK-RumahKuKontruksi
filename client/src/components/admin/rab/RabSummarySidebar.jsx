import { FiFileText, FiPlus, FiInfo, FiUpload, FiDownload } from "react-icons/fi";
import { formatCurrency } from "./rabUtils";
import { exportRabToPdf } from "../../../utils/rabPdfExport";

const RabSummarySidebar = ({ 
    rabPlan, 
    project, 
    onAddCategory, 
    onImportCsv,
    onRefresh 
}) => {
    return (
        <div className="space-y-6 lg:col-span-1">
            <div className="dashboard-card bg-emerald-600 text-white relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70">Total Anggaran (RAB)</p>
                    <h3 className="text-2xl font-black mt-2">{formatCurrency(rabPlan.totalAmount)}</h3>
                    <div className="mt-6 pt-6 border-t border-white/20 space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="opacity-70 uppercase tracking-tighter">Budget Proyek</span>
                            <span>{formatCurrency(project.budgetTotal)}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="opacity-70 uppercase tracking-tighter">Jumlah Kategori</span>
                            <span>{rabPlan.categories?.length || 0}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="opacity-70 uppercase tracking-tighter">Status</span>
                            <span className="bg-white/20 px-2 py-0.5 rounded-lg uppercase tracking-widest">{rabPlan.status}</span>
                        </div>
                    </div>
                </div>
                <FiFileText className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 rotate-12" />
            </div>

            <div className="dashboard-card">
                <h3 className="font-black text-[10px] uppercase tracking-widest text-[var(--dashboard-text-soft)] mb-6">Aksi RAB</h3>
                <div className="space-y-3">
                    <button 
                        onClick={onAddCategory}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--dashboard-primary)] text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-[var(--dashboard-primary)]/20 hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        <FiPlus /> Tambah Kategori
                    </button>
                    <button 
                        onClick={onImportCsv}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white text-[var(--dashboard-primary)] border border-[var(--dashboard-primary)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-primary)] hover:text-white transition-all shadow-sm"
                    >
                        <FiUpload /> Import CSV
                    </button>
                    <button 
                        onClick={() => exportRabToPdf(project, rabPlan)}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm"
                    >
                        <FiDownload /> Export PDF
                    </button>
                    <button 
                        onClick={onRefresh}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-white text-[var(--dashboard-text-soft)] border border-[var(--dashboard-border)] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[var(--dashboard-surface-soft)] transition-all shadow-sm"
                    >
                        Refresh Data
                    </button>
                </div>
            </div>

            <div className="p-6 bg-indigo-50 border border-indigo-100 rounded-3xl">
                <h4 className="text-[10px] font-black text-indigo-700 uppercase mb-2 flex items-center gap-2"><FiInfo /> Baseline Perencanaan</h4>
                <p className="text-[10px] text-indigo-600 leading-relaxed font-bold">
                    Total RAB menyinkronkan budget proyek lokal sebagai baseline perencanaan draft untuk menjaga akurasi estimasi.
                </p>
            </div>
        </div>
    );
};

export default RabSummarySidebar;
