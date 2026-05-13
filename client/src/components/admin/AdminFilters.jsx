// client/src/components/admin/AdminFilters.jsx
import { FiSearch } from "react-icons/fi";

export default function AdminFilters({
  search,
  setSearch,
  //   role,
  //   setRole,
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
          placeholder="Cari admin berdasarkan nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-500/20"
        />
      </div>

      {/* FILTERS */}
      <div className="flex items-center gap-3">
        {/* SORT */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2.5 bg-[var(--dashboard-surface)] border border-[var(--dashboard-border)] rounded-xl text-xs font-bold text-[var(--dashboard-text-soft)] focus:outline-none"
        >
          <option value="name-asc">Nama A-Z</option>
          <option value="name-desc">Nama Z-A</option>
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
        </select>
      </div>
    </div>
  );
}
