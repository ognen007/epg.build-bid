interface ProjectStatusProps {
  status: 'awaiting_bid' | 'bid_submitted' | 'won' | 'lost';
}

export function ProjectStatus({ status }: ProjectStatusProps) {
  const colors = {
    awaiting_bid: 'bg-yellow-100 text-yellow-800',
    bid_submitted: 'bg-blue-100 text-blue-800',
    won: 'bg-green-100 text-green-800',
    lost : "bg-red-100 text-red-800 "
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