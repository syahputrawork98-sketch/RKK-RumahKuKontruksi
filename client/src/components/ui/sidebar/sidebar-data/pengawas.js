import {
    FiHome,
    FiLayers,
    FiCheckSquare,
    FiCamera,
    FiFileText,
    FiShoppingCart,
    FiSettings,
    FiClipboard,
    FiBookOpen,
    FiAlertTriangle,
    FiCalendar
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
        type: "dropdown",
        icon: FiClipboard,
        label: "Detail Teknis Proyek",
        activeStartsWith: "/pengawas/teknis",
        items: [
            { label: "Gambar Kerja", href: "/pengawas/teknis/gambar-kerja" },
            { label: "RAB/Scope Baseline", href: "/pengawas/teknis/rab-baseline" },
            { label: "Jadwal", href: "/pengawas/teknis/jadwal" },
        ],
    },
    {
        type: "item",
        icon: FiBookOpen,
        label: "Review Jurnal Mandor",
        href: "/pengawas/jurnal-mandor",
        activeStartsWith: "/pengawas/jurnal-mandor"
    },
    {
        type: "item",
        icon: FiCheckSquare,
        label: "Verifikasi Progres",
        href: "/pengawas/verifikasi-progres",
    },
    {
        type: "item",
        icon: FiFileText,
        label: "Laporan Mingguan",
        href: "/pengawas/laporan-mingguan",
        activeStartsWith: "/pengawas/laporan-mingguan"
    },
    {
        type: "item",
        icon: FiShoppingCart,
        label: "Material Request",
        href: "/pengawas/request-material",
    },
    {
        type: "item",
        icon: FiAlertTriangle,
        label: "Kendala & Rekomendasi",
        href: "/pengawas/kendala",
    },
    {
        type: "item",
        icon: FiCamera,
        label: "Dokumentasi Lapangan",
        href: "/pengawas/dokumentasi",
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/pengawas/pengaturan",
    },
];
