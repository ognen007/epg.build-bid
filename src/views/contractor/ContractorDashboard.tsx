import React from 'react';
import { StatsOverview } from '../../components/contractor/dashboard/StatsOverview';
import { RecentActivity } from '../../components/contractor/dashboard/RecentActivity';
import { UpcomingDeadlines } from '../../components/contractor/dashboard/UpcomingDeadlines';

export function ContractorDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <StatsOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
  <div className="space-y-4">
    <RecentActivity />
  </div>
  <div>
    <UpcomingDeadlines />
  </div>
</div>
    </div>
  );
}