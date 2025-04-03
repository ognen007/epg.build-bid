import React from "react";

interface RightClickPopupProps {
  position: { x: number; y: number }; // Position of the right-click
  onClose: () => void; // Function to close the popup
  onAction: (action: string, taskId: string) => void; // Function to handle actions
  taskId: string; // Pass the taskId to the component
}

export function RightClickPopup({ position, onClose, onAction, taskId }: RightClickPopupProps) {
  const handleAction = (action: string) => {
    onAction(action, taskId); // Pass both the action and taskId to the parent component
    onClose(); // Close the popup
  };

  return (
    <div
      className="absolute bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-50"
      style={{ top: position.y, left: position.x }}
    >
      <div
        className="p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleAction("abandoned")}
      >
        Edit
      </div>
      <div
        className="p-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => handleAction("loss")}
      >
        Delete
      </div>
    </div>
  );
}