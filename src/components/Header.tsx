import React, { useState, useEffect } from "react";
import { Bell, Menu, ListTodo } from "lucide-react";
import { NotificationPopover } from "./NotificationPopover";
import { fetchUserNotifications, markNotificationAsRead, sendNotificationToUser } from "../services/notificationEndpoints";
import NotificationAudio from "../../src/asset/down.mp3";

interface HeaderProps {
  onMenuClick: () => void;
  onTasksClick: () => void;
  showTasksButton: boolean;
  userFullName: string;
  userId: string;
}

interface Notification {
  id: string;
  messageTitle: string;
  message: string;
  from: string;
  timestamp: string;
  read: boolean;
}

export function Header({ onMenuClick, onTasksClick, showTasksButton, userId }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [prevNotifications, setPrevNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    const loadNotifications = async () => {
      try {
        const userNotifications = await fetchUserNotifications(userId);

        const formattedNotifications = userNotifications.map((n: any) => ({
          id: n.id,
          messageTitle: n.title || "No Title",
          message: n.message || "",
          from: n.from || "Unknown",
          timestamp: n.timestamp || "Just now",
          read: n.read ?? false,
        }));

        // Check if there's a new notification
        if (prevNotifications.length > 0 && formattedNotifications.length > prevNotifications.length) {
          // Instead of playing a sound, call your backend to send a push notification via Firebase.
          // Ensure you have implemented this endpoint to send FCM messages.
          sendNotificationToUser(userId, "New Notification", "You have a new notification")
            .then((result:any) => console.log("Firebase notification triggered", result))
            .catch((err) => console.error("Failed to trigger Firebase notification", err));
        }

        setPrevNotifications(formattedNotifications);
        setNotifications(formattedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Poll every 10 seconds for new notifications (adjust as needed)
    const interval = setInterval(loadNotifications, 10000);
    loadNotifications();

    return () => clearInterval(interval);
  }, [userId, prevNotifications]);

  const hasUnreadNotifications = notifications.some((n) => !n.read);

  const handleNotificationClick = async (id: string) => {
    try {
      // Update in backend
      await markNotificationAsRead(id);
  
      // Update state to reflect the change
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };
  

  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-3 sm:px-4 md:px-6">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 mr-2 text-gray-500 hover:text-gray-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative">
          <button
            className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {hasUnreadNotifications && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            )}
          </button>

          {showNotifications && (
            <NotificationPopover
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          )}
        </div>

        {showTasksButton && (
          <button
            onClick={onTasksClick}
            className="p-2 text-gray-500 hover:text-gray-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
            aria-label="Tasks"
          >
            <ListTodo className="h-5 w-5" />
          </button>
        )}
      </div>
    </header>
  );
}
