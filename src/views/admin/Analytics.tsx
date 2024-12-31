import React from 'react';
import { UserGrowthChart } from '../../components/admin/analytics/UserGrowthChart';
import { RevenueChart } from '../../components/admin/analytics/RevenueChart';
import { ProjectMetrics } from '../../components/admin/analytics/ProjectMetrics';
import { DownloadableReports } from '../../components/admin/analytics/DownloadableReports';

export function Analytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserGrowthChart />
        <RevenueChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProjectMetrics />
        <DownloadableReports />
      </div>
    </div>
  );
}