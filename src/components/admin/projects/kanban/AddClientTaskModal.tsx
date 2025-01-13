import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Contractor, Project, ClientTask } from './types';

interface AddClientTaskModalProps {
  onClose: () => void;
  onAdd: (task: Omit<ClientTask, 'id' | 'comments' | 'createdAt'>) => void;
}

export const AddClientTaskModal: React.FC<AddClientTaskModalProps> = ({ onClose, onAdd }) => {
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [taskType, setTaskType] = useState<ClientTask['taskType']>('quote_verification');
  const [description, setDescription] = useState('');
  const [contractorSearch, setContractorSearch] = useState('');

  const sampleContractors: Contractor[] = [
    {
      id: '1',
      name: 'ABC Construction',
      projects: [
        { id: '1', name: 'City Center Renovation' },
        { id: '2', name: 'Harbor Bridge Project' },
      ],
    },
    {
      id: '2',
      name: 'XYZ Builders',
      projects: [
        { id: '3', name: 'Shopping Mall Extension' },
        { id: '4', name: 'Office Complex' },
      ],
    },
  ];

  const filteredContractors = sampleContractors.filter((c) =>
    c.name.toLowerCase().includes(contractorSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContractor || !selectedProject) return;

    onAdd({
      type: 'client',
      title: `${taskType
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')} - ${selectedProject.name}`,
      description,
      contractor: selectedContractor.name,
      project: selectedProject.name,
      taskType,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Add Client Task</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Contractor Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search contractors..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={contractorSearch}
                  onChange={(e) => setContractorSearch(e.target.value)}
                />
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-48 overflow-auto">
                  {filteredContractors.map((contractor) => (
                    <button
                      key={contractor.id}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-50"
                      onClick={() => {
                        setSelectedContractor(contractor);
                        setSelectedProject(null);
                        setContractorSearch('');
                      }}
                    >
                      {contractor.name}
                    </button>
                  ))}
                </div>
              </div>
              {selectedContractor && (
                <div className="mt-2 text-sm text-gray-600">
                  Selected: {selectedContractor.name}
                </div>
              )}
            </div>

            {/* Project Selection */}
            {selectedContractor && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={selectedProject?.id || ''}
                  onChange={(e) => {
                    const project = selectedContractor.projects.find((p) => p.id === e.target.value);
                    setSelectedProject(project || null);
                  }}
                >
                  <option value="">Select a project</option>
                  {selectedContractor.projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Task Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                value={taskType}
                onChange={(e) => setTaskType(e.target.value as ClientTask['taskType'])}
              >
                <option value="quote_verification">Quote Verification</option>
                <option value="price_negotiation">Price Negotiation</option>
                <option value="required_documentation">Required Documentation</option>
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
                disabled={!selectedContractor || !selectedProject || !description}
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