import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectProposals } from "../../components/contractor/projects/ProjectProposals";
import { ProjectWorkflowView } from "../../components/contractor/projectworkflow/ProjectWorkflowView";
import { ProjectSearch } from "./ProjectSearch";
import { ProjectType } from "../../types/project";
import { Skeleton } from "@radix-ui/themes";
import { fetchContractorDataByEmail, fetchContractorIdByEmail, fetchProjectsByContractor, updateProjectStatus } from "../../services/contractor/projects/projectsEndpoint";

export interface ContractorType {
  id: string;
  fullName: string;
  email: string;
}

export function ContractorProjects({ loading }: { loading: boolean }) {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [contractor, setContractor] = useState<ContractorType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadContractorData() {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setError("User not found");
          return;
        }
        const user = JSON.parse(storedUser);
        const { email } = user;

        const contractorData = await fetchContractorDataByEmail(email); // Call the new function

        if (!contractorData) {
          setError("Logged-in contractor not found");
          return;
        }

        setContractor(contractorData); // Set the contractor data
      } catch (err: any) {
        setError(err.message || "Failed to fetch contractor data");
      }
    }

    loadContractorData();
  }, []);



  useEffect(() => {
    async function loadProjects() {
      if (!contractor?.fullName) return;

      try {
        const fetchedProjects = await fetchProjectsByContractor(contractor.fullName);
        setProjects(fetchedProjects);
      } catch (err: any) {
        setError(err.message || "Failed to fetch projects"); // More specific error message
      }
    }

    loadProjects();
  }, [contractor]);


  const handleAcceptProposal = async (taskId: string) => {
    try {
      const updatedProject = await updateProjectStatus(taskId);
      setProjects((prev) =>
        prev.map((p) => (p.id === taskId ? { ...p, hold: updatedProject.hold, status: updatedProject.status } : p))
      );
    } catch (error: any) {
      setError(error.message || "Failed to update task"); // More specific error message
    }
  };

  const handleDeclineProposal = () => console.log("Proposal declined");
  const handleSearchChange = (query: string) => setSearchQuery(query);

  if (error) return <div className="text-red-600 p-6">Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {loading? (
        <>
          <Skeleton className="w-full h-10 bg-gray-300 rounded-md" />
        </>
      ): (
        <>
      <ProjectSearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <ProjectProposals proposals={projects} onAccept={handleAcceptProposal} onDecline={handleDeclineProposal} />
      <ProjectWorkflowView setTasks={setProjects} tasks={projects}  contractorId={contractor?.id || ""} />
        </>
      )}
    </div>
  );
}
