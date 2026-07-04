import type { TodoListItem } from './TodoList';

type TodoDeleteDialogProps = {
  item: TodoListItem | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function TodoDeleteDialog({
  item,
  onClose,
  onConfirm,
}: TodoDeleteDialogProps) {
  if (!item) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <div aria-label="タスク削除" className="project-dialog" role="dialog">
        <h2>タスク削除</h2>
        <p>
          「{item.todo.title}」を削除しますか？
          <br />
          この操作は取り消せません。
        </p>
        <div className="project-dialog__actions">
          <button type="button" onClick={onClose}>
            キャンセル
          </button>
          <button
            className="project-dialog__danger"
            type="button"
            onClick={onConfirm}
          >
            削除する
          </button>
        </div>
      </div>
    </div>
  );
}
