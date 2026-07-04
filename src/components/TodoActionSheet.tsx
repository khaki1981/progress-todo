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
        aria-label="タスク操作"
        aria-modal="true"
        className="project-action-sheet"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="project-action-sheet__header">
          <h2>タスク操作</h2>
          <p>{item.todo.title}</p>
        </div>
        <button type="button" onClick={onEditTodo}>
          名前を編集
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
