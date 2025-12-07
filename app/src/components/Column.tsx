import { useMemo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Ghost, Trash2 } from 'lucide-react';
import { Column as ColumnType, Task, Id } from '../types/task';
import TaskCard from './TaskCard';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  onAddTask: () => void;
  onEditTask: (task: Task) => void;
  onDeleteColumn: (id: Id) => void;
}

export default function Column({ column, tasks, deleteTask, onAddTask, onEditTask, onDeleteColumn }: ColumnProps) {
  const tasksIds = useMemo(() => tasks.map((task) => task.id), [tasks]);

  return (
    <div className="w-[350px] h-full flex flex-col bg-gray-100/50 rounded-xl">
      {/* Header */}
      <div className="bg-transparent p-4 font-bold flex items-center justify-between flex-shrink-0">
        <h2 className="text-gray-900 text-base font-semibold">{column.title}</h2>
        <div className="flex items-center gap-2">
          <span className="bg-gray-200 text-gray-700 text-sm rounded-full px-2 py-1 min-w-[24px] text-center">
            {tasks.length}
          </span>
          <button
            onClick={() => onDeleteColumn(column.id)}
            className="text-gray-400 hover:text-red-500 p-1 transition-colors duration-200 rounded hover:bg-red-50"
            aria-label="Delete column"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400">
        <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50/50 text-gray-400">
              <Ghost className="w-10 h-10 mb-2" />
              <p className="text-sm font-medium">No tasks yet</p>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} deleteTask={deleteTask} onEdit={onEditTask} />
            ))
          )}
        </SortableContext>
      </div>

      {/* Footer */}
      <div className="p-4 flex-shrink-0">
        <button
          onClick={onAddTask}
          className="w-full p-2 rounded-lg text-gray-500 hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
