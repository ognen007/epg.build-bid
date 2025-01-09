import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Eye, X } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  deadline: string;
  valuation: number;
  status: 'won' | 'lost';
  description: string;
  client: string;
  location: string;
  startDate: string;
  completionDate?: string;
  team: string[];
}

const monthlyData = [
  { month: 'Jan', wonProjects: 4, lostProjects: 2, totalRevenue: 12000 },
  { month: 'Feb', wonProjects: 3, lostProjects: 5, totalRevenue: 15000 },
  { month: 'Mar', wonProjects: 5, lostProjects: 2, totalRevenue: 18000 },
  { month: 'Apr', wonProjects: 6, lostProjects: 3, totalRevenue: 20000 },
  { month: 'May', wonProjects: 4, lostProjects: 1, totalRevenue: 14000 },
  { month: 'Jun', wonProjects: 7, lostProjects: 3, totalRevenue: 23000 },
];

const sampleProjects: Project[] = [
  {
    id: '1',
    name: 'City Center Mall Renovation',
    deadline: '2024-06-15',
    valuation: 450000,
    status: 'won',
    description: 'Complete renovation of the west wing including new flooring, lighting, and store frontages.',
    client: 'ABC Corporation',
    location: 'New York, NY',
    startDate: '2024-01-15',
    completionDate: '2024-06-15',
    team: ['John Smith', 'Sarah Johnson', 'Mike Brown']
  },
  {
    id: '2',
    name: 'Harbor Bridge Maintenance',
    deadline: '2024-08-30',
    valuation: 280000,
    status: 'lost',
    description: 'Structural maintenance and repainting of the harbor bridge support beams.',
    client: 'City Department',
    location: 'Boston, MA',
    startDate: '2024-03-01',
    team: ['Robert Wilson', 'Emily Davis']
  }
];

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{project.name}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-sm text-gray-900">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Client</h3>
                <p className="mt-1 text-sm text-gray-900">{project.client}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1 text-sm text-gray-900">{project.location}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                <p className="mt-1 text-sm text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Completion Date</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {project.completionDate ? new Date(project.completionDate).toLocaleDateString() : 'TBD'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Valuation</h3>
                <p className="mt-1 text-sm text-gray-900">${project.valuation.toLocaleString()}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Status</h3>
                <span className={`mt-1 inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  project.status === 'won' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {project.status.toUpperCase()}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
              <ul className="mt-1 space-y-1">
                {project.team.map((member, index) => (
                  <li key={index} className="text-sm text-gray-900">{member}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RevenueDetails() {
  const { id } = useParams();
  const contractorName = "John Smith"; // Replace with actual data fetch
  const [showWonOnly, setShowWonOnly] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filter projects based on the toggle state
  const filteredProjects = showWonOnly
    ? sampleProjects.filter((project) => project.status === 'won')
    : sampleProjects.filter((project) => project.status === 'lost');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">{contractorName}'s Revenue Analytics</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue and Projects</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              
              {/* Primary Y-Axis for won/lost projects */}
              <YAxis yAxisId="left" />
              
              {/* Secondary Y-Axis for total revenue */}
              <YAxis yAxisId="right" orientation="right" />

              <Tooltip />
              <Legend />

              {/* Lines for projects won/lost (left Y-axis) */}
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="lostProjects"
                stroke="#e63946"
                name="Projects Lost"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="wonProjects"
                stroke="#2a9d8f"
                name="Projects Won"
              />

              {/* Line for total revenue (right Y-axis) */}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalRevenue"
                stroke="#4A00E0"
                name="Total Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Project Details</h2>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={showWonOnly}
                onChange={(e) => setShowWonOnly(e.target.checked)}
              />
              <div className={`block w-14 h-8 rounded-full transition-colors ${
                showWonOnly ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${
                showWonOnly ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </div>
            <span className="ml-3 text-sm font-medium text-gray-700">
              {showWonOnly ? 'Won Projects Only' : 'Lost Projects Only'}
            </span>
          </label>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deadline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valuation</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(project.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${project.valuation.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}