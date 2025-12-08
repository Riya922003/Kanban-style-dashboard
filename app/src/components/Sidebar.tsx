import { LayoutDashboard, Kanban, Settings, Users, Calendar, Home, X, Menu } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onClose, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          
          {/* Mobile Menu Modal */}
          <div className="fixed inset-x-4 top-20 z-50 md:hidden">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">TaskFlow</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Navigation */}
              <nav className="p-4 space-y-1">
                <a
                  href="#"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
                  <span>Dashboard</span>
                </a>

                <a
                  href="#"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-xl"
                >
                  <Kanban className="w-5 h-5 flex-shrink-0" />
                  <span>Boards</span>
                </a>

                <a
                  href="#"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <Calendar className="w-5 h-5 flex-shrink-0" />
                  <span>Calendar</span>
                </a>

                <a
                  href="#"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  <Users className="w-5 h-5 flex-shrink-0" />
                  <span>Team</span>
                </a>

                <a
                  href="#"
                  onClick={onClose}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <Settings className="w-5 h-5 flex-shrink-0" />
                  <span>Settings</span>
                </a>
              </nav>
              
              {/* Profile Section */}
              <div className="px-4 py-4 border-t border-gray-100">
                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">UN</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">User Name</p>
                    <p className="text-xs text-gray-500">user@email.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex md:relative bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col transition-all duration-300 ease-in-out h-screen ${
          isOpen ? 'w-64' : 'w-16'
        }`}
      >
        {/* Top - Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100 dark:border-gray-800">
          {isOpen ? (
            <>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">TaskFlow</span>
              </div>
              <button
                onClick={onToggle}
                className="p-1 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
                aria-label="Toggle sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button
              onClick={onToggle}
              className="w-full flex justify-center p-1 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>

      {/* Middle - Navigation */}
      <nav className="flex-1 p-2 space-y-1">
        <a
          href="#"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors ${
            !isOpen && 'justify-center'
          }`}
          title="Dashboard"
        >
          <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Dashboard</span>}
        </a>

        <a
          href="#"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium bg-indigo-50 text-indigo-600 rounded-md ${
            !isOpen && 'justify-center'
          }`}
          title="Boards"
        >
          <Kanban className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Boards</span>}
        </a>

        <a
          href="#"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors ${
            !isOpen && 'justify-center'
          }`}
          title="Calendar"
        >
          <Calendar className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Calendar</span>}
        </a>

        <a
          href="#"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors ${
            !isOpen && 'justify-center'
          }`}
          title="Team"
        >
          <Users className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Team</span>}
        </a>

        <a
          href="#"
          className={`flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md transition-colors ${
            !isOpen && 'justify-center'
          }`}
          title="Settings"
        >
          <Settings className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span>Settings</span>}
        </a>
      </nav>

        {/* Bottom - Profile */}
        <div className="p-4 border-t border-gray-100">
          {isOpen ? (
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
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">UN</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
