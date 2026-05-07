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
        role: "Admin",
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

/**
 * Get a project by its ID
 */
export const getProjectById = (projectId) => {
  return mockProjects.find((p) => p.id === projectId);
};

/**
 * Get full stage details including project, customer, and RAB context
 */
export const getStageByIdFull = (stageId) => {
  const stage = mockProjectStages.find((s) => s.id === stageId);
  if (!stage) return null;

  const project = mockProjects.find((p) => p.id === stage.projectId);
  const customer = customer001; // Default for demo, or fetch by project.customerId
  const admin = mockAdmins.find((a) => a.id === project?.adminId);
  const supervisor = mockSupervisors.find((s) => s.id === project?.supervisorId);

  // RAB Items for this stage
  const rabItems = mockRabItems
    .filter((item) => item.categoryId === stage.categoryId)
    .map((item) => ({
      ...item,
      uraian: item.description,
      hargaSatuan: item.unitPrice,
      satuan: item.unit,
      nilaiSelesai: item.completedValue,
    }));

  const amount = rabItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const paid = rabItems.reduce((sum, item) => sum + (item.completedValue || 0), 0);

  return {
    ...stage,
    project,
    customer,
    admin,
    supervisor,
    rabItems,
    payment: {
      amount,
      paid,
    },
    // Fallback normalization
    tasks: stage.tasks || rabItems.map(i => i.uraian) || [],
    images: stage.images || [],
    title: stage.title || "Tahap Proyek",
    note: stage.note || stage.description || ""
  };
};

const customer001 = mockCustomers.find(c => c.id === "customer-001");

