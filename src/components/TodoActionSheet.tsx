import type { TodoListItem } from './TodoList';

type TodoActionSheetProps = {
  item: TodoListItem | null;
  onClose: () => void;
  onDeleteTodo: () => void;
  onEditTodo: () => void;
};

export function TodoActionSheet({
  item,
  onClose,
  onDeleteTodo,
  onEditTodo,
}: TodoActionSheetProps) {
  if (!item) {
    return null;
  }

  return (
    <div
      className="project-action-sheet-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        aria-label="タスクメニュー"
        aria-modal="true"
        className="project-action-sheet todo-action-sheet"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          className="todo-action-sheet__title"
          type="button"
          onClick={onEditTodo}
        >
          {item.todo.title}
        </button>
        <button
          className="project-action-sheet__danger"
          type="button"
          onClick={onDeleteTodo}
        >
          削除
        </button>
        <button
          className="project-action-sheet__cancel"
          type="button"
          onClick={onClose}
        >
          キャンセル
        </button>
      </div>
    </div>
  );
}
