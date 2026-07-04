import type { Todo } from '../types/app';
import { getProjectColor } from '../utils/todoColors';

type TodoItemProps = {
  onOpenActions: () => void;
  onToggle: () => void;
  projectColor: string;
  todo: Todo;
};

export function TodoItem({
  onOpenActions,
  onToggle,
  projectColor,
  todo,
}: TodoItemProps) {
  const displayColor = getProjectColor(projectColor);

  return (
    <li className="todo-item" data-completed={todo.completed}>
      <button
        aria-pressed={todo.completed}
        className="todo-item__button"
        onClick={onToggle}
        type="button"
      >
        <span
          className="todo-item__check"
          style={{
            backgroundColor: todo.completed ? displayColor : undefined,
            borderColor: displayColor,
          }}
          aria-hidden="true"
        >
          {todo.completed ? '✓' : ''}
        </span>
        <span className="todo-item__body">
          <span className="todo-item__title" title={todo.title}>
            {todo.title}
          </span>
        </span>
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
