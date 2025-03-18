import { useState, useEffect } from "react";
import { Bell, Menu, ListTodo } from "lucide-react";
import { NotificationPopover } from "./NotificationPopover";
import { fetchUserNotifications, markNotificationAsRead } from "../services/notificationEndpoints";
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

function requestPushNotificationPermission(userId: string) {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.ready.then((registration) => {
      return registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('epceblb3yJo7p28dlAU0DtDc1_OHftNn4SQjxYaXaNE'),
      });
    }).then((subscription) => {
      console.log('Push subscription:', subscription);

      // Send the subscription object to your backend
      fetch(`https://epg-backend.onrender.com/notifications/${userId}`, {
        method: 'POST',
        body: JSON.stringify({ userId, subscription }),
        headers: { 'Content-Type': 'application/json' },
      });
    }).catch((error) => {
      console.error('Error subscribing to push notifications:', error);
    });
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function Header({ onMenuClick, onTasksClick, showTasksButton, userId }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [prevNotifications, setPrevNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    // Request permission and subscribe to push notifications
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        requestPushNotificationPermission(userId);
      }
    });
  }, [userId]);

  // useEffect(() => {
  //   if (!userId) return;
  
  //   const loadNotifications = async () => {
  //     try {
  //       const userNotifications = await fetchUserNotifications(userId);
  
  //       const formattedNotifications = userNotifications.map((n: any) => ({
  //         id: n.id,
  //         messageTitle: n.title || "No Title",
  //         message: n.message || "No content",
  //         from: n.from || "Unknown",
  //         timestamp: n.timestamp || new Date().toLocaleString(),
  //         read: n.read ?? false,
  //       }));
  
  //       // 🔥 Check if there's a NEW notification
  //       if (prevNotifications.length > 0 && formattedNotifications.length > prevNotifications.length) {
  //         const latestNotification = formattedNotifications[0]; // Get the latest one
  
  //         if (latestNotification) {
  //           Notification.requestPermission().then((perm) => {
  //             if (perm === "granted") {
  //               new Notification(latestNotification.messageTitle, {
  //                 body: latestNotification.message,
  //                 data: { from: latestNotification.from },
  //                 icon: "/path-to-your-icon.png", // Optional: Add an icon
  //               });
  //             }
  //           });
  
  //           const audio = new Audio(NotificationAudio); // Path to sound file
  //           audio.play().catch((err) => console.error("Sound play error:", err));
  //         }
  //       }
  
  //       setPrevNotifications(formattedNotifications);
  //       setNotifications(formattedNotifications);
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     }
  //   };
  
  //   loadNotifications();
  // }, [userId, prevNotifications]);  

  // const hasUnreadNotifications = notifications.some((n) => !n.read);

  // const handleNotificationClick = async (id: string) => {
  //   try {
  //     await markNotificationAsRead(id);
  
  //     setNotifications(
  //       notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
  //     );
  //   } catch (error) {
  //     console.error("Failed to mark notification as read:", error);
  //   }
  // };
  

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
            {/* {hasUnreadNotifications && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
            )} */}
          </button>

          {/* {showNotifications && (
            <NotificationPopover
              notifications={notifications}
              onNotificationClick={handleNotificationClick}
            />
          )} */}
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
