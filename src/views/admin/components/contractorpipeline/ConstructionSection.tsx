import { Calendar, Hammer, CheckSquare, Bolt } from "lucide-react";

export function ConstructionSection({ tasks, updateTaskStatus }:any) {
  const statuses = ["scheduled", "ongoing", "completed"];

  const getStatusIcon = (status:any) => {
    switch (status) {
      case "scheduled":
        return Calendar;
      case "ongoing":
        return Hammer;
      case "completed":
        return CheckSquare;
      default:
        return null;
    }
  };

  const getStatusText = (status:any) => {
    switch (status) {
      case "scheduled":
        return "Scheduled Projects";
      case "ongoing":
        return "Ongoing Projects";
      case "completed":
        return "Completed Projects";
      default:
        return "";
    }
  };

  const handleDrop = (e:any, status:any) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    updateTaskStatus(taskId, status);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Construction</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {statuses.map((status) => {
          const StatusIcon = getStatusIcon(status);
          const tasksInGroup = tasks.filter((task:any) => task.status === status);

          return (
            <div
              key={status}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, status)}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Bolt className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-gray-900">{getStatusText(status)}</h3>
                </div>
                <span className="text-sm text-gray-500">{tasksInGroup.length}</span>
              </div>

              <div className="space-y-3">
                {tasksInGroup.map((task :any) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("taskId", task.id);
                    }}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="font-medium text-gray-900">{task.name}</div>
                    <div className="text-sm text-gray-500 mt-1">{task.contractor}</div>
                    {task.startDate && (
                      <div className="text-sm text-gray-500 mt-1">
                        {status === "scheduled" ? "Starts" : "Started"}:{" "}
                        {new Date(task.startDate).toLocaleDateString()}
                      </div>
                    )}
                    {task.completionDate && (
                      <div className="text-sm text-gray-500">
                        Completed: {new Date(task.completionDate).toLocaleDateString()}
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