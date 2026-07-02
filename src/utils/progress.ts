import type { Project } from '../types/app';

export type ProgressSummary = {
  totalCount: number;
  completedCount: number;
  percentage: number;
};

export const calculateProgress = (project: Project | null): ProgressSummary => {
  if (!project || project.todos.length === 0) {
    return {
      totalCount: 0,
      completedCount: 0,
      percentage: 0,
    };
  }

  const completedCount = project.todos.filter((todo) => todo.completed).length;

  return {
    totalCount: project.todos.length,
    completedCount,
    percentage: Math.round((completedCount / project.todos.length) * 100),
  };
};
