// client/src/components/ui/sidebar/sidebar-data/arsitek.js
import {
    FiHome,
    FiSend,
    FiEdit3,
    FiFolder,
    FiRepeat,
    FiClock,
    FiSettings
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
        label: "Permintaan Desain",
        href: "/arsitek/permintaan-desain",
        activeStartsWith: "/arsitek/permintaan-desain"
    },
    {
        type: "item",
        icon: FiEdit3,
        label: "Desain Aktif",
        href: "/arsitek/desain-aktif",
    },
    {
        type: "item",
        icon: FiFolder,
        label: "File Desain",
        href: "/arsitek/file-desain",
    },
    {
        type: "item",
        icon: FiRepeat,
        label: "Revisi Desain",
        href: "/arsitek/revisi",
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
