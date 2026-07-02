import type { Project } from '../types/app';

type ProjectDeleteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  project: Project | null;
};

export function ProjectDeleteDialog({
  isOpen,
  onClose,
  onConfirm,
  project,
}: ProjectDeleteDialogProps) {
  if (!isOpen || !project) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div
        aria-label="プロジェクト削除"
        className="project-dialog"
        role="dialog"
      >
        <h2>プロジェクト削除</h2>
        <p>「{project.name}」を削除します。</p>
        <div className="project-dialog__actions">
          <button type="button" onClick={onClose}>
            キャンセル
          </button>
          <button type="button" onClick={onConfirm}>
            削除
          </button>
        </div>
      </div>
    </div>
  );
}
