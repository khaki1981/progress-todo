import { useAppStore } from '../store/appStore';

export const useAppState = () => {
  const { activeProject, progress, state } = useAppStore();

  return {
    activeProject,
    progress,
    projects: state.projects,
  };
};
