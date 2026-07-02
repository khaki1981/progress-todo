import { useAppStore } from '../store/appStore';

export const useAppState = () => {
  const { activeProject, progress, state } = useAppStore();

  return {
    activeProjectId: state.activeProjectId,
    activeProject,
    progress,
    projects: state.projects,
  };
};
