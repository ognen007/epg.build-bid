import React from 'react';
import { Eye, Lock, Power } from 'lucide-react';
import { UserType } from '../../../types/user';

interface UserActionsProps {
  user: UserType;
  onStatusChange: (userId: string, status: 'active' | 'suspended') => void;
  onResetPassword: (userId: string) => void;
  onViewProfile: (userId: string) => void;
}

export function UserActions({ user, onStatusChange, onResetPassword, onViewProfile }: UserActionsProps) {
  return (
    <div className="flex items-center justify-end space-x-2">
      <button
        onClick={() => onViewProfile(user.id)}
        className="text-gray-400 hover:text-gray-500"
        title="View Profile"
      >
        <Eye className="h-4 w-4" />
      </button>
      <button
        onClick={() => onResetPassword(user.id)}
        className="text-gray-400 hover:text-gray-500"
        title="Reset Password"
      >
        <Lock className="h-4 w-4" />
      </button>
      <button
        onClick={() => onStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')}
        className={`${user.status === 'active' ? 'text-red-400 hover:text-red-500' : 'text-green-400 hover:text-green-500'}`}
        title={user.status === 'active' ? 'Suspend User' : 'Activate User'}
      >
        <Power className="h-4 w-4" />
      </button>
    </div>
  );
}