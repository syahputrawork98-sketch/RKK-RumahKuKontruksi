// client/src/components/ui/sidebar/sidebar-data/admin.js
import {
    FiHome,
    FiLayers,
    FiFileText,
    FiCreditCard,
    FiUsers,
    FiBarChart2,
    FiSettings
} from "react-icons/fi";

export default [
    {
        type: "item",
        icon: FiHome,
        label: "Dashboard",
        href: "/admin/dashboard",
    },
    {
        type: "item",
        icon: FiLayers,
        label: "Manajemen Proyek",
        href: "/admin/proyek",
        activeStartsWith: "/admin/proyek"
    },
    {
        type: "item",
        icon: FiFileText,
        label: "RAB Proyek",
        href: "/admin/rab",
        activeStartsWith: "/admin/rab"
    },
    {
        type: "item",
        icon: FiCreditCard,
        label: "Pembayaran",
        href: "/admin/pembayaran",
    },
    {
        type: "item",
        icon: FiUsers,
        label: "Penugasan Tim",
        href: "/admin/penugasan-tim",
    },
    {
        type: "item",
        icon: FiBarChart2,
        label: "Laporan Progress",
        href: "/admin/laporan-progress",
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/admin/pengaturan",
    },
];
