import { useEffect, useState, type FormEvent } from 'react';

type ProjectFormDialogProps = {
  initialName?: string;
  isOpen: boolean;
  mode: 'add' | 'edit';
  onClose: () => void;
  onSubmit: (name: string) => void;
};

export function ProjectFormDialog({
  initialName = '',
  isOpen,
  mode,
  onClose,
  onSubmit,
}: ProjectFormDialogProps) {
  const [name, setName] = useState(initialName);
  const trimmedName = name.trim();

  useEffect(() => {
    if (isOpen) {
      setName(initialName);
    }
  }, [initialName, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedName) {
      return;
    }

    onSubmit(trimmedName);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <form
        aria-label={mode === 'add' ? 'プロジェクト追加' : 'プロジェクト編集'}
        className="project-dialog"
        onSubmit={handleSubmit}
        role="dialog"
      >
        <h2>{mode === 'add' ? 'プロジェクト追加' : 'プロジェクト編集'}</h2>
        <label>
          <span>名前</span>
          <input
            autoFocus
            maxLength={28}
            onChange={(event) => setName(event.target.value)}
            type="text"
            value={name}
          />
        </label>
        <div className="project-dialog__actions">
          <button type="button" onClick={onClose}>
            キャンセル
          </button>
          <button type="submit" disabled={!trimmedName}>
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
