import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { UserTable } from './components/UserTable';
import { UserFilters } from './components/UserFilters';
import { AddUserModal } from '../../components/admin/users/AddUserModal';
import { EditAdminUser } from './EditAdminUser';
import { AdminUser } from '../../types/admin';
import { addUser, fetchUsers } from '../../services/admin/adminInfo/adminInformationEndpoint';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: AdminUser['role'];
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

  async function loadUsers() {
    setLoading(true);
    setError('');
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    loadUsers();
  }, []);

  const handleAddUser = async (userData: { email: string; fullName: string; role: AdminUser['role'] }) => {
    setError('');
    try {
      await addUser(userData); // Call service function
      await loadUsers(); // Refresh user list after adding
      setIsModalOpen(false);
    } catch (error: any) {
      setError(error.message);
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
    const searchLower = searchQuery.toLowerCase();

    const matchesSearch =
      !searchQuery ||
      user.fullName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower);

    const matchesRole = !roleFilter || user.role;

    return matchesSearch && matchesRole;
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
            users={filteredUsers}
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
