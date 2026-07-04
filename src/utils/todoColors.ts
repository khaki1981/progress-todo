export const TODO_COLORS = [
  '#F7C948',
  '#F29E4C',
  '#6FCF97',
  '#56CCF2',
  '#BB6BD9',
  '#F299C1',
] as const;

export const DEFAULT_TODO_COLOR = TODO_COLORS[0];

export const getTodoColor = (color: string | undefined): string =>
  color?.trim() || DEFAULT_TODO_COLOR;

export const getNextTodoColor = (todoCount: number): string =>
  TODO_COLORS[todoCount % TODO_COLORS.length];
