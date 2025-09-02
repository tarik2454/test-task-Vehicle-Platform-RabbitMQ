// dto.ts
export class CreateVehicleDto {
  make?: string;
  model?: string;
  year?: number;
  userId!: number; // "!" чтобы указать, что обязательно
}

export class UpdateVehicleDto {
  make?: string;
  model?: string;
  year?: number;
}

export class Vehicle {
  id!: number;
  make!: string;
  model!: string;
  year?: number;
  userId!: number;
  createdAt!: Date;
  updatedAt?: Date;
}
