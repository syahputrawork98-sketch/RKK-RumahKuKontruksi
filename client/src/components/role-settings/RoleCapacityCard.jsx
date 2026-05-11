import React from 'react';
import { FiLayers, FiUsers } from "react-icons/fi";

const RoleCapacityCard = ({ persona, type = 'supervisor' }) => {
    const Icon = type === 'supervisor' ? FiLayers : FiUsers;
    const title = type === 'supervisor' ? 'Status Kapasitas' : 'Tim Binaan';
    
    return (
        <div className="dashboard-card space-y-6">
            <div className="flex items-center gap-3 border-b border-[var(--dashboard-border)] pb-4">
                <Icon className="text-[var(--dashboard-primary)]" size={20} />
                <h3 className="font-bold text-sm">{title}</h3>
            </div>
            <div className="space-y-4">
                {type === 'supervisor' ? (
                    <>
                        <div className="flex items-center justify-between text-xs font-bold mb-1">
                            <span>Kapasitas Proyek</span>
                            <span className="text-[var(--dashboard-primary)]">{persona?._count?.projects || 0} / {persona?.maxProjectCapacity || 3}</span>
                        </div>
                        <div className="w-full h-2 bg-[var(--dashboard-surface-soft)] rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[var(--dashboard-primary)]" 
                                style={{ width: `${((persona?._count?.projects || 0) / (persona?.maxProjectCapacity || 3)) * 100}%` }} 
                            />
                        </div>
                        <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium leading-relaxed italic">
                            Anda bertanggung jawab atas pengawasan proyek di wilayah yang telah ditentukan oleh Admin Pusat. Kapasitas maksimal Anda adalah {persona?.maxProjectCapacity || 3} proyek secara bersamaan.
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-between p-3 bg-[var(--dashboard-surface-soft)] rounded-xl border border-[var(--dashboard-border)]">
                            <span className="text-xs font-bold text-[var(--dashboard-text)]">Total Pekerja Terdaftar</span>
                            <span className="text-sm font-black text-[var(--dashboard-primary)]">0 Orang</span>
                        </div>
                        <p className="text-[9px] text-[var(--dashboard-text-soft)] font-medium leading-relaxed italic">
                            Data tukang dikelola secara mandiri oleh Mandor. Sistem hanya memantau ringkasan jumlah dan kehadiran di proyek.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default RoleCapacityCard;
