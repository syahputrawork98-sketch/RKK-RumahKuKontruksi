import React from "react";
import { Link } from "react-router-dom";
import { FiUser, FiUsers } from "react-icons/fi";
import { TeamCard } from "./ProjectDetailUIHelpers";

const AdminProjectTeamTab = ({ project }) => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-[0.2em] text-[var(--dashboard-primary)]">Penugasan Personel</h3>
                <Link 
                    to="/admin/penugasan-tim"
                    className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline"
                >
                    Kelola Penugasan
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <TeamCard 
                    role="Admin Penanggung Jawab" 
                    name={project.admin?.name} 
                    email={project.admin?.email} 
                    icon={<FiUser />} 
                    color="blue"
                />
                <TeamCard 
                    role="Pengawas Lapangan (Supervisor)" 
                    name={project.supervisor?.name} 
                    email={project.supervisor?.email} 
                    icon={<FiUsers />} 
                    color="purple"
                />
                <TeamCard 
                    role="Mandor Utama (Foreman)" 
                    name={project.foreman?.name} 
                    email={project.foreman?.email} 
                    icon={<FiUsers />} 
                    color="orange"
                />
            </div>
        </div>
    );
};

export default AdminProjectTeamTab;
