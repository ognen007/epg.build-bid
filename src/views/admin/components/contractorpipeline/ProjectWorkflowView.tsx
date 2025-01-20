import React, { useEffect, useState } from "react";
import axios from "axios";
import { PreConstructionSection } from "./PreConstructionSection";
import { ConstructionSection } from "./ConstructionSection";
import { AddCommentModal } from "./AddCommentModal";
import { ProjectDetailsModal } from "./ProjectDetailsModal"; // Import the new modal

export interface ProjectWorkflowProps {
  contractorId: string; // Add contractorId as a prop
}

export function ProjectWorkflowView({ contractorId }: ProjectWorkflowProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false); // New state for ProjectDetailsModal
  const [comments, setComments] = useState<any[]>([]);

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `https://epg-backend.onrender.com/api/projects/hold/`
        );
        console.log("Fetched Tasks:", response.data); // Debugging
        setTasks(response.data || []);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, [contractorId]);

  // Fetch comments for the selected project
  useEffect(() => {
    if (!selectedTaskId) return;

    console.log("Fetching comments for Task ID:", selectedTaskId); // Debugging

    const fetchComments = async () => {
      try {
        const response = await axios.get(
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
    setIsProjectDetailsModalOpen(true); // Open the ProjectDetailsModal
  };

  // Handle adding a comment
  const handleAddComment = async (comment: string) => {
    if (!selectedTaskId) return;

    console.log("Adding comment for Task ID:", selectedTaskId); // Debugging

    try {
      // Send the comment to the backend
      const response = await axios.post(
        `https://epg-backend.onrender.com/api/projects/comment/pipeline/${selectedTaskId}/comments`,
        { content: comment, author: "User" } // Replace "User" with the actual author
      );

      console.log("Comment added successfully:", response.data);

      // Refresh comments after adding a new one
      const updatedComments = await axios.get(
        `https://epg-backend.onrender.com/api/projects/comment/pipeline/${selectedTaskId}/comments`
      );
      setComments(updatedComments.data || []);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Update task status
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
      <PreConstructionSection
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        onTaskClick={handleTaskClick}
      />
      <ConstructionSection
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        onTaskClick={handleTaskClick}
      />

      {/* Add Comment Modal */}
      <AddCommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSubmit={handleAddComment}
        comments={comments} // Pass comments as a prop
      />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={isProjectDetailsModalOpen}
        onClose={() => setIsProjectDetailsModalOpen(false)}
        taskId={selectedTaskId} // Pass the selected task ID
      />
    </div>
  );
}