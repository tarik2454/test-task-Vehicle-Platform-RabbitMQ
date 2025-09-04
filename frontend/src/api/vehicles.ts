import { vehicleApi } from ".";
import type { Vehicle } from "../types";

// Получить все машины
export async function getVehicles(): Promise<Vehicle[]> {
  const res = await vehicleApi.get("/vehicles");
  return res.data;
}

// Получить одну машину
export async function getVehicleById(id: number): Promise<Vehicle> {
  const res = await vehicleApi.get(`/vehicles/${id}`);
  return res.data;
}

// Создать машину
export async function createVehicle(payload: {
  make: string;
  model: string;
  year?: number;
  userId: number;
}): Promise<Vehicle> {
  const res = await vehicleApi.post("/vehicles", payload);
  return res.data;
}

// Обновить машину
export async function updateVehicle(
  id: number,
  payload: Partial<Vehicle>
): Promise<Vehicle> {
  const res = await vehicleApi.put(`/vehicles/${id}`, payload);
  return res.data;
}

// Удалить машину
export async function deleteVehicle(id: number): Promise<{ success: boolean }> {
  const res = await vehicleApi.delete(`/vehicles/${id}`);
  return res.data;
}
