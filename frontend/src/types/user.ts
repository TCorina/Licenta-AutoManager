import type { Vehicle } from "./vehicle";

export interface User {
  userName: string;
  email: string;
  password: string;
}

export interface UserWithVehicles {
  userName: string;
  vehicles: Vehicle[];
}
