// client/src/components/pengawas/PengawasFilters.jsx
import { FiSearch } from "react-icons/fi";

export default function PengawasFilters({
  search,
  setSearch,
  status,
  setStatus,
  sort,
  setSort,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-3">
      {/* SEARCH BAR */}
      <div className="relative flex-1 max-w-md">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--dashboard-text-soft)]"
          size={18}
        />
        <input
          type="text"
          placeholder="Cari pengawas berdasarkan nama atau NIK..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20"
        />
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-3">
        {/* STATUS FILTER */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold text-[var(--dashboard-text-soft)] focus:outline-none"
        >
          <option value="all">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>

        {/* SORT */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold text-[var(--dashboard-text-soft)] focus:outline-none"
        >
          <option value="name-asc">Nama A-Z</option>
          <option value="name-desc">Nama Z-A</option>
          <option value="newest">Terbaru Bergabung</option>
          <option value="oldest">Terlama Bergabung</option>
        </select>
      </div>
    </div>
  );
}
