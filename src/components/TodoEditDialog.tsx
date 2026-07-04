import { useEffect, useState, type FormEvent } from 'react';
import type { TodoListItem } from './TodoList';

type TodoEditDialogProps = {
  item: TodoListItem | null;
  onClose: () => void;
  onSubmit: (title: string) => void;
};

export function TodoEditDialog({
  item,
  onClose,
  onSubmit,
}: TodoEditDialogProps) {
  const [title, setTitle] = useState('');
  const trimmedTitle = title.trim();

  useEffect(() => {
    if (item) {
      setTitle(item.todo.title);
    }
  }, [item]);

  if (!item) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!trimmedTitle) {
      return;
    }

    onSubmit(trimmedTitle);
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <form
        aria-label="タスク名を編集"
        className="project-dialog todo-dialog"
        onSubmit={handleSubmit}
        role="dialog"
      >
        <h2>タスク名を編集</h2>
        <label>
          <span>タスク名を入力</span>
          <input
            autoFocus
            maxLength={80}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            value={title}
          />
        </label>
        <div className="project-dialog__actions">
          <button type="button" onClick={onClose}>
            キャンセル
          </button>
          <button type="submit" disabled={!trimmedTitle}>
            保存する
          </button>
        </div>
      </form>
    </div>
  );
}
