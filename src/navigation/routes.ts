import { 
  BarChart3, 
  Users, 
  Briefcase, 
  MessageCircle,
  Shell,
  Settings,
  LineChart,
  Search,
  Rocket,
  Waypoints,
  Wallet,
  PlaneTakeoff
} from 'lucide-react';

export const routes = {
  admin: [
    { path: '/admin', label: 'Dashboard', icon: BarChart3, roles: ['ADMIN', 'ESTIMATOR'] },
    { path: '/admin/users', label: 'User Management', icon: Users,  roles: ["ADMIN"] },
    // { path: '/admin/projects', label: 'Projects', icon: Briefcase },
    { path: '/admin/pipeline', label: 'Contractor Pipeline', icon: Shell, roles: ["ADMIN"] },
    { path: '/admin/takeoff', label: 'Takeoff', icon: Rocket, roles: ["ADMIN"] },
    { path: '/admin/takeoff/estimate', label: 'Takeoff', icon: PlaneTakeoff, roles:["ESTIMATOR"] },
    { path: '/admin/messages', label: 'Messages', icon: MessageCircle, roles: ['ADMIN', 'ESTIMATOR']  },
    // { path: '/admin/earnings', label: 'Earnings', icon: DollarSign },
    { path: '/admin/analytics', label: 'Reports & Analytics', icon: LineChart, roles: ["ADMIN"] },
    { path: '/admin/settings', label: 'Settings', icon: Settings, roles: ['ADMIN', 'ESTIMATOR']  },
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
    { path: '/contractor/tasks', label: 'Tasks', icon: Waypoints },
    // { path: '/contractor/find-work', label: 'Find Work', icon: Hammer },
    { path: '/contractor/earnings', label: 'Earnings', icon: Wallet },
    { path: '/contractor/messages', label: 'Messages', icon: MessageCircle },
    { path: '/contractor/settings', label: 'Settings', icon: Settings },
  ]
};