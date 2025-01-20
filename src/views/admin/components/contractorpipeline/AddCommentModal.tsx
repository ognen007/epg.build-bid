import React, { useState } from "react";
import { X } from "lucide-react";

interface AddCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
  comments: any[]; // Pass comments as a prop
}

export function AddCommentModal({
  isOpen,
  onClose,
  onSubmit,
  comments,
}: AddCommentModalProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(comment); // Call the onSubmit function from props
    setComment(""); // Clear the comment input
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Comments</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Display Existing Comments */}
            <div className="space-y-3">
              {comments.map((comment) => (
                <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{comment.content}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(comment.createdAt).toLocaleString()} by {comment.author}
                  </p>
                </div>
              ))}
            </div>

            {/* Add New Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Comment
              </label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Enter your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600"
              >
                Add Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}