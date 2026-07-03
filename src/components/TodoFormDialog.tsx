import { useEffect, useState, type FormEvent } from 'react';
import type { Project } from '../types/app';

type TodoFormDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string) => void;
  project: Project | null;
};

export function TodoFormDialog({
  isOpen,
  onClose,
  onSubmit,
  project,
}: TodoFormDialogProps) {
  const [title, setTitle] = useState('');
  const trimmedTitle = title.trim();

  useEffect(() => {
    if (isOpen) {
      setTitle('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!project || !trimmedTitle) {
      return;
    }

    onSubmit(trimmedTitle);
    setTitle('');
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <form
        aria-label="新しいタスク"
        className="project-dialog todo-dialog"
        onSubmit={handleSubmit}
        role="dialog"
      >
        <h2>新しいタスク</h2>
        {project ? (
          <p>{project.name} に追加します。</p>
        ) : (
          <p>先にプロジェクトを選択してください。</p>
        )}
        <label>
          <span>タスク名を入力</span>
          <input
            autoFocus={Boolean(project)}
            disabled={!project}
            maxLength={80}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="例：見積書を送る"
            type="text"
            value={title}
          />
        </label>
        <div className="project-dialog__actions">
          <button type="button" onClick={onClose}>
            キャンセル
          </button>
          <button type="submit" disabled={!project || !trimmedTitle}>
            追加する
          </button>
        </div>
      </form>
    </div>
  );
}
