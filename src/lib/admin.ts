import { AdminUser, ImportUserData } from '../types/admin';

// Mock admin users data
let mockUsers: AdminUser[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    userType: 'admin',
    status: 'active',
    createdAt: new Date().toISOString()
  }
];

export async function getAdminUsers(): Promise<{ users: AdminUser[]; error: string | null }> {
  try {
    return { users: mockUsers, error: null };
  } catch (error) {
    return { users: [], error: 'Failed to fetch users' };
  }
}

export async function importUsers(users: ImportUserData[]): Promise<{
  successful: AdminUser[];
  failed: { email: string; error: string }[];
}> {
  const results = {
    successful: [] as AdminUser[],
    failed: [] as { email: string; error: string }[]
  };

  for (const userData of users) {
    try {
      // Mock user creation
      const newUser: AdminUser = {
        id: Math.random().toString(36).slice(2),
        ...userData,
        status: 'active',
        createdAt: new Date().toISOString()
      };

      mockUsers.push(newUser);
      results.successful.push(newUser);
    } catch (error) {
      results.failed.push({
        email: userData.email,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return results;
}