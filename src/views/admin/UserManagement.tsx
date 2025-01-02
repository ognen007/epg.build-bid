import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import axios from 'axios';
import { UserTable } from './components/UserTable';
import { UserFilters } from './components/UserFilters';
import { AddUserModal } from '../../components/admin/users/AddUserModal';
import { EditAdminUser } from './EditAdminUser';

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'sales' | 'va';
  createdAt: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get<User[]>(
        'https://epg-backend.onrender.com/api/admin/users'
      );
      setUsers(response.data);
    } catch (err) {
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err instanceof Error
          ? err.message
          : 'An unexpected error occurred';
      setError(errorMessage);
    }
    setLoading(false);
  };

  const handleAddUser = async (userData: {
    email: string;
    fullName: string;
    role: 'admin' | 'sales' | 'va';
  }) => {
    setError('');
    try {
      await axios.post('https://epg-backend.onrender.com/api/admin/register', {
        fullName: userData.fullName,
        email: userData.email,
        role: userData.role.toUpperCase(),
      });

      await loadUsers();
      setIsModalOpen(false);
    } catch (err: unknown) {
      console.error('API Error:', err);
      let errorMessage = 'Failed to add user. Please try again.';

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user); // Store the selected user for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null); // Reset selected user when modal closes
  };

  const filteredUsers = users.filter((user) => {
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      if (
        !user.fullName.toLowerCase().includes(searchLower) &&
        !user.email.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    if (roleFilter && user.role !== roleFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          User Management
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <UserFilters
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            onSearchChange={setSearchQuery}
            onRoleChange={setRoleFilter}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500" />
            </div>
          ) : (
            <UserTable
              users={users}
              onRefresh={loadUsers}
              onEdit={handleEditClick}
            />
          )}
        </div>
      </div>

      {isEditModalOpen && selectedUser && (
        <EditAdminUser user={selectedUser} onClose={handleCloseModal} />
      )}

      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddUser}
      />
    </div>
  );
}
