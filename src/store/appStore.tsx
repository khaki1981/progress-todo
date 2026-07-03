import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';
import { localStorageService } from '../services/storage';
import type { AppData, Project, StorageService } from '../types/app';
import { calculateProgress, type ProgressSummary } from '../utils/progress';

export type AppAction = {
  type: 'replaceState';
  payload: AppData;
} | {
  type: 'addProject';
  payload: {
    name: string;
  };
} | {
  type: 'renameProject';
  payload: {
    projectId: string;
    name: string;
  };
} | {
  type: 'deleteProject';
  payload: {
    projectId: string;
  };
} | {
  type: 'addTodo';
  payload: {
    projectId: string;
    title: string;
  };
} | {
  type: 'setActiveProject';
  payload: {
    projectId: string;
  };
};

export type AppStoreValue = {
  state: AppData;
  activeProject: Project | null;
  progress: ProgressSummary;
  dispatch: Dispatch<AppAction>;
};

type AppStoreProviderProps = {
  children: ReactNode;
  storageService?: StorageService;
};

const AppStoreContext = createContext<AppStoreValue | null>(null);

const createId = () => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const appReducer = (state: AppData, action: AppAction): AppData => {
  switch (action.type) {
    case 'replaceState':
      return action.payload;
    case 'addProject': {
      const name = action.payload.name.trim();

      if (!name) {
        return state;
      }

      const project: Project = {
        id: createId(),
        name,
        order:
          state.projects.reduce(
            (maxOrder, currentProject) =>
              Math.max(maxOrder, currentProject.order),
            -1,
          ) + 1,
        createdAt: new Date().toISOString(),
        todos: [],
      };

      return {
        ...state,
        activeProjectId: project.id,
        projects: [...state.projects, project],
      };
    }
    case 'renameProject': {
      const name = action.payload.name.trim();

      if (!name) {
        return state;
      }

      return {
        ...state,
        projects: state.projects.map((project) =>
          project.id === action.payload.projectId
            ? {
                ...project,
                name,
              }
            : project,
        ),
      };
    }
    case 'deleteProject': {
      const projects = state.projects.filter(
        (project) => project.id !== action.payload.projectId,
      );
      const activeProjectId =
        state.activeProjectId === action.payload.projectId
          ? (projects[0]?.id ?? '')
          : state.activeProjectId;

      return {
        ...state,
        activeProjectId,
        projects,
      };
    }
    case 'addTodo': {
      const title = action.payload.title.trim();

      if (!title) {
        return state;
      }

      return {
        ...state,
        projects: state.projects.map((project) => {
          if (project.id !== action.payload.projectId) {
            return project;
          }

          return {
            ...project,
            todos: [
              ...project.todos,
              {
                id: createId(),
                title,
                completed: false,
                color: '#69bf86',
                order: project.todos.length,
              },
            ],
          };
        }),
      };
    }
    case 'setActiveProject': {
      const projectId = action.payload.projectId;
      const projectExists =
        projectId === '' ||
        state.projects.some((project) => project.id === projectId);

      if (!projectExists) {
        return state;
      }

      return {
        ...state,
        activeProjectId: projectId,
      };
    }
    default:
      return state;
  }
};

export function AppStoreProvider({
  children,
  storageService = localStorageService,
}: AppStoreProviderProps) {
  const [state, dispatch] = useReducer(
    appReducer,
    undefined,
    storageService.load,
  );
  const activeProject = useMemo(
    () =>
      state.projects.find((project) => project.id === state.activeProjectId) ??
      null,
    [state.activeProjectId, state.projects],
  );
  const progress = useMemo(
    () => calculateProgress(activeProject),
    [activeProject],
  );
  const value = useMemo<AppStoreValue>(
    () => ({
      state,
      activeProject,
      progress,
      dispatch,
    }),
    [activeProject, progress, state],
  );

  useEffect(() => {
    storageService.save(state);
  }, [state, storageService]);

  return (
    <AppStoreContext.Provider value={value}>
      {children}
    </AppStoreContext.Provider>
  );
}

export const useAppStore = (): AppStoreValue => {
  const store = useContext(AppStoreContext);

  if (!store) {
    throw new Error('useAppStore must be used within AppStoreProvider.');
  }

  return store;
};
