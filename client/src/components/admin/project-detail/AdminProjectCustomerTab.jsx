import React from "react";
import { FiUser, FiMail, FiPhone, FiMapPin, FiBriefcase } from "react-icons/fi";
import { InfoItem } from "./ProjectDetailUIHelpers";
import RoleDataState from "../../common/RoleDataState";

const AdminProjectCustomerTab = ({ project }) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-4 border-b border-[var(--dashboard-border)] pb-4">
                <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <FiUser size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black">{project.customer?.name}</h3>
                    <p className="text-xs font-bold text-[var(--dashboard-text-soft)] uppercase tracking-widest">
                        {project.customer?.customerType} Customer
                    </p>
                </div>
            </div>

            {project.customer ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <InfoItem label="Email" value={project.customer.email} icon={<FiMail />} />
                    <InfoItem label="Telepon" value={project.customer.phone} icon={<FiPhone />} />
                    <InfoItem label="Alamat" value={project.customer.address} icon={<FiMapPin />} className="md:col-span-2" />
                    
                    {project.customer.customerType === "Corporate" && (
                        <>
                            <div className="md:col-span-2 pt-4 border-t border-[var(--dashboard-border)]">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)] mb-4">Informasi Korporat</h4>
                            </div>
                            <InfoItem label="Nama Perusahaan" value={project.customer.companyName} icon={<FiBriefcase />} />
                            <InfoItem label="PIC Proyek" value={project.customer.picName} />
                            <InfoItem label="Jabatan PIC" value={project.customer.picPosition} />
                        </>
                    )}

                    <div className="md:col-span-2 pt-4 border-t border-[var(--dashboard-border)]">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-primary)] mb-2">Catatan Konsumen</h4>
                        <p className="text-sm text-[var(--dashboard-text-soft)] italic bg-[var(--dashboard-surface-soft)] p-4 rounded-xl border border-[var(--dashboard-border)]">
                            {project.customer.notes || "Tidak ada catatan khusus."}
                        </p>
                    </div>
                </div>
            ) : (
                <RoleDataState type="empty" message="Data customer tidak ditemukan." />
            )}
        </div>
    );
};

export default AdminProjectCustomerTab;
