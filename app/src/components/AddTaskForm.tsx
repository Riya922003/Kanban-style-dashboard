'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Column, Id } from '../types/task';

interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (taskData: { title: string; description?: string; priority: 'low' | 'medium' | 'high'; columnId: Id }) => void;
  initialData?: { title: string; description?: string; priority: 'low' | 'medium' | 'high'; columnId?: Id };
  columns: Column[];
  defaultColumnId?: Id;
}

export default function AddTaskForm({ isOpen, onClose, onAdd, initialData, columns, defaultColumnId }: AddTaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [columnId, setColumnId] = useState<Id>(initialData?.columnId ?? defaultColumnId ?? columns[0]?.id ?? '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description ?? '');
      setPriority(initialData.priority);
      setColumnId(initialData.columnId ?? defaultColumnId ?? columns[0]?.id ?? '');
    } else {
      setTitle('');
      setDescription('');
      setPriority('medium');
      setColumnId(defaultColumnId ?? columns[0]?.id ?? '');
    }
  }, [initialData, isOpen, defaultColumnId, columns]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && columnId) {
      onAdd({ title: title.trim(), description: description.trim(), priority, columnId });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setColumnId(defaultColumnId ?? columns[0]?.id ?? '');
      onClose();
    }
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setColumnId(defaultColumnId ?? columns[0]?.id ?? '');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 w-96 p-6 rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{initialData ? 'Edit Task' : 'Add New Task'}</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Title Input */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-gray-600 dark:placeholder:text-gray-400 text-gray-600 dark:text-gray-300"
              placeholder="Enter task title"
              autoFocus
            />
          </div>

          {/* Description Textarea */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none placeholder:text-gray-600 dark:placeholder:text-gray-400 text-gray-600 dark:text-gray-300"
              placeholder="Enter task description (optional)"
              rows={3}
            />
          </div>

          {/* Status Select */}
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={columnId}
              onChange={(e) => setColumnId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              {columns.map((column) => (
                <option key={column.id} value={column.id}>
                  {column.title}
                </option>
              ))}
            </select>
          </div>

          {/* Priority Select */}
          <div className="mb-6">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors font-medium"
            >
              {initialData ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
