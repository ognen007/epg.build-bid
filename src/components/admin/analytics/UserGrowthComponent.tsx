import React, { useState } from 'react';
import { Search, Edit2 } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  type: 'contractor' | 'client';
  company: string;
  licenseNumber?: string;
  specialty?: string;
  yearsExperience?: number;
  portfolioUrl?: string;
  phone?: string;
  address?: string;
  businessLicenseUrl?: string;
  insuranceCertificateUrl?: string;
}

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    type: 'contractor',
    company: 'Smith Construction',
    licenseNumber: 'LIC123456',
    specialty: 'Electrical',
    yearsExperience: 10,
    portfolioUrl: 'https://example.com',
    phone: '(555) 123-4567',
    address: '123 Main St, City, State',
    businessLicenseUrl: 'https://example.com/license',
    insuranceCertificateUrl: 'https://example.com/insurance'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    type: 'client',
    company: 'Johnson Industries'
  }
];

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSave: (user: User) => void;
}

function EditUserModal({ user, onClose, onSave }: EditUserModalProps) {
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />
        
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              {formData.type === 'contractor' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">License Number</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Specialty</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      value={formData.specialty}
                      onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Years of Experience</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData({ ...formData, yearsExperience: Number(e.target.value) })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Portfolio URL</label>
                    <input
                      type="url"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData({ ...formData, portfolioUrl: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                      type="tel"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Office Address</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business License URL</label>
                    <input
                      type="url"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      value={formData.businessLicenseUrl}
                      onChange={(e) => setFormData({ ...formData, businessLicenseUrl: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Insurance Certificate URL</label>
                    <input
                      type="url"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-orange-500 focus:border-orange-500"
                      value={formData.insuranceCertificateUrl}
                      onChange={(e) => setFormData({ ...formData, insuranceCertificateUrl: e.target.value })}
                    />
                  </div>
                </>
              )}
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
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function UserGrowthComponent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userType, setUserType] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const filteredUsers = sampleUsers.filter(user => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        !user.name.toLowerCase().includes(searchLower) &&
        !user.email.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    if (userType !== 'all' && user.type !== userType) {
      return false;
    }
    return true;
  });

  const handleSaveUser = (updatedUser: User) => {
    // Handle user update logic here
    console.log('Updated user:', updatedUser);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">User Analytics</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or company..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="w-full sm:w-48 rounded-lg border-gray-300 focus:ring-orange-500 focus:border-orange-500"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="contractor">Contractors</option>
            <option value="client">Clients</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.type === 'contractor' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-orange-600 hover:text-orange-700"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
}