import React, { useState } from 'react';
import { X } from 'lucide-react';
import { AdminUser } from '../../../types/admin';
import { updateAdminUser } from '../../../services/adminService';

interface EditUserModalProps {
  user: AdminUser;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditUserModal({ user, isOpen, onClose, onSuccess }: EditUserModalProps) {
  const [formData, setFormData] = useState({
    full_name: user.full_name,
    email: user.email,
    role: user.role,
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: updateError } = await updateAdminUser(user.id, {
        full_name: formData.full_name,
        email: formData.email,
        role: formData.role,
        password: formData.password || undefined
      });

      if (updateError) throw updateError;

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          {error && (
            <div className="p-4 bg-red-50">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Leave blank to keep current password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <select
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminUser['role'] })}
              >
                <option value="admin">Admin</option>
                <option value="projectspecialist">Project Specialist</option>
                <option value="csm">CSM</option>
                <option value="estimator">Estimator</option>
              </select>
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
                disabled={loading}
                className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}