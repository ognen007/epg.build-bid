import React from 'react';
import { StatsOverview } from '../../components/contractor/dashboard/StatsOverview';
import { RecentActivity } from '../../components/contractor/dashboard/RecentActivity';
import { UpcomingDeadlines } from '../../components/contractor/dashboard/UpcomingDeadlines';
import { Skeleton } from '@radix-ui/themes';

export function ContractorDashboard({ loading }: { loading: boolean }) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {loading ? (
        <Skeleton className="w-full h-10 bg-gray-300 rounded-md" />
      ) : (
        <>
          <StatsOverview />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-4">
              <RecentActivity />
            </div>
            <div>
              <UpcomingDeadlines />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
