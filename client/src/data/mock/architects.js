// client/src/data/mock/architects.js

export const mockArchitects = [
  {
    id: "architect-001",
    userId: "user-architect-001",
    name: "Maya Kartika",
    email: "maya.kartika@rumahkukontruksi.com",
    phone: "081234567800",
    avatar: "https://i.pravatar.cc/150?u=architect-001",
    employmentType: "internal",
    specialization: "Residential Design",
    experienceYears: 6,
    skillTags: ["Rumah Tinggal", "Interior", "Renovasi", "Gambar Kerja"],
    assignedDesignRequestIds: ["design-request-001"],
    maxDesignCapacity: 2,
    status: "active",
    joinedAt: "2024-02-12",
    notes: "Arsitek senior untuk desain rumah tinggal dan renovasi."
  },
  {
    id: "architect-002",
    userId: "user-architect-002",
    name: "Rizky Ramadhan",
    email: "rizky.ramadhan@rumahkukontruksi.com",
    phone: "081234567801",
    avatar: "https://i.pravatar.cc/150?u=architect-002",
    employmentType: "internal",
    specialization: "Modern Architecture",
    experienceYears: 4,
    skillTags: ["Modern", "Minimalist", "3D Rendering"],
    assignedDesignRequestIds: ["design-request-003"],
    maxDesignCapacity: 2,
    status: "active",
    joinedAt: "2024-03-15",
    notes: "Ahli dalam desain modern minimalis dan visualisasi 3D."
  },
  {
    id: "architect-003",
    userId: "user-architect-003",
    name: "Indra Wijaya",
    email: "indra.wijaya@partner.com",
    phone: "081234567802",
    avatar: "https://i.pravatar.cc/150?u=architect-003",
    employmentType: "partner",
    specialization: "Commercial & Industrial",
    experienceYears: 10,
    skillTags: ["Gudang", "Ruko", "Kantor"],
    assignedDesignRequestIds: ["design-request-004"],
    maxDesignCapacity: 2,
    status: "active", // Changed from partner to active for helper consistency
    joinedAt: "2024-05-20",
    notes: "Arsitek partner eksternal untuk proyek komersial skala besar."
  }
];

// Helper to get available architects
export const getAvailableArchitects = () =>
  mockArchitects.filter(
    (a) =>
      a.status === "active" &&
      a.assignedDesignRequestIds.length < a.maxDesignCapacity
  );
