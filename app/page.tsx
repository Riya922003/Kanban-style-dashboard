'use client';

import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Board from './src/components/Board';
import Sidebar from './src/components/Sidebar';
import ThemeToggle from './src/components/ThemeToggle';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Open sidebar by default on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} onToggle={toggleSidebar} />

      {/* Right Side */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-3 md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
          </div>
          <ThemeToggle />
        </div>

        {/* Board Area */}
        <div className="flex-1 overflow-hidden p-2 md:p-6">
          <Board />
        </div>
      </div>
    </div>
  );
}
