import {
    FiHome,
    FiUsers,
    FiLayers,
    FiBarChart2,
    FiFileText,
    FiCreditCard,
    FiSettings,
    FiActivity,
    FiShield,
    FiTrendingUp,
    FiTruck,
    FiAlertCircle,
    FiBriefcase
} from "react-icons/fi";

export default [
    {
        type: "item",
        icon: FiHome,
        label: "Dashboard",
        href: "/superadmin/dashboard",
    },
    {
        type: "dropdown",
        icon: FiUsers,
        label: "Data Master",
        activeStartsWith: "/superadmin/data-",
        items: [
            { label: "Admin", href: "/superadmin/data-admin" },
            { label: "Superadmin", href: "/superadmin/data-superadmin" },
            { label: "Konsumen", href: "/superadmin/data-konsumen" },
            { label: "Pengawas", href: "/superadmin/data-pengawas" },
            { label: "Mandor", href: "/superadmin/data-mandor" },
            { label: "Arsitek", href: "/superadmin/data-arsitek" },
            { label: "Perusahaan & PIC", href: "/superadmin/data-perusahaan" },
        ],
    },
    {
        type: "dropdown",
        icon: FiLayers,
        label: "Proyek Global",
        activeStartsWith: "/superadmin/proyek",
        items: [
            { label: "Semua Proyek", href: "/superadmin/proyek" },
            { label: "Proyek Aktif", href: "/superadmin/proyek/aktif" },
            { label: "Relasi Admin-Proyek", href: "/superadmin/proyek/relasi" },
        ],
    },
    {
        type: "item",
        icon: FiBriefcase,
        label: "Kapasitas Admin",
        href: "/superadmin/kapasitas-admin",
    },
    {
        type: "dropdown",
        icon: FiTrendingUp,
        label: "Monitoring Global",
        activeStartsWith: ["/superadmin/monitoring", "/superadmin/progres-proyek"],
        items: [
            { label: "Progress Proyek", href: "/superadmin/progres-proyek" },
            { label: "Pembayaran Global", href: "/superadmin/pembayaran" },
            { label: "Material Request", href: "/superadmin/monitoring/material" },
            { label: "Laporan Pengawas", href: "/superadmin/monitoring/laporan-pengawas" },
        ],
    },
    {
        type: "item",
        icon: FiAlertCircle,
        label: "Eskalasi & Koreksi",
        href: "/superadmin/eskalasi",
    },
    {
        type: "item",
        icon: FiActivity,
        label: "Audit Aktivitas",
        href: "/superadmin/log-aktivitas",
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/superadmin/pengaturan",
    },
];
