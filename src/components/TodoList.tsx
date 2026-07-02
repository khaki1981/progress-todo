import type { Todo } from '../types/app';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  todos: Todo[];
};

export function TodoList({ todos }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <section className="todo-list" aria-label="Todos">
        <div className="todo-list__empty">No todos</div>
      </section>
    );
  }

  return (
    <section className="todo-list" aria-label="Todos">
      <ul className="todo-list__items">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
