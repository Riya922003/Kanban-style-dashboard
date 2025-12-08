import { Trash2, Pencil, FileText } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, Id } from '../types/task';
import TaskFooter from './TaskFooter';

interface TaskCardProps {
  task: Task;
  deleteTask: (id: Id) => void;
  onEdit: (task: Task) => void;
}

export default function TaskCard({ task, deleteTask, onEdit }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const priorityColors = {
    low: 'bg-blue-100 text-blue-700',
    medium: 'bg-orange-100 text-orange-700',
    high: 'bg-red-100 text-red-700',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group bg-white p-4 rounded-xl shadow-sm border border-gray-200 hover:ring-2 hover:ring-blue-500 hover:shadow-md transition-all duration-200 cursor-pointer ${
        isDragging ? 'opacity-30 border-2 border-rose-500' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-900">
            {task.content}
          </h3>
          {task.description && (
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <FileText className="w-3 h-3" />
              <span>Has description</span>
            </div>
          )}
        </div>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-blue-500 p-1 rounded hover:bg-blue-50"
            aria-label="Edit task"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500 p-1 rounded hover:bg-red-50"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {task.priority && (
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
        </div>
      )}

      {/* Task Footer */}
      <TaskFooter priority={task.priority} />
    </div>
  );
}
