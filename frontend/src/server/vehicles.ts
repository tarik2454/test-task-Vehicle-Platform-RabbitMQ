import { vehicleRequest } from '.';

import type { TCreateVehicleInput, TVehicle } from '../types';

export async function getVehicles(): Promise<TVehicle[]> {
  return vehicleRequest<TVehicle[]>('/vehicles');
}

export async function getVehicleById(id: number): Promise<TVehicle> {
  return vehicleRequest<TVehicle>(`/vehicles/${id}`);
}

export async function createVehicle(
  payload: TCreateVehicleInput
): Promise<TVehicle> {
  return vehicleRequest<TVehicle>('/vehicles', {
    method: 'POST',
    body: payload,
  });
}

export async function updateVehicle(
  id: number,
  payload: Partial<TVehicle>
): Promise<TVehicle> {
  return vehicleRequest<TVehicle>(`/vehicles/${id}`, {
    method: 'PUT',
    body: payload,
  });
}

export async function deleteVehicle(id: number): Promise<{ success: boolean }> {
  return vehicleRequest<{ success: boolean }>(`/vehicles/${id}`, {
    method: 'DELETE',
  });
}
