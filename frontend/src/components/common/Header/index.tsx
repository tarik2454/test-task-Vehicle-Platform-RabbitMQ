import Link from 'next/link';

import { Container } from '@/src/components/common/Container';
import { ThemeToggle } from '@/src/components/common/ThemeToggle';
import { ROUTES } from '@/src/constants';

import styles from './Header.module.scss';

const navigation = [
  { href: ROUTES.HOME, label: 'Главная' },
  { href: ROUTES.USERS, label: 'Пользователи' },
  { href: ROUTES.VEHICLES, label: 'Машины' },
] as const;

export function Header() {
  return (
    <header className={styles.header}>
      <Container>
        <div className={styles.headerInner}>
          <Link href={ROUTES.HOME} className={styles.brand}>
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
      </Container>
    </header>
  );
}
