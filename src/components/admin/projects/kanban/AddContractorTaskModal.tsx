import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ContractorTask } from './types';

interface AddContractorTaskModalProps {
  onClose: () => void;
  onAdd: (task: Omit<ContractorTask, 'id' | 'comments' | 'createdAt'>, contractorId: string) => void;
  contractorId: string; // Pass contractorId as a prop
}

export const AddContractorTaskModal: React.FC<AddContractorTaskModalProps> = ({
  onClose,
  onAdd,
  contractorId,
}) => {
  const [taskType, setTaskType] = useState<ContractorTask['taskType']>('quote_verification');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onAdd(
      {
        type: 'contractor',
        title: `${taskType
          .split('_')
          .map((w: any) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ')}`, // Generate title from task type
        description,
        taskType,
        contractorId: contractorId
      },
      contractorId // Pass contractorId as an argument
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add Contractor Task</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Task Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as ContractorTask['taskType'])}
              >
                <option value="quote_verification">Quote Verification</option>
                <option value="price_negotiation">Price Negotiation</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
              <textarea
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description..."
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
                disabled={!description}
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};