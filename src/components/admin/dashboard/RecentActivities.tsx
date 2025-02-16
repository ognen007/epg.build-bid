import React, { useState, useEffect } from 'react';
import { ActivityItem } from './ActivityItem';
import { fetchRecentActivities } from '../../../services/admin/dashboard/recentActivitesEndpoint';

export interface Activity {
  id: string;
  type: 'user_signup' | 'project';
  content: string;
  timestamp: string;
  icon: React.ElementType;
}

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadActivities() {
      try {
        const activitiesData = await fetchRecentActivities();
        setActivities(activitiesData);
      } catch (err: any) { // Type the error as any if you're not sure of its type
        setError(err.message); // Access the message property of the error
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  // Skeleton loader component for the loading state
  const SkeletonLoader = () => (
    <div className="p-6 space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div
            className="p-2 rounded-full bg-gray-300 animate-pulse"
            style={{ width: '24px', height: '24px' }}
          />
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 animate-pulse" style={{ width: '150px' }} />
            <div className="h-3 bg-gray-200 animate-pulse" style={{ width: '100px' }} />
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className="bg-white border border-red-500 text-red-500 p-6 rounded-xl">
        <h2 className="text-lg font-semibold">Error:</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <p>No recent activities.</p>
        ) : (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        )}
      </div>
    </div>
  );
}
