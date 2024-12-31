import React from 'react';
import { Briefcase, UserCircle } from 'lucide-react';

interface UserTypeSelectorProps {
  onSelect: (type: 'client' | 'contractor') => void;
}

export function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-center text-gray-900">
        Choose your account type
      </h3>

      <div className="grid grid-cols-1 gap-4">
        <button
          onClick={() => onSelect('client')}
          className="relative rounded-lg border border-gray-300 bg-white p-4 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <UserCircle className="h-6 w-6 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  I'm a Client
                </p>
                <p className="text-sm text-gray-500">
                  Looking to hire contractors for projects
                </p>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelect('contractor')}
          className="relative rounded-lg border border-gray-300 bg-white p-4 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Briefcase className="h-6 w-6 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-900">
                  I'm a Contractor
                </p>
                <p className="text-sm text-gray-500">
                  Looking for work and project opportunities
                </p>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}