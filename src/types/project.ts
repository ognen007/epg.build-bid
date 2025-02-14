export interface ProjectType {
  id: string;
  name: string;
  title?: any;
  budget?: any;
  contractor: string | null;
  status: "awaiting_approval" | "awaiting_takeoff" | "takeoff_in_progress" | "takeoff_complete" | "bid_recieved" | "bid_submitted" | "won" | "lost" | "abandoned";
  hold?: string;
  deadline: string;
  description?: string;
  dropboxLink?: string;
  highIntent?: boolean;
  valuation: string;
  blueprintsFile: any;
}