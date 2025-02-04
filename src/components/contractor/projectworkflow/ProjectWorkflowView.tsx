import React, { useEffect, useState } from "react";
import axios from "axios";
import { PreConstructionSection } from "./PreConstructionSection";
import { ConstructionSection } from "./ConstructionSection";
import { AddCommentModal } from "../../../views/admin/components/contractorpipeline/AddCommentModal";

export interface ProjectWorkflowProps {
  contractorId: string; // Add contractorId as a prop
}

interface Task {
  id: string;
  // Add other task properties here
}

interface Comment {
  id: string;
  content: string;
  author: string;
  // Add other comment properties here
}

export interface ContractorType {
  id: string;
  fullName: string;
  email: string;
}

export function ProjectWorkflowView({ contractorId }: ProjectWorkflowProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [contractor, setContractor] = useState<ContractorType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!contractor?.fullName) return;
  
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://epg-backend.onrender.com/api/project/contractor/${encodeURIComponent(contractor.fullName)}`
        );
  
        console.log("Fetched projects response:", response.data); // Log response
  
        if (Array.isArray(response.data.projects)) {
          setTasks(response.data.projects);
        } else {
          setTasks([]); // No error, just set empty tasks
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          console.warn("No projects found, continuing without error."); // Log as a warning, not an error
          setTasks([]); // Gracefully handle no projects
        } else {
          console.error("Error fetching projects:", err);
          setError("Failed to fetch projects");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, [contractor]);
  

  useEffect(() => {
    if (!contractor?.fullName) return;
  
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://epg-backend.onrender.com/api/project/contractor/${encodeURIComponent(contractor.fullName)}`
        );
  
        console.log("Fetched projects response:", response.data); // Log response
  
        if (Array.isArray(response.data.projects)) {
          setTasks(response.data.projects);
        } else {
          setTasks([]); // No error, just set empty tasks
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setTasks([]); // Ensure tasks are empty instead of throwing an error
      } finally {
        setLoading(false);
      }
    };
  
    fetchProjects();
  }, [contractor]);

  // Fetch comments for the selected project
  useEffect(() => {
    if (!selectedTaskId) return;

    console.log("Fetching comments for Task ID:", selectedTaskId); // Debugging

    const fetchComments = async () => {
      try {
        const response = await axios.get<Comment[]>(
          `https://epg-backend.onrender.com/api/projects/comment/pipeline/${selectedTaskId}/comments`
        );
        console.log("Fetched Comments:", response.data); // Debugging
        setComments(response.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [selectedTaskId, isCommentModalOpen]); // Fetch comments when the modal opens or projectId changes

  // Handle task click
  const handleTaskClick = (taskId: string) => {
    console.log("Selected Task ID:", taskId); // Debugging
    setSelectedTaskId(taskId); // Set the selected task ID
    setIsCommentModalOpen(true); // Open the modal
  };

  // Handle adding a comment
  const handleAddComment = async (comment: string) => {
    if (!selectedTaskId) return;

    console.log("Adding comment for Task ID:", selectedTaskId); // Debugging

    try {
      // Send the comment to the backend
      const response = await axios.post<Comment>(
        `https://epg-backend.onrender.com/api/projects/comment/pipeline/${selectedTaskId}/comments`,
        { content: comment, author: "User" } // Replace "User" with the actual author
      );

      console.log("Comment added successfully:", response.data);

      // Refresh comments after adding a new one
      const updatedComments = await axios.get<Comment[]>(
        `https://epg-backend.onrender.com/api/projects/comment/pipeline/${selectedTaskId}/comments`
      );
      setComments(updatedComments.data || []);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PreConstructionSection
        tasks={tasks}
        onTaskClick={handleTaskClick}
      />
      <ConstructionSection tasks={tasks} onTaskClick={handleTaskClick} />

      {/* Add Comment Modal */}
      <AddCommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSubmit={handleAddComment}
        comments={comments} // Pass comments as a prop
      />
    </div>
  );
}