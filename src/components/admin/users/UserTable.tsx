import React from 'react';
import { User, MoreVertical } from 'lucide-react';
import { UserActions } from './UserActions';
import { UserStatus } from './UserStatus';
import { UserType } from '../../../types/user';

interface UserTableProps {
  users: UserType[];
  onStatusChange: (userId: string, status: 'active' | 'suspended') => void;
  onResetPassword: (userId: string) => void;
  onViewProfile: (userId: string) => void;
}

export function UserTable({ users, onStatusChange, onResetPassword, onViewProfile }: UserTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <UserStatus status={user.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <UserActions
                  user={user}
                  onStatusChange={onStatusChange}
                  onResetPassword={onResetPassword}
                  onViewProfile={onViewProfile}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}