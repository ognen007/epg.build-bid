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

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PreConstructionSection tasks={tasks} />
      <ConstructionSection tasks={tasks} />
    </div>
  );
}