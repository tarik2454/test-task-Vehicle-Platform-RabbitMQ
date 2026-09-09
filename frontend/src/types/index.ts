export type TUser = {
  id: number;
  email: string;
  name: string;
  createdAt: string | Date;
};

export type TVehicle = {
  id: number;
  make: string;
  model: string;
  year?: number | null;
  userId: number;
  createdAt: string | Date;
  updatedAt?: string | Date;
};

export type TCreateUserInput = {
  email: string;
  name?: string;
};

export type TCreateVehicleInput = {
  make?: string;
  model?: string;
  year?: number;
  userId: number;
};
