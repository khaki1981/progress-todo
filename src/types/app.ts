export type Todo = {
  id: string;
  title: string;
  completed: boolean;
  color: string;
  order: number;
};

export type Project = {
  id: string;
  name: string;
  order: number;
  createdAt: string;
  todos: Todo[];
};

export type Settings = Record<string, never>;

export type AppData = {
  projects: Project[];
  activeProjectId: string;
  settings: Settings;
};

export type StorageService = {
  load: () => AppData;
  save: (data: AppData) => void;
};
