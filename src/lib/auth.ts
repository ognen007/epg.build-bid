// Simple mock authentication
export async function loginUser(email: string, password: string) {
  // Mock login logic
  if (email.includes('admin@')) {
    return { userType: 'admin' };
  } else if (email.includes('contractor@')) {
    return { userType: 'contractor' };
  } else if (email.includes('client@')) {
    return { userType: 'client' };
  }
  throw new Error('Invalid credentials');
}

export async function getCurrentUser() {
  // Mock current user
  return null;
}