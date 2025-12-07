import { get, set, del } from 'idb-keyval';
import { Task } from '../types/task';

const TASKS_KEY = 'kanban-tasks';

export async function getTasks(): Promise<Task[]> {
  try {
    const tasks = await get<Task[]>(TASKS_KEY);
    return tasks || [];
  } catch (error) {
    console.error('Error getting tasks from IndexedDB:', error);
    return [];
  }
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  try {
    await set(TASKS_KEY, tasks);
  } catch (error) {
    console.error('Error saving tasks to IndexedDB:', error);
  }
}

export async function clearTasks(): Promise<void> {
  try {
    await del(TASKS_KEY);
  } catch (error) {
    console.error('Error clearing tasks from IndexedDB:', error);
  }
}
