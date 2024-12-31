interface AuthResponse {
  user: {
    id: string;
    email: string;
    userType: 'client' | 'contractor' | 'admin';
    fullName: string;
  } | null;
  error: string | null;
}

const USERS = {
  'client@epg.build': {
    password: 'epg.build123',
    userType: 'client',
    fullName: 'Client User'
  },
  'contractor@epg.build': {
    password: 'epg.build123',
    userType: 'contractor',
    fullName: 'Contractor User'
  },
  'admin@epg.build': {
    password: 'epg.build123',
    userType: 'admin',
    fullName: 'Admin User'
  }
};

export async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const userConfig = USERS[email as keyof typeof USERS];

  if (!userConfig || userConfig.password !== password) {
    return { user: null, error: 'Invalid credentials' };
  }

  return {
    user: {
      id: Math.random().toString(),
      email,
      userType: userConfig.userType,
      fullName: userConfig.fullName
    },
    error: null
  };
}