import { userRequest } from '.';

import type { TCreateUserInput, TUpdateUserInput, TUser } from '../types';

const USERS_RESOURCE = '/users';

export async function getUsers(): Promise<TUser[]> {
  return userRequest<TUser[]>(USERS_RESOURCE);
}

export async function getUserById(id: number): Promise<TUser> {
  return userRequest<TUser>(`${USERS_RESOURCE}/${id}`);
}

export async function createUser(payload: TCreateUserInput): Promise<TUser> {
  return userRequest<TUser>(USERS_RESOURCE, {
    method: 'POST',
    body: payload,
  });
}

export async function updateUser(
  id: number,
  payload: TUpdateUserInput
): Promise<TUser> {
  return userRequest<TUser>(`${USERS_RESOURCE}/${id}`, {
    method: 'PUT',
    body: payload,
  });
}

export async function deleteUser(id: number): Promise<TUser> {
  return userRequest<TUser>(`${USERS_RESOURCE}/${id}`, {
    method: 'DELETE',
  });
}
