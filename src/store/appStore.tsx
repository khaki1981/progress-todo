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

const appReducer = (state: AppData, action: AppAction): AppData => {
  switch (action.type) {
    case 'replaceState':
      return action.payload;
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
