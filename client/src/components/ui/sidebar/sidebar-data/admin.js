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
        type: "dropdown",
        icon: FiLayers,
        label: "Proyek",
        activeStartsWith: "/admin/proyek",
        items: [
            { label: "Daftar Proyek", href: "/admin/proyek" },
            { label: "Buat Proyek", href: "/admin/proyek/create" },
            { label: "RAB Proyek", href: "/admin/rab" },
            { label: "Laporan Progress", href: "/admin/laporan-progress" },
        ],
    },
    {
        type: "dropdown",
        icon: FiUsers,
        label: "Tim & Penugasan",
        activeStartsWith: "/admin/penugasan-tim",
        items: [
            { label: "Penugasan Tim", href: "/admin/penugasan-tim" },
        ],
    },
    {
        type: "dropdown",
        icon: FiCreditCard,
        label: "Keuangan",
        activeStartsWith: "/admin/pembayaran",
        items: [
            { label: "Pembayaran", href: "/admin/pembayaran" },
        ],
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/admin/pengaturan",
    },
];
