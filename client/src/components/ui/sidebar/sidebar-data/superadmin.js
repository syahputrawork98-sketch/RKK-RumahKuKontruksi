// client/src/components/ui/sidebar-data/superadmin.js
import {
    FiHome,
    FiUsers,
    FiLayers,
    FiBarChart2,
    FiFileText,
    FiCreditCard,
    FiSettings,
    FiActivity
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
        label: "Manajemen User",
        activeStartsWith: "/admin/user",
        items: [
            { label: "Admin", href: "/superadmin/data-admin" },
            { label: "Pengawas", href: "/superadmin/data-pengawas" },
            { label: "Mandor", href: "/superadmin/data-mandor" },
            { label: "Konsumen", href: "/admin/user/konsumen" },
            { label: "Perusahaan & PIC", href: "/admin/user/perusahaan" },
        ],
    },
    {
        type: "item",
        icon: FiLayers,
        label: "Proyek",
        href: "/admin/proyek",
    },
    {
        type: "item",
        icon: FiBarChart2,
        label: "Progres Proyek",
        href: "/admin/progres-proyek",
    },
    {
        type: "item",
        icon: FiFileText,
        label: "RAB",
        href: "/admin/rab",
    },
    {
        type: "dropdown",
        icon: FiCreditCard,
        label: "Pembayaran",
        activeStartsWith: "/admin/pembayaran",
        items: [
            { label: "Pembayaran Konsumen", href: "/admin/pembayaran/konsumen" },
            { label: "Pembayaran Mandor", href: "/admin/pembayaran/mandor" },
        ],
    },
    {
        type: "item",
        icon: FiActivity,
        label: "Log Aktivitas",
        href: "/admin/log-aktivitas",
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/admin/pengaturan",
    },
];
