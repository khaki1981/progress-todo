import type { Todo } from '../types/app';

type TodoItemProps = {
  onOpenActions: () => void;
  onToggle: () => void;
  todo: Todo;
};

export function TodoItem({
  onOpenActions,
  onToggle,
  todo,
}: TodoItemProps) {
  return (
    <li className="todo-item" data-completed={todo.completed}>
      <button
        aria-pressed={todo.completed}
        className="todo-item__button"
        onClick={onToggle}
        type="button"
      >
        <span className="todo-item__check" aria-hidden="true">
          {todo.completed ? '✓' : ''}
        </span>
        <span className="todo-item__body">
          <span className="todo-item__title" title={todo.title}>
            {todo.title}
          </span>
        </span>
        <span
          className="todo-item__color"
          style={{ backgroundColor: todo.color }}
          aria-hidden="true"
        />
      </button>
      <button
        aria-label={`${todo.title}の操作を開く`}
        className="todo-item__menu"
        onClick={onOpenActions}
        type="button"
      >
        ⋯
      </button>
    </li>
  );
}
