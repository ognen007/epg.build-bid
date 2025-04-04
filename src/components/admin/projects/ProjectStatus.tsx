interface ProjectStatusProps {
  status: 'awaiting_bid' | 'bid_submitted' | 'won' | 'lost';
}

export function ProjectStatus({ status }: ProjectStatusProps) {
  const colors = {
    awaiting_approval: "bg-pink-100 text-pink-800",
    awaiting_takeoff: "bg-purple-100 text-purple-800",
    awaiting_bid: 'bg-yellow-100 text-yellow-800',
    takeoff_in_progress:"bg-teal-100 text-teal-800",
    takeoff_complete : "bg-orange-100 text-orange-800",
    bid_recieved :"bg-lime-100 text-lime-800",
    bid_submitted: 'bg-blue-100 text-blue-800',
    won: 'bg-green-100 text-green-800',
    lost : "bg-red-100 text-red-800 ",
    abandoned: "bg-amber-100 text-amber-800",
    denied: 'bg-indigo-100 text-indigo-800'
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status]}`}>
      {formatStatus(status.charAt(0).toUpperCase() + status.slice(1))}
    </span>
  );
}