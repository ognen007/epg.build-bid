import React from 'react';
import { TasksBoard } from './ContractorTaskBoard';

export function ContractorTasks() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Tasks</h1>
      <TasksBoard />
    </div>
  );
}