import {
    FiHome,
    FiLayers,
    FiFileText,
    FiShoppingCart,
    FiCamera,
    FiAlertTriangle,
    FiSettings,
    FiInfo,
    FiBriefcase,
    FiCreditCard,
    FiSearch,
    FiClipboard
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
        type: "dropdown",
        icon: FiInfo,
        label: "Informasi Kerja",
        activeStartsWith: "/mandor/info",
        items: [
            { label: "Scope & RAB Ringkas", href: "/mandor/info/rab" },
            { label: "Gambar Kerja", href: "/mandor/info/gambar-kerja" },
            { label: "Jadwal Kerja", href: "/mandor/info/jadwal" },
        ],
    },
    {
        type: "item",
        icon: FiClipboard,
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
        icon: FiBriefcase,
        label: "Jurnal Mingguan",
        href: "/mandor/jurnal-mingguan",
        activeStartsWith: "/mandor/jurnal-mingguan"
    },
    {
        type: "item",
        icon: FiShoppingCart,
        label: "Material Request",
        href: "/mandor/request-material",
    },
    {
        type: "item",
        icon: FiAlertTriangle,
        label: "Kendala Lapangan",
        href: "/mandor/kendala-lapangan",
    },
    {
        type: "item",
        icon: FiCamera,
        label: "Dokumentasi / Galeri",
        href: "/mandor/dokumentasi",
    },
    {
        type: "dropdown",
        icon: FiSearch,
        label: "Peluang Proyek",
        activeStartsWith: "/mandor/peluang",
        items: [
            { label: "Project Posting", href: "/mandor/peluang/posting" },
            { label: "Penawaran Saya", href: "/mandor/peluang/penawaran" },
            { label: "Riwayat Penawaran", href: "/mandor/peluang/riwayat" },
        ],
    },
    {
        type: "item",
        icon: FiCreditCard,
        label: "Pembayaran",
        href: "/mandor/pembayaran",
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/mandor/pengaturan",
    },
];
