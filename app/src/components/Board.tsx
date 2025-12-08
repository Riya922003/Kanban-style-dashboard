'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { v4 as uuidv4 } from 'uuid';
import { Search, Filter, Plus, Columns as ColumnsIcon } from 'lucide-react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task, Column as ColumnType, Id } from '../types/task';
import Column from './Column';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import AddColumnForm from './AddColumnForm';
import { getTasks, saveTasks } from '../lib/storage';

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    columnId: 'todo',
    content: 'Design the new landing page wireframes',
    priority: 'high',
  },
  {
    id: 2,
    columnId: 'todo',
    content: 'Review pull requests from the team',
    priority: 'medium',
  },
  {
    id: 3,
    columnId: 'todo',
    content: 'Update documentation for API endpoints',
    priority: 'low',
  },
  {
    id: 4,
    columnId: 'inprogress',
    content: 'Implement user authentication flow',
    priority: 'high',
  },
  {
    id: 5,
    columnId: 'inprogress',
    content: 'Fix responsive layout issues',
    priority: 'medium',
  },
  {
    id: 6,
    columnId: 'done',
    content: 'Deploy staging environment',
    priority: 'low',
  },
  {
    id: 7,
    columnId: 'done',
    content: 'Setup CI/CD pipeline',
    priority: 'high',
  },
];

