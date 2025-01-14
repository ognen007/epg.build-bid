export interface ProjectType {
  id: string;
  name: string;
  title: any;
  budget: any;
  contractor: string | null;
  status: "bid_submitted" | "awaiting_bid" | "abandoned" | "bid_recieved" | "won" | "lost"; // Union of specific strings
  hold: string;
  deadline: string;
  description?: string;
  dropboxLink?: string;
  valuation: string;

}