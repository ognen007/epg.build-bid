import React, { useEffect, useState } from "react";
import axios from "axios";
import { PreConstructionSection } from "./PreConstructionSection";
import { ConstructionSection } from "./ConstructionSection";

export function ProjectWorkflowView() {
  const [tasks, setTasks] = useState([]);
  const contractorId = "123"; // Replace with the actual contractor ID

  // Fetch tasks for the contractor
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`https://epg-backend.onrender.com/api/projects/pipeline${contractorId}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [contractorId]);

  // Update task status when dragged and dropped
  const updateTaskStatus = async (taskId:any, newStatus:any) => {
    try {
      const response = await axios.put(`https://epg-backend.onrender.com/api/projects/pipeline/api/projects/pipeline/${contractorId}/${taskId}`, {
        status: newStatus,
      });
      setTasks((prevTasks:any) =>
        prevTasks.map((task:any) => (task.id === taskId ? response.data : task))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PreConstructionSection
        tasks={tasks.filter((task:any) => task.type === "pre-construction")}
        updateTaskStatus={updateTaskStatus}
      />
      <ConstructionSection
        tasks={tasks.filter((task:any) => task.type === "construction")}
        updateTaskStatus={updateTaskStatus}
      />
    </div>
  );
}