export const getSupervisorStatsConfig = () => [
    { 
        label: "Proyek Diawasi", 
        getValue: (stats) => (stats?.activeProjects || 0) + (stats?.finishedProjects || 0) 
    },
    { 
        label: "Review Jurnal", 
        getValue: (stats) => stats?.journals?.reduce((acc, j) => acc + (j._count?._all || 0), 0) || 0 
    },
    { 
        label: "Laporan Mingguan", 
        getValue: (stats) => stats?.weeklyReports?.reduce((acc, r) => acc + (r._count?._all || 0), 0) || 0 
    },
    { 
        label: "Material Req", 
        getValue: (stats) => stats?.materialRequests?.reduce((acc, m) => acc + (m._count?._all || 0), 0) || 0 
    }
];

export const getForemanStatsConfig = () => [
    { 
        label: "Proyek Aktif", 
        getValue: (stats) => stats?.activeProjects || 0 
    },
    { 
        label: "Proyek Selesai", 
        getValue: (stats) => stats?.finishedProjects || 0 
    },
    { 
        label: "Total Jurnal", 
        getValue: (stats) => stats?.journals?.reduce((acc, j) => acc + (j._count?._all || 0), 0) || 0 
    },
    { 
        label: "Material Req", 
        getValue: (stats) => stats?.materialRequests?.reduce((acc, m) => acc + (m._count?._all || 0), 0) || 0 
    },
    { 
        label: "Total Aktivitas", 
        getValue: (stats) => stats?.activitiesCount || 0 
    }
];
