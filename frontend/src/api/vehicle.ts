import type { UserWithVehicles } from "../types/user";
import type { Vehicle } from "../types/vehicle";
import type { VehicleAttribute } from "../types/vehicleAttribute";
import { axiosClient } from "./config";

const controllerName = "vehicle";

export const getVehicles = async (userName: string): Promise<Vehicle[]> => {
  const { data } = await axiosClient.get(`${controllerName}/${userName}/vehicles`);

  return data;
  // return vehicles;
};

export const getVehicle = async (userName: string, regNo: string): Promise<Vehicle> => {
  const { data } = await axiosClient.get(`${controllerName}/${userName}/vehicle/${regNo}`);

  return data;
  // return vehicles[0];
};
export const addVehicle = async (userName: string, vehicle: Vehicle): Promise<Vehicle[]> => {
  const { data } = await axiosClient.post(`${controllerName}/${userName}/vehicle`, vehicle);
  return data.vehicles as Vehicle[];
};

export const deleteVehicle = async (userName: string, regNo: string): Promise<Vehicle[]> => {
  const { data } = await axiosClient.delete(`${controllerName}/${userName}/vehicle/${regNo}`);

  return (data as UserWithVehicles).vehicles;
};

export const adjustITP = async (userName: string, regNo: string, vehicleAttribute: VehicleAttribute): Promise<Vehicle[]> => {
  const { data } = await axiosClient.put(`${controllerName}/${userName}/vehicle/${regNo}/itp`, vehicleAttribute);

  return (data as UserWithVehicles).vehicles;
};

export const adjustRCA = async (userName: string, regNo: string, vehicleAttribute: VehicleAttribute): Promise<Vehicle[]> => {
  const { data } = await axiosClient.put(`${controllerName}/${userName}/vehicle/${regNo}/rca`, vehicleAttribute);

  return (data as UserWithVehicles).vehicles;
};

export const adjustOilChange = async (userName: string, regNo: string, vehicleAttribute: VehicleAttribute): Promise<Vehicle[]> => {
  const { data } = await axiosClient.put(`${controllerName}/${userName}/vehicle/${regNo}/oil`, vehicleAttribute);

  return (data as UserWithVehicles).vehicles;
};

export const adjustVignette = async (userName: string, regNo: string, vehicleAttribute: VehicleAttribute): Promise<Vehicle[]> => {
  const { data } = await axiosClient.put(`${controllerName}/${userName}/vehicle/${regNo}/vig`, vehicleAttribute);

  return (data as UserWithVehicles).vehicles;
};
