import { vehicleRequest } from '.';

import type {
  TCreateVehicleInput,
  TUpdateVehicleInput,
  TVehicle,
} from '../types';

const VEHICLES_RESOURCE = '/vehicles';

export async function getVehicles(): Promise<TVehicle[]> {
  return vehicleRequest<TVehicle[]>(VEHICLES_RESOURCE);
}

export async function getVehicleById(id: number): Promise<TVehicle> {
  return vehicleRequest<TVehicle>(`${VEHICLES_RESOURCE}/${id}`);
}

export async function createVehicle(
  payload: TCreateVehicleInput
): Promise<TVehicle> {
  return vehicleRequest<TVehicle>(VEHICLES_RESOURCE, {
    method: 'POST',
    body: payload,
  });
}

export async function updateVehicle(
  id: number,
  payload: TUpdateVehicleInput
): Promise<TVehicle> {
  return vehicleRequest<TVehicle>(`${VEHICLES_RESOURCE}/${id}`, {
    method: 'PUT',
    body: payload,
  });
}

export async function deleteVehicle(id: number): Promise<TVehicle> {
  return vehicleRequest<TVehicle>(`${VEHICLES_RESOURCE}/${id}`, {
    method: 'DELETE',
  });
}
