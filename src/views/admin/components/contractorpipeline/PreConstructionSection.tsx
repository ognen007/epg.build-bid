import { Bolt, MessageSquare } from "lucide-react";
export function PreConstructionSection({ tasks, updateTaskStatus, onTaskClick, onCommentClick }: any) {
  const statuses = [
    { hold: "proposal_in_progress", label: "Proposal in Progress" },
    { hold: "proposal_uploaded", label: "Proposal Uploaded" },
    { hold: "bid_submitted", label: "Bid Submitted" },
    { hold: "negotiating", label: "Negotiating" },
    { hold: "won", label: "Won" },
    { hold: "lost", label: "Lost" },
  ];

  const handleDrop = (e: any, status: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    updateTaskStatus(taskId, status);
  };

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-xl font-semibold text-gray-900">Pre-Construction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {statuses.map((status) => {
          const tasksInGroup = tasks.filter(
            (task: any) => task.hold === status.hold
          );

          return (
            <div
              key={status.hold}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, status.hold)}
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
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("taskId", task.id);
                    }}
                    onClick={() => onTaskClick(task.id)}
                    className={`p-3 rounded-lg w-full cursor-pointer ${
                      status.hold === "negotiating"
                        ? "bg-orange-50 border-l-4 border-orange-500 hover:bg-orange-100"
                        : "bg-gray-50 hover:bg-gray-100"
                    } ${
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
                 <MessageSquare // Use the MessageSquare icon
                    className="text-sm text-orange-600 hover:text-orange-700 mt-2 inline-block cursor-pointer h-5 w-5"  // Add styling for size and cursor
                    onClick={(e) => {
                      e.stopPropagation(); 
                      onCommentClick(task.id);
                    }}
                    />
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