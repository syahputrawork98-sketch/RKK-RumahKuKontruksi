import type {
  AdminApprovalItem,
  AdminApprovalStatus,
  AdminManagedUser,
  AdminUserStatus,
} from "@/types/admin.types";
import { ROLES } from "@/constants/roles";

const managedUsers: AdminManagedUser[] = [
  {
    id: "usr-001",
    name: "Raihan Owner",
    email: "owner@rumahku.dev",
    role: ROLES.owner,
    status: "ACTIVE",
  },
  {
    id: "usr-002",
    name: "Alya Admin",
    email: "admin@rumahku.dev",
    role: ROLES.admin,
    status: "ACTIVE",
  },
  {
    id: "usr-003",
    name: "Bima Kontraktor",
    email: "kontraktor@rumahku.dev",
    role: ROLES.kontraktor,
    status: "ACTIVE",
  },
  {
    id: "usr-004",
    name: "Sinta Client",
    email: "user@rumahku.dev",
    role: ROLES.user,
    status: "INACTIVE",
  },
];

const approvalItems: AdminApprovalItem[] = [
  {
    id: "apr-001",
    projectCode: "PRJ-009",
    projectName: "Gudang Logistik Tangerang",
    requestedBy: "Bima Kontraktor",
    requestedAt: "2026-02-20 10:22",
    status: "PENDING",
  },
  {
    id: "apr-002",
    projectCode: "PRJ-010",
    projectName: "Renovasi Kantor Pusat",
    requestedBy: "Alya Admin",
    requestedAt: "2026-02-21 14:05",
    status: "APPROVED",
  },
  {
    id: "apr-003",
    projectCode: "PRJ-011",
    projectName: "Cluster Perumahan Selatan",
    requestedBy: "Raka PM",
    requestedAt: "2026-02-22 08:40",
    status: "PENDING",
  },
];

export function getAdminManagedUsers(): AdminManagedUser[] {
  return managedUsers.map((item) => ({ ...item }));
}

export function getAdminUserById(id: string): AdminManagedUser | undefined {
  const user = managedUsers.find((item) => item.id === id);
  return user ? { ...user } : undefined;
}

export function updateAdminUserStatus(id: string, status: AdminUserStatus): AdminManagedUser | null {
  const index = managedUsers.findIndex((item) => item.id === id);
  if (index < 0) return null;

  managedUsers[index] = {
    ...managedUsers[index],
    status,
  };

  return { ...managedUsers[index] };
}

export function getAdminApprovals(): AdminApprovalItem[] {
  return approvalItems.map((item) => ({ ...item }));
}

export function updateAdminApprovalStatus(
  id: string,
  status: AdminApprovalStatus
): AdminApprovalItem | null {
  const index = approvalItems.findIndex((item) => item.id === id);
  if (index < 0) return null;

  approvalItems[index] = {
    ...approvalItems[index],
    status,
  };

  return { ...approvalItems[index] };
}
