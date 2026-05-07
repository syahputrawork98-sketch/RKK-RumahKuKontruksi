// client/src/components/ui/sidebar/sidebar-data/mandor.js
import {
    FiHome,
    FiLayers,
    FiList,
    FiFileText,
    FiShoppingCart,
    FiCamera,
    FiAlertTriangle,
    FiSettings
} from "react-icons/fi";

export default [
    {
        type: "item",
        icon: FiHome,
        label: "Dashboard",
        href: "/mandor/dashboard",
    },
    {
        type: "item",
        icon: FiLayers,
        label: "Proyek Aktif",
        href: "/mandor/proyek-aktif",
        activeStartsWith: "/mandor/proyek-aktif"
    },
    {
        type: "item",
        icon: FiList,
        label: "Tugas Harian",
        href: "/mandor/tugas-harian",
    },
    {
        type: "item",
        icon: FiFileText,
        label: "Laporan Harian",
        href: "/mandor/laporan-harian",
    },
    {
        type: "item",
        icon: FiShoppingCart,
        label: "Request Material",
        href: "/mandor/request-material",
    },
    {
        type: "item",
        icon: FiCamera,
        label: "Dokumentasi Lapangan",
        href: "/mandor/dokumentasi",
    },
    {
        type: "item",
        icon: FiAlertTriangle,
        label: "Kendala Lapangan",
        href: "/mandor/kendala-lapangan",
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/mandor/pengaturan",
    },
];
