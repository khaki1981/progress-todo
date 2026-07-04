import type { Todo } from '../types/app';
import { TodoItem } from './TodoItem';

export type TodoListItem = {
  projectName: string;
  todo: Todo;
};

type TodoListProps = {
  items: TodoListItem[];
};

export function TodoList({ items }: TodoListProps) {
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
            projectName={item.projectName}
            todo={item.todo}
          />
        ))}
      </ul>
    </section>
  );
}
