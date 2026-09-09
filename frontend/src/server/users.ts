import { userRequest } from '.';

import type { TCreateUserInput, TUser } from '../types';

export async function getUsers(): Promise<TUser[]> {
  return userRequest<TUser[]>('/users');
}

export async function getUserById(id: number): Promise<TUser> {
  return userRequest<TUser>(`/users/${id}`);
}

export async function createUser(payload: TCreateUserInput): Promise<TUser> {
  return userRequest<TUser>('/users', {
    method: 'POST',
    body: payload,
  });
}

export async function updateUser(
  id: number,
  payload: Partial<TUser>
): Promise<TUser> {
  return userRequest<TUser>(`/users/${id}`, {
    method: 'PUT',
    body: payload,
  });
}

export async function deleteUser(id: number): Promise<{ success: boolean }> {
  return userRequest<{ success: boolean }>(`/users/${id}`, {
    method: 'DELETE',
  });
}
