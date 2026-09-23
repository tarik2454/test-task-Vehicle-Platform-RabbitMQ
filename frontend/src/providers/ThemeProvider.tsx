'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  DEFAULT_THEME,
  isTheme,
  THEME,
  THEME_STORAGE_KEY,
  type TTheme,
} from '@/src/constants';

type TThemeContext = {
  theme: TTheme;
  setTheme: (theme: TTheme) => void;
  toggleTheme: () => void;
};

type TThemeProviderProps = Readonly<{
  children: ReactNode;
}>;

const ThemeContext = createContext<TThemeContext | null>(null);

function getAppliedTheme(): TTheme {
  const appliedTheme = document.documentElement.dataset.theme;

  return isTheme(appliedTheme) ? appliedTheme : DEFAULT_THEME;
}

function applyTheme(theme: TTheme) {
  document.documentElement.dataset.theme = theme;
}

function saveTheme(theme: TTheme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The selected theme still applies for the current page when storage is unavailable.
  }
}

export function ThemeProvider({ children }: TThemeProviderProps) {
  const [theme, setThemeState] = useState<TTheme>(DEFAULT_THEME);

  useEffect(() => {
    const appliedTheme = getAppliedTheme();

    applyTheme(appliedTheme);
    setThemeState(appliedTheme);
  }, []);

  const setTheme = useCallback((nextTheme: TTheme) => {
    applyTheme(nextTheme);
    saveTheme(nextTheme);
    setThemeState(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const currentTheme = getAppliedTheme();
    const nextTheme = currentTheme === THEME.dark ? THEME.light : THEME.dark;

    setTheme(nextTheme);
  }, [setTheme]);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [setTheme, theme, toggleTheme]
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): TThemeContext {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return context;
}
