import type { VehicleAttribute } from "./vehicleAttribute";

export interface Vehicle {
  regNo: string;
  brand: string;
  km: number;
  itp?: VehicleAttribute;
  rca?: VehicleAttribute;
  vignette?: VehicleAttribute;
  oilChange?: VehicleAttribute;
}
