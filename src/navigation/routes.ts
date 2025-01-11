import { 
  BarChart3, 
  Users, 
  Briefcase, 
  MessageCircle,
  DollarSign,
  Settings,
  LineChart,
  Search,
  Rocket,
  Waypoints,
  Hammer,
  Wallet
} from 'lucide-react';

export const routes = {
  admin: [
    { path: '/admin', label: 'Dashboard', icon: BarChart3 },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/projects', label: 'Projects', icon: Briefcase },
    { path: '/admin/takeoff', label: 'Takeoff', icon: Rocket },
    { path: '/admin/messages', label: 'Messages', icon: MessageCircle },
    // { path: '/admin/earnings', label: 'Earnings', icon: DollarSign },
    { path: '/admin/analytics', label: 'Reports & Analytics', icon: LineChart },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ],
  client: [
    { path: '/client', label: 'Dashboard', icon: BarChart3 },
    { path: '/client/projects', label: 'Projects', icon: Briefcase },
    { path: '/client/contractors', label: 'Find Contractors', icon: Search },
    { path: '/client/messages', label: 'Messages', icon: MessageCircle },
    { path: '/client/settings', label: 'Settings', icon: Settings },
  ],
  contractor: [
    { path: '/contractor', label: 'Dashboard', icon: BarChart3 },
    { path: '/contractor/projects', label: 'My Projects', icon: Briefcase },
    // { path: '/contractor/find-work', label: 'Find Work', icon: Hammer },
    { path: '/contractor/earnings', label: 'Earnings', icon: Wallet },
    { path: '/contractor/messages', label: 'Messages', icon: MessageCircle },
    { path: '/contractor/settings', label: 'Settings', icon: Settings },
  ]
};