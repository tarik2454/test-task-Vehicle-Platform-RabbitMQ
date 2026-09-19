import Link from 'next/link';

import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <div className={styles.message}>
          <h2 className={styles.messageText}>This page could not be found.</h2>
        </div>
      </div>
      <Link href="/" className={styles.link}>
        Go to home page
      </Link>
    </main>
  );
}
