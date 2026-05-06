import { mockProjects } from "./projects";
import { mockSupervisors } from "./supervisors";
import { mockForemen } from "./foremen";
import { mockCustomers } from "./customers";
import { mockProjectStages } from "./projectStages";
import { mockRabPlans } from "./rabPlans";
import { mockAdmins } from "./admins";
import { mockRabItems } from "./rabItems";

/**
 * Get projects for a specific customer with populated related data
 */
export const getCustomerProjects = (customerId) => {
  return mockProjects
    .filter((project) => project.customerId === customerId)
    .map((project) => {
      const supervisor = mockSupervisors.find((s) => s.id === project.supervisorId);
      const foreman = mockForemen.find((f) => f.id === project.foremanId);
      const admin = mockAdmins.find((a) => a.id === project.adminId);
      
      return {
        ...project,
        supervisorName: supervisor?.name || "Belum ditugaskan",
        foremanName: foreman?.name || "Belum ditugaskan",
        adminName: admin?.name || "Belum ditugaskan",
      };
    });
};

/**
 * Get full project details including team, budget, and timeline
 */
export const getFullProjectDetails = (projectId) => {
  const project = mockProjects.find((p) => p.id === projectId);
  if (!project) return null;

  const customer = mockCustomers.find((c) => c.id === project.customerId);
  const supervisor = mockSupervisors.find((s) => s.id === project.supervisorId);
  const foreman = mockForemen.find((f) => f.id === project.foremanId);
  const admin = mockAdmins.find((a) => a.id === project.adminId);
  const stages = mockProjectStages.filter((s) => s.projectId === projectId).sort((a, b) => a.order - b.order);
  
  const timeline = stages.map(stage => {
    const items = mockRabItems.filter(item => item.categoryId === stage.categoryId).map(item => ({
      ...item,
      uraian: item.description,
      hargaSatuan: item.unitPrice,
      satuan: item.unit,
      nilaiSelesai: item.completedValue
    }));

    const amount = items.reduce((sum, item) => sum + item.total, 0);
    const paid = items.reduce((sum, item) => sum + item.completedValue, 0); // Simplified logic

    return {
      ...stage,
      status: stage.status === "verified" ? "verified" : stage.status === "in_progress" ? "in_progress" : "pending",
      rabItems: items,
      payment: {
        amount,
        paid
      },
      tasks: items.map(i => i.uraian)
    };
  });

  return {
    ...project,
    customer: {
      name: customer?.name || customer?.companyName || "N/A",
      avatar: customer?.avatar || "https://i.pravatar.cc/150",
    },
    team: {
      admin: {
        name: admin?.name || "N/A",
        role: "Admin Proyek",
        avatar: admin?.avatar || "https://i.pravatar.cc/150",
        status: admin?.status === "active" ? "Aktif" : "Nonaktif",
      },
      pengawas: {
        name: supervisor?.name || "N/A",
        role: "Pengawas Lapangan",
        avatar: supervisor?.avatar || "https://i.pravatar.cc/150",
        status: supervisor?.status === "active" ? "Aktif" : "Nonaktif",
      },
      mandor: {
        name: foreman?.name || "N/A",
        role: "Mandor",
        avatar: foreman?.avatar || "https://i.pravatar.cc/150",
        status: foreman?.status === "active" ? "Aktif" : "Nonaktif",
      },
    },
    budget: {
      total: project.budgetTotal || 0,
      paid: project.paidAmount || 0,
      remaining: project.remainingAmount || 0,
    },
    timeline
  };
};

