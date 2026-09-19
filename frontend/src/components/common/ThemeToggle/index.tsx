'use client';

import { THEME } from '@/src/constants/theme';
import { useTheme } from '@/src/providers/ThemeProvider';

import styles from './ThemeToggle.module.scss';

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="4" fill="currentColor" />
      <path
        d="M12 2V5M12 19V22M4.93 4.93L7.05 7.05M16.95 16.95L19.07 19.07M2 12H5M19 12H22M4.93 19.07L7.05 16.95M16.95 7.05L19.07 4.93"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === THEME.dark;
  const label = isDark
    ? 'Переключить на светлую тему'
    : 'Переключить на тёмную тему';

  return (
    <button
      type="button"
      className={styles.themeToggle}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      <span className={styles.icon}>{isDark ? <SunIcon /> : <MoonIcon />}</span>
    </button>
  );
}
