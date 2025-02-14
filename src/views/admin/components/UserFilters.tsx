import { Search } from 'lucide-react';

interface UserFiltersProps {
  searchQuery: string;
  roleFilter: string;
  onSearchChange: (query: string) => void;
  onRoleChange: (role: string) => void;
}

export function UserFilters({
  searchQuery,
  roleFilter,
  onSearchChange,
  onRoleChange
}: UserFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
  className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
  value={roleFilter}
  onChange={(e) => onRoleChange(e.target.value)}
>
  <option value="">All Roles</option>
  <option value="ADMIN">Admin</option>
  <option value="PROJECTSPECIALIST">Project Specialist</option>
  <option value="CSM">CSM</option>
</select>

      </div>
    </div>
  );
}