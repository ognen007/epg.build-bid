import React, { useEffect, useState } from 'react';
import { Briefcase, CheckSquare, DollarSign } from 'lucide-react';
import { StatCard } from '../../stats/StatCard';

export function StatsOverview() {
  const [stats, setStats] = useState([
    {
      title: 'Total Projects',
      value: 0,
      icon: Briefcase,
      trend: { value: 0, isPositive: true },
    },
    {
      title: 'Ongoing Tasks',
      value: 0,
      icon: CheckSquare,
      trend: { value: 0, isPositive: true },
    },
    {
      title: 'Total Earnings',
      value: 0,
      icon: DollarSign,
      trend: { value: 0, isPositive: true },
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch statistics from the backend
    const fetchStats = async () => {
      try {
        const response = await fetch('https://epg-backend.onrender.com/api/contractors/stats'); // Call the backend endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        const data = await response.json();

        // Update the stats state with the fetched data
        setStats([
          {
            title: 'Total Projects',
            value: data[0].value,
            icon: Briefcase,
            trend: { value: 0, isPositive: true },
          },
          {
            title: 'Ongoing Tasks',
            value: data[1].value,
            icon: CheckSquare,
            trend: { value: 0, isPositive: true },
          },
          {
            title: 'Total Earnings',
            value: data[2].value,
            icon: DollarSign,
            trend: { value: 0, isPositive: true },
          },
        ]);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Error state
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
