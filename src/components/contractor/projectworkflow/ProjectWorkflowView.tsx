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

export function ProjectWorkflowView({ contractorId }: ProjectWorkflowProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetch all tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>(
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
      <PreConstructionSection tasks={tasks} onTaskClick={handleTaskClick} />
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