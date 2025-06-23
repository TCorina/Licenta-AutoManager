import type { User } from "../types/user";
import { axiosClient } from "./config";

export const USER_LOCAL_STORAGE_ACCESS_KEY = "user";

export const login = async (loginData: Omit<User, "email">): Promise<User> => {
  const params = new URLSearchParams({
    username: loginData.userName,
    password: loginData.password,
  });

  const { data } = await axiosClient.post("/user/login", {}, { params });
  return data;
};

export const register = async (registerData: User): Promise<User> => {
  const { password, userName } = registerData;

  const postBody = {
    passwordHash: password,
    userName,
    vehicles: [],
  };

  const { data } = await axiosClient.post("/user/register", postBody);
  return data;
};
