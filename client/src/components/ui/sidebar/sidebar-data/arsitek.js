import {
    FiHome,
    FiSend,
    FiEdit3,
    FiFolder,
    FiRepeat,
    FiClock,
    FiSettings,
    FiCheckCircle,
    FiFileText,
    FiActivity,
    FiLayers
} from "react-icons/fi";

export default [
    {
        type: "item",
        icon: FiHome,
        label: "Dashboard",
        href: "/arsitek/dashboard",
    },
    {
        type: "item",
        icon: FiSend,
        label: "Brief Desain",
        href: "/arsitek/brief-desain",
        activeStartsWith: "/arsitek/brief-desain"
    },
    {
        type: "item",
        icon: FiActivity,
        label: "Desain Aktif",
        href: "/arsitek/desain-aktif",
    },
    {
        type: "dropdown",
        icon: FiLayers,
        label: "Tahapan Desain",
        activeStartsWith: "/arsitek/tahapan",
        items: [
            { label: "Konsep Awal", href: "/arsitek/tahapan/konsep" },
            { label: "Denah", href: "/arsitek/tahapan/denah" },
            { label: "Tampak / 3D", href: "/arsitek/tahapan/3d" },
            { label: "Gambar Kerja", href: "/arsitek/tahapan/gambar-kerja" },
        ],
    },
    {
        type: "item",
        icon: FiRepeat,
        label: "Revisi Desain",
        href: "/arsitek/revisi",
    },
    {
        type: "item",
        icon: FiFolder,
        label: "File & Versioning",
        href: "/arsitek/file-desain",
    },
    {
        type: "item",
        icon: FiCheckCircle,
        label: "Final Approved",
        href: "/arsitek/final-approved",
    },
    {
        type: "item",
        icon: FiFileText,
        label: "Evaluasi Teknis",
        href: "/arsitek/evaluasi",
    },
    {
        type: "item",
        icon: FiClock,
        label: "Riwayat Desain",
        href: "/arsitek/riwayat",
    },
    {
        type: "item",
        icon: FiSettings,
        label: "Pengaturan",
        href: "/arsitek/pengaturan",
    },
];
