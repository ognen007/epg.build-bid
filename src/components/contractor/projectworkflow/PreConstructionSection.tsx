import React from "react";
import { Clock, FileText, CheckCircle, Bolt } from "lucide-react";

export function PreConstructionSection({ tasks }: any) {
  const statuses = [
    { hold: "takeoff_in_progress", label: "Takeoff in Progress" },
    { hold: "ready_for_proposal", label: "Ready for Proposal" },
    { hold: "negotiating", label: "Negotiating" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "takeoff_in_progress":
        return Clock;
      case "ready_for_proposal":
        return FileText;
      case "negotiating":
        return CheckCircle;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-xl font-semibold text-gray-900">Pre-Construction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {statuses.map((status) => {
          const StatusIcon = getStatusIcon(status.hold);
          const tasksInGroup = tasks.filter(
            (task: any) => task.hold === status.hold
          );

          return (
            <div
              key={status.hold}
              className="bg-white rounded-xl shadow-sm p-6 w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Bolt className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-gray-900">{status.label}</h3>
                </div>
                <span className="text-sm text-gray-500">{tasksInGroup.length}</span>
              </div>

              <div className="space-y-3">
                {tasksInGroup.map((task: any) => (
                  <div
                    key={task.id}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="font-medium text-gray-900">{task.name}</div>
                    {task.dueDate && (
                      <div className="text-sm text-gray-500 mt-1">
                        Due {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    {task.dropboxLink && (
                      <a
                        href={task.dropboxLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 hover:text-orange-700 mt-2 inline-block"
                      >
                        View Files
                      </a>
                    )}
                    {task.totalBidAmount && (
                      <div className="text-sm text-gray-500 mt-1">
                        Total Bid: ${task.totalBidAmount.toLocaleString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}