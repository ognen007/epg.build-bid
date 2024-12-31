interface RegisterData {
  email: string;
  password: string;
  userType: 'client' | 'contractor';
  fullName: string;
  companyName?: string;
}

// Mock user storage
let users: any[] = [];

export async function register(data: RegisterData) {
  try {
    // Mock registration
    const user = {
      id: Math.random().toString(),
      email: data.email,
      userType: data.userType,
      fullName: data.fullName
    };
    
    users.push(user);
    return { user, error: null };
  } catch (error) {
    return { user: null, error: 'Registration failed' };
  }
}

export async function login(email: string, password: string) {
  try {
    // Mock login
    const user = users.find(u => u.email === email);
    if (!user) {
      throw new Error('User not found');
    }
    return { user, error: null };
  } catch (error) {
    return { user: null, error: 'Invalid credentials' };
  }
}