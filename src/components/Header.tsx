import { useState, useEffect } from "react";
import { Bell, Menu, ListTodo } from "lucide-react";
import { NotificationPopover } from "./NotificationPopover";
import axios from "axios";
import { markNotificationAsRead } from "../services/notificationEndpoints";

interface HeaderProps {
  onMenuClick: () => void;
  onTasksClick: () => void;
  showTasksButton: boolean;
  userFullName: string;
  userId: any;
}

interface Notification {
  id: string;
  messageTitle: string;
  message: string;
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
        // Fetch notifications for the user
        const response = await axios.get(`https://epg-backend.onrender.com/api/notify/notifications/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        const userNotifications = response.data;
    
        // Format the notifications
        const formattedNotifications = userNotifications.map((n: any) => ({
          id: n.id,
          messageTitle: n.messageTitle || "No Title",
          message: n.message || "No content",
          createdAt: n.createdAt || new Date().toLocaleString(),
          read: n.read ?? false,
        }));
    
        // 🔥 Check if there's a NEW notification
        if (
          prevNotifications.length > 0 &&
          formattedNotifications.length > prevNotifications.length
        ) {
          const latestNotification = formattedNotifications[0]; // Get the latest one
    
          if (latestNotification) {
            Notification.requestPermission().then((perm) => {
              if (perm === "granted") {
                new Notification(latestNotification.messageTitle, {
                  body: latestNotification.message,
                  icon: "/path-to-your-icon.png", // Optional: Add an icon
                });
              }
            });
    
            const audio = new Audio("/path-to-notification-sound.mp3"); // Path to sound file
            audio.play().catch((err) => console.error("Sound play error:", err));
          }
        }
    
        // Update state with the new notifications
        setPrevNotifications(formattedNotifications);
        setNotifications(formattedNotifications);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error fetching notifications:",
            error.response?.data || error.message
          );
        } else {
          console.error("Error fetching notifications:", error);
        }
      }
    };
    loadNotifications();
  }, [userId, prevNotifications]);  

  const hasUnreadNotifications = notifications.some((n) => !n.read);

  const handleNotificationClick = async (id: string) => {
    try {
      // Mark the notification as read on the backend
      await markNotificationAsRead(id);
  
      // Update the local state to reflect the change
      setNotifications((prevNotifications) =>
        prevNotifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
  
      console.log(`Notification ${id} marked as read`);
    } catch (error) {
      console.error("Failed to handle notification click:", error);
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
