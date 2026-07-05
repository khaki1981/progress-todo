export const ALL_TAB_COLOR = '#F7C948';

export const PROJECT_COLORS = [
  '#6FCF97',
  '#F29E4C',
  '#56CCF2',
  '#BB6BD9',
  '#F299C1',
] as const;

export const DEFAULT_PROJECT_COLOR = PROJECT_COLORS[0];

export const getNextProjectColor = (projectCount: number): string =>
  PROJECT_COLORS[
    ((projectCount % PROJECT_COLORS.length) + PROJECT_COLORS.length) %
      PROJECT_COLORS.length
  ];

const normalizeColor = (color: string | undefined): string =>
  color?.trim().toLowerCase() ?? '';

export const getProjectColor = (
  color: string | undefined,
  fallbackIndex = 0,
): string => {
  const normalizedColor = color?.trim();

  if (
    normalizedColor &&
    normalizeColor(normalizedColor) !== normalizeColor(ALL_TAB_COLOR)
  ) {
    return normalizedColor;
  }

  return getNextProjectColor(fallbackIndex);
};
