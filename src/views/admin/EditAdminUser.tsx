import axios from 'axios';
import { X } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'projectspecialist' | 'csm' | 'estimator';
  createdAt: string;
}

interface EditAdminUserProps {
  user: User;
  onClose: () => void;
}

export function EditAdminUser({ user, onClose }: EditAdminUserProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Send the current and new password to the backend
      const response = await axios.put(
        `https://epg-backend.onrender.com/api/admin/edit-password/${user.id}`,
        { currentPassword, newPassword }
      );

      if (response.status === 200) {
        alert('Password updated successfully');
        onClose(); // Close the modal after successful update
      }
    } catch (err) {
      console.error('Error updating password:', err);
      setError('Failed to update the password. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Edit Password
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {error && <div className="text-red-600">{error}</div>}

            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

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
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
