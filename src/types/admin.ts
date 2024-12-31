export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: 'admin' | 'sales' | 'va';
  created_at: string;
}

export interface AdminUserUpdate {
  full_name: string;
  email: string;
  role: AdminUser['role'];
  password?: string;
}