import { Search } from "lucide-react";

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRole: string;
  setSelectedRole: (role: string) => void;
  activeSquad: string;
  setActiveSquad: (squad: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export const FilterSection = ({
  searchQuery,
  setSearchQuery,
  selectedRole,
  setSelectedRole,
}: FilterSectionProps) => {

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm mb-6 border border-gray-100">
      <div className="flex items-center gap-3 flex-1 min-w-[280px]">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search members by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm"><Search size={16}/></span>
        </div>

        {/* Filter Dropdown */}
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
        >
          <option value="All">All Roles</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
        </select>
      </div>

    </div>
  );
};