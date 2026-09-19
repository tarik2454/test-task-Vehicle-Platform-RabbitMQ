'use client';

import styles from './error.module.scss';

type TErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: TErrorPageProps) {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>Application Error</p>
        <h1 className={styles.title}>Что-то пошло не так</h1>
        <p className={styles.message}>
          {error.message || 'Не удалось отрисовать страницу.'}
        </p>
        <button type="button" onClick={reset} className={styles.button}>
          Попробовать снова
        </button>
      </section>
    </main>
  );
}
