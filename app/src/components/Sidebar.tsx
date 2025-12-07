import { LayoutDashboard, Kanban, Settings, Users, Calendar, Home } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Top - Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">TaskFlow</span>
        </div>
      </div>

      {/* Middle - Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <LayoutDashboard className="w-5 h-5" />
          <span>Dashboard</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium bg-indigo-50 text-indigo-600 rounded-md"
        >
          <Kanban className="w-5 h-5" />
          <span>Boards</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span>Calendar</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <Users className="w-5 h-5" />
          <span>Team</span>
        </a>

        <a
          href="#"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
      </nav>

      {/* Bottom - Profile */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-600">UN</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">User Name</p>
            <p className="text-xs text-gray-500">user@email.com</p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
