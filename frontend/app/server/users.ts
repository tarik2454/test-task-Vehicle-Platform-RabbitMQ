import { userRequest } from ".";
import type { CreateUserInput, User } from "../types";

export async function getUsers(): Promise<User[]> {
  return userRequest<User[]>("/users");
}

export async function getUserById(id: number): Promise<User> {
  return userRequest<User>(`/users/${id}`);
}

export async function createUser(payload: CreateUserInput): Promise<User> {
  return userRequest<User>("/users", {
    method: "POST",
    body: payload,
  });
}

export async function updateUser(
  id: number,
  payload: Partial<User>
): Promise<User> {
  return userRequest<User>(`/users/${id}`, {
    method: "PUT",
    body: payload,
  });
}

export async function deleteUser(id: number): Promise<{ success: boolean }> {
  return userRequest<{ success: boolean }>(`/users/${id}`, {
    method: "DELETE",
  });
}
