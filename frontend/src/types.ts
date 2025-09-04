export interface Vehicle {
  id?: number;
  make: string;
  model: string;
  year: number;
  userId: number;
}

export interface User {
  id?: number;
  name: string;
  email: string;
  vehicles?: Vehicle[];
}
