import React, { useCallback, useEffect, useState } from 'react';
import { MessageSquare, CheckCircle, Clock, HardHat } from 'lucide-react';
import axios from 'axios';
import { ContractorCardHolder } from '../components/holders/ContractorCardHolder';

interface Activity {
  id: string;
  type: 'message' | 'update' | 'deadline';
  content: string;
  timestamp: string;
  project?: string;
}

const iconMap = {
  message: MessageSquare,
  update: CheckCircle,
  deadline: Clock,
};

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [contractorId, setContractorId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch contractor ID on mount
  const fetchContractorId = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) throw new Error('User not found');

      const { email } = JSON.parse(storedUser);
      const { data: contractors } = await axios.get(
        'https://epg-backend.onrender.com/api/contractor/id'
      );

      const loggedInContractor = contractors.find(
        (contractor: any) => contractor.email === email
      );

      if (!loggedInContractor) throw new Error('Contractor not found');

      setContractorId(loggedInContractor.id);
    } catch (err) {
      console.error('Error fetching contractor ID:', err);
      setError((err as Error).message);
      setLoading(false);
    }
  }, []);

  // Call fetchContractorId when component mounts
  useEffect(() => {
    fetchContractorId();
  }, [fetchContractorId]);

  // Fetch recent activities when contractorId becomes available
  useEffect(() => {
    if (!contractorId) return;

    const fetchRecentActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://epg-backend.onrender.com/api/contractor/recent/activity/${contractorId}`
        );
        const data = response.data;

        // Format the fetched data to match the Activity interface
        const formattedActivities: Activity[] = [];

        if (data.latestWonProject) {
          formattedActivities.push({
            id: '1',
            type: 'update',
            content: `Completed project: ${data.latestWonProject.name}`,
            timestamp: new Date(data.latestWonProject.deadline).toLocaleString(),
            project: data.latestWonProject.name,
          });
        }

        if (data.latestTask) {
          formattedActivities.push({
            id: '2',
            type: 'message',
            content: `New task: ${data.latestTask.title}`,
            timestamp: new Date(data.latestTask.createdAt).toLocaleString(),
            project: data.latestTask.title,
          });
        }

        if (data.latestDeadline) {
          formattedActivities.push({
            id: '3',
            type: 'deadline',
            content: `Upcoming deadline: ${data.latestDeadline.name}`,
            timestamp: new Date(data.latestDeadline.deadline).toLocaleString(),
            project: data.latestDeadline.name,
          });
        }

        setActivities(formattedActivities);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError('Failed to fetch activities');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivities();
  }, [contractorId]);

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
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.length === 0 ? (
          <ContractorCardHolder label={"There are no activities at the moment"}/>
        ) : (
          activities.map((activity) => {
            const Icon = iconMap[activity.type];
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div
                  className={`
                    p-2 rounded-full
                    ${activity.type === 'message' ? 'bg-blue-100 text-blue-600' : ''}
                    ${activity.type === 'update' ? 'bg-green-100 text-green-600' : ''}
                    ${activity.type === 'deadline' ? 'bg-orange-100 text-orange-600' : ''}
                  `}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-gray-800">{activity.content}</p>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    {activity.project && (
                      <>
                        <span>{activity.project}</span>
                        <span className="mx-2">•</span>
                      </>
                    )}
                    <span>{activity.timestamp}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
