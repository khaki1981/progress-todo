import { useCallback } from 'react';
import { useAppStore } from '../store/appStore';

export const useProjects = () => {
  const { activeProject, dispatch, state } = useAppStore();

  const addProject = useCallback(
    (name: string) => {
      dispatch({
        type: 'addProject',
        payload: {
          name,
        },
      });
    },
    [dispatch],
  );

  const renameProject = useCallback(
    (projectId: string, name: string) => {
      dispatch({
        type: 'renameProject',
        payload: {
          projectId,
          name,
        },
      });
    },
    [dispatch],
  );

  const deleteProject = useCallback(
    (projectId: string) => {
      dispatch({
        type: 'deleteProject',
        payload: {
          projectId,
        },
      });
    },
    [dispatch],
  );

  const selectProject = useCallback(
    (projectId: string) => {
      dispatch({
        type: 'setActiveProject',
        payload: {
          projectId,
        },
      });
    },
    [dispatch],
  );

  return {
    activeProject,
    activeProjectId: state.activeProjectId,
    addProject,
    deleteProject,
    projects: state.projects,
    renameProject,
    selectProject,
  };
};
