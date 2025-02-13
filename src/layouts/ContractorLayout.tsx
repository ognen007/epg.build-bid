import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ContractorSidebar } from "../components/navigation/ContractorSidebar";
import { Header } from "../components/Header";
import { WelcomePopup } from "../components/welcome/WelcomePopup";
import axios from "axios";

// Import contractor views
import { ContractorDashboard } from "../views/contractor/ContractorDashboard";
import { ContractorProjects } from "../views/contractor/ContractorProjects";
import { FindWorkView } from "../views/contractor/FindWorkView";
import { ContractorEarnings } from "../views/contractor/ContractorEarnings";
import { ContractorSettings } from "../views/contractor/ContractorSettings";
import { ContractorTasks } from "../views/contractor/ContractorTasks";

export function ContractorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fullName, setFullName] = useState("");
  const [contractorId, setContractorId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        window.location.reload();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const fetchFullNameByEmail = async () => {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return setFullName("Contractor User");

        const { email } = JSON.parse(storedUser);
        const response = await fetch(
          `https://epg-backend.onrender.com/api/contractor/name-by-email?email=${email}`
        );

        if (response.ok) {
          const data = await response.json();
          setFullName(data.fullName || "Admin User");
        } else {
          console.error("Error fetching full name:", response.statusText);
          setFullName("Admin User");
        }
      } catch (error) {
        console.error("Error fetching full name:", error);
        setFullName("Admin User");
      } finally {
        setLoading(false);
      }
    };

    fetchFullNameByEmail();
  }, []);

  const fetchContractorId = useCallback(async () => {
    try {
      setLoading(true);
      const storedUser = localStorage.getItem("user");
      if (!storedUser) throw new Error("User not found");

      const { email } = JSON.parse(storedUser);
      const { data: contractors } = await axios.get(
        "https://epg-backend.onrender.com/api/contractor/id"
      );

      const loggedInContractor = contractors.find(
        (contractor: any) => contractor.email === email
      );

      if (!loggedInContractor) throw new Error("Contractor not found");

      setContractorId(loggedInContractor.id);
    } catch (err) {
      console.error("Error fetching contractor ID:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContractorId();
  }, [fetchContractorId]);

  return (
    <div className="flex h-screen bg-gray-50">
      {showWelcome && (
        <WelcomePopup fullName={fullName} onComplete={() => setShowWelcome(false)} />
      )}

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div
        className={`
          fixed inset-y-0 left-0 z-30 w-64 lg:w-auto lg:static lg:flex
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <ContractorSidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          userFullName={fullName}
          userId={contractorId}
          onMenuClick={() => setIsSidebarOpen(true)}
          onTasksClick={() => {}}
          showTasksButton={false}
        />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<ContractorDashboard loading={loading} />} />
            <Route path="/projects" element={<ContractorProjects loading={loading} />} />
            {/* <Route path="/find-work" element={<FindWorkView loading={loading} />} /> */}
            <Route path="/earnings" element={<ContractorEarnings loading={loading} />} />
            <Route path="/tasks" element={<ContractorTasks loading={loading} />} />
            <Route path="/settings" element={<ContractorSettings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
