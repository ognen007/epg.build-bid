import React from 'react';
import { QuickStats } from '../components/stats/QuickStats';
import { ProjectCards } from '../components/dashboard/ProjectCards';

export function DashboardView() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <QuickStats />
      <ProjectCards />
    </div>
  );
}