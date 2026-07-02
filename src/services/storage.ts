import type { AppData, Project, StorageService, Todo } from '../types/app';

export const STORAGE_KEY = 'progress-todo-data';

export const createEmptyAppData = (): AppData => ({
  projects: [],
  activeProjectId: '',
  settings: {},
});

const isTodo = (value: unknown): value is Todo => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const todo = value as Todo;

  return (
    typeof todo.id === 'string' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean' &&
    typeof todo.color === 'string' &&
    typeof todo.order === 'number'
  );
};

const isProject = (value: unknown): value is Project => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const project = value as Project;

  return (
    typeof project.id === 'string' &&
    typeof project.name === 'string' &&
    typeof project.order === 'number' &&
    typeof project.createdAt === 'string' &&
    Array.isArray(project.todos) &&
    project.todos.every(isTodo)
  );
};

const normalizeAppData = (value: unknown): AppData => {
  if (!value || typeof value !== 'object') {
    return createEmptyAppData();
  }

  const data = value as Partial<AppData>;
  const projects = Array.isArray(data.projects)
    ? data.projects.filter(isProject)
    : [];
  const activeProjectId =
    typeof data.activeProjectId === 'string' ? data.activeProjectId : '';
  const activeProjectExists = projects.some(
    (project) => project.id === activeProjectId,
  );

  return {
    projects,
    activeProjectId: activeProjectExists ? activeProjectId : '',
    settings: {},
  };
};

const getBrowserStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage;
};

export const localStorageService: StorageService = {
  load: () => {
    const storage = getBrowserStorage();

    if (!storage) {
      return createEmptyAppData();
    }

    const rawData = storage.getItem(STORAGE_KEY);

    if (!rawData) {
      return createEmptyAppData();
    }

    try {
      return normalizeAppData(JSON.parse(rawData));
    } catch {
      return createEmptyAppData();
    }
  },
  save: (data) => {
    const storage = getBrowserStorage();

    if (!storage) {
      return;
    }

    storage.setItem(STORAGE_KEY, JSON.stringify(normalizeAppData(data)));
  },
};
