import type { Project } from '../types/app';

type ProjectActionsProps = {
  activeProject: Project | null;
  onDeleteProject: () => void;
  onEditProject: () => void;
};

export function ProjectActions({
  activeProject,
  onDeleteProject,
  onEditProject,
}: ProjectActionsProps) {
  if (!activeProject) {
    return null;
  }

  return (
    <div className="project-actions" aria-label="Selected project actions">
      <span className="project-actions__name">{activeProject.name}</span>
      <div className="project-actions__buttons">
        <button type="button" onClick={onEditProject}>
          編集
        </button>
        <button type="button" onClick={onDeleteProject}>
          削除
        </button>
      </div>
    </div>
  );
}
