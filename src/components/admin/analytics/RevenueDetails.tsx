import React, { useState, useEffect } from 'react';
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
  status: string;
  valuation: string | null;
}

interface ContractorDetails {
  id: string;
  contractor: {
    name: string;
    email: string;
    company: string;
  };
  totalRevenue: number;
  lastMonthRevenue: number;
  growth: number;
  projectsCompleted: number;
  projects: Project[];
}

export function RevenueDetails() {
  const { id } = useParams<{ id: string }>();
  const [contractorData, setContractorData] = useState<ContractorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showWonOnly, setShowWonOnly] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch detailed contractor data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://epg-backend.onrender.com/api/contractor-information/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: ContractorDetails = await response.json();
        setContractorData(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!contractorData) return <div>No data found</div>;

  const { contractor, projects } = contractorData;

  // Filter projects based on toggle state
  const filteredProjects = showWonOnly
    ? projects.filter((project) => project.status === 'won')
    : projects.filter((project) => project.status === 'lost');

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">{contractor.name}'s Revenue Analytics</h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Monthly Revenue and Projects</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
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
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="totalRevenue"
                stroke="blue"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                    {project.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${project.valuation || '0'}
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
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1 text-sm text-gray-900">{project.status}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Valuation</h3>
              <p className="mt-1 text-sm text-gray-900">${project.valuation || '0'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}