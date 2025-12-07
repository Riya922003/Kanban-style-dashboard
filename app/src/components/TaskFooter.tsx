import { Calendar, MessageSquare, Flag, Paperclip } from 'lucide-react';

interface TaskFooterProps {
  priority?: 'low' | 'medium' | 'high';
}

export default function TaskFooter({ priority = 'medium' }: TaskFooterProps) {
  // Determine flag color based on priority
  const getFlagColor = () => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-blue-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
      {/* Left Side - Assignee */}
      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
        JD
      </div>

      {/* Right Side - Meta Icons */}
      <div className="flex items-center gap-3 text-gray-400">
        {/* Priority Flag */}
        <Flag size={14} className={getFlagColor()} />

        {/* Date */}
        <div className="flex items-center gap-1 text-xs">
          <Calendar size={14} />
          <span>Jan 20</span>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-1 text-xs hover:text-gray-600 cursor-pointer transition-colors">
          <MessageSquare size={14} />
          <span>3</span>
        </div>
      </div>
    </div>
  );
}
