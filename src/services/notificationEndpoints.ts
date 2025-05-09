import axios from "axios";

export const markNotificationAsRead = async (id: string) => {
  try {
    const response = await axios.put(`https://epg-backend.onrender.com/api/notify/notifications/${id}`, {}, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Notification marked as read:", response.data);
    return response.data; // Return the updated notification if needed
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Failed to mark notification as read:",
        error.response?.data || error.message
      );
    } else {
      console.error("Failed to mark notification as read:", error);
    }
    throw error; // Re-throw the error for handling in the calling function
  }
};


export const fetchGeneralNotifications = async () => {
    try {
      const response = await fetch('https://epg-backend.onrender.com/api/notify/notifications');
      if (!response.ok) throw new Error('Failed to fetch general notifications');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };
  
  export const fetchUserNotifications = async (userId: string) => {
    try {
      const response = await fetch(`https://epg-backend.onrender.com/api/notify/notifications/${userId}`);
      if (!response.ok) throw new Error('Failed to fetch user notifications');
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

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
  
  export async function sendNotificationToUser(contractorId:string, messageTitle: string, message: string) {
    if (!contractorId) {
      console.warn("Cannot send notification: contractorId is missing");
      return;
    }
  
    try {
      const response = await axios.post(
        `https://epg-backend.onrender.com/api/notify/notifications/${contractorId}`,
        {
          messageTitle,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Notification sent successfully:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error sending notification:", error.response?.data || error.message);
      } else {
        console.error("Error sending notification:", error);
      }
    }
  }

  
  export const sendNotificationToContractors = async (
    messageTitle: string,
    message: string
  ) => {
    try {
      const response = await fetch('https://epg-backend.onrender.com/api/notify/notifications/contractors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageTitle, message }),
      });
      if (!response.ok) throw new Error('Failed to send notifications to contractors');
      return await response.json();
    } catch (error) {
      console.error(error);
      return { error: 'Failed to send notifications to contractors' };
    }
  };

  
  export const sendNotificationToAdmins = async (
    messageTitle: string,
    message: string
  ) => {
    try {
      const response = await fetch('https://epg-backend.onrender.com/api/notify/notifications/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageTitle, message }),
      });
      if (!response.ok) throw new Error('Failed to send notifications to admins');
      return await response.json();
    } catch (error) {
      console.error(error);
      return { error: 'Failed to send notifications to admins' };
    }
  };
  