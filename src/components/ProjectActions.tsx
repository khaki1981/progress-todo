import { useState } from 'react';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!activeProject) {
    return null;
  }

  const closeMenu = () => setIsMenuOpen(false);

  const handleEditProject = () => {
    closeMenu();
    onEditProject();
  };

  const handleDeleteProject = () => {
    closeMenu();
    onDeleteProject();
  };

  return (
    <>
      <div className="project-actions" aria-label="選択中プロジェクトの操作">
        <button
          aria-expanded={isMenuOpen}
          aria-haspopup="dialog"
          aria-label="プロジェクト設定を開く"
          className="project-actions__trigger"
          onClick={() => setIsMenuOpen(true)}
          type="button"
        >
          ⋯
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="project-action-sheet-backdrop"
          onClick={closeMenu}
          role="presentation"
        >
          <div
            aria-label="プロジェクト設定"
            aria-modal="true"
            className="project-action-sheet"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
          >
            <div className="project-action-sheet__header">
              <h2>プロジェクト設定</h2>
              <p>{activeProject.name}</p>
            </div>
            <button type="button" onClick={handleEditProject}>
              名前を編集
            </button>
            <button
              className="project-action-sheet__danger"
              type="button"
              onClick={handleDeleteProject}
            >
              削除
            </button>
            <button
              className="project-action-sheet__cancel"
              type="button"
              onClick={closeMenu}
            >
              キャンセル
            </button>
          </div>
        </div>
      )}
    </>
  );
}
