export const THEME = {
  light: 'light',
  dark: 'dark',
} as const;

export type TTheme = (typeof THEME)[keyof typeof THEME];

export const DEFAULT_THEME: TTheme = THEME.dark;
export const THEME_QUERY_PARAM = 'theme';
export const THEME_STORAGE_KEY = 'vehicle-platform.theme';

export function isTheme(value: string | null | undefined): value is TTheme {
  return value === THEME.light || value === THEME.dark;
}
