import Link from 'next/link';

import { Container } from '@/src/components/common/Container';
import { PageWrapper } from '@/src/components/common/PageWrapper';

import styles from './page.module.scss';

const sections = [
  {
    href: '/users',
    number: '01',
    category: 'Пользователи',
    title: 'Управление пользователями',
    description:
      'Создавайте профили, просматривайте актуальные данные и удаляйте ненужные записи.',
  },
  {
    href: '/vehicles',
    number: '02',
    category: 'Транспорт',
    title: 'Управление машинами',
    description:
      'Добавляйте машины и проверяйте их связь с созданными пользователями.',
  },
] as const;

export default function Home() {
  return (
    <PageWrapper>
      <Container>
        <section className={styles.section} aria-labelledby="platform-heading">
          <div className={styles.sectionHeader}>
            <div className={styles.headingRow}>
              <h1 id="platform-heading" className={styles.title}>
                Управление платформой
              </h1>
              <span className={styles.sectionCount}>2</span>
            </div>
            <p className={styles.description}>
              Пользователи и связанные с ними машины в одном интерфейсе.
            </p>
          </div>

          <div className={styles.grid}>
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={styles.card}
              >
                <div className={styles.cardVisual} aria-hidden="true">
                  <span className={styles.cardNumber}>{section.number}</span>
                </div>
                <div className={styles.cardContent}>
                  <p className={styles.cardCategory}>{section.category}</p>
                  <div className={styles.cardCopy}>
                    <h2 className={styles.cardTitle}>{section.title}</h2>
                    <p className={styles.cardText}>{section.description}</p>
                  </div>
                  <span className={styles.cardAction}>Открыть раздел</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>
    </PageWrapper>
  );
}
