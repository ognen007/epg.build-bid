import React, { useEffect, useState } from 'react';
import { Briefcase, CheckSquare, DollarSign } from 'lucide-react';
import { StatCard } from '../../stats/StatCard';
import { fetchStats } from '../../../services/contractor/dashboard/contractorDashboardEndpoint';

export function StatsOverview() {
  const [stats, setStats] = useState([
    {
      title: 'Total Projects',
      value: 0,
      icon: Briefcase, // Use the icon directly
      trend: { value: 0, isPositive: true },
    },
    {
      title: 'Ongoing Tasks',
      value: 0,
      icon: CheckSquare, // Use the icon directly
      trend: { value: 0, isPositive: true },
    },
    {
      title: 'Total Earnings',
      value: 0,
      icon: DollarSign, // Use the icon directly
      trend: { value: 0, isPositive: true },
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const fetchedStats = await fetchStats();
        setStats([
          {
            title: 'Total Projects',
            value: fetchedStats[0]?.value || 0,
            icon: Briefcase,
            trend: { value: fetchedStats[0]?.trend?.value || 0, isPositive: fetchedStats[0]?.trend?.isPositive || true },
          },
          {
            title: 'Ongoing Tasks',
            value: fetchedStats[1]?.value || 0,
            icon: CheckSquare,
            trend: { value: fetchedStats[1]?.trend?.value || 0, isPositive: fetchedStats[1]?.trend?.isPositive || true },
          },
          {
            title: 'Total Earnings',
            value: fetchedStats[2]?.value || 0,
            icon: DollarSign,
            trend: { value: fetchedStats[2]?.trend?.value || 0, isPositive: fetchedStats[2]?.trend?.isPositive || true },
          },
        ]);

      } catch (err: any) {
        console.error("Error loading stats:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
