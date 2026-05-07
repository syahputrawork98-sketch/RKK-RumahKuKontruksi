// client/src/components/ui/sidebar/sidebar-data/admin.js
import {
    FiHome,
    FiLayers,
    FiActivity,
    FiCreditCard,
    FiSettings,
    FiSearch
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
        label: "Manajemen Proyek",
        activeStartsWith: ["/admin/proyek", "/admin/rab", "/admin/penugasan-tim"],
        items: [
            { label: "Daftar Proyek", href: "/admin/proyek" },
            { label: "Buat Proyek", href: "/admin/proyek/create" },
            { label: "RAB Proyek", href: "/admin/rab" },
            { label: "Penugasan Tim", href: "/admin/penugasan-tim" },
        ],
    },
    {
        type: "dropdown",
        icon: FiActivity,
        label: "Monitoring",
        activeStartsWith: "/admin/laporan-progress",
        items: [
            { label: "Laporan Progress", href: "/admin/laporan-progress" },
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
