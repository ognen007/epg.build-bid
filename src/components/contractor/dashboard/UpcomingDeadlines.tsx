import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Calendar, Clock } from "lucide-react";
import { Deadline } from "../components/holders/Deadline";
import { fetchContractorId } from "../../../services/contractor/contractorData/contractorIdEndpoint";
import { fetchUpcomingDeadlines } from "../../../services/contractor/dashboard/upcomingDeadlinesEndpoint";

export interface Deadline {
  id: string;
  project: string;
  task: string;
  date: string;
  daysLeft: number;
}

export function UpcomingDeadlines() {
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contractorId, setContractorId] = useState<string | null>(null);

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
    async function loadDeadlines() {
      if (!contractorId) return;

      try {
        setLoading(true);
        const fetchedDeadlines = await fetchUpcomingDeadlines(contractorId);
        setDeadlines(fetchedDeadlines);
      } catch (err: any) {
        console.error("Error fetching deadlines:", err);
        setError(err.message); // Use the error message from the service
      } finally {
        setLoading(false);
      }
    }

    loadDeadlines();
  }, [contractorId]);


  useEffect(() => {
    loadContractorId();
  }, [loadContractorId]);

  // Error UI
  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 rounded-xl p-6">
        <h2 className="text-lg font-semibold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upcoming Deadlines</h2>
      <div className="space-y-4">
        {deadlines.length > 0 ? (
          deadlines.map((deadline) => (
            <div key={deadline.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
              <Calendar className="h-5 w-5 text-orange-500" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{deadline.task}</p>
                <p className="text-sm text-gray-500">{deadline.project}</p>
                <div className="flex items-center mt-2 text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className={`${deadline.daysLeft <= 5 ? "text-red-600" : "text-gray-600"} font-medium`}>
                    {deadline.daysLeft} days left
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Deadline label="No Upcoming Deadlines....."/>
        )}
      </div>
    </div>
  );
}
