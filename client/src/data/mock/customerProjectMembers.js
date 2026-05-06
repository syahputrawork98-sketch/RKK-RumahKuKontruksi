// client/src/data/mock/customerProjectMembers.js

export const mockCustomerProjectMembers = [
  {
    id: "member-001",
    projectId: "project-001",
    customerId: "customer-001",
    userId: "user-customer-viewer-001",
    name: "Dian Pratama",
    email: "dian.pratama@example.com",
    phone: "081288877766",
    avatar: "https://i.pravatar.cc/150?u=customer-viewer-001",
    memberType: "owner_representative",
    relationToCustomer: "Saudara / Konsultan pribadi",
    permissions: [
      "view_project",
      "view_timeline",
      "view_project_photos",
      "comment_timeline"
    ],
    status: "active",
    invitedAt: "2026-04-20"
  },
  {
    id: "member-002",
    projectId: "project-003",
    customerId: "customer-003",
    userId: "user-customer-viewer-002",
    name: "Rully Kurniawan",
    email: "rully@ciptaproperti.co.id",
    phone: "081266655544",
    avatar: "https://i.pravatar.cc/150?u=customer-viewer-002",
    memberType: "company_pic",
    relationToCustomer: "Staff Operasional Lapangan",
    permissions: [
      "view_project",
      "view_timeline",
      "view_project_photos",
      "view_project_rab",
      "comment_timeline"
    ],
    status: "active",
    invitedAt: "2026-04-25"
  }
];

// Helper to get members by project ID
export const getProjectMembers = (projectId) => 
  mockCustomerProjectMembers.filter(m => m.projectId === projectId);
