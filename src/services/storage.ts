import type { AppData, Project, StorageService, Todo } from '../types/app';
import { getTodoColor } from '../utils/todoColors';

export const STORAGE_KEY = 'progress-todo-data';

export const createEmptyAppData = (): AppData => ({
  projects: [],
  activeProjectId: '',
  settings: {},
});

const normalizeTodo = (value: unknown): Todo | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const todo = value as Partial<Todo>;

  if (
    typeof todo.id !== 'string' ||
    typeof todo.title !== 'string' ||
    typeof todo.completed !== 'boolean' ||
    typeof todo.order !== 'number'
  ) {
    return null;
  }

  return {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    color: getTodoColor(todo.color),
    order: todo.order,
  };
};

const normalizeProject = (value: unknown): Project | null => {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const project = value as Partial<Project>;

  if (
    typeof project.id !== 'string' ||
    typeof project.name !== 'string' ||
    typeof project.order !== 'number' ||
    typeof project.createdAt !== 'string' ||
    !Array.isArray(project.todos)
  ) {
    return null;
  }

  return {
    id: project.id,
    name: project.name,
    order: project.order,
    createdAt: project.createdAt,
    todos: project.todos.flatMap((todo) => {
      const normalizedTodo = normalizeTodo(todo);

      return normalizedTodo ? [normalizedTodo] : [];
    }),
  };
};

const normalizeAppData = (value: unknown): AppData => {
  if (!value || typeof value !== 'object') {
    return createEmptyAppData();
  }

  const data = value as Partial<AppData>;
  const projects = Array.isArray(data.projects)
    ? data.projects.flatMap((project) => {
        const normalizedProject = normalizeProject(project);

        return normalizedProject ? [normalizedProject] : [];
      })
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
