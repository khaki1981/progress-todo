import type { Todo } from '../types/app';

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  return (
    <li className="todo-item">
      <span
        className="todo-item__color"
        style={{ backgroundColor: todo.color }}
      />
      <span className="todo-item__title">{todo.title}</span>
      <span className="todo-item__status">
        {todo.completed ? 'Done' : 'Open'}
      </span>
    </li>
  );
}
