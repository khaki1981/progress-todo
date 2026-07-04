import type { Todo } from '../types/app';
import { TodoItem } from './TodoItem';

export type TodoListItem = {
  projectId: string;
  projectName: string;
  todo: Todo;
};

type TodoListProps = {
  items: TodoListItem[];
  onToggleTodo: (projectId: string, todoId: string) => void;
};

export function TodoList({ items, onToggleTodo }: TodoListProps) {
  if (items.length === 0) {
    return (
      <section className="todo-list" aria-label="Todos">
        <h2>今日のタスク</h2>
        <div className="todo-list__empty">まだタスクはありません</div>
      </section>
    );
  }

  return (
    <section className="todo-list" aria-label="Todos">
      <h2>今日のタスク</h2>
      <ul className="todo-list__items">
        {items.map((item) => (
          <TodoItem
            key={item.todo.id}
            onToggle={() => onToggleTodo(item.projectId, item.todo.id)}
            projectName={item.projectName}
            todo={item.todo}
          />
        ))}
      </ul>
    </section>
  );
}
