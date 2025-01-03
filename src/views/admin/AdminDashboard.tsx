import { PlatformStats } from '../../components/admin/dashboard/PlatformStats';
import { QuickActions } from '../../components/admin/dashboard/QuickActions';
import { RecentActivities } from '../../components/admin/dashboard/RecentActivities';

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <PlatformStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivities />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
}