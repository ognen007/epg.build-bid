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

  // Update task status when dragged and dropped
  const updateTaskStatus = async (taskId: any, newHold: any) => {
    try {
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/projects/pipeline/${taskId}`,
        {
          hold: newHold, // Send the new `hold` value
        }
      );
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