import React from 'react';
import { TasksBoard } from './ContractorTaskBoard';

export function ContractorTasks() {
  const contractorId = "677991b5a501df24c21aaed8"
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
      <TasksBoard />
    </div>
  );
}