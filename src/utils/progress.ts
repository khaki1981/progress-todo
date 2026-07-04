import type { Project, Todo } from '../types/app';

export type ProgressSummary = {
  totalCount: number;
  completedCount: number;
  percentage: number;
};

export const calculateTodoProgress = (todos: Todo[]): ProgressSummary => {
  if (todos.length === 0) {
    return {
      totalCount: 0,
      completedCount: 0,
      percentage: 0,
    };
  }

  const completedCount = todos.filter((todo) => todo.completed).length;

  return {
    totalCount: todos.length,
    completedCount,
    percentage: Math.round((completedCount / todos.length) * 100),
  };
};

export const calculateProgress = (project: Project | null): ProgressSummary =>
  calculateTodoProgress(project?.todos ?? []);
