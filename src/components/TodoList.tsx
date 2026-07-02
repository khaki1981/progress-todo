import type { Todo } from '../types/app';
import { TodoItem } from './TodoItem';

type TodoListProps = {
  projectName: string;
  todos: Todo[];
};

export function TodoList({ projectName, todos }: TodoListProps) {
  if (todos.length === 0) {
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
        {todos.map((todo) => (
          <TodoItem key={todo.id} projectName={projectName} todo={todo} />
        ))}
      </ul>
    </section>
  );
}
