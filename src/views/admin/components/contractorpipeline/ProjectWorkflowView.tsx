import { useEffect, useState } from "react";
import { PreConstructionSection } from "./PreConstructionSection";
import { ConstructionSection } from "./ConstructionSection";
import { AddCommentModal } from "./AddCommentModal";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { addCommentToTask, fetchCommentsForTask, fetchContractorTasks, updateTaskStatusFunction } from "../../../../services/admin/projects/projectWorkflowEndpoint";

export interface ProjectWorkflowProps {
  contractorId: string;
}

export function ProjectWorkflowView({ contractorId }: ProjectWorkflowProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isProjectDetailsModalOpen, setIsProjectDetailsModalOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);

  async function sendNotificationToUser(userId: string, messageTitle: string, message: string) {
    try {
      const response = await fetch(`https://epg-backend.onrender.com/api/notify/notifications/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageTitle, message }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send notification");
      }
  
      console.log("Notification sent successfully");
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  useEffect(() => {
    async function loadTasks() {
      try {
        const fetchedTasks = await fetchContractorTasks(contractorId);
        setTasks(fetchedTasks);
      } catch (error: any) {
        console.error("Error loading tasks", error);
      }
    }
    loadTasks();
  }, [contractorId]);


  useEffect(() => {
    async function loadComments() {
      if (!selectedTaskId) return;

      try {
        const fetchedComments = await fetchCommentsForTask(selectedTaskId);
        setComments(fetchedComments);
      } catch (error: any) {
        console.error("Error loading comments", error);
        // Handle error
      }
    }
    loadComments();
  }, [selectedTaskId, isCommentModalOpen]);

  const openCommentModal = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsCommentModalOpen(true);
  };


  // Handle task click
  const handleTaskClick = (taskId: string) => {
    console.log("Selected Task ID:", taskId);
    setSelectedTaskId(taskId);
    setIsProjectDetailsModalOpen(true);
  };

  const handleAddComment = async (comment: string) => {
    if (!selectedTaskId) return;

    try {
      const addedComment = await addCommentToTask(selectedTaskId, comment, "User");
      setComments([...comments, addedComment]);
    } catch (error: any) {
      console.error("Error adding comment", error);
      // Handle error
    }
  };

  const updateTaskStatus = async (taskId: any, newHold: any, newStatus?: string) => {
    try {
      const updatedTask = await updateTaskStatusFunction(taskId, newHold, newStatus);//
      setTasks((prevTasks: any) =>
        prevTasks.map((task: any) => (task.id === taskId ? updatedTask : task))
      );
      const formattedHold = newHold.replace(/_/g, " ");
      await sendNotificationToUser(contractorId, "Project Status", `Hey, your project is in ${formattedHold}`);
    } catch (error: any) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <PreConstructionSection
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        onTaskClick={handleTaskClick}
        onCommentClick={openCommentModal}
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
        comments={comments}
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