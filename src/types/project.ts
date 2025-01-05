export interface ProjectType {
  id: string;
  name: string;
  contractor: string | null;
  status: 'awaiting_bid' | 'bid_submitted' | 'won' | 'lost';
  deadline: string; // ISO string format
  description?: string;
  dropboxLink?: string;
  valuation: string;
}
