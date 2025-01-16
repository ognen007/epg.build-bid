import React, { useState } from 'react';
import { Comment } from './types';

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">Comments</h3>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-900">{comment.author}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1 text-gray-600">{comment.content}</p>
          </div>
        ))}
      </div>
      <textarea
        placeholder="Add a comment..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 mt-4"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={3}
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={handleAddComment}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};