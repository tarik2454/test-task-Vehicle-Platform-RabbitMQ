export type User = {
  id: number;
  email: string;
  name: string;
  createdAt: string | Date;
};

export type Vehicle = {
  id: number;
  make: string;
  model: string;
  year?: number | null;
  userId: number;
  createdAt: string | Date;
  updatedAt?: string | Date;
};

export type CreateUserInput = {
  email: string;
  name?: string;
};

export type CreateVehicleInput = {
  make?: string;
  model?: string;
  year?: number;
  userId: number;
};
