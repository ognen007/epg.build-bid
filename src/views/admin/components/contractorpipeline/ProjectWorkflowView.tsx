import React, { useEffect, useState } from "react";
import axios from "axios";
import { PreConstructionSection } from "./PreConstructionSection";
import { ConstructionSection } from "./ConstructionSection";

export interface ProjectWorkflowProps {
  contractorId: string; // Add contractorId as a prop
}

export function ProjectWorkflowView({ contractorId }: ProjectWorkflowProps) {
  const [tasks, setTasks] = useState<any[]>([]);

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://epg-backend.onrender.com/api/projects/hold/`
        );
        setTasks(response.data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [contractorId]);

  const updateTaskStatus = async (taskId: any, newHold: any) => {
    try {
      // Map the `hold` value to the corresponding `status`
      let newStatus;
      switch (newHold) {
        case "takeoff_in_progress":
          newStatus = "takeoff_in_progress";
          break;
        case "ready_for_proposal":
          newStatus = "takeoff_complete";
          break;
        case "negotiating":
          newStatus = "bid_recieved";
          break;
        default:
          newStatus = "awaiting_takeoff"; // Default status
      }
  
      // Log the payload for debugging
      console.log("Sending payload:", {
        hold: newHold,
        status: newStatus,
      });
  
      // Send the updated status to the backend
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/projects/pipeline/${taskId}`,
        {
          hold: newHold, // Send the new `hold` value
          status: newStatus, // Send the new `status` value
        }
      );
  
      // Update the tasks in the state
      setTasks((prevTasks: any) =>
        prevTasks.map((task: any) => (task.id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PreConstructionSection tasks={tasks} updateTaskStatus={updateTaskStatus} />
      <ConstructionSection tasks={tasks} updateTaskStatus={updateTaskStatus} />
    </div>
  );
}