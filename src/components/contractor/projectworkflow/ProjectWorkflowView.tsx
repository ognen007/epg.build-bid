import React, { useEffect, useState } from "react";
import axios from "axios";
import { PreConstructionSection } from "./PreConstructionSection";
import { ConstructionSection } from "./ConstructionSection";
import { AddCommentModal } from "../../../views/admin/components/contractorpipeline/AddCommentModal";
import { addComment, fetchComments, fetchProjects, fetchProjectsById } from "../../../services/contractor/workflow/projectWorkflowServiceEndpoint";
import { sendNotificationToUser } from "../../../services/notificationEndpoints";
import { Skeleton } from "@radix-ui/themes";

export interface ProjectWorkflowProps {
  contractorId: string; // Add contractorId as a prop
  tasks: any;
  setTasks: any;
}

export interface Task {
  id: string;
  // Add other task properties here
}

export interface Comment {
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

export function ProjectWorkflowView({ contractorId, setTasks, tasks }: ProjectWorkflowProps) {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [contractor, setContractor] = useState<ContractorType | null>(null);
  const [contractorName, setContractorName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch projects based on contractor's full name
  useEffect(() => {
    if (!contractor?.fullName) return;
    
    async function loadProjects() {
      if (!contractor?.fullName) return;

      try {
        setLoading(true);
        const fetchedProjects = await fetchProjects(contractor.fullName);
        setContractorName(contractor.fullName);
        setTasks(fetchedProjects);
      } catch (err: any) {
        if (err.message !== "No projects found, continuing without error.") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [contractor]);

  // Fetch projects by contractor ID
  useEffect(() => {
    async function loadProjectsById() {
      if (!contractorId) return;

      try {
        setLoading(true);
        const fetchedProjects = await fetchProjectsById(contractorId);
        setTasks(fetchedProjects);
        console.log("FETCHED FAS", fetchedProjects);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    }

    loadProjectsById();
  }, [contractorId]);

  // Fetch comments for the selected task
  useEffect(() => {
    async function loadComments() {
      if (!selectedTaskId) return;

      try {
        const fetchedComments = await fetchComments(selectedTaskId);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }

    loadComments();
  }, [selectedTaskId, isCommentModalOpen]);

  // Handle task click to open the comment modal
  const handleTaskClick = (taskId: string) => {
    console.log("Selected Task ID:", taskId);
    setSelectedTaskId(taskId);
    setIsCommentModalOpen(true);
  };

  // Handle adding a new comment
  const handleAddComment = async (comment: string) => {
    if (!selectedTaskId) return;

    try {
      await addComment(selectedTaskId, comment);
      sendNotificationToUser("67e80bc2688450393477aaee", "Contractor Project", `${contractorName} left a comment on his project`);
      const updatedComments = await fetchComments(selectedTaskId);
      setComments(updatedComments);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Show loading state if contractorId is not available
  if (!contractorId) {
    return (
      <Skeleton className="w-full h-10 bg-gray-300 rounded-md" />
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {loading && (
        <Skeleton className="w-full h-10 bg-gray-300 rounded-md" />
      )}

      {/* Render sections only if data is loaded */}
      {!loading && (
        <>
          <PreConstructionSection
            tasks={tasks}
            onTaskClick={handleTaskClick}
            fullName={contractorName}
          />
          <ConstructionSection tasks={tasks} onTaskClick={handleTaskClick} />
        </>
      )}

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