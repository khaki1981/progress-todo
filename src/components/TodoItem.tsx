import type { Todo } from '../types/app';

type TodoItemProps = {
  projectName: string;
  todo: Todo;
};

export function TodoItem({ projectName, todo }: TodoItemProps) {
  return (
    <li className="todo-item" data-completed={todo.completed}>
      <span className="todo-item__check" aria-hidden="true">
        {todo.completed ? '✓' : ''}
      </span>
      <span className="todo-item__body">
        <span className="todo-item__title">{todo.title}</span>
        <span className="todo-item__meta">{projectName}</span>
      </span>
      <span
        className="todo-item__color"
        style={{ backgroundColor: todo.color }}
        aria-hidden="true"
      />
    </li>
  );
}
