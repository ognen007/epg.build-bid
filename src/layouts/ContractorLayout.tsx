import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ContractorSidebar } from "../components/navigation/ContractorSidebar";
import { Header } from "../components/Header";
import { WelcomePopup } from "../components/welcome/WelcomePopup";

// Import contractor views
import { ContractorDashboard } from "../views/contractor/ContractorDashboard";
import { ContractorProjects } from "../views/contractor/ContractorProjects";
import { ContractorEarnings } from "../views/contractor/ContractorEarnings";
import { ContractorSettings } from "../views/contractor/ContractorSettings";
import { ContractorTasks } from "../views/contractor/ContractorTasks";
import { fetchContractorId } from "../services/contractor/contractorData/contractorIdEndpoint";
import { fetchContractorNameByEmail } from "../services/contractor/contractorData/contractorFetchEmail";
import axios from "axios";

export function ContractorLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fullName, setFullName] = useState("");
  const [contractorId, setContractorId] = useState("");
  const [loading, setLoading] = useState(true);

  // Request notification permission
  function requestNotificationPermission() {
    if (Notification.permission === "granted") {
      console.log("Permission already granted");
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted");
      } else {
        console.error("Notification permission denied");
      }
    });
  }

  useEffect(() => {
    requestNotificationPermission();
  }, []);

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
    async function loadFullName() {
      try {
        setLoading(true);
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return setFullName("Contractor User");

        const { email } = JSON.parse(storedUser);
        const name = await fetchContractorNameByEmail(email);
        setFullName(name);
      } catch (error) {
        console.error("Error loading full name:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFullName();
  }, []);

  const loadContractorId = useCallback(async () => {
    try {
      const id = await fetchContractorId();
      if (!id) throw new Error("Failed to fetch contractor ID");
      setContractorId(id);
    } catch (err) {
      console.error("Error fetching contractor ID:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContractorId();
  }, [loadContractorId]);

  // Helper function to convert VAPID key
  function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // Subscribe user to push notifications
  async function subscribeUserToPushNotifications(userId: string) {
    if (!userId) {
      console.warn("Cannot subscribe to push notifications: userId is missing");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BMdPsUFVF8sdr-hRgdcM_8uGmbyPvWoeMgk3A0Kya_yCwpLalU8pcKLAO7dJ34dqF2oYnmFc7wtuMbCmUh0eZWg"
        ),
      });

      console.log("Push subscription created:", subscription);

      // Validate the subscription object
      const { endpoint, keys } = subscription.toJSON();
      if (!endpoint || !keys?.p256dh || !keys?.auth) {
        throw new Error("Invalid push subscription data");
      }

      // Send the subscription object to the backend
      const response = await fetch(`https://epg-backend.onrender.com/api/notify/push-subscriptions/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          endpoint,
          keys: {
            p256dh: keys.p256dh,
            auth: keys.auth,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      console.log("Push subscription stored/updated successfully");
    } catch (error) {
      console.error("Error subscribing user to push notifications:", error);
    }
  }

  // Refresh subscription every hour
  useEffect(() => {
    if (!contractorId) {
      console.warn("Cannot refresh subscription: contractorId is missing");
      return;
    }

    requestNotificationPermission();
    subscribeUserToPushNotifications(contractorId);

    const interval = setInterval(() => {
      subscribeUserToPushNotifications(contractorId);
    }, 60 * 60 * 1000); // Every hour

    return () => clearInterval(interval);
  }, [contractorId]);

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
        userId={contractorId}
          userFullName={fullName}
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