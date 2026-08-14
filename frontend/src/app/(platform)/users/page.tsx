"use client";

import { useEffect, useState, type SubmitEvent } from "react";

import { createUser, deleteUser, getUsers } from "@/src/server/users";
import type { User } from "@/src/types";

import styles from "./page.module.scss";
import { Container } from "@/src/components/common/container";
import { PageWrapper } from "@/src/components/common/page-wrapper";

type UserFormState = {
  email: string;
  name: string;
};

const initialFormState: UserFormState = {
  email: "",
  name: "",
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadUsers();
  }, []);

  async function loadUsers() {
    setError(null);
    setIsLoading(true);

    try {
      const nextUsers = await getUsers();
      setUsers(nextUsers);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить пользователей.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createUser({
        email: form.email.trim(),
        name: form.name.trim() || undefined,
      });
      setForm(initialFormState);
      await loadUsers();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось создать пользователя.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(userId: number) {
    setError(null);

    try {
      await deleteUser(userId);
      await loadUsers();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Не удалось удалить пользователя.",
      );
    }
  }

  return (
    <main className={styles.page}>
      <PageWrapper>
        <Container>
          <header className={styles.header}>
            <h1 className={styles.title}>Пользователи</h1>
            <p className={styles.subtitle}>
              Минимальная страница со SCSS-модулем: можно создать пользователя,
              просмотреть список и удалить лишнюю запись.
            </p>
          </header>
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Новый пользователь</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fields}>
                <label className={styles.field}>
                  <span className={styles.label}>Email</span>
                  <input
                    required
                    type="email"
                    className={styles.input}
                    value={form.email}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    placeholder="user@example.com"
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Имя</span>
                  <input
                    type="text"
                    className={styles.input}
                    value={form.name}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    placeholder="Например, Alex"
                  />
                </label>
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.buttonPrimary}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Сохраняем..." : "Создать пользователя"}
                </button>
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonSecondary}`}
                  onClick={() => setForm(initialFormState)}
                  disabled={isSubmitting}
                >
                  Очистить
                </button>
              </div>
            </form>
            {error ? (
              <p className={`${styles.status} ${styles.statusError}`}>
                {error}
              </p>
            ) : null}
          </section>
          <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Список пользователей</h2>
            {isLoading ? <p className={styles.status}>Загрузка...</p> : null}
            {!isLoading && users.length === 0 ? (
              <p className={styles.emptyState}>Пользователей пока нет.</p>
            ) : null}
            {!isLoading && users.length > 0 ? (
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Имя</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.name || "—"}</td>
                        <td>
                          <button
                            type="button"
                            className={`${styles.button} ${styles.buttonDanger}`}
                            onClick={() => void handleDelete(user.id)}
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </section>{" "}
        </Container>
      </PageWrapper>
    </main>
  );
}
