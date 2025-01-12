import React, { useState } from 'react';
import { Clock, FileText, CheckCircle, X } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface Project {
  id: string;
  name: string;
  status: 'takeoff' | 'ready' | 'negotiating';
  dropboxLink?: string;
  lastUpdated: string;
  dueDate?: string;
  totalBidAmount?: number;
  comments?: Comment[]; // Add comments field
}

const sampleProjects: Project[] = [
  {
    id: '2',
    name: 'Harbor Bridge Maintenance',
    status: 'takeoff',
    lastUpdated: '2024-03-14',
  },
  {
    id: '3',
    name: 'Downtown Park Redesign',
    status: 'ready',
    lastUpdated: '2024-03-13',
    dueDate: '2025-01-11',
    dropboxLink: 'https://www.dropbox.com',
  },
  {
    id: '4',
    name: 'Office Complex Construction',
    status: 'negotiating',
    lastUpdated: '2024-03-12',
    totalBidAmount: 120000,
    comments: [
      {
        id: '1',
        author: 'Admin 1',
        content: 'Please review the updated bid amount.',
        createdAt: '2024-03-12T10:00:00',
      },
      {
        id: '2',
        author: 'Admin 2',
        content: 'The client has requested a discount.',
        createdAt: '2024-03-12T11:30:00',
      },
    ],
  },
];

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
}

function CommentsModal({ isOpen, onClose, comments }: CommentsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Project Updates</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6 space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-gray-900">{comment.author}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreConstructionSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'takeoff':
        return Clock;
      case 'ready':
        return FileText;
      case 'negotiating':
        return CheckCircle;
    }
  };

  const getStatusText = (status: Project['status']) => {
    switch (status) {
      case 'takeoff':
        return 'Takeoff in Progress';
      case 'ready':
        return 'Ready for Proposal';
      case 'negotiating':
        return 'Negotiating';
      default:
        return '';
    }
  };

  const groupedProjects = sampleProjects.reduce((acc, project) => {
    if (!acc[project.status]) {
      acc[project.status] = [];
    }
    acc[project.status].push(project);
    return acc;
  }, {} as Record<Project['status'], Project[]>);

  return (
    <div className="space-y-6 w-full">
      <h2 className="text-xl font-semibold text-gray-900">Pre-Construction</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
        {(['takeoff', 'ready', 'negotiating'] as const).map((status) => {
          const StatusIcon = getStatusIcon(status);
          const projects = groupedProjects[status] || [];

          return (
            <div key={status} className="bg-white rounded-xl shadow-sm p-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <StatusIcon className="h-5 w-5 text-orange-500" />
                  <h3 className="font-medium text-gray-900">{getStatusText(status)}</h3>
                </div>
                <span className="text-sm text-gray-500">{projects.length}</span>
              </div>

              <div className="space-y-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-3 rounded-lg w-full ${
                      status === 'negotiating'
                        ? 'bg-orange-50 border-l-4 border-orange-500 cursor-pointer hover:bg-orange-100'
                        : 'bg-gray-50'
                    }`}
                    onClick={() => {
                      if (status === 'negotiating') {
                        setSelectedProject(project); // Open modal for negotiating projects
                      }
                    }}
                  >
                    <div className="font-medium text-gray-900">{project.name}</div>
                    {status === 'ready' && project.dueDate && (
                      <div className="text-sm text-gray-500 mt-1">
                        Due {new Date(project.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    {status === 'ready' && project.dropboxLink && (
                      <a
                        href={project.dropboxLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-600 hover:text-orange-700 mt-2 inline-block"
                      >
                        View Files
                      </a>
                    )}
                    {status === 'negotiating' && project.totalBidAmount && (
                      <div className="text-sm text-gray-500 mt-1">
                        Total Bid: ${project.totalBidAmount.toLocaleString()}
                      </div>
                    )}
                    {status === 'negotiating' && (
                      <div className="text-sm text-orange-600 mt-2">See Project updates</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Comments Modal */}
      {selectedProject && (
        <CommentsModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          comments={selectedProject.comments || []}
        />
      )}
    </div>
  );
}