import type { UserRole } from "@/types/auth.types";

export type AdminUserStatus = "ACTIVE" | "INACTIVE";

export type AdminManagedUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AdminUserStatus;
};

export type AdminApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";

export type AdminApprovalItem = {
  id: string;
  projectCode: string;
  projectName: string;
  requestedBy: string;
  requestedAt: string;
  status: AdminApprovalStatus;
};
