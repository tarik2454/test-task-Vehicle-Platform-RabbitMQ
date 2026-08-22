import { vehicleRequest } from '.';
import type { CreateVehicleInput, Vehicle } from '../types';

export async function getVehicles(): Promise<Vehicle[]> {
  return vehicleRequest<Vehicle[]>('/vehicles');
}

export async function getVehicleById(id: number): Promise<Vehicle> {
  return vehicleRequest<Vehicle>(`/vehicles/${id}`);
}

export async function createVehicle(payload: CreateVehicleInput): Promise<Vehicle> {
  return vehicleRequest<Vehicle>('/vehicles', {
    method: 'POST',
    body: payload,
  });
}

export async function updateVehicle(id: number, payload: Partial<Vehicle>): Promise<Vehicle> {
  return vehicleRequest<Vehicle>(`/vehicles/${id}`, {
    method: 'PUT',
    body: payload,
  });
}

export async function deleteVehicle(id: number): Promise<{ success: boolean }> {
  return vehicleRequest<{ success: boolean }>(`/vehicles/${id}`, {
    method: 'DELETE',
  });
}
