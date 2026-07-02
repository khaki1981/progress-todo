import { useState } from 'react';
import { useAppState } from '../hooks/useAppState';
import { useProjects } from '../hooks/useProjects';
import { ProgressCircle } from './ProgressCircle';
import { ProjectActions } from './ProjectActions';
import { ProjectDeleteDialog } from './ProjectDeleteDialog';
import { ProjectFormDialog } from './ProjectFormDialog';
import { ProjectTabs } from './ProjectTabs';
import { SettingsDialog } from './SettingsDialog';
import { TodoList } from './TodoList';

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
  const { progress } = useAppState();
  const {
    activeProject,
    activeProjectId,
    addProject,
    deleteProject,
    projects,
    renameProject,
    selectProject,
  } = useProjects();
  const [projectDialogMode, setProjectDialogMode] = useState<
    'add' | 'edit' | null
  >(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const closeProjectDialog = () => setProjectDialogMode(null);
  const closeDeleteDialog = () => setIsDeleteDialogOpen(false);

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

        <ProgressCircle progress={progress} />
        <TodoList
          projectName={activeProject?.name ?? 'Progress Todo'}
          todos={activeProject?.todos ?? []}
        />

        <button className="add-fab" type="button" aria-label="Add todo">
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
      </section>
    </main>
  );
}
