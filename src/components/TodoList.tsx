import type { Todo } from '../types/app';
import { TodoItem } from './TodoItem';

export type TodoListItem = {
  projectId: string;
  projectColor: string;
  projectName: string;
  todo: Todo;
};

type TodoListProps = {
  items: TodoListItem[];
  onOpenTodoActions: (item: TodoListItem) => void;
  onToggleTodo: (projectId: string, todoId: string) => void;
};

export function TodoList({
  items,
  onOpenTodoActions,
  onToggleTodo,
}: TodoListProps) {
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
            onOpenActions={() => onOpenTodoActions(item)}
            onToggle={() => onToggleTodo(item.projectId, item.todo.id)}
            projectColor={item.projectColor}
            todo={item.todo}
          />
        ))}
      </ul>
    </section>
  );
}
