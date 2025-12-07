'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import Board from './src/components/Board';
import Sidebar from './src/components/Sidebar';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const closeSidebar = () => setIsSidebarOpen(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} onToggle={toggleSidebar} />

      {/* Right Side */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 flex-shrink-0">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        </div>

        {/* Board Area */}
        <div className="flex-1 overflow-hidden p-6">
          <Board />
        </div>
      </div>
    </div>
  );
}
