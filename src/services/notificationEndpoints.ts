export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const response = await fetch(`https://epg-backend.onrender.com/api/notify/notifications/read/${notificationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Failed to mark notification as read');

    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: 'Failed to mark notification as read' };
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
  
  export const sendNotificationToUser = async (
    userId: string,
    messageTitle: string,
    message: string
  ) => {
    try {
      const response = await fetch(`https://epg-backend.onrender.com/api/notify/notifications/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageTitle, message }),
      });
      if (!response.ok) throw new Error('Failed to send notification to user');
      return await response.json();
    } catch (error) {
      console.error(error);
      return { error: 'Failed to send notification to user' };
    }
  };

  
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
  