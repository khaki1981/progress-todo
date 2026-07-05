import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { calculateTodoProgress } from '../utils/progress';
import { ALL_TAB_COLOR, getProjectColor } from '../utils/todoColors';
import { ProgressCircle } from './ProgressCircle';
import { ProjectActions } from './ProjectActions';
import { ProjectDeleteDialog } from './ProjectDeleteDialog';
import { ProjectFormDialog } from './ProjectFormDialog';
import { ProjectTabs } from './ProjectTabs';
import { SettingsDialog } from './SettingsDialog';
import { TodoActionSheet } from './TodoActionSheet';
import { TodoDeleteDialog } from './TodoDeleteDialog';
import { TodoEditDialog } from './TodoEditDialog';
import { TodoFormDialog } from './TodoFormDialog';
import { TodoList, type TodoListItem } from './TodoList';

const formatToday = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const weekday = new Intl.DateTimeFormat('ja-JP', {
    weekday: 'long',
  }).format(today);

  return `${month}月${date}日 ${weekday} · いい調子！`;
};

export function HomeScreen() {
  const {
    activeProject,
    activeProjectId,
    addProject,
    addTodo,
    deleteTodo,
    deleteProject,
    projects,
    renameProject,
    renameTodo,
    selectProject,
    toggleTodo,
  } = useProjects();
  const [projectDialogMode, setProjectDialogMode] = useState<
    'add' | 'edit' | null
  >(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isTodoDialogOpen, setIsTodoDialogOpen] = useState(false);
  const [todoActionItem, setTodoActionItem] = useState<TodoListItem | null>(
    null,
  );
  const [todoEditItem, setTodoEditItem] = useState<TodoListItem | null>(null);
  const [todoDeleteItem, setTodoDeleteItem] = useState<TodoListItem | null>(
    null,
  );
  const closeProjectDialog = () => setProjectDialogMode(null);
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);
  const closeTodoDialog = () => setIsTodoDialogOpen(false);
  const closeTodoActionSheet = () => setTodoActionItem(null);
  const closeTodoEditDialog = () => setTodoEditItem(null);
  const closeTodoDeleteDialog = () => setTodoDeleteItem(null);
  const todoTargetProject = activeProject ?? projects[0] ?? null;
  const activeProjectIndex = activeProject
    ? projects.findIndex((project) => project.id === activeProject.id)
    : -1;
  const todoListItems = activeProject
    ? activeProject.todos.map((todo) => ({
        projectId: activeProject.id,
        projectColor: getProjectColor(activeProject.color, activeProjectIndex),
        projectName: activeProject.name,
        todo,
      }))
    : projects.flatMap((project, index) =>
        project.todos.map((todo) => ({
          projectId: project.id,
          projectColor: getProjectColor(project.color, index),
          projectName: project.name,
          todo,
        })),
      );
  const progress = calculateTodoProgress(
    todoListItems.map((item) => item.todo),
  );
  const progressColor = activeProject
    ? getProjectColor(activeProject.color, activeProjectIndex)
    : ALL_TAB_COLOR;

  const handleProjectSubmit = (name: string) => {
    if (projectDialogMode === 'add') {
      addProject(name);
    }

    if (projectDialogMode === 'edit' && activeProject) {
      renameProject(activeProject.id, name);
    }

    closeProjectDialog();
  };

  const handleDeleteProject = () => {
    if (activeProject) {
      deleteProject(activeProject.id);
    }

    closeDeleteDialog();
  };

  const handleTodoSubmit = (title: string) => {
    if (todoTargetProject) {
      addTodo(todoTargetProject.id, title);
    }

    closeTodoDialog();
  };

  const handleTodoEditStart = () => {
    if (todoActionItem) {
      setTodoEditItem(todoActionItem);
    }

    closeTodoActionSheet();
  };

  const handleTodoDeleteStart = () => {
    if (todoActionItem) {
      setTodoDeleteItem(todoActionItem);
    }

    closeTodoActionSheet();
  };

  const handleTodoEditSubmit = (title: string) => {
    if (todoEditItem) {
      renameTodo(todoEditItem.projectId, todoEditItem.todo.id, title);
    }

    closeTodoEditDialog();
  };

  const handleTodoDeleteConfirm = () => {
    if (todoDeleteItem) {
      deleteTodo(todoDeleteItem.projectId, todoDeleteItem.todo.id);
    }

    closeTodoDeleteDialog();
  };

  return (
    <main className="home-page">
      <section className="app-shell" aria-label="Progress Todo home">
        <div className="device-camera" aria-hidden="true" />

        <header className="app-shell__header">
          <div>
            <p className="app-shell__eyebrow">{formatToday()}</p>
            <h1>Progress Todo</h1>
          </div>
          <div className="app-shell__avatar" aria-hidden="true">
            PT
          </div>
        </header>

        <ProjectTabs
          activeProjectId={activeProjectId}
          onAddProject={() => setProjectDialogMode('add')}
          onSelectProject={selectProject}
          projects={projects}
        />
        <ProjectActions
          activeProject={activeProject}
          onDeleteProject={() => setIsDeleteDialogOpen(true)}
          onEditProject={() => setProjectDialogMode('edit')}
        />

        <ProgressCircle
          color={progressColor}
          onAddTodo={() => setIsTodoDialogOpen(true)}
          progress={progress}
        />
        <TodoList
          items={todoListItems}
          onOpenTodoActions={setTodoActionItem}
          onToggleTodo={toggleTodo}
        />

        <button
          className="add-fab"
          type="button"
          aria-label="Todoを追加"
          onClick={() => setIsTodoDialogOpen(true)}
        >
          +
        </button>

        <SettingsDialog isOpen={false} />
        <ProjectFormDialog
          initialName={
            projectDialogMode === 'edit' ? (activeProject?.name ?? '') : ''
          }
          isOpen={projectDialogMode !== null}
          mode={projectDialogMode ?? 'add'}
          onClose={closeProjectDialog}
          onSubmit={handleProjectSubmit}
        />
        <ProjectDeleteDialog
          isOpen={isDeleteDialogOpen}
          onClose={closeDeleteDialog}
          onConfirm={handleDeleteProject}
          project={activeProject}
        />
        <TodoFormDialog
          isOpen={isTodoDialogOpen}
          onClose={closeTodoDialog}
          onSubmit={handleTodoSubmit}
          project={todoTargetProject}
        />
        <TodoActionSheet
          item={todoActionItem}
          onClose={closeTodoActionSheet}
          onDeleteTodo={handleTodoDeleteStart}
          onEditTodo={handleTodoEditStart}
        />
        <TodoEditDialog
          item={todoEditItem}
          onClose={closeTodoEditDialog}
          onSubmit={handleTodoEditSubmit}
        />
        <TodoDeleteDialog
          item={todoDeleteItem}
          onClose={closeTodoDeleteDialog}
          onConfirm={handleTodoDeleteConfirm}
        />
      </section>
    </main>
  );
}
