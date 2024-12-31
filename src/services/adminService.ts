import axios from 'axios';

export async function loginAdmin(email: string) {
  try {
    const response = await axios.post(
      'https://epg-backend.onrender.com/api/admin/login',
      {
        email,
      }
    );
    const user = response.data;

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        userType: user.role,
        fullName: user.full_name,
      },
      error: null,
    };
  } catch (error) {
    return { user: null, error: 'Invalid credentials' };
  }
}

export async function getAdminUsers() {
  try {
    const response = await axios.get(
      'https://epg-backend.onrender.com/api/users'
    );
    return { users: response.data, error: null };
  } catch (error) {
    return { users: [], error: 'Failed to fetch admin users' };
  }
}

export async function createAdminUser(userData: {
  email: string;
  full_name: string;
  role: 'ADMIN' | 'SALES' | 'VA';
}) {
  try {
    const response = await axios.post(
      'https://epg-backend.onrender.com/api/admin/register',
      userData
    );

    console.log('Admin user created:', response.data);
    return { user: response.data, error: null };
  } catch (error) {
    console.error('Error creating admin user:', error);
    return { user: null, error: 'Failed to create admin user' };
  }
}
