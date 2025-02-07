import React, { useState, useEffect } from 'react';
import { UserPlus, DollarSign, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { ActivityItem } from './ActivityItem';

interface Activity {
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
    const fetchActivities = async () => {
      try {
        const response = await axios.get('https://epg-backend.onrender.com/api/admin/recent/activity');
        const data = response.data; // Expected object with keys: newestContractor, latestTakeoffProject, latestWonProject

        const formattedActivities: Activity[] = [];

        // Newest registered contractor
        if (data.newestContractor) {
          formattedActivities.push({
            id: '1',
            type: 'user_signup',
            content: `New contractor ${data.newestContractor.fullName} joined the platform`,
            timestamp: new Date(data.newestContractor.createdAt).toLocaleString(),
            icon: UserPlus,
          });
        }

        // Most recent project with status "takeoff_in_progress"
        if (data.latestTakeoffProject) {
          formattedActivities.push({
            id: '2',
            type: 'project',
            content: `Project "${data.latestTakeoffProject.name}" is in takeoff in progress`,
            timestamp: new Date(data.latestTakeoffProject.deadline).toLocaleString(),
            icon: CheckCircle,
          });
        }

        // Most recent project with status "won"
        if (data.latestWonProject) {
          formattedActivities.push({
            id: '3',
            type: 'project',
            content: `Project "${data.latestWonProject.name}" marked as won`,
            timestamp: new Date(data.latestWonProject.deadline).toLocaleString(),
            icon: DollarSign,
          });
        }

        setActivities(formattedActivities);
      } catch (err: any) {
        console.error('Error fetching activities:', err);
        setError('Error fetching recent activities.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
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
