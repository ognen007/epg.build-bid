export interface ProjectType {
  id: string;
  name: string;
  client: string;
  contractor: string | null;
  status: 'active' | 'completed' | 'pending';
  deadline: string;
}