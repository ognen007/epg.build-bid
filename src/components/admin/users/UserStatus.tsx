import React from 'react';

interface UserStatusProps {
  status: 'active' | 'suspended';
}

export function UserStatus({ status }: UserStatusProps) {
  return (
    <span className={`
      px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
      ${status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
    `}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}