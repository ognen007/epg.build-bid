import React from 'react';
import { TakeoffList } from './TakeoffList';

export function TakeoffView() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Takeoff Management</h1>
      <TakeoffList />
    </div>
  );
}