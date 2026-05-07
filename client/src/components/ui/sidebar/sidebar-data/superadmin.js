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
        activeStartsWith: "/superadmin/data-",
        items: [
            { label: "Admin", href: "/superadmin/data-admin" },
            { label: "Pengawas", href: "/superadmin/data-pengawas" },
            { label: "Mandor", href: "/superadmin/data-mandor" },
            { label: "Arsitek", href: "/superadmin/data-arsitek" },
            { label: "Konsumen", href: "/superadmin/data-konsumen" },
            { label: "Perusahaan & PIC", href: "/superadmin/data-perusahaan" },
        ],
    },
    {
        type: "item",
        icon: FiLayers,
        label: "Proyek",
        href: "/superadmin/proyek",
    },
    {
        type: "item",
        icon: FiBarChart2,
        label: "Progres Proyek",
        href: "/superadmin/progres-proyek",
    },
    {
        type: "item",
        icon: FiFileText,
        label: "RAB",
        href: "/superadmin/rab",
    },
    {
        type: "dropdown",
        icon: FiCreditCard,
        label: "Pembayaran",
        activeStartsWith: "/superadmin/pembayaran",
        items: [
            { label: "Pembayaran Konsumen", href: "/superadmin/pembayaran/konsumen" },
            { label: "Pembayaran Mandor", href: "/superadmin/pembayaran/mandor" },
            { label: "Pembayaran Arsitek", href: "/superadmin/pembayaran/arsitek" },
        ],
    },
    {
        type: "item",
        icon: FiActivity,
        label: "Log Aktivitas",
        href: "/superadmin/log-aktivitas",
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/superadmin/pengaturan",
    },
];
