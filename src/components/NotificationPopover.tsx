interface Notification {
  id: string;
  messageTitle: string;
  message: string;
  from: string;
  timestamp: string;
  read: boolean;
}

interface NotificationPopoverProps {
  notifications: any;
  onNotificationClick: (id: string) => void;
}

export function NotificationPopover({ notifications, onNotificationClick }: NotificationPopoverProps) {
  return (
    <div
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-[9999]"
      // The z-[9999] ensures the popover is above all other elements
    >
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
        <div
          className="mt-2 divide-y divide-gray-200 max-h-[40vh] overflow-y-auto"
          // Fixed height with scrollable behavior
        >
          {notifications.length === 0 ? (
            <p className="py-4 text-sm text-gray-500 text-center">No notifications</p>
          ) : (
            notifications.map((notification:any) => (
              <div
                key={notification.id}
                onClick={() => onNotificationClick(notification.id)}
                className={`
                  py-4 cursor-pointer transition-colors
                  ${notification.read ? 'bg-white' : 'bg-orange-50'}
                `}
              >
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900">{notification.messageTitle}</p>
                  <span className="text-xs text-gray-500">{notification.timestamp}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{notification.message}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}