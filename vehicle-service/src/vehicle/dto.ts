// dto.ts
export interface CreateVehicleDto {
  make?: string;
  model?: string;
  year?: number;
  userId: number;
}

export interface UpdateVehicleDto {
  make?: string;
  model?: string;
  year?: number;
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year?: number;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
}
