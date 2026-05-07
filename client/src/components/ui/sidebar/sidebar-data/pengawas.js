// client/src/components/ui/sidebar/sidebar-data/pengawas.js
import {
    FiHome,
    FiLayers,
    FiCheckSquare,
    FiCamera,
    FiFileText,
    FiShoppingCart,
    FiSettings
} from "react-icons/fi";

export default [
    {
        type: "item",
        icon: FiHome,
        label: "Dashboard",
        href: "/pengawas/dashboard",
    },
    {
        type: "item",
        icon: FiLayers,
        label: "Proyek Diawasi",
        href: "/pengawas/proyek",
        activeStartsWith: "/pengawas/proyek"
    },
    {
        type: "item",
        icon: FiCheckSquare,
        label: "Verifikasi Progres",
        href: "/pengawas/verifikasi-progres",
    },
    {
        type: "item",
        icon: FiCamera,
        label: "Dokumentasi Lapangan",
        href: "/pengawas/dokumentasi",
    },
    {
        type: "item",
        icon: FiFileText,
        label: "Laporan Mingguan",
        href: "/pengawas/laporan-mingguan",
    },
    {
        type: "item",
        icon: FiShoppingCart,
        label: "Request Material",
        href: "/pengawas/request-material",
    },
    {
        type: "item",
        icon: FiFileText,
        label: "Jurnal Mandor",
        href: "/pengawas/jurnal-mandor",
        activeStartsWith: "/pengawas/jurnal-mandor"
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/pengawas/pengaturan",
    },
];
