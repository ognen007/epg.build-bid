import { Bolt } from "lucide-react";

export function ConstructionSection({ tasks, updateTaskStatus, onTaskClick }: any) {
  const statuses = [
    { hold: "scheduled_projects", label: "Scheduled Projects" },
    { hold: "ongoing_projects", label: "Ongoing Projects" },
    { hold: "completed_projects", label: "Completed Projects" },
  ];

  const handleDrop = (e: any, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    updateTaskStatus(taskId, status); // Call the `updateTaskStatus` function
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Construction</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => {
          const tasksInGroup = tasks.filter(
            (task: any) => task.hold === status.hold
          );

          return (
            <div
              key={status.hold}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, status.hold)}
              className="bg-white rounded-xl shadow-sm p-6"
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
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("taskId", task.id);
                    }}
                    onClick={() => onTaskClick(task.id)} // Call onTaskClick when the task is clicked
                    className={`p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 ${
                      task.highIntent ? "border-l-[5px] border-red-500" : ""
                    }`}
                  >
                    <div className="font-medium text-gray-900">{task.name}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      Bid Amount: ${task.valuation?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      Deadline: {new Date(task.deadline).toLocaleDateString()}
                    </div>
                    {task.hold === "negotiating" && (
                      <div
                        className="text-sm text-orange-600 hover:text-orange-700 mt-2 inline-block cursor-pointer"
                        onClick={() => onTaskClick(task.id)} // Call onTaskClick when "View Comments" is clicked
                      >
                        View Comments
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