const INITIAL_COLUMNS: ColumnType[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
];

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<ColumnType[]>(INITIAL_COLUMNS);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isColumnFormOpen, setIsColumnFormOpen] = useState(false);
  const [activeColumn, setActiveColumn] = useState<Id | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [activeMobileColumn, setActiveMobileColumn] = useState<Id | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // Filter tasks based on search query and priority
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = !searchQuery || task.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  // Load tasks from IndexedDB on mount
  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await getTasks();
      if (savedTasks.length === 0) {
        setTasks(INITIAL_TASKS);
      } else {
        setTasks(savedTasks);
      }
      setIsLoading(false);
    };

    loadTasks();
  }, []);

  // Save tasks to IndexedDB whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  // Set active mobile column to first column on mount or when columns change
  useEffect(() => {
    if (activeMobileColumn === null && columns.length > 0) {
      setActiveMobileColumn(columns[0].id);
    }
  }, [columns, activeMobileColumn]);

  const handleDeleteTask = (id: Id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openTaskForm = (columnId: Id) => {
    setActiveColumn(columnId);
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setActiveColumn(task.columnId);
    setIsFormOpen(true);
  };

  const handleAddTask = (taskData: { title: string; description?: string; priority: 'low' | 'medium' | 'high'; columnId: Id }) => {
    if (editingTask) {
      // Edit existing task
      setTasks(tasks.map((task) =>
        task.id === editingTask.id
          ? { ...task, content: taskData.title, description: taskData.description, priority: taskData.priority, columnId: taskData.columnId }
          : task
      ));
    } else {
      // Add new task
      const newTask: Task = {
        id: uuidv4(),
        columnId: taskData.columnId,
        content: taskData.title,
        description: taskData.description,
        priority: taskData.priority,
      };
      setTasks([...tasks, newTask]);
    }
    setIsFormOpen(false);
    setEditingTask(null);
  };

  const handleAddColumn = (title: string) => {
    const newColumn: ColumnType = {
      id: uuidv4(),
      title: title,
    };
    setColumns([...columns, newColumn]);
    setIsColumnFormOpen(false);
  };

  const deleteColumn = (columnId: Id) => {
    // Remove the column
    setColumns(columns.filter((col) => col.id !== columnId));
    // Remove all tasks belonging to this column to prevent orphaned data
    setTasks(tasks.filter((task) => task.columnId !== columnId));
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'Task') {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';
    const isOverATask = over.data.current?.type === 'Task';

    if (!isActiveATask) return;

    // Dropping a Task over another Task (different columns)
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
          tasks[activeIndex].columnId = tasks[overIndex].columnId;
          return arrayMove(tasks, activeIndex, overIndex);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === 'Task';

    if (!isActiveATask) return;

    setTasks((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);

      return arrayMove(tasks, activeIndex, overIndex);
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  const columnColors = {
    todo: 'bg-blue-500',
    inprogress: 'bg-yellow-500',
    done: 'bg-green-500',
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header Section */}
      <div className="flex-shrink-0 mb-4 md:mb-6 px-2 md:px-0">
        {/* Title Row */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Kanban Board</h1>

        {/* Stats Row */}
        <div className="flex gap-2 md:gap-4 mt-3 md:mt-4 overflow-x-auto pb-2">
          {columns.map((column) => {
            const count = tasks.filter((task) => task.columnId === column.id).length;
            const colorKey = column.id as keyof typeof columnColors;
            const dotColor = columnColors[colorKey] || 'bg-gray-500';
            return (
              <div
                key={column.id}
                className="bg-white border border-gray-200 rounded-full px-3 md:px-4 py-1 text-xs md:text-sm font-medium flex items-center gap-2 whitespace-nowrap flex-shrink-0"
              >
                <div className={`w-2 h-2 rounded-full ${dotColor}`} />
                <span className="text-gray-900">{column.title}</span>
                <span className="text-gray-900">{count}</span>
              </div>
            );
          })}
        </div>

        {/* Toolbar Row */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-4 md:mt-6 mb-4 md:mb-6 gap-3">
          {/* Left - Add Item and Search */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-stretch md:items-center">
            <button 
              onClick={() => setIsColumnFormOpen(true)}
              className="bg-indigo-600 text-white flex gap-2 items-center justify-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors md:hidden"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
            <button 
              onClick={() => setIsColumnFormOpen(true)}
              className="hidden md:flex bg-indigo-600 text-white gap-2 items-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg w-full md:w-48 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm placeholder:text-gray-600 text-gray-600"
              />
            </div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as 'all' | 'low' | 'medium' | 'high')}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white text-gray-600"
            >
              <option value="all">All Priorities</option>
              <option value="high">High Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="low">Low Priority</option>
            </select>
          </div>

          {/* Right - Add Task */}
          <button 
            onClick={() => openTaskForm(columns[0]?.id)}
            className="bg-indigo-600 text-white flex gap-2 items-center justify-center px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-3 md:hidden snap-x px-2">
        {columns.map((col) => {
          const count = tasks.filter((task) => task.columnId === col.id).length;
          return (
            <button
              key={col.id}
              onClick={() => setActiveMobileColumn(col.id)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap snap-center border transition-colors flex items-center gap-2 ${
                activeMobileColumn === col.id
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-700 border-gray-200'
              }`}
            >
              {col.title} ({count})
            </button>
          );
        })}
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex flex-col md:flex-row flex-1 w-full md:gap-8 md:overflow-x-auto items-stretch md:justify-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] min-h-0 px-2 md:p-4">
          {columns.map((column) => (
            <div
              key={column.id}
              className={`w-full md:w-[350px] h-full flex-shrink-0 ${
                activeMobileColumn === column.id ? 'flex' : 'hidden md:flex'
              }`}
            >
              <Column
                column={column}
                tasks={filteredTasks.filter((task) => task.columnId === column.id)}
                deleteTask={handleDeleteTask}
                onAddTask={() => openTaskForm(column.id)}
                onEditTask={handleEditTask}
                onDeleteColumn={deleteColumn}
              />
            </div>
          ))}
        </div>

        {typeof window !== 'undefined' &&
          createPortal(
            <DragOverlay>
              {activeTask && (
                <TaskCard task={activeTask} deleteTask={handleDeleteTask} onEdit={handleEditTask} />
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>

      <AddTaskForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTask(null);
        }}
        onAdd={handleAddTask}
        columns={columns}
        defaultColumnId={activeColumn ?? columns[0]?.id}
        initialData={
          editingTask
            ? {
                title: editingTask.content,
                description: editingTask.description,
                priority: editingTask.priority || 'medium',
                columnId: editingTask.columnId,
              }
            : undefined
        }
      />

      <AddColumnForm
        isOpen={isColumnFormOpen}
        onClose={() => setIsColumnFormOpen(false)}
        onAdd={handleAddColumn}
      />
    </div>
  );
}
