import { userApi } from ".";
import type { User } from "../types";

// Получить всех пользователей
export async function getUsers(): Promise<User[]> {
  const res = await userApi.get("/users");
  return res.data;
}

// Получить одного пользователя
export async function getUserById(id: number): Promise<User> {
  const res = await userApi.get(`/users/${id}`);
  return res.data;
}

// Создать пользователя
export async function createUser(payload: {
  email: string;
  name?: string;
}): Promise<User> {
  const res = await userApi.post("/users", payload);
  return res.data;
}

// Обновить пользователя
export async function updateUser(
  id: number,
  payload: Partial<User>
): Promise<User> {
  const res = await userApi.put(`/users/${id}`, payload);
  return res.data;
}

// Удалить пользователя
export async function deleteUser(id: number): Promise<{ success: boolean }> {
  const res = await userApi.delete(`/users/${id}`);
  return res.data;
}
