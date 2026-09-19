import Link from 'next/link';

import { ThemeToggle } from '@/src/components/common/ThemeToggle';

import styles from './layout.module.scss';

const navigation = [
  { href: '/', label: 'Главная' },
  { href: '/users', label: 'Пользователи' },
  { href: '/vehicles', label: 'Машины' },
] as const;

export default function PlatformLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandMark}>V</span>
            <span>Vehicle Platform</span>
          </Link>
          <div className={styles.headerControls}>
            <nav className={styles.navigation} aria-label="Основная навигация">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={styles.navLink}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      {children}
    </>
  );
}
