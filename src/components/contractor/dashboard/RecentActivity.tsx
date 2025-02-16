import React, { useCallback, useEffect, useState } from 'react';
import { MessageSquare, CheckCircle, Clock, HardHat } from 'lucide-react';
import axios from 'axios';
import { ContractorCardHolder } from '../components/holders/ContractorCardHolder';
import { fetchRecentActivities } from '../../../services/contractor/analytics/recentActivitiesEndpoint';
import { fetchContractorId } from '../../../services/contractor/contractorData/contractorIdEndpoint';

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

  const loadContractorId = useCallback(async () => {
    try {
      const id = await fetchContractorId();
      setContractorId(id);
    } catch (err) {
      console.error('Error fetching contractor ID:', err);
      setError((err as Error).message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContractorId();
  }, [loadContractorId]);

  useEffect(() => {
    async function loadActivities() {
      if (!contractorId) return;

      try {
        setLoading(true);
        const fetchedActivities = await fetchRecentActivities(contractorId);
        setActivities(fetchedActivities);
      } catch (err: any) {
        console.error("Error loading activities:", err);
        setError(err.message); // Set error message in component state
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
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
