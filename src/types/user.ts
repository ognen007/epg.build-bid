export interface UserType {
  id: string;
  name: string;
  email: string;
  type: 'contractor' | 'client';
  status: 'active' | 'suspended';
  registrationDate: string;
}