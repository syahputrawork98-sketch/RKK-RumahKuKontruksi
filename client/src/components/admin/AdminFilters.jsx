// client/src/components/admin/AdminFilters.jsx
import { Search } from "lucide-react";

export default function AdminFilters({
  search,
  setSearch,
  //   role,
  //   setRole,
  sort,
  setSort,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
      {/* SEARCH BAR */}
      <div className="relative w-full md:w-1/3">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Cari admin berdasarkan nama atau email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-neutral-90 text-s-regular bg-white shadow-sm focus:border-emerald-600 focus:ring-emerald-600"
        />
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        {/* ROLE FILTER */}
        {/* <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white text-neutral-90 text-s-regular shadow-sm focus:border-emerald-600 focus:ring-emerald-600"
        >
          <option value="all">Semua Role</option>
          <option value="adm">Admin</option>
          <option value="sup">Superadmin</option>
        </select> */}

        {/* SORT */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-lg px-3 py-2 bg-white text-neutral-90 text-s-regular shadow-sm focus:border-emerald-600 focus:ring-emerald-600"
        >
          <option value="name-asc">Nama A-Z</option>
          <option value="name-desc">Nama Z-A</option>
          <option value="newest">Terbaru</option>
          <option value="oldest">Terlama</option>
          {/* <option value="last-login">Terakhir Login</option> */}
        </select>
      </div>
    </div>
  );
}
