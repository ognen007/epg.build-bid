export interface ProjectType {
  id: string;
  name: string;
  contractor: string | null;
  status: 'Active' | 'Completed' | 'Pending';
  deadline: string; // ISO string format
  description?: string;
  dropboxLink?: string;
}
