import Link from "next/link";

import styles from "./page.module.scss";
import { PageWrapper } from "@/src/components/common/page-wrapper";
import { Container } from "@/src/components/common/container";

const sections = [
  {
    href: "/users",
    title: "Пользователи",
    description:
      "Создавайте пользователей и быстро просматривайте список доступных записей.",
  },
  {
    href: "/vehicles",
    title: "Машины",
    description:
      "Добавляйте транспорт и проверяйте, как он связан с созданными пользователями.",
  },
] as const;

export default function Home() {
  return (
    <div className={styles.page}>
      <PageWrapper>
        <Container>
          <section className={styles.hero}>
            <p className={styles.eyebrow}>Vehicle Platform</p>
            <h1 className={styles.title}>
              Небольшая панель для работы с юзерами и машинами
            </h1>
            <p className={styles.description}>
              Главная страница теперь оформлена через SCSS-модуль и даёт быстрый
              вход в два основных сценария: управление пользователями и
              транспортом.
            </p>
          </section>

          <section className={styles.grid} aria-label="Navigation">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={section.href}
                className={styles.card}
              >
                <h2 className={styles.cardTitle}>{section.title}</h2>
                <p className={styles.cardText}>{section.description}</p>
                <span className={styles.cardMeta}>Открыть раздел</span>
              </Link>
            ))}
          </section>
        </Container>
      </PageWrapper>
    </div>
  );
}
