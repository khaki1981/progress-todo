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

  const addTodo = useCallback(
    (projectId: string, title: string) => {
      dispatch({
        type: 'addTodo',
        payload: {
          projectId,
          title,
        },
      });
    },
    [dispatch],
  );

  const toggleTodo = useCallback(
    (projectId: string, todoId: string) => {
      dispatch({
        type: 'toggleTodo',
        payload: {
          projectId,
          todoId,
        },
      });
    },
    [dispatch],
  );

  const renameTodo = useCallback(
    (projectId: string, todoId: string, title: string) => {
      dispatch({
        type: 'renameTodo',
        payload: {
          projectId,
          todoId,
          title,
        },
      });
    },
    [dispatch],
  );

  const deleteTodo = useCallback(
    (projectId: string, todoId: string) => {
      dispatch({
        type: 'deleteTodo',
        payload: {
          projectId,
          todoId,
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
    addTodo,
    deleteTodo,
    deleteProject,
    projects: state.projects,
    renameProject,
    renameTodo,
    selectProject,
    toggleTodo,
  };
};
