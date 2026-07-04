export const PROJECT_COLORS = [
  '#F7C948',
  '#6FCF97',
  '#F29E4C',
  '#56CCF2',
  '#BB6BD9',
  '#F299C1',
] as const;

export const DEFAULT_PROJECT_COLOR = PROJECT_COLORS[0];

export const getProjectColor = (color: string | undefined): string =>
  color?.trim() || DEFAULT_PROJECT_COLOR;

export const getNextProjectColor = (projectCount: number): string =>
  PROJECT_COLORS[projectCount % PROJECT_COLORS.length];
