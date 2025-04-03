const PROJECT_STAGES = [
  { value: '', label: 'All' },
  { value: 'awaiting_approval', label: 'Awaiting Approval' },
  { value: 'awaiting_takeoff', label: 'Awaiting Takeoff' },
  { value: 'takeoff_in_progress', label: 'Takeoff in Progress' },
  { value: 'takeoff_complete', label: 'Takeoff Complete' },
  { value: 'bid_recieved', label: 'Bid Recieved' },
  { value: 'bid_submitted', label: 'Bid Submitted' },
  { value: 'won', label: 'Won' },
  { value: 'lost', label: 'Lost' },
  { value: 'abandoned', label: 'Abandoned' },
  { value: 'denied', label:"Denied"}
];

interface ProjectFiltersProps {
  filters: {
    status: string;
    stage: string;
    client: string;
    search: string;
  };
  onFilterChange: (filters: any) => void;
}

export function ProjectFilters({ filters, onFilterChange }: ProjectFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
        <input
          type="text"
          placeholder="Search projects..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          value={filters.search}
          onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
        <select
          className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
        >
          {PROJECT_STAGES.map(stage => (
            <option key={stage.value} value={stage.value}>
              {stage.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Contractor</label>
        <input
          type="text"
          placeholder="Search contractors..."
          className="w-full rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
          value={filters.client}
          onChange={(e) => onFilterChange({ ...filters, client: e.target.value })}
        />
      </div>
    </div>
  );
}
