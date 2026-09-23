'use client';

import { DEFAULT_THEME } from '@/src/constants';

import styles from './global-error.module.scss';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html lang="ru" data-theme={DEFAULT_THEME}>
      <body className={styles.page}>
        <div className={styles.content}>
          <h2 className={styles.title}>Something went wrong</h2>
          <p className={styles.message}>{error.message}</p>
          <button type="button" onClick={reset} className={styles.button}>
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
