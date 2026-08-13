'use client';

import { FormEvent, useEffect, useState } from "react";

import { getUsers } from "@/app/server/users";
import { createVehicle, deleteVehicle, getVehicles } from "@/app/server/vehicles";
import type { User, Vehicle } from "@/app/types";

import styles from "./page.module.scss";

type VehicleFormState = {
  make: string;
  model: string;
  year: string;
  userId: string;
};

const initialFormState: VehicleFormState = {
  make: "",
  model: "",
  year: "",
  userId: "",
};

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<VehicleFormState>(initialFormState);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadData();
  }, []);

  async function loadData() {
    setError(null);
    setIsLoading(true);

    try {
      const [nextVehicles, nextUsers] = await Promise.all([
        getVehicles(),
        getUsers(),
      ]);

      setVehicles(nextVehicles);
      setUsers(nextUsers);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить транспорт.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await createVehicle({
        make: form.make.trim() || undefined,
        model: form.model.trim() || undefined,
        year: form.year ? Number(form.year) : undefined,
        userId: Number(form.userId),
      });
      setForm(initialFormState);
      await loadData();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Не удалось создать машину.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(vehicleId: number) {
    setError(null);

    try {
      await deleteVehicle(vehicleId);
      await loadData();
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Не удалось удалить машину.",
      );
    }
  }

  function getUserLabel(userId: number) {
    const user = users.find((item) => item.id === userId);
    if (!user) {
      return `User #${userId}`;
    }

    return user.name || user.email;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Машины</h1>
          <p className={styles.subtitle}>
            Страница оформлена через SCSS-модуль и использует минимальную форму,
            чтобы добавить транспорт и увидеть связь с пользователем.
          </p>
        </header>

        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Новая машина</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fields}>
              <label className={styles.field}>
                <span className={styles.label}>Пользователь</span>
                <select
                  required
                  className={styles.select}
                  value={form.userId}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      userId: event.target.value,
                    }))
                  }
                >
                  <option value="">Выберите пользователя</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.email}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Марка</span>
                <input
                  type="text"
                  className={styles.input}
                  value={form.make}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      make: event.target.value,
                    }))
                  }
                  placeholder="Toyota"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Модель</span>
                <input
                  type="text"
                  className={styles.input}
                  value={form.model}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      model: event.target.value,
                    }))
                  }
                  placeholder="Corolla"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>Год</span>
                <input
                  type="number"
                  className={styles.input}
                  value={form.year}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      year: event.target.value,
                    }))
                  }
                  placeholder="2024"
                />
              </label>
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={`${styles.button} ${styles.buttonPrimary}`}
                disabled={isSubmitting || users.length === 0}
              >
                {isSubmitting ? "Сохраняем..." : "Создать машину"}
              </button>
            </div>
          </form>
          {error ? (
            <p className={`${styles.status} ${styles.statusError}`}>{error}</p>
          ) : null}
        </section>

        <section className={styles.card}>
          <h2 className={styles.sectionTitle}>Список машин</h2>
          {isLoading ? <p className={styles.status}>Загрузка...</p> : null}
          {!isLoading && vehicles.length === 0 ? (
            <p className={styles.emptyState}>Машин пока нет.</p>
          ) : null}
          {!isLoading && vehicles.length > 0 ? (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Марка</th>
                    <th>Модель</th>
                    <th>Год</th>
                    <th>Пользователь</th>
                    <th>Действие</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.id}</td>
                      <td>{vehicle.make}</td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.year ?? "—"}</td>
                      <td>{getUserLabel(vehicle.userId)}</td>
                      <td>
                        <button
                          type="button"
                          className={`${styles.button} ${styles.buttonDanger}`}
                          onClick={() => void handleDelete(vehicle.id)}
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
        </section>
      </div>
    </main>
  );
}
