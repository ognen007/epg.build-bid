import { useState, useEffect } from "react";
import axios from "axios";
import { ProjectProposals } from "../../components/contractor/projects/ProjectProposals";
import { ProjectWorkflowView } from "../../components/contractor/projectworkflow/ProjectWorkflowView";
import { ProjectSearch } from "./ProjectSearch";
import { ProjectType } from "../../types/project";
import { Skeleton } from "@radix-ui/themes";

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
    const fetchContractorData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setError("User not found");
          return;
        }
        const user = JSON.parse(storedUser);
        const { email } = user;

        const response = await axios.get("https://epg-backend.onrender.com/api/contractor/id");
        const loggedInContractor = response.data.find((c: ContractorType) => c.email === email);

        if (!loggedInContractor) {
          throw new Error("Logged-in contractor not found");
        }
        setContractor(loggedInContractor);
      } catch (err) {
        setError("Failed to fetch contractor data");
      }
    };
    fetchContractorData();
  }, []);

  useEffect(() => {
    if (!contractor?.fullName) return;

    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `https://epg-backend.onrender.com/api/project/contractor/${encodeURIComponent(contractor.fullName)}`
        );

        console.log("Fetched projects response:", response.data);

        if (response.status === 200) {
          setProjects(response.data.projects);
          console.log("FETCHED FAS",response.data.projects)
        } else {
          setProjects([]); // No error, just set empty tasks
        }
      } catch (err: any) {
        if (err.response?.status === 404) {
          console.warn("No projects found, setting an empty list.");
          setProjects([]); // Gracefully handle 404 without errors
        } else {
          console.error("Error fetching projects:", err);
          setError("Failed to fetch projects");
        }
      }
    };

    fetchProjects();
  }, [contractor]);

  const handleAcceptProposal = async (taskId: string) => {
    try {
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/projects/hold/${taskId}`,
        { status: "takeoff_in_progress", hold: "takeoff_in_progress" }
      );
      setProjects((prev) =>
        prev.map((p) => (p.id === taskId ? { ...p, hold: response.data.hold, status: response.data.status } : p))
      );
    } catch (error) {
      setError("Failed to update task");
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
