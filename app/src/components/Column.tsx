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
    <div className="w-full md:w-[350px] h-full flex flex-col bg-gray-200/60 dark:bg-gray-800/60 rounded-xl max-h-full">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-t-xl p-3 md:p-4 font-bold flex items-center justify-between flex-shrink-0">
        <h2 className="text-gray-900 dark:text-white text-base font-semibold">{column.title}</h2>
        <div className="flex items-center gap-2">
          <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full px-2 py-1 min-w-[24px] text-center">
            {tasks.length}
          </span>
          <button
            onClick={() => onDeleteColumn(column.id)}
            className="text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 p-1 transition-colors duration-200 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
            aria-label="Delete column"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-gray-400 dark:[&::-webkit-scrollbar-thumb]:hover:bg-gray-500">
        <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500">
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
          className="w-full p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-sm font-medium"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
}
